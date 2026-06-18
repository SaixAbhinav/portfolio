import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
const description =
  "Applied AI builder focused on automation-driven solutions using machine learning, reinforcement learning, and prompt engineering.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sai Abhinav | Applied AI Builder",
  description,
  authors: [{ name: "Sai Abhinav" }],
  openGraph: {
    title: "Sai Abhinav | Applied AI Builder",
    description,
    type: "website",
    url: "/",
    siteName: "Sai Abhinav",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Abhinav | Applied AI Builder",
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
        className={`${geist.variable} ${geistMono.variable} bg-zinc-950 font-sans text-zinc-100 antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
