import Image from "next/image";
import { useTranslations } from "next-intl";
import { SECTION_IDS } from "@/config/site";
import { clients } from "@/data/clients";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Clients() {
  const t = useTranslations("clients");

  // Nothing to show until real, authorised logos are published: the whole
  // section is omitted rather than rendering an empty placeholder.
  if (clients.length === 0) {
    return null;
  }

  return (
    <Section id={SECTION_IDS.clients}>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <Reveal className="mt-12">
        <div
          className="clients-marquee overflow-x-auto overscroll-x-contain pb-3 md:overflow-hidden"
          role="region"
          aria-label={t("carouselLabel")}
          tabIndex={0}
        >
          <div className="clients-track flex w-max gap-4">
            <ClientList />
            <div aria-hidden="true" className="hidden gap-4 md:flex">
              <ClientList duplicate />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function ClientList({ duplicate = false }: { duplicate?: boolean }) {
  const tCommon = useTranslations("common");

  return (
    <ul className="flex gap-4">
      {clients.map((client) => (
        <li
          key={`${duplicate ? "duplicate-" : ""}${client.name}`}
          className="flex h-24 w-48 shrink-0 items-center justify-center rounded-card border border-line bg-surface px-6 shadow-card"
        >
          {client.url && !duplicate ? (
            <a
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-12 w-full"
            >
              <Image
                src={client.logo}
                alt={client.alt}
                fill
                sizes="192px"
                className="object-contain"
              />
              <span className="sr-only"> {tCommon("opensInNewTab")}</span>
            </a>
          ) : (
            <div className="relative h-12 w-full">
              <Image
                src={client.logo}
                alt={duplicate ? "" : client.alt}
                fill
                sizes="192px"
                className="object-contain"
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
