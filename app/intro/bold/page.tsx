import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { AppTimerScreen } from "@/components/app/AppTimerScreen";
import { PhoneSlot } from "@/components/PhoneSlot";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 (Bold)",
  description:
    "딴짓하면 시계가 멈춘다. 카메라 AI가 순공 시간만 기록하는 공부 타이머 FocusOn.",
};

const cells: [string, string][] = [
  [
    "감지",
    "자리를 뜨거나 휴대폰을 집으면 기기 안의 비전 AI가 즉시 알아차립니다.",
  ],
  [
    "순공",
    "딴짓한 구간은 전부 빠집니다. 남는 숫자는 실제로 집중한 시간뿐입니다.",
  ],
  [
    "통계",
    "일간, 주간, 월간 리포트로 내 공부 패턴이 그대로 드러납니다.",
  ],
  [
    "스트릭",
    "하루도 끊기지 않은 연속 기록. 끊기 싫어서라도 책상에 앉게 됩니다.",
  ],
];

const marquee = Array(6).fill("순공만 남는다 / FOCUS ONLY / ");

export default function BoldPage() {
  return (
    <div className="min-h-[100dvh] bg-[#f4f4f1] text-zinc-900">
      <div className="mx-auto w-full max-w-6xl border-x-2 border-zinc-900">
        {/* 네비게이션 */}
        <nav className="flex h-16 items-center justify-between border-b-2 border-zinc-900 px-6">
          <span className="font-mono text-sm font-bold uppercase tracking-widest">
            FocusOn
          </span>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="font-mono text-sm underline underline-offset-4 hover:bg-zinc-900 hover:text-[#f4f4f1]"
          >
            문의하기
          </a>
        </nav>

        {/* 히어로 */}
        <header className="grid border-b-2 border-zinc-900 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col justify-center px-6 py-16 md:py-20">
            <h1 className="text-[3rem] font-black leading-[0.95] tracking-tighter md:text-[5.2rem]">
              딴짓하면
              <br />
              시계가 <span className="text-blue-700">멈춘다.</span>
            </h1>
            <p className="mt-8 max-w-md text-base font-medium leading-relaxed text-zinc-600 md:text-lg">
              카메라 AI가 자리 비움과 휴대폰 사용을 잡아냅니다. 기록되는 건
              순공 시간뿐입니다.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="inline-flex h-13 items-center border-2 border-zinc-900 bg-blue-700 px-8 text-[15px] font-bold text-white shadow-[4px_4px_0_0_#18181b] transition-all hover:shadow-[2px_2px_0_0_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                문의하기
              </a>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                App Store, Google Play 출시 준비 중
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center border-t-2 border-zinc-900 px-6 py-12 md:border-l-2 md:border-t-0">
            <PhoneSlot frameClassName="border-2 border-zinc-900 bg-white shadow-[8px_8px_0_0_#18181b]">
              <AppTimerScreen />
            </PhoneSlot>
          </div>
        </header>

        {/* 마퀴 */}
        <div
          className="overflow-hidden border-b-2 border-zinc-900 bg-zinc-900 py-3"
          aria-hidden="true"
        >
          <div className="animate-marquee flex w-max whitespace-nowrap font-mono text-sm font-bold uppercase tracking-widest text-[#f4f4f1]">
            <span>{marquee.join("")}</span>
            <span>{marquee.join("")}</span>
          </div>
        </div>

        {/* 기능 그리드 */}
        <section className="grid md:grid-cols-2">
          {cells.map(([title, body], i) => (
            <article
              key={title}
              className={`border-b-2 border-zinc-900 px-6 py-12 md:py-14 ${
                i % 2 === 0 ? "md:border-r-2" : ""
              }`}
            >
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-sm text-[15px] font-medium leading-relaxed text-zinc-600">
                {body}
              </p>
            </article>
          ))}

          {/* 프라이버시 셀 (코발트) */}
          <article className="border-b-2 border-zinc-900 bg-blue-700 px-6 py-12 text-white md:border-r-2 md:py-14">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              영상은 안 올라간다
            </h2>
            <p className="mt-4 max-w-sm text-[15px] font-medium leading-relaxed text-blue-100">
              분석은 전부 기기 안에서 끝납니다. 서버에 남는 건 집중 기록뿐,
              영상과 사진은 전송도 저장도 없습니다.
            </p>
            <Link
              href={SITE.privacyPath}
              className="mt-6 inline-block border-b-2 border-white pb-0.5 text-[15px] font-bold"
            >
              개인정보처리방침 보기
            </Link>
          </article>

          {/* 문의 셀 (블랙) */}
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="group flex flex-col justify-between border-b-2 border-zinc-900 bg-zinc-900 px-6 py-12 text-[#f4f4f1] md:py-14"
          >
            <ArrowUpRightIcon
              size={36}
              weight="bold"
              className="self-end transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                궁금한 게 있다면
              </h2>
              <p className="mt-3 font-mono text-sm text-zinc-400">
                {SITE.supportEmail}
              </p>
            </div>
          </a>
        </section>

        {/* 푸터 */}
        <footer className="flex flex-col gap-3 px-6 py-8 font-mono text-xs uppercase tracking-wider text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span>© 2026 숨벅찬 청년들</span>
          <Link
            href={SITE.privacyPath}
            className="underline underline-offset-4 hover:text-zinc-900"
          >
            개인정보처리방침
          </Link>
        </footer>
      </div>
    </div>
  );
}
