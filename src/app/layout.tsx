import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";
import type { Metadata } from "next";
import Head from "next/head";

const font = DM_Sans({ subsets: ["latin"], display: "swap" });

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <Head>
        {/* Preload hero image to improve LCP */}
        <link rel="preload" as="image" href="/images/hero/hero-section-image-3.png" />
      </Head>
      <body className={`${font.className} bg-black text-white antialiased`}>
        <Aoscompo>
          <Header />
          {children}
          <Footer />
        </Aoscompo>
        <ScrollToTop />
      </body>
    </html>
  );
}
