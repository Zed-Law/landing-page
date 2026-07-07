import { getIntakeStatus } from "@/lib/intake";

// Mono status line above the hero headline — month label in muted, the
// scarcity count in amber. Same date-based count as the floating widget.
export function IntakeChip() {
  const { spotsLeft, monthLabel } = getIntakeStatus();

  return (
    <p className="font-mono text-xs uppercase tracking-[0.14em]">
      <span className="text-muted">{monthLabel} intake — </span>
      <span className="text-accent">
        only {spotsLeft} spots remaining
      </span>
    </p>
  );
}
