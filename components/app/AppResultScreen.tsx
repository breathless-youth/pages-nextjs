import { XIcon } from "@phosphor-icons/react/dist/ssr";

/** 세션 결과 화면 재현 (디자인 초안 3번 기반). 수치는 초안 값 그대로. */

// 타임라인 세그먼트: 집중(파랑) / 비집중(주황) 구간 비율
const timeline: { focus: boolean; w: number }[] = [
  { focus: true, w: 18 },
  { focus: false, w: 5 },
  { focus: true, w: 24 },
  { focus: false, w: 7 },
  { focus: true, w: 14 },
  { focus: false, w: 4 },
  { focus: true, w: 28 },
];

const distractions: [string, string, string][] = [
  ["자리 비움", "2회", "9분 40초"],
  ["휴대폰 사용", "2회", "6분 12초"],
  ["기기 조작", "1회", "2분 8초"],
  ["화면 꺼짐", "1회", "3분"],
];

export function AppResultScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f4f6fa] text-slate-900">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="text-[11px] font-bold">세션 결과</span>
        <XIcon size={11} className="text-slate-400" />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3 pt-1">
        {/* 요약 */}
        <div className="rounded-xl bg-white p-3.5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <p className="text-[9.5px] font-medium text-slate-400">순집중</p>
          <div className="mt-1 flex items-center gap-1.5">
            <p className="text-xl font-extrabold tracking-tight">1시간 24분</p>
            <span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[9px] font-semibold text-blue-600">
              80% 집중
            </span>
          </div>
          <p className="mt-1.5 text-[9.5px] text-slate-400">
            총 공부 1시간 45분 &middot; 21:03 ~ 22:48
          </p>
        </div>

        {/* 타임라인 */}
        <div className="rounded-xl bg-white p-3.5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <p className="text-[9.5px] font-medium text-slate-400">
            공부 타임라인
          </p>
          <div className="mt-2.5 flex h-3 w-full gap-[2px] overflow-hidden rounded-full">
            {timeline.map((seg, i) => (
              <span
                key={i}
                style={{ width: `${seg.w}%` }}
                className={`h-full rounded-[2px] ${
                  seg.focus ? "bg-blue-500" : "bg-orange-400"
                }`}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2.5 text-[8.5px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              집중
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              비집중
            </span>
          </div>
        </div>

        {/* 비집중 내역 */}
        <div className="rounded-xl bg-white p-3.5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
          <p className="text-[9.5px] font-medium text-slate-400">비집중 21분</p>
          <ul className="mt-1 divide-y divide-slate-100">
            {distractions.map(([name, count, dur]) => (
              <li
                key={name}
                className="flex items-center justify-between py-2 text-[10px]"
              >
                <span className="font-medium">{name}</span>
                <span className="text-slate-400">
                  {count} &middot; {dur}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 확인 버튼 */}
      <div className="px-3 pb-4 pt-2.5">
        <div className="rounded-lg bg-blue-600 py-2.5 text-center text-[10.5px] font-bold text-white">
          확인
        </div>
      </div>
    </div>
  );
}
