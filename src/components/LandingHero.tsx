import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { COLLECTION_COPY } from "@/copy/collection";
import { SURFACES } from "@/lib/brandAssets";
import { AREA_CODE_STILLS } from "@/lib/imageRegistry";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { NEIGHBORHOOD_FILM_SRC, probeNeighborhoodFilm } from "@/lib/neighborhoodFilm";

const SLUG = BAYONNE_BEES_KIT.slug;
const AUTO_ADVANCE_MS = 5600;
const SWIPE_THRESHOLD = 48;

const CAMPAIGNS = [
  {
    id: "area-code",
    eyebrow: "Club Goods · 201",
    title: "201",
    line: "Same ground. Different people. One place.",
    cta: "Shop Now",
    to: "/team/$slug/$product" as const,
    product: "area-code-cap",
    film: true,
    desktop: AREA_CODE_STILLS.church,
    mobile: AREA_CODE_STILLS.church,
    positionClass: "object-center",
  },
  {
    id: "fall-001",
    eyebrow: "Bayonne Athletics · Fall 001",
    title: "Built different.",
    line: "The city on the water. Represent.",
    cta: COLLECTION_COPY.shopCta,
    to: "/team/$slug/match" as const,
    product: undefined,
    film: false,
    desktop: SURFACES.landingHero,
    mobile: SURFACES.landingHeroModel,
    positionClass: "object-[center_18%]",
  },
  {
    id: "performance",
    eyebrow: "Performance · 07002",
    title: "Made to move.",
    line: "Technical layers for training days and everything after.",
    cta: "Shop performance",
    to: "/team/$slug/performance" as const,
    product: undefined,
    film: false,
    desktop: SURFACES.landingSideline,
    mobile: SURFACES.landingSideline,
    positionClass: "object-[center_18%]",
  },
  {
    id: "travel",
    eyebrow: "Travel · Fall 001",
    title: "One uniform for transit.",
    line: "Heavyweight layers built between the city and the next stop.",
    cta: "Shop travel",
    to: "/team/$slug/travel" as const,
    product: undefined,
    film: false,
    desktop: SURFACES.landingTravel,
    mobile: SURFACES.landingTravel,
    positionClass: "object-[center_18%] md:object-[center_24%]",
  },
] as const;

export function LandingHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hasFilm, setHasFilm] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStart = useRef<number | null>(null);
  const filmSlide = CAMPAIGNS[active]?.film === true;

  const show = useCallback((index: number) => {
    setActive((index + CAMPAIGNS.length) % CAMPAIGNS.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let cancelled = false;
    probeNeighborhoodFilm().then((ok) => {
      if (!cancelled) setHasFilm(ok);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !hasFilm) return;
    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;
    if (!filmSlide || reduced) {
      node.pause();
      setPlaying(false);
      return;
    }
    const play = node.play();
    if (play) {
      play.then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [filmSlide, hasFilm, reduced]);

  useEffect(() => {
    if (paused || reduced || filmSlide) return;
    const timer = window.setTimeout(() => show(active + 1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [active, filmSlide, paused, reduced, show]);

  const togglePlayback = () => {
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) {
      node.muted = true;
      node.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      node.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      className="relative isolate h-[72svh] min-h-[34rem] max-h-[52rem] overflow-hidden bg-ink text-bone md:h-[70vh]"
      aria-roledescription="carousel"
      aria-label="Fall 001 campaigns"
      data-film
      data-film-state={filmSlide && playing ? "playing" : "still"}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX;
        touchStart.current = null;
        if (start === null || end === undefined || Math.abs(start - end) < SWIPE_THRESHOLD) return;
        show(active + (start > end ? 1 : -1));
      }}
    >
      <h1 className="sr-only">
        {COLLECTION_COPY.brand}. {COLLECTION_COPY.lockup} {COLLECTION_COPY.community}
      </h1>

      {CAMPAIGNS.map((campaign, index) => {
        const isActive = index === active;
        const showFilm = Boolean(campaign.film && hasFilm);
        return (
          <article
            key={campaign.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${CAMPAIGNS.length}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-transition ease-standard ${
              isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
          >
            {showFilm ? (
              <video
                ref={isActive ? videoRef : undefined}
                className="absolute inset-0 size-full object-cover object-center"
                poster={campaign.desktop}
                autoPlay={!reduced}
                muted
                loop
                playsInline
                preload={reduced ? "none" : "metadata"}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                aria-hidden
              >
                <source src={NEIGHBORHOOD_FILM_SRC} type="video/mp4" />
              </video>
            ) : (
              <picture>
                <source media="(max-width: 767px)" srcSet={campaign.mobile} />
                <img
                  src={campaign.desktop}
                  alt=""
                  width={1536}
                  height={index === 0 ? 864 : 1402}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  className={`absolute inset-0 size-full object-cover ${campaign.positionClass} ${isActive && !campaign.film ? "animate-hero-campaign" : ""}`}
                />
              </picture>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--ink)_78%,transparent)_0%,color-mix(in_oklab,var(--ink)_42%,transparent)_44%,transparent_76%)] max-md:bg-[linear-gradient(0deg,color-mix(in_oklab,var(--ink)_88%,transparent)_0%,color-mix(in_oklab,var(--ink)_28%,transparent)_58%,color-mix(in_oklab,var(--ink)_12%,transparent)_100%)]" />

            <div className="absolute inset-0 mx-auto flex w-full max-w-[1280px] items-end px-6 pb-24 sm:px-10 sm:pb-28 md:items-center md:pb-0">
              <div
                className={`max-w-[40rem] transition-all duration-transition ease-entrance ${
                  isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <p className="place-line text-bone/80">{campaign.eyebrow}</p>
                <h2 className="type-campaign mt-4 max-w-[12ch] text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.87] text-bone">
                  {campaign.title}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/80 sm:text-base">
                  {campaign.line}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {campaign.to === "/team/$slug/$product" && campaign.product ? (
                    <Link
                      to="/team/$slug/$product"
                      params={{ slug: SLUG, product: campaign.product }}
                      tabIndex={isActive ? 0 : -1}
                      className="place-line inline-flex min-h-11 items-center justify-center bg-bone px-7 py-3 text-ink"
                    >
                      {campaign.cta}
                    </Link>
                  ) : campaign.to !== "/team/$slug/$product" ? (
                    <Link
                      to={campaign.to}
                      params={{ slug: SLUG }}
                      tabIndex={isActive ? 0 : -1}
                      className="place-line inline-flex min-h-11 items-center gap-4 border-b border-bone/70 pb-2 text-bone transition-colors duration-standard hover:border-bone focus-ring"
                    >
                      {campaign.cta}
                      <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
                    </Link>
                  ) : null}
                  {campaign.film && showFilm && isActive ? (
                    <button
                      type="button"
                      className="place-line inline-flex min-h-11 items-center justify-center border border-bone/50 px-7 py-3 text-bone"
                      onClick={togglePlayback}
                      aria-pressed={playing}
                    >
                      {playing ? COLLECTION_COPY.filmPause : "Watch Now"}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        );
      })}

      <div className="absolute inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-[1280px] items-center justify-between gap-6 px-6 pb-7 sm:px-10 sm:pb-8">
        <div className="flex items-center gap-3" role="tablist" aria-label="Choose campaign">
          {CAMPAIGNS.map((campaign, index) => (
            <Button
              key={campaign.id}
              type="button"
              variant="ghost"
              size="icon"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show ${campaign.title}`}
              className="group h-11 w-12 items-end rounded-none p-0 py-3 text-bone hover:bg-transparent sm:w-16"
              onClick={() => show(index)}
            >
              <span className="h-px w-full overflow-hidden bg-bone/35">
                <span
                  className={`block h-full origin-left bg-bone ${
                    index === active
                      ? campaign.film
                        ? "scale-x-100"
                        : `animate-hero-progress ${paused ? "[animation-play-state:paused]" : ""}`
                      : "scale-x-0"
                  }`}
                />
              </span>
            </Button>
          ))}
          <span className="place-line ml-1 tabular-nums text-bone/75" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(CAMPAIGNS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="hidden gap-2 md:flex">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Previous campaign"
            className="size-11 rounded-none border border-bone/30 bg-ink/20 text-bone backdrop-blur-md hover:bg-bone hover:text-ink"
            onClick={() => show(active - 1)}
          >
            <ArrowLeft aria-hidden />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Next campaign"
            className="size-11 rounded-none border border-bone/30 bg-ink/20 text-bone backdrop-blur-md hover:bg-bone hover:text-ink"
            onClick={() => show(active + 1)}
          >
            <ArrowRight aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}
