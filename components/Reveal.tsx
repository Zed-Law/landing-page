"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// One-shot fade-up reveal (see [data-reveal] in globals.css). Children get a
// stagger index via the --i custom property; the observer disconnects after
// the first intersection so the page settles and stays settled.
//
// The huge top rootMargin makes everything ABOVE the viewport count as
// intersecting, so content skipped by anchor jumps or scroll restoration
// reveals instead of staying invisible.
export function Reveal({
  children,
  className = "",
  index = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "section" | "header" | "footer" | "li" | "figure";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "100000px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal={shown ? "in" : ""}
      style={{ "--i": index } as CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
