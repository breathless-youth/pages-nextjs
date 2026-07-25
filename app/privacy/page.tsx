import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "FocusOn 개인정보처리방침",
};

function Section({
  no,
  title,
  children,
}: {
  no: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">
        {no}. {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr
              key={k}
              className="border-b border-zinc-200 last:border-0 dark:border-zinc-800"
            >
              <td className="w-40 shrink-0 py-2.5 pr-4 align-top font-medium text-zinc-800 dark:text-zinc-200">
                {k}
              </td>
              <td className="py-2.5 text-zinc-600 dark:text-zinc-400">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 md:py-24">
      <header className="mb-12 space-y-3">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {SITE.appName} ({SITE.appNameKo})
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          개인정보처리방침
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          시행일: 2026년 7월 25일
        </p>
      </header>

      <div className="space-y-10">
        <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          숨벅찬 청년들(이하 &ldquo;팀&rdquo;)은 공부 집중 측정 서비스
          FocusOn(이하 &ldquo;서비스&rdquo;)을 제공하면서 이용자의 개인정보를
          소중하게 다루며, 「개인정보 보호법」 등 관련 법령을 준수합니다. 본
          방침은 서비스가 어떤 정보를 왜 수집하고, 어떻게 보관하며, 이용자가
          어떤 권리를 갖는지 설명합니다.
        </p>

        <Section no={1} title="수집하는 정보와 수집 방법">
          <p>
            서비스는 별도의 회원가입 없이 사용할 수 있으며, 이름, 이메일,
            전화번호 같은 연락처 정보를 요구하지 않습니다. 수집하는 항목은
            다음과 같습니다.
          </p>
          <Table
            rows={[
              [
                "기기 식별자",
                "앱 최초 실행 시 자동 생성되는 무작위 식별자(UUID). 기기를 구분해 공부 기록을 이어 주는 용도로만 사용합니다.",
              ],
              [
                "공부 기록",
                "공부 세션의 시작·종료 시각, 총 시간, 순공 시간, 집중 상태 이벤트(자리 비움, 휴대폰 사용 등)의 유형과 발생 시각",
              ],
              [
                "프로필(선택)",
                "닉네임, 공부 카테고리(수능, 공무원, 자격증 등), 프로필 이미지. 입력하지 않아도 서비스 이용에 제한이 없습니다.",
              ],
              [
                "푸시 알림 토큰",
                "알림 수신에 동의한 경우에 한해 기기의 푸시 토큰(FCM 또는 APNs)과 플랫폼 구분(iOS/Android)을 수집합니다.",
              ],
              [
                "문의·신고 내용",
                "앱 내 문의 또는 신고 기능을 이용할 때 이용자가 작성한 내용",
              ],
              [
                "광고 식별자",
                "광고 게재를 위해 Google AdMob이 기기의 광고 식별자(ADID/IDFA)를 수집할 수 있습니다.",
              ],
            ]}
          />
        </Section>

        <Section no={2} title="카메라 영상의 처리">
          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            카메라 영상은 집중 상태를 감지하기 위해 기기 안에서만 분석되며,
            영상이나 사진이 서버로 전송되거나 저장되는 일은 없습니다.
          </p>
          <p>
            서비스는 공부 상태(집중, 자리 비움, 휴대폰 사용)를 판별하기 위해
            기기 내(온디바이스) AI로 카메라 영상을 분석합니다. 분석 결과로
            만들어지는 것은 상태 이벤트 기록(예: &ldquo;몇 시 몇 분부터 몇 분간
            자리 비움&rdquo;)뿐이며, 원본 영상은 어디에도 남지 않습니다.
          </p>
        </Section>

        <Section no={3} title="수집한 정보의 이용 목적">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>순공 시간 측정과 공부 세션 기록 제공</li>
            <li>일간·주간·월간 공부 통계와 스트릭(연속 기록) 제공</li>
            <li>랭킹 등 이용자 간 비교 기능 제공</li>
            <li>알림 수신에 동의한 이용자에 대한 푸시 알림 발송</li>
            <li>문의 응대 및 신고 처리</li>
            <li>서비스 부정 이용 방지</li>
            <li>광고 게재</li>
          </ul>
        </Section>

        <Section no={4} title="보유 및 이용 기간">
          <p>
            수집한 정보는 서비스 제공 기간 동안 보유하며, 이용자가 앱에서
            데이터 삭제를 실행하거나 이메일로 삭제를 요청하면 지체 없이
            파기합니다. 다만 관련 법령에 따라 보존 의무가 있는 경우 해당 기간
            동안 보관한 후 파기합니다.
          </p>
        </Section>

        <Section no={5} title="제3자 제공">
          <p>
            팀은 이용자의 정보를 외부에 제공하지 않습니다. 다만 법령에 근거한
            수사기관의 적법한 요청이 있는 경우는 예외로 합니다.
          </p>
        </Section>

        <Section no={6} title="처리 위탁 및 국외 이전">
          <p>
            서비스 제공을 위해 다음 업무를 외부에 위탁하고 있으며, 수탁자는
            국외(미국)에서 정보를 처리합니다.
          </p>
          <Table
            rows={[
              [
                "Google LLC",
                "푸시 알림 발송(Firebase Cloud Messaging), 광고 게재(Google AdMob). 이전 항목: 푸시 토큰, 광고 식별자. 보유 기간: 위탁 업무 종료 시까지.",
              ],
            ]}
          />
        </Section>

        <Section no={7} title="이용자의 권리">
          <p>
            이용자는 언제든지 자신의 공부 기록과 프로필을 조회·수정·삭제할 수
            있습니다. 서비스는 익명 기기 식별자 기반으로 운영되므로, 앱이
            설치된 기기에서 직접 삭제를 실행하는 것이 가장 확실한 방법입니다.
            앱 이용이 어려운 경우 아래 연락처로 요청하면 처리해 드립니다.
          </p>
          <p>
            서비스는 만 14세 미만 아동의 개인정보를 의도적으로 수집하지
            않으며, 수집 사실이 확인되면 지체 없이 파기합니다.
          </p>
        </Section>

        <Section no={8} title="안전성 확보 조치">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>연락처 정보를 요구하지 않는 최소 수집 원칙</li>
            <li>전송 구간 암호화(HTTPS) 적용</li>
            <li>서버 접근 권한 최소화 및 접근 통제</li>
          </ul>
        </Section>

        <Section no={9} title="개인정보 보호책임자 및 문의">
          <p>
            개인정보 처리에 관한 문의, 열람·삭제 요청, 불만 처리는 아래
            연락처로 접수할 수 있습니다.
          </p>
          <Table
            rows={[
              ["책임자", "숨벅찬 청년들 개인정보 보호책임자"],
              ["이메일", SITE.supportEmail],
            ]}
          />
        </Section>

        <Section no={10} title="방침의 변경">
          <p>
            본 방침의 내용이 추가되거나 변경되는 경우, 시행 7일 전부터 앱 내
            공지 또는 본 페이지를 통해 알립니다.
          </p>
        </Section>
      </div>

      <footer className="mt-16 border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <Link href="/" className="underline underline-offset-4">
          {SITE.appName} 홈으로
        </Link>
      </footer>
    </main>
  );
}
