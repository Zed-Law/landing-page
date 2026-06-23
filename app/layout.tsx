import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { IntakeWidget } from "@/components/IntakeWidget";

// Plus Jakarta Sans: tight, punchy display headings.
const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <SmoothScroll>{children}</SmoothScroll>
        <IntakeWidget />
      </body>
      <GoogleAnalytics gaId="G-HGGKN04GDT" />
    </html>
  );
}
