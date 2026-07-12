"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CardSlider from "./slider";
import { usePrefersReducedMotion } from '@/utils/usePrefersReducedMotion';
import { getImagePrefix } from "@/utils/utils";

const Hero = () => {
  const leftAnimation = (prefersReducedMotion: boolean) => prefersReducedMotion ? { initial: { opacity: 1, x: 0 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 1, x: 0 }, transition: { duration: 0 } } : { initial: { x: "-100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "-100%", opacity: 0 }, transition: { duration: 0.5 } };

  const rightAnimation = (prefersReducedMotion: boolean) => prefersReducedMotion ? { initial: { opacity: 1, x: 0 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 1, x: 0 }, transition: { duration: 0 } } : { initial: { x: "100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "100%", opacity: 0 }, transition: { duration: 0.6 } };

  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="relative md:pt-40 md:pb-28 py-20 overflow-hidden z-1"
      id="main-banner"
    >
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="grid grid-cols-12">
          <motion.div {...leftAnimation(prefersReducedMotion)} className="lg:col-span-5 col-span-12">
            <div className="flex gap-6 items-center lg:justify-start justify-center mb-5 mt-24">
              <Image
                src= {`${getImagePrefix()}images/icons/icon-bag.svg`}
                alt="CWorks digital agency"
                width={40}
                height={40}
              />
              <p className="text-white sm:text-28 text-18 mb-0">
                Kampala-Based <span className="text-primary">Digital Agency</span>
              </p>
            </div>
            <h1 className="font-medium lg:text-76 md:text-70 text-54 lg:text-start text-center text-white mb-10">
              We Build <span className="text-primary">Digital.</span> We Ship{" "}
              <span className="text-primary">Results.</span>
            </h1>
            <p className="text-muted text-opacity-60 text-18 mb-10 lg:text-start text-center">
              CWorks is a Kampala-based digital agency crafting high-performance
              websites, stunning UI/UX, and scalable systems for businesses
              across East Africa.
            </p>
            <div className="flex items-center md:justify-start justify-center gap-8">
              <Link
                href="/contact"
                className="bg-primary border border-primary rounded-lg text-21 font-medium hover:bg-transparent hover:text-primary text-white py-2 px-7 z-50"
              >
                Start Your Project
              </Link>
              <Link
                href="/services"
                className="bg-transparent border border-primary rounded-lg text-21 font-medium hover:bg-primary hover:text-white text-primary py-2 px-7"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
          <motion.div
            {...rightAnimation(prefersReducedMotion)}
            className="col-span-7 lg:block hidden"
          >
            <div className="ml-20 -mr-64">
              <Image
                src={`${getImagePrefix()}images/hero/hero-section-image-3.png`}
                alt="CWorks digital agency hero banner"
                width={1150}
                height={1150}
                priority
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
        <CardSlider />
      </div>
      <div className="absolute w-50 h-50 bg-gradient-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1"></div>
    </section>
  );
};

export default Hero;
