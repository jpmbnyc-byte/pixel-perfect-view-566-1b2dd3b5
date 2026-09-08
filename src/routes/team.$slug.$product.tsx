import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useRef, useState, type HTMLAttributes } from "react";

import { ComingSoonMedia } from "@/components/ComingSoonMedia";
import { LiquidBackdrop } from "@/components/LiquidBackdrop";
import { ProductCanvas, type CanvasView } from "@/components/ProductCanvas";
import {
  FONTS,
  HAT_SIZE_CHART,
  HAT_SIZES,
  fontsStylesheetHref,
  fontById,
  letteringFor,
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
import { cartAddAction, itemSyncReady, type ShopifySyncStatus } from "@/lib/shopify";
import { DEPARTMENT_TO } from "@/components/TeamStorePage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { productCopyFor } from "@/copy/collection";
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
    const title = `${loaderData.product.name} — Bayonne Athletics`;
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

type GalleryMode = "photos" | "product" | "customize";
type ShoeSize =
  | "5"
  | "5.5"
  | "6"
  | "6.5"
  | "7"
  | "7.5"
  | "8"
  | "8.5"
  | "9"
  | "9.5"
  | "10"
  | "10.5"
  | "11"
  | "11.5"
  | "12"
  | "13"
  | "14";
type SockSize = "7–9.5";
type SelectedSize = Size | HatSize | ShoeSize | SockSize | "";

const SHOE_SIZES: ShoeSize[] = [
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "13",
  "14",
];
const SOCK_SIZES: SockSize[] = ["7–9.5"];

function ProductListingPage() {
  const { kit, sync } = TeamSlugRoute.useLoaderData();
  const { product } = Route.useLoaderData();
  const formRef = useRef<HTMLFormElement>(null);

  const campaign = product.imageryPending ? undefined : campaignForProduct(product);
  const copy = productCopyFor(product.id);
  const [galleryMode, setGalleryMode] = useState<GalleryMode>(campaign?.views.front ? "photos" : "product");
  const [view, setView] = useState<CanvasView>("front");
  const [fontId, setFontId] = useState<FontId>("forge");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [size, setSize] = useState<SelectedSize>("");
  const [confirmed, setConfirmed] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);

  const font = fontById(fontId);
  const lettering = letteringFor(product);
  const nameMax = kit.rules.nameMaxChars;
  const shopifyItem = product.shopifyItem;
  const itemReady = shopifyItem ? itemSyncReady(sync, shopifyItem) : false;

  const hasPersonalization = Boolean(name || number);
  const numberValue = Number(number);
  const numberValid =
    number !== "" &&
    Number.isFinite(numberValue) &&
    numberValue >= kit.rules.numberMin &&
    numberValue <= kit.rules.numberMax;
  const personalizationComplete = !hasPersonalization || Boolean(name && numberValid);
  const displayedPrice =
    hasPersonalization && product.personalizedPrice ? product.personalizedPrice : product.price;

  const apparelSize = product.sizeChart === "apparel" && size ? (size as Size) : "";
  const variantId = apparelSize && shopifyItem ? variantIdFor(kit, shopifyItem, apparelSize) : null;

  /**
   * Personalized pricing needs its own commerce variant/add-on. Until that is
   * synced, the engine stays fully usable but cannot accidentally charge the
   * $78 blank/base price for a $98 personalized jersey.
   */
  const personalizedCommerceReady = !hasPersonalization || !product.personalizedPrice;
  const checkoutReady = Boolean(
    personalizationComplete &&
      size &&
      confirmed &&
      shopifyItem &&
      variantId &&
      itemReady &&
      personalizedCommerceReady,
  );

  const photoViews = useMemo<CanvasView[]>(() => {
    if (!campaign) return ["front"];
    const values: CanvasView[] = [];
    if (campaign.views.front) values.push("front");
    if (campaign.views["three-quarter"]) values.push("three-quarter");
    if (campaign.views.back) values.push("back");
    return values.length ? values : ["front"];
  }, [campaign]);

  const productViews: CanvasView[] =
    product.previewPair === "front-back" ? ["front", "back"] : ["front", "side"];
  const activeViews = galleryMode === "photos" ? photoViews : productViews;

  const setMode = (mode: GalleryMode) => {
    setGalleryMode(mode);
    if (mode === "customize") setView("back");
    else setView("front");
  };

  const frontSrc =
    galleryMode === "photos" && campaign?.views.front ? campaign.views.front : product.previews.front;
  const secondarySrc =
    galleryMode === "photos" && campaign?.views.back
      ? campaign.views.back
      : product.previews.secondary;
  const threeQuarterSrc =
    galleryMode === "photos" && campaign?.views["three-quarter"]
      ? campaign.views["three-quarter"]
      : undefined;

  const artSpec = useMemo(() => {
    const base = {
      v: 3,
      kit: kit.slug,
      product: product.id,
      handle: product.handle,
      font: product.typography ? fontId : null,
      name: product.typography ? name : "",
      number: product.typography ? number : "",
      size: size || null,
      displayedPrice,
      personalized: hasPersonalization,
    };
    if (!apparelSize || !shopifyItem) return base;
    return {
      ...buildArtSpec({
        kit,
        item: shopifyItem,
        name: product.typography ? name : "",
        number: product.typography ? number : "",
        size: apparelSize,
      }),
      ...base,
    };
  }, [kit, product, shopifyItem, fontId, name, number, size, apparelSize, displayedPrice, hasPersonalization]);

  const nextLabel = (() => {
    if (hasPersonalization && !personalizationComplete) return "Complete name + number";
    if (!size) return "Choose a size";
    if (!confirmed) return "Confirm selection";
    if (!shopifyItem || !itemReady) return "Checkout opening soon";
    if (!personalizedCommerceReady) return "Personalized checkout opening soon";
    return `Checkout · $${displayedPrice}`;
  })();

  const goNext = () => {
    if (checkoutReady) {
      formRef.current?.submit();
      return;
    }
    if (hasPersonalization && !personalizationComplete) {
      document.getElementById("field-personalize")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!size) {
      document.getElementById("field-size")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!confirmed) {
      document.getElementById("field-confirm")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[560px] overflow-hidden bg-background pb-28 font-sans">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] opacity-[0.55]" aria-hidden>
        <LiquidBackdrop intensity="soft" />
      </div>

      <header className="relative z-10 px-5 pb-2 pt-5">
        <Link
          to={DEPARTMENT_TO[product.category]}
          params={{ slug: kit.slug }}
          className="place-line tap-44 inline-flex items-center text-muted-foreground transition-colors duration-micro ease-standard hover:text-foreground focus-ring"
        >
          ← Bayonne Athletics
        </Link>
        <p className="label-caps mt-4 text-muted-foreground">07002 · Fall 001</p>
        <h1 className="mt-2 font-kit text-[clamp(1.85rem,7vw,2.5rem)] leading-none tracking-wide">
          {product.name}
        </h1>
        <p className="mt-2 font-sans text-lg font-semibold tabular-nums text-garnet">
          {product.personalizedPrice
            ? `$${product.price} · $${product.personalizedPrice} personalized`
            : `$${product.price}`}
        </p>
        <p className="place-line mt-3 text-muted-foreground">{product.line}</p>
        {product.sizeChart === "apparel" && (
          <p className="label-caps mt-4 text-muted-foreground">Sizes S · M · L · XL · 2XL</p>
        )}
      </header>

      <div className="relative z-10">
        <section className="mt-6 px-5">
          <div className="mb-3 flex gap-2 overflow-x-auto">
            {!product.imageryPending && campaign?.views.front && (
              <button
                type="button"
                onClick={() => setMode("photos")}
                className={`tap-44 shrink-0 border px-4 py-2 text-sm font-semibold ${galleryMode === "photos" ? "border-foreground bg-foreground text-background" : "border-border bg-background"}`}
              >
                Model
              </button>
            )}
            <button
              type="button"
              onClick={() => setMode("product")}
              className={`tap-44 shrink-0 border px-4 py-2 text-sm font-semibold ${galleryMode === "product" ? "border-foreground bg-foreground text-background" : "border-border bg-background"}`}
            >
              Product
            </button>
            {product.nameNumber && (
              <button
                type="button"
                onClick={() => setMode("customize")}
                className={`tap-44 shrink-0 border px-4 py-2 text-sm font-semibold ${galleryMode === "customize" ? "border-foreground bg-foreground text-background" : "border-border bg-background"}`}
              >
                Customize
              </button>
            )}
          </div>

          {!product.imageryPending && (
            <div className={`mb-3 grid gap-2 ${activeViews.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
              {activeViews.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`border px-2 py-2.5 text-center text-sm font-semibold capitalize tap-44 ${view === v ? "border-foreground bg-foreground text-background" : "border-border bg-background"}`}
                >
                  {v === "three-quarter" ? "¾" : v}
                </button>
              ))}
            </div>
          )}

          <div className="overflow-hidden border border-border bg-secondary/40">
            {product.imageryPending ? (
              <ComingSoonMedia name={product.name} className="aspect-[4/5]" />
            ) : (
              <ProductCanvas
                view={view}
                frontSrc={frontSrc}
                {...(threeQuarterSrc ? { threeQuarterSrc } : {})}
                secondarySrc={secondarySrc}
                fontId={fontId}
                name={name}
                number={number}
                productLabel={product.name}
                showLettering={galleryMode === "customize" && product.nameNumber}
                lettering={lettering}
                tier={galleryMode === "photos" ? "campaign" : "truth"}
                showNameBadge={galleryMode === "photos" && product.nameNumber}
                printScale={1}
                confirmFlash={false}
              />
            )}
          </div>
        </section>

        <section className="mt-6 px-5">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description" className="border-border">
              <AccordionTrigger className="place-line text-xs uppercase tracking-[0.14em] hover:no-underline">
                Description
              </AccordionTrigger>
              <AccordionContent>
                <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {copy?.body ?? product.blurb}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping" className="border-border">
              <AccordionTrigger className="place-line text-xs uppercase tracking-[0.14em] hover:no-underline">
                Shipping & returns
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Made to order for Fall 001. Personalized pieces cannot be changed after checkout.
                  Standard pieces follow the same production window.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {product.nameNumber && (
          <section id="field-personalize" className="mt-8 px-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-bold tracking-tight">Make the jersey yours.</h2>
              <span className="text-sm font-semibold tabular-nums text-garnet">
                {hasPersonalization ? `$${product.personalizedPrice ?? product.price}` : `+$${(product.personalizedPrice ?? product.price) - product.price}`}
              </span>
            </div>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              Optional. Leave both fields blank for the $78 club jersey, or add your name and number for the personalized version.
            </p>

            <div className="mt-5 grid grid-cols-[7rem_1fr] gap-3">
              <OutlinedField
                id="field-number"
                label="00"
                value={number}
                maxLength={2}
                inputMode="numeric"
                placeholder="21"
                onChange={(v) => setNumber(sanitizeNumber(v))}
                counter={`${number.length} / 2`}
                fontFamily={font.cssFamily}
              />
              <OutlinedField
                id="field-name"
                label="Name"
                value={name}
                maxLength={nameMax}
                placeholder="BROADWAY"
                onChange={(v) => setName(sanitizeName(v, nameMax))}
                counter={`${name.length} / ${nameMax}`}
                fontFamily={font.cssFamily}
              />
            </div>

            {hasPersonalization && !personalizationComplete && (
              <p className="mt-3 text-sm text-garnet">Add both a name and a valid number, or clear both fields.</p>
            )}

            <button
              type="button"
              onClick={() => {
                setName("");
                setNumber("");
              }}
              disabled={!hasPersonalization}
              className="mt-3 text-sm underline underline-offset-4 disabled:opacity-40"
            >
              Clear personalization
            </button>

            <div className="mt-8">
              <h3 className="text-lg font-bold tracking-tight">Lettering font</h3>
              <p className="mt-1 text-sm text-muted-foreground">Four kit faces. Forge is the USA-style default.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {FONTS.map((f) => {
                  const on = fontId === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        setFontId(f.id);
                        setMode("customize");
                      }}
                      className={`border px-3 py-3 text-left tap-44 ${on ? "border-foreground bg-foreground text-background" : "border-border bg-background"}`}
                    >
                      <span className="block text-xs font-semibold uppercase tracking-wide opacity-70">{f.label}</span>
                      <span className="mt-1 block text-2xl tracking-wide" style={{ fontFamily: f.cssFamily }}>
                        {f.sample}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section id="field-size" className="mt-8 px-5">
          <h2 className="text-xl font-bold tracking-tight">Choose your size.</h2>

          {product.sizeChart === "apparel" && (
            <div className="mt-4 grid grid-cols-5 gap-2">
              {SIZES.map((s) => {
                const available = shopifyItem ? Boolean(variantIdFor(kit, shopifyItem, s)) : true;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={!available && Boolean(shopifyItem)}
                    onClick={() => setSize(s)}
                    className={`border py-3 text-sm font-semibold tap-44 ${size === s ? "border-foreground bg-secondary" : "border-transparent bg-secondary/70"} disabled:cursor-not-allowed disabled:opacity-35`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          )}

          {product.sizeChart === "hat" && (
            <div className="mt-4 grid grid-cols-1 gap-2">
              {HAT_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`border py-3.5 text-sm font-semibold tap-44 ${size === s ? "border-foreground bg-secondary" : "border-transparent bg-secondary/70"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {product.sizeChart === "sock" && (
            <div className="mt-4 grid grid-cols-1 gap-2">
              {SOCK_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`border py-3.5 text-sm font-semibold tap-44 ${size === s ? "border-foreground bg-secondary" : "border-transparent bg-secondary/70"}`}
                >
                  Shoe size {s}
                </button>
              ))}
            </div>
          )}

          {product.sizeChart === "shoe" && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {SHOE_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`border py-3 text-sm font-semibold tabular-nums tap-44 ${size === s ? "border-foreground bg-secondary" : "border-transparent bg-secondary/70"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {(product.sizeChart === "apparel" || product.sizeChart === "hat") && (
            <button
              type="button"
              onClick={() => setChartOpen((o) => !o)}
              className="mt-3 text-sm underline underline-offset-4 tap-44 focus-ring"
            >
              {chartOpen ? "Hide size guide" : "Size guide"}
            </button>
          )}

          {chartOpen && product.sizeChart === "apparel" && (
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
          )}

          {chartOpen && product.sizeChart === "hat" && (
            <table className="mt-3 w-full border border-border text-sm">
              <tbody>
                {HAT_SIZE_CHART.map((row) => (
                  <tr key={row.size} className="border-t border-border">
                    <td className="px-3 py-2 font-semibold">{row.size}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section id="field-confirm" className="mt-8 border-t border-border px-5 pb-4 pt-6">
          <label className="flex items-start gap-3 text-sm leading-snug">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]"
            />
            <span>
              {hasPersonalization
                ? "I’ve checked the spelling, number and size. Personalized pieces cannot be changed after checkout."
                : "I’ve checked the product and size selection."}
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
            <input type="hidden" name="properties[Collection]" value="Bayonne Athletics Fall 001" />
            <input type="hidden" name="properties[Product]" value={product.name} />
            {product.typography && <input type="hidden" name="properties[Font]" value={font.label} />}
            {product.typography && <input type="hidden" name="properties[Name]" value={name} />}
            {product.typography && <input type="hidden" name="properties[Number]" value={number} />}
            <input type="hidden" name="properties[Size]" value={size} />
            <input type="hidden" name="properties[Displayed Price]" value={`$${displayedPrice}`} />
            <input type="hidden" name="properties[_ArtSpec]" value={encodeArtSpec(artSpec)} />
            <input type="hidden" name="properties[_Confirmed]" value="yes" />
          </form>

          <SyncNote
            sync={sync}
            hasShopifyItem={Boolean(shopifyItem)}
            personalizedBlocked={hasPersonalization && !personalizedCommerceReady}
          />
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[560px] flex-col gap-1.5 px-5 py-3">
          <button
            type="button"
            disabled={Boolean((shopifyItem && !itemReady) || (hasPersonalization && !personalizedCommerceReady)) && Boolean(size && confirmed)}
            onClick={goNext}
            className="w-full bg-foreground py-4 text-sm font-bold uppercase tracking-wide text-background transition-opacity duration-micro ease-standard hover:opacity-90 focus-ring disabled:cursor-not-allowed disabled:opacity-45 tap-44"
          >
            {nextLabel}
          </button>
          <p className="text-center text-xs leading-snug text-muted-foreground">
            {product.nameNumber
              ? "Base jersey $78 · personalized jersey $98 · preview updates as you type"
              : "Fall 001 · product selection saved when checkout listing opens"}
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
        aria-describedby={`${id}-counter`}
      />
      <span id={`${id}-counter`} className="self-end text-[0.7rem] tabular-nums text-muted-foreground">
        {counter}
      </span>
    </label>
  );
}

function SyncNote({
  sync,
  hasShopifyItem,
  personalizedBlocked,
}: {
  sync: ShopifySyncStatus;
  hasShopifyItem: boolean;
  personalizedBlocked: boolean;
}) {
  if (personalizedBlocked) {
    return (
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Your personalized design is ready. The $98 personalized checkout variant still needs to be synced before ordering.
      </p>
    );
  }
  if (!hasShopifyItem) {
    return (
      <p className="mt-4 text-center text-sm text-muted-foreground">
        This product page is ready. Checkout unlocks when its listing is synced.
      </p>
    );
  }
  if (sync.top || sync.bottom || sync.set) return null;
  return (
    <p className="mt-4 text-center text-sm text-muted-foreground">
      Core apparel sizes are still opening. You can finish the selection now.
    </p>
  );
}
