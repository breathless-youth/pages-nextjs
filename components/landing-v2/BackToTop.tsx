"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";

/**
 * 히어로를 지나면 나타나는 맨 위로 버튼 — v2 시안의 showTop 동작.
 * 히어로 섹션을 IntersectionObserver로 보고, 화면에서 벗어나면 띄운다.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const observed = useRef(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero || observed.current) return;
    observed.current = true;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting),
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
      }
      className="animate-top-in fixed right-6 bottom-6 z-50 flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full bg-white text-[#6B7684] shadow-[0_0_0_1px_#E5E8EB,0_10px_24px_rgba(25,31,40,.16)] transition-transform hover:-translate-y-0.5 active:scale-[.92]"
    >
      <CaretDownIcon size={14} weight="bold" className="rotate-180" />
    </button>
  );
}
