"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Info } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SECTION_IDS } from "@/config/site";
import {
  serviceGoals,
  services,
  servicesWithNotes,
} from "@/data/services";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, IconPlate } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import {
  SnapCarouselControls,
  useSnapCarousel,
} from "@/components/ui/snap-carousel";

export function Services() {
  const t = useTranslations("services");
  const carouselLabel = t("carouselLabel");
  const {
    trackRef,
    syncPosition,
    handleKeyDown,
    move,
    canMovePrevious,
    canMoveNext,
    hasOverflow,
  } = useSnapCarousel(carouselLabel);

  return (
    <Section id={SECTION_IDS.services}>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div
        className="relative mt-14 min-w-0 max-w-full"
        role="region"
        aria-roledescription={t("carouselType")}
        aria-label={carouselLabel}
      >
        <div className="min-w-0 max-w-full overflow-hidden">
          <ul
            ref={trackRef}
            tabIndex={0}
            onScroll={syncPosition}
            onKeyDown={handleKeyDown}
            className="flex min-w-0 max-w-full snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] lg:items-stretch lg:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {serviceGoals.map((goal, index) => {
              const groupedServices = goal.serviceIds.map((serviceId) => {
                const service = services.find((item) => item.id === serviceId);
                if (!service) {
                  throw new Error(`Unknown service in goal group: ${serviceId}`);
                }
                return service;
              });

              return (
                <li
                  key={goal.id}
                  className="min-w-0 max-w-full shrink-0 snap-start basis-full sm:basis-[calc((100%-1rem)/1.5)] md:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
                >
                <Reveal index={index} className="lg:h-full">
                  <Card className="flex flex-col p-6 lg:h-full lg:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                      {t("goalLabel")}
                    </p>
                    <h3 className="mt-2 text-2xl">{t(`goals.${goal.id}`)}</h3>

                    <ul className="mt-6 flex flex-col gap-5">
                      {groupedServices.map((service) => {
                        const Icon = service.icon;
                        const hasNote = servicesWithNotes.some(
                          (id) => id === service.id,
                        );

                        return (
                          <li
                            key={service.id}
                            className="border-t border-line pt-5 first:border-t-0 first:pt-0"
                          >
                            <div className="flex items-start gap-3">
                              <IconPlate className="size-10 rounded-lg">
                                <Icon className="size-[1.1rem]" />
                              </IconPlate>
                              <div className="min-w-0">
                                <h4 className="text-base font-semibold">
                                  {t(`items.${service.id}.name`)}
                                </h4>
                                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                                  {t(`items.${service.id}.description`)}
                                </p>
                              </div>
                            </div>

                            {hasNote ? (
                              <p className="mt-3 flex items-start gap-2 rounded-lg bg-surface-2 px-3 py-2.5 text-xs leading-relaxed text-fg-muted">
                                <Info
                                  aria-hidden="true"
                                  className="mt-0.5 size-3.5 shrink-0 text-fg-subtle"
                                />
                                {t(`notes.${service.id}`)}
                              </p>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>

                    <Link
                      href={`/#${SECTION_IDS.contact}`}
                      className="group mt-7 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary lg:mt-auto lg:pt-7"
                    >
                      {t("consultGoal")}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                      <span className="sr-only">
                        : {t(`goals.${goal.id}`)}
                      </span>
                    </Link>
                  </Card>
                </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        <SnapCarouselControls
          previousLabel={t("previous")}
          nextLabel={t("next")}
          canMovePrevious={canMovePrevious}
          canMoveNext={canMoveNext}
          hasOverflow={hasOverflow}
          onPrevious={() => move(-1)}
          onNext={() => move(1)}
        />
      </div>
    </Section>
  );
}
