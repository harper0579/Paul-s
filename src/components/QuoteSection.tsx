import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { CONTACT } from "../data/siteContent";
import { useMapsStatus } from "../context/MapsStatusContext";
import { usePlacesAutocomplete } from "../hooks/usePlacesAutocomplete";
import { getAccessToken, googleSignIn } from "../lib/gmailAuth";
import { sendGmailMessage } from "../lib/gmailApi";

export interface QuotePrefill {
  urgency?: "standard" | "emergency";
  projectType?: string;
  roofType?: string;
  town?: string;
  description?: string;
  timestamp?: number;
}

const PROJECT_TYPES = ["New Roof", "Replacement", "Repair / Leak", "Inspection"] as const;
const ROOF_TYPES = ["Metal", "Shingles", "Unsure"] as const;

function PlacesTownDropdown({
  query,
  open,
  onSelect,
}: {
  query: string;
  open: boolean;
  onSelect: (value: string) => void;
}) {
  const { suggestions, isLoading, selectSuggestion } = usePlacesAutocomplete(query, open);

  return (
    <>
      {isLoading && (
        <Loader2 className="w-4 h-4 text-[#0B6CB8] animate-spin absolute right-3.5 top-3.5 pointer-events-none" />
      )}
      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          aria-label="Address suggestions"
          className="absolute z-30 left-0 right-0 mt-1.5 rounded-xl border border-[#C3D6EA] bg-white shadow-lg overflow-hidden max-h-56 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => {
            const text = suggestion.placePrediction?.text?.text;
            if (!text) return null;
            return (
              <li key={`${text}-${index}`}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={async () => {
                    const place = await selectSuggestion(suggestion);
                    onSelect(place?.formattedAddress || place?.displayName || text);
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-sm text-[#081A33] hover:bg-[#EFF5FB] border-b last:border-b-0 border-[#E2ECF5] flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#0B6CB8] shrink-0" />
                  <span className="truncate">{text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export function QuoteSection() {
  const location = useLocation();
  const routePrefill = (location.state as QuotePrefill | null) ?? null;

  const [urgency, setUrgency] = useState<"standard" | "emergency">("standard");
  const [projectType, setProjectType] = useState("");
  const [roofType, setRoofType] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState("");
  const [townSuggestionsOpen, setTownSuggestionsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { hasApiKey, quotaExceeded } = useMapsStatus();
  const mapsAutocompleteActive = hasApiKey && !quotaExceeded;
  const [gmailConfirmOpen, setGmailConfirmOpen] = useState(false);
  const [gmailSending, setGmailSending] = useState(false);
  const [gmailSentNote, setGmailSentNote] = useState("");
  const [gmailError, setGmailError] = useState("");
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    message: string;
    emailDispatched: boolean;
    recipient: string;
    mailtoHref: string;
    subject: string;
    body: string;
  } | null>(null);

  useEffect(() => {
    if (!routePrefill) return;
    if (routePrefill.urgency) setUrgency(routePrefill.urgency);
    if (routePrefill.projectType) setProjectType(routePrefill.projectType);
    if (routePrefill.roofType) setRoofType(routePrefill.roofType);
    if (routePrefill.town) setTown(routePrefill.town);
    if (routePrefill.description) setDescription(routePrefill.description);
    setConfirmation(null);
    setErrorMsg("");
  }, [routePrefill]);

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

      let emailDispatched = Boolean(data.emailDispatched);
      let message: string = data.message;
      const recipient: string = data.recipient || CONTACT.email;

      // Web3Forms free keys are designed for direct browser requests
      if (!emailDispatched) {
        const accessKey =
          (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim() ||
          "f092d881-d9fe-4100-89cd-bf9879b1592f";

        if (accessKey) {
          try {
            const prefix =
              urgency === "emergency" ? "[URGENT 24/7 EMERGENCY]" : "[Quote Request]";
            const subject = `${prefix} ${projectType} (${roofType}) — ${name}${
              town ? ` in ${town}` : ""
            } [${data.referenceId}]`;

            const web3Res = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                access_key: accessKey,
                subject,
                from_name: name.trim(),
                email: email.trim() || undefined,
                phone: phone.trim(),
                town: town.trim() || "Not provided",
                urgency:
                  urgency === "emergency"
                    ? "24/7 Emergency Leak — Urgent"
                    : "Standard Quote / Inspection",
                project_type: projectType,
                roof_type: roofType,
                reference_id: data.referenceId,
                message: [
                  `Reference: ${data.referenceId}`,
                  `Urgency: ${
                    urgency === "emergency"
                      ? "24/7 Emergency Leak — Urgent"
                      : "Standard Quote / Inspection"
                  }`,
                  `Name: ${name.trim()}`,
                  `Phone: ${phone.trim()}`,
                  `Email: ${email.trim() || "Not provided"}`,
                  `Town: ${town.trim() || "Not provided"}`,
                  `Project Type: ${projectType}`,
                  `Roof Type: ${roofType}`,
                  "",
                  "Job Details:",
                  description.trim() || "No additional details provided.",
                ].join("\n"),
              }),
            });
            const web3Data = await web3Res.json().catch(() => ({}));
            if (web3Res.ok && web3Data?.success) {
              emailDispatched = true;
              message =
                urgency === "emergency"
                  ? `Urgent request ${data.referenceId} sent for ${name}. For an active leak right now, please also call ${CONTACT.phoneDisplay} — Paul answers 24/7.`
                  : `Quote request ${data.referenceId} sent for ${name}. Paul will follow up during business hours (Mon–Fri 6 a.m.–7 p.m.).`;
            }
          } catch {
            // Keep logged server reference and show mailto fallback
          }
        }
      }

      const subject = `${urgency === "emergency" ? "[URGENT 24/7 EMERGENCY] " : "[Quote Request] "}${projectType} (${roofType}) — ${name}${town ? ` in ${town}` : ""} [${data.referenceId}]`;
      const bodyText = [
        `Reference: ${data.referenceId}`,
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

      setGmailSentNote("");
      setGmailError("");
      setConfirmation({
        referenceId: data.referenceId,
        message,
        emailDispatched,
        recipient,
        mailtoHref: buildMailtoFallback(data.referenceId),
        subject,
        body: bodyText,
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
      className="scroll-mt-20 bg-gradient-to-b from-[#edf3f8] via-[#e4edf4] to-[#dbe6ef] text-[#081A33] py-14 px-4 sm:px-6 lg:px-8 border-t border-[#C3D6EA]"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-center text-xs font-bold tracking-wider uppercase text-[#0B6CB8] mb-2">
            Free estimates
          </p>
          <h1 className="text-center font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#081A33] leading-tight mb-4">
            Get a free quote or request
            <br />
            24/7 emergency repair
          </h1>
          <div className="flex justify-center sm:justify-end">
            <p className="max-w-md text-[#2A3D57] text-sm sm:text-base leading-relaxed">
              Tell us about the job and we&apos;ll send your request directly to{" "}
              <a
                href={CONTACT.emailHref}
                className="text-[#081A33] font-semibold hover:text-[#0B6CB8] underline underline-offset-2"
              >
                {CONTACT.email}
              </a>{" "}
              with a reference number. Active leak right now? Select 24/7 Emergency below and call
              anytime.
            </p>
          </div>
        </div>

        <div className="mb-7 rounded-2xl bg-[#eaf2f8] border border-[#b8cde0] p-6 shadow-sm">
          <h2 className="font-display text-base font-bold text-[#081A33] mb-3">
            It helps if you have these handy:
          </h2>
          <ul className="space-y-2 text-sm sm:text-base text-[#2A3D57]">
            <li className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full bg-[#0E8FE8] ring-2 ring-[#bae6fd] mt-2 shrink-0"
              />
              <span>Your town, and roughly how old the roof is (if you know it)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full bg-[#0E8FE8] ring-2 ring-[#bae6fd] mt-2 shrink-0"
              />
              <span>Metal or shingles &mdash; or &ldquo;not sure,&rdquo; that&apos;s fine too</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full bg-[#0E8FE8] ring-2 ring-[#bae6fd] mt-2 shrink-0"
              />
              <span>Where the leak or damage shows inside (which room, which wall)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full bg-[#0E8FE8] ring-2 ring-[#bae6fd] mt-2 shrink-0"
              />
              <span>Photos from the ground if you have them &mdash; never climb up to take one</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full bg-[#0E8FE8] ring-2 ring-[#bae6fd] mt-2 shrink-0"
              />
              <span>When it started, and whether it&apos;s still dripping</span>
            </li>
          </ul>
          <p className="mt-4 text-sm sm:text-base font-semibold text-[#0B6CB8]">
            Don&apos;t have all of that? Call anyway. Sorting it out is our job, not yours.
          </p>
        </div>

        <div className="rounded-2xl bg-[#eef4f9] border border-[#b8cde0] p-6 sm:p-7 shadow-md">
          {confirmation ? (
            <div
              className="rounded-xl border border-[#86efac] bg-[#cbead7]/60 p-6"
              role="status"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#15803d] shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-display text-xl font-bold text-[#081A33]">
                    {urgency === "emergency"
                      ? "24/7 emergency request logged"
                      : "Quote request received"}
                  </h2>
                  <p className="mt-1.5 text-sm sm:text-base text-[#14532d]">
                    {confirmation.message}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[#cbead7] border border-[#86efac] px-3 py-1 text-xs font-semibold text-[#14532d] tabular-nums">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d] shrink-0" />
                    <span>
                      Your reference is {confirmation.referenceId} &middot; Destination:{" "}
                      {confirmation.recipient}
                    </span>
                  </p>
                  {gmailSentNote && (
                    <p className="mt-2 text-xs font-semibold text-[#15803d]">{gmailSentNote}</p>
                  )}
                  {gmailError && (
                    <p className="mt-2 text-xs font-semibold text-[#B91C1C]" role="alert">
                      {gmailError}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={CONTACT.phoneHref}
                      className="btn-call-glow inline-flex items-center gap-2 px-5 py-2.5 min-h-10 font-display text-sm font-extrabold"
                    >
                      <Phone className="w-4 h-4 text-[#45BCFF]" />
                      Call Now
                    </a>
                    {!confirmation.emailDispatched && (
                      <a
                        href={confirmation.mailtoHref}
                        className="btn-quote-glow inline-flex items-center gap-2 px-5 py-2.5 min-h-10 font-display text-sm font-extrabold"
                      >
                        <Mail className="w-4 h-4" />
                        Email copy to Paul
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={async () => {
                        setGmailError("");
                        try {
                          let token = getAccessToken();
                          if (!token) {
                            const res = await googleSignIn();
                            token = res.accessToken;
                          }
                          if (token) setGmailConfirmOpen(true);
                        } catch (err) {
                          setGmailError(
                            err instanceof Error
                              ? err.message
                              : "Google sign-in is required to send via Gmail."
                          );
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-10 rounded-full border border-[#94a3b8] bg-white hover:border-[#0B6CB8] text-sm font-semibold text-[#081A33] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Send via Gmail
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmation(null);
                        setDescription("");
                        setGmailSentNote("");
                        setGmailError("");
                      }}
                      className="px-4 py-2.5 min-h-10 rounded-full border border-[#94a3b8] bg-[#e2ebf3] hover:bg-[#d5e2ee] text-sm font-semibold text-[#081A33] cursor-pointer"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <span className="block text-sm font-bold text-[#081A33] mb-2.5">
                  Request urgency
                </span>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  role="group"
                  aria-label="Request urgency"
                >
                  <button
                    type="button"
                    aria-pressed={urgency === "standard"}
                    onClick={() => setUrgency("standard")}
                    className={`py-2.5 px-4 min-h-11 rounded-xl text-sm font-semibold border transition-all text-center cursor-pointer ${
                      urgency === "standard"
                        ? "bg-[#081224] text-white border-[#081224] shadow-sm"
                        : "bg-[#f4f8fb] text-[#081A33] border-[#94a3b8] hover:border-[#0B6CB8]"
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
                    className={`py-2.5 px-4 min-h-11 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      urgency === "emergency"
                        ? "bg-red-50 text-red-900 border-red-700 shadow-sm"
                        : "bg-[#f4f8fb] text-[#7f1d1d] border-[#b97a7a] hover:border-red-700"
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 text-[#7f1d1d] shrink-0" />
                    <span>24/7 Emergency Leak &mdash; Urgent</span>
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold text-[#081A33] mb-2.5">
                  1 &middot; What type of project is this?
                </span>
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                  role="group"
                  aria-label="Project type"
                >
                  {PROJECT_TYPES.map((option) => {
                    const isSelected = projectType === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setProjectType(option);
                          setErrorMsg("");
                        }}
                        className={`py-2.5 px-3 min-h-11 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-b from-[#0ea5e9] to-[#0284c7] text-white border-[#0284c7] shadow-[0_4px_12px_rgba(2,132,199,0.35)]"
                            : "bg-[#f4f8fb] text-[#081A33] border-[#94a3b8] hover:border-[#0B6CB8]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold text-[#081A33] mb-2.5">
                  2 &middot; What type of roof?
                </span>
                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                  role="group"
                  aria-label="Roof type"
                >
                  {ROOF_TYPES.map((option) => {
                    const isSelected = roofType === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setRoofType(option);
                          setErrorMsg("");
                        }}
                        className={`py-2.5 px-4 min-h-11 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-b from-[#0ea5e9] to-[#0284c7] text-white border-[#0284c7] shadow-[0_4px_12px_rgba(2,132,199,0.35)]"
                            : "bg-[#f4f8fb] text-[#081A33] border-[#94a3b8] hover:border-[#0B6CB8]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="qDesc" className="block text-sm font-bold text-[#081A33] mb-2">
                  3 &middot; Tell us about the job
                </label>
                <div className="rounded-xl bg-[#f1f6fa] border border-[#94a3b8] focus-within:border-[#0B6CB8] focus-within:ring-1 focus-within:ring-[#0B6CB8]">
                  <textarea
                    id="qDesc"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Roof size if you know it, what's leaking, timing — anything that helps."
                    className="w-full rounded-xl bg-transparent px-4 py-3 text-sm sm:text-base text-[#081A33] placeholder-[#47617F] focus:outline-none"
                  />
                </div>
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
                    placeholder="Full name"
                    className="w-full min-h-11 rounded-xl bg-[#f1f6fa] border border-[#94a3b8] px-4 py-2.5 text-sm sm:text-base text-[#081A33] placeholder-[#47617F] focus:outline-none focus:border-[#0B6CB8] focus:ring-1 focus:ring-[#0B6CB8]"
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
                    className="w-full min-h-11 rounded-xl bg-[#f1f6fa] border border-[#94a3b8] px-4 py-2.5 text-sm sm:text-base text-[#081A33] placeholder-[#47617F] focus:outline-none focus:border-[#0B6CB8] focus:ring-1 focus:ring-[#0B6CB8]"
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
                    placeholder="Email"
                    className="w-full min-h-11 rounded-xl bg-[#f1f6fa] border border-[#94a3b8] px-4 py-2.5 text-sm sm:text-base text-[#081A33] placeholder-[#47617F] focus:outline-none focus:border-[#0B6CB8] focus:ring-1 focus:ring-[#0B6CB8]"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="qTown" className="block text-sm font-bold text-[#081A33] mb-1.5">
                    Town or street address
                  </label>
                  <div className="relative">
                    <input
                      id="qTown"
                      type="text"
                      value={town}
                      onFocus={() => setTownSuggestionsOpen(true)}
                      onBlur={() => {
                        window.setTimeout(() => setTownSuggestionsOpen(false), 180);
                      }}
                      onChange={(e) => {
                        setTown(e.target.value);
                        setTownSuggestionsOpen(true);
                      }}
                      placeholder="e.g. Quispamsis or street address"
                      className="w-full min-h-11 rounded-xl bg-[#f1f6fa] border border-[#94a3b8] px-4 py-2.5 pr-10 text-sm sm:text-base text-[#081A33] placeholder-[#47617F] focus:outline-none focus:border-[#0B6CB8] focus:ring-1 focus:ring-[#0B6CB8]"
                    />
                    {mapsAutocompleteActive && (
                      <PlacesTownDropdown
                        query={town}
                        open={townSuggestionsOpen}
                        onSelect={(value) => {
                          setTown(value);
                          setTownSuggestionsOpen(false);
                        }}
                      />
                    )}
                  </div>
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
                  className={`px-6 py-2.5 min-h-11 rounded-full text-white font-display font-bold text-sm transition-all cursor-pointer disabled:opacity-60 ${
                    urgency === "emergency"
                      ? "bg-[#B91C1C] hover:bg-[#991B1B] shadow-[0_4px_14px_rgba(185,28,28,0.35)]"
                      : "btn-quote-glow"
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
                  className="btn-call-glow px-5 py-2.5 min-h-11 font-display font-bold text-sm inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#45BCFF]" />
                  <span>Call Now</span>
                </a>

                <a
                  href={CONTACT.emailHref}
                  className="px-5 py-2.5 min-h-11 rounded-full bg-[#e2ebf3] hover:bg-[#d5e2ee] text-[#081A33] font-semibold text-sm border border-[#94a3b8] transition-all inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#47617F]" />
                  <span>Email: {CONTACT.email}</span>
                </a>
              </div>

              <p className="text-xs sm:text-sm text-[#47617F] pt-1">{CONTACT.hours}</p>
            </form>
          )}
        </div>
      </div>

      {gmailConfirmOpen && confirmation && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmQuoteGmailTitle"
          className="fixed inset-0 z-50 bg-[#050D20]/80 flex items-center justify-center p-4"
        >
          <div className="bg-white w-full max-w-md rounded-2xl border border-[#C3D6EA] p-6 space-y-4">
            <h3
              id="confirmQuoteGmailTitle"
              className="font-display text-lg font-bold text-[#081A33]"
            >
              Send this quote request via your Gmail?
            </h3>
            <div className="text-sm text-[#2A3D57] space-y-1.5">
              <p>
                <strong className="text-[#081A33]">To:</strong> {confirmation.recipient}
              </p>
              <p>
                <strong className="text-[#081A33]">Subject:</strong> {confirmation.subject}
              </p>
            </div>
            <pre className="rounded-lg bg-[#EFF5FB] border border-[#C3D6EA] p-3 text-xs text-[#2A3D57] whitespace-pre-wrap max-h-40 overflow-y-auto font-sans">
              {confirmation.body}
            </pre>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                disabled={gmailSending}
                onClick={() => setGmailConfirmOpen(false)}
                className="px-4 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={gmailSending}
                onClick={async () => {
                  const token = getAccessToken();
                  if (!token) {
                    setGmailConfirmOpen(false);
                    setGmailError("Google session expired. Please click Send via Gmail again.");
                    return;
                  }
                  setGmailSending(true);
                  setGmailError("");
                  try {
                    await sendGmailMessage(token, {
                      to: confirmation.recipient,
                      subject: confirmation.subject,
                      body: confirmation.body,
                    });
                    setGmailSentNote(`Sent directly via your Gmail to ${confirmation.recipient}.`);
                    setGmailConfirmOpen(false);
                  } catch (err) {
                    setGmailError(
                      err instanceof Error ? err.message : "Failed to send email via Gmail."
                    );
                    setGmailConfirmOpen(false);
                  } finally {
                    setGmailSending(false);
                  }
                }}
                className="px-5 py-2 min-h-10 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold cursor-pointer disabled:opacity-60"
              >
                {gmailSending ? "Sending..." : "Confirm & Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default QuoteSection;
