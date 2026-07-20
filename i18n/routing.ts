import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  /**
   * Every URL carries its locale (`/es/...`, `/en/...`). Keeps canonical and
   * hreflang tags unambiguous and avoids a duplicate prefix-less variant.
   */
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** Language tags used for `hreflang` and `og:locale`. */
export const LOCALE_TAGS: Record<Locale, string> = {
  es: "es-PY",
  en: "en-US",
};
