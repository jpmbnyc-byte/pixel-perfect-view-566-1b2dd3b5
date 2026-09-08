/**
 * Catalog-priced checkout. Client never supplies a dollar amount.
 * Stripe Checkout (hosted redirect) collects email, address, shipping, pay.
 */

import { FONTS, HAT_SIZES, productById, type CatalogProduct, type FontId } from "@/lib/catalog";
import { shoeRunFor, shoeSizeAllowed } from "@/lib/footwear";
import { SIZES, countdownParts, sanitizeName, sanitizeNumber } from "@/lib/kit";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { validatePersonalization } from "@/personalize/validate";

export const CHECKOUT_CURRENCY = "usd";
export const FREE_STANDARD_CENTS = 17_500;
export const STANDARD_SHIPPING_CENTS = 1_000;
export const EXPRESS_SHIPPING_CENTS = 2_000;
/** Dashboard label for this storefront checkout flow. */
export const INTEGRATION_IDENTIFIER = "bayonne_chk_kfmqrwtx";

export const SOCK_SIZES = ["7–9.5"] as const;

export type CheckoutInput = {
  productId: string;
  size: string;
  name?: string;
  number?: string;
  fontId?: string;
};

export type ResolvedCheckout = {
  product: CatalogProduct;
  size: string;
  unitAmount: number;
  personalized: boolean;
  name: string;
  number: string;
  fontId: FontId | null;
  fontLabel: string | null;
  description: string;
};

export type CheckoutResolveResult =
  | { ok: true; value: ResolvedCheckout }
  | { ok: false; error: string };

export function storeIsOpen(now = Date.now()) {
  return BAYONNE_BEES_KIT.status === "live" && countdownParts(BAYONNE_BEES_KIT.closesAt, now) !== null;
}

export function sizeAllowed(product: CatalogProduct, size: string) {
  if (product.sizeChart === "apparel") return (SIZES as readonly string[]).includes(size);
  if (product.sizeChart === "hat") return (HAT_SIZES as readonly string[]).includes(size);
  if (product.sizeChart === "shoe") return shoeSizeAllowed(product.id, size);
  if (product.sizeChart === "sock") return (SOCK_SIZES as readonly string[]).includes(size);
  return false;
}

export function unitAmountCents(product: CatalogProduct, personalized: boolean) {
  const dollars =
    personalized && product.personalizedPrice ? product.personalizedPrice : product.price;
  return dollars * 100;
}

export function shippingOptionsFor(subtotalCents: number) {
  const standardFree = subtotalCents >= FREE_STANDARD_CENTS;
  return [
    {
      id: "standard",
      displayName: standardFree ? "Standard — complimentary" : "Standard",
      amount: standardFree ? 0 : STANDARD_SHIPPING_CENTS,
      minDays: 5,
      maxDays: 8,
    },
    {
      id: "express",
      displayName: "Express",
      amount: EXPRESS_SHIPPING_CENTS,
      minDays: 2,
      maxDays: 3,
    },
  ] as const;
}

export function resolveCheckout(input: CheckoutInput): CheckoutResolveResult {
  const product = productById(input.productId);
  if (!product) return { ok: false, error: "That piece is not in Fall 001." };

  const size = input.size.trim();
  if (!sizeAllowed(product, size)) return { ok: false, error: "Choose a valid size." };

  const name = product.nameNumber ? sanitizeName(input.name ?? "", 12) : "";
  const number = product.nameNumber ? sanitizeNumber(input.number ?? "") : "";
  const personalized = Boolean(name || number);

  if (personalized) {
    if (!product.nameNumber) return { ok: false, error: "This piece is not customizable." };
    if (!name || !number) {
      return { ok: false, error: "Add both a name and a number, or leave both blank." };
    }
    const issues = validatePersonalization({ name, number });
    if (issues.length) return { ok: false, error: issues[0]!.message };
  }

  let fontId: FontId | null = null;
  let fontLabel: string | null = null;
  if (personalized && product.typography) {
    const match = FONTS.find((f) => f.id === input.fontId) ?? FONTS.find((f) => f.id === "forge")!;
    fontId = match.id;
    fontLabel = match.label;
  }

  const unitAmount = unitAmountCents(product, personalized);
  const shoe = product.sizeChart === "shoe" ? shoeRunFor(product.id, size) : undefined;
  const details = [
    shoe ? `${shoe.men}M · ${shoe.women}W` : `Size ${size}`,
    personalized ? `${name} ${number}` : null,
    fontLabel,
    product.line,
    shoe ? `UPC ${shoe.upc}` : null,
  ].filter(Boolean);

  return {
    ok: true,
    value: {
      product,
      size,
      unitAmount,
      personalized,
      name,
      number,
      fontId,
      fontLabel,
      description: details.join(" · "),
    },
  };
}

export function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}
