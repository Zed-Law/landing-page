import Link from "next/link";
import { ArrowIcon } from "./icons";

type Variant = "primary" | "primary-lift" | "gold" | "gold-solid" | "light" | "light-lift" | "ghost" | "outline-light";

const base =
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[2px] font-mono transition-colors duration-200";

const caps = "text-xs font-semibold uppercase tracking-[0.12em]";

const sizes = {
  md: "px-6 py-3",
  lg: "px-8 py-3.5 sm:text-sm",
};

const variants: Record<Variant, string> = {
  // Default CTA on light paper: solid ink, quiet lift on hover
  primary: `${caps} bg-ink text-paper hover:bg-ink-soft`,
  "primary-lift": `${caps} bg-ink text-paper hover:bg-ink-soft`,
  // The single brass moment — used very sparingly
  gold: `${caps} border border-accent-deep/40 text-ink hover:border-accent-deep`,
  // Solid brass fill — reserved for the one primary CTA on the page
  "gold-solid": `${caps} bg-accent-deep text-paper hover:bg-ink`,
  // On dark surfaces: ivory fill, brass tint on hover
  light: `${caps} bg-paper text-ink hover:bg-accent-soft`,
  "light-lift": `${caps} bg-paper text-ink hover:bg-accent-soft`,
  // Quiet typographic link — underline thickens to brass
  ghost:
    "text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-accent-deep !px-0 !py-0",
  // Hairline-bordered, for dark surfaces
  "outline-light": `${caps} border border-night-line text-night-ink hover:border-accent hover:text-white`,
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
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {withArrow ? (
        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  );
}
