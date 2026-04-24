import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://gopherfy.app";

export const metadata: Metadata = {
  title: "Gopherfy — Verify. Connect. Done.",
  description:
    "A Discord bot that verifies UMN students with their @umn.edu email. Trusted communities, real Gophers, in seconds.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Gopherfy — Verify. Connect. Done.",
    description:
      "A Discord bot that verifies UMN students with their @umn.edu email. Trusted communities, real Gophers, in seconds.",
    url: siteUrl,
    siteName: "Gopherfy",
    // TODO: replace with real OG image
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Gopherfy" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gopherfy — Verify. Connect. Done.",
    description:
      "Verify UMN students in your Discord with their @umn.edu email. Free for every UMN server.",
    // TODO: replace with real OG image
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-neutral-900">{children}</body>
    </html>
  );
}
