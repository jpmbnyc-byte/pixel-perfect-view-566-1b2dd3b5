import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { MotionMark } from "@/components/brand/BrandMarks";
import { StoreFooter } from "@/components/brand/StoreFooter";
import { StoreNav } from "@/components/brand/StoreNav";
import { ProductLookbookGrid } from "@/components/ProductLookbookCard";
import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import {
  CATEGORIES,
  productById,
  productsInCategory,
  type CategoryId,
} from "@/lib/catalog";
import { DEPARTMENT_TO } from "@/lib/departments";
import { DEPARTMENT_COPY } from "@/copy/collection";
import { countdownParts, type KitConfig } from "@/lib/kit";
import type { ShopifySyncStatus } from "@/lib/shopify";

export const CATEGORY_IDS: CategoryId[] = ["match", "performance", "travel", "harbor", "club"];

export { DEPARTMENT_TO };

const FEATURED_BY_CATEGORY: Record<CategoryId, string> = {
  match: "heritage-jersey",
  performance: "performance-set",
  travel: "travel-set",
  harbor: "harbor-coach",
  club: "two-tone-cap",
};

type Props = {
  category: CategoryId;
  kit: KitConfig;
  sync: ShopifySyncStatus;
};

export function TeamStorePage({ category, kit }: Props) {
  const [nameableOnly, setNameableOnly] = useState(false);
  const countdown = countdownParts(kit.closesAt, Date.now());
  const closed = kit.status !== "live" || countdown === null;

  const active = useMemo(() => CATEGORIES.find((c) => c.id === category)!, [category]);
  const copy = DEPARTMENT_COPY[category];
  const featuredId = FEATURED_BY_CATEGORY[category];
  const products = useMemo(() => {
    const list = productsInCategory(category);
    const filtered = nameableOnly ? list.filter((p) => p.nameNumber) : list;
    return [...filtered].sort((a, b) => {
      if (a.id === featuredId) return -1;
      if (b.id === featuredId) return 1;
      return 0;
    });
  }, [category, nameableOnly, featuredId]);

  const featured = productById(featuredId);
  const heroObjectClass = active.heroFit === "cover" ? "object-cover" : "object-contain";

  return (
    <div className="studio-field min-h-screen text-ink">
      <StoreNav />
      <main>
        <section className="relative isolate min-h-[58dvh] overflow-hidden bg-black sm:min-h-[70dvh]">
          <img
            src={active.hero}
            alt=""
            width={1600}
            height={900}
            className={`absolute inset-0 h-full w-full ${heroObjectClass}`}
            style={{ objectPosition: active.heroPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
          <div className="relative z-10 mx-auto flex min-h-[58dvh] w-full max-w-[1280px] flex-col justify-end px-6 py-12 sm:min-h-[70dvh] sm:px-10 sm:py-16">
            <p className="place-line text-bone">{copy.line}</p>
            <h1 className="type-editorial mt-4 max-w-xl text-[clamp(2.2rem,6vw,4rem)] text-bone">
              {copy.title}
            </h1>
            <MotionMark className="mt-6 text-bone" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/75">{copy.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {featured ? (
                <Link
                  to="/team/$slug/$product"
                  params={{ slug: kit.slug, product: featured.id }}
                  className="place-line text-bone/70 transition-opacity hover:opacity-100"
                >
                  {featured.name} · ${featured.price}
                </Link>
              ) : null}
              {closed ? (
                <p className="place-line text-bone/50">Closed</p>
              ) : (
                <StoreCloseCountdown closesAt={kit.closesAt} className="text-bone/55" />
              )}
            </div>
          </div>
        </section>

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

          {category === "match" && (
            <label className="mt-6 flex min-h-11 cursor-pointer items-center gap-3 place-line text-ink/55">
              <input
                type="checkbox"
                checked={nameableOnly}
                onChange={(e) => setNameableOnly(e.target.checked)}
                className="size-4 accent-[var(--garnet)] focus-ring"
              />
              Customizable jersey only
            </label>
          )}

          <div className="mt-8 flex items-baseline justify-between gap-4">
            <h2 className="sr-only">{active.label}</h2>
            <p className="place-line">{products.length} pieces</p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1280px] px-4 pb-20 sm:px-10">
          {products.length === 0 ? (
            <div className="border-y border-ink/10 px-6 py-16 text-center" role="status">
              <p className="type-editorial text-2xl text-ink/70">The Match Jersey lives in 1936 Match.</p>
              <button
                type="button"
                className="place-line tap-44 mt-6 inline-flex items-center text-garnet focus-ring"
                onClick={() => setNameableOnly(false)}
              >
                Show all {active.label}
              </button>
            </div>
          ) : (
            <ProductLookbookGrid products={products} slug={kit.slug} />
          )}
        </section>
      </main>
      <StoreFooter />
    </div>
  );
}
