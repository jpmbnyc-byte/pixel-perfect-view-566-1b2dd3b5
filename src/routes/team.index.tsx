import { Link, createFileRoute } from "@tanstack/react-router";

import { MotionMark, Numeric201, Wordmark } from "@/components/brand/BrandMarks";
import { StoreFooter } from "@/components/brand/StoreFooter";
import { StoreNav } from "@/components/brand/StoreNav";
import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import { SURFACES } from "@/lib/brandAssets";
import { CATEGORIES, PRODUCTS, productById } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { DEPARTMENT_TO } from "@/lib/departments";
import {
  MATCH_DEPARTMENT_COPY,
  MATCH_PRODUCT_COPY,
  STORE_INTRO_COPY,
} from "@/copy/match";
import { ALUMNI_DEPARTMENT_COPY, HERITAGE_PRODUCT_COPY } from "@/copy/heritage";
import type { CategoryId } from "@/lib/catalog";

const LOWEST = Math.min(...PRODUCTS.map((p) => p.price));
const jersey = productById("jersey")!;
const fullSet = productById("full-set")!;
const shorts = productById("shorts")!;
const heritageTeeGarnet = productById("heritage-tee-garnet")!;
const heritageTeeBlack = productById("heritage-tee-black")!;
const baggySweatsGarnet = productById("baggy-sweats-garnet")!;
const baggySweatsBlack = productById("baggy-sweats-black")!;
const crestCap = productById("aop-hat")!;

export const Route = createFileRoute("/team/")({
  head: () => {
    const title = "Bayonne Athletics — Fall 001 · 07002";
    const description = `${STORE_INTRO_COPY.lockup} ${STORE_INTRO_COPY.title} Heritage Jersey from $${jersey.price}.`;
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
    <div className="bg-paper text-ink">
      <StoreNav />
      <main>
        <section className="relative isolate min-h-[88dvh] overflow-hidden bg-black text-bone">
          <div className="absolute inset-0" aria-hidden>
            <img
              src={SURFACES.landingHero}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[88dvh] w-full max-w-[1280px] flex-col items-center justify-center px-6 py-20 text-center">
            <p className="place-line text-bone">Fall 001 · 07002</p>
            <Wordmark variant="primary" className="mt-10 text-bone" />
            <h1 className="type-editorial mt-10 max-w-xl text-[clamp(1.8rem,4.5vw,3.1rem)] text-bone">
              {STORE_INTRO_COPY.title}
            </h1>
            <MotionMark className="mt-6 text-bone" />
            <p className="mt-8 max-w-md text-sm leading-relaxed text-bone/70">
              Team customs for Bayonne — made in the color you actually wear. From ${LOWEST}.
            </p>
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: jersey.id }}
              className="place-line mt-10 inline-flex items-center gap-3 border-b border-bone/40 pb-2 text-bone transition-colors hover:border-bone"
            >
              1936 Heritage Jersey · ${jersey.price}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        <section className="studio-field">
          <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="place-line">{STORE_INTRO_COPY.motto}</p>
              <h2 className="type-editorial mt-6 max-w-xl text-[clamp(2rem,5vw,3.4rem)] text-ink">
                {STORE_INTRO_COPY.body.split("\n")[0]}
              </h2>
              <MotionMark className="mt-8 block text-garnet" />
            </div>
            <div>
              <p className="max-w-md whitespace-pre-line text-[0.95rem] leading-relaxed text-ink/65">
                {STORE_INTRO_COPY.body}
              </p>
              <p className="place-line mt-10">{STORE_INTRO_COPY.lockup}</p>
            </div>
          </div>
        </section>

        <section className="studio-field border-t border-ink/10">
          <div className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="place-line">{MATCH_DEPARTMENT_COPY.line}</p>
                <h2 className="type-editorial mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-ink">
                  {MATCH_DEPARTMENT_COPY.title}
                </h2>
              </div>
              <Link
                to="/team/$slug/match"
                params={{ slug: kit.slug }}
                className="place-line shrink-0 text-ink/55 transition-opacity hover:opacity-100"
              >
                Shop Match →
              </Link>
            </div>
            <p className="mb-10 max-w-md text-sm leading-relaxed text-ink/60">{MATCH_DEPARTMENT_COPY.body}</p>

            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: jersey.id }}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[color-mix(in_oklab,var(--paper)_70%,white)] sm:aspect-[5/4]">
                <img
                  src={SURFACES.landingMatchJersey}
                  alt="Match Jersey front in Bayonne garnet"
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-[0.06em] text-ink">Match Jersey</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">
                    {MATCH_PRODUCT_COPY.jersey.card}
                  </p>
                </div>
                <p className="font-sans text-xl tabular-nums text-ink">${jersey.price}</p>
              </div>
            </Link>

            <div className="mt-16 grid grid-cols-2 gap-8 lg:gap-12">
              <Link
                to="/team/$slug/$product"
                params={{ slug: kit.slug, product: shorts.id }}
                className="block"
              >
                <p className="font-display text-xl font-medium tracking-[0.06em] text-ink">Match Shorts</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{MATCH_PRODUCT_COPY.shorts.card}</p>
                <p className="mt-3 font-sans text-lg tabular-nums">${shorts.price}</p>
              </Link>
              <Link
                to="/team/$slug/$product"
                params={{ slug: kit.slug, product: fullSet.id }}
                className="block"
              >
                <p className="font-display text-xl font-medium tracking-[0.06em] text-ink">Match Full Kit</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">
                  {MATCH_PRODUCT_COPY["full-set"].card}
                </p>
                <p className="mt-3 font-sans text-lg tabular-nums">${fullSet.price}</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="studio-field border-t border-ink/10">
          <div className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="place-line">{ALUMNI_DEPARTMENT_COPY.line}</p>
                <h2 className="type-editorial mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-ink">
                  {ALUMNI_DEPARTMENT_COPY.title}
                </h2>
              </div>
              <Link
                to="/team/$slug/alumni"
                params={{ slug: kit.slug }}
                className="place-line shrink-0 text-ink/55 transition-opacity hover:opacity-100"
              >
                Shop Club →
              </Link>
            </div>
            <p className="mb-10 max-w-md text-sm leading-relaxed text-ink/60">{ALUMNI_DEPARTMENT_COPY.body}</p>
            <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4">
              {(
                [
                  [heritageTeeGarnet, "heritage-tee-garnet"],
                  [heritageTeeBlack, "heritage-tee-black"],
                  [baggySweatsGarnet, "baggy-sweats-garnet"],
                  [baggySweatsBlack, "baggy-sweats-black"],
                ] as const
              ).map(([p, copyId]) => (
                <Link
                  key={p.id}
                  to="/team/$slug/$product"
                  params={{ slug: kit.slug, product: p.id }}
                  className="block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[color-mix(in_oklab,var(--paper)_70%,white)]">
                    <img src={p.thumb} alt={p.name} className="h-full w-full object-contain object-center" />
                  </div>
                  <p className="mt-4 font-display text-lg font-medium tracking-[0.04em] text-ink">{p.name}</p>
                  <p className="mt-1 font-sans text-sm tabular-nums">${p.price}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/50">{HERITAGE_PRODUCT_COPY[copyId].card}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate min-h-[78dvh] overflow-hidden bg-black">
          <div className="absolute inset-0" aria-hidden>
            <img
              src={SURFACES.landingSideline}
              alt=""
              className="h-full w-full object-cover object-[center_12%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[78dvh] w-full max-w-[1280px] flex-col justify-end px-6 py-16 sm:px-10 sm:py-20">
            <p className="place-line text-bone">Club Goods</p>
            <h2 className="type-editorial mt-4 max-w-xl text-[clamp(2rem,5.5vw,3.6rem)] text-bone">
              Keep the mark close.
            </h2>
            <MotionMark className="mt-6 text-bone" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/75">
              Caps and club pieces that carry Bayonne without requiring the full uniform.
            </p>
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: crestCap.id }}
              className="place-line mt-10 inline-flex items-center gap-3 border-b border-bone/40 pb-2 text-bone transition-colors hover:border-bone"
            >
              {crestCap.name} · ${crestCap.price}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        <section className="studio-field">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-6 py-20 sm:px-10 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="place-line">Index</p>
              <ul className="mt-8 space-y-4">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={DEPARTMENT_TO[c.id as CategoryId]}
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
                {STORE_INTRO_COPY.cta} · from ${LOWEST}
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
