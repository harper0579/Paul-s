import { useEffect, useState, type FormEvent } from "react";
import { AlertTriangle, CheckCircle2, Mail, Phone } from "lucide-react";
import { CONTACT } from "../data/siteContent";

export interface QuotePrefill {
  urgency?: "standard" | "emergency";
  projectType?: string;
  roofType?: string;
  town?: string;
  description?: string;
  timestamp: number;
}

interface QuoteSectionProps {
  prefill: QuotePrefill | null;
}

const PROJECT_TYPES = ["New Roof", "Replacement", "Repair / Leak", "Inspection"] as const;
const ROOF_TYPES = ["Metal", "Shingles", "Unsure"] as const;

export function QuoteSection({ prefill }: QuoteSectionProps) {
  const [urgency, setUrgency] = useState<"standard" | "emergency">("standard");
  const [projectType, setProjectType] = useState("");
  const [roofType, setRoofType] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    message: string;
    emailDispatched: boolean;
    recipient: string;
    mailtoHref: string;
  } | null>(null);

  useEffect(() => {
    if (!prefill) return;
    if (prefill.urgency) setUrgency(prefill.urgency);
    if (prefill.projectType) setProjectType(prefill.projectType);
    if (prefill.roofType) setRoofType(prefill.roofType);
    if (prefill.town) setTown(prefill.town);
    if (prefill.description) {
      setDescription((prev) => (prev ? prev : prefill.description ?? ""));
    }
    setConfirmation(null);
    setErrorMsg("");
  }, [prefill]);

  function buildMailtoFallback(referenceId: string): string {
    const subject = `${urgency === "emergency" ? "[URGENT 24/7 EMERGENCY] " : ""}${projectType} (${roofType}) — ${name} [${referenceId}]`;
    const body = [
      `Reference: ${referenceId}`,
      `Urgency: ${urgency === "emergency" ? "24/7 Emergency Leak" : "Standard Quote / Inspection"}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Town: ${town || "Not provided"}`,
      `Project: ${projectType}`,
      `Roof: ${roofType}`,
      "",
      description || "No additional notes.",
    ].join("\n");
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const missing: string[] = [];
    if (!projectType) missing.push("a project type");
    if (!roofType) missing.push("a roof type");
    if (!name.trim()) missing.push("your name");
    if (!phone.trim()) missing.push("your phone number");

    if (missing.length > 0) {
      setErrorMsg(
        `Please add ${missing.join(", ")} so Paul can quote the job and call you back.`
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          urgency,
          projectType,
          roofType,
          description,
          name,
          phone,
          email,
          town,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(
          data.error ||
            `Unable to send your quote request. Please call ${CONTACT.phoneDisplay} or email ${CONTACT.email}.`
        );
        return;
      }

      setConfirmation({
        referenceId: data.referenceId,
        message: data.message,
        emailDispatched: Boolean(data.emailDispatched),
        recipient: data.recipient || CONTACT.email,
        mailtoHref: buildMailtoFallback(data.referenceId),
      });
    } catch {
      setErrorMsg(
        `Network error sending your request. Please call ${CONTACT.phoneDisplay} or email ${CONTACT.email}.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="quote"
      className="scroll-mt-20 py-14 lg:py-16 bg-white border-t border-[#C3D6EA]"
    >
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">Free estimate</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
          Get a free quote or request 24/7 emergency repair
        </h2>
        <p className="mt-3 text-base text-[#47617F] max-w-2xl">
          Tell us about the job and hit send — your request routes directly to{" "}
          <span className="font-semibold text-[#081A33]">{CONTACT.email}</span> with a reference
          number. Active leak right now? Select 24/7 Emergency below and call anytime.
        </p>

        <div className="mt-6 rounded-xl border border-[#C3D6EA] bg-[#EFF5FB] p-5">
          <h3 className="font-display text-base font-bold text-[#081A33]">
            Before you call — have these handy if you can
          </h3>
          <ul className="mt-2.5 list-disc pl-5 space-y-1 text-sm text-[#2A3D57]">
            <li>Your town, and roughly how old the roof is if you know it</li>
            <li>Metal or shingles — or &ldquo;not sure,&rdquo; that&apos;s fine too</li>
            <li>Where the leak or damage shows inside: which room, which wall</li>
            <li>Photos from the ground if you have them — never climb up to take one</li>
            <li>When it started, and whether it&apos;s still dripping</li>
          </ul>
          <p className="mt-3 text-xs sm:text-sm text-[#47617F]">
            Don&apos;t have half of that? Call anyway. Sorting it out is our job, not yours.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#C3D6EA] bg-white p-6 sm:p-8">
          {confirmation ? (
            <div
              className="rounded-xl border border-[#15803D]/30 bg-emerald-50/70 p-6"
              role="status"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-xl font-bold text-[#081A33]">
                    {urgency === "emergency"
                      ? "24/7 emergency request logged"
                      : "Quote request received"}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#2A3D57]">
                    {confirmation.message}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-[#47617F] tabular-nums">
                    Reference: {confirmation.referenceId} &middot; Destination:{" "}
                    {confirmation.recipient}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={CONTACT.phoneHref}
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-10 rounded-lg bg-[#081A33] text-white font-display text-sm font-bold"
                    >
                      <Phone className="w-4 h-4" />
                      Call {CONTACT.phoneDisplay}
                    </a>
                    {!confirmation.emailDispatched && (
                      <a
                        href={confirmation.mailtoHref}
                        className="inline-flex items-center gap-2 px-4 py-2.5 min-h-10 rounded-lg bg-[#0E8FE8] text-white font-display text-sm font-bold"
                      >
                        <Mail className="w-4 h-4" />
                        Email copy to Paul
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmation(null);
                        setDescription("");
                      }}
                      className="px-4 py-2.5 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] hover:bg-[#EFF5FB] cursor-pointer"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <span className="block text-sm font-bold text-[#081A33] mb-2.5">
                  Request urgency
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="group" aria-label="Request urgency">
                  <button
                    type="button"
                    aria-pressed={urgency === "standard"}
                    onClick={() => setUrgency("standard")}
                    className={`px-4 py-2.5 min-h-11 rounded-lg border text-sm font-semibold transition-colors duration-150 cursor-pointer text-left ${
                      urgency === "standard"
                        ? "bg-[#081A33] border-[#081A33] text-white"
                        : "bg-white border-[#C3D6EA] text-[#081A33] hover:border-[#0B6CB8]"
                    }`}
                  >
                    Standard Quote / Free Inspection
                  </button>
                  <button
                    type="button"
                    aria-pressed={urgency === "emergency"}
                    onClick={() => {
                      setUrgency("emergency");
                      if (!projectType) setProjectType("Repair / Leak");
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-lg border text-sm font-semibold transition-colors duration-150 cursor-pointer text-left ${
                      urgency === "emergency"
                        ? "bg-[#B91C1C] border-[#B91C1C] text-white"
                        : "bg-white border-[#C3D6EA] text-[#B91C1C] hover:border-[#B91C1C]"
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    24/7 Emergency Leak — Urgent
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold text-[#081A33] mb-2.5">
                  1 &middot; What type of project is this?
                </span>
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
                  role="group"
                  aria-label="Project type"
                >
                  {PROJECT_TYPES.map((type) => {
                    const selected = projectType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          setProjectType(type);
                          setErrorMsg("");
                        }}
                        className={`px-3 py-2.5 min-h-11 rounded-lg border text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                          selected
                            ? "bg-[#0E8FE8] border-[#0E8FE8] text-white"
                            : "bg-white border-[#C3D6EA] text-[#081A33] hover:border-[#0B6CB8]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold text-[#081A33] mb-2.5">
                  2 &middot; What type of roof?
                </span>
                <div className="grid grid-cols-3 gap-2.5" role="group" aria-label="Roof type">
                  {ROOF_TYPES.map((type) => {
                    const selected = roofType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          setRoofType(type);
                          setErrorMsg("");
                        }}
                        className={`px-3 py-2.5 min-h-11 rounded-lg border text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                          selected
                            ? "bg-[#0E8FE8] border-[#0E8FE8] text-white"
                            : "bg-white border-[#C3D6EA] text-[#081A33] hover:border-[#0B6CB8]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="qDesc" className="block text-sm font-bold text-[#081A33] mb-2">
                  3 &middot; Tell us about the job
                </label>
                <textarea
                  id="qDesc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Roof size if you know it, what's leaking, timing — anything that helps."
                  className="w-full rounded-xl border border-[#C3D6EA] bg-white px-4 py-3 text-base text-[#081A33] placeholder:text-[#47617F] focus:outline-none focus:border-[#0B6CB8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="qName" className="block text-sm font-bold text-[#081A33] mb-1.5">
                    Your name *
                  </label>
                  <input
                    id="qName"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-h-12 rounded-xl border border-[#C3D6EA] bg-white px-4 py-2.5 text-base text-[#081A33] focus:outline-none focus:border-[#0B6CB8]"
                  />
                </div>
                <div>
                  <label htmlFor="qPhone" className="block text-sm font-bold text-[#081A33] mb-1.5">
                    Phone *
                  </label>
                  <input
                    id="qPhone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(506) 555-0199"
                    className="w-full min-h-12 rounded-xl border border-[#C3D6EA] bg-white px-4 py-2.5 text-base text-[#081A33] placeholder:text-[#47617F] focus:outline-none focus:border-[#0B6CB8]"
                  />
                </div>
                <div>
                  <label htmlFor="qEmail" className="block text-sm font-bold text-[#081A33] mb-1.5">
                    Email
                  </label>
                  <input
                    id="qEmail"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-h-12 rounded-xl border border-[#C3D6EA] bg-white px-4 py-2.5 text-base text-[#081A33] focus:outline-none focus:border-[#0B6CB8]"
                  />
                </div>
                <div>
                  <label htmlFor="qTown" className="block text-sm font-bold text-[#081A33] mb-1.5">
                    Town
                  </label>
                  <input
                    id="qTown"
                    type="text"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    placeholder="e.g. Quispamsis"
                    className="w-full min-h-12 rounded-xl border border-[#C3D6EA] bg-white px-4 py-2.5 text-base text-[#081A33] placeholder:text-[#47617F] focus:outline-none focus:border-[#0B6CB8]"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-sm font-bold text-[#B91C1C]" role="alert">
                  {errorMsg}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-6 py-3 min-h-12 rounded-lg text-white font-display text-base font-bold cursor-pointer transition-colors duration-150 disabled:opacity-60 ${
                    urgency === "emergency"
                      ? "bg-[#B91C1C] hover:bg-[#991B1B]"
                      : "bg-[#0E8FE8] hover:bg-[#0B6CB8]"
                  }`}
                >
                  {submitting
                    ? "Sending request..."
                    : urgency === "emergency"
                    ? "Send 24/7 Emergency Request"
                    : "Send My Quote Request"}
                </button>

                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-12 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold transition-colors duration-150"
                >
                  <Phone className="w-4 h-4" />
                  Call {CONTACT.phoneDisplay}
                </a>

                <a
                  href={CONTACT.emailHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-12 rounded-lg border border-[#C3D6EA] hover:border-[#0B6CB8] text-[#081A33] font-semibold text-sm transition-colors duration-150"
                >
                  <Mail className="w-4 h-4" />
                  Email {CONTACT.email}
                </a>
              </div>

              <p className="text-xs sm:text-sm text-[#47617F]">{CONTACT.hours}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
