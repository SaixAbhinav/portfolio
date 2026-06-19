import type { Metadata } from "next";
import { Caveat, Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description =
  "Sai Abhinav is an applied AI builder exploring automation, machine learning, reinforcement learning, and prompt-engineered systems.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sai Abhinav | Explorer of Intelligent Systems",
  description,
  authors: [{ name: "Sai Abhinav" }],
  openGraph: {
    title: "Sai Abhinav | Explorer of Intelligent Systems",
    description,
    type: "website",
    url: "/",
    siteName: "Sai Abhinav",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Abhinav | Explorer of Intelligent Systems",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${manrope.variable} ${caveat.variable} bg-[var(--ink)] text-[var(--cream)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
