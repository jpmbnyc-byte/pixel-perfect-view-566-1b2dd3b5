import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import type { GalleryShot } from "@/lib/imageRegistry";
import { cn } from "@/lib/utils";

type Props = {
  shots: GalleryShot[];
  productName: string;
};

/**
 * Horizontal snap strip on the PDP. Tap opens a vertical pop-zoom
 * scroller; tap again inside the overlay to toggle 2× zoom.
 */
export function ProductZoomGallery({ shots, productName }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const verticalRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    setZoomed(false);
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const node = verticalRef.current?.querySelector<HTMLElement>(`[data-shot="${openIndex}"]`);
    node?.scrollIntoView({ block: "start" });
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, close]);

  if (shots.length === 0) return null;

  return (
    <>
      <div className="-mx-4 sm:mx-0">
        <div
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-0 [&::-webkit-scrollbar]:hidden"
          role="list"
          aria-label={`${productName} images`}
        >
          {shots.map((shot, index) => (
            <button
              key={`${shot.src}-${index}`}
              type="button"
              role="listitem"
              onClick={() => {
                setZoomed(false);
                setOpenIndex(index);
              }}
              className="relative aspect-[3/4] w-[min(86vw,28rem)] shrink-0 snap-center overflow-hidden bg-[color-mix(in_oklab,var(--paper)_70%,white)] focus-ring sm:w-full sm:min-w-[18rem]"
              aria-label={`View ${shot.alt || productName}, tap to zoom`}
            >
              <img
                src={shot.src}
                alt={shot.alt || `${productName}`}
                className="h-full w-full object-contain object-center"
                draggable={false}
              />
            </button>
          ))}
        </div>
        <p className="place-line mt-3 px-4 text-ink/40 sm:px-0">Swipe · tap to zoom</p>
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[80] bg-black/92 text-bone animate-in fade-in-0 zoom-in-95 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} zoom gallery`}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 tap-44 inline-flex size-11 items-center justify-center text-bone focus-ring"
            aria-label="Close zoom"
          >
            <X className="size-5" strokeWidth={1.25} />
          </button>
          <p className="place-line absolute left-4 top-6 text-bone/50">
            {zoomed ? "Tap to reset" : "Scroll · tap to zoom"}
          </p>
          <div
            ref={verticalRef}
            className={cn(
              "h-full snap-y snap-mandatory overflow-y-auto pt-16",
              zoomed && "snap-none",
            )}
          >
            {shots.map((shot, index) => (
              <button
                key={`zoom-${shot.src}-${index}`}
                type="button"
                data-shot={index}
                onClick={() => setZoomed((value) => !value)}
                className="flex min-h-[88dvh] w-full snap-start items-center justify-center px-2 py-6"
              >
                <img
                  src={shot.src}
                  alt={shot.alt || productName}
                  className={cn(
                    "max-h-[82dvh] w-auto max-w-full object-contain transition-transform duration-300 ease-out",
                    zoomed && index === openIndex ? "origin-center scale-[1.85]" : "scale-100",
                  )}
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
