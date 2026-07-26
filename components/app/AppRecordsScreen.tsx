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
const DOT_DAYS = new Set([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);

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
