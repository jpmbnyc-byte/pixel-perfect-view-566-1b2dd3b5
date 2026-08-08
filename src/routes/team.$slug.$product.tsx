import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import { ProductCanvas, type CanvasView } from "@/components/ProductCanvas";
import {
  FONTS,
  MOTIFS,
  fontsStylesheetHref,
  fontById,
  productById,
  type FontId,
  type MotifId,
} from "@/lib/catalog";
import {
  SIZES,
  SIZE_CHART,
  buildArtSpec,
  encodeArtSpec,
  sanitizeName,
  sanitizeNumber,
  variantIdFor,
  type Size,
} from "@/lib/kit";
import { cartAddAction, itemSyncReady, type ShopifySyncStatus } from "@/lib/shopify";
import { Route as TeamSlugRoute } from "./team.$slug";

export const Route = createFileRoute("/team/$slug/$product")({
  loader: ({ params }) => {
    const product = productById(params.product);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.product.name} — Bayonne Bees`;
    const description = loaderData.product.blurb;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      links: [{ rel: "stylesheet", href: fontsStylesheetHref() }],
    };
  },
  component: ProductListingPage,
});

function ProductListingPage() {
  const { kit, sync } = TeamSlugRoute.useLoaderData();
  const { product } = Route.useLoaderData();
  const formRef = useRef<HTMLFormElement>(null);

  const [view, setView] = useState<CanvasView>(product.nameNumber ? "back" : "front");
  const [motif, setMotif] = useState<MotifId>("chevron");
  const [fontId, setFontId] = useState<FontId>("matchday");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [size, setSize] = useState<Size | "">("");
  const [confirmed, setConfirmed] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);

  const shopifyItem = product.shopifyItem;
  const itemReady = shopifyItem ? itemSyncReady(sync, shopifyItem) : false;

  useEffect(() => {
    if (size && shopifyItem && !variantIdFor(kit, shopifyItem, size)) setSize("");
  }, [kit, shopifyItem, size]);

  const numberValue = Number(number);
  const numberValid =
    !product.nameNumber ||
    (number !== "" &&
      Number.isFinite(numberValue) &&
      numberValue >= kit.rules.numberMin &&
      numberValue <= kit.rules.numberMax);

  const variantId = size && shopifyItem ? variantIdFor(kit, shopifyItem, size) : null;

  const ready = Boolean(
    (!product.nameNumber || (name && numberValid)) && size && variantId && confirmed && itemReady,
  );

  const artSpec = useMemo(() => {
    if (!size || !shopifyItem) {
      return {
        v: 2,
        kit: kit.slug,
        product: product.id,
        handle: product.handle,
        motif,
        font: fontId,
        name,
        number,
        size: size || null,
      };
    }
    return {
      ...buildArtSpec({
        kit,
        item: shopifyItem,
        name,
        number,
        size,
      }),
      v: 2,
      product: product.id,
      handle: product.handle,
      motif,
      font: fontId,
    };
  }, [kit, product, shopifyItem, motif, fontId, name, number, size]);

  const font = fontById(fontId)!;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[560px] bg-background pb-20">
      <header className="border-b border-border px-5 pb-4 pt-5">
        <Link
          to="/team/$slug"
          params={{ slug: kit.slug }}
          className="label-caps text-muted-foreground transition-colors hover:text-foreground"
        >
          ← {kit.teamName} store
        </Link>
        <h1 className="mt-3 text-4xl leading-none tracking-tight">{product.name}</h1>
        <p className="label-caps mt-2 text-garnet">
          ${product.price} · {product.handle}
        </p>
        <p className="mt-2 text-base text-muted-foreground">{product.blurb}</p>
        {/* Layer 5 — collar reveal / color truth. No official-claim language. */}
        <div className="mt-4 space-y-3 border-t border-border pt-4 text-base leading-relaxed text-foreground/85">
          <p>
            Garnet, not maroon. Bayonne has worn the darker one since 1936, and most
            suppliers get it wrong.
          </p>
          <p className="text-muted-foreground">
            The year is printed inside the collar, where only the player sees it.
          </p>
        </div>
      </header>

      <section className="px-5 pt-5">
        <div className="mb-3 grid grid-cols-2 gap-px overflow-hidden border border-border">
          {(["front", "back"] as CanvasView[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`label-caps py-2.5 transition-colors ${
                view === v
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <ProductCanvas
          view={view}
          motif={motif}
          fontId={fontId}
          name={name}
          number={number}
          productLabel={product.name}
          showLettering={product.nameNumber}
        />
      </section>

      {/* Motif: base layer always on; choose 1 of 3 geos */}
      <section className="mt-8 px-5">
        <Field label="Geometric motif" hint="Base garnet field + one accent">
          <div className="grid grid-cols-3 gap-2">
            {MOTIFS.map((m) => {
              const on = motif === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMotif(m.id)}
                  className={`border p-2 text-left transition-colors ${
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  <MotifSwatch id={m.id} active={on} />
                  <span className="label-caps mt-2 block">{m.label}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {MOTIFS.find((m) => m.id === motif)?.description}
          </p>
        </Field>
      </section>

      {/* Fonts */}
      <section className="mt-7 px-5">
        <Field label="Lettering font" hint="4 premium faces">
          <div className="grid grid-cols-2 gap-2">
            {FONTS.map((f) => {
              const on = fontId === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFontId(f.id)}
                  className={`border px-3 py-3 text-left transition-colors ${
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  <span className="label-caps block opacity-70">{f.label}</span>
                  <span
                    className="mt-1 block text-2xl tracking-wide"
                    style={{ fontFamily: f.cssFamily }}
                  >
                    {f.sample}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Active: {font.label}</p>
        </Field>
      </section>

      {product.nameNumber && (
        <section className="mt-7 space-y-6 px-5">
          <Field label="Name on back" hint={`${kit.rules.nameMaxChars} max`}>
            <input
              value={name}
              onChange={(e) => setName(sanitizeName(e.target.value, kit.rules.nameMaxChars))}
              placeholder="SAINT-PIERRE"
              className="w-full border-b border-input bg-transparent pb-2 text-3xl tracking-wide outline-none placeholder:text-muted-foreground/50 focus:border-ring"
              style={{ fontFamily: font.cssFamily }}
            />
          </Field>
          <Field label="Number" hint={`${kit.rules.numberMin}–${kit.rules.numberMax}`}>
            <input
              value={number}
              onChange={(e) => setNumber(sanitizeNumber(e.target.value))}
              placeholder="7"
              inputMode="numeric"
              className="w-full border-b border-input bg-transparent pb-2 text-3xl tracking-wide outline-none placeholder:text-muted-foreground/50 focus:border-ring"
              style={{ fontFamily: font.cssFamily }}
            />
          </Field>
        </section>
      )}

      <section className="mt-7 px-5">
        <Field
          label="Size"
          hint={
            <button
              type="button"
              onClick={() => setChartOpen((o) => !o)}
              className="label-caps underline underline-offset-4"
            >
              {chartOpen ? "Hide chart" : "Size chart"}
            </button>
          }
        >
          <div className="grid grid-cols-4 gap-2">
            {SIZES.map((s) => {
              const available = shopifyItem ? Boolean(variantIdFor(kit, shopifyItem, s)) : true;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={!available && Boolean(shopifyItem)}
                  onClick={() => setSize(s)}
                  className={`label-caps border py-3 transition-colors ${
                    size === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-secondary"
                  } disabled:cursor-not-allowed disabled:border-dashed disabled:bg-transparent disabled:text-muted-foreground/50`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {shopifyItem && SIZES.some((s) => !variantIdFor(kit, shopifyItem, s)) && (
            <p className="mt-2 text-sm text-muted-foreground">
              Dashed sizes await Merchize sync for this listing.
            </p>
          )}
          {chartOpen && (
            <table className="mt-4 w-full border border-border text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="label-caps px-3 py-2 text-left">Size</th>
                  <th className="label-caps px-3 py-2 text-left">Chest</th>
                  <th className="label-caps px-3 py-2 text-left">Length</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="border-t border-border">
                    <td className="px-3 py-2 font-kit text-base">{row.size}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.chest}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Field>
      </section>

      <section className="mt-8 border-t border-border px-5 pt-6">
        <label className="flex items-start gap-3 text-base leading-snug">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 size-5 shrink-0 accent-[var(--primary)]"
          />
          <span>
            I've checked motif, font, spelling, number, and size — custom kits are final sale.
          </span>
        </label>

        <form
          ref={formRef}
          method="POST"
          action={cartAddAction(kit.shopify.domain)}
          target="_top"
          className="hidden"
          acceptCharset="UTF-8"
        >
          <input type="hidden" name="id" value={variantId ?? ""} />
          <input type="hidden" name="quantity" value="1" />
          <input type="hidden" name="return_to" value="/checkout" />
          <input type="hidden" name="properties[Team]" value={kit.teamName} />
          <input type="hidden" name="properties[Collection]" value="Team Customs" />
          <input type="hidden" name="properties[Product]" value={product.name} />
          <input type="hidden" name="properties[Motif]" value={motif} />
          <input type="hidden" name="properties[Font]" value={font.label} />
          <input type="hidden" name="properties[Name]" value={name} />
          <input type="hidden" name="properties[Number]" value={number} />
          <input type="hidden" name="properties[Size]" value={size} />
          <input type="hidden" name="properties[_ArtSpec]" value={encodeArtSpec(artSpec)} />
          <input type="hidden" name="properties[_Confirmed]" value="yes" />
        </form>

        <button
          type="button"
          disabled={!ready}
          onClick={() => formRef.current?.submit()}
          className="label-caps mt-5 w-full bg-primary py-4 text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {!shopifyItem
            ? "Listing preview — sync in Merchize"
            : !itemReady
              ? "Waiting for Merchize sync"
              : `Checkout · $${product.price}`}
        </button>

        <SyncNote sync={sync} hasShopifyItem={Boolean(shopifyItem)} />
      </section>
    </main>
  );
}

function SyncNote({ sync, hasShopifyItem }: { sync: ShopifySyncStatus; hasShopifyItem: boolean }) {
  if (!hasShopifyItem) {
    return (
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Design is ready. Publish this handle in Merchize to unlock checkout.
      </p>
    );
  }
  if (sync.top || sync.bottom || sync.set) return null;
  return (
    <p className="mt-4 text-center text-sm text-muted-foreground">
      Merchize sync pending for core kit variants on noparade-store.com.
    </p>
  );
}

function MotifSwatch({ id, active }: { id: MotifId; active: boolean }) {
  const fill =
    id === "chevron"
      ? "repeating-linear-gradient(-28deg,#5A1626 0 10px,#0A0A0A 10px 20px,#F4F1F0 20px 22px,#5A1626 22px 32px)"
      : id === "grid"
        ? "linear-gradient(#F4F1F022 1px,transparent 1px),linear-gradient(90deg,#F4F1F022 1px,transparent 1px),#5A1626"
        : "radial-gradient(120% 80% at 0% 100%,#0A0A0A 0%,transparent 55%),#5A1626";
  return (
    <div
      className={`h-12 w-full border ${active ? "border-bone/40" : "border-border"}`}
      style={{
        backgroundImage: fill,
        backgroundSize: id === "grid" ? "8px 8px, 8px 8px, auto" : undefined,
      }}
    />
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="label-caps text-muted-foreground">{label}</span>
        {hint && <span className="label-caps text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
