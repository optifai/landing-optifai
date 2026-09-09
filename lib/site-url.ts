import "server-only";

/**
 * Canonical origin used by metadata, structured data, robots and the sitemap.
 *
 * Vercel exposes VERCEL_PROJECT_PRODUCTION_URL without a protocol. Keeping this
 * resolver server-only prevents that platform variable from leaking into a
 * client bundle.
 */

/**
 * Production domain. Used when nothing is configured explicitly, so a
 * production build can never advertise a `*.vercel.app` origin as canonical.
 */
export const PRODUCTION_SITE_URL = "https://www.optifai.com.py";

function resolveSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  // Preview deployments keep their own origin: their canonicals should point at
  // themselves rather than claim to be the production site.
  const isPreviewDeployment =
    !configuredUrl &&
    Boolean(process.env.VERCEL_ENV) &&
    process.env.VERCEL_ENV !== "production";
  const previewUrl = isPreviewDeployment
    ? process.env.VERCEL_URL?.trim() ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
    : undefined;

  const url = configuredUrl
    ? configuredUrl
    : previewUrl
      ? `https://${previewUrl}`
      : process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : PRODUCTION_SITE_URL;

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("Unsupported protocol");
    }
    return parsedUrl.origin;
  } catch {
    throw new Error(
      "Invalid site URL. NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL.",
    );
  }
}

export const siteUrl = resolveSiteUrl();
