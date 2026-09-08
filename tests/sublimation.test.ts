import { describe, expect, it } from "vitest";
import { SKUS } from "@/catalog/skus";
import { validateSublimation, sublimationErrors } from "@/spec/validate";
import { COLOR } from "@/tokens/brand";
import type { KitSpec } from "@/spec/types";

function clone(s: KitSpec): KitSpec {
  return structuredClone(s);
}

describe("validateSublimation", () => {
  it("passes every catalog SKU with zero errors (warns ok)", () => {
    for (const sku of SKUS) {
      const errors = sublimationErrors(sku);
      expect(errors, sku.sku).toEqual([]);
    }
  });

  it("rejects panel black at trimBlack", () => {
    const s = clone(SKUS[0]!);
    s.colorway.panel = COLOR.trimBlack;
    const codes = validateSublimation(s).map((v) => v.code);
    expect(codes).toContain("BLACK_UNACHIEVABLE");
  });

  it("rejects Venezia orange proximity", () => {
    const s = clone(SKUS[0]!);
    s.colorway.piping = "#F26522";
    const codes = validateSublimation(s).map((v) => v.code);
    expect(codes).toContain("BLOCKED_HUE");
  });

  it("rejects non-poly on sublimation", () => {
    const s = clone(SKUS.find((x) => x.process === "sublimation-cutsew")!);
    s.garment.fabric = "cotton-poly-fleece";
    const codes = validateSublimation(s).map((v) => v.code);
    expect(codes).toContain("NON_POLY_SUBSTRATE");
  });

  it("warns when garnet lacks strike-off", () => {
    const s = clone(SKUS.find((x) => x.process === "sublimation-cutsew")!);
    delete s.strikeOffApproved;
    const warns = validateSublimation(s).filter((v) => v.severity === "warn");
    expect(warns.some((w) => w.code === "STRIKEOFF_REQUIRED")).toBe(true);
  });
});
