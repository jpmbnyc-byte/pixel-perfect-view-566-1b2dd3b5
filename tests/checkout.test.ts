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

  it("sells only in-stock footwear sizes with a women’s conversion", () => {
    const runner = resolveCheckout({ productId: "nb-runner", size: "12.5" });
    const court = resolveCheckout({ productId: "nb-bbp400", size: "4" });
    expect(runner.ok).toBe(true);
    expect(court.ok).toBe(true);
    if (runner.ok) {
      expect(runner.value.unitAmount).toBe(15_000);
      expect(runner.value.description).toContain("12.5M · 14W");
      expect(runner.value.description).toContain("198689462957");
    }
    if (court.ok) {
      expect(court.value.unitAmount).toBe(14_000);
      expect(court.value.description).toContain("4M · 5.5W");
      expect(court.value.description).toContain("198689917464");
    }
    expect(resolveCheckout({ productId: "nb-runner", size: "10" }).ok).toBe(false);
    expect(resolveCheckout({ productId: "nb-bbp400", size: "11" }).ok).toBe(false);
    const heat = resolveCheckout({ productId: "nb-runner-heat", size: "12.5" });
    const cardinal = resolveCheckout({ productId: "nb-runner-cardinal", size: "11.5" });
    const volt = resolveCheckout({ productId: "nb-p400-volt", size: "4" });
    expect(heat.ok && heat.value.description.includes("198688679899")).toBe(true);
    expect(cardinal.ok && cardinal.value.description.includes("11.5M · 13W")).toBe(true);
    expect(volt.ok && volt.value.description.includes("198689850297")).toBe(true);
    expect(resolveCheckout({ productId: "nb-runner-cardinal", size: "12.5" }).ok).toBe(false);
  });
});
