import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { MotionMark } from "@/components/brand/BrandMarks";
import { StoreFooter } from "@/components/brand/StoreFooter";
import { StoreNav } from "@/components/brand/StoreNav";
import { NameableFlag } from "@/components/NameableFlag";
import { ProductCardMedia } from "@/components/ProductCardMedia";
import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import {
  CATEGORIES,
  productsInCategory,
  type CatalogProduct,
  type CategoryId,
} from "@/lib/catalog";
import { DEPARTMENT_TO } from "@/lib/departments";
import { countdownParts, type KitConfig } from "@/lib/kit";
import { shopifySynced, type ShopifySyncStatus } from "@/lib/shopify";

export const CATEGORY_IDS: CategoryId[] = ["match", "sideline", "warmups", "alumni"];

export { DEPARTMENT_TO };

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
  const products = useMemo(() => {
    const list = productsInCategory(category);
    return nameableOnly ? list.filter((p) => p.nameNumber) : list;
  }, [category, nameableOnly]);

  return (
    <div className="studio-field min-h-screen text-ink">
      <StoreNav />
      <main>
        <section className="relative isolate min-h-[52dvh] overflow-hidden bg-black sm:min-h-[62dvh]">
          <img
            src={active.hero}
            alt=""
            width={1600}
            height={900}
            className="absolute inset-0 h-full w-full object-contain object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
          <div className="relative z-10 mx-auto flex min-h-[52dvh] w-full max-w-[1280px] flex-col justify-end px-6 py-12 sm:min-h-[62dvh] sm:px-10">
            <p className="place-line text-bone">{active.label}</p>
            <h1 className="type-editorial mt-4 max-w-xl text-[clamp(2rem,5vw,3.4rem)] text-bone">
              Performance apparel, club goods and one jersey made personal.
            </h1>
            <MotionMark className="mt-6 text-bone" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/75">
              {active.description}
            </p>
            <div className="mt-8">
              {closed ? (
                <p className="place-line text-bone/50">Closed</p>
              ) : (
                <StoreCloseCountdown closesAt={kit.closesAt} className="text-bone/55" />
              )}
            </div>
          </div>
        </section>

        {!catalogReady && (
          <div
            className="mx-auto w-full max-w-[1280px] border-y border-ink/10 px-6 py-3 text-sm leading-snug text-ink/60 sm:px-10"
            role="status"
          >
            Product design and sizing are live. Checkout activates as synced listings become available.
          </div>
        )}

        <section className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-10">
          <div
            className="flex gap-1 overflow-x-auto border-b border-ink/10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  className={`place-line tap-44 shrink-0 border-b px-3 transition-colors duration-micro ease-standard focus-ring ${
                    on ? "border-ink text-ink" : "border-transparent text-ink/35 hover:text-ink/70"
                  }`}
                >
                  {c.label}
                </Link>
              );
            })}
          </div>

          <label className="mt-6 flex min-h-11 cursor-pointer items-center gap-3 place-line text-ink/55">
            <input
              type="checkbox"
              checked={nameableOnly}
              onChange={(e) => setNameableOnly(e.target.checked)}
              className="size-4 accent-[var(--garnet)] focus-ring"
            />
            Customizable jersey only
          </label>
          <p className="place-line mt-6">{products.length} pieces</p>
        </section>

        <section className="mx-auto w-full max-w-[1280px] px-4 pb-20 sm:px-10">
          {products.length === 0 ? (
            <div className="border-y border-ink/10 px-6 py-16 text-center" role="status">
              <p className="type-editorial text-2xl text-ink/70">The Heritage Jersey lives in 1936 Match.</p>
              <button
                type="button"
                className="place-line tap-44 mt-6 inline-flex items-center text-garnet focus-ring"
                onClick={() => setNameableOnly(false)}
              >
                Show all {active.label}
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/team/$slug/$product"
                    params={{ slug: kit.slug, product: p.id }}
                    className="group block focus-ring"
                  >
                    <div className="relative">
                      {p.nameNumber && <NameableFlag />}
                      <ProductCardMedia product={p} />
                    </div>
                    <div className="mt-4 space-y-1">
                      <h3 className="font-display text-[1.05rem] font-medium tracking-[0.04em] text-ink">
                        {p.name}
                      </h3>
                      <p className="font-sans text-sm tabular-nums">${p.personalizedPrice ? `${p.price}+` : p.price}</p>
                    </div>
                    <p className="place-line mt-3">{productAction(p)} →</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <StoreFooter />
    </div>
  );
}
