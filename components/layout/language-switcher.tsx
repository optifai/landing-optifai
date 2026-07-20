"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * ES / EN switch.
 *
 * `usePathname` from the next-intl navigation helpers returns the path without
 * the locale segment, so linking to the same path in the other locale keeps the
 * visitor exactly where they were. The middleware persists the choice in the
 * `NEXT_LOCALE` cookie.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("language");
  const pathname = usePathname();
  const active = useLocale() as Locale;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-line bg-surface-2 p-0.5",
        className,
      )}
    >
      <span className="sr-only">{t("label")}</span>
      {routing.locales.map((locale) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            // Marks the current language for assistive tech without relying on
            // the highlight alone.
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "grid min-h-8 min-w-9 place-items-center rounded-[0.4rem] px-2 text-xs font-semibold transition-colors duration-150",
              isActive
                ? "bg-surface text-primary shadow-card"
                : "text-fg-subtle hover:text-fg",
            )}
          >
            <span aria-hidden="true">
              {locale === "es" ? t("esShort") : t("enShort")}
            </span>
            <span className="sr-only">
              {locale === "es" ? t("es") : t("en")}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
