import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale routing. Next 16 renamed the `middleware` file convention to `proxy`;
 * the contract is unchanged, so next-intl's handler is used as-is.
 *
 * It redirects `/` to the visitor's best-matching locale (falling back to `es`),
 * rewrites localised paths, and persists the choice in the `NEXT_LOCALE` cookie.
 */
export default createMiddleware(routing);

export const config = {
  /**
   * Page routes only. Skips API routes, Next internals and anything that looks
   * like a static file (contains a dot).
   */
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
