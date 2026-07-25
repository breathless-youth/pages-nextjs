"use client";

import { motion, useReducedMotion } from "motion/react";
import { AppHomeScreen } from "@/components/app/AppHomeScreen";
import { PhoneSlot } from "@/components/PhoneSlot";

const spring = { type: "spring", stiffness: 100, damping: 20 } as const;

function FloatingCard({
  className,
  floatDuration,
  delay,
  children,
}: {
  className: string;
  floatDuration: number;
  delay: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute rounded-2xl border border-orange-200/70 bg-white/90 px-5 py-4 shadow-[0_16px_40px_-18px_rgba(194,65,12,0.35)] backdrop-blur ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.9, y: 12 }}
      animate={
        reduce
          ? undefined
          : { opacity: 1, scale: 1, y: [0, -7, 0] }
      }
      transition={{
        opacity: { ...spring, delay },
        scale: { ...spring, delay },
        y: {
          duration: floatDuration,
          delay: delay + 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function SoftHeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto mt-14 flex w-full max-w-lg justify-center">
      <motion.div
        className="w-full max-w-[290px]"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
      >
        <PhoneSlot frameClassName="border-orange-200/80 bg-white/80 shadow-[0_32px_80px_-32px_rgba(194,65,12,0.4)]">
          <AppHomeScreen />
        </PhoneSlot>
      </motion.div>

      {/* mock: 예시 수치 */}
      <FloatingCard
        className="-left-2 top-16 md:left-0"
        floatDuration={3.4}
        delay={0.45}
      >
        <p className="text-xs font-medium text-stone-500">이번 주 순공</p>
        <p className="mt-0.5 text-xl font-bold tabular-nums tracking-tight text-stone-900">
          18시간 26분
        </p>
      </FloatingCard>

      <FloatingCard
        className="-right-2 bottom-20 md:right-0"
        floatDuration={4.1}
        delay={0.6}
      >
        <p className="text-xs font-medium text-stone-500">어제보다</p>
        <p className="mt-0.5 text-xl font-bold tabular-nums tracking-tight text-orange-700">
          +42분
        </p>
      </FloatingCard>
    </div>
  );
}
