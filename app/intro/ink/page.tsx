import type { Metadata } from "next";
import Link from "next/link";
import { AppResultScreen } from "@/components/app/AppResultScreen";
import { PhoneSlot } from "@/components/PhoneSlot";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 (Ink)",
  description:
    "앉아 있던 시간 말고 공부한 시간. 온디바이스 AI가 순공 시간만 기록하는 공부 타이머 FocusOn.",
};

const steps: [string, string][] = [
  [
    "카메라를 켜고 시작",
    "책상 앞에 폰을 세워 두고 세션을 시작합니다. 회원가입도 로그인도 필요 없습니다.",
  ],
  [
    "AI가 상태를 감지",
    "자리 비움과 휴대폰 사용을 기기 안의 AI가 실시간으로 알아차립니다.",
  ],
  [
    "순공 시간만 남김",
    "흐트러진 구간은 빠지고, 실제로 집중한 시간만 기록으로 남습니다.",
  ],
];

const records: [string, string][] = [
  ["순공 시간", "타이머를 켜 둔 시간이 아니라 실제로 집중한 시간"],
  ["공부 통계", "일간, 주간, 월간으로 쌓이는 나의 공부 패턴"],
  ["스트릭", "하루도 빠짐없이 이어 온 연속 기록"],
];

export default function InkPage() {
  return (
    <div className="min-h-[100dvh] bg-[#fafaf8] text-zinc-900">
      <div className="mx-auto w-full max-w-5xl px-6">
        {/* 네비게이션 */}
        <nav className="flex h-16 items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight">
            FocusOn
          </span>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
          >
            문의하기
          </a>
        </nav>

        {/* 히어로 */}
        <header className="pt-20 pb-24 md:pt-24 md:pb-32">
          <h1 className="animate-fade-up max-w-3xl text-[2.6rem] font-extrabold leading-[1.08] tracking-tighter md:text-7xl">
            앉아 있던 시간 말고,
            <br />
            공부한 시간.
          </h1>
          <p className="animate-fade-up mt-7 max-w-md text-base leading-relaxed text-zinc-500 [animation-delay:120ms] md:text-lg">
            FocusOn은 기기 안의 AI가 집중 상태를 감지해 순공 시간만 기록하는
            공부 타이머입니다.
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-5 [animation-delay:240ms]">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="inline-flex h-12 items-center rounded-full bg-zinc-900 px-7 text-[15px] font-medium text-white transition-transform active:scale-[0.98]"
            >
              문의하기
            </a>
            <span className="text-sm text-zinc-400">
              App Store와 Google Play 출시 준비 중
            </span>
          </div>
        </header>

        {/* 작동 방식 */}
        <section className="border-t border-zinc-200 py-20 md:py-24">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            사용법은 세 문장이면 충분합니다
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map(([title, body], i) => (
              <li key={title}>
                <span className="font-mono text-sm text-zinc-400">
                  {i + 1}.
                </span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 기록되는 것 + 스크린샷 */}
        <section className="grid items-center gap-12 border-t border-zinc-200 py-20 md:grid-cols-[1.2fr_1fr] md:py-24">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              남는 것은 세 가지뿐
            </h2>
            <dl className="mt-10 space-y-8">
              {records.map(([term, desc]) => (
                <div
                  key={term}
                  className="border-l-2 border-zinc-900 pl-5"
                >
                  <dt className="font-semibold">{term}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-zinc-500">
                    {desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex justify-center md:justify-end">
            <PhoneSlot frameClassName="border-zinc-300 bg-white shadow-[0_24px_60px_-30px_rgba(24,24,27,0.25)]">
              <AppResultScreen />
            </PhoneSlot>
          </div>
        </section>

        {/* 프라이버시 선언 */}
        <section className="border-t border-zinc-200 py-20 md:py-24">
          <p className="max-w-3xl text-[1.7rem] font-bold leading-snug tracking-tight md:text-4xl">
            카메라 영상은 기기 밖으로 나가지 않습니다.
          </p>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-500 md:text-base">
            상태 감지는 전부 기기 안에서 끝납니다. 서버에 저장되는 것은
            &ldquo;몇 시부터 몇 분간 집중했다&rdquo;는 기록뿐이며, 영상이나
            사진은 전송도 저장도 하지 않습니다. 계정도 만들지 않으므로 이름,
            이메일, 전화번호를 요구할 일도 없습니다.
          </p>
          <Link
            href={SITE.privacyPath}
            className="mt-8 inline-block text-[15px] font-medium underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900"
          >
            개인정보처리방침 전문 보기
          </Link>
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
