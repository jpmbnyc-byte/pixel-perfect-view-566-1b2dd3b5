import { describe, expect, it } from "vitest";
import { SKUS } from "@/catalog/skus";
import { publishVariant } from "@/render/parity";
import { composePersonalization } from "@/personalize/compose";
import { MOTIF } from "@/tokens/motif";
import type { KitFontId } from "@/tokens/type";

const FONTS: KitFontId[] = ["railCut", "beacon", "whistle", "forge"];

describe("personalization matrix sample", () => {
  it("samples 4 fonts × name-number SKUs through parity", async () => {
    const base = SKUS.find((s) => s.sku === "BB-MJ-REP")!;
    for (const font of FONTS) {
      const spec = composePersonalization(base, { name: "BEE", number: "12", font });
      await publishVariant(spec);
    }
  });

  it("samples 3 motifs on a motif SKU through parity", async () => {
    const base = SKUS.find((s) => s.sku === "BB-MS")!;
    for (const motif of MOTIF) {
      const spec = { ...base, graphics: { ...base.graphics, motif } };
      await publishVariant(spec);
    }
  });
});
