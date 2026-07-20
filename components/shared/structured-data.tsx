import { getTranslations } from "next-intl/server";
import { LOCALE_TAGS, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { siteUrl } from "@/lib/site-url";
import { services } from "@/data/services";
import { faqItems } from "@/data/faq";

/**
 * JSON-LD for the home page: the agency itself, the site, and the FAQ.
 *
 * `dangerouslySetInnerHTML` is the standard way to emit a JSON-LD script tag —
 * React would otherwise escape the JSON and break it. It is safe here because
 * the payload is `JSON.stringify` of values we control, never user input.
 *
 * Nothing unverifiable is declared: no street address, no rating, no review
 * count, no employee count, no founding date.
 */
export async function StructuredData({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tServices = await getTranslations({
    locale,
    namespace: "services.items",
  });
  const tFaq = await getTranslations({ locale, namespace: "faq.items" });

  const organisationId = `${siteUrl}/#organization`;

  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": organisationId,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: `${siteUrl}/${locale}`,
      description: t("description"),
      email: siteConfig.contact.email,
      telephone: `+${siteConfig.contact.whatsappInternational}`,
      sameAs: [siteConfig.contact.instagramUrl],
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressCountry: siteConfig.location.countryCode,
      },
      areaServed: [
        { "@type": "Country", name: siteConfig.location.country },
        { "@type": "Place", name: "Americas" },
      ],
      availableLanguage: [
        { "@type": "Language", name: "Spanish", alternateName: "es" },
        { "@type": "Language", name: "English", alternateName: "en" },
      ],
      knowsLanguage: ["es", "en"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: siteConfig.name,
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: tServices(`${service.id}.name`),
            description: tServices(`${service.id}.description`),
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/${locale}`,
      name: siteConfig.name,
      description: t("description"),
      inLanguage: LOCALE_TAGS[locale],
      publisher: { "@id": organisationId },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/${locale}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: tFaq(`${item.id}.question`),
        acceptedAnswer: {
          "@type": "Answer",
          text: tFaq(`${item.id}.answer`),
        },
      })),
    },
  ];

  const payload = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
