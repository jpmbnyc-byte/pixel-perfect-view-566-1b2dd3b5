import { Link, createFileRoute } from "@tanstack/react-router";

import landingHero from "@/assets/bayonne/bayonne-landing-hero.jpg";
import boxingBee from "@/assets/bayonne/spirit/boxing-bee.png";
import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import { PRODUCTS } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

export const Route = createFileRoute("/team/")({
  head: () => {
    const title =
      "Bayonne has worn garnet and white since 1936. Most sweatshirts get the color wrong. | No Parade F.C.";
    const description =
      "Every garment is specified in Bayonne’s actual garnet — not maroon, not burgundy, not cardinal. Match kit from $34. Personalize and checkout. No Parade F.C., Bayonne, NJ.";
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

function TeamLanding() {
  const kit = BAYONNE_BEES_KIT;

  return (
    <main className="bg-black text-bone">
      <section className="relative isolate min-h-dvh overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={landingHero}
            alt=""
            className="h-full w-full object-cover object-center motion-safe:animate-team-hero-drift"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,8,0.4)_0%,rgba(8,6,8,0.25)_38%,rgba(8,6,8,0.82)_70%,rgba(8,6,8,0.96)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-6 pb-14 pt-10">
          <p className="label-caps text-bone/60 motion-safe:animate-team-rise">
            No Parade F.C. · Bayonne, NJ
          </p>

          <div className="mt-8 flex flex-1 flex-col justify-center motion-safe:animate-team-logo-in">
            <h1 className="font-kit text-[clamp(2.1rem,9vw,3.25rem)] leading-[1.02] tracking-[0.02em] text-bone">
              Bayonne has worn garnet and white since 1936. Most sweatshirts get the color
              wrong.
            </h1>
            <p className="mt-5 max-w-[30rem] text-lg leading-snug text-bone/75">
              Every garment here is specified in Bayonne’s actual garnet — not maroon, not
              burgundy, not cardinal. From ${LOWEST}.
            </p>
          </div>

          <div className="mt-auto space-y-3 pt-8 motion-safe:animate-team-rise [animation-delay:160ms]">
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: "jersey" }}
              className="label-caps inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-[transform,opacity] duration-300 hover:opacity-90 motion-safe:active:scale-[0.99]"
            >
              Shop Match jersey · $58
            </Link>
            <Link
              to="/team/$slug"
              params={{ slug: kit.slug }}
              className="label-caps inline-flex w-full items-center justify-center border border-bone/25 px-6 py-4 text-bone/85 transition-colors hover:border-bone hover:text-bone"
            >
              Browse the Bayonne store — from ${LOWEST}
            </Link>
            <StoreCloseCountdown closesAt={kit.closesAt} />
          </div>
        </div>
      </section>

      {/* Fast path — most families start here */}
      <section className="border-t border-bone/10 bg-[#12090b] px-6 py-12">
        <div className="mx-auto w-full max-w-[560px]">
          <p className="label-caps text-bone/50">Start here</p>
          <h2 className="mt-3 font-kit text-3xl tracking-wide text-bone">
            Most families begin with the Match jersey.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-bone/70">
            Collar says BAYONNE. Name and number on the back — you type them; we print them.
            Preview before you pay.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: "jersey" }}
              className="label-caps inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-opacity hover:opacity-90"
            >
              Personalize Match jersey · $58
            </Link>
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: "set" }}
              className="label-caps inline-flex w-full items-center justify-center border border-bone/25 px-6 py-4 text-bone/85 transition-colors hover:border-bone hover:text-bone"
            >
              Jersey + shorts · $89
            </Link>
          </div>
        </div>
      </section>

      {/* Long body — interested people read */}
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
            <li>
              Live preview of your name and number on the jersey before you pay.
            </li>
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
            params={{ slug: kit.slug, product: "jersey" }}
            className="label-caps mt-6 inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-opacity hover:opacity-90"
          >
            Start with the jersey · $58
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
            <img src={boxingBee} alt="" className="h-14 w-14 shrink-0 object-contain" />
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
