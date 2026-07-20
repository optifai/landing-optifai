import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Only local assets are used, so no remote patterns are required.
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
