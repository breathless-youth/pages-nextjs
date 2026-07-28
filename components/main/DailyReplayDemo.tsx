"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * "하루 재생" — 180분(21:03~00:03) 세션 기록을 슬라이더로 되돌려보는 데모.
 * 자동 재생 260ms 간격, 사용자가 슬라이더를 움직이면 자동 재생은 멈춘다.
 */

type Mode = "focus" | "away" | "phone" | "device" | "pause";
type Bucket = "focus" | "pause" | "alert";

const RUNS: [Mode, number][] = [
  ["focus", 26],
  ["away", 7],
  ["focus", 18],
  ["phone", 5],
  ["focus", 22],
  ["device", 3],
  ["focus", 16],
  ["away", 9],
  ["focus", 24],
  ["phone", 6],
  ["focus", 14],
  ["pause", 4],
  ["focus", 26],
];

const REC: Mode[] = RUNS.flatMap(([mode, n]) => Array<Mode>(n).fill(mode));

const LABEL: Record<Mode, [string, string]> = {
  focus: ["집중 중", "순공시간이 흐르고 있어요"],
  away: ["자리 이탈 감지", "순공시간만 잠시 멈췄어요"],
  phone: ["휴대폰 사용 감지", "순공시간만 잠시 멈췄어요"],
  device: ["기기 조작 감지", "순공시간만 잠시 멈췄어요"],
  pause: ["일시정지", "순공시간과 총 공부 시간이 모두 멈췄어요"],
};

const KO: Partial<Record<Mode, string>> = {
  away: "자리 이탈",
  phone: "휴대폰 사용",
  device: "기기 조작",
  pause: "수동 일시정지",
};

function bucket(mode: Mode): Bucket {
  if (mode === "focus") return "focus";
  if (mode === "pause") return "pause";
  return "alert";
}

const TONE: Record<Bucket, string> = {
  focus: "#4593FC",
  pause: "#8B95A1",
  alert: "#FF9E1B",
};

const WASH: Record<Bucket, string> = {
  focus: "69,147,252",
  pause: "139,149,161",
  alert: "255,158,27",
};

const GLOW: Record<Bucket, string> = {
  focus: "rgba(49,130,246,.3)",
  pause: "rgba(139,149,161,.16)",
  alert: "rgba(255,158,27,.26)",
};

const SHADOW: Record<Bucket, string> = {
  focus: "0 0 26px rgba(69,147,252,.55)",
  pause: "none",
  alert: "0 0 22px rgba(255,158,27,.4)",
};

function hm(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h ? `${h}시간 ${m}분` : `${m}분`;
}

function clock(minFromStart: number) {
  const t = 21 * 60 + 3 + minFromStart;
  const h = Math.floor(t / 60) % 24;
  const m = t % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const NOTES = [
  {
    at: 33,
    tone: "#FF9E1B",
    text: "자리를 7분 비웠어요. 순공시간은 그 사이 멈춰 있었습니다.",
  },
  {
    at: 51,
    tone: "#FF9E1B",
    text: "휴대폰을 들었습니다. 5분 동안 순공시간만 정지했어요.",
  },
  {
    at: 120,
    tone: "#4593FC",
    text: "여기서 24분 연속 집중. 오늘 가장 긴 구간이에요.",
  },
  {
    at: 152,
    tone: "#8B95A1",
    text: "직접 일시정지를 눌렀어요. 이때는 순공시간과 총 공부 시간이 모두 멈춥니다.",
  },
] as const;

const LEGEND: { mode: Mode; label: string }[] = [
  { mode: "focus", label: "집중" },
  { mode: "phone", label: "비집중" },
  { mode: "pause", label: "일시정지" },
];

export function DailyReplayDemo() {
  const reduce = useReducedMotion();
  const [scrubIdx, setScrubIdx] = useState(96);
  const [autoScrub, setAutoScrub] = useState(true);

  useEffect(() => {
    if (!autoScrub || reduce) return;
    const id = setInterval(() => {
      setScrubIdx((v) => (v + 1) % REC.length);
    }, 260);
    return () => clearInterval(id);
  }, [autoScrub, reduce]);

  const mode = REC[scrubIdx];
  const b = bucket(mode);

  const { netMin, totalMin, breakdown } = useMemo(() => {
    let net = 0;
    let pause = 0;
    const br: Partial<Record<Mode, number>> = {};
    for (let k = 0; k <= scrubIdx; k++) {
      const m = REC[k];
      if (m === "focus") net++;
      else {
        br[m] = (br[m] ?? 0) + 1;
        if (m === "pause") pause++;
      }
    }
    return { netMin: net, totalMin: scrubIdx + 1 - pause, breakdown: br };
  }, [scrubIdx]);

  const breakdownKeys = Object.keys(breakdown) as Mode[];
  const breakdownList = breakdownKeys.length
    ? breakdownKeys.map((k) => ({
        key: k,
        label: KO[k]!,
        value: `${breakdown[k]}분`,
      }))
    : [{ key: "none", label: "아직 없어요", value: "0분" }];

  const notes = NOTES.filter((n) => scrubIdx >= n.at)
    .slice(-3)
    .map((n) => ({ ...n, time: clock(n.at) }));

  const pct = totalMin > 0 ? Math.round((netMin / totalMin) * 100) : 0;

  return (
    <section id="demo" className="bg-[#0B0F14] px-6 py-20 md:px-11 md:py-24">
      <div className="mx-auto max-w-[1050px]">
        <div className="flex flex-col items-center gap-3.5 text-center">
          <span className="text-sm font-bold tracking-[0.4px] text-[#4593FC]">
            하루 재생
          </span>
          <h2 className="text-[28px] font-bold leading-[1.3] tracking-[-1px] text-[#F9FAFB] md:text-[38px] md:tracking-[-1.3px]">
            바를 끌어서 어제의 3시간을 되돌려보세요
          </h2>
          <p className="max-w-[620px] text-[15px] leading-relaxed text-[#B0B8C1] md:text-[16.5px]">
            실제 테스터 한 명의 세션 기록입니다. 시간을 옮기면 그 순간
            FocusON이 무엇을 보고 있었는지 그대로 보여줍니다.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-10 md:mt-[52px] md:flex-row md:items-center md:justify-center md:gap-[52px]">
          {/* 폰 목업 */}
          <div
            className="relative aspect-[308/640] w-[260px] flex-none rounded-[46px] bg-black p-[11px] shadow-[0_40px_90px_rgba(0,0,0,.55),0_0_0_1px_rgba(255,255,255,.14)] sm:w-[308px]"
            aria-hidden="true"
          >
            <div className="absolute top-[26px] left-1/2 z-10 h-6 w-[82px] -translate-x-1/2 rounded-full bg-black" />
            <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-[#0B0F14]">
              <div
                className="absolute inset-0 transition-shadow duration-500"
                style={{ boxShadow: `inset 0 0 90px 14px ${GLOW[b]}` }}
              />

              <div className="absolute top-16 right-0 left-0 flex flex-col items-center gap-2">
                <span
                  className="flex h-[34px] items-center gap-2 rounded-full px-[15px] text-[13.5px] font-semibold"
                  style={{
                    color: TONE[b],
                    background: `rgba(${WASH[b]},.16)`,
                    border: `1px solid rgba(${WASH[b]},.5)`,
                  }}
                >
                  <span
                    className={`h-[7px] w-[7px] rounded-full ${
                      b === "focus" ? "animate-glow-pulse" : ""
                    }`}
                    style={{ background: TONE[b] }}
                  />
                  {LABEL[mode][0]}
                </span>
                <span
                  className="text-[12.5px]"
                  style={{ color: b === "focus" ? "rgba(255,255,255,.45)" : "#FF9E1B" }}
                >
                  {LABEL[mode][1]}
                </span>
              </div>

              <div className="absolute top-[236px] right-0 left-0 flex flex-col items-center gap-[7px]">
                <span className="text-[12.5px] font-medium text-white/45">
                  순공시간
                </span>
                <span
                  className="font-mono text-[52px] leading-[60px] font-bold tracking-[-2.2px] text-white tabular-nums sm:text-[56px]"
                  style={{ textShadow: SHADOW[b] }}
                >
                  {hm(netMin * 60)}
                </span>
                <span className="font-mono text-[13px] text-white/40 tabular-nums">
                  총 공부 {hm(totalMin * 60)} · {clock(scrubIdx)}
                </span>
              </div>

              <div className="absolute right-[22px] bottom-[118px] left-[22px] rounded-2xl border border-white/10 bg-white/[.06] p-4">
                <span className="text-xs font-semibold text-white/55">
                  지금까지 비집중
                </span>
                <div className="mt-2.5 flex flex-col gap-2">
                  {breakdownList.map((row) => (
                    <div
                      key={row.key}
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5 text-[13px] text-[#F9FAFB]">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background:
                              row.key === "none"
                                ? "#4E5968"
                                : TONE[bucket(row.key as Mode)],
                          }}
                        />
                        {row.label}
                      </span>
                      <span className="font-mono text-[12.5px] text-[#B0B8C1] tabular-nums">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute right-4 bottom-[26px] left-4 flex h-[62px] items-center justify-center rounded-[18px] border border-white/[.14] bg-[rgba(28,34,42,.94)]">
                <span className="text-[13.5px] font-semibold text-white/70">
                  측정 중 · 화면을 탭하면 심플 모드
                </span>
              </div>
            </div>
          </div>

          {/* 세션 타임라인 */}
          <div className="flex w-full min-w-0 flex-1 flex-col gap-[26px] sm:max-w-[420px]">
            <div className="rounded-[20px] border border-white/[.12] bg-white/5 p-[26px]">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-[#F9FAFB]">
                  세션 타임라인
                </span>
                <span className="font-mono text-[13px] text-[#8B95A1] tabular-nums">
                  21:03 – 00:03
                </span>
              </div>

              <div className="relative mt-4">
                <div className="flex h-[22px] overflow-hidden rounded-lg">
                  {REC.map((m, n) => (
                    <span
                      key={n}
                      className="h-full"
                      style={{
                        width: `${100 / REC.length}%`,
                        background: TONE[bucket(m)],
                        opacity: n <= scrubIdx ? 1 : 0.22,
                      }}
                    />
                  ))}
                </div>
                <div
                  className="pointer-events-none absolute -top-[5px] -bottom-[5px] w-[3px] rounded-sm bg-white shadow-[0_0_12px_rgba(255,255,255,.8)]"
                  style={{ left: `${(scrubIdx / (REC.length - 1)) * 100}%` }}
                />
              </div>

              <input
                type="range"
                min={0}
                max={REC.length - 1}
                value={scrubIdx}
                onChange={(e) => {
                  setScrubIdx(Number(e.target.value));
                  setAutoScrub(false);
                }}
                className="mt-4 w-full cursor-pointer accent-[#3182F6]"
                aria-label="세션 타임라인 되감기"
              />

              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-3">
                  {LEGEND.map((l) => (
                    <span
                      key={l.mode}
                      className="flex items-center gap-1.5 text-[11.5px] text-[#8B95A1]"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: TONE[bucket(l.mode)] }}
                      />
                      {l.label}
                    </span>
                  ))}
                </div>
                <span className="text-[11.5px] text-[#8B95A1]">
                  {pct}% 집중
                </span>
              </div>

              <div className="mt-3 border-t border-white/10 pt-3 text-[11.5px] leading-relaxed text-[#6B7684]">
                되돌려보기는 이 페이지에서만 제공하는 데모예요. 앱에서는
                세션이 끝난 뒤 같은 내용을 공부 결과 리포트로 보여드립니다.
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {notes.map((n) => (
                <div
                  key={n.at}
                  className="flex flex-col gap-1.5 rounded-r-2xl bg-white/5 py-4 pr-[18px] pl-[18px]"
                  style={{ borderLeft: `3px solid ${n.tone}` }}
                >
                  <span
                    className="font-mono text-xs font-bold tabular-nums"
                    style={{ color: n.tone }}
                  >
                    {n.time}
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-[#F9FAFB]">
                    {n.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
