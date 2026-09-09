import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { productById } from "@/lib/catalog";
import type { HeroSlide } from "@/lib/heroSlideshow";

type Props = {
  slides: HeroSlide[];
  slug: string;
};

const AUTO_MS = 4200;

export function HeroSlideshow({ slides, slug }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [active, setActive] = useState(0);

  const slideEls = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return [];
    return [...root.querySelectorAll<HTMLElement>("[data-slide]")];
  }, []);

  const syncActive = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const nodes = slideEls();
    if (nodes.length === 0) return;
    const mid = root.scrollLeft + root.clientWidth / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    nodes.forEach((node, index) => {
      const center = node.offsetLeft + node.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });
    setActive(best);
  }, [slideEls]);

  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const root = scrollerRef.current;
      const target = slideEls()[index];
      if (!root || !target) return;
      const pad = Number.parseFloat(getComputedStyle(root).paddingLeft) || 0;
      root.scrollTo({ left: Math.max(0, target.offsetLeft - pad), behavior });
    },
    [slideEls],
  );

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    syncActive();
    root.addEventListener("scroll", syncActive, { passive: true });
    return () => root.removeEventListener("scroll", syncActive);
  }, [syncActive, slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const tick = () => {
      if (pausedRef.current || document.hidden) return;
      const next = (active + 1) % slides.length;
      goTo(next);
    };
    const id = window.setInterval(tick, AUTO_MS);
    return () => window.clearInterval(id);
  }, [active, goTo, slides.length]);

  if (slides.length === 0) return null;

  return (
    <section
      className="studio-field overflow-x-clip border-b border-ink/10"
      aria-roledescription="carousel"
      aria-label="Lookbook"
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-end justify-between gap-6 px-6 pt-8 sm:px-10">
        <div>
          <p className="place-line">Lookbook</p>
          <h2 className="type-editorial mt-2 text-[clamp(1.4rem,3vw,2rem)] text-ink">Fall 001, on body.</h2>
        </div>
        <p className="place-line hidden text-ink/40 sm:block">Tap a still to open the piece</p>
      </div>

      <div
        ref={scrollerRef}
        className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-6 pb-6 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 sm:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => {
          const product = productById(slide.productId);
          if (!product) return null;
          return (
            <Link
              key={slide.id}
              data-slide
              to="/team/$slug/$product"
              params={{ slug, product: product.id }}
              className="group relative w-[min(58vw,18rem)] shrink-0 snap-start focus-ring sm:w-[min(38vw,26rem)]"
              onFocus={() => {
                pausedRef.current = true;
              }}
              onBlur={() => {
                pausedRef.current = false;
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ink/5">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  width={1400}
                  height={1867}
                  decoding={index < 2 ? "sync" : "async"}
                  fetchPriority={index < 2 ? "high" : "low"}
                  sizes="(min-width: 1024px) 26rem, 72vw"
                  className="h-full w-full object-cover object-[center_18%] transition-transform duration-500 ease-standard group-hover:scale-[1.03]"
                  style={{ imageRendering: "auto" }}
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <p className="font-display text-[0.95rem] leading-snug tracking-[0.04em] text-ink">
                  {product.name}
                </p>
                <p className="place-line shrink-0 tabular-nums text-ink/55">${product.price}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {slides.length > 1 ? (
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 pb-8 sm:px-10">
          <div className="flex gap-2" role="tablist" aria-label="Lookbook slides">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Show ${productById(slide.productId)?.name ?? slide.alt}`}
                className={`h-1.5 rounded-full transition-all duration-micro ease-standard focus-ring ${
                  index === active ? "w-8 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/50"
                }`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              className="place-line tap-44 text-ink/55 transition-opacity hover:opacity-100 focus-ring"
              onClick={() => goTo((active - 1 + slides.length) % slides.length)}
            >
              Prev
            </button>
            <button
              type="button"
              className="place-line tap-44 text-ink/55 transition-opacity hover:opacity-100 focus-ring"
              onClick={() => goTo((active + 1) % slides.length)}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
