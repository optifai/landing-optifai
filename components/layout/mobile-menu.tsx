"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { X, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NAV_SECTIONS, SECTION_IDS } from "@/config/site";
import { buttonClasses } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** Focus returns here when the panel closes. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Full-screen navigation panel for small viewports.
 *
 * Accessibility behaviour: it is a modal dialog, so focus moves inside on open,
 * Tab is trapped within the panel, Escape closes it, background scrolling is
 * locked, and focus returns to the toggle button on close.
 */
export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  // Move focus into the panel when it opens, and back to the trigger on close.
  React.useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
    // `triggerRef` is a stable ref object; only `open` should re-run this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape to close, Tab cycles within the panel.
  React.useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Lock background scrolling while the panel is open.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 min-[1400px]:hidden">
      <button
        type="button"
        aria-label={t("closeMenu")}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/45 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("menuTitle")}
        className="absolute inset-x-0 top-0 max-h-dvh overflow-y-auto border-b border-line bg-bg px-5 pb-8 pt-4 shadow-lifted"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-fg-muted">
            {t("menuTitle")}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("closeMenu")}
            className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:text-fg"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav aria-label={t("primary")} className="mt-6">
          <ul className="flex flex-col gap-1">
            {NAV_SECTIONS.map((id) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  onClick={onClose}
                  className="flex min-h-12 items-center justify-between rounded-lg px-3 text-base font-medium text-fg transition-colors hover:bg-surface-2"
                >
                  {t(id)}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 text-fg-subtle"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href={`/#${SECTION_IDS.contact}`}
          onClick={onClose}
          className={buttonClasses("primary", "lg", "mt-6 w-full")}
        >
          {tCta("primary")}
        </Link>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-6">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
