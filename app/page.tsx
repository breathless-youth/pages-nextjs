import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

// 디자인 확정 전 임시 허브. 확정된 소개페이지를 이 경로(/)로 승격한 뒤 제거한다.
export const metadata: Metadata = {
  title: "디자인 시안 선택",
  robots: { index: false, follow: false },
};

const designs: {
  href: string;
  name: string;
  desc: string;
  swatches: string[];
}[] = [
  {
    href: "/intro/ink",
    name: "A. Ink",
    desc: "모노크롬 에디토리얼. 큰 타이포와 여백, 최소한의 움직임.",
    swatches: ["bg-[#fafaf8] border", "bg-zinc-900", "bg-zinc-400"],
  },
  {
    href: "/intro/focus",
    name: "B. Focus",
    desc: "다크 테크. 폰 속 순공 타이머가 실시간으로 흐르는 라이브 데모.",
    swatches: ["bg-zinc-950", "bg-emerald-400", "bg-zinc-600"],
  },
  {
    href: "/intro/bold",
    name: "C. Bold",
    desc: "브루탈리스트. 노출 그리드와 두꺼운 보더, 마퀴, 코발트 블루.",
    swatches: ["bg-[#f4f4f1] border", "bg-blue-700", "bg-zinc-900"],
  },
  {
    href: "/intro/soft",
    name: "D. Soft",
    desc: "소프트 컨슈머. 웜 그라디언트와 플로팅 카드 스프링 모션.",
    swatches: ["bg-orange-100", "bg-orange-700", "bg-stone-300"],
  },
  {
    href: "/intro/midnight",
    name: "E. Midnight",
    desc: "새벽 공부 무드. 별이 반짝이는 딥 네이비와 떠 있는 결과 화면.",
    swatches: ["bg-[#0a1128]", "bg-sky-300", "bg-indigo-400"],
  },
  {
    href: "/intro/kinetic",
    name: "F. Kinetic",
    desc: "움직이는 타이포. 회전 단어와 스크롤에 밀려가는 대형 텍스트.",
    swatches: ["bg-[#fafaf9] border", "bg-lime-400", "bg-zinc-900"],
  },
  {
    href: "/intro/bento",
    name: "G. Bento",
    desc: "벤토 그리드. 카운트업, 자라는 차트, 라이브 타이머 타일.",
    swatches: ["bg-[#f5f5f4] border", "bg-blue-600", "bg-white border"],
  },
  {
    href: "/intro/aurora",
    name: "H. Aurora",
    desc: "오로라 글래스. 흐르는 빛과 마우스를 따라 기우는 3D 폰.",
    swatches: ["bg-[#080f16]", "bg-teal-300", "bg-cyan-500"],
  },
  {
    href: "/intro/chrono",
    name: "I. Chrono",
    desc: "기록 경기. 채워지는 스톱워치 링과 랩 타임 감점 리스트.",
    swatches: ["bg-[#faf9f7] border", "bg-red-600", "bg-zinc-900"],
  },
  {
    href: "/intro/zen",
    name: "J. Zen",
    desc: "고요한 몰입. 숨 쉬는 동심원과 느리게 흐르는 딥 그린.",
    swatches: ["bg-[#f3f6f1] border", "bg-emerald-900", "bg-emerald-600"],
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 md:py-24">
      <header className="space-y-3">
        <p className="text-sm font-medium text-zinc-500">
          {SITE.appName} 웹사이트 준비 페이지
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          소개페이지 시안 10종
        </h1>
        <p className="max-w-lg text-[15px] leading-relaxed text-zinc-500">
          전부 둘러보고 마음에 드는 시안을 고르면 해당 디자인을 메인
          경로(/)로 올립니다. 앱 화면은 디자인 초안을 코드로 재구성한
          것입니다.
        </p>
      </header>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {designs.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="group block h-full rounded-2xl border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            >
              <div className="flex items-center gap-1.5">
                {d.swatches.map((s, i) => (
                  <span
                    key={i}
                    className={`h-4 w-4 rounded-full border-zinc-300 dark:border-zinc-700 ${s}`}
                  />
                ))}
              </div>
              <h2 className="mt-4 font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
                {d.name}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                {d.desc}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-12 rounded-2xl border border-zinc-200 p-6 text-sm leading-relaxed text-zinc-500 dark:border-zinc-800">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
          심사 제출용 페이지
        </h2>
        <ul className="mt-3 space-y-1.5">
          <li>
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              /privacy
            </Link>
            {" "}개인정보처리방침
          </li>
          <li>
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              /terms
            </Link>
            {" "}이용약관 (앱 설정 화면에서 링크)
          </li>
          <li>
            <a
              href="/app-ads.txt"
              className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              /app-ads.txt
            </a>
            {" "}AdMob 게시자 ID 교체 필요
          </li>
        </ul>
      </section>
    </main>
  );
}
