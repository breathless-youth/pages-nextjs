import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * 서버 전용 Supabase 클라이언트 — service_role 키를 쓴다.
 *
 * lib/supabase.ts(브라우저용 publishable 키)와 달리 절대 클라이언트 번들에
 * 들어가면 안 된다. "server-only" import 가 그걸 빌드 타임에 막아준다.
 *
 * service_role 은 RLS 를 우회하므로 beta_testers 테이블에는 anon 정책을
 * 만들지 않았다 — 신청 쓰기는 오직 이 클라이언트를 쓰는 라우트 핸들러뿐이다.
 * (supabase/migrations/0002_beta_testers.sql 참고)
 */

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** 환경변수가 없으면 null — 라우트에서 503 으로 응답해 폼이 조용히 실패하지 않게 한다 */
export const supabaseAdmin =
  url && serviceRoleKey
    ? createClient(url, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

export type Platform = "android" | "ios";

export type BetaTesterInsert = {
  email: string;
  platform: Platform;
  is_waitlist: boolean;
  referrer: string | null;
  user_agent: string | null;
};
