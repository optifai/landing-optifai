import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** Single canonical host. Everything else redirects here, path intact. */
const CANONICAL_ORIGIN = "https://www.optifai.com.py";

/**
 * Hosts that must not serve content of their own: the retired `optifai.net`
 * domain and the apex of the current one. They only redirect, so search
 * engines see a single indexable origin.
 *
 * These rules only fire for requests that actually reach this deployment, so
 * each host still has to point at it (DNS + the hosting provider's domain
 * settings). See the README.
 */
const LEGACY_HOSTS = [
  "optifai.net",
  "www.optifai.net",
  "optifai.com.py",
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Only local assets are used, so no remote patterns are required.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return LEGACY_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${CANONICAL_ORIGIN}/:path*`,
      // 301 rather than Next's default 308: the classic permanent redirect
      // search engines have always understood for a domain move.
      statusCode: 301,
    }));
  },
};

export default withNextIntl(nextConfig);
