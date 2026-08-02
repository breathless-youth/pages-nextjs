import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE } from "@/lib/site";
import { APP_DESCRIPTION } from "@/lib/content";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: "포메 — 순공시간을 증명하는 공부 타이머",
    template: "%s | 포메",
  },
  description: `${APP_DESCRIPTION}, 포메. 순공 타이머 · 공부 기록 · 집중률 통계.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      {/* 로컬 개발 트래픽이 GA4에 섞이지 않도록 프로덕션 빌드에서만 로드한다 */}
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId={SITE.gaMeasurementId} />
      )}
    </html>
  );
}
