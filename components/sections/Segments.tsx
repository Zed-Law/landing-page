import { Reveal } from "../Reveal";

const segments = [
  {
    label: "Founders & startups",
    body: "Raising a round, making your first hires, signing the contracts that matter. We get the deal done so you can keep building.",
  },
  {
    label: "Scaleups",
    body: "You've outgrown generic legal support but balk at big-firm rates, rightly. Senior counsel on call for the decisions that move the business.",
  },
  {
    label: "In-house teams",
    body: "Extra capacity from lawyers who've sat where you sit. Overflow handled, judgement included, no ramp-up required.",
  },
];

// Nakatomi's partnership blocks, flattened to full-width hairline rows:
// big display label left, working copy right.
export function Segments() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <Reveal>
          <h2 className="max-w-4xl text-display-s font-extrabold uppercase text-ink">
            Legal that starts with the{" "}
            <span className="text-accent">outcome,</span> not the legal
            lecture.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-body sm:text-lg">
            We ask what you&apos;re trying to achieve, then work back to the
            cleanest legal path that gets you there. Whatever stage you&apos;re
            at, the advice connects to a business decision.
          </p>
        </Reveal>

        <div className="mt-16">
          {segments.map(({ label, body }, i) => (
            <Reveal
              key={label}
              index={i}
              className="grid gap-4 border-t border-line py-10 last:border-b sm:grid-cols-[1.2fr_1fr] sm:gap-10 sm:py-12"
            >
              <h3 className="font-display text-2xl font-medium uppercase leading-tight text-ink sm:text-4xl">
                {label}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-body">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
