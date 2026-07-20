import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  NAV_SECTIONS,
  buildWhatsAppUrl,
  mailtoUrl,
  siteConfig,
} from "@/config/site";
import { services } from "@/data/services";
import { Logo } from "@/components/shared/logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/shared/brand-icons";
import { LanguageSwitcher } from "./language-switcher";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services.items");
  const tContact = useTranslations("contact.channels");
  const tWhatsApp = useTranslations("whatsapp");
  const tCommon = useTranslations("common");

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-subtle">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
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
                  className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:text-primary"
                >
                  <InstagramIcon className="size-5" />
                  <span className="sr-only">
                    Instagram @{siteConfig.contact.instagramUsername}{" "}
                    {tCommon("opensInNewTab")}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(tWhatsApp("message"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:text-primary"
                >
                  <WhatsAppIcon className="size-5" />
                  <span className="sr-only">
                    WhatsApp {tCommon("opensInNewTab")}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label={t("navTitle")}>
            <h2 className="text-sm font-semibold text-fg">{t("navTitle")}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_SECTIONS.map((id) => (
                <li key={id}>
                  <Link
                    href={`/#${id}`}
                    className="text-sm text-fg-muted transition-colors hover:text-primary"
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
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href="/#services"
                    className="text-sm text-fg-muted transition-colors hover:text-primary"
                  >
                    {tServices(`${service.id}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-fg">
              {t("contactTitle")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={mailtoUrl}
                  className="inline-flex items-start gap-2.5 text-fg-muted transition-colors hover:text-primary"
                >
                  <Mail
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-fg-subtle"
                  />
                  <span className="break-all">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(tWhatsApp("message"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 text-fg-muted transition-colors hover:text-primary"
                >
                  <Phone
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-fg-subtle"
                  />
                  <span>
                    {siteConfig.contact.whatsappDisplay}
                    <span className="sr-only">
                      {" "}
                      {tContact("whatsapp")} {tCommon("opensInNewTab")}
                    </span>
                  </span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-fg-muted">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-fg-subtle"
                />
                <span>
                  {siteConfig.location.city}, {siteConfig.location.country}
                </span>
              </li>
            </ul>

            <div className="mt-5">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {year} {siteConfig.name}. {t("rights")}
          </p>

          <nav aria-label={t("legalTitle")}>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-xs text-fg-subtle transition-colors hover:text-primary"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-xs text-fg-subtle transition-colors hover:text-primary"
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
