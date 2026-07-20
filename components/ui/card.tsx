import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  /** `raised` adds a hover lift; use it only for cards that link somewhere. */
  interactive?: boolean;
}

export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-surface shadow-card",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lifted",
        className,
      )}
      {...props}
    />
  );
}

interface BadgeProps extends React.ComponentPropsWithoutRef<"span"> {
  tone?: "neutral" | "accent" | "warning";
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "bg-surface-2 text-fg-muted",
        tone === "accent" && "bg-accent-soft text-accent",
        // Used to flag placeholder content — must read as a notice, not decor.
        tone === "warning" &&
          "border border-line-strong bg-surface-2 text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

/** Small square icon plate used at the top of feature cards. */
export function IconPlate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-xl",
        "bg-gradient-to-br from-primary-soft to-accent-soft text-primary",
        "ring-1 ring-inset ring-line",
        className,
      )}
    >
      {children}
    </span>
  );
}
