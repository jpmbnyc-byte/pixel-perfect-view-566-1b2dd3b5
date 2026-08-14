import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type HTMLAttributes } from "react";

import { ImageTierToggle, type GalleryMode } from "@/components/ImageTierToggle";
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
import { campaignForProduct } from "@/media/campaignAssets";
import { lineItemImageTier } from "@/media/tiers";
import { cartAddAction, itemSyncReady, type ShopifySyncStatus } from "@/lib/shopify";
import { printScaleForSize } from "@/lib/printScale";
import { EASTER_EGGS } from "@/tokens/fun";
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

  const isHat = product.sizeChart === "hat";
  const usesTypography = product.typography;
  const lettering = letteringFor(product);
  const nameMax = kit.rules.nameMaxChars;
  const numberMaxDigits = 2;

  const [galleryMode, setGalleryMode] = useState<GalleryMode>("photos");
  const [view, setView] = useState<CanvasView>("front");
  const [fontId, setFontId] = useState<FontId>("forge");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [size, setSize] = useState<Size | HatSize | "">("");
  const [confirmed, setConfirmed] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [yearEgg, setYearEgg] = useState(false);
  const [confirmFlash, setConfirmFlash] = useState(false);
  const yearBuffer = useRef("");
  const committedOnce = useRef(false);

  const campaign = campaignForProduct(product);
  const truthViews = previewViewsFor(product);
  const campaignViews: CanvasView[] = (() => {
    if (!campaign) return truthViews;
    const has = (v: CanvasView) => Boolean(campaign.views[v as keyof typeof campaign.views]);
    if (product.nameNumber) {
      return (["front", "three-quarter", "back"] as CanvasView[]).filter(has);
    }
    const single: CanvasView[] = [];
    if (has("front")) single.push("front");
    if (has("three-quarter")) single.push("three-quarter");
    if (has("back")) single.push("back");
    return single.length ? single : truthViews;
  })();
  const activeViews = galleryMode === "photos" ? campaignViews : truthViews;
  const imageTier = galleryMode === "photos" && campaign ? "campaign" : "truth";
  const cartImageTier = lineItemImageTier({ name, number });

  const shopifyItem = product.shopifyItem;
  const itemReady = shopifyItem ? itemSyncReady(sync, shopifyItem) : false;

  useEffect(() => {
    if (!activeViews.includes(view)) setView(activeViews[0] ?? "front");
  }, [activeViews, view]);

  useEffect(() => {
    if (size && shopifyItem && !isHat && !variantIdFor(kit, shopifyItem, size as Size)) {
      setSize("");
    }
  }, [kit, shopifyItem, size, isHat]);

  // Truth mode: flip to back when personalizing lettered tops.
  useEffect(() => {
    if (galleryMode === "name-it" && product.nameNumber && (name || number)) setView("back");
  }, [galleryMode, product.nameNumber, name, number]);

  const onNumberChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    const prev = number;
    // Append only newly typed digits (field max 2 — buffer spans clears/retypes).
    if (digits.length > prev.length) {
      const added = digits.slice(prev.length);
      for (const ch of added) {
        yearBuffer.current = (yearBuffer.current + ch).slice(-4);
        if (yearBuffer.current === "1936") {
          setYearEgg(true);
          void EASTER_EGGS.number1936;
        }
      }
    } else if (digits.length === 0 && prev.length > 0) {
      // keep buffer across clear so 19 → clear → 36 still completes 1936
    }
    setNumber(sanitizeNumber(raw).slice(0, numberMaxDigits));
  };

  const onGalleryMode = (mode: GalleryMode) => {
    setGalleryMode(mode);
    if (mode === "name-it") {
      setView(product.nameNumber ? "back" : (truthViews[0] ?? "front"));
      requestAnimationFrame(() => {
        document.getElementById("field-personalize")?.scrollIntoView({ block: "nearest" });
      });
    } else {
      setView("front");
    }
  };

  const numberValue = Number(number);
  const numberValid =
    !product.nameNumber ||
    (number !== "" &&
      Number.isFinite(numberValue) &&
      numberValue >= kit.rules.numberMin &&
      numberValue <= kit.rules.numberMax);

  const apparelSize = !isHat && size ? (size as Size) : "";
  const variantId = apparelSize && shopifyItem ? variantIdFor(kit, shopifyItem, apparelSize) : null;

  const nameReady = !product.nameNumber || Boolean(name && numberValid);
  const checkoutReady = Boolean(
    nameReady && size && confirmed && (shopifyItem ? variantId && itemReady : false),
  );
  const printScale = printScaleForSize(apparelSize || size);

  // Confirmation moment when name + number first become valid together.
  useEffect(() => {
    if (!product.nameNumber) return;
    if (name && numberValid && !committedOnce.current) {
      committedOnce.current = true;
      setConfirmFlash(true);
      const id = window.setTimeout(() => setConfirmFlash(false), 900);
      return () => window.clearTimeout(id);
    }
    if (!name || !numberValid) committedOnce.current = false;
  }, [name, numberValid, product.nameNumber]);

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
  }, [kit, product, shopifyItem, fontId, name, number, size, apparelSize, usesTypography]);

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
    if (product.nameNumber && (!name || !numberValid) && galleryMode !== "name-it") {
      onGalleryMode("name-it");
      return;
    }
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
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] opacity-[0.55]"
        aria-hidden
      >
        <LiquidBackdrop intensity="soft" />
      </div>

      <header className="relative z-10 px-5 pb-2 pt-5">
        <Link
          to="/team/$slug"
          params={{ slug: kit.slug }}
          hash={product.category}
          className="place-line tap-44 inline-flex items-center text-muted-foreground transition-colors duration-micro ease-standard hover:text-foreground focus-ring"
        >
          ← Bayonne store · {product.category === "match" ? "Match" : product.category}
        </Link>
        <p className="label-caps mt-4 text-muted-foreground">
          Bayonne · {product.category === "match" ? "Match" : product.category}
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
        {/* Gallery first — toggle is the seam between Tier 1 photos and Tier 2 truth */}
        <section className="mt-6 px-5">
          <div
            className={`mb-3 grid gap-2 ${activeViews.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}
          >
            {activeViews.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`border px-2 py-2.5 text-center text-sm font-semibold capitalize transition-colors duration-micro ease-standard tap-44 focus-ring ${
                  view === v
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:bg-secondary"
                }`}
              >
                {v === "three-quarter" ? "¾" : v}
              </button>
            ))}
          </div>

          <div
            className={`overflow-hidden border border-border bg-secondary/40 ${
              yearEgg ? "ring-1 ring-garnet/40" : ""
            }`}
          >
            <ProductCanvas
              view={view}
              frontSrc={
                galleryMode === "photos" && campaign?.views.front
                  ? campaign.views.front
                  : product.previews.front
              }
              {...(galleryMode === "photos" && campaign?.views["three-quarter"]
                ? { threeQuarterSrc: campaign.views["three-quarter"] }
                : {})}
              secondarySrc={
                galleryMode === "photos" && campaign?.views.back
                  ? campaign.views.back
                  : galleryMode === "photos" && campaign?.views.front && !campaign.views.back
                    ? campaign.views.front
                    : product.previews.secondary
              }
              fontId={fontId}
              name={name}
              number={number}
              productLabel={product.name}
              showLettering={
                // Campaign backs already carry AVENUE A / 36 — do not double-letter.
                galleryMode === "name-it" && usesTypography && product.nameNumber
              }
              lettering={lettering}
              tier={imageTier}
              showNameBadge={galleryMode === "photos" && product.nameNumber}
              printScale={printScale}
              confirmFlash={confirmFlash}
            />
          </div>

          <div className="mt-3">
            <ImageTierToggle
              mode={galleryMode}
              onChange={onGalleryMode}
              nameable={product.nameNumber}
            />
          </div>
        </section>

        {/* Inline under toggle when "Put your name on it" — no modal, no new page */}
        {product.nameNumber && galleryMode === "name-it" && (
          <section id="field-personalize" className="mt-6 px-5">
            <h2 className="text-xl font-bold tracking-tight">Put your name on it</h2>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              Live preview — the exact back that prints. Updates as you type. Personalized items
              cannot be returned.
            </p>
            {confirmFlash && (
              <p className="mt-2 text-sm font-medium text-garnet" role="status">
                Name locked on the jersey — check spelling, then size.
              </p>
            )}

            <div className="mt-5 grid grid-cols-[7rem_1fr] gap-3">
              <OutlinedField
                id="field-number"
                label="00"
                value={number}
                maxLength={numberMaxDigits}
                inputMode="numeric"
                placeholder="00"
                onChange={onNumberChange}
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
                    In total:{" "}
                    <span className="font-semibold text-foreground">${product.price}</span>
                  </>
                ) : (
                  <>Name and number included</>
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

            {usesTypography && (
              <div className="mt-8">
                <h3 className="text-lg font-bold tracking-tight">Lettering font</h3>
                <p className="mt-1 text-sm text-muted-foreground">Tops only · 4 faces</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {FONTS.map((f) => {
                    const on = fontId === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFontId(f.id)}
                        className={`border px-3 py-3 text-left transition-colors duration-micro ease-standard tap-44 focus-ring ${
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
              </div>
            )}
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
                  className={`border py-3.5 text-sm font-semibold transition-colors duration-micro ease-standard tap-44 focus-ring ${
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
                    className={`border py-3.5 text-sm font-semibold transition-colors duration-micro ease-standard tap-44 focus-ring ${
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
          {!isHat && shopifyItem && SIZES.some((s) => !variantIdFor(kit, shopifyItem, s)) && (
            <p className="mt-2 text-sm text-muted-foreground" role="status">
              Greyed sizes are not yet mapped in Shopify. Pick a size that is available, or wait for
              sync and refresh.
            </p>
          )}
          {size && !isHat && (
            <p className="mt-2 text-xs text-muted-foreground">
              Preview lettering scaled for size {size}.
            </p>
          )}
          <button
            type="button"
            onClick={() => setChartOpen((o) => !o)}
            className="mt-3 text-sm underline underline-offset-4 tap-44 focus-ring"
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
            <input type="hidden" name="properties[_ImageTier]" value={cartImageTier} />
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
            className="w-full bg-foreground py-4 text-sm font-bold uppercase tracking-wide text-background transition-opacity duration-micro ease-standard hover:opacity-90 focus-ring disabled:cursor-not-allowed disabled:opacity-45 tap-44"
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
      className="relative flex min-h-[4.5rem] flex-col border border-foreground/80 bg-background px-3 pb-2 pt-3 transition-colors duration-micro ease-standard focus-within:border-foreground focus-within:ring-1 focus-within:ring-foreground"
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
        aria-describedby={`${id}-counter`}
      />
      <span
        id={`${id}-counter`}
        className="self-end text-[0.7rem] tabular-nums text-muted-foreground"
      >
        {counter}
      </span>
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
