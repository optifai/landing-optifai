import "server-only";

/**
 * Canonical origin used by metadata, structured data, robots and the sitemap.
 *
 * Vercel exposes VERCEL_PROJECT_PRODUCTION_URL without a protocol. Keeping this
 * resolver server-only prevents that platform variable from leaking into a
 * client bundle.
 */
function resolveSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelProductionUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  const url = configuredUrl
    ? configuredUrl
    : vercelProductionUrl
      ? `https://${vercelProductionUrl}`
      : process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : undefined;

  if (!url) {
    throw new Error(
      "Missing site URL. Set NEXT_PUBLIC_SITE_URL for local production builds; Vercel provides VERCEL_PROJECT_PRODUCTION_URL when system environment variables are exposed.",
    );
  }

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
