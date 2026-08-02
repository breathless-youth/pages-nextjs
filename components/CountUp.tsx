"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const formatters = {
  // 13320 → "3시간 42분"
  "ko-hm": (sec: number) =>
    `${Math.floor(sec / 3600)}시간 ${Math.floor((sec % 3600) / 60)}분`,
  // 5048 → "1:24:08"
  clock: (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  },
  plain: (v: number) => String(v),
} as const;

/**
 * 뷰포트 진입 시 0에서 목표값까지 세어 올라가는 숫자.
 * variant는 문자열 프리셋 (서버 컴포넌트에서 함수 prop 전달 불가).
 */
export function CountUp({
  to,
  duration = 1.6,
  variant = "plain",
  className = "",
}: {
  to: number;
  duration?: number;
  variant?: keyof typeof formatters;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    // 모션을 줄이는 설정에서는 애니메이션 없이 렌더 시점에 목표값을 그린다
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className}>
      {formatters[variant](reduce && inView ? to : value)}
    </span>
  );
}
