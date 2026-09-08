import { Link } from "@tanstack/react-router";

import { SURFACES } from "@/lib/brandAssets";
import { COLLECTION_COPY } from "@/copy/collection";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

const SLUG = BAYONNE_BEES_KIT.slug;

/**
 * Community hero: 07002 waterfront plate with live type over the open left.
 * Mobile uses the source portrait so the gothic B stays readable.
 */
export function LandingHero() {
  return (
    <section className="relative isolate overflow-hidden overflow-x-clip bg-[#8A8E93] text-bone">
      <h1 className="sr-only">
        {COLLECTION_COPY.brand}. {COLLECTION_COPY.lockup} {COLLECTION_COPY.community}
      </h1>

      <div className="relative hidden md:block">
        <img
          src={SURFACES.landingHero}
          alt=""
          width={1536}
          height={864}
          className="block h-auto w-full"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full min-w-0 max-w-[1280px] px-8 lg:px-10">
            <p className="place-line text-bone">{COLLECTION_COPY.place}</p>
            <p className="type-editorial mt-6 max-w-md text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.92] text-bone">
              {COLLECTION_COPY.lockup}
            </p>
            <p className="place-line mt-6 max-w-sm text-bone/80">{COLLECTION_COPY.community}</p>
            <Link
              to="/team/$slug/match"
              params={{ slug: SLUG }}
              className="place-line mt-8 inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-bone"
            >
              {COLLECTION_COPY.shopCta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="relative">
          <img
            src={SURFACES.landingHeroModel}
            alt=""
            width={1122}
            height={1402}
            className="block h-auto w-full object-cover object-[center_18%]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 pt-24">
            <p className="place-line text-bone">{COLLECTION_COPY.place}</p>
            <p className="type-editorial mt-4 text-[clamp(2.3rem,11vw,3.2rem)] leading-[0.95] text-bone">
              {COLLECTION_COPY.lockup}
            </p>
            <p className="place-line mt-4 text-bone/80">{COLLECTION_COPY.community}</p>
            <Link
              to="/team/$slug/match"
              params={{ slug: SLUG }}
              className="place-line mt-6 inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-bone"
            >
              {COLLECTION_COPY.shopCta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
