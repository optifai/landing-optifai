import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

/**
 * Social preview card, rendered at build time — no design asset to maintain and
 * nothing fetched from the network. One image per locale, so a link shared in
 * English previews in English.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// `alt` has to be a static export, so it covers both locales.
export const alt =
  "OptifAI — Desarrollo web y software a medida · Custom web and software development";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #050b18 0%, #0d2a63 62%, #0b6f8c 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #3b82f6, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "#04101f",
            }}
          >
            O
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#ffffff" }}>
            Optif
            <span style={{ color: "#22d3ee" }}>AI</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              lineHeight: 1.15,
              fontWeight: 800,
              color: "#ffffff",
              maxWidth: 900,
            }}
          >
            {`${t("titleLead")} ${t("titleAccent")}`}
          </div>
          <div style={{ display: "flex", width: 120, height: 6, background: "#22d3ee" }} />
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.72)" }}>
          {`${siteConfig.location.city}, ${siteConfig.location.country}`}
        </div>
      </div>
    ),
    size,
  );
}
