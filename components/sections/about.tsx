import { useTranslations } from "next-intl";
import { MapPin, Rocket, LifeBuoy } from "lucide-react";
import { SECTION_IDS, siteConfig } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const POINTS = [
  { id: "local", icon: MapPin },
  { id: "endToEnd", icon: Rocket },
  { id: "continuity", icon: LifeBuoy },
] as const;

export function About() {
  const t = useTranslations("about");
  const { yearsOfExperience } = siteConfig.facts;

  return (
    <Section id={SECTION_IDS.about}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="left"
          />

          <div className="mt-6 space-y-4">
            <p className="text-lg leading-relaxed text-fg">{t("lead")}</p>
            <p className="leading-relaxed text-fg-muted">{t("body")}</p>
            <p className="leading-relaxed text-fg-muted">{t("closing")}</p>
          </div>

          {/* Rendered only when a real, verifiable number is configured in
              config/site.ts — nothing is claimed by default. */}
          {yearsOfExperience !== null ? (
            <p className="mt-8 inline-flex items-baseline gap-2 rounded-card border border-line bg-surface px-5 py-3">
              <span className="font-display text-3xl font-bold text-primary">
                {yearsOfExperience}
              </span>
              <span className="text-sm text-fg-muted">
                {t("experienceLabel")}
              </span>
            </p>
          ) : null}
        </div>

        <Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {POINTS.map(({ id, icon: Icon }) => (
              <li
                key={id}
                className="flex gap-4 rounded-card border border-line bg-surface p-5"
              >
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold">
                    {t(`points.${id}.name`)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                    {t(`points.${id}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
