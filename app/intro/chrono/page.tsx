import type { Metadata } from "next";
import Link from "next/link";
import { AppResultScreen } from "@/components/app/AppResultScreen";
import { ChronoRing } from "@/components/chrono/ChronoRing";
import { PhoneSlot } from "@/components/PhoneSlot";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 (Chrono)",
  description:
    "공부를 기록 경기처럼. 카메라 AI가 순공 시간을 초 단위로 재는 공부 타이머 FocusON.",
};

// 초안 세션 결과 값 기반
const laps: [string, string, string][] = [
  ["자리 비움", "2회", "-9:40"],
  ["휴대폰 사용", "2회", "-6:12"],
  ["기기 조작", "1회", "-2:08"],
  ["화면 꺼짐", "1회", "-3:00"],
];

export default function ChronoPage() {
  return (
    <div className="min-h-[100dvh] bg-[#faf9f7] text-zinc-900">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* 네비게이션 */}
        <nav className="flex h-16 items-center justify-between">
          <span className="text-[15px] font-bold tracking-tight">FocusON</span>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="font-mono text-sm text-zinc-500 transition-colors hover:text-zinc-900"
          >
            문의하기
          </a>
        </nav>

        {/* 히어로 */}
        <header className="grid items-center gap-14 pt-14 pb-20 md:grid-cols-2 md:pt-18 md:pb-28">
          <div>
            <h1 className="animate-fade-up text-4xl font-extrabold leading-[1.1] tracking-tighter md:text-6xl">
              공부는 기록 경기다
            </h1>
            <p className="animate-fade-up mt-6 max-w-md text-base leading-relaxed text-zinc-500 [animation-delay:130ms] md:text-lg">
              카메라 AI가 심판처럼 지켜보고, 순공 시간만 공식 기록으로
              인정합니다.
            </p>
            <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-5 [animation-delay:260ms]">
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="inline-flex h-12 items-center rounded-full bg-red-600 px-7 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                문의하기
              </a>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                App Store, Google Play 출시 준비 중
              </span>
            </div>
          </div>
          <ChronoRing />
        </header>

        {/* 감점 기록 (랩 타임) */}
        <section className="grid items-start gap-12 border-t border-zinc-200 py-20 md:grid-cols-2 md:py-24">
          <Reveal>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                딴짓은 전부 감점입니다
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-zinc-500">
                세션이 끝나면 어떤 딴짓으로 몇 분을 잃었는지 그대로
                보여줍니다. 초안의 실제 세션 결과 예시입니다.
              </p>
              <ul className="mt-8 max-w-sm">
                {laps.map(([name, count, penalty], i) => (
                  <Reveal key={name} delay={i * 0.08}>
                    <li className="flex items-baseline justify-between border-b border-zinc-200 py-3.5">
                      <span className="font-semibold">{name}</span>
                      <span className="font-mono text-sm tabular-nums text-zinc-400">
                        {count}
                        <span className="ml-4 font-bold text-red-600">
                          {penalty}
                        </span>
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex justify-center md:justify-end">
              <PhoneSlot frameClassName="border-zinc-300 bg-white shadow-[0_28px_70px_-35px_rgba(220,38,38,0.35)]">
                <AppResultScreen />
              </PhoneSlot>
            </div>
          </Reveal>
        </section>

        {/* 프라이버시 */}
        <section className="border-t border-zinc-200 py-20 md:py-24">
          <Reveal>
            <p className="max-w-3xl text-[1.6rem] font-extrabold leading-snug tracking-tight md:text-4xl">
              심판은 <span className="text-red-600">폰 안에만</span> 있습니다.
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-500 md:text-base">
              집중 상태 분석은 전부 기기 안에서 끝나고, 영상과 사진은 서버로
              전송되지 않습니다. 회원가입 없이 시작하므로 연락처를 요구할 일도
              없습니다.
            </p>
            <Link
              href={SITE.privacyPath}
              className="mt-7 inline-block font-mono text-sm font-bold underline decoration-red-600 decoration-2 underline-offset-4"
            >
              개인정보처리방침 보기
            </Link>
          </Reveal>
        </section>

        {/* 푸터 */}
        <footer className="flex flex-col gap-4 border-t border-zinc-200 py-10 font-mono text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">
          <span>© 2026 숨 벅찬 청년들</span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="transition-colors hover:text-zinc-900"
            >
              {SITE.supportEmail}
            </a>
            <Link
              href={SITE.privacyPath}
              className="transition-colors hover:text-zinc-900"
            >
              개인정보처리방침
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
