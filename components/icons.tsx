type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.5l2.6 6.3 6.8.5-5.2 4.4 1.6 6.6L12 17.3 6.2 20.8l1.6-6.6L2.6 9.8l6.8-.5z" />
    </svg>
  );
}

/* ---- Service icons ---- */

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="M5 6h14" />
      <path d="M7.5 5.5 4 13h7z" />
      <path d="M16.5 5.5 13 13h7z" />
    </svg>
  );
}

export function DocIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}

export function HandshakeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="m11 6 3 3 3-3 4 4-6 6-2-2" />
      <path d="m3 10 4-4 4 4-3 3a1.8 1.8 0 0 1-2.6 0L3 11" />
      <path d="m9 17 2 2 2-2" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
      <path d="M15 9h2a2 2 0 0 1 2 2v10" />
      <path d="M3 21h18" />
      <path d="M8 7h4M8 11h4M8 15h4" />
    </svg>
  );
}

export function ChartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 4v16h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6M20 16V6" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

export function GavelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="m14 6 4 4-5 5-4-4z" />
      <path d="m12.5 7.5 3 3" />
      <path d="m6 14 4 4-2 2-4-4z" />
      <path d="M14 20h7" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5" />
      <path d="M17 14a6 6 0 0 1 4 6" />
    </svg>
  );
}

export function RocketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 15c-1.5 1-2 4-2 4s3-.5 4-2" />
      <path d="M14 4c4 1 6 3 6 3s-1 6-6 11l-4-4C9 9 10 5 14 4z" />
      <circle cx="14.5" cy="9.5" r="1.4" />
    </svg>
  );
}
