import { Link, createFileRoute } from "@tanstack/react-router";

import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import { CRESTS, SURFACES } from "@/lib/brandAssets";
import { CATEGORIES, PRODUCTS, productById } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { DEPARTMENT_TO } from "@/components/TeamStorePage";
import { COLLECTION_COPY, DEPARTMENT_COPY } from "@/copy/collection";
import { HERO_CROP } from "@/lib/imageRegistry";

const LOWEST = Math.min(...PRODUCTS.map((p) => p.price));
const jersey = productById("heritage-jersey")!;
const travelSet = productById("travel-set")!;
const cap = productById("two-tone-cap")!;
const harbor = productById("harbor-coach")!;
const performanceLs = productById("performance-ls")!;

export const Route = createFileRoute("/team/")({
  head: () => {
    const title = "Bayonne Athletics — Fall 001 · 07002";
    const description = `${COLLECTION_COPY.lockup} ${COLLECTION_COPY.title} Heritage Jersey from $${jersey.price}.`;
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
    <main className="bg-black text-bone">
      <section className="relative isolate min-h-dvh overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SURFACES.landingHero}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: HERO_CROP.landing.position }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/45" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[720px] flex-col px-6 pb-14 pt-8 sm:px-10">
          <header className="flex items-start justify-between gap-6 motion-safe:animate-team-logo-in">
            <div className="min-w-0">
              <p className="place-line text-bone">Bayonne Athletics · 07002</p>
              <div className="mt-6 flex items-end gap-4">
                <img
                  src={CRESTS.primary}
                  alt=""
                  className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
                />
                <p className="type-campaign-tight text-[clamp(2.4rem,12vw,4rem)] text-bone">
                  BAYONNE
                </p>
              </div>
              <div className="tip-asymmetric mt-6 motion-safe:animate-team-bar-in">
                <span className="tip-asymmetric-a" />
                <span className="tip-asymmetric-bone" />
              </div>
            </div>
            <div className="mt-1 flex shrink-0 flex-col items-end gap-2">
              <Link
                to="/team/$slug/match"
                params={{ slug: kit.slug }}
                className="place-line text-bone transition-opacity hover:opacity-70"
              >
                Shop
              </Link>
            </div>
          </header>

          <div className="mt-auto max-w-md space-y-6 pt-16 motion-safe:animate-team-rise [animation-delay:140ms]">
            <p className="place-line text-bone/70">{COLLECTION_COPY.season}</p>
            <h1 className="type-editorial text-[clamp(1.65rem,5.5vw,2.15rem)] text-bone">
              {COLLECTION_COPY.lockup}
            </h1>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-bone/70">
              {COLLECTION_COPY.title} From ${LOWEST}.
            </p>
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: jersey.id }}
              className="place-line inline-flex items-center gap-3 border-b border-bone/40 pb-2 text-bone transition-colors hover:border-bone"
            >
              1936 Heritage Jersey · ${jersey.price}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="studio-field">
        <div className="mx-auto w-full max-w-[720px] px-6 py-20 sm:px-10 sm:py-28">
          <p className="place-line">Fall 001</p>
          <h2 className="type-editorial mt-6 max-w-lg text-[clamp(1.75rem,5vw,2.4rem)] text-ink">
            {COLLECTION_COPY.title}
          </h2>
          <div className="tip-asymmetric mt-8">
            <span className="tip-asymmetric-a" />
            <span className="tip-asymmetric-b" />
          </div>
          <p className="mt-8 max-w-md whitespace-pre-line text-[0.95rem] leading-relaxed text-ink/70">
            {COLLECTION_COPY.body}
          </p>
          <p className="place-line mt-10 text-ink/50">{COLLECTION_COPY.lockup}</p>
        </div>
      </section>

      {(
        [
          ["match", SURFACES.categoryHero.match, jersey, HERO_CROP.match],
          ["performance", SURFACES.landingSideline, performanceLs, HERO_CROP.performance],
          ["travel", SURFACES.landingTravel, travelSet, HERO_CROP.travel],
          ["harbor", SURFACES.landingHarbor, harbor, HERO_CROP.harbor],
          ["club", SURFACES.landingClub, cap, HERO_CROP.club],
        ] as const
      ).map(([id, hero, featured, crop]) => {
        const dept = DEPARTMENT_COPY[id];
        const cat = CATEGORIES.find((c) => c.id === id)!;
        return (
          <section key={id} className="relative isolate overflow-hidden">
            <div className="absolute inset-0 bg-black" aria-hidden>
              <img
                src={hero}
                alt=""
                className={`h-full w-full ${crop.fit === "cover" ? "object-cover" : "object-contain"}`}
                style={{ objectPosition: crop.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/25" />
            </div>
            <div className="relative z-10 mx-auto flex min-h-[78dvh] w-full max-w-[720px] flex-col justify-end px-6 py-16 sm:px-10">
              <p className="place-line text-bone">{dept.line}</p>
              <h2 className="type-editorial mt-4 max-w-md text-[clamp(1.8rem,5.5vw,2.5rem)] text-bone">
                {dept.title}
              </h2>
              <div className="tip-asymmetric mt-7">
                <span className="tip-asymmetric-a" />
                <span className="tip-asymmetric-bone" />
              </div>
              <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-bone/75">{dept.body}</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
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
              <p className="place-line mt-6 text-bone/40">{cat.label}</p>
            </div>
          </section>
        );
      })}

      <section className="studio-field">
        <div className="mx-auto w-full max-w-[720px] px-6 py-20 sm:px-10 sm:py-24">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="place-line">Departments</p>
              <ul className="mt-8 space-y-5">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={DEPARTMENT_TO[c.id]}
                      params={{ slug: kit.slug }}
                      className="type-campaign text-2xl text-ink transition-opacity hover:opacity-50"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <img
              src={CRESTS.primary}
              alt=""
              className="h-16 w-16 shrink-0 object-contain opacity-90"
            />
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/team/$slug/match"
              params={{ slug: kit.slug }}
              className="place-line inline-flex items-center justify-center bg-ink px-8 py-4 text-bone transition-opacity hover:opacity-90"
            >
              Enter Fall 001 · from ${LOWEST}
            </Link>
            <StoreCloseCountdown closesAt={kit.closesAt} className="text-ink/50" />
          </div>
          <p className="mt-10 place-line text-ink/40">Bayonne Athletics · 07002</p>
        </div>
      </section>
    </main>
  );
}
