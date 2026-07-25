"use client";

import { motion, useReducedMotion } from "motion/react";
import { CountUp } from "@/components/CountUp";

/**
 * 스톱워치 링: 뷰포트 진입 시 집중률(80%)만큼 스트로크가 채워지고
 * 중앙 시간이 순공 시간(1:24:08)까지 카운트업된다. 수치는 초안 값.
 */
export function ChronoRing() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px]">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        {/* 눈금 */}
        {Array.from({ length: 60 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="6"
            x2="100"
            y2={i % 5 === 0 ? "13" : "9.5"}
            stroke="#d4d4d8"
            strokeWidth={i % 5 === 0 ? 1.6 : 0.8}
            transform={`rotate(${i * 6} 100 100)`}
          />
        ))}
        {/* 트랙 */}
        <circle
          cx="100"
          cy="100"
          r="76"
          fill="none"
          stroke="#e4e4e7"
          strokeWidth="7"
        />
        {/* 순공 링 */}
        <motion.circle
          cx="100"
          cy="100"
          r="76"
          fill="none"
          stroke="#dc2626"
          strokeWidth="7"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 0.8 } : { pathLength: 0 }}
          whileInView={{ pathLength: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Session
        </span>
        <CountUp
          to={1 * 3600 + 24 * 60 + 8}
          duration={1.7}
          variant="clock"
          className="mt-1 font-mono text-4xl font-bold tabular-nums tracking-tight text-zinc-900 md:text-[2.6rem]"
        />
        <span className="mt-2 rounded-full bg-red-600 px-2.5 py-0.5 font-mono text-[11px] font-bold text-white">
          순공 80%
        </span>
      </div>
    </div>
  );
}
