import React from "react";
import Hero from "@/components/Home/Hero";
import Work from "@/components/Home/work";
import TimeLine from "@/components/Home/timeline";
import Platform from "@/components/Home/platform";
import CaseStudy from "@/components/Home/caseStudies";
import Portfolio from "@/components/Home/portfolio";
import Upgrade from "@/components/Home/upgrade";
import Perks from "@/components/Home/perks";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CWorks",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <TimeLine />
      <Platform />
      <CaseStudy />
      <Portfolio />
      <Upgrade />
      <Perks />
    </main>
  );
}
