import * as React from "react";
import { useTranslations } from "next-intl";
import { buildWhatsAppUrl } from "@/config/site";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button";
import { WhatsAppIcon } from "./brand-icons";

interface WhatsAppLinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Overrides the default "Chat on WhatsApp" label. */
  label?: string;
  /** Overrides the shared greeting when a CTA needs more specific context. */
  message?: string;
  ariaLabel?: string;
  showIcon?: boolean;
}

/**
 * Every WhatsApp entry point goes through here, so the number and the greeting
 * are defined in exactly one place (`config/site.ts` + `whatsapp.message`).
 */
export function WhatsAppLink({
  variant = "whatsapp",
  size = "md",
  className,
  label,
  message,
  ariaLabel,
  showIcon = true,
}: WhatsAppLinkProps) {
  const t = useTranslations("whatsapp");
  const tCommon = useTranslations("common");

  return (
    <a
      href={buildWhatsAppUrl(message ?? t("message"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={buttonClasses(variant, size, className)}
    >
      {showIcon ? <WhatsAppIcon className="size-[1.15em]" /> : null}
      {label ?? t("float")}
      <span className="sr-only"> {tCommon("opensInNewTab")}</span>
    </a>
  );
}
