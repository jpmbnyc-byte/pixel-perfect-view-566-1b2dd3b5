import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { NameableFlag } from "@/components/NameableFlag";
import { CRESTS } from "@/lib/brandAssets";
import {
  CATEGORIES,
  productById,
  productsInCategory,
  type CatalogProduct,
  type CategoryId,
} from "@/lib/catalog";
import { countdownParts } from "@/lib/kit";
import { isNameable } from "@/media/campaignAssets";
import { shopifySynced } from "@/lib/shopify";
import { Route as TeamSlugRoute } from "./team.$slug";

const CATEGORY_IDS: CategoryId[] = ["match", "sideline", "warmups", "alumni"];

const CATEGORY_LINE: Record<CategoryId, string> = {
  match: "What they wear when the whistle blows.",
  sideline: "November bleachers. Same garnet as the Match kit.",
  warmups: "Before kickoff — crew, long sleeve, quarter-zip, sweats.",
  alumni: "1936 on the collar. Off the field, still Bee Country.",
};

export const Route = createFileRoute("/team/$slug/")({
  component: TeamStorePage,
});

function productAction(p: CatalogProduct) {
  if (p.typography && p.nameNumber) return "Put your name on it";
  if (p.sizeChart === "hat") return "Choose size";
  if (p.previewPair === "front-side") return "See front + side";
  return "View";
}

/**
 * Luxury editorial store — high-key studio plates, hairline chrome,
 * quiet category rail. No liquid backdrop.
 */
function TeamStorePage() {
  const { kit, sync } = TeamSlugRoute.useLoaderData();
  const [category, setCategory] = useState<CategoryId>("match");
  const [nameableOnly, setNameableOnly] = useState(false);
  const countdown = countdownParts(kit.closesAt, Date.now());
  const closed = kit.status !== "live" || countdown === null;
  const catalogReady = shopifySynced(sync);
  const featuredJersey = productById("jersey");

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (CATEGORY_IDS.includes(raw as CategoryId)) {
      setCategory(raw as CategoryId);
    }
  }, []);

  const active = useMemo(() => CATEGORIES.find((c) => c.id === category)!, [category]);
  const products = useMemo(() => {
    const list = productsInCategory(category);
    return nameableOnly ? list.filter(isNameable) : list;
  }, [category, nameableOnly]);

  return (
    <main className="studio-field mx-auto min-h-screen w-full max-w-[720px] pb-24 text-ink">
      <header className="px-6 pb-8 pt-8 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link to="/team" className="place-line transition-opacity hover:opacity-55">
            ← House
          </Link>
          <p className="place-line">
            {closed ? (
              <span className="text-destructive">Closed</span>
            ) : (
              <>
                Drop 02 closes in {countdown.days} day{countdown.days === 1 ? "" : "s"}
              </>
            )}
          </p>
        </div>

        <div className="mt-10 flex items-end gap-4">
          <img
            src={CRESTS.primary}
            alt=""
            className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
          />
          <div className="min-w-0">
            <h1 className="type-campaign-tight text-[clamp(2rem,9vw,3.2rem)] text-ink">
              BAYONNE
              <br />
              BEES
            </h1>
            <p className="place-line mt-3">Team Customs · {kit.colorway.name}</p>
          </div>
        </div>

        <div className="tip-asymmetric mt-7">
          <span className="tip-asymmetric-a" />
          <span className="tip-asymmetric-b" />
        </div>

        <p className="type-editorial mt-8 max-w-md text-lg text-ink/75">
          Bayonne’s actual garnet — not maroon, not burgundy, not cardinal.
        </p>
      </header>

      {!catalogReady && (
        <div className="border-y border-ink/10 px-6 py-3 text-sm leading-snug text-ink/60 sm:px-10">
          Design every piece now. Secure checkout opens when listings finish syncing to{" "}
          <span className="text-ink">noparade-store.com</span>.
        </div>
      )}

      {featuredJersey && !closed && (
        <section className="px-6 sm:px-10">
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: featuredJersey.id }}
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[color-mix(in_oklab,var(--paper)_85%,white)]">
              <NameableFlag />
              <img
                src={featuredJersey.thumb}
                alt={`${featuredJersey.name}, front view`}
                className="h-full w-full object-contain transition-transform duration-[1.1s] ease-out motion-safe:group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-6">
              <div>
                <p className="place-line">Featured · Match</p>
                <h2 className="type-campaign mt-2 text-2xl text-ink">{featuredJersey.name}</h2>
              </div>
              <span className="font-sans text-xl tabular-nums text-ink">
                ${featuredJersey.price}
              </span>
            </div>
            <p className="place-line mt-4 pb-2 text-garnet">
              Put your name on it · ${featuredJersey.price} →
            </p>
          </Link>
        </section>
      )}

      <section className="px-6 pt-12 sm:px-10">
        <p className="place-line">Departments</p>
        <div
          className="mt-5 flex gap-6 overflow-x-auto border-b border-ink/10 pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                className={`place-line shrink-0 border-b-2 pb-3 transition-colors ${
                  on ? "border-garnet text-ink" : "border-transparent text-ink/40 hover:text-ink/70"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <p className="type-editorial mt-6 max-w-md text-base text-ink/65">
          {CATEGORY_LINE[category]}
        </p>
        <label className="mt-5 flex cursor-pointer items-center gap-2 place-line text-ink/55">
          <input
            type="checkbox"
            checked={nameableOnly}
            onChange={(e) => setNameableOnly(e.target.checked)}
            className="size-3.5 accent-[var(--garnet)]"
          />
          Can be personalized
        </label>
      </section>

      <section className="mt-10">
        <div className="relative aspect-[16/9] overflow-hidden bg-ink">
          <img
            src={active.hero}
            alt={`${active.label} campaign`}
            className="h-full w-full object-contain object-center opacity-95"
          />
        </div>
        <div className="flex items-baseline justify-between px-6 py-5 sm:px-10">
          <h2 className="type-campaign text-3xl text-ink">{active.label}</h2>
          <p className="place-line">{products.length} pieces</p>
        </div>
      </section>

      <section>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                to="/team/$slug/$product"
                params={{ slug: kit.slug, product: p.id }}
                className="group block px-6 py-8 sm:px-10"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-[color-mix(in_oklab,var(--paper)_85%,white)]">
                  {isNameable(p) && <NameableFlag />}
                  <img
                    src={p.thumb}
                    alt={`${p.name}, front view`}
                    className="h-full w-full object-contain transition-transform duration-[1.1s] ease-out motion-safe:group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <h3 className="type-campaign text-xl text-ink">{p.name}</h3>
                  <span className="shrink-0 font-sans text-lg tabular-nums text-ink">
                    ${p.price}
                  </span>
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">{p.blurb}</p>
                <p className="place-line mt-4 text-garnet">
                  {productAction(p)} · ${p.price} →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <aside className="px-6 pt-14 sm:px-10">
        <p className="place-line">Queen Bees · 2024 Hudson County</p>
        <p className="type-editorial mt-4 max-w-md text-lg text-ink/70">
          The crest was drawn by hand in Bayonne and had never existed as a mark before.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-ink/45">
          669 Avenue A · Bayonne High School · Garnet & white since 1936.
        </p>
      </aside>
    </main>
  );
}
