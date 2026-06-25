import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/react";

export const projectId = "6pehju2v";
export const dataset = "production";
export const apiVersion = "2024-08-01";

// Public, read-only client. The `production` dataset is world-readable, so no
// token is embedded in the frontend. `published` perspective hides drafts.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const builder = createImageUrlBuilder(client);

/** Build a CDN image URL from a Sanity image reference (mainImage, inline images). */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Intrinsic width/height for a Sanity image, parsed from the asset ref
 * (e.g. "image-<hash>-1600x900-webp"). Lets next/image reserve space and avoid
 * layout shift without an extra query for asset metadata.
 */
export function imageDimensions(
  source: SanityImageSource,
): { width: number; height: number } | undefined {
  let ref: string | undefined;
  if (typeof source === "string") {
    ref = source;
  } else if (source && typeof source === "object") {
    const s = source as { _ref?: string; asset?: { _ref?: string; _id?: string } };
    ref = s.asset?._ref ?? s.asset?._id ?? s._ref;
  }
  const match = ref ? /-(\d+)x(\d+)-/.exec(ref) : null;
  if (!match) return undefined;
  return { width: Number(match[1]), height: Number(match[2]) };
}

// --- Types ------------------------------------------------------------------

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string | null;
  excerpt: string | null;
  mainImage: SanityImageSource | null;
};

export type Post = PostListItem & {
  metaDescription: string | null;
  body: PortableTextBlock[] | null;
};

export type Referrer = {
  displayName: string;
  discount: number;
};

// --- Queries ----------------------------------------------------------------

const listFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage
`;

/** All published posts, newest first. */
export async function getAllPosts(): Promise<PostListItem[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${listFields} }`,
  );
}

/** A single post by slug, or null if not found. */
export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${listFields}, metaDescription, body }`,
    { slug },
  );
}

/** Every post slug, for generateStaticParams. */
export async function getPostSlugs(): Promise<string[]> {
  return client.fetch(`*[_type == "post" && defined(slug.current)].slug.current`);
}

/** A referrer by slug, or null if none matches. Used by the homepage referral chip. */
export async function getReferrer(slug: string): Promise<Referrer | null> {
  return client.fetch(
    `*[_type == "referrer" && slug.current == $slug][0] { displayName, discount }`,
    { slug },
  );
}
