import { Link } from "@tanstack/react-router";

import { SURFACES } from "@/lib/brandAssets";
import { COLLECTION_COPY } from "@/copy/collection";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

const SLUG = BAYONNE_BEES_KIT.slug;

/**
 * Site hero. Desktop uses the designed plate (type is in the photograph).
 * Mobile rebuilds the same lockup in HTML so the CTA stays readable and clickable.
 */
export function LandingHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#C5C6CA] text-ink">
      <h1 className="sr-only">
        {COLLECTION_COPY.brand}. {COLLECTION_COPY.lockup} {COLLECTION_COPY.standard}
      </h1>

      <div className="relative hidden md:block">
        <img
          src={SURFACES.landingHero}
          alt=""
          width={1672}
          height={941}
          className="block h-auto w-full"
        />
        <Link
          to="/team/$slug/match"
          params={{ slug: SLUG }}
          aria-label={COLLECTION_COPY.shopCta}
          className="absolute z-10 focus-ring"
          style={{
            left: "7.8%",
            top: "56.2%",
            width: "29%",
            height: "12.4%",
          }}
        />
      </div>

      <div className="md:hidden">
        <div className="px-6 pb-4 pt-14">
          <p className="place-line text-ink">{COLLECTION_COPY.brand}</p>
          <p className="type-editorial mt-6 text-[clamp(2.4rem,12vw,3.4rem)] leading-[0.95] text-ink">
            {COLLECTION_COPY.lockup}
          </p>
          <p className="place-line mt-6 text-ink">{COLLECTION_COPY.standard}</p>
          <Link
            to="/team/$slug/match"
            params={{ slug: SLUG }}
            className="place-line mt-8 inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-bone"
          >
            {COLLECTION_COPY.shopCta}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <img
          src={SURFACES.landingHeroModel}
          alt=""
          width={992}
          height={941}
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
}
