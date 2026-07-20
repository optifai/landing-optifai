import type { Testimonial } from "@/types";

/**
 * NO TESTIMONIALS YET — intentionally empty.
 *
 * Nothing here is invented. While this array is empty the testimonials section
 * renders an honest "not published yet" state instead of fake quotes.
 *
 * To add a real testimonial, append an entry with `isPlaceholder: false`:
 *
 *   {
 *     id: "acme-2026",
 *     name: "Real Name",
 *     role: "Operations Manager",
 *     company: "Company S.A.",
 *     quote: "Their exact words, with their permission.",
 *     photo: "/images/testimonials/real-name.jpg", // optional
 *     relatedProject: "acme-dashboard",            // optional, id in projects.ts
 *     order: 1,
 *     isPlaceholder: false,
 *   }
 *
 * Entries left with `isPlaceholder: true` render with a visible
 * "placeholder testimonial" badge so drafts can never ship silently as real.
 * Remember to also flip `siteConfig.pending.testimonialsArePlaceholder`.
 */
export const testimonials: Testimonial[] = [];

export const publishedTestimonials = testimonials
  .filter((t) => !t.isPlaceholder)
  .sort((a, b) => a.order - b.order);
