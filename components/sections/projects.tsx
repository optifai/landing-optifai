import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink, GitBranch, Info } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SECTION_IDS } from "@/config/site";
import { sortedProjects } from "@/data/projects";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge, Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { buttonClasses } from "@/components/ui/button";
import { ProjectMockup } from "./project-mockup";

export function Projects() {
  const t = useTranslations("projects");
  const tCta = useTranslations("cta");
  const tCommon = useTranslations("common");

  const hasPlaceholders = sortedProjects.some((p) => p.isPlaceholder);

  return (
    <Section id={SECTION_IDS.projects} tone="subtle">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Stated plainly, above the cards: these are format examples, not work
          done for real clients. */}
      {hasPlaceholders ? (
        <Reveal className="mt-10">
          <p className="mx-auto flex max-w-3xl items-start gap-2.5 rounded-card border border-line-strong bg-surface px-5 py-4 text-sm leading-relaxed text-fg-muted">
            <Info
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-accent"
            />
            {t("placeholderNotice")}
          </p>
        </Reveal>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedProjects.map((project, index) => {
          const base = `items.${project.id}`;
          const name = t(`${base}.name`);

          return (
            <Reveal key={project.id} index={index} className="h-full">
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] border-b border-line bg-gradient-to-br from-surface-2 to-surface p-3">
                  <div className="h-full overflow-hidden rounded-lg border border-line bg-surface shadow-card">
                    <div
                      aria-hidden="true"
                      className="flex h-7 items-center gap-1.5 border-b border-line bg-surface-2 px-3"
                    >
                      <span className="size-1.5 rounded-full bg-line-strong" />
                      <span className="size-1.5 rounded-full bg-line-strong" />
                      <span className="size-1.5 rounded-full bg-line-strong" />
                      <span className="ml-1.5 h-1.5 w-16 rounded-full bg-line" />
                    </div>

                    <div className="relative h-[calc(100%-1.75rem)]">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={t("imageAlt", { name })}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-top"
                        />
                      ) : (
                        <ProjectMockup category={project.category} />
                      )}
                    </div>
                  </div>

                  {project.isPlaceholder ? (
                    <Badge
                      tone="warning"
                      className="absolute left-5 top-12 bg-surface/95 backdrop-blur-sm"
                    >
                      {t("placeholderBadge")}
                    </Badge>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {t(`categories.${project.category}`)}
                  </p>

                  <h3 className="mt-2 text-lg">{name}</h3>

                  <p className="mt-1 text-xs text-fg-subtle">
                    {t("clientLabel")}:{" "}
                    {project.client || t("clientPending")}
                  </p>

                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">
                        {t("problemLabel")}
                      </dt>
                      <dd className="mt-1 leading-relaxed text-fg-muted">
                        {t(`${base}.problem`)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">
                        {t("solutionLabel")}
                      </dt>
                      <dd className="mt-1 leading-relaxed text-fg-muted">
                        {t(`${base}.solution`)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-6">
                    {project.technologies.length > 0 ? (
                      <>
                        <p className="sr-only">{t("techLabel")}</p>
                        <ul className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <li key={tech}>
                              <Badge>{tech}</Badge>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    {project.url || project.repository ? (
                      <div className="mt-4 flex flex-wrap gap-4">
                        {project.url ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                          >
                            <ExternalLink
                              aria-hidden="true"
                              className="size-4"
                            />
                            {t("visitSite")}
                            <span className="sr-only">
                              : {name} {tCommon("opensInNewTab")}
                            </span>
                          </a>
                        ) : null}

                        {project.repository ? (
                          <a
                            href={project.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                          >
                            <GitBranch aria-hidden="true" className="size-4" />
                            {t("viewRepo")}
                            <span className="sr-only">
                              : {name} {tCommon("opensInNewTab")}
                            </span>
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-12">
        <div className="flex flex-col items-center gap-4 rounded-panel border border-line bg-surface px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="text-lg">{t("cta.title")}</h3>
            <p className="mt-1 text-sm text-fg-muted">{t("cta.description")}</p>
          </div>
          <Link
            href={`/#${SECTION_IDS.contact}`}
            className={buttonClasses("primary", "md", "group shrink-0")}
          >
            {tCta("budget")}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
