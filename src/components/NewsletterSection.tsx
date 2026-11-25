import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "home-stay-updated" }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setMessage(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again."
        );
        return;
      }

      setStatus("success");
      setMessage(
        typeof data?.message === "string"
          ? data.message
          : "You're subscribed for seasonal roofing tips."
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Unable to connect right now. Please try again in a moment.");
    }
  }

  return (
    <section
      aria-labelledby="stay-updated-heading"
      className="py-12 lg:py-14 bg-[#EFF5FB] border-t border-[#C3D6EA]"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="rounded-2xl border border-[#C3D6EA] bg-white p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
              Stay Updated
            </p>
            <h2
              id="stay-updated-heading"
              className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-[#081A33] text-balance"
            >
              Seasonal roofing tips straight to your inbox
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#47617F] leading-relaxed">
              Practical reminders from Paul for spring inspections, fall gutter prep, ice dam
              prevention, and storm readiness across Southern New Brunswick.
            </p>
          </div>

          <div className="lg:col-span-6">
            {status === "success" ? (
              <div
                role="status"
                className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-4 sm:p-5 flex items-start gap-3 text-[#166534]"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#15803D]" aria-hidden="true" />
                <div>
                  <p className="font-display font-bold text-sm sm:text-base text-[#14532D]">
                    Subscribed
                  </p>
                  <p className="mt-0.5 text-sm text-[#166534]">{message}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <Mail
                      className="w-4 h-4 text-[#47617F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") {
                          setStatus("idle");
                          setMessage("");
                        }
                      }}
                      placeholder="Enter your email address"
                      aria-invalid={status === "error"}
                      className="w-full min-h-12 pl-10 pr-4 py-2.5 rounded-xl border border-[#C3D6EA] bg-[#F8FAFD] text-sm sm:text-base text-[#081A33] placeholder:text-[#647D99] focus:outline-none focus:bg-white focus:border-[#0B6CB8] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-quote-glow inline-flex items-center justify-center gap-2 px-6 py-3 min-h-12 font-display text-sm sm:text-base font-extrabold whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{status === "submitting" ? "Subscribing..." : "Get Seasonal Tips"}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {status === "error" && message && (
                  <p role="alert" className="text-xs sm:text-sm font-semibold text-[#B91C1C]">
                    {message}
                  </p>
                )}

                <p className="text-xs text-[#47617F]">
                  Just seasonal maintenance reminders &mdash; no spam, unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
