import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Adds a subtle tinted background to break up consecutive sections. */
  tone?: "default" | "subtle";
}

export function Section({
  id,
  children,
  className,
  tone = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      // scroll-mt mirrors the sticky header height for anchor navigation.
      className={cn(
        "scroll-mt-24 py-20 md:py-28",
        tone === "subtle" && "bg-bg-subtle",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  /** Heading level, so the document outline stays in order. */
  as?: "h2" | "h3";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal>
      <div
        className={cn(
          "flex flex-col gap-4",
          align === "center" ? "items-center text-center" : "items-start",
          className,
        )}
      >
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          <span
            aria-hidden="true"
            className="h-px w-6 bg-gradient-to-r from-transparent to-accent"
          />
          {eyebrow}
        </span>

        <Heading
          className={cn(
            "text-3xl leading-tight sm:text-4xl md:text-[2.75rem]",
            align === "center" && "max-w-3xl",
          )}
        >
          {title}
        </Heading>

        {subtitle ? (
          <p
            className={cn(
              "text-base leading-relaxed text-fg-muted sm:text-lg",
              align === "center" ? "max-w-2xl" : "max-w-2xl",
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
