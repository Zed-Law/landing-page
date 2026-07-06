import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { IntakeWidget } from "@/components/IntakeWidget";

// OT Jubilee is a "gem" family: cuts run from most ornate (Diamond) to
// plainest (Silver). We grade headings by size — bigger text can carry more
// ornament, smaller text needs the calmer cut to stay legible.
// NOTE: this typeface is licensed free for personal use — confirm a
// commercial licence before shipping to production.
const hero = localFont({
  src: "./fonts/OTJubilee-DiamondMedium.otf",
  variable: "--font-hero",
  weight: "500",
  display: "swap",
});

const heading = localFont({
  src: "./fonts/Jubilee/OTJubilee-GoldenMedium.otf",
  variable: "--font-heading",
  weight: "500",
  display: "swap",
});

const subheading = localFont({
  src: "./fonts/Jubilee/OTJubilee-SilverMedium.otf",
  variable: "--font-subheading",
  weight: "500",
  display: "swap",
});

// PP Radio Grotesk: warm grotesque for body copy. 500/600 utilities fall
// back to the nearest declared weight (400/700) per CSS font matching.
const body = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    {
      path: "./fonts/Radio Grotesk/PPRadioGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Radio Grotesk/PPRadioGrotesk-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Radio Grotesk/PPRadioGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

// PP Neue Montreal Mono: short UI text only (nav, buttons, labels, captions)
// — reads as "robotic" at paragraph length, so it never carries body copy.
const mono = localFont({
  variable: "--font-mono-face",
  display: "swap",
  src: [
    {
      path: "./fonts/PP Neue Montreal Mono/pp-neue-montreal-mono-book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PP Neue Montreal Mono/pp-neue-montreal-mono-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/PP Neue Montreal Mono/pp-neue-montreal-mono-medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Zed Law | Best Law Firm for Time-Poor CXOs and Founders",
  description:
    "Zed Law provides a comprehensive range of legal services as part of its commercial practice, catering to the unique needs of founders and CXOs.",
  icons: {
    icon: [
      { url: "/z-logo.svg", type: "image/svg+xml" },
      {
        url: "/z-logo-dark-mode.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hero.variable} ${heading.variable} ${subheading.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper">
        <SmoothScroll>{children}</SmoothScroll>
        <IntakeWidget />
      </body>
      <GoogleAnalytics gaId="G-HGGKN04GDT" />
    </html>
  );
}
