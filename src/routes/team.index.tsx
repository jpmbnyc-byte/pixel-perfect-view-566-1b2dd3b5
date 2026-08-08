import { Link, createFileRoute } from "@tanstack/react-router";

import { RevealCarousel } from "@/components/RevealCarousel";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

export const Route = createFileRoute("/team/")({
  head: () => {
    const title = "Bayonne teams, dressed properly. | No Parade F.C.";
    const description =
      "Free identity design for one Bayonne program each season. Kits fulfilled on demand — no inventory, no upfront cost to the club.";
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
      {/* Layer 1 — silent reveal. No CTA. No music. */}
      <RevealCarousel />

      {/* Layer 4 — landing hero */}
      <section className="relative isolate min-h-dvh overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,color-mix(in_oklab,var(--garnet)_55%,transparent),transparent_55%),linear-gradient(180deg,#12080a_0%,#1a0c10_42%,#0a0607_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay motion-safe:animate-team-hero-drift"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-6 pb-16 pt-14">
          <p className="label-caps text-bone/55 motion-safe:animate-team-rise">
            No Parade F.C. · Bayonne, NJ
          </p>

          <div className="mt-10 flex flex-1 flex-col justify-center motion-safe:animate-team-logo-in">
            <h1 className="font-kit text-[clamp(2.75rem,12vw,4.25rem)] leading-[0.95] tracking-[0.02em] text-bone">
              Bayonne teams, dressed properly.
            </h1>
            <p className="mt-6 max-w-[28rem] text-lg leading-snug text-bone/75 sm:text-xl">
              Free identity design for one Bayonne program each season. Kits fulfilled on
              demand — no inventory, no upfront cost to the club.
            </p>
          </div>

          <div className="mt-12 space-y-8 motion-safe:animate-team-rise [animation-delay:180ms]">
            <Link
              to="/team/$slug"
              params={{ slug: kit.slug }}
              className="label-caps inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-[transform,opacity] duration-300 hover:opacity-90 motion-safe:active:scale-[0.99]"
            >
              See the Queen Bees build
            </Link>

            {/* Layer 2 — caption. No CTA. No link. */}
            <div className="border-t border-bone/15 pt-8">
              <p className="text-base leading-relaxed text-bone/70">
                The 2024 Hudson County champions have gone by the Queen Bees for years.
                There was never a mark for it.
              </p>
              <p className="mt-4 text-base leading-relaxed text-bone/70">
                So we made one. Free. No invoice, no pitch.
              </p>
              <p className="mt-4 text-base leading-relaxed text-bone/70">
                If the program wants it, it&apos;s theirs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
