"use client";

import { motion } from "framer-motion";
import { useState, useRef, type FormEvent } from "react";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      project_type: formData.get("project_type") as string,
      budget: formData.get("budget") as string,
      timeline: formData.get("timeline") as string,
      message: formData.get("message") as string,
      _honey: formData.get("_honey") as string, // honeypot field
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="max-w-3xl" data-aos="fade-up" data-aos-duration="800">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary text-sm font-medium uppercase tracking-wider"
            >
              Contact Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Get In{" "}
              <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted leading-relaxed"
            >
              Have a project in mind? Need a consultation? Or just want to say
              hello? We&apos;d love to hear from you. Fill out the form below
              and we&apos;ll get back within 24 hours.
            </motion.p>
          </div>
        </div>
        {/* Gradient blobs */}
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -top-64 -right-14 -z-1"></div>
        <div className="absolute w-40 h-40 bg-gradient-to-tr from-[#1E0339] to-[#050F67] blur-300 rounded-full -bottom-32 -left-20 -z-1"></div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2" data-aos="fade-up" data-aos-duration="800">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-primary/20 bg-darkmode p-12 text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      className="h-8 w-8 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    Message Sent!
                  </h3>
                  <p className="mt-3 text-muted">
                    Thank you for reaching out. We&apos;ll get back to you within
                    24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-primary text-sm font-medium hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot — hidden from users, traps bots */}
                  <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                    <label htmlFor="_honey">Leave this empty</label>
                    <input
                      type="text"
                      id="_honey"
                      name="_honey"
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="w-full rounded-xl border border-dark_border bg-dark_grey px-4 py-3 text-white placeholder-muted transition-colors focus:border-primary/40 focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-dark_border bg-dark_grey px-4 py-3 text-white placeholder-muted transition-colors focus:border-primary/40 focus:outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="project_type"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Project Type
                      </label>
                      <select
                        id="project_type"
                        name="project_type"
                        className="w-full rounded-xl border border-dark_border bg-dark_grey px-4 py-3 text-white transition-colors focus:border-primary/40 focus:outline-none appearance-none"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select project type
                        </option>
                        <option value="website">Website / Web App</option>
                        <option value="uiux">UI/UX Design</option>
                        <option value="branding">Branding & Graphics</option>
                        <option value="system">Custom System / Database</option>
                        <option value="consulting">Consulting & Strategy</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className="w-full rounded-xl border border-dark_border bg-dark_grey px-4 py-3 text-white transition-colors focus:border-primary/40 focus:outline-none appearance-none"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select budget range
                        </option>
                        <option value="under-1m">Under UGX 1,000,000</option>
                        <option value="1m-5m">UGX 1,000,000 – 5,000,000</option>
                        <option value="5m-15m">UGX 5,000,000 – 15,000,000</option>
                        <option value="15m-plus">UGX 15,000,000+</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Desired Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      className="w-full rounded-xl border border-dark_border bg-dark_grey px-4 py-3 text-white transition-colors focus:border-primary/40 focus:outline-none appearance-none"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        When do you need this?
                      </option>
                      <option value="urgent">ASAP / Urgent</option>
                      <option value="2-weeks">Within 2 weeks</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="3-months">Within 3 months</option>
                      <option value="flexible">Flexible — planning ahead</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full resize-none rounded-xl border border-dark_border bg-dark_grey px-4 py-3 text-white placeholder-muted transition-colors focus:border-primary/40 focus:outline-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-primary border border-primary rounded-lg text-white font-medium hover:bg-transparent hover:text-primary py-3 px-10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              {/* Contact Details */}
              <div className="rounded-2xl border border-dark_border bg-darkmode p-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Location</p>
                      <p className="text-muted text-sm mt-1">
                        Kampala, Uganda
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Email</p>
                      <a
                        href="mailto:info@cworks.com"
                        className="text-muted text-sm mt-1 hover:text-primary transition-colors block"
                      >
                        info@cworks.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Phone</p>
                      <a
                        href="tel:+256788368997"
                        className="text-muted text-sm mt-1 hover:text-primary transition-colors block"
                      >
                        +256 788 368 997
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="rounded-2xl border border-dark_border bg-darkmode p-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Monday — Friday</span>
                    <span className="text-white">8:00 AM — 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Saturday</span>
                    <span className="text-white">9:00 AM — 2:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl border border-dark_border bg-darkmode p-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Find Us
                </h3>
                <div className="rounded-xl bg-dark_grey border border-dark_border h-48 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <svg className="h-10 w-10 text-primary/40 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <p className="text-muted text-sm">Kampala, Uganda</p>
                    <p className="text-muted text-xs mt-1">Nakawa Division</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
