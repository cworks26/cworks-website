import dynamic from "next/dynamic";
import CardNav from "@/components/CardNav";
import type { CardNavItem } from "@/components/CardNav";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// ---------------------------------------------------------------------------
// Navigation items for CardNav (3 card groups with sub-links)
// ---------------------------------------------------------------------------

const CARD_NAV_ITEMS: CardNavItem[] = [
  {
    label: "About",
    bgColor: "#050F67",
    textColor: "#fff",
    links: [
      { label: "Company", href: "#about", ariaLabel: "About our company" },
      { label: "Our Team", href: "#team", ariaLabel: "Meet the CWorks team" },
    ],
  },
  {
    label: "Services",
    bgColor: "#0815A6",
    textColor: "#fff",
    links: [
      { label: "Web Development", href: "#services", ariaLabel: "Web development services" },
      { label: "UI/UX Design", href: "#services", ariaLabel: "UI/UX design services" },
      { label: "Database & Systems", href: "#services", ariaLabel: "Database and systems" },
    ],
  },
  {
    label: "Work",
    bgColor: "#1E0339",
    textColor: "#fff",
    links: [
      { label: "Portfolio", href: "#portfolio", ariaLabel: "Our portfolio" },
      { label: "Contact", href: "#contact", ariaLabel: "Contact us" },
    ],
  },
];

// Dynamic import for heavy component
// Hero: ~150KB (Three.js + @react-three/fiber + @react-three/drei)
const Hero = dynamic(() => import("@/components/Hero").then((m) => ({ default: m.Hero })), {
  loading: () => <div className="flex min-h-screen items-center justify-center bg-[#000000]" />,
});

export default function Home() {
  return (
    <>
      <CardNav
        logo="/logo/cworks-logo-mobile.png"
        logoAlt="CWorks — We build digital. We ship results."
        items={CARD_NAV_ITEMS}
        baseColor="#ffffff"
        menuColor="#000000"
        buttonBgColor="#0815A6"
        buttonTextColor="#ffffff"
        ease="power3.out"
      />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
