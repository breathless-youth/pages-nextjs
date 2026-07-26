import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// 시안 승격 체크리스트 (완료 전까지 이 파일은 privacy/terms/support만 포함):
// ① 선택 시안을 /로 승격하고 임시 허브(app/page.tsx) 제거
// ② 해당 페이지의 robots noindex 제거
// ③ metadata title을 정식 타이틀로 교체
// ④ 아래 sitemap에 / 추가
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.siteUrl}/privacy`, lastModified: new Date() },
    { url: `${SITE.siteUrl}/terms`, lastModified: new Date() },
    { url: `${SITE.siteUrl}/support`, lastModified: new Date() },
  ];
}
