import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import logo from "@/assets/bayonne/spirit/boxing-bee.png";
import { LiquidBackdrop } from "@/components/LiquidBackdrop";
import {
  CATEGORIES,
  productById,
  productsInCategory,
  type CatalogProduct,
  type CategoryId,
} from "@/lib/catalog";
import { countdownParts } from "@/lib/kit";
import { shopifySynced } from "@/lib/shopify";
import { Route as TeamSlugRoute } from "./team.$slug";

const CATEGORY_IDS: CategoryId[] = ["match", "training", "sideline", "faithful"];

/** Old hashes from earlier store builds */
const LEGACY_CATEGORY: Record<string, CategoryId> = {
  warmups: "training",
  alumni: "faithful",
};

const CATEGORY_LINE: Record<CategoryId, string> = {
  match: "Whistle to final horn — the strip they wear on the field.",
  training: "Before kickoff — long sleeve, quarter-zip, sweats.",
  sideline: "Coach, travel, November on the rail. Same garnet.",
  faithful: "Parents, alumni, boosters. The year is the product.",
};

export const Route = createFileRoute("/team/$slug/")({
  component: TeamStorePage,
});

function productAction(p: CatalogProduct) {
  if (p.typography && p.nameNumber) return "Personalize";
  if (p.sizeChart === "hat") return "Choose size";
  if (p.previewPair === "front-side") return "See front + side";
  return "View piece";
}

function TeamStorePage() {
  const { kit, sync } = TeamSlugRoute.useLoaderData();
  const [category, setCategory] = useState<CategoryId>("match");
  const countdown = countdownParts(kit.closesAt, Date.now());
  /** Program store stays open (Faithful is year-round). Match roster window is separate. */
  const storeLive = kit.status === "live";
  const matchWindowOpen = storeLive && countdown !== null;
  const catalogReady = shopifySynced(sync);
  const featuredJersey = productById("jersey");

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (CATEGORY_IDS.includes(raw as CategoryId)) {
      setCategory(raw as CategoryId);
      return;
    }
    const mapped = LEGACY_CATEGORY[raw];
    if (mapped) setCategory(mapped);
  }, []);

  const active = useMemo(() => CATEGORIES.find((c) => c.id === category)!, [category]);
  const products = useMemo(() => productsInCategory(category), [category]);

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[560px] overflow-hidden bg-[#0a0708] pb-24 text-bone">
      <LiquidBackdrop intensity="soft" className="fixed inset-0 opacity-90" />

      <div className="relative z-10">
        <header className="px-5 pb-6 pt-6">
          <Link
            to="/team"
            className="place-line transition-colors hover:text-bone"
          >
            ← No Parade F.C.
          </Link>

          <div className="mt-5 flex items-center gap-3">
            <img
              src={logo}
              alt=""
              className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_2px_14px_rgba(90,22,38,0.45)] sm:h-[4.5rem] sm:w-[4.5rem]"
            />
            <div className="min-w-0">
              <h1 className="font-kit text-[clamp(2.1rem,9vw,3rem)] leading-none tracking-[0.04em]">
                BAYONNE BEES
              </h1>
              <p className="place-line mt-2">
                Team Customs · {kit.colorway.name} · Avenue A
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-sm text-base leading-snug text-bone/70">
            Bayonne’s actual garnet — not maroon, not burgundy, not cardinal. Printed when you
            order. Built for Bee Country.
          </p>

          <div className="mt-5 flex items-baseline gap-2 border-t border-bone/15 pt-4">
            {!storeLive ? (
              <span className="label-caps text-destructive">Program paused</span>
            ) : matchWindowOpen && countdown ? (
              <>
                <span className="place-line">Match roster window</span>
                <span className="font-kit text-2xl leading-none text-bone">
                  {countdown.days}d {countdown.hours}h {countdown.minutes}m
                </span>
              </>
            ) : (
              <span className="place-line">Program store open · Faithful year-round</span>
            )}
          </div>
        </header>

        {!catalogReady && (
          <div className="border-y border-bone/10 bg-black/40 px-5 py-3 text-sm leading-snug text-bone/65">
            Design every piece now. Secure checkout opens when listings finish syncing to{" "}
            <span className="text-bone">noparade-store.com</span>.
          </div>
        )}

        {/* Featured Match Jersey — lookbook plate */}
        {featuredJersey && storeLive && (
          <section className="border-b border-bone/10">
            <Link
              to="/team/$slug/$product"
              params={{ slug: kit.slug, product: featuredJersey.id }}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={featuredJersey.thumb}
                  alt=""
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
                  <p className="label-caps text-bone/55">Most ordered · Match</p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <h2 className="font-kit text-3xl tracking-wide">{featuredJersey.name}</h2>
                    <span className="font-sans text-2xl tabular-nums text-bone">
                      ${featuredJersey.price}
                    </span>
                  </div>
                  <p className="mt-2 max-w-sm text-sm leading-snug text-bone/70">
                    Name + number on the back. Live preview. Same garnet as Friday night under
                    the lights.
                  </p>
                  <p className="label-caps mt-4 inline-flex bg-garnet px-4 py-3 text-bone">
                    Personalize Match jersey · ${featuredJersey.price}
                  </p>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Category rail — interactive, not decorative cards */}
        <section className="px-5 pt-8">
          <p className="place-line">Shop by moment</p>
          <div
            className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Store categories"
          >
            {CATEGORIES.map((c) => {
              const on = c.id === category;
              return (
                <button
                  key={c.id}
                  type="button"
                  id={c.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setCategory(c.id);
                    window.history.replaceState(null, "", `#${c.id}`);
                  }}
                  className={`shrink-0 border px-4 py-2.5 text-left transition-colors ${
                    on
                      ? "border-bone bg-bone text-black"
                      : "border-bone/25 bg-transparent text-bone/80 hover:border-bone/55"
                  }`}
                >
                  <span className="label-caps block">{c.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Category atmosphere — full bleed */}
        <section className="mt-6">
          <div className="relative aspect-[16/10] overflow-hidden bg-black">
            <img
              src={active.hero}
              alt=""
              className="h-full w-full object-cover opacity-90 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
              <p className="place-line">Now showing</p>
              <h2 className="mt-1 font-kit text-4xl tracking-wide text-bone">{active.label}</h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-bone/75">
                {CATEGORY_LINE[category]}
              </p>
            </div>
          </div>
        </section>

        {/* Lookbook product list — large plates, not thumbnail cards */}
        <section className="mt-2">
          <div className="flex items-baseline justify-between px-5 py-4">
            <p className="place-line">Available now</p>
            <p className="place-line">{products.length} pieces</p>
          </div>

          <ul className="divide-y divide-bone/10 border-y border-bone/10">
            {products.map((p, i) => (
              <li key={p.id}>
                <Link
                  to="/team/$slug/$product"
                  params={{ slug: kit.slug, product: p.id }}
                  className="group block"
                >
                  <div
                    className={`relative overflow-hidden bg-black ${
                      i === 0 ? "aspect-[4/5]" : "aspect-[5/4]"
                    }`}
                  >
                    <img
                      src={p.thumb}
                      alt=""
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                  </div>
                  <div className="px-5 py-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-kit text-[1.75rem] tracking-wide text-bone">
                        {p.name}
                      </h3>
                      <span className="shrink-0 font-sans text-xl tabular-nums text-bone">
                        ${p.price}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-bone/65">{p.blurb}</p>
                    <p className="label-caps mt-3 text-[color:var(--garnet)]">
                      {productAction(p)} · ${p.price} →
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <aside className="mx-5 mt-12 border-t border-bone/15 pt-8">
          <p className="place-line">Queen Bees · 2024 Hudson County</p>
          <p className="mt-3 text-base leading-relaxed text-bone/70">
            The girls soccer program that won the county has gone by Queen Bees for years. The
            crest was drawn by hand in Bayonne and had never existed as a mark before.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-bone/45">
            669 Avenue A · Bayonne High School · Garnet & white since 1936. Size charts in
            inches. Nothing prints until you order.
          </p>
        </aside>
      </div>
    </main>
  );
}
