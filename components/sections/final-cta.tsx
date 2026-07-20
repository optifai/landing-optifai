import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SECTION_IDS } from "@/config/site";
import { buttonClasses } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  const t = useTranslations("finalCta");
  const tCta = useTranslations("cta");

  return (
    <section id={SECTION_IDS.finalCta} className="scroll-mt-24 py-20 md:py-24">
      <div className="container-page">
        <Reveal>
          {/* The one place with a saturated brand background, so it reads as
              the end of the page rather than another content section. */}
          <div className="relative isolate overflow-hidden rounded-panel bg-gradient-to-br from-[#0d2a63] via-[#123a86] to-[#0b6f8c] px-6 py-14 text-center md:px-14 md:py-18">
            <div
              aria-hidden="true"
              className="bg-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_75%)]"
              // Lightens the decorative grid so it reads on the dark panel.
              style={
                { "--grid-line": "rgb(255 255 255 / 0.14)" } as CSSProperties
              }
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 left-1/2 -z-10 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(34_211_238/0.35),transparent)] blur-2xl"
            />

            <h2 className="mx-auto max-w-3xl text-3xl leading-tight text-white sm:text-4xl md:text-[2.75rem]">
              {t("title")}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t("description")}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/#${SECTION_IDS.contact}`}
                className={buttonClasses(
                  "inverse",
                  "lg",
                  "group w-full sm:w-auto",
                )}
              >
                {tCta("primary")}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              <WhatsAppLink
                size="lg"
                className="w-full sm:w-auto"
                label={tCta("whatsapp")}
              />
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/70">
              <Check aria-hidden="true" className="size-4" />
              {t("reassurance")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
