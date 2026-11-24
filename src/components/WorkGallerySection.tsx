import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { GALLERY_ITEMS } from "../data/siteContent";

export function WorkGallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft")
        setLightboxIdx((idx) => (idx === null ? null : Math.max(0, idx - 1)));
      if (e.key === "ArrowRight")
        setLightboxIdx((idx) =>
          idx === null ? null : Math.min(GALLERY_ITEMS.length - 1, idx + 1)
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIdx]);

  const activeItem = lightboxIdx !== null ? GALLERY_ITEMS[lightboxIdx] : null;

  return (
    <>
      <section id="work" className="scroll-mt-20 py-14 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">Our work</p>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
                Roofs we&apos;re proud of
              </h1>
              <p className="mt-3 text-base text-[#47617F] max-w-2xl">
                Metal and shingle work across Southern New Brunswick — built to protect, built to
                last. Click any project photo to inspect up close.
              </p>
            </div>
            <Link
              to="/quote"
              className="inline-flex items-center justify-center px-5 py-2.5 min-h-11 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold whitespace-nowrap shrink-0 transition-colors"
            >
              Book a free inspection
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {GALLERY_ITEMS.map((item, idx) => (
              <figure
                key={item.src}
                className={`group rounded-2xl border border-[#C3D6EA] bg-white overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 ${
                  item.wide ? "md:col-span-2" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  className="relative block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6CB8]"
                  aria-label={`View larger photo: ${item.title}`}
                >
                  <div className="overflow-hidden bg-[#081A33]">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#081A33]/75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </button>
                <figcaption className="p-5">
                  <div className="font-display text-lg font-bold text-[#081A33]">{item.title}</div>
                  <p className="mt-1 text-sm text-[#47617F]">{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div className="relative bg-[#050D20] text-white overflow-hidden">
        <img
          src="/images/coastal-row.jpg"
          alt="Aerial view of six New Brunswick homes in a row with metal roofs in blue, red, green, charcoal, tan and silver."
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-auto md:h-[360px] md:object-cover md:opacity-60 block"
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#050D20]/90 via-[#050D20]/65 to-[#050D20]/30"
        />
        <div className="md:absolute md:inset-0 flex items-center py-8 md:py-0">
          <div className="max-w-6xl w-full mx-auto px-4 lg:px-6">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight text-white max-w-xl">
              Rain. Snow. Salt air. <span className="text-[#45BCFF]">Still standing.</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#DCE9F8] max-w-xl">
              Six roofs, six colours, one street — every house in the row, up close. This is the
              weather our roofs are built for.
            </p>
          </div>
        </div>
      </div>

      {activeItem && lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setLightboxIdx(null)}
          className="fixed inset-0 z-50 bg-[#050D20]/90 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-[#C3D6EA]"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C3D6EA] bg-[#EFF5FB]">
              <div className="text-sm font-semibold text-[#47617F] tabular-nums">
                Project {lightboxIdx + 1} of {GALLERY_ITEMS.length}
              </div>
              <button
                type="button"
                onClick={() => setLightboxIdx(null)}
                aria-label="Close photo preview"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#C3D6EA] bg-white text-[#081A33] hover:bg-[#E4EFFA] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#050D20] max-h-[65vh] flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold text-[#081A33]">
                  {activeItem.title}
                </h3>
                <p className="mt-1 text-sm text-[#47617F]">{activeItem.caption}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setLightboxIdx((idx) => (idx !== null ? Math.max(0, idx - 1) : 0))}
                  disabled={lightboxIdx === 0}
                  className="inline-flex items-center gap-1 px-3.5 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] hover:bg-[#EFF5FB] disabled:opacity-40 cursor-pointer disabled:cursor-default"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIdx((idx) =>
                      idx !== null ? Math.min(GALLERY_ITEMS.length - 1, idx + 1) : 0
                    )
                  }
                  disabled={lightboxIdx === GALLERY_ITEMS.length - 1}
                  className="inline-flex items-center gap-1 px-3.5 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] hover:bg-[#EFF5FB] disabled:opacity-40 cursor-pointer disabled:cursor-default"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
