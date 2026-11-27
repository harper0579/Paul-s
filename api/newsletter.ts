interface NewsletterRequest {
  method?: string;
  body?: unknown;
}

interface NewsletterResponse {
  status: (code: number) => NewsletterResponse;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

function cleanField(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export default async function handler(req: NewsletterRequest, res: NewsletterResponse) {
  res.setHeader("Allow", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).json({ ok: true });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  let parsedBody: Record<string, unknown> = {};
  if (typeof req.body === "string") {
    try {
      parsedBody = JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      parsedBody = {};
    }
  } else if (req.body && typeof req.body === "object") {
    parsedBody = req.body as Record<string, unknown>;
  }

  const email = cleanField(parsedBody.email, 160).toLowerCase();
  const source = cleanField(parsedBody.source, 60) || "home-stay-updated";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({
      ok: false,
      error: "Please enter a valid email address to subscribe for seasonal roofing tips.",
    });
    return;
  }

  const recipient = process.env.QUOTE_RECIPIENT_EMAIL?.trim() || "lunacraigcep@gmail.com";
  let emailDispatched = false;

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Paul's Roofing Website <onboarding@resend.dev>",
          to: [recipient],
          reply_to: email,
          subject: `[Seasonal Tips Signup] ${email}`,
          text: `New seasonal roofing tips subscriber:\nEmail: ${email}\nSource: ${source}\nSubmitted: ${new Date().toISOString()}`,
        }),
      });
      if (resendRes.ok) {
        emailDispatched = true;
      }
    } catch {
      // Fall back to client-side Web3Forms delivery if Resend is unavailable
    }
  }

  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT?.trim();
  if (!emailDispatched && formspreeEndpoint) {
    try {
      const formspreeRes = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[Seasonal Tips Signup] ${email}`,
          _replyto: email,
          email,
          source,
          type: "newsletter-subscription",
        }),
      });
      if (formspreeRes.ok) {
        emailDispatched = true;
      }
    } catch {
      // Fall back to client-side Web3Forms delivery
    }
  }

  res.status(201).json({
    ok: true,
    emailDispatched,
    message: "You're subscribed — watch your inbox for Paul's seasonal New Brunswick roofing tips.",
  });
}
