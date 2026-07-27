import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
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
  const logoData = await readFile(
    join(process.cwd(), "public", "images", "logo-sin-fondo.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

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
        <div
          style={{
            display: "flex",
            padding: "18px 22px",
            borderRadius: 20,
            background: "#ffffff",
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              width: 380,
              height: 112,
              overflow: "hidden",
          }}
        >
            {/* ImageResponse renders plain img elements; next/image is not supported here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt=""
              width={720}
              height={720}
              style={{
                position: "absolute",
                width: 720,
                height: 720,
                left: -171,
                top: -305,
              }}
            />
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
