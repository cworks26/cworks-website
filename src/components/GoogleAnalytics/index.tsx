"use client";

import Script from "next/script";
import { useState, useEffect, useCallback } from "react";
import { CookieConsent } from "@/components/CookieConsent";

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your Google Analytics ID

/**
 * GoogleAnalytics component that supports consent management.
 * Loads GA script only after user gives consent.
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env to activate.
 */
export function GoogleAnalytics() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (stored === "accepted") {
      setConsent(true);
    } else if (stored === "declined") {
      setConsent(false);
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem("cookie_consent", "accepted");
    setConsent(true);
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem("cookie_consent", "declined");
    setConsent(false);
  }, []);

  // Only use the measurement ID from env, fall back to placeholder
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || GA_MEASUREMENT_ID;

  return (
    <>
      {consent && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
            async
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${measurementId}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                });
              `,
            }}
          />
        </>
      )}
      {consent === null && (
        <CookieConsent onAccept={handleAccept} onDecline={handleDecline} />
      )}
    </>
  );
}
