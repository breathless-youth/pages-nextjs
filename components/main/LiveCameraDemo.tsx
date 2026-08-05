"use client";

import { useEffect, useState } from "react";

/**
 * "측정 화면" — 왼쪽은 카메라가 보고 있는 장면, 오른쪽은 같은 순간의 앱 화면.
 * 상태를 바꾸면 순공시간과 총 공부 시간이 어떻게 갈라지는지 1초 단위로 보인다.
 * 백엔드 없이 로컬 상태만 도는 데모다.
 */

type Mode = "focus" | "away" | "phone" | "pause";
type Tone = "focus" | "alert" | "pause";

const TONE_OF: Record<Mode, Tone> = {
  focus: "focus",
  away: "alert",
  phone: "alert",
  pause: "pause",
};

const COLOR: Record<Tone, string> = {
  focus: "#4593FC",
  alert: "#FF9E1B",
  pause: "#8B95A1",
};

const WASH: Record<Tone, string> = {
  focus: "69,147,252",
  alert: "255,158,27",
  pause: "139,149,161",
};

const GLOW: Record<Tone, string> = {
  focus: "rgba(49,130,246,.3)",
  alert: "rgba(255,158,27,.26)",
  pause: "rgba(139,149,161,.16)",
};

const TEXT_SHADOW: Record<Tone, string> = {
  focus: "0 0 26px rgba(69,147,252,.55)",
  alert: "0 0 22px rgba(255,158,27,.4)",
  pause: "none",
};

/** 버튼 활성 색은 톤과 따로 간다 (집중만 조금 더 진한 파랑). */
const BUTTON_COLOR: Record<Mode, string> = {
  focus: "#3182F6",
  away: "#FF9E1B",
  phone: "#FF9E1B",
  pause: "#8B95A1",
};

const SCENE: Record<Mode, { img: string; tag: string; note: string }> = {
  focus: {
    img: "/pome/cam-focus.webp",
    tag: "자세 유지 · 움직임 안정",
    note: "책상 앞에 앉아 노트에 쓰고 있어요",
  },
  away: {
    img: "/pome/cam-away.webp",
    tag: "자리 이탈 12초 경과",
    note: "자리에서 일어나 프레임을 벗어났어요",
  },
  phone: {
    img: "/pome/cam-phone.webp",
    tag: "휴대폰 사용으로 판단",
    note: "노트 위에서 휴대폰을 들고 있어요",
  },
  pause: {
    img: "/pome/cam-pause.webp",
    tag: "측정을 잠시 중단",
    note: "쉬는 시간 — 직접 눌러 멈췄어요",
  },
};

/** 네 장면을 겹쳐 두고 투명도만 바꾼다 — 상태를 처음 누를 때 이미지가 늦게 떠서 비는 프레임이 생기지 않는다. */
const SCENE_ORDER: Mode[] = ["focus", "away", "phone", "pause"];

const PILL_LABEL: Record<Mode, string> = {
  focus: "집중 측정 중",
  away: "자리 이탈",
  phone: "휴대폰 사용",
  pause: "일시정지",
};

const HINT: Record<Tone, string> = {
  focus: "집중 측정 중 — 순공시간이 흘러요",
  alert: "자동으로 판단한 비집중 — 순공시간만 멈추고 총 공부 시간은 계속 흘러요",
  pause: "수동 일시정지 — 순공시간과 총 공부 시간이 모두 멈춰요",
};

const CONTROLS: { mode: Mode; label: string }[] = [
  { mode: "focus", label: "집중 측정 중" },
  { mode: "away", label: "자리 이탈" },
  { mode: "phone", label: "휴대폰 사용" },
  { mode: "pause", label: "일시정지" },
];

const LEGEND: { tone: Tone; label: string }[] = [
  { tone: "focus", label: "집중" },
  { tone: "alert", label: "비집중" },
  { tone: "pause", label: "일시정지" },
];

const SEG_COUNT = 60;

/** 이미 2시간 43분쯤 흘러간 세션에서 시작한다 (총 공부 3시간 28분). */
const START_NET = 9821;
const START_TOTAL = 12480;

/** 서버·클라이언트가 같은 값을 그리도록 결정적으로 만든 초기 타임라인. */
const SEED: Mode[] = Array.from({ length: SEG_COUNT }, (_, i) =>
  i % 17 === 0 || i % 17 === 1 ? "away" : "focus",
);

function hm(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h ? `${h}시간 ${m}분` : `${m}분`;
}

export function LiveCameraDemo() {
  const [mode, setMode] = useState<Mode>("focus");
  const [net, setNet] = useState(START_NET);
  const [total, setTotal] = useState(START_TOTAL);
  const [seg, setSeg] = useState<Mode[]>(SEED);

  useEffect(() => {
    const id = setInterval(() => {
      if (mode !== "pause") setTotal((v) => v + 1);
      if (mode === "focus") setNet((v) => v + 1);
      setSeg((v) => [...v.slice(1), mode]);
    }, 1000);
    return () => clearInterval(id);
  }, [mode]);

  const tone = TONE_OF[mode];
  const scene = SCENE[mode];
  const pct = Math.round((net / Math.max(total, 1)) * 100);
  const paused = mode === "pause";

  return (
    <section
      id="live"
      className="mt-[100px] bg-[#0B0F14] px-6 py-20 md:mt-[150px] md:px-11 md:pt-[110px] md:pb-[120px]"
    >
      <div className="mx-auto max-w-[1080px]">
        <div className="flex flex-col items-center gap-3.5 text-center">
          <span className="text-sm font-bold tracking-[0.4px] text-[#4593FC]">
            측정 화면
          </span>
          <h2 className="text-[28px] leading-[1.3] font-bold tracking-[-1px] text-[#F9FAFB] md:text-[38px] md:tracking-[-1.3px]">
            카메라가 보고, 시간이 쌓여요
          </h2>
          <p className="max-w-[640px] text-[15px] leading-[1.7] text-[#B0B8C1] md:text-[16.5px]">
            왼쪽은 카메라가 보고 있는 장면, 오른쪽은 그 순간 앱 화면이 어떻게
            바뀌는지 보여드려요. 아래 버튼으로 상황을 바꿔보면 순공시간이
            어떻게 반응하는지 바로 확인할 수 있어요.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-10 md:mt-14 lg:flex-row lg:items-stretch lg:gap-11">
          {/* 카메라가 보고 있는 장면 */}
          <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-1 lg:basis-[460px]">
            <div
              className="relative h-[300px] overflow-hidden rounded-[24px] border border-white/[.16] bg-[#E8E2D6] sm:h-[380px] lg:h-[420px]"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[linear-gradient(#F4F0E8_0%,#E7E0D3_58%,#D2C9B9_58%,#C6BCAA_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(72%_58%_at_50%_28%,rgba(255,255,255,.55),transparent_72%)]" />
              <div className="absolute inset-0 shadow-[inset_0_0_90px_30px_rgba(20,24,31,.2)]" />

              <div className="absolute top-[26px] right-[26px] bottom-[28%] left-[26px]">
                <div className="absolute bottom-0 left-1/2 h-7 w-[56%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(20,24,31,.32),transparent_78%)]" />
                {SCENE_ORDER.map((m) => (
                  <div
                    key={m}
                    className={`absolute inset-0 bg-contain bg-bottom bg-no-repeat transition-opacity duration-200 ${
                      m === "focus" && mode === "focus" ? "animate-float-y" : ""
                    }`}
                    style={{
                      backgroundImage: `url(${SCENE[m].img})`,
                      opacity: mode === m ? 1 : 0,
                    }}
                  />
                ))}
              </div>

              <div
                className="absolute top-[9%] right-[22%] bottom-[29%] left-[22%] rounded-[18px] transition-all duration-300"
                style={{
                  border: `2px dashed ${COLOR[tone]}${
                    mode === "away" ? "55" : "cc"
                  }`,
                }}
              />

              <div className="absolute top-[18px] right-[18px] left-[18px] flex items-center justify-between gap-3">
                <span className="flex h-7 items-center gap-[7px] rounded-lg bg-black/55 px-[11px] text-xs font-bold tracking-[0.4px] text-white">
                  <span className="animate-glow-pulse h-[7px] w-[7px] rounded-full bg-[#F04452]" />
                  LIVE
                </span>
                <span className="flex h-7 items-center rounded-lg bg-black/55 px-[11px] text-[11.5px] font-semibold text-[#B0B8C1]">
                  얼굴이 안 나와도 괜찮아요
                </span>
              </div>

              <div className="absolute right-[18px] bottom-[18px] left-[18px] flex flex-col gap-2 rounded-2xl border border-white/[.12] bg-[rgba(11,15,20,.82)] px-[18px] py-4">
                <span
                  className="flex h-7 items-center self-start rounded-lg px-[11px] text-xs font-bold tabular-nums"
                  style={{
                    color: COLOR[tone],
                    background: `rgba(${WASH[tone]},.16)`,
                  }}
                >
                  {scene.tag}
                </span>
                <span className="text-[14.5px] leading-[1.5] text-[#F9FAFB]">
                  {scene.note}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 rounded-[20px] border border-white/[.12] bg-white/5 p-[22px]">
              <span className="text-[13.5px] font-bold text-[#F9FAFB]">
                지금 상황을 바꿔보세요
              </span>
              <div className="flex flex-wrap gap-2">
                {CONTROLS.map((c) => {
                  const active = mode === c.mode;
                  return (
                    <button
                      key={c.mode}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setMode(c.mode)}
                      className="flex h-10 items-center gap-2 rounded-[11px] border px-4 text-[13.5px] font-semibold transition-all duration-150"
                      style={
                        active
                          ? {
                              background: BUTTON_COLOR[c.mode],
                              borderColor: BUTTON_COLOR[c.mode],
                              color: "#0B0F14",
                            }
                          : {
                              background: "rgba(255,255,255,.06)",
                              borderColor: "rgba(255,255,255,.16)",
                              color: "#B0B8C1",
                            }
                      }
                    >
                      <span className="h-[7px] w-[7px] rounded-full bg-current" />
                      {c.label}
                    </button>
                  );
                })}
              </div>
              <p aria-live="polite" className="text-[13px] leading-[1.6] text-[#8B95A1]">
                {HINT[tone]}
              </p>
            </div>
          </div>

          {/* 같은 순간의 앱 화면 */}
          <div className="flex flex-none flex-col items-center gap-[18px]">
            <div className="relative h-[600px] w-[288px] rounded-[46px] bg-black p-[11px] shadow-[0_40px_90px_rgba(0,0,0,.55),0_0_0_1px_rgba(255,255,255,.14)] sm:h-[640px] sm:w-[308px]">
              <div className="absolute top-6 left-1/2 z-10 h-6 w-[82px] -translate-x-1/2 rounded-full bg-black sm:top-[26px]" />
              <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-[#0B0F14]">
                <div
                  className="absolute inset-0 transition-shadow duration-500"
                  style={{ boxShadow: `inset 0 0 90px 14px ${GLOW[tone]}` }}
                />

                <div className="absolute top-[58px] right-0 left-0 flex justify-center sm:top-16">
                  <span
                    className="flex h-[34px] items-center gap-2 rounded-full px-[15px] text-[13.5px] font-semibold"
                    style={{
                      color: COLOR[tone],
                      background: `rgba(${WASH[tone]},.16)`,
                      border: `1px solid rgba(${WASH[tone]},.5)`,
                    }}
                  >
                    <span
                      className={`h-[7px] w-[7px] rounded-full ${
                        mode === "focus" ? "animate-glow-pulse" : ""
                      }`}
                      style={{ background: COLOR[tone] }}
                    />
                    {PILL_LABEL[mode]}
                  </span>
                </div>

                <div className="absolute top-[138px] right-0 left-0 flex flex-col items-center gap-1.5 sm:top-[150px]">
                  <span className="text-[12.5px] font-medium text-white/50">
                    순공시간
                  </span>
                  <span
                    className="text-[46px] leading-[52px] font-bold tracking-[-2px] text-white tabular-nums sm:text-[52px] sm:leading-[58px]"
                    style={{ textShadow: TEXT_SHADOW[tone] }}
                  >
                    {hm(net)}
                  </span>
                  <span className="text-[13px] text-white/[.42] tabular-nums">
                    총 공부 {hm(total)}
                  </span>
                </div>

                <div className="absolute top-[276px] right-[22px] left-[22px] flex flex-col gap-[9px] sm:top-[296px]">
                  <div className="flex h-3 overflow-hidden rounded-full bg-white/[.08]">
                    {seg.map((s, i) => (
                      <span
                        key={i}
                        style={{
                          width: `${100 / SEG_COUNT}%`,
                          background: COLOR[TONE_OF[s]],
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-[11px]">
                    {LEGEND.map((l) => (
                      <span
                        key={l.tone}
                        className="flex items-center gap-[5px] text-[11px] text-white/55"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: COLOR[l.tone] }}
                        />
                        {l.label}
                      </span>
                    ))}
                    <span className="ml-auto text-[11.5px] font-semibold text-[#4593FC] tabular-nums">
                      {pct}% 집중
                    </span>
                  </div>
                </div>

                <div className="absolute right-0 bottom-[30px] left-0 flex justify-center sm:bottom-[34px]">
                  <div className="relative flex items-center gap-[22px] rounded-full border border-white/10 bg-[rgba(22,27,34,.6)] pt-4 pr-6 pb-3 pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 left-1/2 h-1 w-9 -translate-x-1/2 rounded-full bg-white/[.22]"
                    />
                    <button
                      type="button"
                      onClick={() => setMode(paused ? "focus" : "pause")}
                      aria-label={paused ? "측정 다시 시작" : "측정 일시정지"}
                      className="flex h-[50px] w-[50px] items-center justify-center rounded-full transition-colors"
                      style={{ background: paused ? "#4593FC" : "#3182F6" }}
                    >
                      {paused ? (
                        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M7 4.8v14.4L19.5 12Z" fill="#fff" />
                        </svg>
                      ) : (
                        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                          <rect x="6.4" y="5" width="4" height="14" rx="1.4" fill="#fff" />
                          <rect x="13.6" y="5" width="4" height="14" rx="1.4" fill="#fff" />
                        </svg>
                      )}
                    </button>
                    <span
                      aria-hidden="true"
                      className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/[.12]"
                    >
                      <svg width="19" height="19" viewBox="0 0 24 24">
                        <path
                          d="M6.3 8.2A7 7 0 0 1 18.4 9.3"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M18.8 5.2v4.2h-4.2"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.7 15.8A7 7 0 0 1 5.6 14.7"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M5.2 18.8v-4.2h4.2"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#FF6B77]"
                    >
                      <svg width="19" height="19" viewBox="0 0 24 24">
                        <path
                          d="M13.5 4.5H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h6.5"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.5 12h9.5M16.5 8.5 20 12l-3.5 3.5"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-[12.5px] text-[#6B7684]">
              하단 바의 일시정지 버튼도 눌러볼 수 있어요
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
