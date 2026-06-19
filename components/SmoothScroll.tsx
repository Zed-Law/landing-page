"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

// Page-wide smooth scrolling. `root` attaches Lenis to <html>, and
// `anchors` lets it intercept in-page #hash links (e.g. #book, #zed-plus)
// so they ease into place instead of jumping.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ anchors: true }}>
      {children}
    </ReactLenis>
  );
}
