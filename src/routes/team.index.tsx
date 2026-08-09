import { Link, createFileRoute } from "@tanstack/react-router";

import landingHero from "@/assets/bayonne/heroes/hero-landing.jpg";
import boxingBee from "@/assets/bayonne/spirit/boxing-bee.png";
import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
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
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TeamLanding,
});

const LOWEST = Math.min(...PRODUCTS.map((p) => p.price));
const jersey = productById("jersey")!;
const fullSet = productById("full-set")!;

/**
 * Ogilvy landing: product is the proof.
 * Brand (BAYONNE BEES) leads the first viewport; the kit is the full-bleed evidence;
 * one fact headline, one line of support, one CTA group.
 */
function TeamLanding() {
  const kit = BAYONNE_BEES_KIT;

  return (
    <main className="bg-black text-bone">
      <section className="relative isolate min-h-dvh overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={landingHero}
            alt="Bayonne Bees Match kit in school garnet"
            className="h-full w-full object-cover object-[center_28%] motion-safe:animate-team-hero-drift"
          />
          {/* Editorial grade — keep the garment readable, type legible */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(8,6,8,0.15)_0%,rgba(8,6,8,0.55)_55%,rgba(8,6,8,0.92)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-6 pb-12 pt-8">
          {/* Brand lockup — hero-level signal */}
          <header className="motion-safe:animate-team-logo-in">
            <div className="flex items-center gap-3">
              <img
                src={boxingBee}
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

      <section className="border-t border-bone/10 bg-[#12090b] px-6 py-12">
        <div className="mx-auto w-full max-w-[560px]">
          <p className="label-caps text-bone/50">Start here</p>
          <h2 className="mt-3 font-kit text-3xl tracking-wide text-bone">
            Most families begin with the Match jersey.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-bone/70">
            Black V-neck. Name and number on the back — you type them; we print them. Preview
            before you pay.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: jersey.id }}
              className="label-caps inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-opacity hover:opacity-90"
            >
              Personalize Match jersey · ${jersey.price}
            </Link>
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: fullSet.id }}
              className="label-caps inline-flex w-full items-center justify-center border border-bone/25 px-6 py-4 text-bone/85 transition-colors hover:border-bone hover:text-bone"
            >
              Jersey + shorts · ${fullSet.price}
            </Link>
          </div>
        </div>
      </section>

      <section id="why-garnet" className="border-t border-bone/10 bg-[#0c0809] px-6 py-16">
        <div className="mx-auto w-full max-w-[560px] space-y-5 text-base leading-relaxed text-bone/75">
          <p>
            Garnet is a dark, slightly brown-toned red. Maroon is purple-toned. Burgundy is
            darker still. Put them side by side in a gym and you can see it from the top row.
          </p>
          <p>
            Most spirit wear is printed in whatever red the vendor already had loaded. It
            looks close on a screen and wrong in person, and it fades a shade further with
            every wash.
          </p>
          <p>
            We built this store to fix a small problem that has annoyed Bayonne parents for a
            long time.
          </p>

          <h2 className="pt-4 font-kit text-3xl tracking-wide text-bone">
            Things worth knowing before you order
          </h2>
          <ol className="list-decimal space-y-4 pl-5">
            <li>Live preview of your name and number on the jersey before you pay.</li>
            <li>
              Every garment is specified in one matched garnet across the whole store. A crew
              bought in October matches a jersey ordered in April.
            </li>
            <li>
              Nothing is printed until you order it. There is no back room of unsold XLs.
            </li>
            <li>
              Adult sizes with a size chart in inches — chest and body length, not “runs
              small.”
            </li>
            <li>
              Checkout on a secure cart at{" "}
              <a
                href="https://noparade-store.com"
                className="text-bone underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                noparade-store.com
              </a>
              . You design the piece here first.
            </li>
          </ol>
          <p className="pt-2">
            The school has been at 669 Avenue A since 1936. Roughly none of the students, and
            none of their parents, should have to settle for a shirt that is nearly the right
            red.
          </p>
          <p className="text-sm text-bone/45">No Parade F.C. · Bayonne, NJ</p>
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: jersey.id }}
            className="label-caps mt-6 inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-opacity hover:opacity-90"
          >
            Start with the jersey · ${jersey.price}
          </Link>
          <StoreCloseCountdown closesAt={kit.closesAt} className="mt-3 text-center" />
        </div>
      </section>

      <section className="border-t border-bone/10 bg-black px-6 py-16">
        <div className="mx-auto w-full max-w-[560px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label-caps text-bone/50">Categories</p>
              <ul className="mt-4 space-y-3 text-base text-bone/75">
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
              src={boxingBee}
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
        </div>
      </section>
    </main>
  );
}
