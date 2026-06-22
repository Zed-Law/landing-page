// Deterministic, date-based "spots remaining" counter for the intake widget.
// No storage and no manual updates: every client and server resolves the same
// value purely from today's date, so it never drifts and never needs touching.

const TOTAL_SPOTS = 8;
const STARTING_SPOTS = 3;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Cheap deterministic hash so the "drop day" varies per month without
// feeling mechanical, but is stable for everyone viewing in that month.
function hashMonth(year: number, month: number) {
  const n = year * 12 + month;
  let h = n * 2654435761;
  h = (h ^ (h >>> 13)) * 2246822519;
  h = (h ^ (h >>> 15)) >>> 0;
  return h;
}

export type IntakeStatus = {
  spotsLeft: number;
  totalSpots: number;
  monthLabel: string;
};

export function getIntakeStatus(now: Date = new Date()): IntakeStatus {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  // Drop day lands somewhere between the 9th and the 21st, picked per month.
  const dropDay = 9 + (hashMonth(year, month) % 13);

  const spotsLeft = day >= dropDay ? STARTING_SPOTS - 1 : STARTING_SPOTS;

  return {
    spotsLeft,
    totalSpots: TOTAL_SPOTS,
    monthLabel: MONTH_NAMES[month],
  };
}
