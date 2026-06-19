import {
  RocketIcon,
  ChartIcon,
  BuildingIcon,
  CheckIcon,
  ArrowIcon,
} from "../icons";
import BorderGlow from "../BorderGlow";

const cardChrome =
  "w-full rounded-xl bg-white p-4 sm:p-5 ring-1 ring-line";

function FoundersGraphic() {
  const avatars = [
    { l: "A", c: "bg-ink text-white" },
    { l: "M", c: "bg-slate-500 text-white" },
    { l: "K", c: "bg-slate-300 text-ink" },
  ];
  return (
    <div className="flex h-full w-full items-center justify-center p-7 sm:p-5">
      <div className={`relative ${cardChrome}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Term Sheet</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">
            <CheckIcon className="h-3 w-3" /> Signed
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-2 w-full rounded-full bg-slate-200" />
          <div className="h-2 w-11/12 rounded-full bg-slate-200" />
          <div className="h-2 w-2/3 rounded-full bg-slate-200" />
        </div>

        <div className="my-4 border-t border-dashed border-line" />

        <span className="text-[10px] font-semibold tracking-[0.12em] text-muted">
          SIGNATURE
        </span>
        <svg
          className="mt-1 h-7 w-24 text-ink sm:w-28"
          viewBox="0 0 120 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 18 C 8 6, 16 6, 22 16 S 36 26, 44 14 S 60 4, 70 16 S 90 24, 98 12 S 112 6, 118 14"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute bottom-4 right-4 flex -space-x-2 sm:bottom-5 sm:right-5">
          {avatars.map(({ l, c }) => (
            <span
              key={l}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ring-2 ring-white sm:h-7 sm:w-7 ${c}`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScaleupsGraphic() {
  const bars = [38, 50, 42, 64, 76, 100];
  return (
    <div className="flex h-full w-full items-center justify-center p-7 sm:p-5">
      <div className={cardChrome}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Growth</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-semibold text-ink ring-1 ring-line">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" /> Counsel on call
          </span>
        </div>

        <div className="mt-5 flex h-24 items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-md ${
                i === bars.length - 1 ? "bg-ink" : "bg-slate-200"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        <div className="mt-2.5 flex justify-between text-[11px] font-medium text-muted">
          <span>Seed</span>
          <span>Series B</span>
        </div>
      </div>
    </div>
  );
}

function InHouseGraphic() {
  return (
    <div className="flex h-full w-full items-center justify-center p-7 sm:p-5">
      <div className={`flex items-center gap-2.5 sm:gap-3 ${cardChrome}`}>
        <div className="min-w-0 flex-1 rounded-lg border border-dashed border-line p-2.5 sm:p-3">
          <span className="text-[10px] font-semibold tracking-[0.12em] text-muted">
            OVERFLOW
          </span>
          <div className="mt-3 space-y-2">
            <div className="h-3 rounded-md bg-surface-alt ring-1 ring-line" />
            <div className="h-3 rounded-md bg-surface-alt ring-1 ring-line" />
            <div className="h-3 w-5/6 rounded-md bg-surface-alt ring-1 ring-line" />
          </div>
        </div>

        <ArrowIcon className="h-4 w-4 shrink-0 text-muted" />

        <div className="min-w-0 flex-1 rounded-lg bg-white p-2.5 ring-1 ring-line shadow-[0_10px_28px_-22px_rgba(3,20,40,0.6)] sm:p-3">
          <span className="text-[10px] font-semibold tracking-[0.12em] text-muted">
            HANDLED
          </span>
          <div className="mt-3 space-y-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-md bg-ink px-1.5 py-1.5"
              >
                <CheckIcon className="h-3 w-3 shrink-0 text-white" />
                <div className="h-1.5 flex-1 rounded-full bg-white/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
