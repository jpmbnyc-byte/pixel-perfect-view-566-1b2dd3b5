/**
 * Shopify storefront helpers for Team Customs.
 *
 * Order path:
 *   Configurator → POST {domain}/cart/add (variant + properties)
 *   → Shopify Checkout → paid order → Printful sync
 *   → "Personalization required" draft → ops confirms Name/Number → print
 *
 * Products must be Printful→Shopify synced (SKU like `9223054_33938`).
 * Shopify-only products never trigger Printful fulfillment.
 */

import type { Item, KitConfig, Size } from "./kit";
import { SIZES } from "./kit";

const SIZE_SET = new Set<string>(SIZES);

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

export function shopifySynced(status: ShopifySyncStatus) {
  return status.top || status.bottom || status.set;
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
 * Map Shopify product variants → size → variant id string.
 * Prefers Printful personalization styles; skips blank/non-custom styles when alternatives exist.
 */
export function variantMapFromProduct(product: ShopifyJsProduct): Partial<Record<Size, string>> {
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

  const map: Partial<Record<Size, string>> = {};
  for (const v of pool.length ? pool : product.variants) {
    const size = normalizeSize(optionAt(v, sizeIdx));
    if (!size) continue;
    if (!map[size] || v.available) map[size] = String(v.id);
  }
  return map;
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

function hasAnyVariants(map: Partial<Record<Size, string>> | undefined) {
  return Boolean(map && Object.keys(map).length > 0);
}

function dollarsFromProduct(product: ShopifyJsProduct | null) {
  const first = product?.variants?.[0];
  if (!first) return null;
  // Shopify .js prices are in cents
  return Math.round(first.price / 100);
}

/**
 * Resolve size→variant maps for a kit.
 * Static maps in kit config win; otherwise fetch Printful-synced products by handle.
 */
export async function resolveKitShopify(kit: KitConfig): Promise<{
  kit: KitConfig;
  sync: ShopifySyncStatus;
}> {
  const { domain, productHandles, topVariants, bottomVariants, setVariants } = kit.shopify;

  async function resolveItem(
    hardcoded: Partial<Record<Size, string>>,
    handle: string | undefined,
  ): Promise<{ map: Partial<Record<Size, string>>; product: ShopifyJsProduct | null }> {
    if (hasAnyVariants(hardcoded)) return { map: hardcoded, product: null };
    if (!handle) return { map: {}, product: null };
    const product = await fetchShopifyProduct(domain, handle);
    if (!product) return { map: {}, product: null };
    return { map: variantMapFromProduct(product), product };
  }

  const [topRes, bottomRes, setRes] = await Promise.all([
    resolveItem(topVariants, productHandles?.top),
    resolveItem(bottomVariants, productHandles?.bottom),
    resolveItem(setVariants, productHandles?.set),
  ]);

  const pricing = { ...kit.pricing };
  const topPrice = dollarsFromProduct(topRes.product);
  const bottomPrice = dollarsFromProduct(bottomRes.product);
  const setPrice = dollarsFromProduct(setRes.product);
  if (topPrice != null) pricing.top = topPrice;
  if (bottomPrice != null) pricing.bottom = bottomPrice;
  if (setPrice != null) pricing.set = setPrice;

  return {
    kit: {
      ...kit,
      pricing,
      shopify: {
        ...kit.shopify,
        topVariants: topRes.map,
        bottomVariants: bottomRes.map,
        setVariants: setRes.map,
      },
    },
    sync: {
      top: hasAnyVariants(topRes.map),
      bottom: hasAnyVariants(bottomRes.map),
      set: hasAnyVariants(setRes.map),
    },
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
