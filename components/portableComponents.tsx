import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { imageDimensions, urlFor } from "@/sanity";

// Renders Portable Text from Sanity into brand-styled HTML. Used by the blog
// post page. Server-safe (no "use client") — @portabletext/react renders in RSC.
export const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-[1.0625rem] leading-8 text-body">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-bold text-ink sm:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-xl font-bold text-ink sm:text-2xl">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 text-lg font-bold text-ink">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-gold pl-5 text-lg italic text-ink-soft">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-[1.0625rem] leading-8 text-body marker:text-gold-deep">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-8 text-body marker:text-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="font-medium text-gold-deep underline decoration-gold/40 underline-offset-2 transition-colors hover:text-ink"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const dims = imageDimensions(value);
      if (!dims) return null;
      return (
        <Image
          src={urlFor(value).width(1600).fit("max").auto("format").url()}
          alt={value.alt ?? ""}
          width={dims.width}
          height={dims.height}
          sizes="(min-width: 768px) 42rem, 100vw"
          className="mt-8 h-auto w-full rounded-2xl border border-line"
        />
      );
    },
  },
};
