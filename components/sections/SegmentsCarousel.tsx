"use client";

import * as React from "react";

export type Segment = {
  label: string;
  tab: string;
  clause: string;
  body: string;
};

// Mobile: horizontal snap row — the same side-by-side triptych as desktop,
// swiped instead of stacked. A tab row above names all three audiences up
// front (so nobody reads the first card as the whole story) and doubles as
// the swipe affordance: the active label tracks the scroll position, and
// tapping a label snaps to its card. From md up this renders the original
// subgrid triptych and the tabs disappear.
export function SegmentsCarousel({ segments }: { segments: Segment[] }) {
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

  // Whether the row is actually a horizontal scroller (<md). Lenis must not
  // intercept wheel events over it there, but from md up the row is a static
  // grid — leaving data-lenis-prevent on would hand wheel events back to
  // native scrolling, which fights any in-flight Lenis animation and makes
  // the page judder in place.
  const [isScroller, setIsScroller] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    const update = () => setIsScroller(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Nearest card to the current scroll offset, measured against the first
  // card's resting position so container padding cancels out.
  const onScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const cards = Array.from(row.children) as HTMLElement[];
    if (!cards.length) return;
    let nearest = 0;
    let best = Infinity;
    cards.forEach((card, i) => {
      const d = Math.abs(card.offsetLeft - cards[0].offsetLeft - row.scrollLeft);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  const scrollToCard = (i: number) => {
    const row = rowRef.current;
    if (!row) return;
    const cards = Array.from(row.children) as HTMLElement[];
    const card = cards[i];
    if (!card) return;
    // Highlight immediately rather than waiting for scroll events to
    // catch up with the smooth scroll.
    setActive(i);
    row.scrollTo({
      left: card.offsetLeft - cards[0].offsetLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-10 sm:mt-16">
      {/* Audience tabs — mobile only */}
      <div
        role="tablist"
        aria-label="Audiences"
        className="flex items-center gap-x-6 md:hidden"
      >
        {segments.map((s, i) => (
          <button
            key={s.tab}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => scrollToCard(i)}
            className={`border-b pb-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${
              i === active
                ? "border-accent-deep text-ink"
                : "border-transparent text-muted"
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>

      {/* Bleeds to the viewport edge so cards scroll under the section
          padding; the next card peeking in from the right edge. */}
      <div className="-mx-5 mt-6 sm:-mx-8 md:mx-0 md:mt-0">
        <div
          ref={rowRef}
          onScroll={onScroll}
          // Root Lenis would otherwise intercept wheel events over the row
          // and scroll the page instead of the carousel.
          {...(isScroller ? { "data-lenis-prevent": "" } : {})}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 md:grid md:grid-cols-3 md:gap-0 md:divide-x md:divide-line md:overflow-visible md:px-0"
          style={{ scrollPaddingInline: "1.25rem" }}
        >
          {segments.map(({ label, clause, body }, i) => (
            <div
              key={label}
              style={{ "--i": i } as React.CSSProperties}
              className={`view-reveal-md group w-[80%] shrink-0 snap-start border-t border-line pt-6 md:row-span-3 md:grid md:w-auto md:shrink md:grid-rows-subgrid md:border-t-0 md:pt-0 ${
                i === 0
                  ? "md:pr-10"
                  : i === segments.length - 1
                    ? "md:pl-10"
                    : "md:px-10"
              }`}
            >
              {/* The tab row already names the audience on mobile */}
              <p className="hidden font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted md:block">
                {label}
              </p>
              <h3 className="mt-1 text-2xl leading-snug after:mt-3 after:block after:h-px after:origin-left after:scale-x-0 after:bg-accent-deep after:transition-transform after:duration-300 group-hover:after:scale-x-100 motion-reduce:after:transition-none sm:text-3xl md:mt-4">
                {clause}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-body">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
