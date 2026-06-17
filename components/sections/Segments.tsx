import { RocketIcon, ChartIcon, BuildingIcon } from "../icons";


const segments = [
  {
    icon: RocketIcon,
    label: "Founders & startups",
    body: "Raising a round, making your first hires, signing the contracts that matter. We get the deal done so you can keep building.",
  },
  {
    icon: ChartIcon,
    label: "Scaleups",
    body: "You've outgrown generic legal support but balk at big-firm rates, rightly. Senior counsel on call for the decisions that move the business.",
  },
  {
    icon: BuildingIcon,
    label: "In-house teams",
    body: "Extra capacity from lawyers who've sat where you sit. Overflow handled, judgement included, no ramp-up required.",
  },
];

export function Segments() {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-[2.6rem]">
            Legal that starts with the outcome,{" "}
            <br />
            <span className="text-muted">not the legal lecture.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-body">
            We ask what you&apos;re trying to achieve, then work back to the
            cleanest legal path that gets you there. Whatever stage you&apos;re
            at, the advice connects to a business decision.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {segments.map(({ icon: Icon, label, body }) => (
            <div
              key={label}
              className="group rounded-2xl border border-line bg-white p-2 transition-shadow hover:shadow-[0_24px_60px_-40px_rgba(3,20,40,0.3)]"
            >
              {/* Placeholder graphic */}
              <div className="flex aspect-[16/10] items-center justify-center rounded-xl bg-surface-alt">
                <span className="text-xs font-medium text-muted">
                  [ Graphic placeholder ]
                </span>
              </div>
              <div className="px-4 pb-5 pt-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold text-ink">{label}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-body">{body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
