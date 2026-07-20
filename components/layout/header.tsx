"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NAV_SECTIONS, SECTION_IDS, siteConfig } from "@/config/site";
import { buttonClasses } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");

  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  // The header is transparent over the hero and gains a blurred, opaque-enough
  // background once content scrolls underneath it — never a half-transparent
  // state where text sits directly on top of other text.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlights the section currently in view.
  React.useEffect(() => {
    const sections = NAV_SECTIONS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#main"
        className={buttonClasses(
          "primary",
          "sm",
          "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]",
        )}
      >
        {t("skipToContent")}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200",
          scrolled
            ? "border-b border-line bg-bg/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
          <Link
            href="/"
            aria-label={t("home")}
            className="shrink-0 rounded-md"
          >
            <Logo variant="responsive" />
          </Link>

          <nav
            aria-label={t("primary")}
            className="hidden xl:flex xl:items-center"
          >
            {NAV_SECTIONS.map((id) => (
              <Link
                key={id}
                href={`/#${id}`}
                aria-current={activeSection === id ? "true" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium transition-colors duration-150",
                  activeSection === id
                    ? "text-primary"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {t(id)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex md:items-center md:gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            {/* Hidden on a wrapper rather than on the link itself: the button
                base class sets `inline-flex`, which would win over `hidden`. */}
            <div className="hidden sm:block">
              <Link
                href={`/#${SECTION_IDS.contact}`}
                className={buttonClasses(
                  "primary",
                  "sm",
                  "min-h-[42px] whitespace-nowrap px-4",
                )}
              >
                {tCta("header")}
              </Link>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-fg xl:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={menuButtonRef}
      />

      {/* Screen-reader-only company name keeps the accessible page identity
          stable even though the visual logo is a temporary text mark. */}
      <span className="sr-only">{siteConfig.name}</span>
    </>
  );
}
