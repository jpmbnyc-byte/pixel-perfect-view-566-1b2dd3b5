import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ComingSoonMedia } from "@/components/ComingSoonMedia";
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
import { DEPARTMENT_COPY } from "@/copy/collection";
import { countdownParts, type KitConfig } from "@/lib/kit";
import { shopifySynced, type ShopifySyncStatus } from "@/lib/shopify";

export const CATEGORY_IDS: CategoryId[] = ["match", "performance", "travel", "harbor", "club"];

export const DEPARTMENT_TO: Record<
  CategoryId,
  | "/team/$slug/match"
  | "/team/$slug/performance"
  | "/team/$slug/travel"
  | "/team/$slug/harbor"
  | "/team/$slug/club"
> = {
  match: "/team/$slug/match",
  performance: "/team/$slug/performance",
  travel: "/team/$slug/travel",
  harbor: "/team/$slug/harbor",
  club: "/team/$slug/club",
};

const FEATURED_BY_CATEGORY: Record<CategoryId, string> = {
  match: "heritage-jersey",
  performance: "performance-ls",
  travel: "travel-set",
  harbor: "harbor-coach",
  club: "two-tone-cap",
};

function productAction(p: CatalogProduct) {
  if (p.nameNumber) return "Customize jersey";
  if (p.sizeChart === "shoe") return "Choose your pair";
  if (p.sizeChart === "hat") return "View club good";
  if (p.sizeChart === "sock") return "View club sock";
  return "View product";
}

type Props = {
  category: CategoryId;
  kit: KitConfig;
  sync: ShopifySyncStatus;
};

export function TeamStorePage({ category, kit, sync }: Props) {
  const [nameableOnly, setNameableOnly] = useState(false);
  const countdown = countdownParts(kit.closesAt, Date.now());
  const closed = kit.status !== "live" || countdown === null;
  const catalogReady = shopifySynced(sync);

  const active = useMemo(() => CATEGORIES.find((c) => c.id === category)!, [category]);
  const copy = DEPARTMENT_COPY[category];
  const products = useMemo(() => {
    const list = productsInCategory(category);
    return nameableOnly ? list.filter((p) => p.nameNumber) : list;
  }, [category, nameableOnly]);

  const featured = productById(FEATURED_BY_CATEGORY[category]);
  const heroObjectClass = active.heroFit === "cover" ? "object-cover" : "object-contain";

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
            <p className="place-line mt-3">Athletics · Fall 001 · 07002</p>
          </div>
        </div>

        <div className="tip-asymmetric mt-7">
          <span className="tip-asymmetric-a" />
          <span className="tip-asymmetric-b" />
        </div>

        <p className="type-editorial mt-8 max-w-md text-lg text-ink/75">{copy.title}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">{copy.body}</p>
      </header>

      {!catalogReady && (
        <div
          className="border-y border-ink/10 px-6 py-3 text-sm leading-snug text-ink/60 sm:px-10"
          role="status"
        >
          Product design and sizing are live. Checkout activates as synced listings become available.
        </div>
      )}

      {featured && !closed && (
        <section className="px-6 sm:px-10">
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: featured.id }}
            className="group block focus-ring"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-ink sm:aspect-[5/4]">
              {featured.nameNumber && <NameableFlag />}
              {featured.imageryPending ? (
                <ComingSoonMedia name={featured.name} className="aspect-auto h-full" />
              ) : (
                <img
                  src={featured.thumb}
                  alt={`${featured.name}, featured view`}
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover object-center motion-safe:transition-transform motion-safe:duration-transition motion-safe:ease-standard motion-safe:group-hover:scale-[1.02]"
                />
              )}
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-6">
              <div>
                <p className="place-line">Featured · {active.label}</p>
                <h2 className="type-campaign mt-2 text-2xl text-ink">{featured.name}</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">{featured.blurb}</p>
              </div>
              <span className="font-sans text-xl tabular-nums text-ink">
                {featured.personalizedPrice
                  ? `$${featured.price} / $${featured.personalizedPrice}`
                  : `$${featured.price}`}
              </span>
            </div>
            <p className="place-line mt-4 pb-2 text-garnet">{productAction(featured)} →</p>
          </Link>
        </section>
      )}

      <section className="px-6 pt-12 sm:px-10">
        <p className="place-line">Shop</p>
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

        <p className="type-editorial mt-6 max-w-md text-base text-ink/65">{active.description}</p>

        {category === "match" && (
          <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 place-line text-ink/55">
            <input
              type="checkbox"
              checked={nameableOnly}
              onChange={(e) => setNameableOnly(e.target.checked)}
              className="size-5 accent-[var(--garnet)] focus-ring"
            />
            Customizable jersey only
          </label>
        )}
      </section>

      <section className="mt-10">
        <div className="relative aspect-[16/9] overflow-hidden bg-ink">
          <img
            src={active.hero}
            alt={`${active.label} campaign`}
            width={1280}
            height={720}
            className={`h-full w-full ${heroObjectClass} opacity-95`}
            style={{ objectPosition: active.heroPosition }}
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
            <p className="type-editorial text-lg text-ink/70">The Heritage Jersey lives in 1936 Match.</p>
            <button
              type="button"
              className="place-line tap-44 mt-6 inline-flex items-center text-garnet focus-ring"
              onClick={() => setNameableOnly(false)}
            >
              Show all {active.label}
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
                    {p.nameNumber && <NameableFlag />}
                    <ProductCardMedia product={p} />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="type-campaign text-xl text-ink">{p.name}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/55">{p.blurb}</p>
                      {p.sizeChart === "apparel" && (
                        <p className="place-line mt-3 text-ink/40">S · M · L · XL · 2XL</p>
                      )}
                      {p.imageryPending && (
                        <p className="place-line mt-3 text-ink/40">Photography in production</p>
                      )}
                    </div>
                    <span className="shrink-0 font-sans text-lg tabular-nums text-ink">
                      {p.personalizedPrice ? `$${p.price} / $${p.personalizedPrice}` : `$${p.price}`}
                    </span>
                  </div>
                  <p className="place-line mt-5 text-garnet">{productAction(p)} →</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
