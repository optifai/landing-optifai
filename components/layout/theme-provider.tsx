"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

/**
 * next-themes injects a blocking inline script that sets the `dark` class
 * before first paint, which is what prevents the light/dark flash on load.
 * `defaultTheme="system"` means the OS preference wins until the visitor makes
 * an explicit choice, which is then persisted in localStorage.
 */
export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={{
        // React 19 logs a development-only warning when next-themes remounts
        // its inline script during client navigation. Keep it executable during
        // SSR for anti-flash behavior, but classify client-created instances
        // as data blocks. Re-check this workaround when upgrading next-themes.
        type: typeof window === "undefined" ? "text/javascript" : "text/plain",
      }}
    >
      {children}
    </ThemeProvider>
  );
}
