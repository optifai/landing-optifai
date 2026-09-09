import { useFormatter, useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig, LEGAL_LAST_UPDATED } from "@/config/site";

interface LegalPageProps {
  /** `privacy` or `terms` — resolves copy under `legal.<document>`. */
  document: "privacy" | "terms";
  sections: readonly string[];
}

/**
 * Shared shell for the two legal pages: same structure, different copy.
 */
export function LegalPage({ document, sections }: LegalPageProps) {
  const t = useTranslations(`legal.${document}`);
  const tLegal = useTranslations("legal");
  const format = useFormatter();

  return (
    <article className="container-page py-28 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-primary"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {tLegal("backHome")}
        </Link>

        <h1 className="mt-6 text-3xl sm:text-4xl">{t("title")}</h1>

        <p className="mt-3 text-sm text-fg-subtle">
          {tLegal("lastUpdated", {
            date: format.dateTime(new Date(LEGAL_LAST_UPDATED), {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          })}
        </p>

        <p className="mt-8 text-base leading-relaxed text-fg-muted">
          {t("intro")}
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <section key={section}>
              <h2 className="text-xl">{t(`sections.${section}.title`)}</h2>
              <p className="mt-3 leading-relaxed text-fg-muted">
                {/* `email` is only consumed by the privacy contact section;
                    passing it everywhere is harmless and keeps this generic. */}
                {t(`sections.${section}.body`, {
                  email: siteConfig.contact.email,
                })}
              </p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
