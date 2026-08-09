import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type HTMLAttributes } from "react";

import { LiquidBackdrop } from "@/components/LiquidBackdrop";
import { ProductCanvas, type CanvasView } from "@/components/ProductCanvas";
import {
  FONTS,
  HAT_SIZE_CHART,
  HAT_SIZES,
  fontsStylesheetHref,
  fontById,
  letteringFor,
  previewViewsFor,
  productById,
  type FontId,
  type HatSize,
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
  const isHat = product.sizeChart === "hat";
  const usesTypography = product.typography;
  const lettering = letteringFor(product);
  const nameMax = kit.rules.nameMaxChars;
  const numberMaxDigits = 2;

  const [view, setView] = useState<CanvasView>(
    product.previewPair === "front-side" ? "side" : product.nameNumber ? "back" : "front",
  );
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

  // Motif pieces open on the side view (print lives on the panel).
  useEffect(() => {
    if (product.previewPair === "front-side") setView("side");
  }, [product.previewPair]);

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
  const checkoutReady = Boolean(
    nameReady && size && confirmed && (shopifyItem ? variantId && itemReady : false),
  );

  const cta: CtaState = useMemo(() => {
    if (!shopifyItem || (shopifyItem && !itemReady)) {
      if (product.nameNumber && !name) {
        return { kind: "step", label: "Enter name on back" };
      }
      if (product.nameNumber && !numberValid) {
        return { kind: "step", label: "Enter number" };
      }
      if (!size) return { kind: "step", label: "Choose a size" };
      if (!confirmed) {
        return {
          kind: "step",
          label: usesTypography ? "Confirm spelling & size" : "Confirm size",
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
        label: usesTypography ? "Confirm spelling & size" : "Confirm size",
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
    fontId,
    name,
    number,
    size,
    apparelSize,
    usesTypography,
  ]);

  const font = fontById(fontId)!;
  const hasPersonalization = Boolean(name || number);

  const clearPersonalization = () => {
    setName("");
    setNumber("");
  };

  const goNext = () => {
    if (checkoutReady) {
      formRef.current?.submit();
      return;
    }
    if (cta.kind !== "step") return;
    const target =
      product.nameNumber && !name
        ? "field-personalize"
        : product.nameNumber && !numberValid
          ? "field-personalize"
          : !size
            ? "field-size"
            : "field-confirm";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[560px] overflow-hidden bg-background pb-28 font-sans">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] opacity-[0.55]" aria-hidden>
        <LiquidBackdrop intensity="soft" />
      </div>

      <header className="relative z-10 px-5 pb-2 pt-5">
        <Link
          to="/team/$slug"
          params={{ slug: kit.slug }}
          className="place-line text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Bayonne store · Avenue A
        </Link>
        <p className="label-caps mt-4 text-muted-foreground">
          Bayonne Bees ·{" "}
          {product.category === "match"
            ? "Match"
            : product.category === "training"
              ? "Training"
              : product.category === "sideline"
                ? "Sideline"
                : "Faithful"}
        </p>
        <h1 className="mt-2 font-kit text-[clamp(1.85rem,7vw,2.5rem)] leading-none tracking-wide">
          {product.name}
        </h1>
        <p className="mt-2 font-sans text-lg font-semibold tabular-nums text-garnet">
          ${product.price}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.blurb}</p>
      </header>

      <div className="relative z-10">
      {/* adiClub-style personalization — name + number only (no player presets) */}
      {product.nameNumber && (
        <section id="field-personalize" className="mt-6 px-5">
          <h2 className="text-xl font-bold tracking-tight">Add Personalization</h2>
          <p className="mt-2 text-sm leading-snug text-muted-foreground">
            Personalized items cannot be returned or exchanged. Nothing prints until you order.
          </p>

          <div className="mt-5 grid grid-cols-[7rem_1fr] gap-3">
            <OutlinedField
              id="field-number"
              label="00"
              value={number}
              maxLength={numberMaxDigits}
              inputMode="numeric"
              placeholder="00"
              onChange={(v) => setNumber(sanitizeNumber(v).slice(0, numberMaxDigits))}
              counter={`${number.length} / ${numberMaxDigits}`}
              fontFamily={font.cssFamily}
            />
            <OutlinedField
              id="field-name"
              label="Name"
              value={name}
              maxLength={nameMax}
              placeholder="CARTER"
              onChange={(v) => setName(sanitizeName(v, nameMax))}
              counter={`${name.length} / ${nameMax}`}
              fontFamily={font.cssFamily}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
            <p className="tabular-nums text-muted-foreground">
              {hasPersonalization ? (
                <>
                  In total: <span className="font-semibold text-foreground">${product.price}</span>
                </>
              ) : (
                <>Personalization included</>
              )}
            </p>
            <button
              type="button"
              onClick={clearPersonalization}
              disabled={!hasPersonalization}
              className="underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear all
            </button>
          </div>
        </section>
      )}

      <section className="mt-6 px-5">
        <div className="mb-3 grid grid-cols-2 gap-2">
          {views.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`border px-3 py-2.5 text-center text-sm font-semibold capitalize transition-colors ${
                view === v
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:bg-secondary"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="overflow-hidden border border-border bg-secondary/40">
          <ProductCanvas
            view={view}
            frontSrc={product.previews.front}
            secondarySrc={product.previews.secondary}
            fontId={fontId}
            name={name}
            number={number}
            productLabel={product.name}
            showLettering={usesTypography && product.nameNumber}
            lettering={lettering}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Studio mockup of the Merchize blank · not a photograph of a finished garment
        </p>
      </section>

      {usesTypography && (
        <section className="mt-8 px-5">
          <h2 className="text-xl font-bold tracking-tight">Lettering font</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tops only · 4 faces</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {FONTS.map((f) => {
              const on = fontId === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFontId(f.id)}
                  className={`border px-3 py-3 text-left transition-colors ${
                    on
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background hover:bg-secondary"
                  }`}
                >
                  <span className="block text-xs font-semibold uppercase tracking-wide opacity-70">
                    {f.label}
                  </span>
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
        </section>
      )}

      <section id="field-size" className="mt-8 px-5">
        <h2 className="text-xl font-bold tracking-tight">Sizes</h2>
        {isHat ? (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {HAT_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`border py-3.5 text-sm font-semibold transition-colors ${
                  size === s
                    ? "border-foreground bg-secondary"
                    : "border-transparent bg-secondary/70 hover:bg-secondary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {SIZES.map((s) => {
              const available = shopifyItem ? Boolean(variantIdFor(kit, shopifyItem, s)) : true;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={!available && Boolean(shopifyItem)}
                  onClick={() => setSize(s)}
                  className={`border py-3.5 text-sm font-semibold transition-colors ${
                    size === s
                      ? "border-foreground bg-secondary"
                      : "border-transparent bg-secondary/70 hover:bg-secondary"
                  } disabled:cursor-not-allowed disabled:opacity-35`}
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
              Greyed sizes are still syncing — pick an available size to checkout.
            </p>
          )}
        <button
          type="button"
          onClick={() => setChartOpen((o) => !o)}
          className="mt-3 text-sm underline underline-offset-4"
        >
          {chartOpen ? "Hide size guide" : "Size guide"}
        </button>
        {chartOpen &&
          (isHat ? (
            <table className="mt-3 w-full border border-border text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase">Size</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase">Fit</th>
                </tr>
              </thead>
              <tbody>
                {HAT_SIZE_CHART.map((row) => (
                  <tr key={row.size} className="border-t border-border">
                    <td className="px-3 py-2 font-semibold">{row.size}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="mt-3 w-full border border-border text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase">Size</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase">Chest</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase">Length</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="border-t border-border">
                    <td className="px-3 py-2 font-semibold">{row.size}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.chest}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
      </section>

      <section id="field-confirm" className="mt-8 border-t border-border px-5 pt-6 pb-4">
        <label className="flex items-start gap-3 text-sm leading-snug">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]"
          />
          <span>
            {usesTypography
              ? "I’ve double-checked the spelling, number, and size. Custom kits can’t be edited after checkout."
              : "I’ve double-checked the size. Custom pieces can’t be edited after checkout."}
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
          {usesTypography && <input type="hidden" name="properties[Font]" value={font.label} />}
          {usesTypography && <input type="hidden" name="properties[Name]" value={name} />}
          {usesTypography && <input type="hidden" name="properties[Number]" value={number} />}
          <input type="hidden" name="properties[Size]" value={size} />
          <input type="hidden" name="properties[_ArtSpec]" value={encodeArtSpec(artSpec)} />
          <input type="hidden" name="properties[_Confirmed]" value="yes" />
        </form>

        <SyncNote sync={sync} hasShopifyItem={Boolean(shopifyItem)} />
      </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[560px] flex-col gap-1.5 px-5 py-3">
          <button
            type="button"
            disabled={cta.kind === "sync"}
            onClick={goNext}
            className="w-full bg-foreground py-4 text-sm font-bold uppercase tracking-wide text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {cta.label}
          </button>
          <p className="text-center text-xs leading-snug text-muted-foreground">
            {cta.kind === "ready"
              ? "Secure checkout on noparade-store.com · Nothing prints until you order"
              : cta.kind === "sync"
                ? "Design now — checkout unlocks when this listing finishes syncing"
                : "Tap to jump to the next step · Preview updates as you type"}
          </p>
        </div>
      </div>
    </main>
  );
}

function OutlinedField({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  counter,
  inputMode,
  fontFamily,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength: number;
  counter: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  fontFamily?: string;
}) {
  return (
    <label
      htmlFor={id}
      className="relative flex min-h-[4.5rem] flex-col border border-foreground/80 bg-background px-3 pb-2 pt-3 focus-within:border-foreground focus-within:ring-1 focus-within:ring-foreground"
    >
      <span className="absolute -top-2 left-2 bg-background px-1 text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <input
        id={id}
        value={value}
        maxLength={maxLength}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full flex-1 bg-transparent text-2xl font-semibold uppercase tracking-wide outline-none placeholder:text-muted-foreground/45"
        style={{ fontFamily }}
        autoComplete="off"
        spellCheck={false}
      />
      <span className="self-end text-[0.7rem] tabular-nums text-muted-foreground">{counter}</span>
    </label>
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
