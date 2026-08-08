import { Link, createFileRoute } from "@tanstack/react-router";

import landingHero from "@/assets/bayonne/bayonne-landing-hero.jpg";
import boxingBee from "@/assets/bayonne/spirit/boxing-bee.png";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

export const Route = createFileRoute("/team/")({
  head: () => {
    const title =
      "Bayonne has worn garnet and white since 1936. Most sweatshirts get the color wrong. | No Parade F.C.";
    const description =
      "Everything in this store is printed in Bayonne’s actual garnet — not maroon, not burgundy, not cardinal. On-demand Team Customs from No Parade F.C.";
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
              Everything in this store is printed in Bayonne’s actual garnet — not maroon,
              not burgundy, not cardinal.
            </p>
          </div>

          <div className="mt-auto space-y-3 pt-8 motion-safe:animate-team-rise [animation-delay:160ms]">
            <Link
              to="/team/$slug"
              params={{ slug: kit.slug }}
              className="label-caps inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-[transform,opacity] duration-300 hover:opacity-90 motion-safe:active:scale-[0.99]"
            >
              Open the Bayonne store
            </Link>
            <a
              href="#why-garnet"
              className="label-caps inline-flex w-full items-center justify-center border border-bone/25 px-6 py-4 text-bone/85 transition-colors hover:border-bone hover:text-bone"
            >
              Read why the color matters
            </a>
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
              Every garment is specified in one matched garnet and used across the whole
              store. A crew bought in October matches a jersey ordered in April.
            </li>
            <li>
              Nothing is printed until you order it. There is no back room of unsold XLs.
              Fulfillment runs on demand through Merchize to Shopify.
            </li>
            <li>
              Sizes run from adult 2XS to 3XL. The size chart gives chest and body length in
              inches — not “runs small.”
            </li>
            <li>
              The girls soccer program that won the 2024 Hudson County championship has gone
              by Queen Bees for years. The crest for that name was drawn by hand, in Bayonne,
              and had never existed as a mark before.
            </li>
            <li>
              The year can sit inside the collar, where only the player sees it.
            </li>
            <li>
              Order at{" "}
              <a
                href="https://noparade-store.com"
                className="text-bone underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                noparade-store.com
              </a>
              . Design and customize here at{" "}
              <Link to="/team/$slug" params={{ slug: kit.slug }} className="text-bone underline underline-offset-4">
                /team
              </Link>
              .
            </li>
          </ol>
          <p className="pt-2">
            The school has been at 669 Avenue A since 1936. Roughly none of the students, and
            none of their parents, should have to settle for a shirt that is nearly the right
            red.
          </p>
          <p className="text-sm text-bone/45">
            This is a Bayonne store from No Parade F.C. — a resident studio. It is not an
            official district store until the Board says so in writing.
          </p>
        </div>
      </section>

      <section className="border-t border-bone/10 bg-black px-6 py-16">
        <div className="mx-auto w-full max-w-[560px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label-caps text-bone/50">Categories</p>
              <ul className="mt-4 space-y-3 text-base text-bone/75">
                <li>
                  <span className="text-bone">Sideline</span> — for standing outside in
                  November
                </li>
                <li>
                  <span className="text-bone">Warmups</span> — what the team wears before the
                  whistle
                </li>
                <li>
                  <span className="text-bone">Alumni</span> — the years are on the back
                </li>
                <li>
                  <span className="text-bone">Match</span> — what they wear when the whistle
                  blows
                </li>
              </ul>
            </div>
            <img src={boxingBee} alt="" className="h-14 w-14 shrink-0 object-contain" />
          </div>
          <Link
            to="/team/$slug"
            params={{ slug: kit.slug }}
            hash="sideline"
            className="label-caps mt-10 inline-flex w-full items-center justify-center bg-bone px-6 py-4 text-black transition-opacity hover:opacity-90"
          >
            Shop Sideline
          </Link>
        </div>
      </section>
    </main>
  );
}
