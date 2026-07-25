"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const words = ["휴대폰 본 시간", "자리 비운 시간", "멍 때린 시간", "존 시간"];

/** 히어로 헤드라인 속에서 딴짓 목록이 순환하는 회전 단어. */
export function KineticWords() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 3000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-[1.4em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="inline-block whitespace-nowrap bg-lime-300 px-2 leading-[1.4]"
          initial={reduce ? false : { y: "115%" }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: "-115%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
