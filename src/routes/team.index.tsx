import { Link, createFileRoute } from "@tanstack/react-router";

import { LiquidBackdrop } from "@/components/LiquidBackdrop";
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
 * Bayonne peninsula landing: brand-first hero over liquid harbor field,
 * then place proof, Queen Bees reveal, and a clear Match-first offering.
 */
function TeamLanding() {
  const kit = BAYONNE_BEES_KIT;

  return (
    <main className="bg-black text-bone">
      {/* —— Hero: one composition —— */}
      <section className="relative isolate min-h-dvh overflow-hidden">
        <LiquidBackdrop intensity="full" />
        <div className="absolute inset-0" aria-hidden>
          {/* Full kit plate — contain, not cover-crop (Merchize blank must stay readable) */}
          <img
            src={SURFACES.landingHero}
            alt="Bayonne Bees Match jersey in school garnet"
            className="absolute inset-0 h-full w-full object-contain object-center opacity-[0.78] motion-safe:animate-team-hero-drift"
          />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(8,6,8,0.05)_0%,rgba(8,6,8,0.45)_50%,rgba(5,4,6,0.92)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-[32%] bg-gradient-to-b from-black/80 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-6 pb-12 pt-8">
          <header className="motion-safe:animate-team-logo-in">
            <p className="place-line">669 Avenue A · Bayonne, NJ · Est. 1936</p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src={CRESTS.primary}
                alt=""
                className="h-14 w-14 shrink-0 object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] motion-safe:animate-team-bee-pulse sm:h-16 sm:w-16"
              />

              <div className="min-w-0">
                <p className="font-kit text-[clamp(2rem,10vw,3.4rem)] leading-none tracking-[0.04em] text-bone">
                  BAYONNE BEES
                </p>
                <p className="label-caps mt-1.5 text-bone/55">No Parade F.C. · Team Customs</p>
              </div>
            </div>
          </header>

          <div className="mt-auto space-y-5 pt-10 motion-safe:animate-team-rise [animation-delay:120ms]">
            <h1 className="max-w-[22rem] font-kit text-[clamp(1.55rem,6.2vw,2.15rem)] leading-[1.12] tracking-[0.02em] text-bone">
              Garnet since 1936. Most spirit wear gets the color wrong.
            </h1>
            <p className="max-w-[26rem] text-base leading-snug text-bone/72">
              Specified in Bayonne’s actual garnet — not maroon, not burgundy, not cardinal.
              From ${LOWEST}.
            </p>

            <div className="space-y-3 pt-1">
              <Link
                to="/team/$slug/$product"
                params={{ slug: kit.slug, product: jersey.id }}
                className="label-caps inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-[transform,opacity] duration-300 hover:opacity-90 motion-safe:active:scale-[0.99]"
              >
                Shop Match jersey · ${jersey.price}
              </Link>
              <Link
                to="/team/$slug"
                params={{ slug: kit.slug }}
                className="label-caps inline-flex w-full items-center justify-center border border-bone/30 px-6 py-4 text-bone/90 transition-colors hover:border-bone hover:text-bone"
              >
                Browse the Bayonne store
              </Link>
              <StoreCloseCountdown closesAt={kit.closesAt} />
            </div>
          </div>
        </div>
      </section>

      {/* —— Queen Bees — one crest, one story (no slideshow) —— */}
      <section className="relative overflow-hidden border-t border-bone/10">
        <LiquidBackdrop intensity="soft" />
        <div className="relative z-10 mx-auto w-full max-w-[560px] px-6 py-14">
          <p className="place-line">Hudson County · Queen Bees</p>
          <h2 className="mt-3 font-kit text-[clamp(1.7rem,6.5vw,2.35rem)] tracking-wide text-bone">
            They’ve been calling themselves this for years. Nobody ever drew it.
          </h2>
          <figure className="mt-8 overflow-hidden bg-[var(--garnet)]">
            <img
              src={CRESTS.queen}
              alt="Queen Bees crest — boxing bee with crown, drawn for Bayonne"
              className="mx-auto h-auto w-full max-w-md object-contain"
            />

          </figure>
          <p className="mt-6 text-base leading-relaxed text-bone/75">
            In 2024 the Hudson County champions answered to a name that lived only in speech.
            There was no mark. No embroidery. Nothing a mother could point to on a jacket and
            say, that is ours. So we drew the crest. The files are theirs if they want them.
          </p>
        </div>
      </section>

      {/* —— Match-first offering —— */}
      <section className="relative overflow-hidden border-t border-bone/10">
        <LiquidBackdrop intensity="soft" />
        <div className="relative z-10 mx-auto w-full max-w-[560px] px-6 py-14">
          <p className="place-line">The offering</p>
          <h2 className="mt-3 font-kit text-[clamp(1.85rem,7vw,2.6rem)] tracking-wide text-bone">
            Most families begin with the Match jersey.
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-bone/70">
            Black V-neck. Name and number on the back — you type them; we print them. Live
            preview before you pay. Same garnet across every piece in the store.
          </p>
        </div>

        {/* Full-bleed product plate — not a card */}
        <Link
          to="/team/$slug/$product"
          params={{ slug: kit.slug, product: jersey.id }}
          className="group relative z-10 block"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-black sm:aspect-[5/4]">
            <img
              src={SURFACES.landingMatchJersey}
              alt="Match Jersey front in Bayonne garnet"
              className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
              <p className="label-caps text-bone/55">Match · Personalize</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h3 className="font-kit text-3xl tracking-wide text-bone">Match Jersey</h3>
                <span className="font-sans text-2xl tabular-nums text-bone">${jersey.price}</span>
              </div>
              <p className="label-caps mt-3 text-garnet">
                Put your name on the back · ${jersey.price} →
              </p>
            </div>
          </div>
        </Link>

        <div className="relative z-10 mx-auto grid w-full max-w-[560px] grid-cols-2 gap-px bg-bone/10">
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: shorts.id }}
            className="bg-black px-5 py-6 transition-colors hover:bg-[#12090b]"
          >
            <p className="label-caps text-bone/45">Match</p>
            <p className="mt-2 font-kit text-xl tracking-wide text-bone">Shorts</p>
            <p className="mt-1 font-sans text-lg tabular-nums text-bone/80">${shorts.price}</p>
          </Link>
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: fullSet.id }}
            className="bg-black px-5 py-6 transition-colors hover:bg-[#12090b]"
          >
            <p className="label-caps text-bone/45">Match</p>
            <p className="mt-2 font-kit text-xl tracking-wide text-bone">Full Kit</p>
            <p className="mt-1 font-sans text-lg tabular-nums text-bone/80">${fullSet.price}</p>
          </Link>
        </div>
      </section>

      {/* —— Place —— */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SURFACES.landingPlace}
            alt=""
            className="h-full w-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[560px] px-6 py-16">
          <p className="place-line">Bee Country</p>
          <h2 className="mt-3 font-kit text-3xl tracking-wide text-bone">
            The school has been on Avenue A since 1936.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-bone/75">
            <p>
              Garnet is a dark, slightly brown-toned red. Maroon is purple-toned. Burgundy is
              darker still. Put them side by side in a gym and you can see it from the top
              row.
            </p>
            <p>
              Most spirit wear is printed in whatever red the vendor already had loaded. It
              looks close on a screen and wrong in person. We built this store so Bayonne
              families stop settling for nearly-right.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-bone/15 pt-8">
            <div>
              <dt className="place-line">Opened</dt>
              <dd className="mt-2 font-kit text-2xl text-bone">1936</dd>
            </div>
            <div>
              <dt className="place-line">Colors</dt>
              <dd className="mt-2 font-kit text-2xl text-bone">Garnet</dd>
            </div>
            <div>
              <dt className="place-line">County</dt>
              <dd className="mt-2 font-kit text-2xl text-bone">Hudson</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* —— Categories —— */}
      <section className="relative overflow-hidden border-t border-bone/10 px-6 py-16">
        <LiquidBackdrop intensity="soft" />
        <div className="relative z-10 mx-auto w-full max-w-[560px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="place-line">How the store is built</p>
              <ul className="mt-5 space-y-4 text-base text-bone/75">
                <li>
                  <span className="text-bone">Match</span> — what they wear when the whistle
                  blows
                </li>
                <li>
                  <span className="text-bone">Sideline</span> — for standing outside in
                  November
                </li>
                <li>
                  <span className="text-bone">Warmups</span> — what the team wears before the
                  whistle
                </li>
                <li>
                  <span className="text-bone">Alumni</span> — the years are on the sleeve, or
                  the collar
                </li>
              </ul>
            </div>
            <img
              src={CRESTS.primary}
              alt=""
              className="h-20 w-20 shrink-0 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            />

          </div>
          <div className="mt-10 flex flex-col gap-3">
            <Link
              to="/team/$slug"
              params={{ slug: kit.slug }}
              hash="match"
              className="label-caps inline-flex w-full items-center justify-center bg-bone px-6 py-4 text-black transition-opacity hover:opacity-90"
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
