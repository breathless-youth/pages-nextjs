import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { AppHomeScreen } from "@/components/app/AppHomeScreen";
import { KineticWords } from "@/components/kinetic/KineticWords";
import { ScrollBand } from "@/components/kinetic/ScrollBand";
import { PhoneSlot } from "@/components/PhoneSlot";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 (Kinetic)",
  description:
    "딴짓한 시간 빼고 셉니다. 카메라 AI가 순공 시간만 기록하는 공부 타이머 FocusOn.",
};

const rows: [string, string][] = [
  ["상태 감지", "자리 비움과 휴대폰 사용을 기기 안의 비전 AI가 실시간으로 알아차립니다."],
  ["순공 기록", "흐트러진 구간은 자동으로 빠지고 실제 집중한 시간만 남습니다."],
  ["통계와 스트릭", "일간, 주간, 월간 리포트와 연속 기록으로 공부 패턴이 보입니다."],
  ["같이 공부", "같은 목표를 가진 사람들과 나란히 앉아 측정할 수 있습니다."],
];

export default function KineticPage() {
  return (
    <div className="min-h-[100dvh] bg-[#fafaf9] text-zinc-900">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* 네비게이션 */}
        <nav className="flex h-16 items-center justify-between">
          <span className="text-[15px] font-bold tracking-tight">FocusOn</span>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
          >
            문의하기
          </a>
        </nav>

        {/* 히어로 */}
        <header className="pt-20 pb-16 md:pt-24 md:pb-20">
          <h1 className="animate-fade-up max-w-4xl text-[2.7rem] font-black leading-[1.15] tracking-tighter md:text-7xl">
            <KineticWords />
            <br />
            빼고 셉니다.
          </h1>
          <p className="animate-fade-up mt-7 max-w-md text-base leading-relaxed text-zinc-500 [animation-delay:130ms] md:text-lg">
            카메라 AI가 딴짓을 알아채는 순간 순공 타이머는 멈춥니다. 남는
            숫자가 진짜 공부량입니다.
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-5 [animation-delay:260ms]">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-zinc-900 px-7 text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
            >
              문의하기
              <ArrowRightIcon
                size={16}
                weight="bold"
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <span className="text-sm text-zinc-400">
              App Store와 Google Play 출시 준비 중
            </span>
          </div>
        </header>
      </div>

      {/* 스크롤 연동 타이포 밴드 */}
      <ScrollBand text="순공 시간만 남긴다" />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* 기능: 대형 행 리스트 */}
        <section className="border-t-2 border-zinc-900 py-6 md:py-10">
          <ul>
            {rows.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.06}>
                <li className="group grid gap-2 border-b border-zinc-200 py-8 transition-colors hover:bg-lime-300/20 md:grid-cols-[1fr_1.2fr] md:items-baseline md:gap-10 md:px-4">
                  <h2 className="text-2xl font-black tracking-tight md:text-3xl">
                    <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-lime-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    {title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-zinc-500 md:text-base">
                    {body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* 폰 + 프라이버시 스플릿 */}
        <section className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <div className="flex justify-center md:justify-start">
              <PhoneSlot frameClassName="border-zinc-900 border-2 bg-white shadow-[0_28px_70px_-35px_rgba(24,24,27,0.45)]">
                <AppHomeScreen />
              </PhoneSlot>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="text-3xl font-black leading-tight tracking-tighter md:text-4xl">
                영상은
                <br />
                <span className="bg-lime-300 px-2">폰 안에서만.</span>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-zinc-500 md:text-base">
                집중 상태 분석은 전부 기기 안에서 끝납니다. 서버에 올라가는
                것은 집중 기록뿐이고, 영상과 사진은 전송도 저장도 하지
                않습니다.
              </p>
              <Link
                href={SITE.privacyPath}
                className="mt-7 inline-block text-[15px] font-bold underline decoration-lime-500 decoration-2 underline-offset-4"
              >
                개인정보처리방침 보기
              </Link>
            </div>
          </Reveal>
        </section>

        {/* 푸터 */}
        <footer className="flex flex-col gap-4 border-t border-zinc-200 py-10 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <span>© 2026 숨벅찬 청년들</span>
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
