import { useTranslations } from "next-intl";
import { ArrowRight, Check, Info } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SECTION_IDS } from "@/config/site";
import { primaryServices, secondaryServices } from "@/data/services";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, IconPlate } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

export function Services() {
  const t = useTranslations("services");
  const tCta = useTranslations("cta");

  return (
    <Section id={SECTION_IDS.services}>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Three headline services get full cards with examples. */}
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {primaryServices.map((service, index) => {
          const Icon = service.icon;
          const examples = t.raw(
            `items.${service.id}.examples`,
          ) as string[];

          return (
            <Reveal key={service.id} index={index} className="h-full">
              <Card
                interactive
                className="flex h-full flex-col p-6 lg:p-7"
              >
                <IconPlate>
                  <Icon className="size-5" />
                </IconPlate>

                <h3 className="mt-5 text-xl">{t(`items.${service.id}.name`)}</h3>

                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {t(`items.${service.id}.description`)}
                </p>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">
                    {t("examplesLabel")}
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {examples.map((example) => (
                      <li
                        key={example}
                        className="flex items-start gap-2 text-sm text-fg-muted"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-accent"
                        />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* mt-auto keeps the link on the baseline of every card even
                    when the example lists have different lengths. */}
                <Link
                  href={`/#${SECTION_IDS.contact}`}
                  className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary"
                >
                  {tCta("consult")}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                  <span className="sr-only">
                    : {t(`items.${service.id}.name`)}
                  </span>
                </Link>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Supporting services, visually grouped in one panel so they read as a
          secondary tier rather than competing with the three above. */}
      <Reveal className="mt-16">
        <div className="rounded-panel border border-line bg-surface-2/60 p-6 md:p-9">
          <div className="max-w-2xl">
            <h3 className="text-2xl">{t("secondaryTitle")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:text-base">
              {t("secondarySubtitle")}
            </p>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {secondaryServices.map((service) => {
              const Icon = service.icon;
              return (
                <li
                  key={service.id}
                  className="rounded-card border border-line bg-surface p-5"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary"
                  >
                    <Icon className="size-[1.1rem]" />
                  </span>
                  <h4 className="mt-4 text-base font-semibold">
                    {t(`items.${service.id}.name`)}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {t(`items.${service.id}.description`)}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* Honest scope notes — what we can and can't promise. */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {(["integrations", "seo"] as const).map((key) => (
              <p
                key={key}
                className="flex items-start gap-2.5 rounded-lg border border-line bg-surface px-4 py-3 text-xs leading-relaxed text-fg-muted"
              >
                <Info
                  aria-hidden="true"
                  className="mt-0.5 size-3.5 shrink-0 text-fg-subtle"
                />
                {t(`notes.${key}`)}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
