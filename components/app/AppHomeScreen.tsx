import {
  CalendarBlankIcon,
  FireIcon,
  GearSixIcon,
  HouseIcon,
  PlayIcon,
  TimerIcon,
} from "@phosphor-icons/react/dist/ssr";

/** 홈 화면 재현 (디자인 초안 1번 기반). 수치는 초안 값 그대로. */
export function AppHomeScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f4f6fa] text-slate-900">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="text-[11px] font-bold tracking-tight">FocusOn</span>
        <span className="text-[9px] text-slate-400">7월 25일 토요일</span>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden px-3 pt-3">
        {/* 오늘 순집중 */}
        <div className="rounded-xl bg-white p-3 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <p className="text-[9px] font-medium text-slate-400">오늘 순집중</p>
          <p className="mt-0.5 text-lg font-extrabold tracking-tight">
            3시간 42분
          </p>
          <div className="mt-1.5 flex items-center justify-between border-t border-slate-100 pt-1.5">
            <span className="text-[9px] text-slate-400">총 공부 5시간 12분</span>
            <span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[9px] font-semibold text-blue-600">
              71% 집중
            </span>
          </div>
        </div>

        {/* 집중 시작 */}
        <div className="animate-soft-pulse flex items-center justify-between rounded-xl bg-blue-600 p-3 text-white">
          <div>
            <p className="text-[11px] font-bold">집중 시작</p>
            <p className="mt-0.5 text-[8.5px] text-blue-200">
              탭하면 바로 측정을 시작해요
            </p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <PlayIcon size={12} weight="fill" />
          </span>
        </div>

        {/* 스트릭 / 최장 집중 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white p-2.5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
            <p className="flex items-center gap-1 text-[9px] text-slate-400">
              <FireIcon size={10} weight="fill" className="text-orange-500" />
              연속 측정
            </p>
            <p className="mt-1 text-[13px] font-bold">12일</p>
          </div>
          <div className="rounded-xl bg-white p-2.5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
            <p className="flex items-center gap-1 text-[9px] text-slate-400">
              <TimerIcon size={10} weight="fill" className="text-blue-600" />
              최장 집중
            </p>
            <p className="mt-1 text-[13px] font-bold">52분</p>
          </div>
        </div>
      </div>

      {/* 탭바 */}
      <div className="grid grid-cols-3 border-t border-slate-200/80 bg-white px-2 py-2">
        {[
          { icon: <HouseIcon size={13} weight="fill" />, label: "홈", on: true },
          { icon: <CalendarBlankIcon size={13} />, label: "기록", on: false },
          { icon: <GearSixIcon size={13} />, label: "설정", on: false },
        ].map((t) => (
          <span
            key={t.label}
            className={`flex flex-col items-center gap-0.5 text-[8px] ${
              t.on ? "text-blue-600" : "text-slate-300"
            }`}
          >
            {t.icon}
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
