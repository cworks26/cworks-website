import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import type { Metadata } from "next";

const font = DM_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://cworks.tech"),
  title: {
    default: "CWorks — We Build Digital. We Ship Results.",
    template: "%s | CWorks",
  },
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
  authors: [{ name: "CWorks", url: "https://cworks.tech" }],
  creator: "CWorks",
  publisher: "CWorks",
  alternates: {
    canonical: "https://cworks.tech",
  },
  openGraph: {
    title: "CWorks — We Build Digital. We Ship Results.",
    description:
      "Full-service digital agency in Kampala, Uganda. Websites, brands, systems — built to perform.",
    url: "https://cworks.tech",
    type: "website",
    locale: "en_US",
    siteName: "CWorks",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CWorks Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CWorks — We Build Digital. We Ship Results.",
    description:
      "Full-service digital agency in Kampala, Uganda. Websites, brands, systems — built to perform.",
    images: ["/images/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CWorks",
              url: "https://cworks.tech",
              description:
                "Kampala-based digital agency delivering web development, UI/UX design, and custom systems.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kampala",
                addressCountry: "UG",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+256-788-368-997",
                contactType: "sales",
                availableLanguage: ["English"],
              },
              sameAs: [
                // Add social media URLs when available
              ],
            }),
          }}
        />
      </head>
      <body className={`${font.className} bg-black text-white antialiased`}>
        <Aoscompo>
          <Header />
          {children}
          <Footer />
        </Aoscompo>
        <ScrollToTop />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
