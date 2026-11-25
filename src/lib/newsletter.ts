const DEFAULT_WEB3FORMS_KEY = "f092d881-d9fe-4100-89cd-bf9879b1592f";

export interface NewsletterResult {
  ok: boolean;
  message: string;
}

async function sendNewsletterViaWeb3Forms(email: string, source: string): Promise<boolean> {
  const accessKey =
    (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim() ||
    DEFAULT_WEB3FORMS_KEY;

  if (!accessKey) return false;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Seasonal Tips Signup] ${email}`,
        from_name: "Paul's Roofing Website",
        email,
        source,
        message: [
          "New seasonal roofing tips subscriber:",
          `Email: ${email}`,
          `Source: ${source}`,
          `Submitted: ${new Date().toISOString()}`,
        ].join("\n"),
      }),
    });
    const data = await res.json().catch(() => ({}));
    return Boolean(res.ok && data?.success);
  } catch {
    return false;
  }
}

export async function subscribeToNewsletter(
  rawEmail: string,
  source: string
): Promise<NewsletterResult> {
  const email = rawEmail.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
    };
  }

  let serverAccepted = false;
  let serverMessage =
    "You're subscribed — watch your inbox for Paul's seasonal New Brunswick roofing tips.";
  let emailDispatched = false;
  let alreadySubscribed = false;

  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });

    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : null;

    if (res.status === 400 && data && typeof data.error === "string") {
      return {
        ok: false,
        message: data.error,
      };
    }

    if (res.ok && data?.ok) {
      serverAccepted = true;
      emailDispatched = Boolean(data.emailDispatched);
      alreadySubscribed = Boolean(data.alreadySubscribed);
      if (typeof data.message === "string" && data.message.trim()) {
        serverMessage = data.message;
      }
    }
  } catch {
    // /api/newsletter is unavailable in static hosting; fall back to Web3Forms below
  }

  if (!alreadySubscribed && !emailDispatched) {
    const web3Sent = await sendNewsletterViaWeb3Forms(email, source);
    if (web3Sent) {
      return {
        ok: true,
        message: serverMessage,
      };
    }
  }

  if (serverAccepted) {
    return {
      ok: true,
      message: serverMessage,
    };
  }

  return {
    ok: false,
    message: "Unable to connect right now. Please try again in a moment.",
  };
}
