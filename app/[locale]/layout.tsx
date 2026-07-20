import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { siteUrl } from "@/lib/site-url";
import { AppThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import "../globals.css";

/**
 * Two variable fonts, self-hosted by next/font — no render-blocking request to
 * Google and no layout shift. Only the weights actually used are requested.
 */
const body = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8fd" },
    { media: "(prefers-color-scheme: dark)", color: "#050b18" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(siteUrl),
    // Pages that set their own title get the suffix; the home page overrides
    // `title` entirely with its own absolute string.
    title: {
      default: t("title"),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("description"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opts the whole subtree into static rendering.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      // next-themes writes the theme class here before hydration, so React must
      // be told not to treat the difference as a mismatch.
      suppressHydrationWarning
      className={`${body.variable} ${display.variable}`}
    >
      <head>
        {/* Scroll-reveal wrappers are server-rendered at opacity 0 and faded in
            by Motion. Without JavaScript that never happens, so force them
            visible — the page must be fully readable either way. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <NextIntlClientProvider>
          <AppThemeProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </AppThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
