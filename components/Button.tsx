import Link from "next/link";
import { ArrowIcon } from "./icons";

// CTA voice (design.md): mono uppercase label, near-square corners, one
// hover signal. Legacy variant names alias to the three current voices so
// untouched call sites keep working.
type Variant =
  | "primary"
  | "outline"
  | "ghost"
  // legacy aliases
  | "primary-lift"
  | "gold"
  | "light"
  | "light-lift"
  | "outline-light";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-btn font-mono text-xs font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-200 ease-out active:translate-y-px";

const sizes = {
  md: "px-5 py-3",
  lg: "px-7 py-4 text-sm",
};

const voices = {
  // Near-white fill; hover floods amber. The only filled affordance on the page.
  primary: "bg-ink text-paper hover:bg-accent",
  // Hairline border; hover shifts border + label to amber.
  outline:
    "border border-line text-ink hover:border-accent hover:text-accent",
  // Quiet text-only affordance.
  ghost: "text-body hover:text-ink",
};

const variantMap: Record<Variant, keyof typeof voices> = {
  primary: "primary",
  "primary-lift": "primary",
  gold: "primary",
  light: "primary",
  "light-lift": "primary",
  outline: "outline",
  "outline-light": "outline",
  ghost: "ghost",
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
  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${voices[variantMap[variant]]} ${className}`}
    >
      <span>{children}</span>
      {withArrow && (
        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
