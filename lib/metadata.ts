import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LOCALE_TAGS, routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { siteUrl } from "@/lib/site-url";

/**
 * Builds the `alternates` block for a path.
 *
 * `canonical` points at the localised URL for the current page, and
 * `languages` produces the `hreflang` tags — including `x-default`, which
 * points at the default locale so search engines have a fallback for
 * unmatched languages.
 */
export function buildAlternates(locale: Locale, path = "") {
  const languages: Record<string, string> = {};

  for (const l of routing.locales) {
    languages[LOCALE_TAGS[l]] = `${siteUrl}/${l}${path}`;
  }
  languages["x-default"] =
    `${siteUrl}/${routing.defaultLocale}${path}`;

  return {
    canonical: `${siteUrl}/${locale}${path}`,
    languages,
  };
}

interface PageMetadataOptions {
  locale: Locale;
  /** Path after the locale segment, e.g. `/privacy`. Empty for the home page. */
  path?: string;
  title: string;
  description: string;
  /** Legal pages shouldn't compete with the home page in search results. */
  index?: boolean;
}

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  index = true,
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}/${locale}${path}`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      locale: LOCALE_TAGS[locale].replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Metadata for the home page in a given locale. */
export async function buildHomeMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    ...buildPageMetadata({
      locale,
      title: t("title"),
      description: t("description"),
    }),
    keywords: t("keywords").split(",").map((k) => k.trim()),
  };
}
