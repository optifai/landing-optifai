import { useTranslations } from "next-intl";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import {
  SECTION_IDS,
  buildWhatsAppUrl,
  mailtoUrl,
  siteConfig,
} from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { BookingCta } from "@/components/shared/booking-cta";
import { InstagramIcon } from "@/components/shared/brand-icons";
import { ContactForm } from "@/components/forms/contact-form";

export function Contact() {
  const t = useTranslations("contact");
  const tCta = useTranslations("cta");
  const tCommon = useTranslations("common");
  const tWhatsApp = useTranslations("whatsapp");

  const channels = [
    {
      key: "whatsapp",
      icon: MessageCircle,
      value: siteConfig.contact.whatsappDisplay,
      href: buildWhatsAppUrl(tWhatsApp("message")),
      external: true,
    },
    {
      key: "email",
      icon: Mail,
      value: siteConfig.contact.email,
      href: mailtoUrl,
      external: false,
    },
    {
      key: "instagram",
      icon: InstagramIcon,
      value: `@${siteConfig.contact.instagramUsername}`,
      href: siteConfig.contact.instagramUrl,
      external: true,
    },
  ] as const;

  return (
    <Section id={SECTION_IDS.contact} tone="subtle">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
        {/* min-w-0 lets these grid items shrink below their content's
            intrinsic width instead of stretching the track. */}
        <Reveal className="min-w-0">
          <div className="flex flex-col gap-6">
            <div className="rounded-panel border border-line bg-surface p-6">
              <h3 className="text-base font-semibold">
                {t("channels.title")}
              </h3>

              <ul className="mt-5 flex flex-col gap-4">
                {channels.map(({ key, icon: Icon, value, href, external }) => (
                  <li key={key}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-start gap-3"
                    >
                      <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"
                      >
                        <Icon className="size-[1.1rem]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-fg-subtle">
                          {t(`channels.${key}`)}
                        </span>
                        {/* `overflow-wrap: anywhere` rather than `break-words`:
                            only the former shrinks the intrinsic min-content
                            size, which is what stops the long contact email
                            from widening the whole grid on 320px screens. */}
                        <span className="block text-sm font-medium text-fg transition-colors group-hover:text-primary [overflow-wrap:anywhere]">
                          {value}
                        </span>
                      </span>
                      {external ? (
                        <span className="sr-only">
                          {tCommon("opensInNewTab")}
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}

                <li className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-2 text-fg-subtle"
                  >
                    <MapPin className="size-[1.1rem]" />
                  </span>
                  <span>
                    <span className="block text-xs text-fg-subtle">
                      {t("channels.location")}
                    </span>
                    <span className="block text-sm font-medium text-fg">
                      {siteConfig.location.city}, {siteConfig.location.country}
                    </span>
                  </span>
                </li>
              </ul>

              <div className="mt-6 border-t border-line pt-5">
                <BookingCta
                  label={tCta("call")}
                  variant="outline"
                  size="md"
                  className="w-full"
                  newTabHint={tCommon("opensInNewTab")}
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal index={1} className="min-w-0">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
