/**
 * Shopify storefront helpers for Team Customs.
 *
 * Order path:
 *   Configurator → POST {domain}/cart/add (variant + properties)
 *   → Shopify Checkout → paid order → fulfillment sync
 *   → ops / personalizer applies Name + Number from line properties → print
 *
 * Products must be print-partner → Shopify synced.
 * Shopify-only products never trigger print fulfillment.
 * Listing map: docs/LISTING_MAP.md
 */

import { PRODUCTS } from "./catalog";
import type { Item, KitConfig, Size } from "./kit";
import { SIZES } from "./kit";

const SIZE_SET = new Set<string>(SIZES);
const HAT_SIZE_SET = new Set(["S/M", "L/XL"]);

/** Prefer personalization-capable style options when a product has Style + Size. */
const PERSONALIZATION_STYLE_HINTS = [
  "custom name + number",
  "custom name",
  "name number",
  "build your crest",
  "personalization",
  "personalised",
  "personalized",
];

type ShopifyJsVariant = {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string | null;
  available: boolean;
  price: number; // cents
};

type ShopifyJsProduct = {
  id: number;
  title: string;
  handle: string;
  available: boolean;
  variants: ShopifyJsVariant[];
  options: Array<{ name: string; position: number; values: string[] }>;
};

export type ShopifySyncStatus = {
  top: boolean;
  bottom: boolean;
  set: boolean;
};

/** Size label → Shopify variant id (apparel + hat labels). */
export type ListingVariantMap = Record<string, string>;

export type CatalogListingSync = {
  handle: string;
  ready: boolean;
  variants: ListingVariantMap;
  price: number | null;
};

export type CatalogListings = Record<string, CatalogListingSync>;

/** Launch-critical handles — store banner / go-live gate. */
export const LAUNCH_HANDLES = [
  "bayonne-bees-jersey",
  "bayonne-bees-shorts",
  "bayonne-bees-full-set",
] as const;

export function shopifySynced(status: ShopifySyncStatus) {
  return status.top || status.bottom || status.set;
}

export function launchCatalogReady(listings: CatalogListings) {
  return LAUNCH_HANDLES.every((h) => listings[h]?.ready);
}

function normalizeSize(raw: string | null | undefined): Size | null {
  if (!raw) return null;
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (SIZE_SET.has(cleaned)) return cleaned as Size;
  const aliases: Record<string, Size> = {
    XXS: "2XS",
    "2X": "2XL",
    XXL: "2XL",
    XXXL: "3XL",
    "3X": "3XL",
  };
  return aliases[cleaned] ?? null;
}

/** Apparel sizes + Crest Cap S/M · L/XL. */
function normalizeSizeLabel(raw: string | null | undefined): string | null {
  const apparel = normalizeSize(raw);
  if (apparel) return apparel;
  if (!raw) return null;
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (cleaned === "S/M" || cleaned === "SM" || cleaned === "S-M") return "S/M";
  if (cleaned === "L/XL" || cleaned === "LXL" || cleaned === "L-XL") return "L/XL";
  if (HAT_SIZE_SET.has(cleaned)) return cleaned;
  return null;
}

function looksPersonalized(style: string | null | undefined) {
  if (!style) return false;
  const s = style.toLowerCase();
  return PERSONALIZATION_STYLE_HINTS.some((hint) => s.includes(hint));
}

function looksNonPersonalized(style: string | null | undefined) {
  if (!style) return false;
  const s = style.toLowerCase();
  return (
    s.includes("standard") ||
    s.includes("clean") ||
    s.includes("no custom") ||
    s.includes("no personalization")
  );
}

function sizeOptionIndex(product: ShopifyJsProduct): 1 | 2 | 3 {
  const sizeOpt = product.options.find((o) => /size/i.test(o.name));
  if (sizeOpt?.position === 1 || sizeOpt?.position === 2 || sizeOpt?.position === 3) {
    return sizeOpt.position as 1 | 2 | 3;
  }
  if (product.options.length <= 1) return 1;
  return Math.min(product.options.length, 3) as 1 | 2 | 3;
}

function styleOptionIndex(product: ShopifyJsProduct, sizeIdx: 1 | 2 | 3): 1 | 2 | 3 | null {
  const styleOpt = product.options.find((o) => /style|edition|type|custom/i.test(o.name));
  if (!styleOpt) {
    const other = ([1, 2, 3] as const).find((i) => i !== sizeIdx && product.options[i - 1]);
    return other ?? null;
  }
  if (styleOpt.position === 1 || styleOpt.position === 2 || styleOpt.position === 3) {
    return styleOpt.position as 1 | 2 | 3;
  }
  return null;
}

function optionAt(v: ShopifyJsVariant, idx: 1 | 2 | 3) {
  if (idx === 1) return v.option1;
  if (idx === 2) return v.option2;
  return v.option3;
}

/**
 * Map Shopify product variants → size label → variant id string.
 * Prefers personalization-capable styles; skips blank/non-custom styles when alternatives exist.
 */
export function variantMapFromProduct(product: ShopifyJsProduct): ListingVariantMap {
  const sizeIdx = sizeOptionIndex(product);
  const styleIdx = styleOptionIndex(product, sizeIdx);

  const personalized = product.variants.filter((v) => {
    if (!styleIdx) return true;
    const style = optionAt(v, styleIdx);
    if (looksNonPersonalized(style)) return false;
    return looksPersonalized(style) || !looksNonPersonalized(style);
  });

  const pool =
    personalized.length > 0
      ? personalized
      : product.variants.filter((v) => {
          if (!styleIdx) return true;
          return !looksNonPersonalized(optionAt(v, styleIdx));
        });

  const map: ListingVariantMap = {};
  for (const v of pool.length ? pool : product.variants) {
    const size = normalizeSizeLabel(optionAt(v, sizeIdx));
    if (!size) continue;
    if (!map[size] || v.available) map[size] = String(v.id);
  }
  return map;
}

function apparelMapFromListing(map: ListingVariantMap): Partial<Record<Size, string>> {
  const out: Partial<Record<Size, string>> = {};
  for (const s of SIZES) {
    if (map[s]) out[s] = map[s];
  }
  return out;
}

export async function fetchShopifyProduct(
  domain: string,
  handle: string,
): Promise<ShopifyJsProduct | null> {
  const base = domain.replace(/\/$/, "");
  const url = `${base}/products/${encodeURIComponent(handle)}.js`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as ShopifyJsProduct;
  } catch {
    return null;
  }
}

function hasAnyVariants(map: ListingVariantMap | Partial<Record<Size, string>> | undefined) {
  return Boolean(map && Object.keys(map).length > 0);
}

function dollarsFromProduct(product: ShopifyJsProduct | null) {
  const first = product?.variants?.[0];
  if (!first) return null;
  // Shopify .js prices are in cents
  return Math.round(first.price / 100);
}

/**
 * Resolve size→variant maps for the kit + every catalog listing handle.
 * Static kit maps win for core items; catalog handles resolve independently for checkout.
 */
export async function resolveKitShopify(kit: KitConfig): Promise<{
  kit: KitConfig;
  sync: ShopifySyncStatus;
  listings: CatalogListings;
}> {
  const { domain, productHandles, topVariants, bottomVariants, setVariants } = kit.shopify;

  async function resolveHandle(
    handle: string,
    hardcoded?: Partial<Record<Size, string>>,
  ): Promise<CatalogListingSync> {
    if (hardcoded && hasAnyVariants(hardcoded)) {
      const variants: ListingVariantMap = { ...hardcoded };
      return { handle, ready: true, variants, price: null };
    }
    const product = await fetchShopifyProduct(domain, handle);
    if (!product) {
      return { handle, ready: false, variants: {}, price: null };
    }
    const variants = variantMapFromProduct(product);
    return {
      handle,
      ready: hasAnyVariants(variants),
      variants,
      price: dollarsFromProduct(product),
    };
  }

  const catalogHandles = [...new Set(PRODUCTS.map((p) => p.handle))];
  const resolved = await Promise.all(catalogHandles.map((h) => {
    if (h === productHandles?.top) return resolveHandle(h, topVariants);
    if (h === productHandles?.bottom) return resolveHandle(h, bottomVariants);
    if (h === productHandles?.set) return resolveHandle(h, setVariants);
    return resolveHandle(h);
  }));

  const listings: CatalogListings = {};
  for (const row of resolved) listings[row.handle] = row;

  const topListing = productHandles?.top ? listings[productHandles.top] : undefined;
  const bottomListing = productHandles?.bottom ? listings[productHandles.bottom] : undefined;
  const setListing = productHandles?.set ? listings[productHandles.set] : undefined;

  const topMap =
    hasAnyVariants(topVariants) ? topVariants : apparelMapFromListing(topListing?.variants ?? {});
  const bottomMap =
    hasAnyVariants(bottomVariants)
      ? bottomVariants
      : apparelMapFromListing(bottomListing?.variants ?? {});
  const setMap =
    hasAnyVariants(setVariants) ? setVariants : apparelMapFromListing(setListing?.variants ?? {});

  const pricing = { ...kit.pricing };
  if (topListing?.price != null) pricing.top = topListing.price;
  if (bottomListing?.price != null) pricing.bottom = bottomListing.price;
  if (setListing?.price != null) pricing.set = setListing.price;

  return {
    kit: {
      ...kit,
      pricing,
      shopify: {
        ...kit.shopify,
        topVariants: topMap,
        bottomVariants: bottomMap,
        setVariants: setMap,
      },
    },
    sync: {
      top: hasAnyVariants(topMap),
      bottom: hasAnyVariants(bottomMap),
      set: hasAnyVariants(setMap),
    },
    listings,
  };
}

/** Classic Shopify cart/add endpoint (cross-origin form POST → checkout). */
export function cartAddAction(domain: string) {
  return `${domain.replace(/\/$/, "")}/cart/add`;
}

export function itemSyncReady(sync: ShopifySyncStatus, item: Item): boolean {
  if (item === "top") return sync.top;
  if (item === "bottom") return sync.bottom;
  return sync.set;
}

export function listingVariantId(
  listings: CatalogListings,
  handle: string,
  size: string,
): string | null {
  return listings[handle]?.variants[size] ?? null;
}
