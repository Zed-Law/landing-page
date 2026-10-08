import Image from "next/image";
import { urlFor, type Author } from "@/sanity";

// Closes the article body, above the CTA. Renders nothing when the post has no
// author reference — several older imported posts don't have one.
export function AuthorByline({ author }: { author: Author | null }) {
  if (!author?.name) return null;

  return (
    <div className="mt-14 flex items-center gap-4 border-t border-line pt-8">
      {author.image ? (
        <Image
          src={urlFor(author.image).width(112).height(112).fit("crop").auto("format").url()}
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full border border-line object-cover"
        />
      ) : null}
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-gold-deep">
          Written by
        </p>
        <p className="mt-1.5 text-lg font-bold text-ink">{author.name}</p>
        {author.bio ? <p className="mt-0.5 text-body">{author.bio}</p> : null}
      </div>
    </div>
  );
}
