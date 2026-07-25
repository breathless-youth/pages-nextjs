import type { Metadata } from "next";
import Link from "next/link";
import { AppTimerScreen } from "@/components/app/AppTimerScreen";
import { PhoneSlot } from "@/components/PhoneSlot";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 (Zen)",
  description:
    "조용히 깊게 오래. 온디바이스 AI가 몰입의 시간만 기록하는 공부 타이머 FocusOn.",
};

const principles: [string, string][] = [
  [
    "알아차림",
    "자리를 비우거나 휴대폰을 드는 순간을 기기 안의 AI가 조용히 알아차립니다. 알림으로 다그치지 않고, 기록에서 덜어낼 뿐입니다.",
  ],
  [
    "덜어냄",
    "흐트러진 시간은 빠지고 몰입한 시간만 남습니다. 숫자가 담백해질수록 기록은 정직해집니다.",
  ],
  [
    "쌓임",
    "하루의 순공이 일간, 주간, 월간으로 포개집니다. 이어지는 스트릭이 내일도 같은 자리에 앉게 합니다.",
  ],
];

export default function ZenPage() {
  return (
    <div className="min-h-[100dvh] bg-[#f3f6f1] text-emerald-950">
      <div className="mx-auto w-full max-w-4xl px-6">
        {/* 네비게이션 */}
        <nav className="flex h-16 items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight">
            FocusOn
          </span>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-sm text-emerald-900/50 transition-colors hover:text-emerald-950"
          >
            문의하기
          </a>
        </nav>

        {/* 히어로: 브리딩 서클 */}
        <header className="relative flex min-h-[70dvh] flex-col items-center justify-center py-20 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span className="animate-breathe absolute h-[26rem] w-[26rem] rounded-full border border-emerald-700/15" />
            <span className="animate-breathe absolute h-[19rem] w-[19rem] rounded-full border border-emerald-700/20 [animation-delay:1.2s]" />
            <span className="animate-breathe absolute h-[12.5rem] w-[12.5rem] rounded-full bg-emerald-700/[0.06] [animation-delay:2.4s]" />
          </div>
          <h1 className="animate-fade-up relative text-4xl font-bold leading-[1.15] tracking-tight md:text-6xl">
            조용히, 깊게, 오래
          </h1>
          <p className="animate-fade-up relative mx-auto mt-6 max-w-md text-base leading-relaxed text-emerald-900/60 [animation-delay:150ms] md:text-lg">
            몰입을 방해하지 않는 공부 타이머. AI가 조용히 지켜보고 순공
            시간만 남깁니다.
          </p>
          <div className="animate-fade-up relative mt-9 flex flex-col items-center gap-4 [animation-delay:300ms]">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="inline-flex h-12 items-center rounded-full bg-emerald-900 px-8 text-[15px] font-medium text-emerald-50 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              문의하기
            </a>
            <span className="text-sm text-emerald-900/40">
              App Store와 Google Play 출시 준비 중
            </span>
          </div>
        </header>

        {/* 원칙 3가지 */}
        <section className="space-y-20 py-20 md:space-y-24 md:py-28">
          {principles.map(([title, body], i) => (
            <Reveal key={title} delay={0.05 + i * 0.03}>
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {title}
                </h2>
                <p className="mt-4 leading-loose text-emerald-900/60">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </section>

        {/* 폰 */}
        <section className="flex justify-center pb-20 md:pb-28">
          <Reveal>
            <div className="animate-float-y w-full max-w-[270px] [animation-duration:8s]">
              <PhoneSlot frameClassName="border-emerald-900/15 bg-white shadow-[0_36px_90px_-45px_rgba(6,78,59,0.5)]">
                <AppTimerScreen />
              </PhoneSlot>
            </div>
          </Reveal>
        </section>

        {/* 프라이버시 */}
        <section className="border-t border-emerald-900/10 py-20 text-center md:py-24">
          <Reveal>
            <p className="mx-auto max-w-2xl text-[1.5rem] font-bold leading-snug tracking-tight md:text-3xl">
              카메라 영상은 기기 안에서 피어나고, 그 자리에서 사라집니다.
            </p>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-loose text-emerald-900/60">
              서버에 남는 것은 몰입의 기록뿐입니다. 영상도 사진도 전송하지
              않고, 회원가입이 없어 이름과 이메일을 물을 일도 없습니다.
            </p>
            <Link
              href={SITE.privacyPath}
              className="mt-7 inline-block text-[15px] font-medium text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 transition-colors hover:decoration-emerald-800"
            >
              개인정보처리방침 보기
            </Link>
          </Reveal>
        </section>

        {/* 푸터 */}
        <footer className="flex flex-col gap-4 border-t border-emerald-900/10 py-10 text-sm text-emerald-900/40 md:flex-row md:items-center md:justify-between">
          <span>© 2026 숨벅찬 청년들</span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="transition-colors hover:text-emerald-950"
            >
              {SITE.supportEmail}
            </a>
            <Link
              href={SITE.privacyPath}
              className="transition-colors hover:text-emerald-950"
            >
              개인정보처리방침
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
