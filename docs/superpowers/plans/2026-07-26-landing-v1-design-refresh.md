# 랜딩 시안 V1.0 반영 + SEO 보강 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 시안 10종(`/intro/*`)의 앱 목업을 V1.0 확정 디자인으로 교체하고, 확정 용어 교정 + FAQ·기능 그리드 + SEO 인프라(JSON-LD·noindex)를 10종 전체에 적용한다.

**Architecture:** 공용 목업 컴포넌트(`components/app/`) 4종을 재구현/신규 작성하면 10종에 자동 반영된다. FAQ·기능 콘텐츠는 `lib/content.ts`에 한 번만 정의하고, 스타일 프롭을 받는 공용 섹션 컴포넌트(`components/sections/`)를 각 시안이 자기 팔레트로 렌더한다.

**Tech Stack:** Next.js 16.2.11(App Router) · Tailwind CSS v4 · @phosphor-icons/react · motion. 스펙: `docs/superpowers/specs/2026-07-26-landing-v1-design-refresh-design.md`

## Global Constraints

- 작업 디렉터리는 `pages-nextjs/`. 루트의 Standalone HTML 4종과 `.ai/`는 **읽기 전용 참조** — 수정 금지.
- Next.js 16.2.11은 학습 데이터와 다를 수 있음 — 불확실하면 `node_modules/next/dist/docs/` 참조 (AGENTS.md).
- 테스트 프레임워크 없음. 각 태스크의 검증 = `npm run build` 성공 + 명시된 grep + (UI 태스크는) dev 서버 육안 확인.
- 앱명 표기: **FocusON** (ON 대문자) — 모든 노출 문구·메타데이터.
- 사용자 노출 문구 금지어: **순집중 · 감지 · 감시 · 딴짓 · 적발 · 잡아냄** → "측정해요/알아차려요" 계열로 재작성. 코드 주석은 예외.
- 확정 용어: **순공시간**(붙여씀) · **연속 공부**(스트릭 금지) · **자리 이탈**(자리 비움 금지) · **공부 결과**(세션 결과 금지).
- 타이머 표기 `HH:MM:SS`, tabular-nums. 이모지 노출 금지(불꽃은 `FlameArt` SVG).
- 컬러: brand `#3182F6` · 필 텍스트 `#1B64DA` · 필 배경 `#E8F3FF` · 라이트 배경 `#F2F4F6` · 세션 다크 `#0B0F14` · 세션 집중 `#4593FC` · 비집중 `#FF9E1B` · 일시정지 `#8B95A1` · 에러(종료 버튼) `#F04452` · 라이트 소형 오렌지 텍스트 `#B36100`.
- 시안 10종의 레이아웃·무드·헤드라인 톤은 유지 — 목업·용어·섹션 추가만.
- 커밋 메시지 끝에 `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: 목업 공용 부품(shared) + 홈 화면(S1) 재구현

**Files:**
- Create: `components/app/shared.tsx`
- Rewrite: `components/app/AppHomeScreen.tsx`

**Interfaces:**
- Produces: `FlameArt({ className? })`, `DeskDoodle({ className? })`, `TabBar({ active: "home" | "records" | "settings" })` — Task 4·5에서 사용. `AppHomeScreen()` 시그니처는 기존과 동일(프롭 없음)이라 시안 페이지 수정 불필요.

- [ ] **Step 1: `components/app/shared.tsx` 작성**

```tsx
import {
  CalendarBlankIcon,
  GearSixIcon,
  HouseIcon,
} from "@phosphor-icons/react/dist/ssr";

/** 2톤 불꽃 일러스트 — 이모지 노출 금지 규칙(voice-tone.md) 대응 SVG. */
export function FlameArt({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2c.6 3.2-1.4 5-3.2 7C7 11 6 13 6 15.2 6 19 8.7 22 12 22s6-3 6-6.8c0-2.7-1.3-4.6-2.6-6.4-.5 1.5-1.3 2.4-2.4 2.8.6-2.9-.2-6.4-1-9.6z"
        fill="#FF9E1B"
      />
      <path
        d="M12 22c-1.9 0-3.4-1.6-3.4-3.6 0-1.9 1.5-3 3.4-5 1.9 2 3.4 3.1 3.4 5 0 2-1.5 3.6-3.4 3.6z"
        fill="#FFCE7A"
      />
    </svg>
  );
}

/** 잉크 두들 스타일 미니 일러스트 — 책상 앞 인물 (홈 가이드 카드용). */
export function DeskDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="13" r="5" />
      <path d="M24 18v8" />
      <path d="M24 21l-8 6M24 21l8 6" />
      <path d="M8 32h32" />
      <path d="M12 32v9M36 32v9" />
      <path d="M28 29l7 2" />
    </svg>
  );
}

const TABS = [
  { key: "home", icon: HouseIcon, label: "홈" },
  { key: "records", icon: CalendarBlankIcon, label: "기록" },
  { key: "settings", icon: GearSixIcon, label: "설정" },
] as const;

/** V1.0 3탭 바 (홈 · 기록 · 설정). */
export function TabBar({ active }: { active: (typeof TABS)[number]["key"] }) {
  return (
    <div className="grid grid-cols-3 border-t border-[#E5E8EB] bg-white px-2 py-2">
      {TABS.map((t) => (
        <span
          key={t.key}
          className={`flex flex-col items-center gap-0.5 text-[8px] ${
            t.key === active ? "text-[#3182F6]" : "text-[#B0B8C1]"
          }`}
        >
          <t.icon size={13} weight={t.key === active ? "fill" : "regular"} />
          {t.label}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: `components/app/AppHomeScreen.tsx` 전체 교체**

```tsx
import { PlayIcon, TimerIcon } from "@phosphor-icons/react/dist/ssr";
import { DeskDoodle, FlameArt, TabBar } from "./shared";

/** 홈(S1) — V1.0 최종 시안 기반. 문구는 voice-tone.md, 구조·컬러는 design.md 확정값. */

const GAUGE_TICKS = 14;
const GAUGE_FILLED = 10; // 게이지 채움 = 오늘 집중률 71%

export function AppHomeScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#F2F4F6] text-[#191F28]">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3.5 pt-4">
        <span className="text-[11px] font-extrabold tracking-tight">
          FocusON
        </span>
        <span className="text-[9px] text-[#8B95A1]">7월 25일 토요일</span>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden px-3 pt-3">
        {/* 히어로: 오늘 순공시간 */}
        <div className="rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <p className="text-[9px] font-medium text-[#8B95A1]">오늘 순공시간</p>
          <p className="mt-0.5 text-lg font-extrabold tracking-tight">
            3시간 42분
          </p>
          <div className="mt-2 flex gap-[2px]">
            {Array.from({ length: GAUGE_TICKS }, (_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i < GAUGE_FILLED ? "bg-[#3182F6]" : "bg-[#E5E8EB]"
                }`}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-[#F2F4F6] pt-1.5">
            <span className="text-[9px] text-[#8B95A1]">총 공부 5시간 12분</span>
            <span className="rounded-full bg-[#E8F3FF] px-1.5 py-0.5 text-[9px] font-semibold text-[#1B64DA]">
              71% 집중
            </span>
          </div>
        </div>

        {/* 집중 시작 카드 + 프라이버시 캡션 */}
        <div>
          <div className="animate-soft-pulse flex items-center justify-between rounded-2xl bg-[#3182F6] p-3 text-white">
            <div>
              <p className="text-[12px] font-bold">집중 시작</p>
              <p className="mt-0.5 text-[8.5px] text-white/70">
                누르면 바로 측정이 시작돼요
              </p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <PlayIcon size={12} weight="fill" />
            </span>
          </div>
          <p className="mt-1 text-center text-[7.5px] text-[#8B95A1]">
            카메라가 자동으로 측정해요 · 영상은 저장되지 않아요
          </p>
        </div>

        {/* 스탯 2카드 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white p-2.5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
            <p className="flex items-center gap-1 text-[9px] text-[#8B95A1]">
              <FlameArt className="h-2.5 w-2.5" />
              연속 공부
            </p>
            <p className="mt-1 text-[13px] font-bold">12일째</p>
            <p className="mt-0.5 text-[7.5px] text-[#B0B8C1]">
              하루 10분이면 유지돼요
            </p>
          </div>
          <div className="rounded-2xl bg-white p-2.5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
            <p className="flex items-center gap-1 text-[9px] text-[#8B95A1]">
              <TimerIcon size={10} weight="fill" className="text-[#3182F6]" />
              최장 집중
            </p>
            <p className="mt-1 text-[13px] font-bold">52분</p>
            <p className="mt-0.5 text-[7.5px] text-[#B0B8C1]">
              오늘 가장 길게 집중했어요
            </p>
          </div>
        </div>

        {/* 공부 측정 가이드 카드 */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <div>
            <p className="text-[9.5px] font-semibold leading-snug">
              내 진짜 순공시간,
              <br />
              어떻게 재는 걸까요?
            </p>
            <p className="mt-1 text-[8px] font-semibold text-[#3182F6]">
              지금 확인해 보세요 ›
            </p>
          </div>
          <DeskDoodle className="h-9 w-9 shrink-0 text-[#4E5968]" />
        </div>
      </div>

      <TabBar active="home" />
    </div>
  );
}
```

- [ ] **Step 3: 빌드 검증**

Run: `npm run build`
Expected: 성공 (exit 0)

- [ ] **Step 4: 육안 확인**

Run: `npm run dev` → `/intro/kinetic`(홈 목업 사용)에서 스크린샷 `스크린샷 2026-07-25 14.03.01.png`과 대조: 히어로 게이지·시작 카드 서브 문구·스탯 2카드·가이드 카드·3탭이 보이는지.

- [ ] **Step 5: 커밋**

```bash
git add components/app/shared.tsx components/app/AppHomeScreen.tsx
git commit -m "feat: 홈 목업을 V1.0 최종 디자인으로 재구현"
```

---

### Task 2: 세션 화면(S3) 재구현

**Files:**
- Rewrite: `components/app/AppTimerScreen.tsx`

**Interfaces:**
- Produces: `AppTimerScreen({ live?: boolean })` — 기존 시그니처 유지(bento·focus가 `live` 사용, bold·zen은 정적).

- [ ] **Step 1: `components/app/AppTimerScreen.tsx` 전체 교체**

```tsx
"use client";

import { useEffect, useState } from "react";
import {
  CameraRotateIcon,
  PauseIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";

/**
 * 세션(S3) — V1.0 최종. 세션 오버레이 전용 컬러(6차 확정): 집중 #4593FC · 비집중 #FF9E1B.
 * live=true면 데모 시나리오(집중→휴대폰→집중→자리 이탈)를 1초 단위로 재생.
 * 비집중 중에는 순공만 멈추고 총 공부 시간은 계속 흐른다.
 */

type DemoStatus = "FOCUS" | "PHONE" | "AWAY";

const SCRIPT: [DemoStatus, number][] = [
  ["FOCUS", 9],
  ["PHONE", 4],
  ["FOCUS", 7],
  ["AWAY", 5],
];
const LOOP = SCRIPT.reduce((sum, [, sec]) => sum + sec, 0);

const BASE_FOCUS = 1 * 3600 + 24 * 60 + 8;
const BASE_TOTAL = 1 * 3600 + 45 * 60 + 12;

const STATUS: Record<DemoStatus, { label: string; sub?: string }> = {
  FOCUS: { label: "집중 측정 중" },
  PHONE: {
    label: "휴대폰을 사용 중인 것 같아요",
    sub: "내려놓으면 자동으로 다시 측정돼요",
  },
  AWAY: {
    label: "자리를 비운 것 같아요",
    sub: "돌아오면 자동으로 다시 측정돼요",
  },
};

function statusAt(t: number): DemoStatus {
  let acc = 0;
  for (const [status, sec] of SCRIPT) {
    acc += sec;
    if (t % LOOP < acc) return status;
  }
  return "FOCUS";
}

function focusedUpTo(t: number): number {
  let focused = 0;
  for (let i = 0; i < t; i++) if (statusAt(i) === "FOCUS") focused++;
  return focused;
}

function fmt(sec: number): string {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function AppTimerScreen({ live = false }: { live?: boolean }) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const running = live && !reduce;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const status: DemoStatus = running ? statusAt(tick) : "FOCUS";
  const focus = BASE_FOCUS + (running ? focusedUpTo(tick) : 0);
  const total = BASE_TOTAL + (running ? tick : 0);
  const focusing = status === "FOCUS";

  return (
    <div className="relative flex h-full w-full flex-col items-center bg-[#0B0F14] px-3 py-4 text-white">
      {/* 카메라 프리뷰 대체 질감 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.02)_0_9px,transparent_9px_18px)]"
      />

      {/* 상태 필 (다크 글래스) */}
      <div className="relative flex flex-col items-center gap-1">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[9.5px] font-medium backdrop-blur-sm">
          <span
            className="h-1 w-1 rounded-full transition-colors duration-500"
            style={{ background: focusing ? "#4593FC" : "#FF9E1B" }}
          />
          {STATUS[status].label}
        </span>
        {STATUS[status].sub && (
          <span className="text-[8px] text-white/45">{STATUS[status].sub}</span>
        )}
      </div>

      {/* 순공 타이머 + 총 공부 병기 */}
      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <p
          className={`font-mono text-[1.9rem] font-semibold tabular-nums tracking-tight transition-all duration-500 ${
            focusing
              ? "text-white [text-shadow:0_0_24px_rgba(69,147,252,0.55)]"
              : "text-white/40"
          }`}
        >
          {fmt(focus)}
        </p>
        <p className="mt-1 font-mono text-[10px] tabular-nums text-white/40">
          총 {fmt(total)}
        </p>
      </div>

      {/* 프라이버시 캡션 + 하단 컨트롤 바 */}
      <div className="relative flex w-full flex-col items-center gap-2">
        <p className="text-[8px] text-white/35">영상은 기기 안에서만 처리돼요</p>
        <div className="flex w-full max-w-[190px] flex-col items-center rounded-2xl border border-white/10 bg-black/40 px-4 pb-2.5 pt-1.5 backdrop-blur-sm">
          <span className="mb-2 h-0.5 w-7 rounded-full bg-white/20" />
          <div className="flex w-full items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <PauseIcon size={12} weight="fill" />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <CameraRotateIcon size={12} />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F04452]">
              <SignOutIcon size={12} weight="bold" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 빌드 검증** — Run: `npm run build`, Expected: 성공. `CameraRotateIcon`·`SignOutIcon`이 없다는 에러가 나면 `node_modules/@phosphor-icons/react/dist/csr/`에서 실제 아이콘명을 확인해 교체(예: `ArrowsClockwiseIcon`).

- [ ] **Step 3: 육안 확인** — `/intro/focus`(live)에서: 상태 필 문구가 "집중 측정 중" → "휴대폰을 사용 중인 것 같아요"(서브 문구 표시)로 순환하는지, 비집중 중 순공은 멈추고 총은 흐르는지, 컨트롤 바 3버튼이 보이는지.

- [ ] **Step 4: 커밋**

```bash
git add components/app/AppTimerScreen.tsx
git commit -m "feat: 세션 목업을 V1.0 최종 디자인으로 재구현"
```

---

### Task 3: 공부 결과 화면(S4) 재구현

**Files:**
- Rewrite: `components/app/AppResultScreen.tsx`

**Interfaces:**
- Produces: `AppResultScreen()` — 기존 시그니처 유지(ink·midnight·chrono 사용).

- [ ] **Step 1: `components/app/AppResultScreen.tsx` 전체 교체**

```tsx
import { XIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * 공부 결과(S4) — V1.0 최종. 타임라인 3색: 집중 #3182F6 · 비집중 #FF9E1B · 일시정지 #8B95A1.
 * 수치 정합: 순공 1:24:08 + 비집중 21:04 = 총 공부 1:45:12(80% 집중).
 * 일시정지 3분은 총 공부에 미포함 → 시각 범위는 21:03 – 22:51.
 */

type Seg = { kind: "focus" | "distract" | "pause"; w: number };

const TIMELINE: Seg[] = [
  { kind: "focus", w: 18 },
  { kind: "distract", w: 5 },
  { kind: "focus", w: 24 },
  { kind: "pause", w: 3 },
  { kind: "distract", w: 7 },
  { kind: "focus", w: 14 },
  { kind: "distract", w: 4 },
  { kind: "focus", w: 25 },
];

const SEG_COLOR: Record<Seg["kind"], string> = {
  focus: "bg-[#3182F6]",
  distract: "bg-[#FF9E1B]",
  pause: "bg-[#8B95A1]",
};

const LEGEND: { label: string; cls: string }[] = [
  { label: "집중", cls: "bg-[#3182F6]" },
  { label: "비집중", cls: "bg-[#FF9E1B]" },
  { label: "일시정지", cls: "bg-[#8B95A1]" },
];

const DISTRACTIONS: [string, string, string][] = [
  ["자리 이탈", "2회", "9분 40초"],
  ["휴대폰 사용", "2회", "6분 12초"],
  ["기기 조작", "1회", "5분 12초"],
];

export function AppResultScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#F2F4F6] text-[#191F28]">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="text-[11px] font-bold">공부 결과</span>
        <XIcon size={11} className="text-[#8B95A1]" />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3 pt-1">
        {/* 요약 */}
        <div className="rounded-2xl bg-white p-3.5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <p className="text-[9.5px] font-medium text-[#8B95A1]">순공시간</p>
          <div className="mt-1 flex items-center gap-1.5">
            <p className="text-xl font-extrabold tracking-tight">1시간 24분</p>
            <span className="rounded-full bg-[#E8F3FF] px-1.5 py-0.5 text-[9px] font-semibold text-[#1B64DA]">
              80% 집중
            </span>
          </div>
          <p className="mt-1.5 text-[9.5px] text-[#8B95A1]">
            총 공부 1시간 45분 &middot; 21:03 &ndash; 22:51
          </p>
        </div>

        {/* 타임라인 */}
        <div className="rounded-2xl bg-white p-3.5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <p className="text-[9.5px] font-medium text-[#8B95A1]">공부 타임라인</p>
          <div className="mt-2.5 flex h-3 w-full gap-[2px] overflow-hidden rounded-full">
            {TIMELINE.map((seg, i) => (
              <span
                key={i}
                style={{ width: `${seg.w}%` }}
                className={`h-full rounded-[2px] ${SEG_COLOR[seg.kind]}`}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2.5 text-[8.5px] text-[#8B95A1]">
            {LEGEND.map((l) => (
              <span key={l.label} className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${l.cls}`} />
                {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* 비집중 내역 + 일시정지 행 */}
        <div className="rounded-2xl bg-white p-3.5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <p className="text-[9.5px] font-medium text-[#8B95A1]">비집중 21분</p>
          <ul className="mt-1 divide-y divide-[#F2F4F6]">
            {DISTRACTIONS.map(([name, count, dur]) => (
              <li
                key={name}
                className="flex items-center justify-between py-2 text-[10px]"
              >
                <span className="font-medium">{name}</span>
                <span className="text-[#8B95A1]">
                  {count} &middot; {dur}
                </span>
              </li>
            ))}
            <li className="flex items-center justify-between py-2 text-[10px] text-[#8B95A1]">
              <span className="flex items-center gap-1 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B95A1]" />
                일시정지
              </span>
              <span>1회 &middot; 3분</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="px-3 pb-4 pt-2.5">
        <div className="rounded-xl bg-[#3182F6] py-2.5 text-center text-[10.5px] font-bold text-white">
          확인
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 빌드 검증** — Run: `npm run build`, Expected: 성공.
- [ ] **Step 3: 육안 확인** — `/intro/ink`에서 "공부 결과" 타이틀, 3색 타임라인·범례, "화면 꺼짐" 행이 사라지고 회색 "일시정지" 행이 있는지.
- [ ] **Step 4: 커밋**

```bash
git add components/app/AppResultScreen.tsx
git commit -m "feat: 결과 목업을 V1.0 최종 디자인으로 재구현 (일시정지 3색 반영)"
```

---

### Task 4: 기록 화면(S5) 신규 목업

**Files:**
- Create: `components/app/AppRecordsScreen.tsx`

**Interfaces:**
- Consumes: `FlameArt`, `TabBar` (Task 1의 `./shared`)
- Produces: `AppRecordsScreen()` — Task 8에서 soft 시안에 배치.

- [ ] **Step 1: `components/app/AppRecordsScreen.tsx` 작성**

```tsx
import {
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { FlameArt, TabBar } from "./shared";

/** 기록(S5) — V1.0 최종: 연속 공부 배너 + 월 달력 + 학습 요약 + 공부 기록. 오늘 = 2026-07-25(토), 선택일 = 오늘(브랜드 채움). */

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const WEEK_CHECK = ["월", "화", "수", "목", "금", "토", "일"]; // 배너 도트, 월~토 채움
const OFFSET = 3; // 2026-07-01 = 수요일
const DAYS = 31;
const TODAY = 25;
const DOT_DAYS = new Set([14, 15, 17, 18, 20, 21, 22, 23, 24]);

const SUMMARY: { label: string; value: string; brand?: boolean }[] = [
  { label: "순공시간", value: "3시간 42분", brand: true },
  { label: "총 공부 시간", value: "5시간 12분" },
  { label: "집중률", value: "71%" },
  { label: "공부 횟수", value: "3회" },
];

const RECORDS = [
  {
    focus: "1시간 24분",
    meta: "21:03 – 22:51 · 총 1시간 45분",
    rate: "80% 집중",
    badge: "자리 이탈 2회",
  },
  {
    focus: "1시간 2분",
    meta: "14:10 – 15:20 · 총 1시간 10분",
    rate: "89% 집중",
    badge: "휴대폰 1회",
  },
];

export function AppRecordsScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#F2F4F6] text-[#191F28]">
      <div className="px-3.5 pt-4">
        <span className="text-[11px] font-extrabold tracking-tight">기록</span>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden px-3 pt-3">
        {/* 연속 공부 배너 */}
        <div className="rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-1.5">
            <FlameArt className="h-3.5 w-3.5" />
            <p className="text-[11px] font-bold">12일 연속 공부 중</p>
          </div>
          <p className="mt-0.5 text-[8px] text-[#8B95A1]">
            내일도 10분만 하면 이어져요
          </p>
          <div className="mt-2 flex justify-between">
            {WEEK_CHECK.map((d, i) => (
              <span key={d} className="flex flex-col items-center gap-0.5">
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                    i < 6 ? "bg-[#3182F6]" : "bg-[#E5E8EB]"
                  }`}
                >
                  {i < 6 && (
                    <CheckIcon size={7} weight="bold" className="text-white" />
                  )}
                </span>
                <span className="text-[6.5px] text-[#B0B8C1]">{d}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 월 달력 */}
        <div className="rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <CaretLeftIcon size={9} className="text-[#8B95A1]" />
            <p className="text-[9.5px] font-bold">2026년 7월</p>
            <CaretRightIcon size={9} className="text-[#D1D6DB]" />
          </div>
          <div className="mt-1.5 grid grid-cols-7 gap-y-0.5 text-center">
            {WEEKDAYS.map((d) => (
              <span key={d} className="text-[6.5px] text-[#B0B8C1]">
                {d}
              </span>
            ))}
            {Array.from({ length: OFFSET }, (_, i) => (
              <span key={`empty-${i}`} />
            ))}
            {Array.from({ length: DAYS }, (_, i) => i + 1).map((day) => (
              <span key={day} className="flex flex-col items-center">
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[7px] ${
                    day === TODAY
                      ? "bg-[#3182F6] font-bold text-white"
                      : day > TODAY
                        ? "text-[#D1D6DB]"
                        : "text-[#4E5968]"
                  }`}
                >
                  {day}
                </span>
                <span
                  className={`h-[3px] w-[3px] rounded-full ${
                    DOT_DAYS.has(day) ? "bg-[#3182F6]" : "bg-transparent"
                  }`}
                />
              </span>
            ))}
          </div>
        </div>

        {/* 학습 요약 */}
        <div className="rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <p className="text-[9px] font-semibold">7월 25일 학습 요약</p>
          <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1.5">
            {SUMMARY.map((s) => (
              <div key={s.label}>
                <p className="text-[7.5px] text-[#8B95A1]">{s.label}</p>
                <p
                  className={`text-[11px] font-bold ${
                    s.brand ? "text-[#1B64DA]" : ""
                  }`}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 공부 기록 (최신순) */}
        <div className="rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-semibold">공부 기록</p>
            <span className="text-[7.5px] text-[#B0B8C1]">최신순</span>
          </div>
          <ul className="mt-1 divide-y divide-[#F2F4F6]">
            {RECORDS.map((r) => (
              <li
                key={r.meta}
                className="flex items-center justify-between py-1.5"
              >
                <div>
                  <p className="text-[10px] font-bold">{r.focus}</p>
                  <p className="text-[7px] text-[#8B95A1]">{r.meta}</p>
                </div>
                <div className="text-right">
                  <p className="text-[7.5px] font-semibold text-[#1B64DA]">
                    {r.rate}
                  </p>
                  <p className="text-[6.5px] text-[#B36100]">{r.badge}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TabBar active="records" />
    </div>
  );
}
```

- [ ] **Step 2: 빌드 검증** — Run: `npm run build`, Expected: 성공 (아직 미사용 컴포넌트여도 빌드에 포함되는지만 확인).
- [ ] **Step 3: 커밋**

```bash
git add components/app/AppRecordsScreen.tsx
git commit -m "feat: 기록(S5) 목업 신규 추가"
```

---

### Task 5: 공통 콘텐츠 데이터 + 사이트 상수·전역 메타데이터 교정

**Files:**
- Create: `lib/content.ts`
- Modify: `lib/site.ts` (appName)
- Modify: `app/layout.tsx` (metadata)

**Interfaces:**
- Produces: `FAQS: { q: string; a: string }[]`, `FEATURES: { title: string; body: string }[]`, `APP_DESCRIPTION: string` — Task 6~8에서 사용.

- [ ] **Step 1: `lib/content.ts` 작성** (문구는 스펙 §3 확정안 그대로 — 임의 수정 금지)

```ts
/**
 * 랜딩 공통 콘텐츠 — 시안 10종이 공유한다.
 * 문구 근거: .ai/product/voice-tone.md · mvp-scope.md · policies.md (해요체, "감지" 미사용)
 */

export const APP_DESCRIPTION =
  "전면 카메라와 센서가 기기 안에서만 집중 상태를 측정해, 실제로 공부한 순공시간만 기록하는 공부 타이머";

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "순공시간은 어떻게 재나요?",
    a: "전면 카메라와 센서가 자리 이탈·휴대폰 사용·기기 조작을 기기 안에서만 측정해요. 집중이 아니면 순공 타이머가 저절로 멈추고, 다시 집중하면 이어서 올라가요. 눌러야 할 건 없어요.",
  },
  {
    q: "카메라 영상이 저장되거나 전송되나요?",
    a: "아니요. 측정은 전부 기기 안에서 끝나고, 영상은 저장하지도 기기 밖으로 보내지도 않아요. 남는 건 공부 시간 기록뿐이에요.",
  },
  {
    q: "회원가입이 필요한가요?",
    a: "필요 없어요. 설치하면 바로 시작할 수 있어요. 로그인은 이후 업데이트에 추가되고, 지금까지의 기록도 로그인하면 계정에 그대로 이어져요.",
  },
  {
    q: "카메라 권한을 허용하지 않으면 못 쓰나요?",
    a: "쓸 수 있어요. 수동 타이머 모드로 직접 시작·종료하며 순공시간을 재고, 통계와 연속 공부도 똑같이 쓸 수 있어요.",
  },
  {
    q: "잠깐 자리를 비우면 어떻게 되나요?",
    a: "자리를 비우면 순공 타이머만 멈추고, 돌아오면 자동으로 다시 측정돼요. 쉴 때는 일시정지를 누르면 순공시간과 총 공부 시간이 모두 멈춰요.",
  },
  {
    q: "인터넷이 없어도 되나요?",
    a: "네, 측정은 네트워크 없이 완전히 동작해요. 기록은 기기에 먼저 저장하고, 연결되면 자동으로 옮겨 둬요.",
  },
  {
    q: "어떤 기기에서 쓸 수 있나요?",
    a: "iPhone과 Android 모두 준비하고 있어요. App Store와 Google Play 출시를 준비 중이에요.",
  },
  {
    q: "기록에는 뭐가 남나요?",
    a: "순공시간·총 공부 시간·집중률과 비집중 내역(자리 이탈·휴대폰 사용·기기 조작)이 공부 단위로 남고, 달력에서 날짜별로 볼 수 있어요.",
  },
];

export type Feature = { title: string; body: string };

export const FEATURES: Feature[] = [
  {
    title: "심플 모드",
    body: "공부 중 화면을 탭하면 숫자만 남아요. 한 번 더 탭하면 원래 화면으로 돌아와요.",
  },
  {
    title: "가로 거치 모드",
    body: "폰을 눕혀 거치해도 타이머가 그대로 이어져요.",
  },
  {
    title: "라이트·다크 모드",
    body: "시스템 설정을 따라 화면이 함께 바뀌어요.",
  },
  {
    title: "오프라인 측정",
    body: "네트워크가 없어도 측정은 끝까지 동작해요. 기록은 연결되면 자동으로 옮겨 둬요.",
  },
  {
    title: "수동 타이머 모드",
    body: "카메라 없이도 직접 시작·종료하며 순공시간을 잴 수 있어요.",
  },
  {
    title: "자동으로 다시 측정",
    body: "자리로 돌아오면 누르지 않아도 타이머가 저절로 이어져요.",
  },
];
```

- [ ] **Step 2: `lib/site.ts` 교정** — `appName: "FocusOn"` → `appName: "FocusON"` (다른 필드 변경 없음).

- [ ] **Step 3: `app/layout.tsx` metadata 교체**

```tsx
import { APP_DESCRIPTION } from "@/lib/content";
```

```tsx
export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: "FocusON — 순공시간을 증명하는 공부 타이머",
    template: "%s | FocusON",
  },
  description: `${APP_DESCRIPTION}, FocusON. 순공 타이머 · 공부 기록 · 집중률 통계.`,
};
```

- [ ] **Step 4: 검증**

Run: `npm run build && grep -rn "FocusOn" app components lib`
Expected: 빌드 성공. grep은 **0건** (대문자 구분 — `FocusON`은 매칭되지 않음). 남은 게 있으면 해당 파일에서 `FocusON`으로 교체 (`/privacy`·`/terms`·`/support` 페이지 포함).

- [ ] **Step 5: 커밋**

```bash
git add lib/content.ts lib/site.ts app/layout.tsx app/privacy app/terms app/support
git commit -m "feat: 공통 콘텐츠 데이터 추가, FocusON 표기·전역 메타 교정"
```

---

### Task 6: SEO 컴포넌트 (JSON-LD · FAQ · 기능 그리드)

**Files:**
- Create: `components/seo/JsonLd.tsx`
- Create: `components/sections/FaqSection.tsx`
- Create: `components/sections/FeatureGrid.tsx`

**Interfaces:**
- Consumes: `FAQS`, `FEATURES`, `APP_DESCRIPTION` (Task 5), `SITE` (`@/lib/site`)
- Produces: `AppJsonLd()` · `FaqSection({ heading?, className?, headingClassName?, itemClassName?, questionClassName?, answerClassName? })` · `FeatureGrid({ heading?, className?, headingClassName?, cardClassName?, titleClassName?, bodyClassName? })` — Task 7·8에서 사용. 모두 서버 컴포넌트.

- [ ] **Step 1: `components/seo/JsonLd.tsx` 작성**

```tsx
import { APP_DESCRIPTION, FAQS } from "@/lib/content";
import { SITE } from "@/lib/site";

/**
 * MobileApplication + FAQPage 구조화 데이터. 시안 10종 공용 — 승격 시 그대로 사용.
 * 시안 페이지는 noindex지만, 승격을 대비해 미리 삽입해 둔다.
 */
export function AppJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      name: SITE.appName,
      operatingSystem: "iOS, Android",
      applicationCategory: "EducationalApplication",
      description: APP_DESCRIPTION,
      url: SITE.siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: `components/sections/FaqSection.tsx` 작성** — `<details>` 기반이라 JS 없이 동작(서버 컴포넌트 유지)

```tsx
import { FAQS } from "@/lib/content";

/** 시안 공용 FAQ 아코디언 — 스타일은 시안이 프롭으로 주입한다. */
export function FaqSection({
  heading = "자주 묻는 질문",
  className = "",
  headingClassName = "",
  itemClassName = "",
  questionClassName = "",
  answerClassName = "",
}: {
  heading?: string;
  className?: string;
  headingClassName?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
}) {
  return (
    <section className={className}>
      <h2 className={headingClassName}>{heading}</h2>
      <div className="mt-10 space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className={`group ${itemClassName}`}>
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden ${questionClassName}`}
            >
              {f.q}
              <span
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className={`mt-3 ${answerClassName}`}>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `components/sections/FeatureGrid.tsx` 작성**

```tsx
import { FEATURES } from "@/lib/content";

/** 시안 공용 기능 그리드 — 스타일은 시안이 프롭으로 주입한다. */
export function FeatureGrid({
  heading = "이런 기능도 있습니다",
  className = "",
  headingClassName = "",
  cardClassName = "",
  titleClassName = "",
  bodyClassName = "",
}: {
  heading?: string;
  className?: string;
  headingClassName?: string;
  cardClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={className}>
      <h2 className={headingClassName}>{heading}</h2>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <li key={f.title} className={cardClassName}>
            <h3 className={titleClassName}>{f.title}</h3>
            <p className={bodyClassName}>{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: 빌드 검증** — Run: `npm run build`, Expected: 성공.
- [ ] **Step 5: 커밋**

```bash
git add components/seo components/sections
git commit -m "feat: JSON-LD·FAQ·기능 그리드 공용 컴포넌트 추가"
```

---

### Task 7: 시안 적용 1차 — ink · focus · bold · bento · chrono

**Files:**
- Modify: `app/intro/ink/page.tsx`, `app/intro/focus/page.tsx`, `app/intro/bold/page.tsx`, `app/intro/bento/page.tsx`, `app/intro/chrono/page.tsx`
- Modify: `components/bento/BentoTiles.tsx`

**Interfaces:**
- Consumes: `AppJsonLd`, `FaqSection`, `FeatureGrid` (Task 6)

각 페이지 공통 3가지: ① metadata에 `robots: { index: false, follow: false }` 추가(주석 `// 시안 선택 전 임시 — 승격 시 제거`) ② 루트 요소 최상단에 `<AppJsonLd />` 삽입 ③ `{/* 푸터 */}` 주석 바로 앞, 이전 섹션과 같은 컨테이너 안에 `<FeatureGrid />` → `<FaqSection />` 순서로 삽입. 아래 프롭 값은 기준값 — 해당 시안의 기존 섹션과 톤이 어긋나면 그 시안의 인접 섹션 클래스에 맞춰 미세 조정 가능.

- [ ] **Step 1: ink 적용** (라이트 모노크롬, zinc)

```tsx
import { AppJsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
```

```tsx
<FeatureGrid
  className="border-t border-zinc-200 py-20 md:py-24"
  headingClassName="text-2xl font-bold tracking-tight md:text-3xl"
  cardClassName="rounded-2xl border border-zinc-200 p-5"
  titleClassName="font-semibold tracking-tight"
  bodyClassName="mt-1.5 text-sm leading-relaxed text-zinc-500"
/>
<FaqSection
  className="border-t border-zinc-200 py-20 md:py-24"
  headingClassName="text-2xl font-bold tracking-tight md:text-3xl"
  itemClassName="border-b border-zinc-200 pb-4"
  questionClassName="text-[15px] font-semibold"
  answerClassName="text-[15px] leading-relaxed text-zinc-500"
/>
```

용어 교정 (줄 번호는 현재 기준, 실제 위치는 검색으로):

| 위치 | 현행 | 교정 |
|---|---|---|
| L19 | "AI가 상태를 감지" | "AI가 알아서 측정" |
| L20 | "자리 비움과 휴대폰 사용을" | "자리 이탈과 휴대폰 사용을" |
| L31 | "스트릭", "하루도 빠짐없이 이어 온 연속 기록" | "연속 공부", "하루 10분이면 이어지는 연속 기록" |
| L59 | "집중 상태를 감지해" | "집중 상태를 알아차려" |
| L130 | "상태 감지는 전부" | "상태 측정은 전부" |

- [ ] **Step 2: focus 적용** (다크 zinc-950, 에메랄드)

```tsx
<FeatureGrid
  className="border-t border-zinc-800/80 py-20 md:py-24"
  headingClassName="text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl"
  cardClassName="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
  titleClassName="font-semibold text-zinc-100"
  bodyClassName="mt-1.5 text-sm leading-relaxed text-zinc-400"
/>
<FaqSection
  className="border-t border-zinc-800/80 py-20 md:py-24"
  headingClassName="text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl"
  itemClassName="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
  questionClassName="text-[15px] font-semibold text-zinc-100"
  answerClassName="text-[15px] leading-relaxed text-zinc-400"
/>
```

| 위치 | 현행 | 교정 |
|---|---|---|
| L17 | "자리 비움과 휴대폰 사용을 감지하는" | "자리 이탈과 휴대폰 사용을 알아차리는" |
| L48 | "자리 비움과 휴대폰 사용을 감지하면" | "자리 이탈과 휴대폰 사용을 알아차리면" |
| L76 | "감지는 AI가, 기록은 자동으로" | "측정은 AI가, 기록은 자동으로" |
| L89 | "자리 비움과 휴대폰 사용 감지" | "자리 이탈과 휴대폰 사용을 알아차림" |
| L142 | "스트릭" | "연속 공부" |

- [ ] **Step 3: bold 적용** (브루탈리스트, border-2 zinc-900)

```tsx
<FeatureGrid
  heading="이런 기능도 있다"
  className="border-t-2 border-zinc-900 px-6 py-16"
  headingClassName="text-3xl font-black uppercase tracking-tight"
  cardClassName="border-2 border-zinc-900 bg-white p-5"
  titleClassName="font-bold"
  bodyClassName="mt-1.5 text-sm leading-relaxed text-zinc-600"
/>
<FaqSection
  className="border-t-2 border-zinc-900 px-6 py-16"
  headingClassName="text-3xl font-black uppercase tracking-tight"
  itemClassName="border-2 border-zinc-900 bg-white p-4"
  questionClassName="text-[15px] font-bold"
  answerClassName="text-[15px] leading-relaxed text-zinc-600"
/>
```

(bold는 섹션이 컨테이너 없이 px를 직접 관리 — 기존 섹션의 px 규칙에 맞춘다)

| 위치 | 현행 | 교정 |
|---|---|---|
| L11 | "딴짓하면 시계가 멈춘다" | "집중이 아니면 시계가 멈춘다" |
| L16 | "감지" | "측정" |
| L28 | "스트릭" | "연속 공부" |
| L61 | "자리 비움과 휴대폰 사용을 잡아냅니다" | "자리 이탈과 휴대폰 사용을 알아차립니다" |

- [ ] **Step 4: bento 적용** (라이트 slate) + `BentoTiles.tsx` 칩 문구 교정

```tsx
<FeatureGrid
  className="border-t border-slate-200 py-20"
  headingClassName="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
  cardClassName="rounded-2xl border border-slate-200 bg-white p-5"
  titleClassName="font-semibold text-slate-900"
  bodyClassName="mt-1.5 text-sm leading-relaxed text-slate-500"
/>
<FaqSection
  className="border-t border-slate-200 py-20"
  headingClassName="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
  itemClassName="rounded-2xl border border-slate-200 bg-white p-4"
  questionClassName="text-[15px] font-semibold text-slate-900"
  answerClassName="text-[15px] leading-relaxed text-slate-500"
/>
```

| 파일:위치 | 현행 | 교정 |
|---|---|---|
| page L14 | "통계, 스트릭까지" | "통계, 연속 공부까지" |
| page L39 | "통계와 스트릭까지" | "통계와 연속 공부까지" |
| page L93 | "자리 비움과 휴대폰 사용을 기기 안의 AI가 감지하고" | "자리 이탈과 휴대폰 사용을 기기 안의 AI가 알아차리고" |
| page 스트릭 타일 내 노출 문구 | "스트릭" | "연속 공부" |
| BentoTiles L59 | "휴대폰 감지" | "휴대폰 사용" |
| BentoTiles L60 | "자리 비움" | "자리 이탈" |

- [ ] **Step 5: chrono 적용** (라이트, 레드 모노)

```tsx
<FeatureGrid
  className="border-t border-zinc-200 py-20"
  headingClassName="text-2xl font-bold tracking-tight md:text-3xl"
  cardClassName="rounded-xl border border-zinc-200 bg-white p-5"
  titleClassName="font-semibold"
  bodyClassName="mt-1.5 text-sm leading-relaxed text-zinc-500"
/>
<FaqSection
  className="border-t border-zinc-200 py-20"
  headingClassName="text-2xl font-bold tracking-tight md:text-3xl"
  itemClassName="border-b border-zinc-200 pb-4"
  questionClassName="text-[15px] font-semibold"
  answerClassName="text-[15px] leading-relaxed text-zinc-500"
/>
```

| 위치 | 현행 | 교정 |
|---|---|---|
| L17 | "자리 비움" | "자리 이탈" |

- [ ] **Step 6: 검증**

Run: `npm run build && grep -n "감지\|스트릭\|자리 비움\|딴짓\|잡아냅" app/intro/ink/page.tsx app/intro/focus/page.tsx app/intro/bold/page.tsx app/intro/bento/page.tsx app/intro/chrono/page.tsx components/bento/BentoTiles.tsx`
Expected: 빌드 성공, grep은 코드 주석 줄만 남음(노출 문구 0건). dev 서버에서 5종 각각 FAQ 펼침 동작 확인.

- [ ] **Step 7: 커밋**

```bash
git add app/intro/ink app/intro/focus app/intro/bold app/intro/bento app/intro/chrono components/bento
git commit -m "feat: 시안 5종(ink·focus·bold·bento·chrono)에 V1.0 용어·FAQ·SEO 적용"
```

---

### Task 8: 시안 적용 2차 — soft · midnight · kinetic · aurora · zen (+ 기록 목업 배치)

**Files:**
- Modify: `app/intro/soft/page.tsx`, `app/intro/midnight/page.tsx`, `app/intro/kinetic/page.tsx`, `app/intro/aurora/page.tsx`, `app/intro/zen/page.tsx`

**Interfaces:**
- Consumes: `AppJsonLd`, `FaqSection`, `FeatureGrid` (Task 6), `AppRecordsScreen` (Task 4), `PhoneSlot` (기존)

공통 3가지(robots · AppJsonLd · 푸터 앞 FeatureGrid→FaqSection 삽입)는 Task 7과 동일 규칙.

- [ ] **Step 1: soft 적용** (웜 오렌지/스톤) + **기록 목업 배치**: `{/* 스트릭 */}` 섹션(L134~)의 콘텐츠 옆(md 2컬럼)에 추가 —

```tsx
<PhoneSlot frameClassName="border-orange-200/80 bg-white/80 shadow-[0_32px_80px_-32px_rgba(194,65,12,0.4)]">
  <AppRecordsScreen />
</PhoneSlot>
```

(기존 커스텀 달력 카드가 있으면 그 자리를 기록 목업으로 대체하거나 나란히 배치 — 섹션의 기존 그리드 구조를 따른다)

```tsx
<FeatureGrid
  className="py-20"
  headingClassName="text-2xl font-bold tracking-tight text-stone-800 md:text-3xl"
  cardClassName="rounded-3xl border border-orange-200/60 bg-white/70 p-5"
  titleClassName="font-semibold text-stone-800"
  bodyClassName="mt-1.5 text-sm leading-relaxed text-stone-500"
/>
<FaqSection
  className="py-20"
  headingClassName="text-2xl font-bold tracking-tight text-stone-800 md:text-3xl"
  itemClassName="rounded-3xl border border-orange-200/60 bg-white/70 p-4"
  questionClassName="text-[15px] font-semibold text-stone-800"
  answerClassName="text-[15px] leading-relaxed text-stone-500"
/>
```

| 위치 | 현행 | 교정 |
|---|---|---|
| L17 | "AI가 딴짓을 알아채고" | "AI가 흐트러진 순간을 알아채고" |
| L35 | "자리 비움도 휴대폰도" | "자리 이탈도 휴대폰도" |
| L144 | "이어져 온 스트릭이" | "이어져 온 연속 공부가" |
| 섹션 내 노출 문구 | "스트릭" | "연속 공부" |

- [ ] **Step 2: midnight 적용** (딥 네이비, 스카이)

```tsx
<FeatureGrid
  className="border-t border-slate-100/10 py-20"
  headingClassName="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl"
  cardClassName="rounded-xl border border-slate-100/10 bg-white/[0.04] p-5"
  titleClassName="font-semibold text-slate-100"
  bodyClassName="mt-1.5 text-sm leading-relaxed text-slate-400"
/>
<FaqSection
  className="border-t border-slate-100/10 py-20"
  headingClassName="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl"
  itemClassName="rounded-xl border border-slate-100/10 bg-white/[0.04] p-4"
  questionClassName="text-[15px] font-semibold text-slate-100"
  answerClassName="text-[15px] leading-relaxed text-slate-400"
/>
```

| 위치 | 현행 | 교정 |
|---|---|---|
| L40 | "졸음도 딴짓도 놓치지 않는 감지" | "흐트러진 순간을 알아차리는 측정" |
| L41 | "자리 비움과 휴대폰 사용을" | "자리 이탈과 휴대폰 사용을" |

- [ ] **Step 3: kinetic 적용** (라이트, 라임 액센트, 행 리스트)

```tsx
<FeatureGrid
  className="border-t border-zinc-200 py-20"
  headingClassName="text-2xl font-extrabold tracking-tight md:text-3xl"
  cardClassName="border-b border-zinc-200 pb-5"
  titleClassName="font-bold"
  bodyClassName="mt-1.5 text-sm leading-relaxed text-zinc-500"
/>
<FaqSection
  className="border-t border-zinc-200 py-20"
  headingClassName="text-2xl font-extrabold tracking-tight md:text-3xl"
  itemClassName="border-b border-zinc-200 pb-4"
  questionClassName="text-[15px] font-semibold"
  answerClassName="text-[15px] leading-relaxed text-zinc-500"
/>
```

| 위치 | 현행 | 교정 |
|---|---|---|
| L14 | "딴짓한 시간 빼고 셉니다" | "흐트러진 시간 빼고 셉니다" |
| L18 | "상태 감지", "자리 비움과 휴대폰 사용을" | "상태 측정", "자리 이탈과 휴대폰 사용을" |
| L20 | "통계와 스트릭", "일간, 주간, 월간 리포트와 연속 기록으로" | "통계와 연속 공부", "달력과 일간 요약, 연속 기록으로" |

- [ ] **Step 4: aurora 적용** (다크 글래스, 틸)

```tsx
<FeatureGrid
  className="border-t border-white/10 py-20"
  headingClassName="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl"
  cardClassName="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur"
  titleClassName="font-semibold text-slate-100"
  bodyClassName="mt-1.5 text-sm leading-relaxed text-slate-400"
/>
<FaqSection
  className="border-t border-white/10 py-20"
  headingClassName="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl"
  itemClassName="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur"
  questionClassName="text-[15px] font-semibold text-slate-100"
  answerClassName="text-[15px] leading-relaxed text-slate-400"
/>
```

| 위치 | 현행 | 교정 |
|---|---|---|
| L21 | "감지하는 타이머" | "알아차리는 타이머" |
| L22 | "자리 비움과 휴대폰 사용을" | "자리 이탈과 휴대폰 사용을" |

- [ ] **Step 5: zen 적용** (라이트 그린)

```tsx
<FeatureGrid
  className="border-t border-emerald-900/10 py-20"
  headingClassName="text-2xl font-bold tracking-tight text-emerald-950 md:text-3xl"
  cardClassName="rounded-2xl border border-emerald-900/10 bg-white p-5"
  titleClassName="font-semibold text-emerald-950"
  bodyClassName="mt-1.5 text-sm leading-relaxed text-emerald-900/60"
/>
<FaqSection
  className="border-t border-emerald-900/10 py-20"
  headingClassName="text-2xl font-bold tracking-tight text-emerald-950 md:text-3xl"
  itemClassName="rounded-2xl border border-emerald-900/10 bg-white p-4"
  questionClassName="text-[15px] font-semibold text-emerald-950"
  answerClassName="text-[15px] leading-relaxed text-emerald-900/60"
/>
```

| 위치 | 현행 | 교정 |
|---|---|---|
| L25 | "하루의 순공이 일간, 주간, 월간으로 포개집니다. 이어지는 스트릭이" | "하루의 순공이 달력 위에 포개집니다. 이어지는 연속 공부가" |

- [ ] **Step 6: 검증**

Run: `npm run build && grep -rn "감지\|스트릭\|자리 비움\|딴짓" app/intro components --include="*.tsx"`
Expected: 빌드 성공, 코드 주석 외 노출 문구 0건. dev 서버에서 5종 확인 — 특히 soft의 기록 목업(달력·연속 공부 배너) 렌더.

- [ ] **Step 7: 커밋**

```bash
git add app/intro/soft app/intro/midnight app/intro/kinetic app/intro/aurora app/intro/zen
git commit -m "feat: 시안 5종(soft·midnight·kinetic·aurora·zen)에 V1.0 용어·FAQ·SEO 적용"
```

---

### Task 9: sitemap 보강 + 전체 최종 검증

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: sitemap에 `/support` 추가**

```ts
// 시안 확정 후 메인(/)을 추가할 것. 시안 페이지들은 임시라 제외.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.siteUrl}/privacy`, lastModified: new Date() },
    { url: `${SITE.siteUrl}/terms`, lastModified: new Date() },
    { url: `${SITE.siteUrl}/support`, lastModified: new Date() },
  ];
}
```

(`/`는 현재 noindex 임시 허브라 sitemap에 넣지 않는다 — 승격 시 추가)

- [ ] **Step 2: 금지어 전수 검사**

Run: `grep -rn "순집중\|FocusOn\|세션 결과\|화면 꺼짐" app components lib --include="*.tsx" --include="*.ts"`
Expected: 0건.

Run: `grep -rn "감지\|감시\|딴짓\|스트릭\|자리 비움\|잡아냅\|적발" app components lib --include="*.tsx" --include="*.ts" | grep -v "^\s*//\|{/\*\|\* "`
Expected: 노출 문구 0건 (주석만 허용).

- [ ] **Step 3: robots noindex 확인**

Run: `grep -L "robots" app/intro/*/page.tsx`
Expected: 출력 없음 (10종 모두 robots 설정 존재).

- [ ] **Step 4: 빌드 + 린트**

Run: `npm run build && npx eslint app components lib`
Expected: 둘 다 통과.

- [ ] **Step 5: JSON-LD 형식 확인**

Run: dev 서버에서 `curl -s localhost:3000/intro/ink | grep -o 'application/ld+json'`
Expected: 1건 이상. 페이지 소스의 JSON-LD 블록이 유효한 JSON인지 확인(`FAQPage`에 8문항).

- [ ] **Step 6: 10종 육안 확인** — dev 서버에서 `/intro/{ink,focus,bold,soft,midnight,kinetic,bento,aurora,chrono,zen}` 순회: 목업 4종 렌더, 라이브 타이머(focus·bento), FAQ 펼침, 각 시안 무드 유지.

- [ ] **Step 7: 커밋**

```bash
git add app/sitemap.ts
git commit -m "feat: sitemap에 /support 추가, V1.0 반영 최종 검증"
```
