"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

const OPTIONS = [
  { value: "light", icon: Sun, labelKey: "light" },
  { value: "dark", icon: Moon, labelKey: "dark" },
  { value: "system", icon: Monitor, labelKey: "system" },
] as const;

/**
 * Three-state theme control (light / dark / follow the system).
 *
 * Built as a radio group rather than a cycling button so the current choice is
 * always visible and every option is reachable in one keystroke. State is
 * conveyed by `aria-checked` plus a background change, never by colour alone.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("theme");
  const { theme, setTheme } = useTheme();

  // The active theme is only known in the browser, so selection is rendered
  // after hydration. The markup is identical either way, so nothing shifts.
  const hydrated = useHydrated();

  return (
    <div
      role="radiogroup"
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5",
        className,
      )}
    >
      {OPTIONS.map(({ value, icon: Icon, labelKey }) => {
        const checked = hydrated && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={t(labelKey)}
            title={t(labelKey)}
            onClick={() => setTheme(value)}
            className={cn(
              "grid size-8 place-items-center rounded-[0.4rem] transition-colors duration-150",
              checked
                ? "bg-surface text-primary shadow-card"
                : "text-fg-subtle hover:text-fg",
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
          </button>
        );
      })}
    </div>
  );
}
