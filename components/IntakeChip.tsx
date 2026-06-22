import { getIntakeStatus } from "@/lib/intake";

// Small inline pill above the hero CTAs, same date-based count as the
// floating widget, just without the dismiss/scroll behaviour.
export function IntakeChip() {
  const { spotsLeft, monthLabel } = getIntakeStatus();

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      Only {spotsLeft} spots remaining for {monthLabel}
    </div>
  );
}
