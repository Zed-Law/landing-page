import { SegmentsCarousel, type Segment } from "./SegmentsCarousel";

const segments: Segment[] = [
  {
    label: "Founders & startups",
    tab: "Founders",
    clause: "You’re raising your first round.",
    body: "Making your first hires, signing the contracts that matter. We get the deal done so you can keep building.",
  },
  {
    label: "Scaleups",
    tab: "Scaleups",
    clause: "You’ve outgrown generic legal support.",
    body: "But you balk at big-firm rates, rightly. Senior counsel on call for the decisions that move the business.",
  },
  {
    label: "In-house teams",
    tab: "In-house",
    clause: "You are the legal team.",
    body: "Extra capacity from lawyers who’ve sat where you sit. Overflow handled, judgement included, no ramp-up required.",
  },
];

// Hairline triptych — each audience led by a display-size identifying
// clause under a small-caps label, so the reader self-selects at a glance.
// Subgrid keeps the label / clause / body rows aligned across columns;
// columns fade up on scroll and draw a brass rule under the clause on hover.
// On mobile the triptych becomes a swipeable snap row behind audience tabs
// (see SegmentsCarousel).
export function Segments() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-12 sm:px-8 sm:pb-24 sm:pt-16">
        <h2 className="view-reveal max-w-3xl text-4xl leading-tight sm:text-5xl">
          Legal that starts with the outcome,{" "}
          <span className="text-muted">not the legal lecture.</span>
        </h2>

        <SegmentsCarousel segments={segments} />
      </div>
    </section>
  );
}
