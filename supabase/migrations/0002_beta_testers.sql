-- 베타 테스터 신청 — 랜딩 v2의 신청 폼(components/landing-v2/BetaSignup.tsx)이
-- /api/beta/signup 을 통해 쌓는 테이블.
--
-- waitlist(0001)와 분리한 이유: 사전예약(출시 알림)과 베타 모집은 목적도 수집
-- 항목도 다르다. waitlist 는 goal(준비하는 시험)이 not null 이지만 베타 신청은
-- 이메일과 기기만 받고, 대신 초대 진행 상태를 추적해야 한다.
--
-- waitlist 와 달리 anon 정책을 만들지 않는다. 쓰기는 서버 라우트가
-- service_role 로만 하고, 브라우저에는 DB 키를 내려보내지 않는다.

create table if not exists public.beta_testers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  email text not null,
  platform text not null check (platform in ('android', 'ios')),

  -- 초대 워크플로. Play Console 비공개 테스트 초대는 수동이라
  -- 어디까지 처리했는지 여기에 표시한다
  status text not null default 'pending'
    check (status in ('pending', 'invited', 'joined', 'rejected')),
  invited_at timestamptz,

  -- 1차 모집 마감 후 신청은 대기 명단으로 구분
  is_waitlist boolean not null default false,

  -- 유입 분석용. 없으면 null
  referrer text,
  user_agent text
);

-- 같은 이메일로 두 번 쌓이지 않게 (대소문자 무시).
-- 서버 라우트가 이 인덱스에 기대어 upsert 한다
create unique index if not exists beta_testers_email_lower_key
  on public.beta_testers (lower(email));

-- 등록 순서대로 초대를 보내야 해서 자주 조회하는 축
create index if not exists beta_testers_created_at_idx
  on public.beta_testers (created_at);

-- 아직 초대 안 보낸 사람만 뽑는 조회
create index if not exists beta_testers_status_idx
  on public.beta_testers (status);

alter table public.beta_testers enable row level security;

-- 정책을 하나도 만들지 않는다 = anon/authenticated 는 읽기도 쓰기도 불가.
-- service_role 은 RLS 를 우회하므로 서버 라우트만 접근할 수 있다.
-- (혹시 이전에 만들어 둔 정책이 있으면 정리)
drop policy if exists beta_testers_insert_anon on public.beta_testers;

-- 선착순 번호. created_at 순서로 매기며, 초대 대상을 고를 때 쓴다.
-- 컬럼으로 박으면 삭제·복구 시 어긋나므로 뷰로 계산한다.
--
-- security_invoker = true 가 중요하다. 뷰는 기본적으로 "소유자 권한"으로
-- 실행돼서 밑에 깔린 테이블의 RLS 를 우회한다 — 그대로 두면 public 스키마의
-- 뷰가 PostgREST 로 노출되면서 anon 이 신청자 전체를 읽을 수 있다.
-- invoker 로 바꾸면 조회한 역할의 RLS 가 적용돼 anon 에게는 0행이 된다.
create or replace view public.beta_testers_ranked
  with (security_invoker = true) as
  select
    t.*,
    row_number() over (order by t.created_at) as seat_no
  from public.beta_testers t;

-- PostgREST 로 뷰가 아예 안 보이게 접근 자체를 회수한다 (security_invoker 와
-- 이중 방어). 대시보드/service_role 조회에는 영향 없다.
revoke all on public.beta_testers_ranked from anon, authenticated;
revoke all on public.beta_testers from anon, authenticated;
