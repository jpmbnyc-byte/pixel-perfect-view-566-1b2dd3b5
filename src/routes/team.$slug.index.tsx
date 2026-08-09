import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import logo from "@/assets/bayonne/spirit/boxing-bee.png";
import { CATEGORIES, productById, productsInCategory, type CategoryId } from "@/lib/catalog";
import { countdownParts } from "@/lib/kit";
import { shopifySynced } from "@/lib/shopify";
import { Route as TeamSlugRoute } from "./team.$slug";

const CATEGORY_IDS: CategoryId[] = ["match", "sideline", "warmups", "alumni"];

export const Route = createFileRoute("/team/$slug/")({
  component: TeamStorePage,
});

function TeamStorePage() {
  const { kit, sync } = TeamSlugRoute.useLoaderData();
  const [category, setCategory] = useState<CategoryId>("match");
  const countdown = countdownParts(kit.closesAt, Date.now());
  const closed = kit.status !== "live" || countdown === null;
  const catalogReady = shopifySynced(sync);
  const featuredJersey = productById("jersey");

  // Deep-link: /team/bayonne-bees#sideline
  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (CATEGORY_IDS.includes(raw as CategoryId)) {
      setCategory(raw as CategoryId);
    }
  }, []);

  const active = useMemo(() => CATEGORIES.find((c) => c.id === category)!, [category]);
  const products = useMemo(() => productsInCategory(category), [category]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[560px] bg-background pb-20">
      <header className="border-b border-border px-5 pb-5 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              to="/team"
              className="label-caps text-muted-foreground transition-colors hover:text-foreground"
            >
              ← No Parade F.C.
            </Link>
            <h1 className="mt-2 text-4xl leading-none tracking-tight">Bayonne store</h1>
            <p className="label-caps mt-1 text-muted-foreground">{kit.colorway.name}</p>
            <p className="mt-2 max-w-sm text-base leading-snug text-muted-foreground">
              Bayonne’s actual garnet — not maroon, not burgundy, not cardinal. Printed when
              you order.
            </p>
          </div>
          <img src={logo} alt="" className="mt-1 h-14 w-14 shrink-0 object-contain" />
        </div>

        <div className="mt-4 flex items-baseline gap-2 border-t border-border pt-4">
          {closed ? (
            <span className="label-caps text-destructive">Store closed</span>
          ) : (
            <>
              <span className="label-caps text-muted-foreground">Store closes in</span>
              <span className="font-kit text-2xl leading-none text-garnet">
                {countdown.days}d {countdown.hours}h {countdown.minutes}m
              </span>
            </>
          )}
        </div>
      </header>

      {!catalogReady && (
        <div className="border-b border-border bg-secondary/60 px-5 py-3 text-sm leading-snug text-muted-foreground">
          You can design every piece now. Secure checkout opens when listings finish syncing
          to <span className="text-foreground">noparade-store.com</span>.
        </div>
      )}

      {/* Conversion path: skip category browse → jersey PDP */}
      {featuredJersey && !closed && (
        <section className="border-b border-border bg-card px-5 py-5">
          <p className="label-caps text-muted-foreground">Most ordered</p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-kit text-2xl tracking-wide">{featuredJersey.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Name + number on the back · Live preview · ${featuredJersey.price}
              </p>
            </div>
          </div>
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: featuredJersey.id }}
            className="label-caps mt-4 inline-flex w-full items-center justify-center bg-primary py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Personalize Match jersey · ${featuredJersey.price}
          </Link>
        </section>
      )}

      <section className="px-5 pt-6">
        <p className="label-caps text-muted-foreground">Categories</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {CATEGORIES.map((c) => {
            const on = c.id === category;
            return (
              <button
                key={c.id}
                type="button"
                id={c.id}
                onClick={() => {
                  setCategory(c.id);
                  window.history.replaceState(null, "", `#${c.id}`);
                }}
                className={`border px-3 py-3 text-left transition-colors ${
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                <span className="label-caps block">{c.label}</span>
                <span
                  className={`mt-1 block text-xs leading-snug ${on ? "text-primary-foreground/75" : "text-muted-foreground"}`}
                >
                  {productsInCategory(c.id).length} pieces
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6 px-5">
        <div className="relative aspect-[16/9] overflow-hidden bg-black">
          <img src={active.hero} alt="" className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="label-caps text-bone/60">Selected</p>
            <h2 className="mt-1 font-kit text-3xl tracking-wide text-bone">{active.label}</h2>
            <p className="mt-1 max-w-sm text-sm text-bone/75">{active.description}</p>
          </div>
        </div>
      </section>

      {category === "sideline" && (
        <p className="mt-4 px-5 text-sm leading-relaxed text-muted-foreground">
          Sideline is for November. Same garnet as the match strip — dresses, hoops, hats.
        </p>
      )}

      <section className="mt-8 px-5">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="label-caps text-muted-foreground">Available now</p>
          <p className="label-caps text-muted-foreground">{products.length} listings</p>
        </div>

        <ul className="space-y-3">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                to="/team/$slug/$product"
                params={{ slug: kit.slug, product: p.id }}
                className="group flex gap-3 border border-border bg-card transition-colors hover:bg-secondary"
              >
                <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-black">
                  <img
                    src={p.thumb}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center py-3 pr-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-kit text-2xl tracking-wide">{p.name}</h3>
                    {/* Kit OTFs lack a $ glyph — never put prices in font-kit */}
                    <span className="shrink-0 font-sans text-xl tabular-nums text-garnet">
                      ${p.price}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.blurb}</p>
                  <p className="label-caps mt-2 text-garnet">
                    {p.typography
                      ? p.nameNumber
                        ? "Personalize"
                        : "Choose font"
                      : p.previewPair === "front-side"
                        ? "Front + side"
                        : "Customize"}{" "}
                    · ${p.price} →
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <aside className="mx-5 mt-10 border-t border-border pt-6">
        <p className="label-caps text-muted-foreground">Queen Bees</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The 2024 Hudson County champions have gone by Queen Bees for years. The crest was
          drawn by hand in Bayonne and had never existed as a mark before.
        </p>
      </aside>

      <p className="mt-8 px-5 text-center text-sm text-muted-foreground">
        Size chart uses inches. Nothing prints until you order.
      </p>
    </main>
  );
}
