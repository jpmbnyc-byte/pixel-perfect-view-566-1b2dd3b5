import { Link, createFileRoute } from "@tanstack/react-router";

import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import { CRESTS, SURFACES } from "@/lib/brandAssets";
import { PRODUCTS, productById } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

export const Route = createFileRoute("/team/")({
  head: () => {
    const title =
      "Bayonne Bees Team Customs — garnet specified right since 1936 | No Parade F.C.";
    const description =
      "Bayonne Bees team customs in the school’s actual garnet — not maroon, not burgundy, not cardinal. Match kit from $34. Personalize and checkout. No Parade F.C., Bayonne, NJ.";
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

const LOWEST = Math.min(...PRODUCTS.map((p) => p.price));
const jersey = productById("jersey")!;
const fullSet = productById("full-set")!;
const shorts = productById("shorts")!;

/**
 * Adidas-language landing: full-bleed lifestyle story, massive type,
 * garnet accent bars — zero manufacturer logos. Product plates stay
 * for the commerce block only.
 */
function TeamLanding() {
  const kit = BAYONNE_BEES_KIT;

  return (
    <main className="bg-black text-bone">
      {/* —— Hero: one composition, lifestyle full-bleed —— */}
      <section className="relative isolate min-h-dvh overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SURFACES.landingHero}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_20%] motion-safe:animate-team-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/25" />
          <div className="absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-black/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[640px] flex-col px-6 pb-12 pt-8">
          <header className="motion-safe:animate-team-logo-in">
            <p className="place-line">Bayonne, NJ · Est. 1936</p>
            <div className="mt-5 flex items-end gap-4">
              <img
                src={CRESTS.primary}
                alt=""
                className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
              />
              <p className="type-campaign-tight text-[clamp(2.6rem,14vw,4.5rem)] text-bone">
                BAYONNE
                <br />
                BEES
              </p>
            </div>
            <span className="bar-garnet mt-5 motion-safe:animate-team-bar-in" />
          </header>

          <div className="mt-auto space-y-5 pt-10 motion-safe:animate-team-rise [animation-delay:120ms]">
            <h1 className="type-campaign max-w-[18rem] text-[clamp(1.85rem,7.5vw,2.6rem)] text-bone">
              Impossible is a color match.
            </h1>
            <p className="max-w-[22rem] text-base leading-snug text-bone/75">
              Garnet since 1936 — not maroon, not burgundy, not cardinal. From ${LOWEST}.
            </p>
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Link
                to="/team/$slug/$product"
                params={{ slug: kit.slug, product: jersey.id }}
                className="label-caps inline-flex flex-1 items-center justify-center bg-bone px-6 py-4 text-black transition-[transform,opacity] duration-300 hover:opacity-90 motion-safe:active:scale-[0.99]"
              >
                Shop Match jersey · ${jersey.price}
              </Link>
              <Link
                to="/team/$slug"
                params={{ slug: kit.slug }}
                className="label-caps inline-flex flex-1 items-center justify-center border border-bone/40 px-6 py-4 text-bone transition-colors hover:border-bone hover:bg-bone/5"
              >
                Open the store
              </Link>
            </div>
            <StoreCloseCountdown closesAt={kit.closesAt} />
          </div>
        </div>
      </section>

      {/* —— Queen Bees story — lifestyle proof —— */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SURFACES.landingQueenStory}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[92dvh] w-full max-w-[640px] flex-col justify-end px-6 py-14">
          <p className="place-line">Hudson County · Queen Bees</p>
          <h2 className="type-campaign mt-3 text-[clamp(2rem,9vw,3.2rem)] text-bone">
            They’ve been calling themselves this for years.
          </h2>
          <span className="bar-garnet mt-5" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-bone/80">
            Nobody ever drew it. So we drew the crest — and built the customs store around
            the name that already lived in the hallway.
          </p>
          <figure className="mt-8 w-28 sm:w-32">
            <img
              src={CRESTS.queen}
              alt="Queen Bees crest"
              className="h-auto w-full object-contain"
            />
          </figure>
        </div>
      </section>

      {/* —— Sideline energy —— */}
      <section className="relative isolate min-h-[85dvh] overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SURFACES.landingSideline}
            alt=""
            className="h-full w-full object-cover object-[center_15%] motion-safe:animate-team-hero-drift"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[85dvh] w-full max-w-[640px] flex-col justify-center px-6 py-16">
          <p className="place-line">Friday nights · Avenue A</p>
          <h2 className="type-campaign mt-3 max-w-[14rem] text-[clamp(2.2rem,10vw,3.4rem)] text-bone">
            Through and through.
          </h2>
          <span className="bar-garnet mt-5" />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-bone/78">
            Same garnet under the lights. Same white on the chest. Customs that look like they
            belong on the peninsula — not a vendor’s nearest red.
          </p>
        </div>
      </section>

      {/* —— Match offering — commerce plates —— */}
      <section className="relative overflow-hidden bg-black">
        <div className="mx-auto w-full max-w-[640px] px-6 py-14">
          <p className="place-line">The kit</p>
          <h2 className="type-campaign mt-3 text-[clamp(2rem,8vw,3rem)] text-bone">
            Start with the Match jersey.
          </h2>
          <span className="bar-garnet mt-5" />
          <p className="mt-5 max-w-md text-base leading-relaxed text-bone/70">
            Black V-neck. Name and number on the back — you type them; we print them. Live
            preview before you pay.
          </p>
        </div>

        <Link
          to="/team/$slug/$product"
          params={{ slug: kit.slug, product: jersey.id }}
          className="group relative z-10 block"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0a0708] sm:aspect-[5/4]">
            <img
              src={SURFACES.landingMatchJersey}
              alt="Match Jersey front in Bayonne garnet"
              className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
              <p className="place-line">Match · Personalize</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h3 className="type-campaign text-3xl text-bone">Match Jersey</h3>
                <span className="font-sans text-2xl tabular-nums text-bone">${jersey.price}</span>
              </div>
              <p className="label-caps mt-3 text-garnet">Put your name on the back →</p>
            </div>
          </div>
        </Link>

        <div className="mx-auto grid w-full max-w-[640px] grid-cols-2 gap-px bg-bone/10">
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: shorts.id }}
            className="bg-black px-5 py-7 transition-colors hover:bg-[#12090b]"
          >
            <p className="place-line">Match</p>
            <p className="type-campaign mt-2 text-2xl text-bone">Shorts</p>
            <p className="mt-1 font-sans text-lg tabular-nums text-bone/80">${shorts.price}</p>
          </Link>
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: fullSet.id }}
            className="bg-black px-5 py-7 transition-colors hover:bg-[#12090b]"
          >
            <p className="place-line">Match</p>
            <p className="type-campaign mt-2 text-2xl text-bone">Full Kit</p>
            <p className="mt-1 font-sans text-lg tabular-nums text-bone/80">${fullSet.price}</p>
          </Link>
        </div>
      </section>

      {/* —— Place facts —— */}
      <section className="border-t border-bone/10 bg-black px-6 py-16">
        <div className="mx-auto w-full max-w-[640px]">
          <p className="place-line">Bee Country</p>
          <h2 className="type-campaign mt-3 text-[clamp(1.9rem,7vw,2.8rem)] text-bone">
            On Avenue A since 1936.
          </h2>
          <span className="bar-garnet mt-5" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-bone/75">
            Garnet is a dark, slightly brown-toned red. Maroon is purple-toned. Most spirit wear
            is whatever red the vendor already had loaded. We built this store so Bayonne
            families stop settling for nearly-right.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-bone/15 pt-8">
            <div>
              <dt className="place-line">Opened</dt>
              <dd className="type-campaign mt-2 text-3xl text-bone">1936</dd>
            </div>
            <div>
              <dt className="place-line">Colors</dt>
              <dd className="type-campaign mt-2 text-3xl text-bone">Garnet</dd>
            </div>
            <div>
              <dt className="place-line">County</dt>
              <dd className="type-campaign mt-2 text-3xl text-bone">Hudson</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* —— Categories close —— */}
      <section className="border-t border-bone/10 bg-[#0a0708] px-6 py-16">
        <div className="mx-auto w-full max-w-[640px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="place-line">How the store is built</p>
              <ul className="mt-6 space-y-4 text-base text-bone/75">
                <li>
                  <span className="text-bone">Match</span> — when the whistle blows
                </li>
                <li>
                  <span className="text-bone">Sideline</span> — November bleachers
                </li>
                <li>
                  <span className="text-bone">Warmups</span> — before kickoff
                </li>
                <li>
                  <span className="text-bone">Alumni</span> — the years on the collar
                </li>
              </ul>
            </div>
            <img
              src={CRESTS.primary}
              alt=""
              className="h-20 w-20 shrink-0 object-contain"
            />
          </div>
          <div className="mt-10 flex flex-col gap-3">
            <Link
              to="/team/$slug"
              params={{ slug: kit.slug }}
              hash="match"
              className="label-caps inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-opacity hover:opacity-90"
            >
              Shop Match — from ${LOWEST}
            </Link>
            <Link
              to="/team/$slug"
              params={{ slug: kit.slug }}
              hash="sideline"
              className="label-caps inline-flex w-full items-center justify-center border border-bone/25 px-6 py-4 text-bone/85 transition-colors hover:border-bone hover:text-bone"
            >
              Shop Sideline
            </Link>
          </div>
          <p className="mt-8 text-center text-sm text-bone/45">No Parade F.C. · Bayonne, NJ</p>
          <StoreCloseCountdown closesAt={kit.closesAt} className="mt-3 text-center" />
        </div>
      </section>
    </main>
  );
}
