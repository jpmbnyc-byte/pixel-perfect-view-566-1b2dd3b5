import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import logo from "@/assets/bayonne/bayonne-bees-logo.png";
import { CATEGORIES, productsInCategory, type CategoryId } from "@/lib/catalog";
import { countdownParts } from "@/lib/kit";
import { shopifySynced } from "@/lib/shopify";
import { Route as TeamSlugRoute } from "./team.$slug";

export const Route = createFileRoute("/team/$slug/")({
  component: TeamStorePage,
});

function TeamStorePage() {
  const { kit, sync } = TeamSlugRoute.useLoaderData();
  const [category, setCategory] = useState<CategoryId>("core");
  const countdown = countdownParts(kit.closesAt, Date.now());
  const closed = kit.status !== "live" || countdown === null;
  const catalogReady = shopifySynced(sync);

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
              No Parade F.C. · Team Customs
            </Link>
            <h1 className="mt-2 text-4xl leading-none tracking-tight">{kit.teamName}</h1>
            <p className="label-caps mt-1 text-muted-foreground">Queen Bees crest build</p>
            <p className="label-caps mt-3 text-garnet">
              {kit.family.label} {kit.family.version} · {kit.colorway.name}
            </p>
            <p className="mt-1 text-lg text-muted-foreground">“{kit.family.doctrine}”</p>
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
          Checkout unlocks after Merchize syncs products to{" "}
          <span className="text-foreground">noparade-store.com</span>. Browse and design now.
        </div>
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
                onClick={() => setCategory(c.id)}
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
          <img src={active.hero} alt="" className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="label-caps text-bone/60">Selected</p>
            <h2 className="mt-1 font-kit text-3xl tracking-wide text-bone">{active.label}</h2>
            <p className="mt-1 max-w-sm text-sm text-bone/75">{active.description}</p>
          </div>
        </div>
      </section>

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
                    <span className="font-kit text-xl text-garnet">${p.price}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.blurb}</p>
                  <p className="label-caps mt-2 text-muted-foreground">
                    {p.nameNumber ? "Custom name + number" : "Motif + crest"} · Design →
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 px-5 text-center text-sm text-muted-foreground">
        Each listing opens a customizer — base layer, geometric motif, and premium font.
      </p>
    </main>
  );
}
