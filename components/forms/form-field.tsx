import * as React from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  /** Already-translated error message, if the field is invalid. */
  error?: string;
  /** Extra description rendered under the control (e.g. a character counter). */
  hint?: React.ReactNode;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    className: string;
  }) => React.ReactNode;
}

/**
 * Label + control + error wiring for a single field.
 *
 * The control receives `aria-invalid` and an `aria-describedby` pointing at the
 * error and hint nodes, so screen readers announce the problem when focus
 * lands on the input. The error is also marked with an icon and text, never
 * signalled by the red border alone.
 */
export function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="ml-0.5 text-error">
              *
            </span>
            <span className="sr-only"> (*)</span>
          </>
        ) : null}
      </label>

      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
        className: cn(
          "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-fg",
          "placeholder:text-fg-subtle/70 transition-colors duration-150",
          "focus:border-primary",
          error ? "border-error" : "border-line-strong hover:border-line-strong",
        ),
      })}

      {hint ? (
        <p id={hintId} className="text-xs text-fg-subtle">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          className="flex items-start gap-1.5 text-xs font-medium text-error"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
