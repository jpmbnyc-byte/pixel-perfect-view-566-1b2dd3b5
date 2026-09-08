import { describe, expect, it } from "vitest";
import { assertPurchasableCopy, BOE_PERMISSION, commerceBrandName } from "@/catalog/legal";
import {
  POPUP_BUY,
  POPUP_EXCLUDED,
  buyTotals,
  sizeCurveValid,
} from "@/catalog/popupBuy";
import { PRICE_BAND } from "@/catalog/pricing";
import { skuById } from "@/catalog/skus";
import { sublimationErrors } from "@/spec/validate";

describe("legal gate", () => {
  it("defaults to Bayonne commerce brand without BOE on file", () => {
    expect(BOE_PERMISSION.onFile).toBe(false);
    expect(commerceBrandName()).toBe("Bayonne");
  });

  it("flags Bees / school marks on purchasable copy", () => {
    expect(assertPurchasableCopy("Bayonne Bees Match Jersey")).toContain("Bayonne Bees");
    expect(assertPurchasableCopy("BAYONNE · Avenue A · 1936")).toEqual([]);
  });
});

describe("pop-up buy", () => {
  it("totals $2,057 COGS and $6,722 retail at 69% GM", () => {
    const t = buyTotals();
    expect(t.units).toBe(232);
    expect(t.cogs).toBe(2057);
    expect(t.retail).toBe(6722);
    expect(t.gmPct).toBe(69);
  });

  it("every sized line has a curve that sums to qty", () => {
    for (const line of POPUP_BUY) {
      expect(sizeCurveValid(line), line.sku).toBe(true);
    }
  });

  it("excludes Match Shorts from the physical buy", () => {
    expect(POPUP_EXCLUDED.some((x) => x.sku === "BB-MS")).toBe(true);
    expect(POPUP_BUY.some((x) => x.sku === "BB-MS")).toBe(false);
  });

  it("keeps retail inside the price band", () => {
    for (const line of POPUP_BUY) {
      expect(line.retail).toBeGreaterThanOrEqual(PRICE_BAND.min);
      expect(line.retail).toBeLessThanOrEqual(PRICE_BAND.max);
    }
  });

  it("Founding 36 / Beanie / Tee SKUs exist and pass sublimation errors", () => {
    for (const sku of ["BB-F36", "BB-BEANIE", "BB-TEE"] as const) {
      const spec = skuById(sku);
      expect(spec, sku).toBeTruthy();
      expect(sublimationErrors(spec!).map((v) => v.code)).toEqual([]);
      expect(assertPurchasableCopy(`${spec!.name} ${spec!.blurb}`)).toEqual([]);
    }
  });
});
