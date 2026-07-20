/**
 * Tiny bridge between "book a call" CTAs and the contact form.
 *
 * When `NEXT_PUBLIC_BOOKING_URL` is not configured, those CTAs scroll to the
 * form instead of opening a scheduler. This event lets the form know why the
 * visitor arrived so it can pre-fill the message and move focus there —
 * without a global state library or a query-string round trip.
 */

export const CONTACT_INTENT_EVENT = "optifai:contact-intent";

export type ContactIntent = "call" | "quote";

export function emitContactIntent(intent: ContactIntent) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ContactIntent>(CONTACT_INTENT_EVENT, { detail: intent }),
  );
}

export function onContactIntent(handler: (intent: ContactIntent) => void) {
  const listener = (event: Event) => {
    handler((event as CustomEvent<ContactIntent>).detail);
  };
  window.addEventListener(CONTACT_INTENT_EVENT, listener);
  return () => window.removeEventListener(CONTACT_INTENT_EVENT, listener);
}
