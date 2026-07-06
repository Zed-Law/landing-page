const segments = [
  {
    label: "Founders & startups",
    body: "Raising a round, making your first hires, signing the contracts that matter. We get the deal done so you can keep building.",
  },
  {
    label: "Scaleups",
    body: "You’ve outgrown generic legal support but balk at big-firm rates, rightly. Senior counsel on call for the decisions that move the business.",
  },
  {
    label: "In-house teams",
    body: "Extra capacity from lawyers who’ve sat where you sit. Overflow handled, judgement included, no ramp-up required.",
  },
];

// Hairline triptych — three audiences divided by rules, no cards, no icons.
export function Segments() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
        <div className="max-w-3xl">
          <h2 className="text-4xl leading-tight sm:text-5xl">
            Legal that starts with the outcome,{" "}
            <span className="text-muted">not the legal lecture.</span>
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg text-body">
            We ask what you&apos;re trying to achieve, then work back to the
            cleanest legal path that gets you there. Whatever stage you&apos;re
            at, the advice connects to a business decision.
          </p>
        </div>

        <div className="mt-16 grid gap-y-10 md:grid-cols-3 md:gap-y-0 md:divide-x md:divide-line">
          {segments.map(({ label, body }, i) => (
            <div
              key={label}
              className={`border-t border-line pt-6 md:border-t-0 md:pt-0 ${
                i === 0 ? "md:pr-10" : i === segments.length - 1 ? "md:pl-10" : "md:px-10"
              }`}
            >
              <h3 className="text-2xl">{label}</h3>
              <p className="mt-3 text-base leading-relaxed text-body">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
