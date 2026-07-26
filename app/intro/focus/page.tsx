import type { Metadata } from "next";
import Link from "next/link";
import {
  ChartBarIcon,
  DeviceMobileSlashIcon,
  FlameIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AppTimerScreen } from "@/components/app/AppTimerScreen";
import { PhoneSlot } from "@/components/PhoneSlot";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 (Focus)",
  description:
    "집중한 시간만 셉니다. 카메라 AI가 자리 비움과 휴대폰 사용을 감지하는 순공 타이머 FocusON.",
};

const weekBars = [64, 82, 45, 91, 77, 30, 88]; // mock: 주간 순공 시간 비율

export default function FocusPage() {
  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* 네비게이션 */}
        <nav className="flex h-16 items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
            FocusON
          </span>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            문의하기
          </a>
        </nav>

        {/* 히어로: 스플릿 */}
        <header className="grid items-center gap-12 pt-16 pb-24 md:grid-cols-[1.1fr_0.9fr] md:pt-20 md:pb-28">
          <div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tighter md:text-6xl">
              집중한 시간만
              <br />
              셉니다.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
              카메라가 자리 비움과 휴대폰 사용을 감지하면 순공 타이머는 그
              순간 멈춥니다.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="inline-flex h-12 items-center rounded-full bg-emerald-400 px-7 text-[15px] font-semibold text-zinc-950 transition-transform active:scale-[0.98]"
              >
                문의하기
              </a>
              <span className="text-sm text-zinc-500">
                App Store와 Google Play 출시 준비 중
              </span>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[270px]">
              <PhoneSlot frameClassName="border-zinc-700/80 bg-zinc-900 shadow-[0_32px_90px_-30px_rgba(52,211,153,0.25)]">
                <AppTimerScreen live />
              </PhoneSlot>
            </div>
          </div>
        </header>

        {/* 기능: 비대칭 그리드 */}
        <section className="border-t border-zinc-800/80 py-20 md:py-24">
          <Reveal>
            <h2 className="max-w-xl text-2xl font-bold tracking-tight md:text-3xl">
              감지는 AI가, 기록은 자동으로
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <article className="flex h-full flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7">
                <DeviceMobileSlashIcon
                  size={28}
                  weight="duotone"
                  className="text-emerald-400"
                />
                <div className="mt-16">
                  <h3 className="text-xl font-semibold tracking-tight">
                    자리 비움과 휴대폰 사용 감지
                  </h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-zinc-400">
                    책상을 떠나거나 휴대폰을 집어 드는 순간을 기기 안의 비전
                    AI가 알아차립니다. 딴짓한 구간은 순공 시간에서 정확히
                    빠집니다.
                  </p>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-3">
              <article className="flex h-full flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7">
                <ChartBarIcon
                  size={28}
                  weight="duotone"
                  className="text-emerald-400"
                />
                <div className="mt-14">
                  <div
                    className="flex h-16 items-end gap-1.5"
                    aria-hidden="true"
                  >
                    {weekBars.map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className={`w-full rounded-sm ${
                          i === 3 ? "bg-emerald-400" : "bg-zinc-700"
                        }`}
                      />
                    ))}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    일간, 주간, 월간 통계
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    내 공부 패턴이 숫자로 쌓입니다.
                  </p>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.16} className="md:col-span-3">
              <article className="flex h-full flex-col justify-between rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-7">
                <FlameIcon
                  size={28}
                  weight="duotone"
                  className="text-emerald-400"
                />
                <div className="mt-14">
                  <p className="font-mono text-4xl font-medium tabular-nums text-emerald-300">
                    31
                  </p>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    스트릭
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    하루도 빠짐없이 이어 온 기록이 내일의 이유가 됩니다.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* 프라이버시 밴드 */}
        <section className="border-t border-zinc-800/80 py-20 md:py-24">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
              <ShieldCheckIcon
                size={44}
                weight="duotone"
                className="text-emerald-400"
              />
              <div>
                <h2 className="max-w-2xl text-2xl font-bold leading-snug tracking-tight md:text-3xl">
                  영상은 기기 안에서 분석되고, 그 자리에서 사라집니다.
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-400 md:text-base">
                  서버로 올라가는 것은 집중 상태의 기록뿐입니다. 영상과 사진은
                  전송하지도 저장하지도 않으며, 계정이 없으니 이름과 이메일을
                  요구할 일도 없습니다.
                </p>
                <Link
                  href={SITE.privacyPath}
                  className="mt-7 inline-block text-[15px] font-medium text-emerald-300 underline decoration-emerald-300/40 underline-offset-4 transition-colors hover:decoration-emerald-300"
                >
                  개인정보처리방침 전문 보기
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 푸터 */}
        <footer className="flex flex-col gap-4 border-t border-zinc-800/80 py-10 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span>© 2026 숨 벅찬 청년들</span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="transition-colors hover:text-zinc-200"
            >
              {SITE.supportEmail}
            </a>
            <Link
              href={SITE.privacyPath}
              className="transition-colors hover:text-zinc-200"
            >
              개인정보처리방침
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
