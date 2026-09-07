import type { MetadataRoute } from "next";
import { client } from "@/sanity";

// Regenerate hourly so a post published in Sanity reaches the sitemap without
// a redeploy. (The old next-sitemap setup only wrote the file at build time.)
export const revalidate = 3600;

const SITE_URL = "https://zed.law";

type SitemapPost = { slug: string; lastmod: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<SitemapPost[]>(
    `*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "lastmod": _updatedAt
    } | order(lastmod desc)`,
  );

  const newestPost = posts[0]?.lastmod;

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: newestPost ? new Date(newestPost) : new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.lastmod),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
