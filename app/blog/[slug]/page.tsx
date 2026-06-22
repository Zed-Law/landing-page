import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { portableComponents } from "@/components/portableComponents";
import { getPost, getPostSlugs, imageDimensions, urlFor } from "@/sanity";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  // metaDescription is the SEO field; fall back to the excerpt if it's unset.
  const description = post.metaDescription ?? post.excerpt ?? undefined;
  return {
    title: post.title,
    description,
  };
}

function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const mainDims = post.mainImage ? imageDimensions(post.mainImage) : undefined;

  return (
    <>
      <Navbar />
      <main className="flex-1 px-5 pb-24 pt-32 sm:pt-40">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            ← Back to blog
          </Link>

          <header className="mt-6">
            {post.publishedAt ? (
              <time
                dateTime={post.publishedAt}
                className="text-xs font-medium uppercase tracking-wider text-gold-deep"
              >
                {formatDate(post.publishedAt)}
              </time>
            ) : null}
            <h1 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {post.title}
            </h1>
          </header>

          {post.mainImage && mainDims ? (
            <Image
              src={urlFor(post.mainImage).width(1600).fit("max").auto("format").url()}
              alt=""
              width={mainDims.width}
              height={mainDims.height}
              sizes="(min-width: 768px) 42rem, 100vw"
              priority
              className="mt-8 h-auto w-full rounded-2xl border border-line"
            />
          ) : null}

          <div className="mt-8">
            <PortableText value={post.body ?? []} components={portableComponents} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
