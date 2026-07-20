"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { buildWhatsAppUrl, SECTION_IDS } from "@/config/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./brand-icons";

/**
 * Floating WhatsApp button.
 *
 * It steps out of the way while the contact section is on screen, so it never
 * competes with the form (the higher-priority conversion) and never covers the
 * submit button on small screens.
 */
export function WhatsAppFloat() {
  const t = useTranslations("whatsapp");
  const tCommon = useTranslations("common");
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const contact = document.getElementById(SECTION_IDS.contact);
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={buildWhatsAppUrl(t("message"))}
      target="_blank"
      rel="noopener noreferrer"
      // `inert` when hidden keeps it out of the tab order while invisible.
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full",
        "bg-[#1ebe5d] py-3 pl-4 pr-4 text-[#04160a] sm:pr-5",
        "shadow-lifted transition-[opacity,transform] duration-200",
        "hover:bg-[#19a851] focus-visible:outline-offset-4",
        hidden
          ? "pointer-events-none translate-y-3 opacity-0"
          : "translate-y-0 opacity-100",
      )}
    >
      <WhatsAppIcon className="size-6" />
      {/* Label is visible from sm up; below that the icon carries the action
          and the accessible name comes from the sr-only text. */}
      <span className="hidden text-sm font-semibold sm:inline">
        {t("float")}
      </span>
      <span className="sr-only sm:hidden">{t("float")}</span>
      <span className="sr-only"> {tCommon("opensInNewTab")}</span>
    </a>
  );
}
