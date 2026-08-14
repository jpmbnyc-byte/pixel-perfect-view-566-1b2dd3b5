import { Link, createFileRoute } from "@tanstack/react-router";

import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import { CRESTS, SURFACES } from "@/lib/brandAssets";
import { PRODUCTS, productById } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { DEPARTMENT_TO } from "@/components/TeamStorePage";
import type { CategoryId } from "@/lib/catalog";
import {
  MATCH_DEPARTMENT_COPY,
  MATCH_PRODUCT_COPY,
  STORE_INTRO_COPY,
} from "@/copy/match";
import { ALUMNI_DEPARTMENT_COPY, HERITAGE_PRODUCT_COPY } from "@/copy/heritage";

const LOWEST = Math.min(...PRODUCTS.map((p) => p.price));
const jersey = productById("jersey")!;
const fullSet = productById("full-set")!;
const shorts = productById("shorts")!;
const heritageTeeGarnet = productById("heritage-tee-garnet")!;
const heritageTeeBlack = productById("heritage-tee-black")!;
const baggySweatsGarnet = productById("baggy-sweats-garnet")!;
const baggySweatsBlack = productById("baggy-sweats-black")!;

export const Route = createFileRoute("/team/")({
  head: () => {
    const title = "Bayonne Team Customs — Garnet since 1936 | No Parade F.C.";
    const description = `${STORE_INTRO_COPY.title} Team customs in Bayonne’s garnet. Match jersey from $${jersey.price}. ${STORE_INTRO_COPY.lockup} No Parade F.C., Avenue A.`;
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

/**
 * Luxury editorial landing — Venezia-adjacent restraint:
 * paper / ink / one garnet accent, full-bleed chapters, quiet commerce.
 * No manufacturer marks. Brand stays hero-level.
 */
function TeamLanding() {
  const kit = BAYONNE_BEES_KIT;

  return (
    <main className="bg-black text-bone">
      {/* —— Hero: one composition —— */}
      <section className="relative isolate min-h-dvh overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SURFACES.landingHero}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_18%] motion-safe:animate-team-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[720px] flex-col px-6 pb-14 pt-8 sm:px-10">
          <header className="flex items-start justify-between gap-6 motion-safe:animate-team-logo-in">
            <div className="min-w-0">
              <p className="place-line text-bone">No Parade F.C. · Avenue A</p>
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
              <Link
                to="/preorder"
                className="place-line text-bone/70 transition-opacity hover:opacity-100"
              >
                Pre-order
              </Link>
            </div>
          </header>

          <div className="mt-auto max-w-md space-y-6 pt-16 motion-safe:animate-team-rise [animation-delay:140ms]">
            <h1 className="type-editorial text-[clamp(1.65rem,5.5vw,2.15rem)] text-bone">
              {STORE_INTRO_COPY.title}
            </h1>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-bone/70">
              Team customs for Bayonne — made in the color you actually wear. From ${LOWEST}.
            </p>
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: jersey.id }}
              className="place-line inline-flex items-center gap-3 border-b border-bone/40 pb-2 text-bone transition-colors hover:border-bone"
            >
              Make it yours · ${jersey.price}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* —— Paper manifesto —— */}
      <section className="studio-field">
        <div className="mx-auto w-full max-w-[720px] px-6 py-20 sm:px-10 sm:py-28">
          <p className="place-line">{STORE_INTRO_COPY.eyebrow}</p>
          <h2 className="type-editorial mt-6 max-w-lg text-[clamp(1.75rem,5vw,2.4rem)] text-ink">
            {STORE_INTRO_COPY.title}
          </h2>
          <div className="tip-asymmetric mt-8">
            <span className="tip-asymmetric-a" />
            <span className="tip-asymmetric-b" />
          </div>
          <p className="mt-8 max-w-md whitespace-pre-line text-[0.95rem] leading-relaxed text-ink/70">
            {STORE_INTRO_COPY.body}
          </p>
          <p className="place-line mt-10 text-ink/50">{STORE_INTRO_COPY.lockup}</p>
        </div>
      </section>

      {/* —— Queen Bees chapter —— */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SURFACES.landingQueenStory}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[88dvh] w-full max-w-[720px] flex-col justify-end px-6 py-16 sm:px-10">
          <p className="place-line text-bone">A story · Hudson County</p>
          <h2 className="type-editorial mt-4 max-w-md text-[clamp(1.8rem,5.5vw,2.5rem)] text-bone">
            They already had the name. They just needed the mark.
          </h2>
          <div className="tip-asymmetric mt-7">
            <span className="tip-asymmetric-a" />
            <span className="tip-asymmetric-bone" />
          </div>
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-bone/75">
            We drew the crest as a gift. The files are theirs — this chapter isn’t for sale.
          </p>
          <img
            src={CRESTS.queen}
            alt="Queen Bees crest"
            className="mt-8 h-auto w-24 object-contain sm:w-28"
          />
        </div>
      </section>

      {/* —— Lookbook / Shop — high-key studio —— */}
      <section className="studio-field">
        <div className="mx-auto w-full max-w-[720px] px-6 pt-20 sm:px-10 sm:pt-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="place-line">{MATCH_DEPARTMENT_COPY.line}</p>
              <h2 className="type-campaign mt-4 text-[clamp(2rem,7vw,2.8rem)] text-ink">
                {MATCH_DEPARTMENT_COPY.title}
              </h2>
            </div>
            <Link
              to="/team/$slug/match"
              params={{ slug: kit.slug }}
              className="place-line shrink-0 text-ink transition-opacity hover:opacity-55"
            >
              Shop Match →
            </Link>
          </div>
          <p className="type-editorial mt-5 max-w-md text-lg text-ink/75">
            {MATCH_DEPARTMENT_COPY.body}
          </p>
        </div>

        <Link
          to="/team/$slug/$product"
          params={{ slug: kit.slug, product: jersey.id }}
          className="group mx-auto mt-10 block w-full max-w-[720px] px-6 sm:px-10"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-[color-mix(in_oklab,var(--paper)_88%,white)] sm:aspect-[5/4]">
            <img
              src={SURFACES.landingMatchJersey}
              alt="Match Jersey front in Bayonne garnet"
              className="h-full w-full object-contain object-center motion-safe:transition-transform motion-safe:duration-transition motion-safe:ease-standard motion-safe:group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-6">
            <div>
              <p className="place-line">Match</p>
              <h3 className="type-campaign mt-2 text-2xl text-ink">Match Jersey</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">
                {MATCH_PRODUCT_COPY.jersey.card}
              </p>
            </div>
            <p className="font-sans text-xl tabular-nums text-ink">${jersey.price}</p>
          </div>
          <p className="place-line mt-4 text-garnet">{MATCH_PRODUCT_COPY.jersey.cta}</p>
        </Link>

        <div className="mx-auto grid w-full max-w-[720px] grid-cols-2 gap-px bg-ink/10 px-0 sm:px-10">
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: shorts.id }}
            className="studio-field px-6 py-8 transition-opacity hover:opacity-80 sm:px-8"
          >
            <p className="place-line">Match</p>
            <p className="type-campaign mt-3 text-xl text-ink">Match Shorts</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/55">{MATCH_PRODUCT_COPY.shorts.card}</p>
            <p className="mt-3 font-sans text-lg tabular-nums text-ink/70">${shorts.price}</p>
            <p className="place-line mt-4 text-garnet">{MATCH_PRODUCT_COPY.shorts.cta}</p>
          </Link>
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: fullSet.id }}
            className="studio-field px-6 py-8 transition-opacity hover:opacity-80 sm:px-8"
          >
            <p className="place-line">Match</p>
            <p className="type-campaign mt-3 text-xl text-ink">Match Full Kit</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/55">
              {MATCH_PRODUCT_COPY["full-set"].card}
            </p>
            <p className="mt-3 font-sans text-lg tabular-nums text-ink/70">${fullSet.price}</p>
            <p className="place-line mt-4 text-garnet">{MATCH_PRODUCT_COPY["full-set"].cta}</p>
          </Link>
        </div>
      </section>

      {/* —— Alumni heritage feature —— */}
      <section className="studio-field">
        <div className="mx-auto w-full max-w-[720px] px-6 pt-20 sm:px-10 sm:pt-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="place-line">{ALUMNI_DEPARTMENT_COPY.line}</p>
              <h2 className="type-campaign mt-4 text-[clamp(2rem,7vw,2.8rem)] text-ink">
                {ALUMNI_DEPARTMENT_COPY.title}
              </h2>
            </div>
            <Link
              to="/team/$slug/alumni"
              params={{ slug: kit.slug }}
              className="place-line shrink-0 text-ink transition-opacity hover:opacity-55"
            >
              Shop Alumni →
            </Link>
          </div>
          <p className="type-editorial mt-5 max-w-md text-lg text-ink/75">
            {ALUMNI_DEPARTMENT_COPY.body}
          </p>
        </div>

        <Link
          to="/team/$slug/$product"
          params={{ slug: kit.slug, product: heritageTeeGarnet.id }}
          className="group mx-auto mt-10 block w-full max-w-[720px] px-6 sm:px-10"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-[color-mix(in_oklab,var(--paper)_88%,white)] sm:aspect-[5/4]">
            <img
              src={SURFACES.landingHeritage}
              alt="Heritage Tee in Bayonne garnet"
              className="h-full w-full object-contain object-center motion-safe:transition-transform motion-safe:duration-transition motion-safe:ease-standard motion-safe:group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-6">
            <div>
              <p className="place-line">Alumni</p>
              <h3 className="type-campaign mt-2 text-2xl text-ink">{heritageTeeGarnet.name}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">
                {HERITAGE_PRODUCT_COPY["heritage-tee-garnet"].card}
              </p>
            </div>
            <p className="font-sans text-xl tabular-nums text-ink">${heritageTeeGarnet.price}</p>
          </div>
          <p className="place-line mt-4 text-garnet">
            {HERITAGE_PRODUCT_COPY["heritage-tee-garnet"].cta}
          </p>
        </Link>

        <div className="mx-auto grid w-full max-w-[720px] grid-cols-2 gap-px bg-ink/10">
          {(
            [
              [heritageTeeBlack, "heritage-tee-black"],
              [baggySweatsGarnet, "baggy-sweats-garnet"],
              [baggySweatsBlack, "baggy-sweats-black"],
            ] as const
          ).map(([p, copyId]) => (
            <Link
              key={p.id}
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: p.id }}
              className="studio-field px-6 py-8 transition-opacity hover:opacity-80 sm:px-8"
            >
              <div className="relative mb-5 aspect-[3/4] overflow-hidden bg-[color-mix(in_oklab,var(--paper)_88%,white)]">
                <img
                  src={p.thumb}
                  alt={p.name}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <p className="place-line">Alumni</p>
              <p className="type-campaign mt-3 text-xl text-ink">{p.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">
                {HERITAGE_PRODUCT_COPY[copyId].card}
              </p>
              <p className="mt-3 font-sans text-lg tabular-nums text-ink/70">${p.price}</p>
              <p className="place-line mt-4 text-garnet">{HERITAGE_PRODUCT_COPY[copyId].cta}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* —— Sideline chapter —— */}
      <section className="relative isolate min-h-[80dvh] overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SURFACES.landingSideline}
            alt=""
            className="h-full w-full object-cover object-[center_12%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[80dvh] w-full max-w-[720px] flex-col justify-center px-6 py-20 sm:px-10">
          <p className="place-line text-bone">Sideline</p>
          <h2 className="type-editorial mt-4 max-w-xs text-[clamp(1.9rem,6vw,2.6rem)] text-bone">
            Through and through.
          </h2>
          <div className="tip-asymmetric mt-7">
            <span className="tip-asymmetric-a" />
            <span className="tip-asymmetric-bone" />
          </div>
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-bone/72">
            Same garnet under the lights. Customs that look like they belong on Avenue A.
          </p>
        </div>
      </section>

      {/* —— Close —— */}
      <section className="studio-field">
        <div className="mx-auto w-full max-w-[720px] px-6 py-20 sm:px-10 sm:py-24">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="place-line">Departments</p>
              <ul className="mt-8 space-y-5">
                {(
                  [
                    ["match", "Match"],
                    ["sideline", "Sideline"],
                    ["warmups", "Warmups"],
                    ["alumni", "Alumni"],
                  ] as const
                ).map(([id, label]) => (
                  <li key={id}>
                    <Link
                      to={DEPARTMENT_TO[id as CategoryId]}
                      params={{ slug: kit.slug }}
                      className="type-campaign text-2xl text-ink transition-opacity hover:opacity-50"
                    >
                      {label}
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
              {STORE_INTRO_COPY.cta.replace(/\s*→\s*$/, "")} · from ${LOWEST}
            </Link>
            <StoreCloseCountdown closesAt={kit.closesAt} className="text-ink/50" />
          </div>
          <p className="mt-10 place-line text-ink/40">669 Avenue A · Bayonne, NJ</p>
        </div>
      </section>
    </main>
  );
}
