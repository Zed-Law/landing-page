"use client";

import Grainient from "./Grainient";

/**
 * Our single gold accent, as an animated grainy gradient (Grainient).
 * Colours map to the design-system gold scale:
 *   soft #F8DCA0 → primary #F1BF65 → deep #E2A23C
 * Drop it in as an absolutely-positioned background layer behind content,
 * e.g. <GoldGradient className="absolute inset-0" />.
 */
export function GoldGradient({ className = "" }: { className?: string }) {
  return (
    <Grainient
      className={className}
      color1="#F8DCA0"
      color2="#F1BF65"
      color3="#E2A23C"
      timeSpeed={0.16}
      warpStrength={1.0}
      warpFrequency={4.0}
      warpAmplitude={60.0}
      blendSoftness={0.12}
      grainAmount={0.1}
      grainScale={2.0}
      contrast={1.2}
      saturation={1.05}
      zoom={0.9}
    />
  );
}
