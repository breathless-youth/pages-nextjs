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
