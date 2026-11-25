import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Home, ShieldCheck, Wrench } from "lucide-react";
import { CONTACT, SECONDARY_SERVICES } from "../data/siteContent";

interface SecondaryServicesGridProps {
  variant: "home" | "services";
}

function ServiceImage({
  src,
  alt,
  title,
  index,
}: {
  src: string;
  alt: string;
  title: string;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const FallbackIcon = index === 0 ? Home : index === 1 ? Wrench : ShieldCheck;

  return (
    <div className="aspect-square w-full bg-[#081A33] overflow-hidden relative">
      {failed ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 p-6 bg-gradient-to-br from-[#081A33] via-[#0B2A4F] to-[#0B6CB8]/40 text-center">
          <FallbackIcon className="w-8 h-8 text-[#45BCFF]" aria-hidden="true" />
          <span className="font-display text-sm font-bold text-white max-w-[22ch] text-balance">
            {title}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover block"
        />
      )}
    </div>
  );
}

export function SecondaryServicesGrid({ variant }: SecondaryServicesGridProps) {
  const HeadingTag = variant === "home" ? "h3" : "h2";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SECONDARY_SERVICES.map((svc, idx) => (
        <article
          key={svc.title}
          className="group rounded-2xl border border-[#C3D6EA] bg-white overflow-hidden shadow-xs hover:border-[#0E8FE8] transition-colors duration-200 flex flex-col justify-between"
        >
          <div className="flex-1 flex flex-col">
            <ServiceImage
              src={svc.imageSrc}
              alt={svc.imageAlt}
              title={svc.title}
              index={idx}
            />

            <div className="px-5 pt-4 pb-5 flex-1 flex flex-col">
              <HeadingTag className="sr-only">{svc.title}</HeadingTag>

              <p className="text-sm text-[#47617F] leading-relaxed">
                {svc.description}
              </p>

              <ul className="mt-3.5 pt-3.5 border-t border-[#EFF5FB] space-y-2 text-sm text-[#2A3D57]">
                {svc.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0B6CB8] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {variant === "services" && svc.hasVisualizers && (
                <div className="mt-4 pt-3 border-t border-[#EFF5FB] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm">
                  <span className="text-[#47617F] font-medium">Preview colours:</span>
                  <a
                    href={CONTACT.ikoVisualizerHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#0B6CB8] hover:underline whitespace-nowrap"
                  >
                    IKO Roof Viewer
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={CONTACT.bpVisualizerHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#0B6CB8] hover:underline whitespace-nowrap"
                  >
                    BP Canada
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="px-5 pb-5 pt-4 border-t border-[#EFF5FB] flex items-center justify-between gap-3">
            {variant === "home" ? (
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B6CB8] hover:text-[#081A33] hover:underline whitespace-nowrap shrink-0"
              >
                <span>Service details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="text-xs font-medium text-[#47617F] whitespace-nowrap">
                Free itemized estimate
              </span>
            )}

            <Link
              to="/quote"
              state={{
                projectType: svc.defaultProjectType,
                roofType: svc.defaultRoofType,
                description: `Interested in ${svc.title}.`,
                timestamp: Date.now(),
              }}
              className="btn-quote-glow inline-flex items-center justify-center px-4 py-2.5 min-h-10 font-display text-sm font-extrabold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Get a Quote
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
