import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.location.city}, ${siteConfig.location.country}`,
    short_name: siteConfig.name,
    description:
      "Desarrollo web y software a medida: sistemas, landing pages y tiendas online.",
    // The root redirects to the visitor's locale via middleware.
    start_url: `/${routing.defaultLocale}`,
    display: "standalone",
    background_color: "#050b18",
    theme_color: "#1d4ed8",
    lang: routing.defaultLocale,
    icons: [
      {
        // TEMPORARY: single SVG mark. Add 192px and 512px PNGs here once the
        // final logo exists, for platforms that don't accept SVG icons.
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
