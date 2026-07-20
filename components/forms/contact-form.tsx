"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CircleAlert, CircleCheckBig, LoaderCircle, Send } from "lucide-react";
import {
  contactSchema,
  FIELD_LIMITS,
  PROJECT_TYPES,
  type ContactFormValues,
  type ContactResponse,
} from "@/lib/contact-schema";
import { onContactIntent } from "@/lib/contact-intent";
import { Button } from "@/components/ui/button";
import { Field } from "./form-field";

/** Fields listed in the error summary, in the order they appear in the form. */
const FIELD_ORDER = [
  "name",
  "email",
  "phone",
  "projectType",
  "message",
] as const;

/** Maps a field name to the id suffix used by its input element. */
const FIELD_ANCHORS: Record<(typeof FIELD_ORDER)[number], string> = {
  name: "name",
  email: "email",
  phone: "phone",
  projectType: "project-type",
  message: "message",
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; mode: "sent" | "dev" }
  | { kind: "error" };

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });
  const messageRef = React.useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    // Fields validate as the visitor corrects them, but only after the first
    // failed submit — no red text while someone is still typing their name.
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
      companyWebsite: "",
    },
  });

  // `useWatch` rather than `watch()` so the subscription is stable across
  // renders and only this counter re-renders as the visitor types.
  const messageValue = useWatch({ control, name: "message" }) ?? "";
  const remaining = FIELD_LIMITS.message - messageValue.length;

  // A "book a call" CTA elsewhere on the page can hand the visitor over here.
  React.useEffect(() => {
    return onContactIntent((intent) => {
      if (intent !== "call") return;
      setValue("message", t("callIntent"), { shouldDirty: true });
      // Let the scroll settle before taking focus, otherwise the browser
      // fights the anchor jump.
      window.setTimeout(() => {
        const field = messageRef.current;
        if (!field) return;
        field.focus({ preventScroll: true });
        field.setSelectionRange(field.value.length, field.value.length);
      }, 400);
    });
  }, [setValue, t]);

  /** Translates a schema key such as `validation.nameMin`. */
  const translateError = (key?: string) => (key ? t(key) : undefined);

  async function onSubmit(values: ContactFormValues) {
    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as ContactResponse;

      if (result.ok) {
        setStatus({ kind: "success", mode: result.mode });
        reset();
        return;
      }

      // The server re-validates; surface anything it rejected on the fields.
      if (result.error === "validation" && result.fieldErrors) {
        for (const [field, key] of Object.entries(result.fieldErrors)) {
          setError(field as keyof ContactFormValues, {
            type: "server",
            message: key,
          });
        }
      }
      setStatus({ kind: "error" });
    } catch {
      // Network failure, offline, request blocked — nothing actionable to show
      // beyond the generic message.
      setStatus({ kind: "error" });
    }
  }

  if (status.kind === "success") {
    const isDev = status.mode === "dev";
    return (
      <div
        // `assertive` because the form the visitor was reading has been
        // replaced by this confirmation.
        role="status"
        aria-live="assertive"
        className="flex flex-col items-start gap-4 rounded-panel border border-line bg-surface p-8"
      >
        <span
          aria-hidden="true"
          className="grid size-12 place-items-center rounded-xl bg-success-soft text-success"
        >
          <CircleCheckBig className="size-6" />
        </span>
        <div>
          <h3 className="text-xl">
            {isDev ? t("status.devTitle") : t("status.successTitle")}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            {isDev ? t("status.devBody") : t("status.successBody")}
          </p>
        </div>
        <Button variant="secondary" onClick={() => setStatus({ kind: "idle" })}>
          {t("status.sendAnother")}
        </Button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const busy = isSubmitting || status.kind === "submitting";
  // Only summarise problems once the visitor has actually tried to submit.
  const showValidationSummary = submitCount > 0 && errorCount > 0;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="contact-form-title"
      className="rounded-panel border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      <h3 id="contact-form-title" className="sr-only">
        {t("formTitle")}
      </h3>

      {/* Single live region for submission-level feedback. It stays mounted so
          screen readers announce content changes instead of a new node. */}
      <div aria-live="polite" className="empty:hidden">
        {showValidationSummary ? (
          <div className="mb-6 rounded-lg border border-error/40 bg-error-soft px-4 py-3 text-sm text-error">
            <p className="flex items-center gap-2.5 font-semibold">
              <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
              {t("status.errorsTitle")}
            </p>
            {/* Links let keyboard and screen reader users jump straight to the
                field that needs fixing. */}
            <ul className="mt-2 flex flex-col gap-1 pl-6">
              {FIELD_ORDER.filter((field) => errors[field]).map((field) => (
                <li key={field}>
                  <a
                    href={`#contact-${FIELD_ANCHORS[field]}`}
                    className="underline underline-offset-2"
                  >
                    {t(`fields.${field}`)}: {translateError(errors[field]?.message)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {status.kind === "error" && errorCount === 0 ? (
          <p className="mb-6 flex items-start gap-2.5 rounded-lg border border-error/40 bg-error-soft px-4 py-3 text-sm text-error">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              <strong className="block font-semibold">
                {t("status.errorTitle")}
              </strong>
              <span className="mt-0.5 block">{t("status.errorBody")}</span>
            </span>
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label={t("fields.name")}
          required
          error={translateError(errors.name?.message)}
        >
          {(props) => (
            <input
              {...props}
              {...register("name")}
              type="text"
              autoComplete="name"
              maxLength={FIELD_LIMITS.name}
              placeholder={t("fields.namePlaceholder")}
            />
          )}
        </Field>

        <Field
          id="contact-email"
          label={t("fields.email")}
          required
          error={translateError(errors.email?.message)}
        >
          {(props) => (
            <input
              {...props}
              {...register("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={FIELD_LIMITS.email}
              placeholder={t("fields.emailPlaceholder")}
            />
          )}
        </Field>

        <Field
          id="contact-phone"
          label={t("fields.phone")}
          required
          error={translateError(errors.phone?.message)}
        >
          {(props) => (
            <input
              {...props}
              {...register("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={FIELD_LIMITS.phone}
              placeholder={t("fields.phonePlaceholder")}
            />
          )}
        </Field>

        <Field
          id="contact-project-type"
          label={t("fields.projectType")}
          error={translateError(errors.projectType?.message)}
        >
          {(props) => (
            <select {...props} {...register("projectType")}>
              <option value="">{t("fields.projectTypePlaceholder")}</option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {t(`projectTypes.${type}`)}
                </option>
              ))}
            </select>
          )}
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="contact-message"
            label={t("fields.message")}
            required
            error={translateError(errors.message?.message)}
            hint={t("charactersLeft", { count: Math.max(remaining, 0) })}
          >
            {(props) => {
              const { ref, ...field } = register("message");
              return (
                <textarea
                  {...props}
                  {...field}
                  ref={(node) => {
                    ref(node);
                    messageRef.current = node;
                  }}
                  rows={5}
                  maxLength={FIELD_LIMITS.message}
                  placeholder={t("fields.messagePlaceholder")}
                  className={`${props.className} resize-y min-h-32`}
                />
              );
            }}
          </Field>
        </div>
      </div>

      {/* Honeypot. Positioned off-screen rather than `display:none` so naive
          bots still fill it, and hidden from assistive tech and the tab order
          so nobody real ever reaches it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden opacity-0"
      >
        <label htmlFor="contact-company-website">
          {t("fields.companyWebsite")}
        </label>
        <input
          id="contact-company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>

      <p className="mt-5 text-xs text-fg-subtle">{t("requiredLegend")}</p>

      <Button
        type="submit"
        size="lg"
        disabled={busy}
        className="mt-4 w-full sm:w-auto"
      >
        {busy ? (
          <>
            <LoaderCircle
              aria-hidden="true"
              className="size-4 animate-spin"
            />
            {t("submitting")}
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="size-4" />
            {t("submit")}
          </>
        )}
      </Button>
    </form>
  );
}
