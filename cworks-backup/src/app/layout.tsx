import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "CWorks — We Build Digital. We Ship Results.",
  description:
    "CWorks is a Kampala-based digital agency delivering web development, UI/UX design, graphic design, database management, and custom systems for businesses across Uganda and East Africa.",
  keywords: [
    "web development",
    "UI/UX design",
    "graphic design",
    "database management",
    "custom software",
    "Kampala",
    "Uganda",
    "digital agency",
  ],
  openGraph: {
    title: "CWorks — We Build Digital. We Ship Results.",
    description:
      "Full-service digital agency in Kampala, Uganda. Websites, brands, systems — built to perform.",
    type: "website",
    locale: "en_US",
    siteName: "CWorks",
  },
  twitter: {
    card: "summary_large_image",
    title: "CWorks — We Build Digital. We Ship Results.",
    description:
      "Full-service digital agency in Kampala, Uganda. Websites, brands, systems — built to perform.",
  },
  metadataBase: new URL("https://the-runner-team.github.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
