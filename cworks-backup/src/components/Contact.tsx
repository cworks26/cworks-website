"use client";

import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/256788368997",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/thecworks26",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/cworks26",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/the-runner-team",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Featured background — hero workspace image reused as contact section backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <picture>
          <source
            srcSet="/assets/images/hero/hero-workspace-tech-agency.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/hero/hero-workspace-tech-agency.jpg"
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-[#1E0339]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E0339] via-transparent to-[#1E0339]/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <AnimatedSection>
            <span className="text-sm font-mono text-cyan uppercase tracking-wider">
              Get in Touch
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Ready to build
              <br />
              <span className="text-neutral-500">something great?</span>
            </h2>
            <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
              Tell us about your project. We&apos;ll get back to you within 24
              hours with a clear plan and honest pricing.
            </p>

            {/* Contact details */}
            <div className="mt-8 space-y-4">
              <a
                href="tel:+256788368997"
                className="flex items-center gap-3 text-neutral-300 transition-colors hover:text-cyan"
              >
                <svg className="h-5 w-5 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                +256 788 368 997
              </a>
            </div>

            {/* Social links */}
            <div className="mt-8 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-all duration-200 hover:border-cyan/30 hover:text-cyan hover:bg-cyan/5"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: form */}
          <AnimatedSection delay={0.2}>
            {submitted ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-cyan/20 bg-surface p-12 text-center">
                <div>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan/10">
                    <svg className="h-8 w-8 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
                  <p className="mt-2 text-neutral-400">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white placeholder-neutral-600 transition-colors focus:border-cyan/40 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white placeholder-neutral-600 transition-colors focus:border-cyan/40 focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-neutral-300 mb-2">
                    What do you need?
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white transition-colors focus:border-cyan/40 focus:outline-none"
                  >
                    <option value="web">Web Development</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="graphic">Graphic Design</option>
                    <option value="database">Database Management</option>
                    <option value="system">System Building</option>
                    <option value="other">Something Else</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-surface px-4 py-3 text-white placeholder-neutral-600 transition-colors focus:border-cyan/40 focus:outline-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-cyan py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-cyan-light hover:shadow-lg hover:shadow-cyan/20"
                >
                  Send Message
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
