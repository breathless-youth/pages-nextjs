import type { Metadata } from "next";
import Link from "next/link";
import { DailyReplayDemo } from "@/components/main/DailyReplayDemo";
import { SignupForm } from "@/components/main/SignupForm";
import { APP_DESCRIPTION } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "카메라가 자리 이탈·휴대폰 사용·기기 조작을 기기 안에서만 측정해, 앉아있던 시간이 아니라 실제로 집중한 순공시간만 기록하는 공부 타이머 FocusON. 사전예약하면 테스터로 참여할 수 있어요.",
};

const TRUST_BADGES = ["얼굴 인식 없음", "기기 안에서만 처리", "결제 정보 없음"];

const HERO_BAR: { w: number; color: string }[] = [
  { w: 18, color: "#4593FC" },
  { w: 7, color: "#FF9E1B" },
  { w: 21, color: "#4593FC" },
  { w: 9, color: "#FF9E1B" },
  { w: 17, color: "#4593FC" },
  { w: 5, color: "#8B95A1" },
  { w: 5, color: "#FF9E1B" },
  { w: 18, color: "#4593FC" },
];

const STAT_CARDS = [
  {
    value: "31%",
    title: "기록과 실제의 차이",
    body: "사내 테스트 42명 기준, 스톱워치 기록 대비 실제 집중 시간의 평균 격차",
  },
  {
    value: "14회",
    title: "3시간당 이탈 횟수",
    body: "본인이 인지한 횟수는 평균 4회. 나머지 10회는 기억에 남지 않습니다",
  },
  {
    value: "0개",
    title: "기존 앱이 알려주는 이유",
    body: "얼마나 했는지는 알려주지만, 왜 흐트러졌는지는 아무도 말해주지 않았어요",
  },
];

const FEATURES: { icon: React.ReactNode; tint: string; title: string; body: string }[] = [
  {
    tint: "#E8F3FF",
    title: "실시간 집중 감지",
    body: "얼굴은 측정하지 않습니다. 자세와 움직임만으로 집중이 끊긴 순간을 잡아냅니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="#1B64DA" strokeWidth="2" />
        <circle cx="12" cy="12" r="2.6" fill="#1B64DA" />
      </svg>
    ),
  },
  {
    tint: "#FFF4E5",
    title: "5개 상태로 구분",
    body: "집중, 비집중 3종(자리 이탈·휴대폰 사용·기기 조작), 그리고 직접 누른 일시정지까지 나눠서 기록합니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 18h4V9H4v9ZM10 18h4V4h-4v14ZM16 18h4v-6h-4v6Z"
          fill="#B36100"
        />
      </svg>
    ),
  },
  {
    tint: "#E8F3FF",
    title: "순공 · 총공부 병기",
    body: '두 숫자를 나란히 보여주니 "얼마나 앉아있었나"와 "얼마나 했나"를 헷갈리지 않습니다.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="#1B64DA" strokeWidth="2" />
        <path
          d="M12 7.5V12l3.2 2"
          stroke="#1B64DA"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    tint: "#0B0F14",
    title: "심플 모드",
    body: "탭 한 번으로 숫자만 남는 화면. 화면 테두리 발광으로 상태를 알려주니 시야를 안 뺏겨요.",
    icon: (
      <span
        className="h-4 w-4 rounded-[5px] bg-[#0B0F14]"
        style={{ boxShadow: "0 0 0 2px rgba(69,147,252,.6)" }}
        aria-hidden="true"
      />
    ),
  },
  {
    tint: "#FFF4E5",
    title: "연속 공부 스트릭",
    body: "하루 10분이면 유지됩니다. 월 달력과 주간 도트로 흐름이 보여요.",
    icon: (
      <svg width="18" height="21" viewBox="0 0 34 40" aria-hidden="true">
        <path
          d="M17 1.5c.8 5.2-1.4 8.2-4.6 11.4C9 16.3 5.4 19.6 5.4 25.2 5.4 32.9 10.5 38.5 17 38.5s11.6-5.6 11.6-13.3c0-4.5-2-8.1-4.5-11.2-.9 1.6-1.9 2.7-3.3 3.6.3-6.5-1.5-12.4-3.8-16.1Z"
          fill="#FF9E1B"
        />
        <path
          d="M17 38.5c-4 0-7-3-7-7 0-3.2 1.8-5.2 3.7-7.1 1.4-1.4 2.7-2.8 3.3-4.9 2.6 2.4 7 6.4 7 12 0 4-3 7-7 7Z"
          fill="#FFD262"
        />
      </svg>
    ),
  },
  {
    tint: "#E8F3FF",
    title: "얼굴 없이, 기기 안에서만",
    body: "얼굴을 인식하거나 저장하지 않습니다. 분석은 기기 안에서만 이뤄지고 남는 건 시간 기록뿐이에요.",
    icon: (
      <svg width="18" height="20" viewBox="0 0 20 22" aria-hidden="true">
        <path
          d="M10 1.5 18 4.5v7c0 5-3.4 8.2-8 9.5-4.6-1.3-8-4.5-8-9.5v-7Z"
          fill="none"
          stroke="#1B64DA"
          strokeWidth="1.9"
        />
        <path
          d="M6.5 11 9.2 13.6 14 8.4"
          fill="none"
          stroke="#1B64DA"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const STUDY_ROOM = [
  { name: "수민", color: "#3182F6", time: "4시간 12분" },
  { name: "지호", color: "#FF9E1B", time: "3시간 48분" },
  { name: "나", color: "#32D583", time: "3시간 42분" },
];

const REPORT_POINTS = [
  "구간별 집중 타임라인",
  "집중 · 비집중 3종 · 일시정지 5개 상태로 구분",
  "일·주·월 누적 기록과 스트릭",
];

const REPORT_BAR: { w: number; color: string }[] = [
  { w: 20, color: "#1B64DA" },
  { w: 4, color: "#FF8A00" },
  { w: 18, color: "#1B64DA" },
  { w: 3, color: "#FF8A00" },
  { w: 14, color: "#1B64DA" },
  { w: 6, color: "#FF8A00" },
  { w: 12, color: "#1B64DA" },
  { w: 3, color: "#8B95A1" },
  { w: 16, color: "#1B64DA" },
  { w: 4, color: "#FF8A00" },
];

const REPORT_BREAKDOWN = [
  { label: "자리 이탈", value: "2회 · 9분 40초", color: "#FF8A00" },
  { label: "휴대폰 사용", value: "2회 · 6분 12초", color: "#FF8A00" },
  { label: "기기 조작", value: "1회 · 2분 8초", color: "#FF8A00" },
  { label: "수동 일시정지", value: "1회 · 3분", color: "#8B95A1" },
];

const COMPARISON = [
  {
    k: "측정 방식",
    a: "카메라 자동 감지 + 수동 시작/정지",
    b: "수동 시작/정지",
    c: "수동 시작/정지",
  },
  { k: "딴짓 시간 제외", a: "자동 제외", b: "안 됨", c: "본인 판단" },
  {
    k: "상태 구분",
    a: "집중 + 비집중 3종 + 일시정지",
    b: "없음",
    c: "없음",
  },
  {
    k: "순공 · 총공부 구분",
    a: "함께 표시",
    b: "한 가지만",
    c: "한 가지만",
  },
  {
    k: "얼굴 인식 · 영상 저장",
    a: "둘 다 없음",
    b: "해당 없음",
    c: "실시간 송출",
  },
  { k: "혼자서도 가능", a: "가능", b: "가능", c: "상대 필요" },
];

const PRICING_CHECKLIST = [
  "무제한 세션 측정",
  "비집중 원인 리포트 전체",
  "심플 모드 · 스트릭",
  "기록 무제한 보관",
  "업데이트 우선 반영",
  "소셜 스터디 먼저 열림",
];

const PRICING_INFO = [
  {
    title: "결제 정보 없음",
    body: "카드도, 계좌도 등록하지 않습니다. 이메일 하나면 끝이에요.",
  },
  {
    title: "기능 잠금 없음",
    body: "무료라서 빠지는 기능은 없습니다. 만들어둔 전부를 씁니다.",
  },
  {
    title: "유료화하면 미리 알려요",
    body: "언젠가 유료 플랜이 생기면 최소 한 달 전에 안내하고, 자동 청구는 하지 않습니다.",
  },
];

const FAQS = [
  {
    q: "얼굴을 인식하나요?",
    a: "아니요. FocusON은 얼굴을 인식하거나 측정하지 않습니다. 자세와 움직임, 기기·화면 상태만으로 판단해요. 얼굴 데이터가 만들어지지 않으니 유출될 것도 없습니다.",
  },
  {
    q: "카메라 영상이 서버로 올라가나요?",
    a: "아니요. 분석은 기기 안에서만 이뤄지고 영상은 저장되거나 전송되지 않습니다. 남는 것은 집중·비집중 시간 기록뿐이에요.",
  },
  {
    q: "쉬는 시간은 어떻게 처리하나요?",
    a: "일시정지를 직접 누르면 순공시간과 총 공부 시간이 모두 멈추고 회색으로 표시됩니다. 자동 감지된 비집중(오렌지)은 순공시간만 멈추고 총 공부 시간은 계속 흘러가요.",
  },
  {
    q: "배터리는 많이 쓰나요?",
    a: "저해상도 프레임만 간격을 두고 분석합니다. 3시간 세션 기준 약 12~18% 정도이며, 충전 중 사용을 권장해요.",
  },
  {
    q: "요금이 청구되나요?",
    a: "아니요. 지금은 모든 기능이 무료이고 결제 정보도 받지 않습니다. 언젠가 유료 플랜이 생기면 최소 한 달 전에 안내드리고, 자동 청구는 하지 않아요.",
  },
  {
    q: "테스터는 어떻게 선발되나요?",
    a: "사전예약 순서와 시험 유형 분포를 함께 고려해 200명을 선발합니다. 선발 여부는 이메일로 개별 안내드려요.",
  },
];

function CheckIcon({
  color,
  size = 15,
  strokeWidth = 2.6,
}: {
  color: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12.5 10 17.5 19 7.5"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dot({ color }: { color: string }) {
  return <span className="h-[7px] w-[7px] rounded-full" style={{ background: color }} />;
}

function ArrowIcon() {
  return (
    <svg width="34" height="16" viewBox="0 0 34 16" aria-hidden="true">
      <path
        d="M1 8h28M24 2l6 6-6 6"
        stroke="#8B95A1"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowSmallIcon() {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
      <path
        d="M1 5h14M12 1l4 4-4 4"
        stroke="#8B95A1"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 2.5v11l9-5.5Z" fill="#fff" />
    </svg>
  );
}

function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      name: SITE.appName,
      operatingSystem: "iOS, Android",
      applicationCategory: "EducationalApplication",
      description: APP_DESCRIPTION,
      url: SITE.siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function Home() {
  return (
    <div className="w-full bg-white text-[#191F28]">
      <JsonLd />

      {/* 헤더 */}
      <header className="sticky top-0 z-40 border-b border-[#E5E8EB] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-6 md:px-11">
          <div className="flex items-center gap-[9px]">
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[8px] bg-[#1B64DA]">
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="8" fill="none" stroke="#fff" strokeWidth="2.4" />
                <circle cx="12" cy="12" r="2.6" fill="#fff" />
              </svg>
            </span>
            <span className="text-[16.5px] font-bold tracking-[-0.3px] text-[#191F28]">
              FocusON
            </span>
          </div>
          <nav className="hidden items-center gap-[30px] md:flex">
            <a
              href="#demo"
              className="text-sm font-medium text-[#6B7684] transition-colors hover:text-[#191F28]"
            >
              하루 재생
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-[#6B7684] transition-colors hover:text-[#191F28]"
            >
              기능
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-[#6B7684] transition-colors hover:text-[#191F28]"
            >
              가격
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-[#6B7684] transition-colors hover:text-[#191F28]"
            >
              FAQ
            </a>
          </nav>
          <a
            href="#cta"
            className="flex h-[38px] items-center rounded-[11px] bg-[#1B64DA] px-[18px] text-sm font-bold text-white transition-colors hover:bg-[#1957C2]"
          >
            사전예약
          </a>
        </div>
      </header>

      {/* 히어로 */}
      <section className="bg-[#F9FAFB] px-6 pt-16 pb-16 md:px-11 md:pt-[88px] md:pb-24">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center">
          <span className="flex h-8 items-center gap-2 rounded-full bg-[#E8F3FF] px-[13px] text-[13px] font-semibold text-[#1B64DA]">
            테스터 200명 모집 중 · 전 기능 무료
          </span>
          <h1 className="mt-[26px] text-center text-[36px] leading-[1.16] font-bold tracking-[-1.4px] text-[#191F28] sm:text-[48px] sm:tracking-[-2px] md:text-[62px] md:tracking-[-2.6px]">
            열심히 했는데,
            <br />왜 성적은 그대로일까
          </h1>
          <p className="mt-[22px] max-w-[600px] text-center text-[17px] leading-[1.65] text-[#6B7684] md:text-[19px]">
            문제는 시간이 아니라{" "}
            <span className="font-bold text-[#191F28]">
              앉아있던 시간과 집중한 시간의 차이
            </span>
            였습니다. FocusON은 카메라로 그 차이를 정확히 재줍니다.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-2.5">
            <a
              href="#cta"
              className="flex h-[58px] items-center rounded-[15px] bg-[#1B64DA] px-7 text-[17px] font-bold text-white shadow-[0_10px_30px_rgba(27,100,218,.28)] transition-colors hover:bg-[#1957C2]"
            >
              사전예약하고 테스터 되기
            </a>
            <a
              href="#demo"
              className="flex h-[58px] items-center rounded-[15px] border border-[#D1D6DB] bg-white px-[26px] text-[17px] font-semibold text-[#191F28] transition-colors hover:bg-[#F2F4F6]"
            >
              내 하루 재생해보기
            </a>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-5">
            {TRUST_BADGES.map((t) => (
              <span
                key={t}
                className="flex items-center gap-[7px] text-[13.5px] text-[#8B95A1]"
              >
                <CheckIcon color="#12B76A" />
                {t}
              </span>
            ))}
          </div>

          <div className="mt-[52px] flex w-full flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-center sm:gap-[26px]">
            <div className="w-full max-w-[240px] animate-float-y rounded-[20px] border border-[#E5E8EB] bg-white p-6">
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-[#8B95A1]">
                  스톱워치가 말하는 오늘
                </span>
                <span className="text-[30px] font-bold tracking-[-1.2px] text-[#191F28]">
                  6시간 00분
                </span>
                <span className="text-[13px] leading-relaxed text-[#8B95A1]">
                  누른 시간 그대로
                </span>
              </div>
            </div>
            <div className="flex w-[70px] flex-none flex-row items-center gap-1.5 sm:flex-col sm:pb-[34px]">
              <span className="rotate-90 sm:rotate-0">
                <ArrowIcon />
              </span>
              <span className="text-[11.5px] font-semibold text-[#8B95A1]">
                FocusON
              </span>
            </div>
            <div className="w-full max-w-[300px] rounded-[22px] bg-[#191F28] p-7 shadow-[0_24px_56px_rgba(0,0,0,.24)]">
              <div className="flex flex-col gap-2.5">
                <span className="text-[13px] font-semibold text-[#8B95A1]">
                  실제로 집중한 시간
                </span>
                <span className="text-[38px] font-bold tracking-[-1.6px] text-white">
                  3시간 47분
                </span>
                <div className="mt-1.5 flex h-3 overflow-hidden rounded-full bg-white/10">
                  {HERO_BAR.map((seg, i) => (
                    <span
                      key={i}
                      style={{ width: `${seg.w}%`, background: seg.color }}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-[5px] text-[11.5px] text-[#8B95A1]">
                    <Dot color="#4593FC" />
                    집중
                  </span>
                  <span className="flex items-center gap-[5px] text-[11.5px] text-[#8B95A1]">
                    <Dot color="#FF9E1B" />
                    비집중
                  </span>
                  <span className="flex items-center gap-[5px] text-[11.5px] text-[#8B95A1]">
                    <Dot color="#8B95A1" />
                    일시정지
                  </span>
                </div>
                <span className="text-[13px] leading-relaxed text-[#B0B8C1]">
                  자리 이탈 1시간 12분 · 휴대폰 47분 · 일시정지 14분
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 왜 순공시간이 안 맞을까 */}
      <section className="bg-white px-6 pt-16 md:px-11 md:pt-24">
        <div className="mx-auto max-w-[1050px]">
          <div className="flex flex-col items-center gap-3.5 text-center">
            <span className="text-sm font-bold tracking-[0.4px] text-[#1B64DA]">
              왜 순공시간이 안 맞을까
            </span>
            <h2 className="text-[26px] leading-[1.28] font-bold tracking-[-1px] text-[#191F28] md:text-[40px] md:tracking-[-1.4px]">
              스톱워치는 내가 딴짓하는 걸 모릅니다
            </h2>
            <p className="max-w-[640px] text-[15.5px] leading-[1.7] text-[#6B7684] md:text-[17.5px]">
              화장실 다녀온 8분, 알림 확인한 3분, 멍하니 있던 12분. 손으로
              누르는 타이머는 전부 공부 시간으로 셉니다.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3 md:mt-12">
            {STAT_CARDS.map((s) => (
              <div
                key={s.title}
                className="flex flex-col gap-2.5 rounded-[20px] border border-[#E5E8EB] bg-[#F9FAFB] p-[26px]"
              >
                <span className="text-[32px] leading-none font-bold tracking-[-1px] text-[#FF8A00]">
                  {s.value}
                </span>
                <span className="text-[15.5px] font-bold text-[#191F28]">
                  {s.title}
                </span>
                <span className="text-sm leading-[1.6] text-[#6B7684]">
                  {s.body}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 작동 방식 */}
      <section className="mt-[100px] border-t border-[#E5E8EB] bg-[#F9FAFB] px-6 py-16 md:mt-[150px] md:px-11 md:py-[130px]">
        <div className="mx-auto max-w-[1050px]">
          <div className="flex flex-col items-center gap-3.5 text-center">
            <span className="text-sm font-bold tracking-[0.4px] text-[#1B64DA]">
              작동 방식
            </span>
            <h2 className="text-[26px] leading-[1.3] font-bold tracking-[-1px] text-[#191F28] md:text-[38px] md:tracking-[-1.3px]">
              시작만 누르면 나머지는 자동
            </h2>
          </div>

          <div className="mt-10 flex flex-col md:mt-[50px]">
            <div className="flex flex-col items-center gap-7 border-b border-[#E5E8EB] py-8 md:flex-row md:gap-9">
              <div className="flex flex-1 flex-col gap-2.5 md:min-w-[320px]">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#1B64DA] text-[13px] font-bold text-white">
                    1
                  </span>
                  <span className="text-[20px] font-bold text-[#191F28] md:text-[22px]">
                    폰을 세우고 집중 시작
                  </span>
                </span>
                <span className="text-[15.5px] leading-[1.7] text-[#6B7684]">
                  거치대에 올려두고 버튼 한 번. 과목 입력이나 목표 설정 같은
                  준비 과정이 없습니다.
                </span>
              </div>
              <div className="flex h-[150px] w-full flex-none items-center justify-center rounded-[18px] bg-[#E8F3FF] md:w-[300px]">
                <div className="flex items-center gap-4 rounded-2xl bg-[#1B64DA] px-[22px] py-[18px] shadow-[0_10px_26px_rgba(27,100,218,.3)]">
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[17px] font-bold text-white">
                      집중 시작
                    </span>
                    <span className="text-[11.5px] text-white/80">
                      누르면 바로 측정돼요
                    </span>
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[.22]">
                    <PlayIcon />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-7 border-b border-[#E5E8EB] py-8 md:flex-row md:gap-9">
              <div className="flex flex-1 flex-col gap-2.5 md:min-w-[320px]">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#1B64DA] text-[13px] font-bold text-white">
                    2
                  </span>
                  <span className="text-[20px] font-bold text-[#191F28] md:text-[22px]">
                    흐트러지면 순공시간이 멈춥니다
                  </span>
                </span>
                <span className="text-[15.5px] leading-[1.7] text-[#6B7684]">
                  자리를 비우거나 휴대폰을 들면 오렌지로 바뀌고 순공시간만
                  정지합니다. 직접 누른 일시정지는 회색으로, 순공과 총 공부
                  시간이 모두 멈춰요.
                </span>
              </div>
              <div className="flex w-full flex-none flex-col items-center justify-center gap-2.5 rounded-[18px] border border-[#E5E8EB] bg-white p-5 md:h-[150px] md:w-[300px]">
                <span className="flex h-8 items-center gap-2 rounded-full bg-[#E8F3FF] px-[15px] text-[13.5px] font-semibold text-[#1B64DA]">
                  <Dot color="#1B64DA" />
                  집중 중 · 순공 진행
                </span>
                <span className="flex h-8 items-center gap-2 rounded-full bg-[#FFF4E5] px-[15px] text-[13.5px] font-semibold text-[#B36100]">
                  <Dot color="#FF8A00" />
                  휴대폰 사용 · 순공 정지
                </span>
                <span className="flex h-8 items-center gap-2 rounded-full bg-[#F2F4F6] px-[15px] text-[13.5px] font-semibold text-[#6B7684]">
                  <Dot color="#8B95A1" />
                  일시정지 · 전체 정지
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-7 py-8 md:flex-row md:gap-9">
              <div className="flex flex-1 flex-col gap-2.5 md:min-w-[320px]">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#1B64DA] text-[13px] font-bold text-white">
                    3
                  </span>
                  <span className="text-[20px] font-bold text-[#191F28] md:text-[22px]">
                    끝나면 원인까지 정리해 드려요
                  </span>
                </span>
                <span className="text-[15.5px] leading-[1.7] text-[#6B7684]">
                  타임라인과 비집중 유형별 횟수·시간이 남습니다. 매일 쌓이면
                  내가 무너지는 시간대까지 보이기 시작해요.
                </span>
              </div>
              <div className="flex w-full flex-none items-center justify-center rounded-[18px] bg-[#F2F4F6] p-5 md:h-[150px] md:w-[300px]">
                <div className="flex w-full flex-col gap-2 rounded-[14px] bg-white p-4 shadow-[0_8px_22px_rgba(0,0,0,.07)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#191F28]">
                      자리 이탈
                    </span>
                    <span className="text-[12.5px] text-[#6B7684]">
                      2회 · 9분 40초
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#191F28]">
                      휴대폰 사용
                    </span>
                    <span className="text-[12.5px] text-[#6B7684]">
                      2회 · 6분 12초
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#191F28]">
                      수동 일시정지
                    </span>
                    <span className="text-[12.5px] text-[#6B7684]">
                      1회 · 3분
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DailyReplayDemo />

      {/* 기능 */}
      <section id="features" className="bg-white px-6 py-16 md:px-11 md:py-24">
        <div className="mx-auto max-w-[1050px]">
          <div className="flex flex-col items-center gap-3.5 text-center">
            <span className="text-sm font-bold tracking-[0.4px] text-[#1B64DA]">
              기능
            </span>
            <h2 className="text-[26px] leading-[1.28] font-bold tracking-[-1px] text-[#191F28] md:text-[40px] md:tracking-[-1.4px]">
              측정만 하지 않습니다
            </h2>
          </div>
          <div className="mt-10 grid gap-3.5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-2.5 rounded-[18px] border border-[#E5E8EB] p-[26px] transition-colors hover:border-[#1B64DA]"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: f.tint }}
                >
                  {f.icon}
                </span>
                <span className="text-[17px] font-bold text-[#191F28]">
                  {f.title}
                </span>
                <span className="text-[14.5px] leading-[1.65] text-[#6B7684]">
                  {f.body}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-start gap-7 rounded-[22px] bg-[#0B0F14] p-8 md:flex-row md:items-center md:justify-between md:p-[34px]">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-2.5">
              <span className="flex h-[26px] items-center rounded-full border border-[rgba(69,147,252,.45)] bg-[rgba(69,147,252,.16)] px-[11px] text-xs font-bold text-[#4593FC]">
                출시 예정
              </span>
              <span className="text-2xl font-bold tracking-[-0.8px] text-[#F9FAFB]">
                소셜 스터디
              </span>
              <span className="text-[15.5px] leading-[1.7] text-[#B0B8C1]">
                친구·스터디원과 순공시간을 함께 쌓고 서로의 집중을 확인하는
                모드를 준비하고 있어요. 초기 테스터에게 가장 먼저
                열어드립니다.
              </span>
            </div>
            <div className="flex w-full flex-col gap-3.5 rounded-2xl border border-white/[.12] bg-white/[.06] p-5 md:w-[300px] md:flex-none">
              <span className="text-[12.5px] font-semibold text-[#8B95A1]">
                오늘의 스터디룸
              </span>
              {STUDY_ROOM.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 text-sm text-[#F9FAFB]">
                    <span
                      className="h-[26px] w-[26px] rounded-full"
                      style={{ background: p.color }}
                    />
                    {p.name}
                  </span>
                  <span className="text-[13px] text-[#4593FC] tabular-nums">
                    {p.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 공부 결과 리포트 */}
      <section className="bg-white px-6 py-16 md:px-11 md:py-24">
        <div className="mx-auto flex max-w-[1050px] flex-col items-center gap-9 rounded-[24px] border border-[#E5E8EB] bg-[#F9FAFB] p-7 md:flex-row md:p-11">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <span className="text-sm font-bold tracking-[0.4px] text-[#1B64DA]">
              공부 결과 리포트
            </span>
            <h2 className="text-[26px] leading-[1.32] font-bold tracking-[-1.1px] text-[#191F28] md:text-[32px]">
              왜 흐트러졌는지까지 남깁니다
            </h2>
            <p className="text-[15px] leading-[1.7] text-[#6B7684] md:text-base">
              세션이 끝나면 집중·비집중 구간이 타임라인으로, 원인은 유형별
              횟수와 시간으로 정리됩니다. 다음 세션에서 무엇을 고칠지가
              명확해져요.
            </p>
            <div className="flex flex-col gap-2.5">
              {REPORT_POINTS.map((p) => (
                <span
                  key={p}
                  className="flex items-center gap-2.5 text-[15px] text-[#191F28]"
                >
                  <CheckIcon color="#1B64DA" size={16} strokeWidth={2.8} />
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full flex-none rounded-[22px] bg-white p-[26px] shadow-[0_16px_44px_rgba(0,0,0,.1)] md:w-[340px]">
            <span className="text-[13.5px] font-medium text-[#6B7684]">
              순공시간
            </span>
            <div className="mt-1 flex items-baseline gap-2.5">
              <span className="text-[32px] leading-[1.2] font-bold tracking-[-1px] text-[#191F28]">
                1시간 24분
              </span>
              <span className="rounded-full bg-[#E8F3FF] px-[9px] py-[3px] text-xs font-semibold text-[#1B64DA]">
                80% 집중
              </span>
            </div>
            <span className="text-[12.5px] text-[#8B95A1]">
              총 공부 1시간 45분 · 21:03 – 22:48
            </span>
            <div className="mt-5 flex h-3.5 overflow-hidden rounded-full">
              {REPORT_BAR.map((seg, i) => (
                <span
                  key={i}
                  style={{ width: `${seg.w}%`, background: seg.color }}
                />
              ))}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-3">
              <span className="flex items-center gap-[5px] text-[11.5px] text-[#6B7684]">
                <Dot color="#1B64DA" />
                집중
              </span>
              <span className="flex items-center gap-[5px] text-[11.5px] text-[#6B7684]">
                <Dot color="#FF8A00" />
                비집중
              </span>
              <span className="flex items-center gap-[5px] text-[11.5px] text-[#6B7684]">
                <Dot color="#8B95A1" />
                일시정지
              </span>
            </div>
            <div className="mt-[18px] rounded-[14px] bg-[#F9FAFB] px-3.5">
              <div className="pt-3 pb-2 text-[12.5px] font-bold text-[#191F28]">
                비집중 18분 · 일시정지 3분
              </div>
              {REPORT_BREAKDOWN.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between border-t border-[#E5E8EB] py-2.5"
                >
                  <span className="flex items-center gap-2 text-[13.5px] text-[#191F28]">
                    <Dot color={r.color} />
                    {r.label}
                  </span>
                  <span className="text-[12.5px] text-[#6B7684]">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 먼저 써본 사람들 */}
      <section className="bg-white px-6 pt-[100px] md:px-11 md:pt-[150px]">
        <div className="mx-auto max-w-[1050px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-sm font-bold tracking-[0.4px] text-[#1B64DA]">
              먼저 써본 사람들
            </span>
            <h2 className="text-2xl leading-[1.3] font-bold tracking-[-1.2px] text-[#191F28] md:text-[36px]">
              클로즈 베타 테스터 42명의 반응
            </h2>
          </div>
          <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-3.5 rounded-[20px] bg-[#F9FAFB] p-8">
              <span className="text-[15.5px] leading-[1.7] text-[#191F28]">
                &quot;6시간 했다고 생각했는데 순공 3시간 50분. 충격이었지만
                이제 이 숫자만 봅니다.&quot;
              </span>
              <div className="mt-auto flex items-center gap-2.5">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#E8F3FF] text-[13px] font-bold text-[#1B64DA]">
                  김
                </span>
                <span className="flex flex-col">
                  <span className="text-[13.5px] font-semibold text-[#191F28]">
                    김OO
                  </span>
                  <span className="text-[12.5px] text-[#8B95A1]">
                    공무원 9급 2년차
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 rounded-[20px] bg-[#F9FAFB] p-8">
              <span className="text-[15.5px] leading-[1.7] text-[#191F28]">
                &quot;휴대폰 사용이 하루 47분이라는 걸 보고 폰을 서랍에 넣기
                시작했어요. 원인을 알려주니까 바뀌더라고요.&quot;
              </span>
              <div className="mt-auto flex items-center gap-2.5">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#FFF4E5] text-[13px] font-bold text-[#B36100]">
                  박
                </span>
                <span className="flex flex-col">
                  <span className="text-[13.5px] font-semibold text-[#191F28]">
                    박OO
                  </span>
                  <span className="text-[12.5px] text-[#8B95A1]">
                    회계사 1차 준비
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[18px] rounded-[20px] bg-[#191F28] p-8 sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col gap-1">
                <span className="text-[42px] leading-none font-bold tracking-[-1.8px] text-white">
                  42명
                </span>
                <span className="text-[13.5px] text-[#8B95A1]">
                  클로즈 베타에 참여한 수험생
                </span>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <span className="text-[13.5px] text-[#B0B8C1]">
                  4주간 평균 순공 비율
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-xl font-bold tracking-[-0.6px] text-[#8B95A1]">
                    63%
                  </span>
                  <ArrowSmallIcon />
                  <span className="text-[26px] font-bold tracking-[-0.9px] text-[#4593FC]">
                    79%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 비교 */}
      <section className="mt-[100px] border-t border-[#E5E8EB] bg-[#F9FAFB] px-6 py-16 md:mt-[150px] md:px-11 md:py-[130px]">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-sm font-bold tracking-[0.4px] text-[#1B64DA]">
              비교
            </span>
            <h2 className="text-2xl leading-[1.3] font-bold tracking-[-1.2px] text-[#191F28] md:text-[36px]">
              지금 쓰는 방법과 무엇이 다른가요
            </h2>
          </div>
          <div className="mt-10 overflow-x-auto rounded-[20px] border border-[#E5E8EB] bg-white">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-[#E5E8EB] bg-[#F2F4F6]">
                <span className="px-4 py-4 text-[13.5px] font-semibold text-[#6B7684] md:px-[22px]">
                  항목
                </span>
                <span className="bg-[#E8F3FF] px-3.5 py-4 text-center text-[14.5px] font-bold text-[#1B64DA]">
                  FocusON
                </span>
                <span className="px-3.5 py-4 text-center text-[13.5px] font-semibold text-[#6B7684]">
                  스톱워치 앱
                </span>
                <span className="px-3.5 py-4 text-center text-[13.5px] font-semibold text-[#6B7684]">
                  캠스터디
                </span>
              </div>
              {COMPARISON.map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-[#F2F4F6] last:border-b-0"
                >
                  <span className="px-4 py-[17px] text-[14.5px] font-semibold text-[#191F28] md:px-[22px]">
                    {row.k}
                  </span>
                  <span className="bg-[#F3F8FE] px-3.5 py-[17px] text-center text-sm font-semibold text-[#1B64DA]">
                    {row.a}
                  </span>
                  <span className="px-3.5 py-[17px] text-center text-sm text-[#8B95A1]">
                    {row.b}
                  </span>
                  <span className="px-3.5 py-[17px] text-center text-sm text-[#8B95A1]">
                    {row.c}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 가격 */}
      <section id="pricing" className="bg-white px-6 py-16 md:px-11 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-sm font-bold tracking-[0.4px] text-[#1B64DA]">
              가격
            </span>
            <h2 className="text-2xl leading-[1.3] font-bold tracking-[-1.2px] text-[#191F28] md:text-[36px]">
              지금은 전부 무료입니다
            </h2>
            <p className="max-w-[620px] text-base leading-[1.7] text-[#6B7684]">
              결제 정보도 받지 않습니다. 아직 다듬는 중이라 저희에게 필요한
              건 돈이 아니라 &quot;이 부분이 불편했다&quot;는 말이에요.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-9 rounded-[24px] bg-[#191F28] p-7 md:flex-row md:items-center md:p-11">
            <div className="flex flex-none flex-col gap-2.5 md:w-[240px]">
              <span className="text-[13.5px] font-semibold text-[#8B95A1]">
                베타 기간 이용료
              </span>
              <span className="text-[52px] leading-none font-bold tracking-[-2.8px] text-white md:text-[64px]">
                0원
              </span>
              <span className="text-[14.5px] leading-[1.6] text-[#B0B8C1]">
                기간·횟수·기능 제한 없이
              </span>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {PRICING_CHECKLIST.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2.5 text-[15px] text-[#F9FAFB]"
                >
                  <CheckIcon color="#4593FC" size={15} strokeWidth={2.8} />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3.5 grid gap-3.5 sm:grid-cols-3">
            {PRICING_INFO.map((c) => (
              <div
                key={c.title}
                className="flex flex-col gap-1.5 rounded-[18px] border border-[#E5E8EB] p-6"
              >
                <span className="text-[15.5px] font-bold text-[#191F28]">
                  {c.title}
                </span>
                <span className="text-sm leading-[1.6] text-[#6B7684]">
                  {c.body}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white px-6 py-16 md:px-11 md:py-24">
        <div className="mx-auto max-w-[820px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-sm font-bold tracking-[0.4px] text-[#1B64DA]">
              FAQ
            </span>
            <h2 className="text-2xl leading-[1.3] font-bold tracking-[-1.2px] text-[#191F28] md:text-[36px]">
              가장 많이 물어보신 것
            </h2>
          </div>
          <div className="mt-9 flex flex-col border-t border-[#E5E8EB]">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group border-b border-[#E5E8EB] py-[22px]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-[17px] font-semibold text-[#191F28]">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl font-normal text-[#8B95A1] transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2.5 max-w-[660px] text-[15.5px] leading-[1.75] text-[#6B7684]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 최종 CTA */}
      <section
        id="cta"
        className="mt-[80px] flex scroll-mt-16 flex-col items-center gap-6 bg-[#F9FAFB] px-6 py-16 md:mt-24 md:px-11 md:py-[88px]"
      >
        <h2 className="text-center text-[30px] leading-[1.24] font-bold tracking-[-1.4px] text-[#191F28] sm:text-[38px] md:text-[44px] md:tracking-[-1.8px]">
          오늘 앉아있던 시간 중
          <br />진짜 공부는 몇 시간이었을까요
        </h2>
        <p className="max-w-[560px] text-center text-[15.5px] leading-[1.7] text-[#6B7684] md:text-[17px]">
          사전예약하면 출시 알림과 초기 테스터 선발 안내를 보내드립니다.
          베타 기간에는 모든 기능이 무료이고, 결제 정보는 받지 않아요.
        </p>
        <SignupForm />
      </section>

      {/* 푸터 */}
      <footer className="flex flex-col items-center gap-4 border-t border-[#E5E8EB] bg-white px-6 py-8 md:flex-row md:items-center md:justify-between md:px-11">
        <div className="flex items-center gap-[9px]">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[7px] bg-[#1B64DA]">
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8" fill="none" stroke="#fff" strokeWidth="2.6" />
              <circle cx="12" cy="12" r="2.6" fill="#fff" />
            </svg>
          </span>
          <span className="text-[14.5px] font-bold text-[#191F28]">
            FocusON
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/terms"
            className="text-[13.5px] text-[#6B7684] transition-colors hover:text-[#191F28]"
          >
            이용약관
          </Link>
          <Link
            href={SITE.privacyPath}
            className="text-[13.5px] text-[#6B7684] transition-colors hover:text-[#191F28]"
          >
            개인정보처리방침
          </Link>
          <Link
            href="/support"
            className="text-[13.5px] text-[#6B7684] transition-colors hover:text-[#191F28]"
          >
            문의
          </Link>
        </div>
      </footer>
    </div>
  );
}
