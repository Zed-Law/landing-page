import { RocketIcon, ChartIcon, BuildingIcon } from "../icons";
import BorderGlow from "../BorderGlow";
import { FoundersGraphic } from "./FoundersGraphic";
import { ScaleupsGraphic } from "./ScaleupsGraphic";
import { InHouseGraphic } from "./InHouseGraphic";

const segments = [
  {
    icon: RocketIcon,
    graphic: FoundersGraphic,
    label: "Founders & startups",
    body: "Raising a round, making your first hires, signing the contracts that matter. We get the deal done so you can keep building.",
  },
  {
    icon: ChartIcon,
    graphic: ScaleupsGraphic,
    label: "Scaleups",
    body: "You've outgrown generic legal support but balk at big-firm rates, rightly. Senior counsel on call for the decisions that move the business.",
  },
  {
    icon: BuildingIcon,
    graphic: InHouseGraphic,
    label: "In-house teams",
    body: "Extra capacity from lawyers who've sat where you sit. Overflow handled, judgement included, no ramp-up required.",
  },
];

export function Segments() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
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
          {segments.map(({ icon: Icon, graphic: Graphic, label, body }) => (
            <BorderGlow
              key={label}
              className="glow-desktop-off"
              borderRadius={20}
              glowRadius={28}
              glowIntensity={1.15}
              edgeSensitivity={22}
            >
              <div className="p-2">
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-surface-alt md:bg-transparent">
                  <Graphic />
                </div>
                <div className="px-4 pb-5 pt-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-bold text-ink">{label}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-body">
                    {body}
                  </p>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
