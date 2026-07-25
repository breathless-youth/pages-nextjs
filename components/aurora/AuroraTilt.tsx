"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { AppHomeScreen } from "@/components/app/AppHomeScreen";
import { PhoneSlot } from "@/components/PhoneSlot";

/** 마우스를 따라 3D로 기우는 글래스 폰. 모션 값만 사용, 리렌더 없음. */
export function AuroraTilt() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 120,
    damping: 18,
  });

  return (
    <div
      className="flex justify-center [perspective:1100px]"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY }}
        className="w-full max-w-[270px] will-change-transform"
      >
        <PhoneSlot frameClassName="border-white/15 bg-white/[0.07] backdrop-blur-md shadow-[0_48px_120px_-48px_rgba(45,212,191,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]">
          <AppHomeScreen />
        </PhoneSlot>
      </motion.div>
    </div>
  );
}
