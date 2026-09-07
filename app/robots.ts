import type { MetadataRoute } from "next";

// Previously generated into ./public by next-sitemap's postbuild step.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://zed.law/sitemap.xml",
    host: "https://zed.law",
  };
}
