"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// mock: 주간 순공 비율
const weekBars = [58, 74, 41, 88, 69, 26, 81];

/** 뷰포트 진입 시 아래에서 자라나는 주간 막대. */
export function BarGrow() {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-20 items-end gap-1.5" aria-hidden="true">
      {weekBars.map((h, i) => (
        <motion.div
          key={i}
          initial={reduce ? { height: `${h}%` } : { height: "8%" }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            delay: i * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`w-full rounded-md ${
            i === 3 ? "bg-blue-600" : "bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

/** 스트릭 도트가 순서대로 채워지는 타일. */
export function DotFill({ days = 12 }: { days?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid grid-cols-6 gap-1.5" aria-hidden="true">
      {Array.from({ length: days }).map((_, i) => (
        <motion.span
          key={i}
          initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.35,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="aspect-square w-full rounded-md bg-blue-600"
        />
      ))}
    </div>
  );
}

const cycle = [
  { label: "집중 중", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "휴대폰 사용", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "자리 이탈", cls: "bg-slate-100 text-slate-500 border-slate-200" },
];

/** 감지 상태 칩이 순환 전환되는 타일. */
export function StatusCycle() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % cycle.length), 2400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative h-8" aria-hidden="true">
      {cycle.map((c, idx) => (
        <motion.span
          key={c.label}
          initial={false}
          animate={{
            opacity: idx === i ? 1 : 0,
            y: idx === i ? 0 : 8,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute left-0 top-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${c.cls}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          {c.label}
        </motion.span>
      ))}
    </div>
  );
}
