import { Link, createFileRoute } from "@tanstack/react-router";

import { MotionMark, Numeric201 } from "@/components/brand/BrandMarks";
import { StoreFooter } from "@/components/brand/StoreFooter";
import { StoreNav } from "@/components/brand/StoreNav";
import { LandingHero } from "@/components/LandingHero";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { PeoplePlaces } from "@/components/PeoplePlaces";
import { ProductLookbookGrid } from "@/components/ProductLookbookCard";
import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import { SURFACES } from "@/lib/brandAssets";
import { CATEGORIES, LOOKBOOK_TEASER_IDS, PRODUCTS, productById } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { DEPARTMENT_TO } from "@/lib/departments";
import { COLLECTION_COPY, DEPARTMENT_COPY } from "@/copy/collection";
import { HERO_CROP } from "@/lib/imageRegistry";
import { HERO_SLIDES } from "@/lib/heroSlideshow";

const LOWEST = Math.min(...PRODUCTS.map((p) => p.price));
const jersey = productById("heritage-jersey")!;
const travelSet = productById("travel-set")!;
const cap = productById("two-tone-cap")!;
const harbor = productById("harbor-coach")!;
const performanceSet = productById("performance-set")!;

export const Route = createFileRoute("/team/")({
  head: () => {
    const title = "Bayonne Athletics — Fall 001 · 07002";
    const description = `${COLLECTION_COPY.lockup} ${COLLECTION_COPY.title} Match Jersey from $${jersey.price}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: SURFACES.ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: SURFACES.ogImage },
      ],
    };
  },
  component: TeamLanding,
});

function TeamLanding() {
  const kit = BAYONNE_BEES_KIT;

  return (
    <div className="overflow-x-clip bg-paper text-ink">
      <StoreNav />
      <main>
        <LandingHero />
        <HeroSlideshow slides={HERO_SLIDES} slug={kit.slug} />
        <PeoplePlaces />

        <section className="studio-field">
          <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="place-line">{COLLECTION_COPY.motto}</p>
              <h2 className="type-editorial mt-6 max-w-xl text-[clamp(2rem,5vw,3.4rem)] text-ink">
                {COLLECTION_COPY.title}
              </h2>
              <MotionMark className="mt-8 block text-garnet" />
            </div>
            <div>
              <p className="max-w-md whitespace-pre-line text-[0.95rem] leading-relaxed text-ink/65">
                {COLLECTION_COPY.body}
              </p>
              <p className="place-line mt-10">{COLLECTION_COPY.lockup}</p>
            </div>
          </div>
        </section>

        <section className="studio-field overflow-x-clip border-t border-ink/10">
          <div className="mx-auto w-full min-w-0 max-w-[1280px] px-4 py-16 sm:px-10 sm:py-20">
            <div className="mb-12 flex items-end justify-between gap-6 px-2">
              <div>
                <p className="place-line">The collection</p>
                <h2 className="type-editorial mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-ink">
                  Fall 001.
                </h2>
              </div>
              <Link
                to="/team/$slug/match"
                params={{ slug: kit.slug }}
                className="place-line shrink-0 text-ink/55 transition-opacity hover:opacity-100"
              >
                Shop all →
              </Link>
            </div>
            <ProductLookbookGrid
              products={LOOKBOOK_TEASER_IDS.map((id) => productById(id)!)}
              slug={kit.slug}
            />
          </div>
        </section>

        {(
          [
            ["match", SURFACES.categoryHero.match, jersey, HERO_CROP.match],
            ["performance", SURFACES.landingSideline, performanceSet, HERO_CROP.performance],
            ["travel", SURFACES.landingTravel, travelSet, HERO_CROP.travel],
            ["harbor", SURFACES.landingHarbor, harbor, HERO_CROP.harbor],
            ["club", SURFACES.landingClub, cap, HERO_CROP.club],
          ] as const
        ).map(([id, hero, featured, crop]) => {
          const dept = DEPARTMENT_COPY[id];
          return (
            <section key={id} className="relative isolate min-h-[78dvh] overflow-hidden bg-black">
              <div className="absolute inset-0" aria-hidden>
                <img
                  src={hero}
                  alt=""
                  className={`h-full w-full ${crop.fit === "cover" ? "object-cover" : "object-contain"}`}
                  style={{ objectPosition: crop.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
              </div>
              <div className="relative z-10 mx-auto flex min-h-[78dvh] w-full max-w-[1280px] flex-col justify-end px-6 py-16 sm:px-10 sm:py-20">
                <p className="place-line text-bone">{dept.line}</p>
                <h2 className="type-editorial mt-4 max-w-xl text-[clamp(2rem,5.5vw,3.6rem)] text-bone">
                  {dept.title}
                </h2>
                <MotionMark className="mt-6 text-bone" />
                <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/75">{dept.body}</p>
                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <Link
                    to={DEPARTMENT_TO[id]}
                    params={{ slug: kit.slug }}
                    className="place-line inline-flex items-center gap-3 border-b border-bone/40 pb-2 text-bone transition-colors hover:border-bone"
                  >
                    {dept.cta.replace(/\s*→\s*$/, "")}
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    to="/team/$slug/$product"
                    params={{ slug: kit.slug, product: featured.id }}
                    className="place-line text-bone/70 transition-opacity hover:opacity-100"
                  >
                    {featured.name} · ${featured.price}
                  </Link>
                </div>
              </div>
            </section>
          );
        })}

        <section className="studio-field">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-6 py-20 sm:px-10 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="place-line">Index</p>
              <ul className="mt-8 space-y-4">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={DEPARTMENT_TO[c.id]}
                      params={{ slug: kit.slug }}
                      className="type-campaign text-3xl text-ink transition-opacity hover:opacity-45 sm:text-4xl"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-8 lg:items-end">
              <Numeric201 className="text-7xl text-ink sm:text-8xl" />
              <Link
                to="/team/$slug/match"
                params={{ slug: kit.slug }}
                className="place-line inline-flex items-center justify-center bg-ink px-10 py-4 text-bone transition-opacity hover:opacity-90"
              >
                {COLLECTION_COPY.cta} · from ${LOWEST}
              </Link>
              <StoreCloseCountdown closesAt={kit.closesAt} className="text-ink/50" />
            </div>
          </div>
        </section>
      </main>
      <StoreFooter />
    </div>
  );
}
