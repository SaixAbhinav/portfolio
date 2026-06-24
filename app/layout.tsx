import type { Metadata } from "next";
import { Fraunces, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import { ShootingAsteroid } from "./ShootingAsteroid";

// Display serif — storybook wonder. Optical display cut, soft terminals.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
// Body sans — plain-spoken clarity.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
// Handwritten — the explorer's pen, for margin notes & taglines only.
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
const description =
  "I build intelligent systems to better understand worlds that haven't been mapped yet — an explorer's journal of applied AI work in machine learning, reinforcement learning, and automation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sai Abhinav | Portfolio",
  description,
  authors: [{ name: "Sai Abhinav" }],
  openGraph: {
    title: "Sai Abhinav | Portfolio",
    description,
    type: "website",
    url: "/",
    siteName: "Sai Abhinav",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Abhinav | Portfolio",
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sai Abhinav",
  jobTitle: "Applied AI Engineer",
  email: "mailto:saiabhinav190404@gmail.com",
  url: siteUrl,
  sameAs: ["https://github.com/SaixAbhinav"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${manrope.variable} ${caveat.variable} bg-night font-sans text-cream antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <ShootingAsteroid />
      </body>
    </html>
  );
}
