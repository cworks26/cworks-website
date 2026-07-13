import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description:
    "Insights on web development, UI/UX design, and digital strategy from CWorks — Kampala's full-service digital agency.",
  openGraph: {
    title: "Blog & Resources | CWorks",
    description:
      "Insights on web development, UI/UX design, and digital strategy from CWorks.",
  },
  alternates: {
    canonical: "https://cworks.tech/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
