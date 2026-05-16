import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
