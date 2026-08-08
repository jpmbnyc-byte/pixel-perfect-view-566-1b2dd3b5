import { Link, createFileRoute } from "@tanstack/react-router";

import landingHero from "@/assets/bayonne/bayonne-landing-hero.jpg";
import boxingBee from "@/assets/bayonne/spirit/boxing-bee.png";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

export const Route = createFileRoute("/team/")({
  head: () => {
    const title = "Bayonne teams, dressed properly. | No Parade F.C.";
    const description =
      "Team Customs for Bayonne programs — kits fulfilled on demand, no inventory, no upfront cost to the club. Identity design for one Bayonne program each season.";
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
      {/* Universal Team Customs hero — not Queen Bees–only */}
      <section className="relative isolate min-h-dvh overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={landingHero}
            alt=""
            className="h-full w-full object-cover object-center motion-safe:animate-team-hero-drift"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,8,0.35)_0%,rgba(8,6,8,0.2)_40%,rgba(8,6,8,0.75)_72%,rgba(8,6,8,0.95)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_20%,color-mix(in_oklab,var(--garnet)_40%,transparent),transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-6 pb-14 pt-10">
          <p className="label-caps text-bone/60 motion-safe:animate-team-rise">
            No Parade F.C. · Team Customs · Bayonne, NJ
          </p>

          <div className="mt-10 flex flex-1 flex-col items-start justify-center motion-safe:animate-team-logo-in">
            <h1 className="font-kit text-[clamp(2.75rem,12vw,4.25rem)] leading-[0.95] tracking-[0.02em] text-bone">
              Bayonne teams, dressed properly.
            </h1>
            <p className="mt-6 max-w-[28rem] text-lg leading-snug text-bone/75 sm:text-xl">
              Kits and warm-ups for Bayonne programs — printed to order. No inventory in a
              closet. No check from the club before a stitch is cut.
            </p>
          </div>

          <div className="mt-auto space-y-4 pt-10 motion-safe:animate-team-rise [animation-delay:160ms]">
            <Link
              to="/team/$slug"
              params={{ slug: kit.slug }}
              className="label-caps inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-[transform,opacity] duration-300 hover:opacity-90 motion-safe:active:scale-[0.99]"
            >
              Open Team Customs
            </Link>
            <a
              href="#spirit"
              className="label-caps inline-flex w-full items-center justify-center border border-bone/25 px-6 py-4 text-bone/85 transition-colors hover:border-bone hover:text-bone"
            >
              See Spirit — football energy
            </a>
          </div>
        </div>
      </section>

      {/* Spirit — football / sideline energy using Bayonne Bees mark */}
      <section id="spirit" className="relative border-t border-bone/10 bg-[#0c0809] px-6 py-16">
        <div className="mx-auto w-full max-w-[560px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label-caps text-bone/50">Category</p>
              <h2 className="mt-2 font-kit text-4xl tracking-wide text-bone">Spirit</h2>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-bone/70">
                Football nights. Sideline noise. The boxing bee on a garnet field — spirit
                wear for the programs that show up.
              </p>
            </div>
            <img
              src={boxingBee}
              alt=""
              className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_8px_24px_rgba(90,22,38,0.55)]"
            />
          </div>

          <Link
            to="/team/$slug"
            params={{ slug: kit.slug }}
            hash="spirit"
            className="label-caps mt-8 inline-flex w-full items-center justify-center bg-bone px-6 py-4 text-black transition-opacity hover:opacity-90"
          >
            Shop Spirit
          </Link>
        </div>
      </section>

      {/* Queen Bees — featured identity, not the whole site */}
      <section className="border-t border-bone/10 bg-black px-6 py-16">
        <div className="mx-auto w-full max-w-[560px]">
          <p className="label-caps text-bone/50">Featured identity</p>
          <h2 className="mt-2 font-kit text-3xl tracking-wide text-bone">
            Queen Bees crest
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bone/70">
            One Bayonne program. A name that lived in speech for years without a mark. We
            drew the crest free of charge — no invoice, no pitch. If the program wants it,
            the files are theirs.
          </p>
          <Link
            to="/team/$slug"
            params={{ slug: kit.slug }}
            className="label-caps mt-8 inline-flex text-garnet underline-offset-4 transition-colors hover:text-bone hover:underline"
          >
            View the crest build →
          </Link>
        </div>
      </section>
    </main>
  );
}
