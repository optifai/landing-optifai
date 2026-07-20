import { useTranslations } from "next-intl";
import { SECTION_IDS } from "@/config/site";
import { benefits } from "@/data/benefits";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Benefits() {
  const t = useTranslations("benefits");

  return (
    <Section id={SECTION_IDS.benefits} tone="subtle">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        align="left"
      />

      {/* A denser, quieter grid than the services section — same information
          density would make the two read as duplicates. */}
      <ul className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <li key={benefit.id} className="border-t border-line-strong pt-5">
              <Reveal index={index % 4}>
                <span
                  aria-hidden="true"
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-surface text-accent ring-1 ring-inset ring-line"
                >
                  <Icon className="size-[1.1rem]" />
                </span>
                <h3 className="mt-4 text-base font-semibold">
                  {t(`items.${benefit.id}.name`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {t(`items.${benefit.id}.description`)}
                </p>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
