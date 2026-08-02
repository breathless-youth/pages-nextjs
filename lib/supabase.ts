import { createClient } from "@supabase/supabase-js";

/**
 * 사전예약 폼 전용 Supabase 클라이언트.
 * publishable 키는 어차피 브라우저 번들에 실려 공개되는 값이라 환경변수로 빼지 않는다.
 * 쓰기 권한은 DB의 RLS 정책으로 막는다 — waitlist 테이블은 insert만 허용하고
 * select 정책이 없어 브라우저에서는 신청 목록을 읽을 수 없다
 * (supabase/migrations/0001_waitlist.sql 참고).
 */

const SUPABASE_URL = "https://pkdbtjvcdllcgbaatkmd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_DvtXeM_gS4jxue9VZ0m7bA_3tatCTQE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export type WaitlistEntry = {
  goal: string;
  email: string;
  phone: string | null;
  note: string | null;
};
