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
