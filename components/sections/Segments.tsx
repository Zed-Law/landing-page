const segments = [
  {
    label: "Founders & startups",
    clause: "You’re raising your first round.",
    body: "Making your first hires, signing the contracts that matter. We get the deal done so you can keep building.",
  },
  {
    label: "Scaleups",
    clause: "You’ve outgrown generic legal support.",
    body: "But you balk at big-firm rates, rightly. Senior counsel on call for the decisions that move the business.",
  },
  {
    label: "In-house teams",
    clause: "You are the legal team.",
    body: "Extra capacity from lawyers who’ve sat where you sit. Overflow handled, judgement included, no ramp-up required.",
  },
];

// Hairline triptych — each audience led by a display-size identifying
// clause under a small-caps label, so the reader self-selects at a glance.
// Subgrid keeps the label / clause / body rows aligned across columns;
// columns fade up on scroll and draw a brass rule under the clause on hover.
export function Segments() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
        <h2 className="max-w-3xl text-4xl leading-tight sm:text-5xl">
          Legal that starts with the outcome,{" "}
          <span className="text-muted">not the legal lecture.</span>
        </h2>

        <div className="mt-16 grid gap-y-10 md:grid-cols-3 md:gap-y-0 md:divide-x md:divide-line">
          {segments.map(({ label, clause, body }, i) => (
            <div
              key={label}
              style={{ "--i": i } as React.CSSProperties}
              className={`view-reveal group border-t border-line pt-6 md:grid md:grid-rows-subgrid md:row-span-3 md:border-t-0 md:pt-0 ${
                i === 0 ? "md:pr-10" : i === segments.length - 1 ? "md:pl-10" : "md:px-10"
              }`}
            >
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
                {label}
              </p>
              <h3 className="mt-4 text-2xl leading-snug after:mt-3 after:block after:h-px after:origin-left after:scale-x-0 after:bg-accent-deep after:transition-transform after:duration-300 group-hover:after:scale-x-100 motion-reduce:after:transition-none sm:text-3xl">
                {clause}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-body">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
