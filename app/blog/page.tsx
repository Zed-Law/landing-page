import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getAllPosts, urlFor } from "@/sanity";

// Revalidate periodically so newly published posts appear without a redeploy.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Zed Law",
  description:
    "Legal insights and practical guides for founders and CXOs, from the team at Zed Law.",
};

function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navbar />
      <main className="flex-1 px-5 pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl">
          <header className="border-b border-line pb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-deep">
              Zed Law
            </p>
            <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">Blog</h1>
            <p className="mt-4 max-w-xl text-lg text-body">
              Legal insights and practical guides for founders and CXOs.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="mt-10 text-body">No posts published yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {posts.map((post) => (
                <li key={post._id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-4 py-8 sm:flex-row sm:items-center"
                  >
                    {post.mainImage ? (
                      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-line sm:h-24 sm:w-40">
                        <Image
                          src={urlFor(post.mainImage).width(640).fit("max").auto("format").url()}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 160px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      {post.publishedAt ? (
                        <time
                          dateTime={post.publishedAt}
                          className="text-xs font-medium uppercase tracking-wider text-muted"
                        >
                          {formatDate(post.publishedAt)}
                        </time>
                      ) : null}
                      <h2 className="mt-1.5 text-xl font-bold text-ink transition-colors group-hover:text-gold-deep">
                        {post.title}
                      </h2>
                      {post.excerpt ? (
                        <p className="mt-2 line-clamp-2 text-body">{post.excerpt}</p>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
