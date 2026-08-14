import { Link, createFileRoute } from "@tanstack/react-router";

import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import { CRESTS, SURFACES } from "@/lib/brandAssets";
import { PRODUCTS, productById } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

const LOWEST = Math.min(...PRODUCTS.map((p) => p.price));
const jersey = productById("jersey")!;
const fullSet = productById("full-set")!;
const shorts = productById("shorts")!;

export const Route = createFileRoute("/team/")({
  head: () => {
    const title = "Bayonne Team Customs — garnet since 1936 | No Parade F.C.";
    const description = `Team customs in Bayonne’s actual garnet. Put your name on a jersey. From $${LOWEST}. No Parade F.C., Avenue A.`;
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
                to="/team/$slug"
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
              The right red. Finally.
            </h1>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-bone/70">
              Team customs for Bayonne — made in the color you actually wear. From ${LOWEST}.
            </p>
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: jersey.id }}
              className="place-line inline-flex items-center gap-3 border-b border-bone/40 pb-2 text-bone transition-colors hover:border-bone"
            >
              Put your name on it · ${jersey.price}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* —— Paper manifesto —— */}
      <section className="studio-field">
        <div className="mx-auto w-full max-w-[720px] px-6 py-20 sm:px-10 sm:py-28">
          <p className="place-line">Why this store</p>
          <h2 className="type-editorial mt-6 max-w-lg text-[clamp(1.75rem,5vw,2.4rem)] text-ink">
            Because “close enough” isn’t a color.
          </h2>
          <div className="tip-asymmetric mt-8">
            <span className="tip-asymmetric-a" />
            <span className="tip-asymmetric-b" />
          </div>
          <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-ink/70">
            Most spirit wear shows up in whatever red the printer already had loaded. You notice in
            the gym. We matched Bayonne’s garnet once — and kept it.
          </p>
          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
            <div>
              <dt className="place-line">Opened</dt>
              <dd className="type-campaign mt-3 text-2xl text-ink">1936</dd>
            </div>
            <div>
              <dt className="place-line">Color</dt>
              <dd className="type-campaign mt-3 text-2xl text-ink">Garnet</dd>
            </div>
            <div>
              <dt className="place-line">County</dt>
              <dd className="type-campaign mt-3 text-2xl text-ink">Hudson</dd>
            </div>
          </dl>
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
              <p className="place-line">Shop</p>
              <h2 className="type-campaign mt-4 text-[clamp(2rem,7vw,2.8rem)] text-ink">
                The Match strip
              </h2>
            </div>
            <Link
              to="/team/$slug"
              params={{ slug: kit.slug }}
              hash="match"
              className="place-line shrink-0 text-ink transition-opacity hover:opacity-55"
            >
              View all
            </Link>
          </div>
          <p className="type-editorial mt-5 max-w-md text-lg text-ink/75">
            Narrow crew. Name and number on the back — typed by you, printed by us.
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
              className="h-full w-full object-contain object-center transition-transform duration-[1.1s] ease-out group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-6">
            <div>
              <p className="place-line">Match</p>
              <h3 className="type-campaign mt-2 text-2xl text-ink">Match Jersey</h3>
            </div>
            <p className="font-sans text-xl tabular-nums text-ink">${jersey.price}</p>
          </div>
        </Link>

        <div className="mx-auto grid w-full max-w-[720px] grid-cols-2 gap-px bg-ink/10 px-0 sm:px-10">
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: shorts.id }}
            className="studio-field px-6 py-8 transition-opacity hover:opacity-80 sm:px-8"
          >
            <p className="place-line">Match</p>
            <p className="type-campaign mt-3 text-xl text-ink">Shorts</p>
            <p className="mt-2 font-sans text-lg tabular-nums text-ink/70">${shorts.price}</p>
          </Link>
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: fullSet.id }}
            className="studio-field px-6 py-8 transition-opacity hover:opacity-80 sm:px-8"
          >
            <p className="place-line">Match</p>
            <p className="type-campaign mt-3 text-xl text-ink">Full Kit</p>
            <p className="mt-2 font-sans text-lg tabular-nums text-ink/70">${fullSet.price}</p>
          </Link>
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
                ).map(([hash, label]) => (
                  <li key={hash}>
                    <Link
                      to="/team/$slug"
                      params={{ slug: kit.slug }}
                      hash={hash}
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
              to="/team/$slug"
              params={{ slug: kit.slug }}
              hash="match"
              className="place-line inline-flex items-center justify-center bg-ink px-8 py-4 text-bone transition-opacity hover:opacity-90"
            >
              Enter the store · from ${LOWEST}
            </Link>
            <StoreCloseCountdown closesAt={kit.closesAt} className="text-ink/50" />
          </div>
          <p className="mt-10 place-line text-ink/40">669 Avenue A · Bayonne, NJ</p>
        </div>
      </section>
    </main>
  );
}
