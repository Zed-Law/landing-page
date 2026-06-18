import type { CSSProperties } from "react";
import "./ShinyText.css";

type ShinyTextProps = {
  /** The text to render with the moving shine. */
  text: string;
  className?: string;
  /** Base (resting) colour of the text. */
  color?: string;
  /** Colour of the highlight that sweeps across. */
  shineColor?: string;
  /** Duration of one shine pass, in seconds. */
  speed?: number;
  /** Angle (deg) of the gradient spread. */
  spread?: number;
};

/**
 * Clipped-gradient "shine" text — a single highlight band sweeps across the
 * glyphs on a loop. CSS-only (the animation is a background-position keyframe
 * in ShinyText.css), so it needs no animation library and no client boundary.
 * Font, weight, tracking and casing are inherited from the parent element.
 */
export function ShinyText({
  text,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  speed = 3,
  spread = 120,
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={
        {
          "--shiny-duration": `${speed}s`,
          backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        } as CSSProperties
      }
    >
      {text}
    </span>
  );
}

export default ShinyText;
