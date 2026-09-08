import { describe, expect, it } from "vitest";
import {
  FREE_STANDARD_CENTS,
  resolveCheckout,
  shippingOptionsFor,
  unitAmountCents,
} from "@/lib/checkout";
import { productById } from "@/lib/catalog";

describe("Stripe checkout pricing", () => {
  it("prices the Heritage Jersey from the catalog, never the client", () => {
    const blank = resolveCheckout({ productId: "heritage-jersey", size: "M" });
    const lettered = resolveCheckout({
      productId: "heritage-jersey",
      size: "L",
      name: "BROADWAY",
      number: "21",
      fontId: "forge",
    });
    expect(blank.ok).toBe(true);
    expect(lettered.ok).toBe(true);
    if (!blank.ok || !lettered.ok) return;
    expect(blank.value.unitAmount).toBe(7800);
    expect(lettered.value.unitAmount).toBe(9800);
    expect(lettered.value.personalized).toBe(true);
  });

  it("rejects incomplete personalization and unknown pieces", () => {
    expect(resolveCheckout({ productId: "heritage-jersey", size: "M", name: "BROADWAY" }).ok).toBe(
      false,
    );
    expect(resolveCheckout({ productId: "not-a-sku", size: "M" }).ok).toBe(false);
    expect(resolveCheckout({ productId: "two-tone-cap", size: "XL" }).ok).toBe(false);
  });

  it("unlocks complimentary standard shipping at $175", () => {
    const under = shippingOptionsFor(16_800);
    const over = shippingOptionsFor(FREE_STANDARD_CENTS);
    expect(under[0]?.amount).toBe(1_000);
    expect(over[0]?.amount).toBe(0);
    expect(over[1]?.amount).toBe(2_000);
  });

  it("keeps Harbor Division at $98 in cents", () => {
    const harbor = productById("harbor-coach")!;
    expect(unitAmountCents(harbor, false)).toBe(9800);
  });
});
