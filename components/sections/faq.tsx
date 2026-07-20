import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { faqItems } from "@/data/faq";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/**
 * FAQ accordion built on native `<details>` / `<summary>`.
 *
 * The browser gives us correct keyboard support, focus handling and expanded
 * state for free — no JavaScript, no ARIA to keep in sync, and it still works
 * if scripting fails. Items are independent (no `name` attribute) so several
 * answers can stay open at once.
 */
export function Faq() {
  const t = useTranslations("faq");

  return (
    <Section id={SECTION_IDS.faq}>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <ul className="flex flex-col gap-3">
          {faqItems.map((item, index) => (
            <li key={item.id}>
              <Reveal index={Math.min(index, 3)}>
                <details className="group rounded-card border border-line bg-surface transition-colors duration-200 open:border-line-strong">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-fg [&::-webkit-details-marker]:hidden">
                    <span className="text-[0.9375rem] sm:text-base">
                      {t(`items.${item.id}.question`)}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className="size-5 shrink-0 text-fg-subtle transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm leading-relaxed text-fg-muted sm:text-[0.9375rem]">
                      {t(`items.${item.id}.answer`)}
                    </p>
                  </div>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
