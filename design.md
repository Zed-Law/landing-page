# Design — Zed Law

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

Extracted DNA: nakatomi.com (public reference for the user's own brand,
2026-07-07) + user-supplied typography reference (black poster, huge uppercase
headline, white + amber). Rhythm axes were confirmed against the user's
screenshot; structure/motion read from nakatomi's HTML + CSS.

## Genre

atmospheric (dark, typographic, venture-studio energy)

## Macrostructure family

- Marketing pages: Marquee Hero · hybrid scroll-snap (`scroll-snap-type: y
  proximity` on `html`; `snap-start` on the hero and on 1–2 statement
  sections only — dense sections scroll freely)
- Content pages (blog): Long Document · no snap, same tokens

## Theme

- `--color-paper`    oklch(13.5% 0.008 80)  — warm near-black, never #000
- `--color-paper-2`  oklch(17.5% 0.010 80)  — elevated surfaces (cards, nav sheet)
- `--color-ink`      oklch(95.5% 0.007 90)  — near-white text
- `--color-body`     oklch(71% 0.010 85)    — secondary text
- `--color-muted`    oklch(55% 0.010 85)    — captions, legal
- `--color-line`     oklch(26% 0.012 80)    — hairline rules
- `--color-accent`   oklch(80% 0.150 82)    — amber (≈ #f0b429), ≤ 5 % footprint
- `--color-focus`    oklch(80% 0.150 82)

Elevation on dark = lightness, not shadow. No gradients as decoration.

## Typography

- Display: PP Neue Montreal, weights 500 + 800, style normal (roman only,
  italics banned on headings). Headlines are UPPERCASE, leading 1.02–1.08,
  tracking -0.01em. Accent-coloured key word allowed, one per headline.
- Body:    PP Radio Grotesk, weight 400 (700 for emphasis), sentence case
- Mono:    PP Supply Mono, weights 400/500 — the label face. One role:
  interactive/meta labels (nav links, buttons, captions, legal, table heads).
  Uppercase, tracking 0.08–0.14em.
- Type scale anchor: `--text-display` = clamp(2.6rem, 4.5vw + 1rem, 5rem)
- Section heads: `--text-display-s` = clamp(2rem, 4.5vw, 3.6rem)

## Spacing

4-point named scale, tokens in `tokens.css`. Sections are NOT evenly padded —
statement sections get `min-height: 100dvh`, working sections get compact
rhythm.

## Motion

- Easings: `--ease-out` cubic-bezier(0.16, 1, 0.3, 1) · `--ease-in`
  cubic-bezier(0.7, 0, 0.84, 0) · `--ease-in-out` cubic-bezier(0.65, 0, 0.35, 1)
- Reveal pattern: slow fade-up (900 ms, 24 px) per section, IntersectionObserver,
  one-shot, staggered ≤ 400 ms total (nakatomi's 1000–1500 ms fades, tightened)
- Three primitives max per page: section reveal · logo marquee · CTA hover fill
- Nav gets a one-time drop-down entrance on load
- No lenis / smooth-scroll library — native scroll + CSS snap
- Reduced-motion fallback: opacity-only, ≤ 150 ms, marquee stops

## Microinteractions stance

- Silent success (copy button swaps its icon, no toast)
- Hover delay 0 on colour shifts; one signal per element
- Focus rings instant, amber, 2px, offset 3px

## CTA voice

- Primary CTA: near-white fill (`--color-ink`), paper-dark text, mono uppercase
  label, 2 px radius, hover fills amber with paper text, active translateY(1px)
- Secondary CTA: hairline border (`--color-line`), ink text, hover border +
  text shift to amber
- Labels never wrap; arrow glyph optional, translates 2 px on hover

## Per-page allowances

- Marketing pages MAY use the logo marquee and the Cal.com embed
- Content pages: typography only

## What pages MUST share

- The wordmark (white logo on dark, always)
- The amber accent and its ≤ 5 % footprint
- The three faces and their roles (display / body / mono-label). UI elements
  (buttons, CTAs, nav, meta labels) stay PP Supply Mono regardless of body
  font changes.
- The CTA voice
- Black paper — no light-mode sections

## What pages MAY differ on

- Snap behaviour (blog never snaps)
- Hero archetype (blog uses a plain document head)
