import { APP_DESCRIPTION, FAQS } from "@/lib/content";
import { SITE } from "@/lib/site";

/**
 * MobileApplication + FAQPage 구조화 데이터. 시안 10종 공용 — 승격 시 그대로 사용.
 * 시안 페이지는 noindex지만, 승격을 대비해 미리 삽입해 둔다.
 */
export function AppJsonLd() {
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
