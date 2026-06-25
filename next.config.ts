import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/6pehju2v/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/ref/:name",
        destination:
          "/?utm_source=referral&utm_medium=:name&utm_campaign=referral-program",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
