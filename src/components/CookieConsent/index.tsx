"use client";

import { useState, useEffect } from "react";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem("cookie_consent");
    if (consent === null) {
      // Small delay so the banner doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-darkmode border-t border-dark_border border-opacity-30 shadow-2xl animate-in slide-in-from-bottom"
    >
      <div className="container mx-auto lg:max-w-screen-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 id="cookie-consent-title" className="text-white font-semibold text-sm">
            Cookie Consent
          </h3>
          <p className="text-muted text-xs mt-1 max-w-2xl">
            We use cookies to analyze site traffic and improve your experience. By accepting, you
            agree to our use of analytics cookies. You can decline non-essential cookies.
            See our{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={onDecline}
            className="px-5 py-2 rounded-lg text-sm font-medium border border-dark_border text-muted hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="px-5 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
