"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Faq() {
  const t = useTranslations("faq");
  const instanceId = React.useId().replaceAll(":", "");
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <Section id={SECTION_IDS.faq}>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <ul className="flex flex-col gap-3">
          {faqItems.map((item, index) => {
            const isOpen = openItem === item.id;
            const triggerId = `${instanceId}-${item.id}-trigger`;
            const panelId = `${instanceId}-${item.id}-panel`;

            return (
              <li key={item.id}>
                <Reveal index={Math.min(index, 3)}>
                  <div
                    className={cn(
                      "rounded-card border bg-surface transition-colors duration-200",
                      isOpen ? "border-line-strong" : "border-line",
                    )}
                  >
                    <h3>
                      <button
                        id={triggerId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenItem((current) =>
                            current === item.id ? null : item.id,
                          )
                        }
                        className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-card px-5 py-4 text-left font-semibold text-fg"
                      >
                        <span className="text-[0.9375rem] sm:text-base">
                          {t(`items.${item.id}.question`)}
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "size-5 shrink-0 text-fg-subtle transition-transform duration-[250ms]",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      aria-hidden={!isOpen}
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-[250ms] ease-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed text-fg-muted sm:text-[0.9375rem]">
                          {t(`items.${item.id}.answer`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
