/**
 * Central configuration for every editable business detail.
 *
 * Everything the visitor sees that is *not* copy lives here: contact data,
 * social links, feature flags and pending-content switches. No component
 * should hardcode a phone number, an email or a URL.
 */

/**
 * International format used for wa.me links (Paraguay country code 595,
 * leading 0 of the local number removed).
 */
const WHATSAPP_INTERNATIONAL =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "595981507887";

const INSTAGRAM_USERNAME = "optifai";

const CONTACT_EMAIL = "optifaipartnetship@gmail.com";

/** Formats the configured Paraguayan number for human-readable contact copy. */
function formatPhone(number: string): string {
  const match = number.match(/^(595)(\d{3})(\d{3})(\d{3})$/);
  return match ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}` : `+${number}`;
}

export const siteConfig = {
  name: "OptifAI",
  /** Used as the browser title suffix and in structured data. */
  legalName: "OptifAI",

  location: {
    city: "Asunción",
    country: "Paraguay",
    countryCode: "PY",
  },

  contact: {
    email: CONTACT_EMAIL,
    /** Displayed to humans. */
    whatsappDisplay: formatPhone(WHATSAPP_INTERNATIONAL),
    /** Used for regular telephone links. */
    phoneE164: `+${WHATSAPP_INTERNATIONAL}`,
    /** Used to build the wa.me deep link. */
    whatsappInternational: WHATSAPP_INTERNATIONAL,
    instagramUsername: INSTAGRAM_USERNAME,
    instagramUrl: `https://instagram.com/${INSTAGRAM_USERNAME}`,
  },

  /**
   * Scheduling link (Calendly, Cal.com, …). Empty by default: while it stays
   * empty every "book a call" CTA falls back to the contact form. See README.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",

  /**
   * TODO(content): fill in once there are verifiable numbers to show.
   * Left as `null` on purpose — nothing invented is rendered.
   */
  facts: {
    yearsOfExperience: null as number | null,
    teamSize: null as number | null,
    projectsDelivered: null as number | null,
  },

  /**
   * Flags for content that is still placeholder. Flip these to `false` once
   * the real assets are in place; the UI adapts automatically.
   */
  pending: {
    /** Every published portfolio entry currently represents real work. */
    projectsArePlaceholder: false,
    /** No real testimonials collected yet. */
    testimonialsArePlaceholder: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Shown on the privacy and terms pages. Bump this whenever either document
 * is edited — ISO format, parsed and localised at render time.
 */
export const LEGAL_LAST_UPDATED = "2026-07-20";

/** Section anchors. Locale-independent on purpose so links survive switching. */
export const SECTION_IDS = {
  hero: "hero",
  services: "services",
  process: "process",
  projects: "projects",
  testimonials: "testimonials",
  clients: "clients",
  benefits: "benefits",
  about: "about",
  faq: "faq",
  finalCta: "final-cta",
  contact: "contact",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** Order of the anchor links in the header and footer navigation. */
export const NAV_SECTIONS: SectionId[] = [
  SECTION_IDS.projects,
  SECTION_IDS.services,
  SECTION_IDS.process,
  SECTION_IDS.about,
  SECTION_IDS.faq,
  SECTION_IDS.contact,
];

/** Builds a wa.me link with a pre-filled, URL-encoded greeting. */
export function buildWhatsAppUrl(message: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsappInternational}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mailtoUrl = `mailto:${siteConfig.contact.email}`;
export const telUrl = `tel:${siteConfig.contact.phoneE164}`;
