import { useTranslations } from "next-intl";
import { Check, MapPin } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import { HeroMockup } from "./hero-mockup";

const TRUST_KEYS = ["personal", "quote", "stages", "support"] as const;

export function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative isolate overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36"
    >
      {/* Decorative background: faint grid, fading out before the copy starts. */}
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[38rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent_70%)] blur-3xl"
      />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 xl:gap-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs font-medium text-fg-muted backdrop-blur-sm">
              <MapPin aria-hidden="true" className="size-3.5 text-accent" />
              {t("badge")}
            </p>

            <h1 className="mt-6 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              {t("titleLead")}{" "}
              <span className="text-gradient">{t("titleAccent")}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
              {t("subtitle")}
            </p>

            <div className="mt-9 flex">
              <WhatsAppLink
                label={t("whatsappCta")}
                message={t("whatsappMessage")}
                ariaLabel={`${t("whatsappCta")} ${tCommon("opensInNewTab")}`}
                size="lg"
              />
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
              {TRUST_KEYS.map((key) => (
                <li
                  key={key}
                  className="inline-flex items-center gap-2 text-sm text-fg-muted"
                >
                  <Check
                    aria-hidden="true"
                    className="size-4 shrink-0 text-accent"
                  />
                  {t(`trust.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-4">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
