"use client";

import { useEffect, useState } from "react";
import {
  ArrowCounterClockwiseIcon,
  PauseIcon,
  StopIcon,
} from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";

/**
 * 측정 화면 재현 (디자인 초안 2번 기반).
 * live=true면 데모 시나리오(집중 → 휴대폰 감지 → 집중 → 자리 비움)를
 * 1초 단위로 재생하며 순공 타이머가 실제로 흐른다.
 */

type DemoStatus = "FOCUS" | "PHONE" | "AWAY";

const SCRIPT: [DemoStatus, number][] = [
  ["FOCUS", 9],
  ["PHONE", 4],
  ["FOCUS", 7],
  ["AWAY", 5],
];
const LOOP = SCRIPT.reduce((sum, [, sec]) => sum + sec, 0);

// 초안의 표시 값에서 시작 (01:24:08 / 총 01:45:12)
const BASE_FOCUS = 1 * 3600 + 24 * 60 + 8;
const BASE_TOTAL = 1 * 3600 + 45 * 60 + 12;

const STATUS_LABEL: Record<DemoStatus, string> = {
  FOCUS: "집중 측정 중",
  PHONE: "휴대폰 감지",
  AWAY: "자리 비움",
};

function statusAt(t: number): DemoStatus {
  let acc = 0;
  for (const [status, sec] of SCRIPT) {
    acc += sec;
    if (t % LOOP < acc) return status;
  }
  return "FOCUS";
}

function focusedUpTo(t: number): number {
  let focused = 0;
  for (let i = 0; i < t; i++) if (statusAt(i) === "FOCUS") focused++;
  return focused;
}

function fmt(sec: number): string {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function AppTimerScreen({ live = false }: { live?: boolean }) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const running = live && !reduce;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const status: DemoStatus = running ? statusAt(tick) : "FOCUS";
  const focus = BASE_FOCUS + (running ? focusedUpTo(tick) : 0);
  const total = BASE_TOTAL + (running ? tick : 0);
  const focusing = status === "FOCUS";

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between bg-[#0b1120] px-4 py-5 text-white">
      {/* 대각선 스트라이프 질감 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.025)_0_9px,transparent_9px_18px)]"
      />

      {/* 상태 칩 */}
      <span
        className={`relative inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium transition-colors duration-500 ${
          focusing
            ? "border-blue-400/30 bg-blue-500/15 text-blue-200"
            : status === "PHONE"
              ? "border-amber-400/30 bg-amber-500/15 text-amber-200"
              : "border-zinc-500/40 bg-zinc-500/15 text-zinc-300"
        }`}
      >
        <span
          className={`h-1 w-1 rounded-full ${
            focusing
              ? "bg-blue-400"
              : status === "PHONE"
                ? "bg-amber-400"
                : "bg-zinc-400"
          }`}
        />
        {STATUS_LABEL[status]}
      </span>

      {/* 타이머 */}
      <div className="relative text-center">
        <p
          className={`font-mono text-[1.9rem] font-semibold tabular-nums tracking-tight transition-all duration-500 ${
            focusing
              ? "text-white [text-shadow:0_0_24px_rgba(96,165,250,0.55)]"
              : "text-zinc-400"
          }`}
        >
          {fmt(focus)}
        </p>
        <p className="mt-1.5 font-mono text-[10px] tabular-nums text-zinc-500">
          총 {fmt(total)}
        </p>
        {!focusing && (
          <p className="mt-2 text-[9px] text-zinc-500">
            집중이 아닐 때는 순공 타이머가 멈춰요
          </p>
        )}
      </div>

      {/* 컨트롤 (장식) */}
      <div className="relative flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <PauseIcon size={13} weight="fill" />
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <ArrowCounterClockwiseIcon size={13} weight="bold" />
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500">
          <StopIcon size={13} weight="fill" />
        </span>
      </div>
    </div>
  );
}
