import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { NameableFlag } from "@/components/NameableFlag";
import { ProductCardMedia } from "@/components/ProductCardMedia";
import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import { CRESTS } from "@/lib/brandAssets";
import {
  CATEGORIES,
  productById,
  productsInCategory,
  type CatalogProduct,
  type CategoryId,
} from "@/lib/catalog";
import { countdownParts, type KitConfig } from "@/lib/kit";
import { isNameable } from "@/media/campaignAssets";
import { shopifySynced, type ShopifySyncStatus } from "@/lib/shopify";
import {
  MATCH_DEPARTMENT_COPY,
  STORE_INTRO_COPY,
  departmentLine,
  matchCopyFor,
} from "@/copy/match";

export const CATEGORY_IDS: CategoryId[] = ["match", "sideline", "warmups", "alumni"];

/** Typed paths for department routes (Tier 2). */
export const DEPARTMENT_TO: Record<
  CategoryId,
  "/team/$slug/match" | "/team/$slug/sideline" | "/team/$slug/warmups" | "/team/$slug/alumni"
> = {
  match: "/team/$slug/match",
  sideline: "/team/$slug/sideline",
  warmups: "/team/$slug/warmups",
  alumni: "/team/$slug/alumni",
};

function productAction(p: CatalogProduct) {
  const match = matchCopyFor(p.id);
  if (match) return match.cta.replace(/\s*→\s*$/, "");
  if (p.typography && p.nameNumber) return "Make it yours";
  if (p.sizeChart === "hat") return "Choose size";
  if (p.previewPair === "front-side") return "See front + side";
  return "View";
}

type Props = {
  category: CategoryId;
  kit: KitConfig;
  sync: ShopifySyncStatus;
};

/**
 * Luxury editorial store — high-key studio plates, hairline chrome,
 * quiet category rail. Departments are real routes (see DEPARTMENT_TO).
 */
export function TeamStorePage({ category, kit, sync }: Props) {
  const [nameableOnly, setNameableOnly] = useState(false);
  const countdown = countdownParts(kit.closesAt, Date.now());
  const closed = kit.status !== "live" || countdown === null;
  const catalogReady = shopifySynced(sync);
  const featuredJersey = productById("jersey");

  const active = useMemo(() => CATEGORIES.find((c) => c.id === category)!, [category]);
  const products = useMemo(() => {
    const list = productsInCategory(category);
    return nameableOnly ? list.filter(isNameable) : list;
  }, [category, nameableOnly]);

  return (
    <main className="studio-field mx-auto min-h-screen w-full max-w-[720px] pb-24 text-ink">
      <header className="px-6 pb-8 pt-8 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/team"
            className="place-line tap-44 inline-flex items-center focus-ring transition-opacity duration-micro ease-standard hover:opacity-55"
          >
            ← Back
          </Link>
          {closed ? (
            <p className="place-line text-destructive">Closed</p>
          ) : (
            <StoreCloseCountdown closesAt={kit.closesAt} />
          )}
        </div>

        <div className="mt-10 flex items-end gap-4">
          <img
            src={CRESTS.primary}
            alt=""
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
          />
          <div className="min-w-0">
            <h1 className="type-campaign-tight text-[clamp(2rem,9vw,3.2rem)] text-ink">BAYONNE</h1>
            <p className="place-line mt-3">Team Customs · {kit.colorway.name}</p>
          </div>
        </div>

        <div className="tip-asymmetric mt-7">
          <span className="tip-asymmetric-a" />
          <span className="tip-asymmetric-b" />
        </div>

        <p className="type-editorial mt-8 max-w-md text-lg text-ink/75">{STORE_INTRO_COPY.title}</p>
        <p className="mt-4 max-w-md whitespace-pre-line text-sm leading-relaxed text-ink/60">
          {STORE_INTRO_COPY.body}
        </p>
        <p className="place-line mt-5 text-ink/45">{STORE_INTRO_COPY.lockup}</p>
      </header>

      {!catalogReady && (
        <div
          className="border-y border-ink/10 px-6 py-3 text-sm leading-snug text-ink/60 sm:px-10"
          role="status"
        >
          Design every piece now. Checkout unlocks when listings are ready. Refresh this page when
          you’re set to order.
        </div>
      )}

      {featuredJersey && !closed && category === "match" && (
        <section className="px-6 sm:px-10">
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: featuredJersey.id }}
            className="group block focus-ring"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[color-mix(in_oklab,var(--paper)_85%,white)]">
              <NameableFlag />
              <img
                src={featuredJersey.thumb}
                alt={`${featuredJersey.name}, front view`}
                width={800}
                height={1000}
                className="h-full w-full object-contain motion-safe:transition-transform motion-safe:duration-transition motion-safe:ease-standard motion-safe:group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-6">
              <div>
                <p className="place-line">Featured · Match</p>
                <h2 className="type-campaign mt-2 text-2xl text-ink">{featuredJersey.name}</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">
                  {matchCopyFor(featuredJersey.id)?.card ?? featuredJersey.blurb}
                </p>
              </div>
              <span className="font-sans text-xl tabular-nums text-ink">${featuredJersey.price}</span>
            </div>
            <p className="place-line mt-4 pb-2 text-garnet">
              Make it yours · ${featuredJersey.price} →
            </p>
          </Link>
        </section>
      )}

      <section className="px-6 pt-12 sm:px-10">
        <p className="place-line">Departments</p>
        <div
          className="mt-5 flex gap-2 overflow-x-auto border-b border-ink/10 pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Store categories"
        >
          {CATEGORIES.map((c) => {
            const on = c.id === category;
            return (
              <Link
                key={c.id}
                id={c.id}
                role="tab"
                aria-selected={on}
                to={DEPARTMENT_TO[c.id]}
                params={{ slug: kit.slug }}
                className={`place-line tap-44 shrink-0 border-b-2 px-2 transition-colors duration-micro ease-standard focus-ring ${
                  on ? "border-garnet text-ink" : "border-transparent text-ink/40 hover:text-ink/70"
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
        {category === "match" ? (
          <>
            <p className="place-line mt-6 text-garnet">{MATCH_DEPARTMENT_COPY.line}</p>
            <p className="type-editorial mt-3 max-w-md text-base text-ink/65">
              {MATCH_DEPARTMENT_COPY.title}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/55">
              {MATCH_DEPARTMENT_COPY.body}
            </p>
          </>
        ) : (
          <p className="type-editorial mt-6 max-w-md text-base text-ink/65">
            {departmentLine(category)}
          </p>
        )}
        <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 place-line text-ink/55">
          <input
            type="checkbox"
            checked={nameableOnly}
            onChange={(e) => setNameableOnly(e.target.checked)}
            className="size-5 accent-[var(--garnet)] focus-ring"
          />
          Can be personalized
        </label>
      </section>

      <section className="mt-10">
        <div className="relative aspect-[16/9] overflow-hidden bg-ink">
          <img
            src={active.hero}
            alt={`${active.label} campaign`}
            width={1280}
            height={720}
            className="h-full w-full object-contain object-center opacity-95"
          />
        </div>
        <div className="flex items-baseline justify-between px-6 py-5 sm:px-10">
          <h2 className="type-campaign text-3xl text-ink">{active.label}</h2>
          <p className="place-line">{products.length} pieces</p>
        </div>
      </section>

      <section>
        {products.length === 0 ? (
          <div className="border-y border-ink/10 px-6 py-16 text-center sm:px-10" role="status">
            <p className="type-editorial text-lg text-ink/70">No pieces in this filter.</p>
            <p className="mt-3 text-sm text-ink/50">
              Clear “Can be personalized,” or switch department.
            </p>
            <button
              type="button"
              className="place-line tap-44 mt-6 inline-flex items-center text-garnet focus-ring"
              onClick={() => setNameableOnly(false)}
            >
              Clear filter
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {products.map((p) => (
              <li key={p.id}>
                <Link
                  to="/team/$slug/$product"
                  params={{ slug: kit.slug, product: p.id }}
                  className="group block px-6 py-8 focus-ring sm:px-10"
                >
                  <div className="relative">
                    {isNameable(p) && <NameableFlag />}
                    <ProductCardMedia product={p} />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <h3 className="type-campaign text-xl text-ink">{p.name}</h3>
                    <span className="shrink-0 font-sans text-lg tabular-nums text-ink">${p.price}</span>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">
                    {matchCopyFor(p.id)?.card ?? p.blurb}
                  </p>
                  <p className="place-line mt-4 text-garnet">
                    {productAction(p)} · ${p.price} →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside className="px-6 pt-14 sm:px-10">
        <p className="place-line">A note · Hudson County</p>
        <p className="type-editorial mt-4 max-w-md text-lg text-ink/70">
          Some stories stay off the hangers. The crest we drew for the girls is one of them.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-ink/45">
          Avenue A · Bayonne · Garnet since 1936.
        </p>
      </aside>
    </main>
  );
}
