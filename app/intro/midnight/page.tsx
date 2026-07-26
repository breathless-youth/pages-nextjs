import type { Metadata } from "next";
import Link from "next/link";
import {
  ChartBarIcon,
  EyeIcon,
  MoonStarsIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AppResultScreen } from "@/components/app/AppResultScreen";
import { PhoneSlot } from "@/components/PhoneSlot";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 (Midnight)",
  description:
    "새벽까지 이어지는 공부, 순공 시간으로 증명. 온디바이스 AI 공부 타이머 FocusON.",
};

// 밤하늘 별 (고정 좌표, hydration 안정)
const stars: { top: string; left: string; size: number; delay: string }[] = [
  { top: "8%", left: "12%", size: 2, delay: "0s" },
  { top: "16%", left: "38%", size: 1.5, delay: "0.7s" },
  { top: "6%", left: "62%", size: 2, delay: "1.4s" },
  { top: "22%", left: "81%", size: 1.5, delay: "0.3s" },
  { top: "34%", left: "8%", size: 1.5, delay: "1.9s" },
  { top: "12%", left: "90%", size: 2, delay: "2.4s" },
  { top: "40%", left: "48%", size: 1.5, delay: "1.1s" },
  { top: "28%", left: "58%", size: 1, delay: "2.8s" },
  { top: "45%", left: "88%", size: 1.5, delay: "0.5s" },
  { top: "50%", left: "22%", size: 1, delay: "2.1s" },
  { top: "10%", left: "26%", size: 1, delay: "1.6s" },
  { top: "36%", left: "70%", size: 1, delay: "0.9s" },
];

const nightFeatures: { icon: React.ReactNode; title: string; body: string }[] =
  [
    {
      icon: <EyeIcon size={26} weight="duotone" className="text-sky-300" />,
      title: "졸음도 딴짓도 놓치지 않는 감지",
      body: "자리 비움과 휴대폰 사용을 기기 안의 비전 AI가 알아차립니다. 흐트러진 구간은 순공 시간에서 빠집니다.",
    },
    {
      icon: (
        <ChartBarIcon size={26} weight="duotone" className="text-sky-300" />
      ),
      title: "아침에 확인하는 어젯밤의 기록",
      body: "세션이 끝나면 순공 시간과 집중률이 정리됩니다. 일간, 주간, 월간 통계로 쌓입니다.",
    },
    {
      icon: (
        <ShieldCheckIcon size={26} weight="duotone" className="text-sky-300" />
      ),
      title: "카메라는 기기 안에서만",
      body: "영상은 폰 밖으로 나가지 않습니다. 서버에 남는 것은 집중 기록뿐입니다.",
    },
  ];

export default function MidnightPage() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#0a1128] text-slate-100">
      {/* 밤하늘: 별 + 글로우 오브 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full bg-sky-200"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
            }}
          />
        ))}
        <div className="animate-drift absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="animate-drift-slow absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* 네비게이션 */}
        <nav className="flex h-16 items-center justify-between">
          <span className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
            <MoonStarsIcon size={18} weight="duotone" className="text-sky-300" />
            FocusON
          </span>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-sm text-slate-400 transition-colors hover:text-slate-100"
          >
            문의하기
          </a>
        </nav>

        {/* 히어로 */}
        <header className="grid items-center gap-14 pt-16 pb-24 md:grid-cols-[1.1fr_0.9fr] md:pt-22 md:pb-32">
          <div>
            <h1 className="animate-fade-up text-4xl font-bold leading-[1.12] tracking-tighter md:text-6xl">
              새벽 두 시의 집중도
              <br />
              전부 기록이 됩니다
            </h1>
            <p className="animate-fade-up mt-6 max-w-md text-base leading-relaxed text-slate-400 [animation-delay:130ms] md:text-lg">
              모두가 잠든 시간의 공부일수록 증거가 필요하니까. AI가 지켜본
              순공 시간만 남습니다.
            </p>
            <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-5 [animation-delay:260ms]">
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="inline-flex h-12 items-center rounded-full bg-sky-300 px-7 text-[15px] font-semibold text-[#0a1128] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                문의하기
              </a>
              <span className="text-sm text-slate-500">
                App Store와 Google Play 출시 준비 중
              </span>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="animate-float-y w-full max-w-[270px]">
              <PhoneSlot frameClassName="border-sky-200/20 bg-white/[0.06] backdrop-blur-sm shadow-[0_40px_100px_-40px_rgba(125,211,252,0.35)]">
                <AppResultScreen />
              </PhoneSlot>
            </div>
          </div>
        </header>

        {/* 밤 공부 선언 */}
        <section className="border-t border-slate-100/10 py-20 md:py-24">
          <Reveal>
            <p className="max-w-3xl text-[1.6rem] font-bold leading-snug tracking-tight text-slate-200 md:text-4xl">
              앉아 있던 다섯 시간이 아니라,
              <br />
              집중한 <span className="text-sky-300">세 시간 사십이 분</span>이
              남습니다.
            </p>
          </Reveal>
        </section>

        {/* 기능 */}
        <section className="border-t border-slate-100/10 py-20 md:py-24">
          <div className="grid gap-4 md:grid-cols-3">
            {nightFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <article className="h-full rounded-2xl border border-slate-100/10 bg-white/[0.04] p-7 transition-colors hover:border-sky-200/25">
                  {f.icon}
                  <h2 className="mt-12 text-lg font-semibold leading-snug tracking-tight">
                    {f.title}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-slate-400">
                    {f.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <Link
              href={SITE.privacyPath}
              className="mt-10 inline-block text-[15px] font-medium text-sky-300 underline decoration-sky-300/40 underline-offset-4 transition-colors hover:decoration-sky-300"
            >
              개인정보처리방침 전문 보기
            </Link>
          </Reveal>
        </section>

        {/* 푸터 */}
        <footer className="flex flex-col gap-4 border-t border-slate-100/10 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
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
