import {
  CalendarBlankIcon,
  GearSixIcon,
  HouseIcon,
} from "@phosphor-icons/react/dist/ssr";

/** 2톤 불꽃 일러스트 — 이모지 노출 금지 규칙(voice-tone.md) 대응 SVG. */
export function FlameArt({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2c.6 3.2-1.4 5-3.2 7C7 11 6 13 6 15.2 6 19 8.7 22 12 22s6-3 6-6.8c0-2.7-1.3-4.6-2.6-6.4-.5 1.5-1.3 2.4-2.4 2.8.6-2.9-.2-6.4-1-9.6z"
        fill="#FF9E1B"
      />
      <path
        d="M12 22c-1.9 0-3.4-1.6-3.4-3.6 0-1.9 1.5-3 3.4-5 1.9 2 3.4 3.1 3.4 5 0 2-1.5 3.6-3.4 3.6z"
        fill="#FFCE7A"
      />
    </svg>
  );
}

/** 잉크 두들 스타일 미니 일러스트 — 책상 앞 인물 (홈 가이드 카드용). */
export function DeskDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="13" r="5" />
      <path d="M24 18v8" />
      <path d="M24 21l-8 6M24 21l8 6" />
      <path d="M8 32h32" />
      <path d="M12 32v9M36 32v9" />
      <path d="M28 29l7 2" />
    </svg>
  );
}

const TABS = [
  { key: "home", icon: HouseIcon, label: "홈" },
  { key: "records", icon: CalendarBlankIcon, label: "기록" },
  { key: "settings", icon: GearSixIcon, label: "설정" },
] as const;

/** V1.0 3탭 바 (홈 · 기록 · 설정). */
export function TabBar({ active }: { active: (typeof TABS)[number]["key"] }) {
  return (
    <div className="grid grid-cols-3 border-t border-[#E5E8EB] bg-white px-2 py-2">
      {TABS.map((t) => (
        <span
          key={t.key}
          className={`flex flex-col items-center gap-0.5 text-[8px] ${
            t.key === active ? "text-[#3182F6]" : "text-[#B0B8C1]"
          }`}
        >
          <t.icon size={13} weight={t.key === active ? "fill" : "regular"} />
          {t.label}
        </span>
      ))}
    </div>
  );
}
