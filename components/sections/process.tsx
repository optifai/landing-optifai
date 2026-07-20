import { useTranslations } from "next-intl";
import { Info } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { processSteps } from "@/data/process";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Process() {
  const t = useTranslations("process");

  return (
    <Section id={SECTION_IDS.process}>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* An ordered list, because the sequence is the point. The connector is
          drawn with pseudo-free absolute elements so it never interferes with
          the semantics: vertical on mobile, horizontal from lg up. */}
      <ol className="relative mt-14 grid gap-8 lg:grid-cols-5 lg:gap-6">
        <span
          aria-hidden="true"
          className="absolute left-[1.4375rem] top-3 -z-10 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-primary/40 via-line-strong to-transparent sm:block lg:left-0 lg:top-6 lg:h-px lg:w-full lg:bg-gradient-to-r"
        />

        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.id} className="lg:pr-4">
              <Reveal index={index}>
                <div className="flex gap-4 lg:flex-col lg:gap-0">
                  <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-primary shadow-card">
                    <Icon aria-hidden="true" className="size-5" />
                    <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[0.625rem] font-bold text-primary-fg">
                      <span aria-hidden="true">{index + 1}</span>
                      <span className="sr-only">
                        {t("stepLabel", { number: index + 1 })}
                      </span>
                    </span>
                  </span>

                  <div className="lg:mt-5">
                    <h3 className="text-base font-semibold">
                      {t(`steps.${step.id}.name`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {t(`steps.${step.id}.description`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <Reveal className="mt-12">
        <p className="mx-auto flex max-w-2xl items-start gap-2.5 rounded-card border border-line bg-surface-2/60 px-5 py-4 text-sm leading-relaxed text-fg-muted">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
          {t("note")}
        </p>
      </Reveal>
    </Section>
  );
}
