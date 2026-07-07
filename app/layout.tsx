import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { IntakeWidget } from "@/components/IntakeWidget";

// PP Neue Montreal: the display voice — huge uppercase headlines (800),
// section labels (500).
const display = localFont({
  src: [
    {
      path: "./fonts/Neue Montreal Default/PPNeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Neue Montreal Default/PPNeueMontreal-Extrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nm",
  display: "swap",
});

// PP Radio Grotesk: body copy.
const body = localFont({
  src: [
    {
      path: "./fonts/Radio Grotesk/PPRadioGrotesk-Regular.woff2",
      weight: "400",
    },
    { path: "./fonts/Radio Grotesk/PPRadioGrotesk-Bold.woff2", weight: "700" },
  ],
  variable: "--font-sp",
  display: "swap",
});

// PP Supply Mono: the label face — nav, buttons, captions, legal.
const mono = localFont({
  src: [
    { path: "./fonts/Supply/PPSupplyMono-Regular.woff2", weight: "400" },
    { path: "./fonts/Supply/PPSupplyMono-Medium.woff2", weight: "500" },
  ],
  variable: "--font-spm",
  display: "swap",
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
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper">
        {children}
        <IntakeWidget />
      </body>
      <GoogleAnalytics gaId="G-HGGKN04GDT" />
    </html>
  );
}
