import type { Metadata } from "next";
import Link from "next/link";
import { LiveCameraDemo } from "@/components/main/LiveCameraDemo";
import { SignupForm } from "@/components/main/SignupForm";
import { APP_DESCRIPTION } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "카메라가 자리 이탈·휴대폰 사용·기기 조작을 기기 안에서만 측정해, 앉아있던 시간이 아니라 실제로 집중한 순공시간만 기록하는 공부 타이머 포메. 사전예약하면 테스터로 참여할 수 있어요.",
};

/** 헤더·푸터 로고 마크. 앱 아이콘 원본에서 복숭아색 배경판을 지운 캐릭터 단독 이미지 */
const LOGO_MARK = "/pome/logo-mark.webp";

const NAV = [
  { href: "#live", label: "측정 화면" },
  { href: "#features", label: "기능" },
  { href: "#faq", label: "FAQ" },
];

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

const STEP_STATUS = [
  { label: "집중 측정 중", bg: "#E8F3FF", fg: "#1B64DA", dot: "#1B64DA" },
  { label: "비집중", bg: "#FFF4E5", fg: "#B36100", dot: "#FF8A00" },
  { label: "일시정지", bg: "#F2F4F6", fg: "#6B7684", dot: "#8B95A1" },
];

const STEP_BREAKDOWN = [
  { label: "자리 이탈", value: "2회 · 9분 40초" },
  { label: "휴대폰 사용", value: "2회 · 6분 12초" },
  { label: "수동 일시정지", value: "1회 · 3분" },
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
        <path d="M4 18h4V9H4v9ZM10 18h4V4h-4v14ZM16 18h4v-6h-4v6Z" fill="#B36100" />
      </svg>
    ),
  },
  {
    tint: "#E8F3FF",
    title: "순공 / 총공부",
    body: "순공시간과 총 공부 시간을 분리해 진짜 집중한 시간을 측정합니다.",
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

/**
 * 소셜 스터디 미리보기 격자. 카메라 영상이 아니라 캐릭터로 상태만 보여주는 화면이다
 * — 영상을 주고받지 않는다는 페이지 전체의 약속과 어긋나지 않게.
 * 이미지는 측정 화면 섹션에서 이미 불러온 네 장을 그대로 쓴다.
 */
const STUDY_ROOM = [
  {
    name: "나",
    img: "/pome/cam-focus.webp",
    time: "3시간 42분",
    color: "#4593FC",
    flip: false,
  },
  {
    name: "수민",
    img: "/pome/cam-focus.webp",
    time: "4시간 12분",
    color: "#4593FC",
    flip: true,
  },
  {
    name: "지호",
    img: "/pome/cam-phone.webp",
    time: "3시간 48분",
    color: "#FF9E1B",
    flip: false,
  },
  {
    name: "하윤",
    img: "/pome/cam-pause.webp",
    time: "2시간 31분",
    color: "#8B95A1",
    flip: false,
  },
];

const ROOM_LEGEND = [
  { label: "집중", color: "#4593FC" },
  { label: "비집중", color: "#FF9E1B" },
  { label: "일시정지", color: "#8B95A1" },
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
  { k: "상태 구분", a: "집중 + 비집중 3종 + 일시정지", b: "없음", c: "없음" },
  { k: "순공 · 총공부 구분", a: "함께 표시", b: "한 가지만", c: "한 가지만" },
  { k: "얼굴 인식 · 영상 저장", a: "둘 다 없음", b: "해당 없음", c: "실시간 송출" },
  { k: "혼자서도 가능", a: "가능", b: "가능", c: "상대 필요" },
];

const FAQS = [
  {
    q: "얼굴을 인식하나요?",
    a: "아니요. 포메는 얼굴을 인식하거나 측정하지 않습니다. 자세와 움직임, 기기·화면 상태만으로 판단해요. 얼굴 데이터가 만들어지지 않으니 유출될 것도 없습니다.",
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

function LegendDot({ color }: { color: string }) {
  return <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />;
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

function BrandMark({ size }: { size: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex flex-none bg-contain bg-center bg-no-repeat"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${LOGO_MARK})`,
      }}
    />
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
          <div className="flex items-center gap-[7px]">
            <BrandMark size={42} />
            <span className="text-[16.5px] font-bold tracking-[-0.3px] text-[#191F28]">
              포메
            </span>
          </div>
          <nav className="hidden items-center gap-[30px] md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-[#6B7684] transition-colors hover:text-[#191F28]"
              >
                {n.label}
              </a>
            ))}
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
          <h1 className="mt-[26px] text-center text-[36px] leading-[1.16] font-bold tracking-[-1.4px] text-balance text-[#191F28] sm:text-[48px] sm:tracking-[-2px] md:text-[62px] md:tracking-[-2.6px]">
            열심히 했는데,
            <br />왜 성적은 그대로일까
          </h1>
          <p className="mt-[22px] max-w-[600px] text-center text-[17px] leading-[1.65] text-pretty text-[#6B7684] md:text-[19px]">
            스톱워치는 내가 딴짓하는 걸 모릅니다.<br></br> 포메는 카메라로{" "}
            <span className="font-bold text-[#191F28]">진짜 집중한 시간만</span>{" "}
            골라서 재드려요.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-2.5">
            <a
              href="#cta"
              className="flex h-[58px] items-center rounded-[15px] bg-[#1B64DA] px-7 text-[17px] font-bold text-white shadow-[0_10px_30px_rgba(27,100,218,.28)] transition-colors hover:bg-[#1957C2]"
            >
              사전예약 하러가기
            </a>
            <a
              href="#live"
              className="flex h-[58px] items-center rounded-[15px] border border-[#D1D6DB] bg-white px-[26px] text-[17px] font-semibold text-[#191F28] transition-colors hover:bg-[#F2F4F6]"
            >
              측정 화면 보기
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
            <div className="animate-float-y w-full max-w-[240px] rounded-[20px] border border-[#E5E8EB] bg-white p-6">
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
            <div className="flex w-[70px] flex-none items-center justify-center sm:pb-[34px]">
              <span className="rotate-90 sm:rotate-0">
                <ArrowIcon />
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
                    <span key={i} style={{ width: `${seg.w}%`, background: seg.color }} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-[5px] text-[11.5px] text-[#8B95A1]">
                    <LegendDot color="#4593FC" />
                    집중
                  </span>
                  <span className="flex items-center gap-[5px] text-[11.5px] text-[#8B95A1]">
                    <LegendDot color="#FF9E1B" />
                    비집중
                  </span>
                  <span className="flex items-center gap-[5px] text-[11.5px] text-[#8B95A1]">
                    <LegendDot color="#8B95A1" />
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

      {/* 작동 방식 */}
      <section className="border-t border-[#E5E8EB] bg-[#F9FAFB] px-6 py-16 md:px-11 md:pt-[120px] md:pb-[130px]">
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
            <div className="flex flex-col items-center gap-7 border-b border-[#E5E8EB] py-8 md:flex-row md:gap-9 md:py-[34px]">
              <div className="flex flex-1 flex-col gap-2.5 md:min-w-[320px]">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-[#1B64DA] text-[13px] font-bold text-white">
                    1
                  </span>
                  <span className="text-[20px] font-bold text-[#191F28] md:text-[22px]">
                    폰을 세우고 집중 시작
                  </span>
                </span>
                <span className="text-[15.5px] leading-[1.7] text-[#6B7684]">
                  거치대에 올려두고 버튼 한 번. 과목 입력이나 목표 설정 같은 준비
                  과정이 없습니다.
                </span>
              </div>
              <div className="flex h-[150px] w-full flex-none items-center justify-center rounded-[18px] bg-[#E8F3FF] md:w-[300px]">
                <div className="flex items-center gap-4 rounded-2xl bg-[#1B64DA] px-[22px] py-[18px] shadow-[0_10px_26px_rgba(27,100,218,.3)]">
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[17px] font-bold text-white">집중 시작</span>
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

            <div className="flex flex-col items-center gap-7 border-b border-[#E5E8EB] py-8 md:flex-row md:gap-9 md:py-[34px]">
              <div className="flex flex-1 flex-col gap-2.5 md:min-w-[320px]">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-[#1B64DA] text-[13px] font-bold text-white">
                    2
                  </span>
                  <span className="text-[20px] font-bold text-[#191F28] md:text-[22px]">
                    흐트러지면 순공시간이 멈춥니다
                  </span>
                </span>
                <span className="text-[15.5px] leading-[1.7] text-[#6B7684]">
                  자리를 비우거나 휴대폰을 들면 오렌지로 바뀌고 순공시간만
                  정지합니다. 직접 누른 일시정지는 회색으로, 순공과 총 공부 시간이
                  모두 멈춰요.
                </span>
              </div>
              <div className="flex w-full flex-none flex-col items-center justify-center gap-2.5 rounded-[18px] border border-[#E5E8EB] bg-white p-5 md:h-[150px] md:w-[300px]">
                {STEP_STATUS.map((s) => (
                  <span
                    key={s.label}
                    className="flex h-8 items-center gap-2 rounded-full px-[15px] text-[13.5px] font-semibold"
                    style={{ background: s.bg, color: s.fg }}
                  >
                    <Dot color={s.dot} />
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-7 py-8 md:flex-row md:gap-9 md:py-[34px]">
              <div className="flex flex-1 flex-col gap-2.5 md:min-w-[320px]">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-[#1B64DA] text-[13px] font-bold text-white">
                    3
                  </span>
                  <span className="text-[20px] font-bold text-[#191F28] md:text-[22px]">
                    끝나면 원인까지 정리해 드려요
                  </span>
                </span>
                <span className="text-[15.5px] leading-[1.7] text-[#6B7684]">
                  타임라인과 비집중 유형별 횟수·시간이 남습니다. 매일 쌓이면 내가
                  무너지는 시간대까지 보이기 시작해요.
                </span>
              </div>
              <div className="flex w-full flex-none items-center justify-center rounded-[18px] bg-[#F2F4F6] px-[22px] py-5 md:h-[150px] md:w-[300px]">
                <div className="flex w-full flex-col gap-[9px] rounded-[14px] bg-white p-4 shadow-[0_8px_22px_rgba(0,0,0,.07)]">
                  {STEP_BREAKDOWN.map((r) => (
                    <div key={r.label} className="flex items-center justify-between">
                      <span className="text-[13px] text-[#191F28]">{r.label}</span>
                      <span className="text-[12.5px] text-[#6B7684]">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LiveCameraDemo />

      {/* 기능 */}
      <section id="features" className="bg-white px-6 pt-16 md:px-11 md:pt-24">
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
                <span className="text-[17px] font-bold text-[#191F28]">{f.title}</span>
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
                친구·스터디원과 순공시간을 함께 쌓고 서로의 집중을 확인하는 모드를
                준비하고 있어요. 초기 테스터에게 가장 먼저 열어드립니다.
              </span>
            </div>
            <div className="flex w-full flex-col gap-3 rounded-[18px] border border-white/[.12] bg-white/[.06] p-5 md:w-[344px] md:flex-none">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12.5px] font-semibold text-[#8B95A1]">
                  오늘의 스터디룸
                </span>
                <span className="text-[11.5px] font-semibold text-[#4593FC]">
                  2명 집중 중
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {STUDY_ROOM.map((p) => (
                  <div
                    key={p.name}
                    className="relative aspect-[4/3] overflow-hidden rounded-[11px] bg-[linear-gradient(#F4F0E8_0%,#E7E0D3_58%,#D2C9B9_58%,#C6BCAA_100%)]"
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-[7%] top-[7%] bottom-[26%] bg-contain bg-bottom bg-no-repeat ${
                        p.flip ? "-scale-x-100" : ""
                      }`}
                      style={{ backgroundImage: `url(${p.img})` }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[11px]"
                      style={{ boxShadow: `inset 0 0 0 1.5px ${p.color}` }}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1.5 bg-[rgba(11,15,20,.78)] px-2 py-[5px]">
                      <span className="flex min-w-0 items-center gap-[5px]">
                        <span
                          className="h-[5px] w-[5px] flex-none rounded-full"
                          style={{ background: p.color }}
                        />
                        <span className="truncate text-[11px] font-semibold text-[#F9FAFB]">
                          {p.name}
                        </span>
                      </span>
                      <span
                        className="flex-none text-[10.5px] tabular-nums"
                        style={{ color: p.color }}
                      >
                        {p.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                {ROOM_LEGEND.map((l) => (
                  <span
                    key={l.label}
                    className="flex items-center gap-[5px] text-[11px] text-[#8B95A1]"
                  >
                    <LegendDot color={l.color} />
                    {l.label}
                  </span>
                ))}
              </div>
              <span className="text-[11.5px] leading-[1.55] text-[#6B7684]">
                영상은 오가지 않아요. 집중 상태와 순공시간만 공유됩니다.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 공부 결과 리포트 */}
      <section className="bg-white px-6 pt-16 md:px-11 md:pt-24">
        <div className="mx-auto flex max-w-[1050px] flex-col items-center gap-9 rounded-[24px] border border-[#E5E8EB] bg-[#F9FAFB] p-7 md:flex-row md:gap-11 md:p-11">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <span className="text-sm font-bold tracking-[0.4px] text-[#1B64DA]">
              공부 결과 리포트
            </span>
            <h2 className="text-[26px] leading-[1.32] font-bold tracking-[-1.1px] text-[#191F28] md:text-[32px]">
              왜 흐트러졌는지까지 남깁니다
            </h2>
            <p className="text-[15px] leading-[1.7] text-[#6B7684] md:text-base">
              세션이 끝나면 집중·비집중 구간이 타임라인으로, 원인은 유형별 횟수와
              시간으로 정리됩니다. 다음 세션에서 무엇을 고칠지가 명확해져요.
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
            <span className="text-[13.5px] font-medium text-[#6B7684]">순공시간</span>
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
                <span key={i} style={{ width: `${seg.w}%`, background: seg.color }} />
              ))}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-3">
              <span className="flex items-center gap-[5px] text-[11.5px] text-[#6B7684]">
                <LegendDot color="#1B64DA" />
                집중
              </span>
              <span className="flex items-center gap-[5px] text-[11.5px] text-[#6B7684]">
                <LegendDot color="#FF8A00" />
                비집중
              </span>
              <span className="flex items-center gap-[5px] text-[11.5px] text-[#6B7684]">
                <LegendDot color="#8B95A1" />
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
                  <span className="text-[12.5px] text-[#6B7684]">{r.value}</span>
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
                &quot;6시간 했다고 생각했는데 순공 3시간 50분. 충격이었지만 이제 이
                숫자만 봅니다.&quot;
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
                  <span className="text-[12.5px] text-[#8B95A1]">회계사 1차 준비</span>
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
      <section className="mt-[100px] border-t border-[#E5E8EB] bg-[#F9FAFB] px-6 py-16 md:mt-[150px] md:px-11 md:pt-[120px] md:pb-[130px]">
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
                <span className="px-4 py-[18px] text-[13.5px] font-semibold text-[#6B7684] md:px-[22px]">
                  항목
                </span>
                <span className="bg-[#E8F3FF] px-3.5 py-[18px] text-center text-[14.5px] font-bold text-[#1B64DA]">
                  포메
                </span>
                <span className="px-3.5 py-[18px] text-center text-[13.5px] font-semibold text-[#6B7684]">
                  스톱워치 앱
                </span>
                <span className="px-3.5 py-[18px] text-center text-[13.5px] font-semibold text-[#6B7684]">
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

      {/* FAQ */}
      <section id="faq" className="bg-white px-6 pt-16 md:px-11 md:pt-24">
        <div className="mx-auto max-w-[820px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-sm font-bold tracking-[0.4px] text-[#1B64DA]">
              FAQ
            </span>
            <h2 className="text-2xl leading-[1.3] font-bold tracking-[-1.2px] text-[#191F28] md:text-[36px]">
              자주 하는 질문
            </h2>
          </div>
          <div className="mt-9 flex flex-col border-b border-[#E5E8EB]">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-t border-[#E5E8EB] py-[22px]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-[17px] font-semibold text-[#191F28]">{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[22px] font-normal text-[#8B95A1] transition-transform duration-200 group-open:rotate-45"
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
        className="mt-16 flex scroll-mt-16 flex-col items-center gap-6 bg-[#F9FAFB] px-6 py-16 md:mt-24 md:px-11 md:py-[88px]"
      >
        <h2 className="text-center text-[30px] leading-[1.24] font-bold tracking-[-1.4px] text-balance text-[#191F28] sm:text-[38px] md:text-[44px] md:tracking-[-1.8px]">
          오늘 앉아있던 시간 중
          <br />진짜 공부는 몇 시간이었을까요
        </h2>
        <p className="max-w-[560px] text-center text-[15.5px] leading-[1.7] text-[#6B7684] md:text-[17px]">
          사전예약하면 출시 알림과 초기 테스터 선발 안내를 보내드립니다.
        </p>
        <SignupForm />
      </section>

      {/* 푸터 */}
      <footer className="flex flex-col items-center gap-4 border-t border-[#E5E8EB] bg-white px-6 py-[34px] md:flex-row md:items-center md:justify-between md:px-11">
        <div className="flex items-center gap-[7px]">
          <BrandMark size={36} />
          <span className="text-[14.5px] font-bold text-[#191F28]">포메</span>
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
