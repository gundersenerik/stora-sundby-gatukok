import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://www.google.com https://maps.google.com;",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Preserve old WordPress URLs
      {
        source: "/menu",
        destination: "/meny",
        permanent: true,
      },
      // Redirect old order page to menu
      {
        source: "/bestall",
        destination: "/meny",
        permanent: true,
      },
      {
        source: "/en/order",
        destination: "/en/menu",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
