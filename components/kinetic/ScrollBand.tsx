"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/** 스크롤 진행에 따라 가로로 밀려가는 대형 텍스트 밴드. */
export function ScrollBand({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-24%"]);

  return (
    <div ref={ref} className="overflow-hidden py-6" aria-hidden="true">
      <motion.p
        style={reduce ? undefined : { x }}
        className="w-max whitespace-nowrap text-[4.5rem] font-black leading-none tracking-tighter text-zinc-200 md:text-[7rem]"
      >
        {text} <span className="text-lime-500">{text}</span> {text}
      </motion.p>
    </div>
  );
}
