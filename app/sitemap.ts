import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// 시안 확정 후 메인(/)을 추가할 것. 시안 페이지들은 임시라 제외.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.siteUrl}/privacy`, lastModified: new Date() },
    { url: `${SITE.siteUrl}/terms`, lastModified: new Date() },
    { url: `${SITE.siteUrl}/support`, lastModified: new Date() },
  ];
}
