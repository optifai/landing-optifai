import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/legal-page";

const SECTIONS = [
  "scope",
  "quotes",
  "services",
  "ip",
  "thirdParty",
  "liability",
  "links",
  "law",
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
  const t = await getTranslations({ locale, namespace: "legal.terms" });

  return buildPageMetadata({
    locale,
    path: "/terms",
    title: t("title"),
    description: t("metaDescription"),
    index: false,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalPage document="terms" sections={SECTIONS} />;
}
