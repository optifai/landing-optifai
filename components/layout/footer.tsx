import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  NAV_SECTIONS,
  buildWhatsAppUrl,
  mailtoUrl,
  siteConfig,
  telUrl,
} from "@/config/site";
import { services } from "@/data/services";
import { Logo } from "@/components/shared/logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/shared/brand-icons";
import { LanguageSwitcher } from "./language-switcher";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services.items");
  const tWhatsApp = useTranslations("whatsapp");
  const tCommon = useTranslations("common");

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-subtle">
      <div className="container-page pb-7 pt-14 md:pt-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {t("tagline")}
            </p>

            <ul
              aria-label={t("socialLabel")}
              className="mt-5 flex items-center gap-2"
            >
              <li>
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram @${siteConfig.contact.instagramUsername} ${tCommon("opensInNewTab")}`}
                  className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-primary focus-visible:border-primary focus-visible:text-primary"
                >
                  <InstagramIcon className="size-5" />
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(tWhatsApp("message"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${tCommon("opensInNewTab")}`}
                  className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-primary focus-visible:border-primary focus-visible:text-primary"
                >
                  <WhatsAppIcon className="size-5" />
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label={t("navTitle")}>
            <h2 className="text-sm font-semibold text-fg">{t("navTitle")}</h2>
            <ul className="mt-3 flex flex-col">
              {NAV_SECTIONS.map((id) => (
                <li key={id}>
                  <Link
                    href={`/#${id}`}
                    className="inline-flex min-h-10 items-center text-sm text-fg-muted transition-colors hover:text-primary"
                  >
                    {tNav(id)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-fg">
              {t("servicesTitle")}
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5 py-1">
              {services.map((service) => (
                <li key={service.id}>
                  <span className="text-sm leading-6 text-fg-muted">
                    {tServices(`${service.id}.name`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-fg">
              {t("contactTitle")}
            </h2>
            <ul className="mt-3 flex flex-col gap-1 text-sm">
              <li>
                <a
                  href={mailtoUrl}
                  className="inline-flex min-h-10 items-center gap-2.5 text-fg-muted transition-colors hover:text-primary"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4 shrink-0 text-fg-subtle"
                  />
                  <span className="break-all">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={telUrl}
                  className="inline-flex min-h-10 items-center gap-2.5 text-fg-muted transition-colors hover:text-primary"
                >
                  <Phone
                    aria-hidden="true"
                    className="size-4 shrink-0 text-fg-subtle"
                  />
                  <span>{siteConfig.contact.whatsappDisplay}</span>
                </a>
              </li>
              <li className="inline-flex min-h-10 items-center gap-2.5 text-fg-muted">
                <MapPin
                  aria-hidden="true"
                  className="size-4 shrink-0 text-fg-subtle"
                />
                <span>
                  {siteConfig.location.city}, {siteConfig.location.country}
                </span>
              </li>
            </ul>

            <div className="mt-3">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-5 xl:flex-row xl:items-center xl:justify-between">
          <p className="text-xs text-fg-subtle">
            © {year} {siteConfig.name}. {t("rights")}
          </p>

          <nav
            aria-label={t("legalTitle")}
            className="pr-16 sm:pr-56"
          >
            <ul className="flex flex-wrap items-center gap-x-5">
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex min-h-10 items-center text-xs text-fg-subtle transition-colors hover:text-primary"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="inline-flex min-h-10 items-center text-xs text-fg-subtle transition-colors hover:text-primary"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
