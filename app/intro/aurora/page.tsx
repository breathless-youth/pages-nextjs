import type { Metadata } from "next";
import Link from "next/link";
import {
  ChartLineUpIcon,
  EyeIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AuroraTilt } from "@/components/aurora/AuroraTilt";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 (Aurora)",
  description:
    "흐트러진 시간은 걷어내고 순공만 남깁니다. 온디바이스 AI 공부 타이머 FocusOn.",
};

const cards: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <EyeIcon size={26} weight="duotone" className="text-teal-300" />,
    title: "감지하는 타이머",
    body: "자리 비움과 휴대폰 사용을 기기 안의 비전 AI가 알아차리고, 그 구간은 순공에서 뺍니다.",
  },
  {
    icon: (
      <ChartLineUpIcon size={26} weight="duotone" className="text-teal-300" />
    ),
    title: "쌓이는 기록",
    body: "세션이 끝나면 순공 시간과 집중률이 정리되고, 일간부터 월간까지 통계로 남습니다.",
  },
  {
    icon: (
      <ShieldCheckIcon size={26} weight="duotone" className="text-teal-300" />
    ),
    title: "나가지 않는 영상",
    body: "분석은 전부 기기 안에서 끝납니다. 영상과 사진은 서버로 전송되지 않습니다.",
  },
];

export default function AuroraPage() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#080f16] text-slate-100">
      {/* 오로라 배경 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-drift absolute -top-40 -left-24 h-[34rem] w-[34rem] rounded-full bg-teal-400/15 blur-3xl" />
        <div className="animate-drift-slow absolute top-24 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="animate-drift absolute bottom-[-20%] left-1/3 h-[26rem] w-[26rem] rounded-full bg-blue-500/10 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* 네비게이션 */}
        <nav className="flex h-16 items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight">
            FocusOn
          </span>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-sm text-slate-400 transition-colors hover:text-slate-100"
          >
            문의하기
          </a>
        </nav>

        {/* 히어로 */}
        <header className="grid items-center gap-14 pt-16 pb-24 md:grid-cols-2 md:pt-20 md:pb-32">
          <div>
            <h1 className="animate-fade-up text-4xl font-bold leading-[1.12] tracking-tighter md:text-6xl">
              흐트러진 시간은
              <br />
              걷어냅니다
            </h1>
            <p className="animate-fade-up mt-6 max-w-md text-base leading-relaxed text-slate-400 [animation-delay:130ms] md:text-lg">
              카메라 AI가 집중의 결만 골라 기록합니다. 남는 것은 투명한 순공
              시간뿐.
            </p>
            <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-5 [animation-delay:260ms]">
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="inline-flex h-12 items-center rounded-full border border-teal-300/40 bg-teal-300/10 px-7 text-[15px] font-semibold text-teal-200 backdrop-blur transition-colors hover:bg-teal-300/20 active:scale-[0.98]"
              >
                문의하기
              </a>
              <span className="text-sm text-slate-500">
                App Store와 Google Play 출시 준비 중
              </span>
            </div>
          </div>
          <AuroraTilt />
        </header>

        {/* 글래스 카드 */}
        <section className="border-t border-white/10 py-20 md:py-24">
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-colors hover:border-teal-300/25">
                  {c.icon}
                  <h2 className="mt-12 text-lg font-semibold tracking-tight">
                    {c.title}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-slate-400">
                    {c.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link
              href={SITE.privacyPath}
              className="mt-10 inline-block text-[15px] font-medium text-teal-300 underline decoration-teal-300/40 underline-offset-4 transition-colors hover:decoration-teal-300"
            >
              개인정보처리방침 전문 보기
            </Link>
          </Reveal>
        </section>

        {/* 푸터 */}
        <footer className="flex flex-col gap-4 border-t border-white/10 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>© 2026 숨 벅찬 청년들</span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="transition-colors hover:text-slate-200"
            >
              {SITE.supportEmail}
            </a>
            <Link
              href={SITE.privacyPath}
              className="transition-colors hover:text-slate-200"
            >
              개인정보처리방침
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
