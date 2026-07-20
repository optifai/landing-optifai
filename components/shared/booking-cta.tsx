"use client";

import * as React from "react";
import { CalendarClock } from "lucide-react";
import { siteConfig, SECTION_IDS } from "@/config/site";
import { emitContactIntent } from "@/lib/contact-intent";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button";

interface BookingCtaProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  showIcon?: boolean;
  /** Appended to the accessible name when the CTA opens an external scheduler. */
  newTabHint?: string;
}

/**
 * "Book a call" CTA with a graceful fallback.
 *
 * With `NEXT_PUBLIC_BOOKING_URL` set it opens the scheduler in a new tab.
 * Without it, it scrolls to the contact form and tells the form that the
 * visitor wants a call, so the message field is pre-filled accordingly.
 */
export function BookingCta({
  label,
  variant = "ghost",
  size = "md",
  className,
  showIcon = true,
  newTabHint,
}: BookingCtaProps) {
  const classes = buttonClasses(variant, size, className);
  const icon = showIcon ? (
    <CalendarClock aria-hidden="true" className="size-4" />
  ) : null;

  if (siteConfig.bookingUrl) {
    return (
      <a
        href={siteConfig.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {icon}
        {label}
        {newTabHint ? <span className="sr-only"> {newTabHint}</span> : null}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={() => {
        emitContactIntent("call");
        // No explicit `behavior`: it inherits `scroll-behavior` from the
        // stylesheet, which already switches to `auto` under reduced motion.
        document.getElementById(SECTION_IDS.contact)?.scrollIntoView();
      }}
    >
      {icon}
      {label}
    </button>
  );
}
