import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware replacements for `next/link` and the router hooks. Using these
 * everywhere is what keeps the selected language while navigating.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
