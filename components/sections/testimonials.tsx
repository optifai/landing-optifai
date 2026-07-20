import { useTranslations } from "next-intl";
import { MessagesSquare } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { testimonials } from "@/data/testimonials";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge, Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

/**
 * Testimonials.
 *
 * While `data/testimonials.ts` is empty this renders an honest empty state
 * instead of invented quotes. As soon as real entries are added the grid takes
 * over automatically; any entry still flagged `isPlaceholder` keeps a visible
 * badge so a draft can never pass as a real client quote.
 */
export function Testimonials() {
  const t = useTranslations("testimonials");

  if (testimonials.length === 0) {
    return (
      <Section id={SECTION_IDS.testimonials} tone="subtle">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-panel border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
            <span
              aria-hidden="true"
              className="grid size-12 place-items-center rounded-xl bg-surface-2 text-fg-subtle"
            >
              <MessagesSquare className="size-5" />
            </span>
            <h2 className="mt-5 text-xl">{t("emptyTitle")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {t("emptyDescription")}
            </p>
          </div>
        </Reveal>
      </Section>
    );
  }

  const ordered = [...testimonials].sort((a, b) => a.order - b.order);

  return (
    <Section id={SECTION_IDS.testimonials} tone="subtle">
      <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ordered.map((testimonial, index) => (
          <li key={testimonial.id} className="h-full">
            <Reveal index={index} className="h-full">
              <Card className="flex h-full flex-col p-6">
                {testimonial.isPlaceholder ? (
                  <Badge tone="warning" className="mb-4 self-start">
                    {t("placeholderBadge")}
                  </Badge>
                ) : null}

                <blockquote className="flex-1 text-sm leading-relaxed text-fg-muted">
                  “{testimonial.quote}”
                </blockquote>

                <footer className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-fg">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-fg-subtle">
                    {testimonial.role}
                    {testimonial.company ? ` · ${testimonial.company}` : null}
                  </p>
                </footer>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
