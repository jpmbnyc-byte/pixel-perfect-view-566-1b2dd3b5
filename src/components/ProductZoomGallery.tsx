import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import type { GalleryShot } from "@/lib/imageRegistry";
import { cn } from "@/lib/utils";

type Props = {
  shots: GalleryShot[];
  productName: string;
};

/**
 * Contained horizontal strip. Zoom opens a viewport portal so scale/pan
 * never changes the PDP column or the product copy beside it.
 */
export function ProductZoomGallery({ shots, productName }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const verticalRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    setZoomed(false);
  }, []);

  useEffect(() => {
    setMounted(true);
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
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [openIndex, close]);

  if (shots.length === 0) return null;

  const lightbox =
    mounted && openIndex !== null
      ? createPortal(
          <div
            className="fixed inset-0 z-[80] overflow-hidden bg-black/92 text-bone animate-in fade-in-0 duration-200"
            role="dialog"
            aria-modal="true"
            aria-label={`${productName} zoom gallery`}
            data-photo-lightbox=""
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 tap-44 inline-flex size-11 items-center justify-center text-bone focus-ring"
              aria-label="Close zoom"
            >
              <X className="size-5" strokeWidth={1.25} />
            </button>
            <p className="place-line absolute left-4 top-6 z-10 text-bone/50">
              {zoomed ? "Tap to reset" : "Scroll · tap to zoom"}
            </p>
            <div
              ref={verticalRef}
              className={cn(
                "h-full overflow-y-auto overflow-x-hidden overscroll-contain pt-16",
                zoomed ? "snap-none overflow-auto" : "snap-y snap-mandatory",
              )}
            >
              {shots.map((shot, index) => (
                <button
                  key={`zoom-${shot.src}-${index}`}
                  type="button"
                  data-shot={index}
                  onClick={() => setZoomed((value) => !value)}
                  className="flex h-[100dvh] w-full max-w-full shrink-0 snap-start items-center justify-center overflow-hidden px-2 py-6"
                >
                  <img
                    src={shot.src}
                    alt={shot.alt || productName}
                    className={cn(
                      "max-w-full object-contain object-center transition-[max-height,width] duration-300 ease-out",
                      zoomed && index === openIndex
                        ? "h-auto w-[min(180%,64rem)] max-h-none"
                        : "h-auto max-h-[82dvh] w-auto",
                    )}
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="w-full min-w-0">
        <div
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
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
              className="relative aspect-[3/4] w-full min-w-full max-w-full shrink-0 snap-center overflow-hidden bg-[color-mix(in_oklab,var(--paper)_70%,white)] focus-ring"
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
        <p className="place-line mt-3 text-ink/40">Swipe · tap to zoom</p>
      </div>
      {lightbox}
    </>
  );
}
