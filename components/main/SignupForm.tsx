"use client";

import { useId, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * 최종 CTA의 사전예약 폼. 제출하면 Supabase의 waitlist 테이블에 신청을 남긴다
 * (테이블·정책은 supabase/migrations/0001_waitlist.sql).
 */

const GOALS = [
  "수능",
  "공무원 · 공기업",
  "자격증 · 어학",
  "편입 · 대학원",
  "고시 · 전문직",
  "내신 · 학교 시험",
  "기타",
] as const;

// TODO: 실제 사전예약 수가 쌓이면 되살린다
// const WAITLIST_COUNT = 2418;

const CHEVRON =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='9'><path d='M1 1.5 7 7.5 13 1.5' fill='none' stroke='%236B7684' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>\")";

const FIELD =
  "h-[54px] rounded-[13px] border border-[#D1D6DB] bg-white px-4 text-[15.5px] text-[#191F28] outline-none transition-colors focus:border-[#1B64DA]";

export function SignupForm() {
  const goalId = useId();
  const emailId = useId();
  const phoneId = useId();
  const noteId = useId();

  const [goal, setGoal] = useState<(typeof GOALS)[number]>("수능");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const submitted = status === "done";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || submitted) return;

    setStatus("sending");
    setMessage("");

    const { error } = await supabase.from("waitlist").insert({
      goal,
      email: email.trim().toLowerCase(),
      phone: phone.trim() || null,
      note: note.trim() || null,
    });

    if (error) {
      // 23505 = unique 위반. 이미 신청한 이메일이므로 완료로 본다
      if (error.code === "23505") {
        setStatus("done");
        setMessage("이미 사전예약된 이메일이에요. 출시되면 알려드릴게요.");
        return;
      }
      setStatus("error");
      setMessage("신청을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }

    setStatus("done");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex w-full max-w-[540px] flex-col gap-[18px] rounded-[22px] border border-[#E5E8EB] bg-white p-[30px] shadow-[0_16px_44px_rgba(0,0,0,.06)]"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor={goalId}
          className="text-[13.5px] font-bold text-[#191F28]"
        >
          준비하는 시험
        </label>
        <select
          id={goalId}
          value={goal}
          onChange={(e) => setGoal(e.target.value as (typeof GOALS)[number])}
          className={`${FIELD} cursor-pointer appearance-none bg-[right_18px_center] bg-no-repeat font-medium`}
          style={{ backgroundImage: CHEVRON }}
        >
          {GOALS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={emailId}
          className="text-[13.5px] font-bold text-[#191F28]"
        >
          이메일 주소
        </label>
        <input
          id={emailId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="pome@example.com"
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={phoneId}
          className="flex items-center gap-[7px] text-[13.5px] font-bold text-[#191F28]"
        >
          전화번호
          <span className="text-xs font-medium text-[#8B95A1]">
            선택 · 테스터 선발 시 안내용
          </span>
        </label>
        <input
          id={phoneId}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="010-0000-0000"
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={noteId}
          className="flex items-center gap-[7px] text-[13.5px] font-bold text-[#191F28]"
        >
          하고 싶은 말
          <span className="text-xs font-medium text-[#8B95A1]">선택</span>
        </label>
        <textarea
          id={noteId}
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="공부하면서 가장 불편했던 점이나 바라는 기능을 적어주세요"
          className="resize-y rounded-[13px] border border-[#D1D6DB] bg-white px-4 py-3.5 text-[15.5px] leading-[1.6] text-[#191F28] outline-none transition-colors focus:border-[#1B64DA]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || submitted}
        className="flex h-[58px] items-center justify-center rounded-[14px] bg-[#1B64DA] text-center text-[16.5px] font-bold text-white shadow-[0_10px_26px_rgba(27,100,218,.28)] transition-colors hover:bg-[#1957C2] disabled:cursor-default disabled:opacity-90 disabled:hover:bg-[#1B64DA]"
      >
        {submitted
          ? "신청 완료 · 메일을 확인해 주세요"
          : status === "sending"
            ? "신청하는 중…"
            : "사전예약 신청하기"}
      </button>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`text-center text-[13.5px] leading-[1.6] ${
            status === "error" ? "text-[#E5484D]" : "text-[#6B7684]"
          }`}
        >
          {message}
        </p>
      )}

      {/* WAITLIST_COUNT와 함께 되살린다
      <p className="text-center text-[13px] leading-[1.6] text-[#8B95A1]">
        <span className="font-bold text-[#191F28]">
          {WAITLIST_COUNT.toLocaleString("ko-KR")}명
        </span>
        이 이미 사전예약했어요 · 언제든 수신 해지 가능
      </p>
      */}
    </form>
  );
}
