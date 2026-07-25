import type { Metadata } from "next";
import Link from "next/link";
import {
  ChartLineUpIcon,
  EyesIcon,
  LockKeyIcon,
  TimerIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { SoftHeroVisual } from "@/components/soft/SoftHeroVisual";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 (Soft)",
  description:
    "집중한 만큼 쌓입니다. AI가 딴짓을 알아채고 순공 시간만 기록하는 공부 타이머 FocusOn.",
};

// mock: 스트릭 캘린더 예시 (0 없음, 1 조금, 2 많이)
const streakDots = [
  1, 2, 2, 1, 2, 0, 1, 2, 2, 1, 2, 2, 1, 0, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1,
  2, 1, 2, 0, 2, 2, 1, 2, 2, 2,
];

const features: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tint: string;
}[] = [
  {
    icon: <EyesIcon size={26} weight="duotone" className="text-orange-700" />,
    title: "딴짓을 알아채는 AI",
    body: "자리 비움도 휴대폰도 카메라가 알아봅니다. 분석은 기기 안에서만 이루어져요.",
    tint: "border-orange-200/70 bg-orange-100/60",
  },
  {
    icon: <TimerIcon size={26} weight="duotone" className="text-orange-700" />,
    title: "진짜 순공 시간",
    body: "흐트러진 구간은 자동으로 빠지고, 집중한 시간만 차곡차곡 쌓입니다.",
    tint: "border-stone-200/80 bg-white/80",
  },
  {
    icon: (
      <ChartLineUpIcon
        size={26}
        weight="duotone"
        className="text-orange-700"
      />
    ),
    title: "한눈에 보는 리포트",
    body: "일간, 주간, 월간 통계로 내 공부 리듬을 확인할 수 있어요.",
    tint: "border-stone-200/80 bg-white/80",
  },
  {
    icon: (
      <UsersThreeIcon
        size={26}
        weight="duotone"
        className="text-orange-700"
      />
    ),
    title: "같은 목표, 같은 책상",
    body: "수능, 공무원, 자격증. 같은 목표를 가진 사람들과 함께 공부할 수 있어요.",
    tint: "border-stone-200/80 bg-stone-100/70",
  },
];

export default function SoftPage() {
  return (
    <div className="min-h-[100dvh] bg-[linear-gradient(180deg,#fdfcfb_0%,#fff1e7_58%,#fdfcfb_100%)] text-stone-900">
      <div className="mx-auto w-full max-w-5xl px-6">
        {/* 네비게이션 */}
        <nav className="flex h-16 items-center justify-between">
          <span className="text-[15px] font-bold tracking-tight">FocusOn</span>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
          >
            문의하기
          </a>
        </nav>

        {/* 히어로 */}
        <header className="pt-16 pb-24 text-center md:pt-20 md:pb-28">
          <h1 className="mx-auto max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tighter md:text-6xl">
            집중한 만큼 쌓입니다
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-stone-500 md:text-lg">
            AI가 딴짓을 알아채는 공부 타이머. 흐트러진 시간은 빼고 순공
            시간만 기록해요.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="inline-flex h-12 items-center rounded-full bg-orange-700 px-8 text-[15px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(194,65,12,0.55)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              문의하기
            </a>
            <span className="text-sm text-stone-400">
              App Store와 Google Play 출시 준비 중
            </span>
          </div>
          <SoftHeroVisual />
        </header>

        {/* 기능 카드 */}
        <section className="py-4 md:py-8">
          <Reveal>
            <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
              공부가 쌓이는 방식
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <article
                  className={`h-full rounded-3xl border p-8 ${f.tint}`}
                >
                  {f.icon}
                  <h3 className="mt-5 text-lg font-bold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-stone-500">
                    {f.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 스트릭 */}
        <section className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                끊기기 싫어서
                <br />
                또 앉게 되는 기록
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-stone-500 md:text-base">
                공부한 날이 달력에 하나씩 채워집니다. 이어져 온 스트릭이
                오늘도 책상 앞으로 데려다줘요.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto w-fit rounded-3xl border border-stone-200/80 bg-white/80 p-7 shadow-[0_20px_50px_-30px_rgba(68,64,60,0.4)]">
              <p className="text-xs font-medium text-stone-400">
                최근 5주의 기록 (예시)
              </p>
              <div
                className="mt-4 grid grid-cols-7 gap-2"
                aria-hidden="true"
              >
                {streakDots.map((level, i) => (
                  <span
                    key={i}
                    className={`h-6 w-6 rounded-lg ${
                      level === 2
                        ? "bg-orange-600"
                        : level === 1
                          ? "bg-orange-300"
                          : "bg-stone-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* 프라이버시 */}
        <section className="pb-20 md:pb-28">
          <Reveal>
            <div className="rounded-3xl border border-orange-200/70 bg-white/80 p-9 md:p-12">
              <LockKeyIcon
                size={30}
                weight="duotone"
                className="text-orange-700"
              />
              <h2 className="mt-5 max-w-xl text-2xl font-bold leading-snug tracking-tight md:text-3xl">
                카메라 영상은 폰 밖으로 나가지 않아요
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-stone-500 md:text-base">
                집중 상태 분석은 전부 기기 안에서 끝나고, 서버에는 공부
                기록만 남습니다. 회원가입이 없으니 이름이나 이메일을 물어볼
                일도 없어요.
              </p>
              <Link
                href={SITE.privacyPath}
                className="mt-6 inline-block text-[15px] font-semibold text-orange-700 underline decoration-orange-300 underline-offset-4 transition-colors hover:decoration-orange-700"
              >
                개인정보처리방침 보기
              </Link>
            </div>
          </Reveal>
        </section>

        {/* 푸터 */}
        <footer className="flex flex-col gap-4 border-t border-stone-200 py-10 text-sm text-stone-400 md:flex-row md:items-center md:justify-between">
          <span>© 2026 숨벅찬 청년들</span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="transition-colors hover:text-stone-900"
            >
              {SITE.supportEmail}
            </a>
            <Link
              href={SITE.privacyPath}
              className="transition-colors hover:text-stone-900"
            >
              개인정보처리방침
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
