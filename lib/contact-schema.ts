import { z } from "zod";

/**
 * Shared between the client form and the API route so both sides enforce the
 * same rules. Error messages are *translation keys* (resolved under the
 * `contact` namespace), never user-facing strings — that keeps validation
 * bilingual without duplicating the schema.
 */

export const PROJECT_TYPES = [
  "custom-system",
  "landing-page",
  "online-store",
  "other",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

/** Upper bounds keep payloads small and give the API a cheap abuse guard. */
export const FIELD_LIMITS = {
  name: 80,
  email: 120,
  phone: 30,
  message: 2000,
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "validation.nameMin")
    .max(FIELD_LIMITS.name, "validation.nameMax"),

  email: z
    .string()
    .trim()
    .max(FIELD_LIMITS.email, "validation.emailMax")
    .pipe(z.email("validation.emailInvalid")),

  phone: z
    .string()
    .trim()
    .min(6, "validation.phoneMin")
    .max(FIELD_LIMITS.phone, "validation.phoneMax")
    .regex(/^[0-9+()\-.\s]+$/, "validation.phoneInvalid"),

  projectType: z
    .union([
      z.enum(PROJECT_TYPES, { error: "validation.projectTypeInvalid" }),
      z.literal(""),
    ])
    .optional()
    .default(""),

  message: z
    .string()
    .trim()
    .min(20, "validation.messageMin")
    .max(FIELD_LIMITS.message, "validation.messageMax"),

  /**
   * Honeypot. Hidden from real users, so any value means a bot filled it.
   * Named like a plausible field to be attractive to naive scrapers.
   */
  companyWebsite: z.string().max(0, "validation.spam").optional().default(""),
});

export type ContactFormValues = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;

/** Successful submissions report how the message was actually handled. */
export type ContactSuccess = {
  ok: true;
  /** `sent` = delivered through Resend. `dev` = logged locally, not emailed. */
  mode: "sent" | "dev";
};

export type ContactFailure = {
  ok: false;
  error: "validation" | "server";
  /** Present only for `validation`; maps field name to a translation key. */
  fieldErrors?: Partial<Record<keyof ContactPayload, string>>;
};

export type ContactResponse = ContactSuccess | ContactFailure;
