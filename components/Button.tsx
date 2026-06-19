import Link from "next/link";
import { ArrowIcon } from "./icons";

type Variant = "primary" | "primary-lift" | "gold" | "light" | "light-lift" | "ghost" | "outline-light";

const base =
  "group inline-flex items-center gap-2.5 rounded-[12px] font-medium transition-all duration-200 whitespace-nowrap";

const sizes = {
  md: "pl-5 pr-2 py-2 text-sm",
  lg: "pl-7 pr-2.5 py-2.5 text-base",
};

const variants: Record<Variant, string> = {
  // Default CTA: deep ink with gold fill on hover
  primary: "relative overflow-hidden bg-ink text-white hover:text-ink btn-gold-fill",
  // On gold backgrounds — border lifts instead of fill sweep
  "primary-lift": "bg-ink text-white border border-transparent hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.35)] hover:border-ink/20",
  // The single gold moment — used very sparingly
  gold: "gold-gradient text-ink hover:brightness-105 shadow-[0_8px_30px_-8px_rgba(226,162,60,0.6)]",
  // For dark backgrounds — gold gradient sweeps in left-to-right on hover
  light: "relative overflow-hidden bg-white text-ink btn-gold-fill",
  // On gold backgrounds — border lifts instead of fill sweep
  "light-lift": "bg-white text-ink border border-transparent hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.2)] hover:border-white/60",
  // Quiet link-style button
  ghost: "text-ink hover:text-body pr-5",
  "outline-light": "border border-white/25 text-white hover:bg-white/10 pr-5",
};

const chipColors: Record<Variant, string> = {
  primary: "bg-white/15 text-white group-hover:bg-ink/15 group-hover:text-ink",
  "primary-lift": "bg-white/15 text-white",
  gold: "bg-ink/15 text-ink",
  light: "bg-ink text-white",
  "light-lift": "bg-ink text-white",
  ghost: "bg-ink text-white",
  "outline-light": "bg-white text-ink",
};

export function Button({
  children,
  href = "#book",
  variant = "primary",
  size = "md",
  withArrow = true,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: "md" | "lg";
  withArrow?: boolean;
  className?: string;
}) {
  const showChip = withArrow && variant !== "ghost" && variant !== "outline-light";
  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {showChip ? (
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg transition-transform duration-200 group-hover:translate-x-0.5 ${chipColors[variant]}`}
        >
          <ArrowIcon className="h-3.5 w-3.5" />
        </span>
      ) : withArrow ? (
        <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  );
}
