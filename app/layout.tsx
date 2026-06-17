import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Zed Law — Top-tier legal talent, without the top-tier theatre",
  description:
    "Lawyers trained at the big firms (Ashurst, HSF, KWM, Bakers, Clifford Chance), delivering sharp commercial advice at a fairer price. Book a discovery call.",
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
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
