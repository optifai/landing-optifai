import type { FaqItem } from "@/types";

/**
 * Question and answer copy lives under `faq.items.<id>` in the message files.
 * The order here is the order rendered on the page and in the JSON-LD.
 */
export const faqItems: FaqItem[] = [
  { id: "request" },
  { id: "cost" },
  { id: "duration" },
  { id: "payments" },
  { id: "international" },
  { id: "hosting" },
  { id: "maintenance" },
  { id: "existing" },
  { id: "integrations" },
  { id: "start" },
];
