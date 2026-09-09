import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { COLLECTION_COPY } from "@/copy/collection";
import { SURFACES } from "@/lib/brandAssets";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { HERO_CROP } from "@/lib/imageRegistry";
import {
  NEIGHBORHOOD_FILM_SRC,
  probeNeighborhoodFilm,
} from "@/lib/neighborhoodFilm";

const SLUG = BAYONNE_BEES_KIT.slug;

/**
 * Full-bleed landing film in the etnies register: muted autoplay when a
 * neighborhood clip exists, quiet type, pause control, still poster otherwise.
 */
export function NeighborhoodFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasFilm, setHasFilm] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

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
    if (reduced) {
      node.pause();
      setPlaying(false);
      return;
    }
    const play = node.play();
    if (play) {
      play.then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [hasFilm, reduced]);

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

  const showVideo = hasFilm;
  const filmFrame = !showVideo || (reduced && !playing);

  return (
    <section
      className="relative isolate overflow-hidden overflow-x-clip bg-black text-bone"
      data-film
      data-film-state={showVideo && playing ? "playing" : "still"}
      aria-label="Neighborhood film"
    >
      <h1 className="sr-only">
        {COLLECTION_COPY.brand}. {COLLECTION_COPY.lockup} {COLLECTION_COPY.community}
      </h1>

      <div className="relative h-[min(88dvh,56rem)]">
        {showVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: HERO_CROP.landing.position }}
            poster={SURFACES.landingHero}
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
        ) : null}

        <div
          className={`pointer-events-none absolute inset-0 ${showVideo && playing ? "opacity-0" : "opacity-100"}`}
          aria-hidden
        >
          <img
            src={SURFACES.landingHero}
            alt=""
            width={1536}
            height={864}
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            style={{ objectPosition: HERO_CROP.landing.position }}
          />
          <img
            src={SURFACES.landingHeroModel}
            alt=""
            width={1122}
            height={1402}
            className="absolute inset-0 block h-full w-full object-cover object-[center_18%] md:hidden"
          />
        </div>

        {filmFrame ? (
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-x-0 top-0 h-[7%] bg-black" />
            <div className="absolute inset-x-0 bottom-0 h-[7%] bg-black" />
            <div className="absolute inset-0 border border-bone/15" />
          </div>
        ) : null}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 md:hidden"
          aria-hidden
        />

        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="mx-auto w-full min-w-0 max-w-[1280px] px-6 pb-14 sm:px-10 md:px-10 md:pb-0">
            <p className="place-line text-bone">{COLLECTION_COPY.place}</p>
            <p className="type-editorial mt-5 max-w-md text-[clamp(2.3rem,8vw,4.2rem)] leading-[0.92] text-bone md:mt-6">
              {COLLECTION_COPY.lockup}
            </p>
            <p className="place-line mt-5 max-w-sm text-bone/80 md:mt-6">{COLLECTION_COPY.community}</p>
            <Link
              to="/team/$slug/match"
              params={{ slug: SLUG }}
              className="place-line mt-7 inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-bone md:mt-8"
            >
              {COLLECTION_COPY.shopCta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {filmFrame && !showVideo ? (
          <p className="place-line pointer-events-none absolute top-3 left-6 text-bone/55 sm:left-10">
            {COLLECTION_COPY.filmStill}
          </p>
        ) : null}

        {showVideo ? (
          <button
            type="button"
            className="place-line tap-44 absolute bottom-3 right-6 z-10 text-bone/80 transition-opacity hover:opacity-100 focus-ring sm:right-10"
            onClick={togglePlayback}
            aria-pressed={playing}
            aria-label={playing ? "Pause neighborhood film" : "Play neighborhood film"}
          >
            {playing ? COLLECTION_COPY.filmPause : COLLECTION_COPY.filmPlay}
          </button>
        ) : null}
      </div>
    </section>
  );
}
