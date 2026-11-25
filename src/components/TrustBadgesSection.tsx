import { Award, MapPin, ShieldCheck } from "lucide-react";

const TRUST_PILLARS = [
  {
    title: "Licensed & Insured",
    subtitle: "Full Liability & WCB Coverage",
    description:
      "Every crew member and project is protected with full liability insurance and WorkSafeNB coverage.",
    icon: ShieldCheck,
  },
  {
    title: "30 Years Experience",
    subtitle: "Proven Craftsmanship Since Day One",
    description:
      "Three decades installing standing-seam metal roofs, architectural shingles, and storm repairs.",
    icon: Award,
  },
  {
    title: "Local NB Owned",
    subtitle: "Quispamsis & Southern NB",
    description:
      "Your neighbours in New Brunswick — building roofs engineered for Bay of Fundy wind, salt air, and snow load.",
    icon: MapPin,
  },
] as const;

export function TrustBadgesSection() {
  return (
    <section
      aria-label="Credentials and local trust"
      className="py-8 lg:py-10 bg-white border-b border-[#C3D6EA]"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {TRUST_PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-[#C3D6EA] bg-[#F8FAFD] p-5 sm:p-6 flex items-start gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-[#081A33] text-[#45BCFF] flex items-center justify-center shrink-0 shadow-xs"
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-base sm:text-lg font-extrabold text-[#081A33] leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-0.5 text-xs font-bold text-[#0B6CB8]">
                    {item.subtitle}
                  </p>
                  <p className="mt-1.5 text-sm text-[#47617F] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
