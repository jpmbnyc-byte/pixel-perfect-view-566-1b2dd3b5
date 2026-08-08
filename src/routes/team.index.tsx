import { Link, createFileRoute } from "@tanstack/react-router";

import heroKit from "@/assets/model-soccer-back.jpg";
import { countdownParts } from "@/lib/kit";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

export const Route = createFileRoute("/team/")({
  head: () => {
    const title = "Team Customs — No Parade F.C.";
    const description =
      "Custom team kits from No Parade F.C. Open the live Bayonne Bees store to lock your name, number, and size.";
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
  const live = kit.status === "live" && countdownParts(kit.closesAt, Date.now()) !== null;

  return (
    <main className="relative min-h-dvh overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0" aria-hidden>
        <img
          src={heroKit}
          alt=""
          className="h-full w-full object-cover object-[center_20%] opacity-55 motion-safe:animate-team-hero-drift"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_15%,transparent_0%,color-mix(in_oklab,var(--primary)_55%,transparent)_45%,var(--primary)_78%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_35%,transparent)_0%,transparent_28%,color-mix(in_oklab,var(--primary)_70%,transparent)_70%,var(--primary)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-12deg, transparent 0 14px, color-mix(in oklab, var(--gold) 80%, white) 14px 15px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[520px] flex-col justify-end px-6 pb-14 pt-16">
        <div className="motion-safe:animate-team-rise">
          <p className="label-caps text-accent">No Parade F.C.</p>
          <h1 className="mt-4 font-display text-[clamp(3.25rem,14vw,4.75rem)] leading-[0.92] tracking-tight text-bone">
            Team Customs
          </h1>
          <p className="mt-4 max-w-[22rem] text-base leading-snug text-primary-foreground/80 sm:text-lg">
            Name, number, size — ordered once, held for the season.
          </p>
        </div>

        <div className="mt-10 space-y-4 motion-safe:animate-team-rise [animation-delay:180ms]">
          <p className="label-caps text-primary-foreground/55">
            {live ? "Live now" : "Store closed"} · {kit.family.label} {kit.family.version}
          </p>
          <p className="font-kit text-4xl tracking-wide text-bone sm:text-5xl">{kit.teamName}</p>
          <p className="font-display text-xl italic text-accent">“{kit.family.doctrine}”</p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <Link
              to="/team/$slug"
              params={{ slug: kit.slug }}
              className="label-caps inline-flex items-center justify-center bg-accent px-6 py-4 text-accent-foreground transition-[transform,opacity] duration-300 hover:opacity-90 motion-safe:active:scale-[0.99]"
            >
              {live ? "Open Bayonne Bees" : "View Bayonne Bees"}
            </Link>
            <a
              href="https://noparade-store.com"
              target="_blank"
              rel="noreferrer"
              className="label-caps inline-flex items-center justify-center border border-primary-foreground/25 px-6 py-4 text-primary-foreground/85 transition-colors hover:border-accent hover:text-accent"
            >
              No Parade store
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
