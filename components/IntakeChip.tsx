import { getIntakeStatus } from "@/lib/intake";

// Small inline tag beside the hero CTAs, same date-based count as the
// floating widget, just without the dismiss/scroll behaviour.
export function IntakeChip() {
  const { spotsLeft, monthLabel } = getIntakeStatus();

  return (
    <div className="inline-flex items-center gap-2.5 rounded-[2px] border border-line bg-paper-2 px-4 py-1.5 text-sm text-body">
      <span className="h-1.5 w-1.5 rounded-full bg-accent-deep" />
      Only {spotsLeft} spots remaining for {monthLabel}
    </div>
  );
}
