import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/legal-page";

const SECTIONS = [
  "data",
  "purpose",
  "sharing",
  "retention",
  "cookies",
  "rights",
  "contact",
  "changes",
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });

  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: t("title"),
    description: t("metaDescription"),
    // Kept out of the index so it never outranks the landing page itself.
    index: false,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalPage document="privacy" sections={SECTIONS} />;
}
