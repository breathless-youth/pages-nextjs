"use client";

import { useEffect, useState } from "react";
import {
  CameraRotateIcon,
  PauseIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";

/**
 * 세션(S3) — V1.0 최종. 세션 오버레이 전용 컬러(6차 확정): 집중 #4593FC · 비집중 #FF9E1B.
 * live=true면 데모 시나리오(집중→휴대폰→집중→자리 이탈)를 1초 단위로 재생.
 * 비집중 중에는 순공만 멈추고 총 공부 시간은 계속 흐른다.
 */

type DemoStatus = "FOCUS" | "PHONE" | "AWAY";

const SCRIPT: [DemoStatus, number][] = [
  ["FOCUS", 9],
  ["PHONE", 4],
  ["FOCUS", 7],
  ["AWAY", 5],
];
const LOOP = SCRIPT.reduce((sum, [, sec]) => sum + sec, 0);

const BASE_FOCUS = 1 * 3600 + 24 * 60 + 8;
const BASE_TOTAL = 1 * 3600 + 45 * 60 + 12;

const STATUS: Record<DemoStatus, { label: string; sub?: string }> = {
  FOCUS: { label: "집중 측정 중" },
  PHONE: {
    label: "휴대폰을 사용 중인 것 같아요",
    sub: "내려놓으면 자동으로 다시 측정돼요",
  },
  AWAY: {
    label: "자리를 비운 것 같아요",
    sub: "돌아오면 자동으로 다시 측정돼요",
  },
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
    <div className="relative flex h-full w-full flex-col items-center bg-[#0B0F14] px-3 py-4 text-white">
      {/* 카메라 프리뷰 대체 질감 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.02)_0_9px,transparent_9px_18px)]"
      />

      {/* 상태 필 (다크 글래스) */}
      <div className="relative flex flex-col items-center gap-1">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[9.5px] font-medium backdrop-blur-sm">
          <span
            className="h-1 w-1 rounded-full transition-colors duration-500"
            style={{ background: focusing ? "#4593FC" : "#FF9E1B" }}
          />
          {STATUS[status].label}
        </span>
        {STATUS[status].sub && (
          <span className="text-[8px] text-white/45">{STATUS[status].sub}</span>
        )}
      </div>

      {/* 순공 타이머 + 총 공부 병기 */}
      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <p
          className={`font-mono text-[1.9rem] font-semibold tabular-nums tracking-tight transition-all duration-500 ${
            focusing
              ? "text-white [text-shadow:0_0_24px_rgba(69,147,252,0.55)]"
              : "text-white/40"
          }`}
        >
          {fmt(focus)}
        </p>
        <p className="mt-1 font-mono text-[10px] tabular-nums text-white/40">
          총 {fmt(total)}
        </p>
      </div>

      {/* 프라이버시 캡션 + 하단 컨트롤 바 */}
      <div className="relative flex w-full flex-col items-center gap-2">
        <p className="text-[8px] text-white/35">영상은 기기 안에서만 처리돼요</p>
        <div className="flex w-full max-w-[190px] flex-col items-center rounded-2xl border border-white/10 bg-black/40 px-4 pb-2.5 pt-1.5 backdrop-blur-sm">
          <span className="mb-2 h-0.5 w-7 rounded-full bg-white/20" />
          <div className="flex w-full items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <PauseIcon size={12} weight="fill" />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <CameraRotateIcon size={12} />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F04452]">
              <SignOutIcon size={12} weight="bold" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
