import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  contactSchema,
  type ContactPayload,
  type ContactResponse,
} from "@/lib/contact-schema";
import { siteConfig } from "@/config/site";

/**
 * Contact endpoint.
 *
 * Everything the client validated is validated again here — the client-side
 * schema is a convenience, not a security boundary. Secrets stay server-side;
 * internal failures are logged but never returned to the caller.
 *
 * Rate limiting is intentionally not included in this first version. See the
 * README for where to add it (an edge KV counter or Upstash) without touching
 * the rest of this handler.
 */

/** Refuses absurd payloads before any parsing work happens. */
const MAX_BODY_BYTES = 16 * 1024;

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "OptifAI <onboarding@resend.dev>";

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

/** Minimal HTML escaping for values interpolated into the email body. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(data: ContactPayload) {
  const projectType = data.projectType || "—";

  const text = [
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `Celular: ${data.phone}`,
    `Tipo de proyecto: ${projectType}`,
    "",
    "Mensaje:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0a1526">
      <h2 style="margin:0 0 16px">Nueva consulta desde el sitio</h2>
      <p style="margin:0 0 4px"><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
      <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p style="margin:0 0 4px"><strong>Celular:</strong> ${escapeHtml(data.phone)}</p>
      <p style="margin:0 0 16px"><strong>Tipo de proyecto:</strong> ${escapeHtml(projectType)}</p>
      <p style="margin:0 0 8px"><strong>Mensaje:</strong></p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>
  `.trim();

  return { text, html };
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "validation" }, 413);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "validation" }, 400);
  }

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    // Message strings are translation keys, so they are safe to return: they
    // contain no server detail and the client resolves them in its locale.
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return json({ ok: false, error: "validation", fieldErrors }, 400);
  }

  const data = parsed.data;

  // Honeypot: only a bot fills a field that is off-screen and aria-hidden.
  if (data.companyWebsite) {
    return json(
      {
        ok: false,
        error: "validation",
        fieldErrors: { companyWebsite: "validation.spam" },
      },
      400,
    );
  }

  const { text, html } = buildEmail(data);

  // Development fallback: no API key means no email. The submission is fully
  // validated and logged so the flow can be exercised end to end, and the
  // client is told explicitly that nothing was actually sent.
  if (!RESEND_API_KEY) {
    console.info(
      "[contact] RESEND_API_KEY is not set — no email sent. Payload:\n" + text,
    );
    return json({ ok: true, mode: "dev" }, 200);
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `Nueva consulta de ${data.name}`,
      text,
      html,
    });

    if (error) {
      // Log the provider message for debugging; return a generic failure.
      console.error("[contact] Resend rejected the message:", error.message);
      return json({ ok: false, error: "server" }, 502);
    }

    return json({ ok: true, mode: "sent" }, 200);
  } catch (error) {
    console.error(
      "[contact] Unexpected failure while sending:",
      error instanceof Error ? error.message : "unknown error",
    );
    return json({ ok: false, error: "server" }, 500);
  }
}
