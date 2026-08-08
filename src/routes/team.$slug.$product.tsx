import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import { ProductCanvas, type CanvasView } from "@/components/ProductCanvas";
import {
  FONTS,
  HAT_SIZE_CHART,
  HAT_SIZES,
  MOTIFS,
  fontsStylesheetHref,
  fontById,
  letteringFor,
  previewViewsFor,
  productById,
  type FontId,
  type HatSize,
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

type CtaState =
  | { kind: "sync"; label: string }
  | { kind: "step"; label: string }
  | { kind: "ready"; label: string };

function ProductListingPage() {
  const { kit, sync } = TeamSlugRoute.useLoaderData();
  const { product } = Route.useLoaderData();
  const formRef = useRef<HTMLFormElement>(null);

  const views = previewViewsFor(product);
  const secondaryView = views[1]!;
  const isHat = product.sizeChart === "hat";
  const usesTypography = product.typography;
  const lettering = letteringFor(product);

  const [view, setView] = useState<CanvasView>(
    product.previewPair === "front-side" ? "side" : product.nameNumber ? "back" : "front",
  );
  const [motif, setMotif] = useState<MotifId>("chevron");
  const [fontId, setFontId] = useState<FontId>("forge");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [size, setSize] = useState<Size | HatSize | "">("");
  const [confirmed, setConfirmed] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);

  const shopifyItem = product.shopifyItem;
  const itemReady = shopifyItem ? itemSyncReady(sync, shopifyItem) : false;

  useEffect(() => {
    if (!views.includes(view)) setView("front");
  }, [views, view]);

  useEffect(() => {
    if (
      size &&
      shopifyItem &&
      !isHat &&
      !variantIdFor(kit, shopifyItem, size as Size)
    ) {
      setSize("");
    }
  }, [kit, shopifyItem, size, isHat]);

  // Flip to back when personalizing lettered tops.
  useEffect(() => {
    if (product.nameNumber && (name || number)) setView("back");
  }, [product.nameNumber, name, number]);

  // Flip to side when choosing motif on shorts / sweats / hat.
  useEffect(() => {
    if (product.previewPair === "front-side") setView("side");
  }, [product.previewPair, motif]);

  const numberValue = Number(number);
  const numberValid =
    !product.nameNumber ||
    (number !== "" &&
      Number.isFinite(numberValue) &&
      numberValue >= kit.rules.numberMin &&
      numberValue <= kit.rules.numberMax);

  const apparelSize = !isHat && size ? (size as Size) : "";
  const variantId =
    apparelSize && shopifyItem ? variantIdFor(kit, shopifyItem, apparelSize) : null;

  const nameReady = !product.nameNumber || Boolean(name && numberValid);
  // Hat / motif-only listings without Shopify item stay design-only until sync.
  const checkoutReady = Boolean(
    nameReady && size && confirmed && (shopifyItem ? variantId && itemReady : false),
  );

  const cta: CtaState = useMemo(() => {
    if (!shopifyItem || (shopifyItem && !itemReady)) {
      if (!size) return { kind: "step", label: "Choose a size" };
      if (!confirmed) {
        return {
          kind: "step",
          label: usesTypography ? "Confirm spelling & size" : "Confirm motif & size",
        };
      }
      return { kind: "sync", label: "Checkout opening soon" };
    }
    if (product.nameNumber && !name) {
      return { kind: "step", label: "Enter name on back" };
    }
    if (product.nameNumber && !numberValid) {
      return { kind: "step", label: "Enter number" };
    }
    if (!size) {
      return { kind: "step", label: "Choose a size" };
    }
    if (!confirmed) {
      return {
        kind: "step",
        label: usesTypography ? "Confirm spelling & size" : "Confirm motif & size",
      };
    }
    return { kind: "ready", label: `Checkout · $${product.price}` };
  }, [
    shopifyItem,
    itemReady,
    product.nameNumber,
    product.price,
    name,
    numberValid,
    size,
    confirmed,
    usesTypography,
  ]);

  const artSpec = useMemo(() => {
    const base = {
      v: 2,
      kit: kit.slug,
      product: product.id,
      handle: product.handle,
      motif,
      font: usesTypography ? fontId : null,
      name: usesTypography ? name : "",
      number: usesTypography ? number : "",
      size: size || null,
      previewPair: product.previewPair,
    };
    if (!apparelSize || !shopifyItem) return base;
    return {
      ...buildArtSpec({
        kit,
        item: shopifyItem,
        name: usesTypography ? name : "",
        number: usesTypography ? number : "",
        size: apparelSize,
      }),
      ...base,
    };
  }, [
    kit,
    product,
    shopifyItem,
    motif,
    fontId,
    name,
    number,
    size,
    apparelSize,
    usesTypography,
  ]);

  const font = fontById(fontId)!;

  const goNext = () => {
    if (checkoutReady) {
      formRef.current?.submit();
      return;
    }
    if (cta.kind !== "step") return;
    const target =
      product.nameNumber && !name
        ? "field-name"
        : product.nameNumber && !numberValid
          ? "field-number"
          : !size
            ? "field-size"
            : "field-confirm";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[560px] bg-background pb-28">
      <header className="border-b border-border px-5 pb-4 pt-5">
        <Link
          to="/team/$slug"
          params={{ slug: kit.slug }}
          className="label-caps text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Bayonne store
        </Link>
        <h1 className="mt-3 text-4xl leading-none tracking-tight">{product.name}</h1>
        <p className="mt-2 font-sans text-sm font-semibold tabular-nums tracking-[0.08em] text-garnet">
          ${product.price}
        </p>
        <p className="mt-2 text-base text-muted-foreground">{product.blurb}</p>
        <div className="mt-4 space-y-3 border-t border-border pt-4 text-base leading-relaxed text-foreground/85">
          {usesTypography ? (
            <>
              <p>
                Garnet is a dark, slightly brown-toned red. Maroon is purple-toned. Burgundy is
                darker still. This piece is specified in Bayonne’s garnet — not the red the
                vendor already had loaded.
              </p>
              <p className="text-muted-foreground">
                Inside the collar, where only the player looks, we can print the year. Nothing
                is printed until you order it.
              </p>
            </>
          ) : (
            <>
              <p>
                The geometric language lives on the side — switch to the side view to see the
                motif you pick. No name, number, or lettering on this piece.
              </p>
              <p className="text-muted-foreground">
                Same Bayonne garnet as the match strip. Nothing prints until you order.
              </p>
            </>
          )}
        </div>
      </header>

      <section className="px-5 pt-5">
        <div className="mb-3 grid grid-cols-2 gap-px overflow-hidden border border-border">
          {views.map((v) => (
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
          frontSrc={product.previews.front}
          secondarySrc={product.previews.secondary}
          motif={motif}
          fontId={fontId}
          name={name}
          number={number}
          productLabel={product.name}
          showLettering={usesTypography && product.nameNumber}
          emphasizeMotif={product.previewPair === "front-side"}
          lettering={lettering}
        />
        {product.previewPair === "front-side" && (
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Side view shows your selected geometric pattern on the panel.
          </p>
        )}
      </section>

      <section className="mt-8 px-5">
        <Field
          label="Geometric motif"
          hint="Live preview updates when you pick one"
        >
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

      {usesTypography && (
        <section className="mt-7 px-5">
          <Field label="Lettering font" hint="Tops only · 4 faces">
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
      )}

      {product.nameNumber && (
        <section className="mt-7 space-y-6 px-5">
          <div id="field-name">
            <Field label="Name on back" hint={`${kit.rules.nameMaxChars} max`}>
              <input
                value={name}
                onChange={(e) => setName(sanitizeName(e.target.value, kit.rules.nameMaxChars))}
                placeholder="SAINT-PIERRE"
                className="w-full border-b border-input bg-transparent pb-2 text-3xl tracking-wide outline-none placeholder:text-muted-foreground/50 focus:border-ring"
                style={{ fontFamily: font.cssFamily }}
              />
            </Field>
          </div>
          <div id="field-number">
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
          </div>
        </section>
      )}

      <section id="field-size" className="mt-7 px-5">
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
          {isHat ? (
            <div className="grid grid-cols-2 gap-2">
              {HAT_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`label-caps border py-3 transition-colors ${
                    size === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
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
          )}
          {!isHat &&
            shopifyItem &&
            SIZES.some((s) => !variantIdFor(kit, shopifyItem, s)) && (
              <p className="mt-2 text-sm text-muted-foreground">
                Dashed sizes are still syncing — pick an available size to checkout.
              </p>
            )}
          {chartOpen &&
            (isHat ? (
              <table className="mt-4 w-full border border-border text-sm">
                <thead>
                  <tr className="bg-secondary">
                    <th className="label-caps px-3 py-2 text-left">Size</th>
                    <th className="label-caps px-3 py-2 text-left">Fit</th>
                  </tr>
                </thead>
                <tbody>
                  {HAT_SIZE_CHART.map((row) => (
                    <tr key={row.size} className="border-t border-border">
                      <td className="px-3 py-2 font-kit text-base">{row.size}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
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
            ))}
        </Field>
      </section>

      <section id="field-confirm" className="mt-8 border-t border-border px-5 pt-6 pb-4">
        <label className="flex items-start gap-3 text-base leading-snug">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 size-5 shrink-0 accent-[var(--primary)]"
          />
          <span>
            {usesTypography
              ? "I’ve double-checked the spelling, number, and size. Custom kits can’t be edited after checkout."
              : "I’ve double-checked the motif and size. Custom pieces can’t be edited after checkout."}
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
          {usesTypography && <input type="hidden" name="properties[Font]" value={font.label} />}
          {usesTypography && <input type="hidden" name="properties[Name]" value={name} />}
          {usesTypography && <input type="hidden" name="properties[Number]" value={number} />}
          <input type="hidden" name="properties[Size]" value={size} />
          <input type="hidden" name="properties[_ArtSpec]" value={encodeArtSpec(artSpec)} />
          <input type="hidden" name="properties[_Confirmed]" value="yes" />
        </form>

        <SyncNote sync={sync} hasShopifyItem={Boolean(shopifyItem)} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[560px] flex-col gap-1.5 px-5 py-3">
          <button
            type="button"
            disabled={cta.kind === "sync"}
            onClick={goNext}
            className="label-caps w-full bg-primary py-4 text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {cta.label}
          </button>
          <p className="text-center text-xs leading-snug text-muted-foreground">
            {cta.kind === "ready"
              ? "Secure checkout on noparade-store.com · Nothing prints until you order"
              : cta.kind === "sync"
                ? "Design now — checkout unlocks when this listing finishes syncing"
                : "Tap to jump to the next step · Preview updates as you choose"}
          </p>
        </div>
      </div>
    </main>
  );
}

function SyncNote({ sync, hasShopifyItem }: { sync: ShopifySyncStatus; hasShopifyItem: boolean }) {
  if (!hasShopifyItem) {
    return (
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Design is ready. Checkout unlocks when this listing goes live on noparade-store.com.
      </p>
    );
  }
  if (sync.top || sync.bottom || sync.set) return null;
  return (
    <p className="mt-4 text-center text-sm text-muted-foreground">
      Core kit sizes are still syncing to noparade-store.com. You can finish the design now.
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
