-- 랜딩 페이지 사전예약 폼(components/main/SignupForm.tsx)이 쓰는 테이블.
-- Supabase 대시보드 > SQL Editor 에 그대로 붙여넣어 실행한다.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  goal text not null,
  email text not null,
  phone text,
  note text
);

-- 같은 이메일로 두 번 신청되지 않게 (대소문자 무시)
create unique index if not exists waitlist_email_lower_key
  on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

-- 브라우저에 노출되는 publishable 키(anon 역할)에는 신청 등록만 허용한다.
-- select/update/delete 정책이 없으므로 신청 목록은 대시보드에서만 볼 수 있다.
drop policy if exists waitlist_insert_anon on public.waitlist;
create policy waitlist_insert_anon
  on public.waitlist for insert
  to anon, authenticated
  with check (true);
