"use client";

import { useId, useState } from "react";

/**
 * 최종 CTA의 목표 선택 + 이메일 입력. 백엔드가 없어 제출은 로컬 상태만 바꾼다
 * (아무 곳에도 전송·저장되지 않음).
 */

const GOALS = ["수능", "공무원", "자격증"] as const;

export function SignupForm() {
  const emailId = useId();
  const [goal, setGoal] = useState<(typeof GOALS)[number]>("수능");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mt-2 flex w-full max-w-[520px] flex-col gap-3">
      <div
        className="flex flex-wrap justify-center gap-2"
        role="radiogroup"
        aria-label="준비 중인 시험"
      >
        {GOALS.map((g) => {
          const active = goal === g;
          return (
            <button
              key={g}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setGoal(g)}
              className={`flex h-9 items-center rounded-full border px-4 text-[13.5px] font-semibold transition-colors ${
                active
                  ? "border-[#191F28] bg-[#191F28] text-white"
                  : "border-[#D1D6DB] bg-white text-[#6B7684] hover:border-[#191F28]"
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>

      <form
        className="flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <label htmlFor={emailId} className="sr-only">
          이메일 주소
        </label>
        <input
          id={emailId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          className="h-14 flex-1 basis-[260px] rounded-2xl border border-[#D1D6DB] bg-white px-[18px] text-[15.5px] text-[#191F28] outline-none focus:border-[#1B64DA]"
        />
        <button
          type="submit"
          disabled={submitted}
          className="flex h-14 items-center justify-center rounded-2xl bg-[#1B64DA] px-7 text-center text-[16.5px] font-bold text-white shadow-[0_10px_26px_rgba(27,100,218,.28)] transition-colors hover:bg-[#1957C2] disabled:cursor-default disabled:opacity-90 disabled:hover:bg-[#1B64DA]"
        >
          {submitted ? "신청 완료 · 메일을 확인해 주세요" : "사전예약 신청하기"}
        </button>
      </form>

      <p className="text-center text-[13px] text-[#8B95A1]">
        <span className="font-bold text-[#191F28]">2,418명</span>이 이미
        사전예약했어요 · 언제든 수신 해지 가능
      </p>
    </div>
  );
}
