import { Link, createFileRoute } from "@tanstack/react-router";

import logo from "@/assets/bayonne/bayonne-bees-logo.png";
import hero from "@/assets/bayonne/heroes/hero-kit-studio.jpg";
import { countdownParts } from "@/lib/kit";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

export const Route = createFileRoute("/team/")({
  head: () => {
    const title = "Bayonne Bees — Team Customs | No Parade F.C.";
    const description =
      "Bayonne Bees custom kits. Lock your name, number, and size before the store closes.";
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
    <main className="relative min-h-dvh overflow-hidden bg-black text-bone">
      {/* Single full-bleed merged visual plane */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src={hero}
          alt=""
          className="h-full w-full object-cover object-center motion-safe:animate-team-hero-drift"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,8,0.15)_0%,rgba(8,6,8,0.05)_32%,rgba(8,6,8,0.55)_68%,rgba(8,6,8,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_18%,color-mix(in_oklab,var(--maroon)_35%,transparent),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[520px] flex-col px-6 pb-14 pt-10">
        <div className="flex flex-1 flex-col items-center justify-center text-center motion-safe:animate-team-logo-in">
          <img
            src={logo}
            alt="Bayonne Bees"
            className="h-28 w-28 object-contain drop-shadow-[0_8px_28px_rgba(90,22,38,0.55)] sm:h-32 sm:w-32"
          />
          <p className="label-caps mt-6 text-bone/70">No Parade F.C. · Team Customs</p>
          <h1 className="mt-3 font-kit text-[clamp(3.5rem,16vw,5.5rem)] leading-none tracking-[0.04em] text-bone">
            Bayonne Bees
          </h1>
          <p className="mt-4 max-w-[20rem] text-base leading-snug text-bone/75 sm:text-lg">
            Maroon and black. Name, number, size — held for the season.
          </p>
        </div>

        <div className="mt-auto space-y-5 pt-8 motion-safe:animate-team-rise [animation-delay:160ms]">
          <div className="text-center">
            <p className="label-caps text-bone/50">
              {live ? "Live now" : "Store closed"} · {kit.family.label} {kit.family.version}
            </p>
            <p className="mt-2 font-display text-lg tracking-[0.2em] text-maroon">
              {kit.colorway.name}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/team/$slug"
              params={{ slug: kit.slug }}
              className="label-caps inline-flex items-center justify-center bg-maroon px-6 py-4 text-bone transition-[transform,opacity] duration-300 hover:opacity-90 motion-safe:active:scale-[0.99]"
            >
              {live ? "Open the kit store" : "View the kit store"}
            </Link>
            <a
              href="https://noparade-store.com"
              target="_blank"
              rel="noreferrer"
              className="label-caps inline-flex items-center justify-center border border-bone/25 px-6 py-4 text-bone/85 transition-colors hover:border-bone hover:text-bone"
            >
              No Parade store
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
