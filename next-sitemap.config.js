/**
 * next-sitemap config. Runs after `next build` via the `postbuild` script and
 * writes sitemap.xml (+ robots.txt) into ./public, served at /sitemap.xml.
 *
 * Blog post pages are dynamic (sourced from Sanity), so they're added
 * explicitly from the Sanity query API in `additionalPaths` — with a real
 * `lastmod` per post — and excluded from filesystem discovery to avoid dupes.
 *
 * @type {import('next-sitemap').IConfig}
 */
const siteUrl = process.env.SITE_URL || "https://zed.law";

const PROJECT_ID = "6pehju2v";
const DATASET = "production";
const API_VERSION = "2024-08-01";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/blog/*"],
  additionalPaths: async (config) => {
    const query = encodeURIComponent(
      `*[_type == "post" && defined(slug.current)]{"slug": slug.current, "lastmod": _updatedAt} | order(lastmod desc)`,
    );
    const res = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch blog slugs from Sanity: ${res.status}`);
    }
    const { result } = await res.json();
    return Promise.all(
      (result || []).map(async (post) => ({
        ...(await config.transform(config, `/blog/${post.slug}`)),
        lastmod: post.lastmod,
      })),
    );
  },
};
