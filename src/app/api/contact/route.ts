import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting: simple in-memory store (per-IP, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

// Simple honeypot detection
function hasHoneypot(body: Record<string, unknown>): boolean {
  // If a hidden field is filled, it's likely a bot
  return typeof body._honey === "string" && body._honey.length > 0;
}

// Basic server-side validation
function validateContactForm(body: Record<string, unknown>): string | null {
  const { name, email, message, project_type, budget, timeline } = body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return "Name is required (minimum 2 characters).";
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "A valid email address is required.";
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return "Message is required (minimum 10 characters).";
  }

  // Block URLs in message (spam)
  if (/https?:\/\//i.test(String(name)) || /https?:\/\//i.test(message)) {
    return "URLs are not allowed in the message field.";
  }

  // Validate allowed values for select fields
  const validProjectTypes = ["website", "uiux", "branding", "system", "consulting", "other", ""];
  const validBudgets = ["under-1m", "1m-5m", "5m-15m", "15m-plus", "not-sure", ""];
  const validTimelines = ["urgent", "2-weeks", "1-month", "3-months", "flexible", ""];

  if (project_type && !validProjectTypes.includes(String(project_type))) {
    return "Invalid project type selected.";
  }
  if (budget && !validBudgets.includes(String(budget))) {
    return "Invalid budget range selected.";
  }
  if (timeline && !validTimelines.includes(String(timeline))) {
    return "Invalid timeline selected.";
  }

  return null; // valid
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    // Honeypot check
    if (hasHoneypot(body)) {
      // Return fake success to not alert bots
      return NextResponse.json({ success: true });
    }

    // Server-side validation
    const validationError = validateContactForm(body);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    // Send email via Resend
    // Install: npm install resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "contact@cworks.tech",
          to: process.env.CONTACT_TO_EMAIL || "hello@cworks.tech",
          subject: `New inquiry from ${body.name} — ${body.project_type || "General"}`,
          html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0815A6;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${body.name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Project Type</td><td style="padding: 8px;">${body.project_type || "N/A"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Budget</td><td style="padding: 8px;">${body.budget || "N/A"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Timeline</td><td style="padding: 8px;">${body.timeline || "N/A"}</td></tr>
            </table>
            <h3 style="margin-top: 24px;">Message:</h3>
            <p style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${body.message}</p>
            <p style="color: #999; font-size: 12px; margin-top: 24px;">Sent from cworks.tech contact form</p>
          </div>`,
        });
      } catch {
        // Email delivery failure is logged but doesn't fail the request
        console.error("[Contact API] Failed to send email notification");
      }
    }

    // For now, log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Contact Form Submission]", {
        name: body.name,
        email: body.email,
        project_type: body.project_type || "N/A",
        budget: body.budget || "N/A",
        timeline: body.timeline || "N/A",
        message: body.message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you within 24-48 hours.",
    });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
