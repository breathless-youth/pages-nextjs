import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyIcon } from "@phosphor-icons/react/dist/ssr";
import { AppTimerScreen } from "@/components/app/AppTimerScreen";
import { BarGrow, DotFill, StatusCycle } from "@/components/bento/BentoTiles";
import { CountUp } from "@/components/CountUp";
import { PhoneSlot } from "@/components/PhoneSlot";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 (Bento)",
  description:
    "순공 시간, 통계, 스트릭까지 한 판에. 온디바이스 AI 공부 타이머 FocusON.",
};

export default function BentoPage() {
  return (
    <div className="min-h-[100dvh] bg-[#f5f5f4] text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* 네비게이션 */}
        <nav className="flex h-16 items-center justify-between">
          <span className="text-[15px] font-bold tracking-tight">FocusON</span>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            문의하기
          </a>
        </nav>

        {/* 히어로 */}
        <header className="pt-16 pb-14 md:pt-20 md:pb-16">
          <h1 className="animate-fade-up max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tighter md:text-6xl">
            공부의 모든 숫자,
            <br />한 판에 정리됩니다
          </h1>
          <p className="animate-fade-up mt-6 max-w-md text-base leading-relaxed text-slate-500 [animation-delay:130ms] md:text-lg">
            AI가 잰 순공 시간부터 통계와 스트릭까지. 기록은 FocusON이 하고,
            당신은 공부만 하면 됩니다.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-5 [animation-delay:260ms]">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="inline-flex h-12 items-center rounded-full bg-blue-600 px-7 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              문의하기
            </a>
            <span className="text-sm text-slate-400">
              App Store와 Google Play 출시 준비 중
            </span>
          </div>
        </header>

        {/* 벤토 그리드 */}
        <section className="pb-20 md:pb-28">
          <div className="grid gap-4 md:grid-cols-3">
            {/* 폰 타일 (2행) */}
            <Reveal className="md:row-span-2">
              <article className="flex h-full items-center justify-center rounded-3xl border border-slate-200/80 bg-slate-900 p-8 transition-transform duration-300 hover:-translate-y-1">
                <div className="w-full max-w-[240px]">
                  <PhoneSlot frameClassName="border-slate-700 bg-slate-800">
                    <AppTimerScreen live />
                  </PhoneSlot>
                </div>
              </article>
            </Reveal>

            {/* 오늘 순공 카운트업 */}
            <Reveal delay={0.07}>
              <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 transition-transform duration-300 hover:-translate-y-1">
                <p className="text-sm font-medium text-slate-400">
                  오늘 순공 (예시)
                </p>
                <p className="mt-8 text-4xl font-extrabold tabular-nums tracking-tight md:text-5xl">
                  <CountUp to={3 * 3600 + 42 * 60} variant="ko-hm" />
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  앉아 있던 시간이 아니라 실제로 집중한 시간입니다.
                </p>
              </article>
            </Reveal>

            {/* 상태 감지 순환 */}
            <Reveal delay={0.14}>
              <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 transition-transform duration-300 hover:-translate-y-1">
                <StatusCycle />
                <div className="mt-8">
                  <h2 className="text-lg font-bold tracking-tight">
                    상태를 아는 타이머
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    자리 비움과 휴대폰 사용을 기기 안의 AI가 감지하고, 그
                    구간은 순공에서 뺍니다.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* 주간 통계 */}
            <Reveal delay={0.1}>
              <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 transition-transform duration-300 hover:-translate-y-1">
                <BarGrow />
                <div className="mt-6">
                  <h2 className="text-lg font-bold tracking-tight">
                    일간, 주간, 월간 통계
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    공부 패턴이 숫자로 쌓입니다.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* 스트릭 */}
            <Reveal delay={0.17}>
              <article className="flex h-full flex-col justify-between rounded-3xl border border-blue-200 bg-blue-50/60 p-7 transition-transform duration-300 hover:-translate-y-1">
                <DotFill days={12} />
                <div className="mt-6">
                  <h2 className="text-lg font-bold tracking-tight">
                    12일째 이어지는 중
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    하루하루 채워지는 연속 기록이 내일의 이유가 됩니다.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* 프라이버시 (와이드) */}
            <Reveal delay={0.1} className="md:col-span-3">
              <article className="grid gap-6 rounded-3xl bg-blue-600 p-8 text-white transition-transform duration-300 hover:-translate-y-1 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10">
                <LockKeyIcon size={36} weight="duotone" />
                <div>
                  <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                    카메라 영상은 기기 안에서만 분석됩니다
                  </h2>
                  <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-blue-100">
                    서버에 남는 것은 집중 기록뿐. 영상과 사진은 전송도 저장도
                    없고, 회원가입이 없어 연락처를 요구하지도 않습니다.
                  </p>
                </div>
                <Link
                  href={SITE.privacyPath}
                  className="inline-flex h-11 w-fit items-center rounded-full bg-white px-6 text-sm font-semibold text-blue-700 transition-transform hover:-translate-y-0.5"
                >
                  개인정보처리방침
                </Link>
              </article>
            </Reveal>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="flex flex-col gap-4 border-t border-slate-200 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>© 2026 숨 벅찬 청년들</span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="transition-colors hover:text-slate-900"
            >
              {SITE.supportEmail}
            </a>
            <Link
              href={SITE.privacyPath}
              className="transition-colors hover:text-slate-900"
            >
              개인정보처리방침
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
