import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type HTMLAttributes } from "react";

import { ProductZoomGallery } from "@/components/ProductZoomGallery";
import { ComingSoonMedia } from "@/components/ComingSoonMedia";
import { galleryShots } from "@/lib/imageRegistry";
import { MotionMark } from "@/components/brand/BrandMarks";
import { StoreFooter } from "@/components/brand/StoreFooter";
import { StoreNav } from "@/components/brand/StoreNav";
import { ProductCanvas } from "@/components/ProductCanvas";
import {
  FONTS,
  HAT_SIZE_CHART,
  HAT_SIZES,
  fontsStylesheetHref,
  fontById,
  letteringFor,
  productById,
  type FontId,
} from "@/lib/catalog";
import { SIZES, SIZE_CHART, sanitizeName, sanitizeNumber } from "@/lib/kit";
import { SOCK_SIZES, storeIsOpen } from "@/lib/checkout";
import { formatShoeOption, shoeRunsFor } from "@/lib/footwear";
import { createCheckoutSession } from "@/lib/checkout.functions";
import { DEPARTMENT_TO } from "@/lib/departments";
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

function ProductListingPage() {
  const { kit } = TeamSlugRoute.useLoaderData();
  const { product } = Route.useLoaderData();
  const startCheckout = useServerFn(createCheckoutSession);

  const copy = productCopyFor(product.id);
  const shots = product.imageryPending ? [] : galleryShots(product.id);
  const [galleryMode, setGalleryMode] = useState<GalleryMode>("photos");
  const [fontId, setFontId] = useState<FontId>("forge");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [size, setSize] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const font = fontById(fontId);
  const lettering = letteringFor(product);
  const nameMax = kit.rules.nameMaxChars;
  const open = storeIsOpen();

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

  const checkoutReady = Boolean(personalizationComplete && size && confirmed && open);

  const setMode = (mode: GalleryMode) => {
    setGalleryMode(mode);
  };

  const nextLabel = (() => {
    if (!open) return "Store closed";
    if (checkoutBusy) return "Redirecting to checkout";
    if (hasPersonalization && !personalizationComplete) return "Complete name + number";
    if (!size) return "Choose a size";
    if (!confirmed) return "Confirm selection";
    return `Checkout · $${displayedPrice}`;
  })();

  const goNext = async () => {
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
      return;
    }
    if (!checkoutReady) return;

    setCheckoutBusy(true);
    setCheckoutError(null);
    try {
      const session = await startCheckout({
        data: {
          productId: product.id,
          size,
          name: product.nameNumber ? name : undefined,
          number: product.nameNumber ? number : undefined,
          fontId: product.typography ? fontId : undefined,
        },
      });
      window.location.assign(session.url);
    } catch (error) {
      setCheckoutBusy(false);
      setCheckoutError(error instanceof Error ? error.message : "Checkout could not start.");
    }
  };

  return (
    <div className="studio-field min-h-screen text-ink">
      <StoreNav />
      <main className="mx-auto w-full max-w-[1280px] px-4 pb-28 sm:px-10 lg:pb-16">
        <p className="place-line pt-6">
          <Link
            to={DEPARTMENT_TO[product.category]}
            params={{ slug: kit.slug }}
            className="tap-44 inline-flex items-center text-ink/45 transition-colors duration-micro ease-standard hover:text-ink focus-ring"
          >
            {product.category === "match" ? "1936 Match" : product.line.split(" · ")[0]}
          </Link>
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <section className="lg:sticky lg:top-24">
            {product.nameNumber && (
              <div className="mb-3 flex gap-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setMode("photos")}
                  className={`tap-44 shrink-0 border px-4 py-2 text-sm ${galleryMode !== "customize" ? "border-ink bg-ink text-bone" : "border-ink/20 bg-transparent"}`}
                >
                  Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setMode("customize")}
                  className={`tap-44 shrink-0 border px-4 py-2 text-sm ${galleryMode === "customize" ? "border-ink bg-ink text-bone" : "border-ink/20 bg-transparent"}`}
                >
                  Put your name on it
                </button>
              </div>
            )}

            <div className="overflow-hidden bg-[color-mix(in_oklab,var(--paper)_70%,white)]">
              {product.imageryPending ? (
                <ComingSoonMedia name={product.name} className="aspect-[4/5]" />
              ) : galleryMode === "customize" && product.nameNumber ? (
                <ProductCanvas
                  view="back"
                  frontSrc={product.previews.front}
                  secondarySrc={product.previews.secondary}
                  fontId={fontId}
                  name={name}
                  number={number}
                  productLabel={product.name}
                  showLettering
                  lettering={lettering}
                  tier="truth"
                  showNameBadge={false}
                  printScale={1}
                  confirmFlash={false}
                  className="aspect-square"
                />
              ) : (
                <ProductZoomGallery
                  shots={shots.map((shot) => ({
                    ...shot,
                    alt: shot.alt || `${product.name}`,
                  }))}
                  productName={product.name}
                />
              )}
            </div>
            {galleryMode === "customize" && product.nameNumber && (
              <p className="place-line mt-3 text-ink/40">Blank back · live name and number</p>
            )}
          </section>

          <section className="lg:pt-2">
            <p className="place-line">07002 · Fall 001</p>
            <h1 className="type-editorial mt-3 text-[clamp(2rem,4.5vw,3.1rem)] leading-[1.05] text-ink">
              {product.name}
            </h1>
            <p className="mt-4 font-sans text-lg tabular-nums text-ink">
              {product.personalizedPrice
                ? `$${product.price} · $${product.personalizedPrice} personalized`
                : `$${product.price}`}
            </p>
            <p className="place-line mt-4">{product.line}</p>
            <MotionMark className="mt-6 block text-garnet" />
            {product.sizeChart === "apparel" && (
              <p className="place-line mt-6">Sizes S · M · L · XL · 2XL</p>
            )}
            <Accordion type="single" collapsible className="mt-8 w-full">
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
                  Standard $10 (5–8 business days). Express $20 (2–3). Complimentary standard over $175.
                  Made to order — ships after Fall 001 production. Personalized pieces cannot be changed
                  after checkout.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        {product.nameNumber && (
          <section id="field-personalize" className="mt-10">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="type-editorial text-2xl text-ink">
                {copy?.personalizeHeading ?? "Put your name on it."}
              </h2>
              <span className="text-sm font-semibold tabular-nums text-garnet">
                {hasPersonalization ? `$${product.personalizedPrice ?? product.price}` : `+$${(product.personalizedPrice ?? product.price) - product.price}`}
              </span>
            </div>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              {copy?.personalizeHelper ??
                "Add the name and number exactly as you want them printed on the back. Leave both blank for the $78 club jersey."}
            </p>

            <div className="mt-5 grid grid-cols-[7rem_1fr] gap-3">
              <OutlinedField
                id="field-number"
                label="00"
                value={number}
                maxLength={2}
                inputMode="numeric"
                placeholder="21"
                onChange={(v) => {
                  setNumber(sanitizeNumber(v));
                  setMode("customize");
                }}
                counter={`${number.length} / 2`}
                fontFamily={font.cssFamily}
              />
              <OutlinedField
                id="field-name"
                label="Name"
                value={name}
                maxLength={nameMax}
                placeholder="BROADWAY"
                onChange={(v) => {
                  setName(sanitizeName(v, nameMax));
                  setMode("customize");
                }}
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
              <h3 className="type-editorial text-xl text-ink">Lettering font</h3>
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

        <section id="field-size" className="mt-10">
          <h2 className="type-editorial text-2xl text-ink">Choose your size.</h2>

          {product.sizeChart === "apparel" && (
            <div className="mt-4 grid grid-cols-5 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`border py-3 text-sm font-semibold tap-44 ${size === s ? "border-foreground bg-secondary" : "border-transparent bg-secondary/70"}`}
                >
                  {s}
                </button>
              ))}
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
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                Men’s US. Women’s is +1.5 — only sizes in stock.
              </p>
              {shoeRunsFor(product.id).length === 0 ? (
                <p className="mt-4 text-sm text-garnet">This pair is currently unavailable.</p>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {shoeRunsFor(product.id).map((row) => (
                    <button
                      key={row.upc}
                      type="button"
                      onClick={() => setSize(row.men)}
                      className={`border py-3.5 text-sm font-semibold tabular-nums tap-44 ${size === row.men ? "border-foreground bg-secondary" : "border-transparent bg-secondary/70"}`}
                    >
                      {formatShoeOption(row)}
                    </button>
                  ))}
                </div>
              )}
              {shoeRunsFor(product.id).length > 0 && (
                <table className="mt-4 w-full border border-border text-sm">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase">Men</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase">Women</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoeRunsFor(product.id).map((row) => (
                      <tr key={row.upc} className="border-t border-border">
                        <td className="px-3 py-2 font-semibold tabular-nums">{row.men}</td>
                        <td className="px-3 py-2 tabular-nums text-muted-foreground">{row.women}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
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

        <section id="field-confirm" className="mt-10 border-t border-ink/10 pb-4 pt-6">
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
          {checkoutError && (
            <p className="mt-4 text-sm text-garnet" role="alert">
              {checkoutError}
            </p>
          )}
        </section>

            <div className="mt-8 hidden lg:block">
              <button
                type="button"
                disabled={checkoutBusy || !open}
                onClick={() => void goNext()}
                className="w-full bg-ink py-4 font-sans text-xs font-medium uppercase tracking-[0.22em] text-bone transition-opacity duration-micro ease-standard hover:opacity-90 focus-ring disabled:cursor-not-allowed disabled:opacity-45 tap-44"
              >
                {nextLabel}
              </button>
              <p className="mt-3 text-center text-xs leading-snug text-ink/45">
                {product.nameNumber
                  ? "Base $78 · personalized $98 · Stripe checkout"
                  : "Standard $10 · Express $20 · free standard over $175"}
              </p>
            </div>
          </section>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-1.5 px-5 py-3">
          <button
            type="button"
            disabled={checkoutBusy || !open}
            onClick={() => void goNext()}
            className="w-full bg-ink py-4 font-sans text-xs font-medium uppercase tracking-[0.22em] text-bone transition-opacity duration-micro ease-standard hover:opacity-90 focus-ring disabled:cursor-not-allowed disabled:opacity-45 tap-44"
          >
            {nextLabel}
          </button>
          <p className="text-center text-xs leading-snug text-ink/45">
            {product.nameNumber
              ? "Base $78 · personalized $98 · Stripe checkout"
              : "Standard $10 · Express $20 · free standard over $175"}
          </p>
        </div>
      </div>
      <StoreFooter className="hidden lg:block" />
    </div>
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
