import type { MetadataRoute } from "next";
import { LOCALE_TAGS, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site-url";

/** Paths that exist in every locale, relative to the locale segment. */
const PATHS = [
  { path: "", priority: 1, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    PATHS.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      // Mirrors the hreflang tags so crawlers see both variants of each page.
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            LOCALE_TAGS[l],
            `${siteUrl}/${l}${path}`,
          ]),
        ),
      },
    })),
  );
}
