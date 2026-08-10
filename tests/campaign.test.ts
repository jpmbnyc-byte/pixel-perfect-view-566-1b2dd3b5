import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/lib/catalog";
import {
  LETTERED_CAMPAIGN_SKUS,
  campaignForProduct,
  isNameable,
  validateCampaignSurfacing,
} from "@/media/campaignAssets";
import { campaignColorwayGate } from "@/media/campaignGate";
import { imageTierForSurface, lineItemImageTier } from "@/media/tiers";
import { COLOR } from "@/tokens/brand";
import { CAMPAIGN_DEMO_LETTERING, CAMPAIGN_SHOT, CAMPAIGN_TOLERANCE } from "@/tokens/campaign";
import { EASTER_EGGS, FUN_BUDGET } from "@/tokens/fun";
import { hexToRgb } from "@/render/color";
import { STAGE } from "@/render/contract";

function solidImage(hex: string, size = 64) {
  const { r, g, b } = hexToRgb(hex);
  const data = new Uint8ClampedArray(size * size * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = 255;
  }
  return { width: size, height: size, data };
}

describe("image tiers", () => {
  it("keeps Tier 2 gate surfaces on truth", () => {
    expect(imageTierForSurface("configurator")).toBe("truth");
    expect(imageTierForSurface("live-preview")).toBe("truth");
    expect(STAGE.mannequin).toBe("ghost");
  });

  it("uses campaign for desire surfaces", () => {
    expect(imageTierForSurface("pdp-hero")).toBe("campaign");
    expect(imageTierForSurface("category-grid")).toBe("campaign");
  });

  it("switches cart/confirm to truth once personalized", () => {
    expect(lineItemImageTier({})).toBe("campaign");
    expect(lineItemImageTier({ name: "CARTER", number: "7" })).toBe("truth");
    expect(
      imageTierForSurface("order-confirmation", { personalizationSet: true }),
    ).toBe("truth");
  });
});

describe("campaign surfacing", () => {
  it("requires named back + badge data on every lettered storefront SKU", () => {
    const lettered = PRODUCTS.filter((p) => p.nameNumber);
    expect(lettered.length).toBeGreaterThan(0);
    for (const p of lettered) {
      const violations = validateCampaignSurfacing(p);
      expect(violations, p.id).toEqual([]);
      const set = campaignForProduct(p)!;
      expect(set.demoLettering?.number).toBe("36");
      expect(set.demoLettering?.name).toBe(CAMPAIGN_DEMO_LETTERING.name);
      expect(set.views.back).toBeTruthy();
      expect(isNameable(p)).toBe(true);
    }
  });

  it("lists all build-map lettered SKUs for the shoot", () => {
    expect(LETTERED_CAMPAIGN_SKUS).toContain("BB-MJ-REP");
    expect(LETTERED_CAMPAIGN_SKUS).toContain("BB-CLASS");
  });
});

describe("campaign colorway gate", () => {
  it("passes when body samples match garnet within ΔE00 4", () => {
    const result = campaignColorwayGate(solidImage(COLOR.garnet));
    expect(result.pass).toBe(true);
  });

  it("fails when body is Venezia orange", () => {
    const result = campaignColorwayGate(solidImage("#F26522"));
    expect(result.pass).toBe(false);
    expect(result.failures[0]?.code).toBe("CAMPAIGN_COLORWAY_DRIFT");
    expect(CAMPAIGN_TOLERANCE.colorDeltaE00).toBe(4);
  });

  it("pins campaign shot protocol constants", () => {
    expect(CAMPAIGN_SHOT.background).toBe("#EFEFEE");
    expect(CAMPAIGN_SHOT.aspect).toBe("1:1");
    expect(CAMPAIGN_SHOT.crop).toBe("crown-to-midthigh");
  });
});

describe("fun budget", () => {
  it("caps eggs and bans checkout fun", () => {
    expect(FUN_BUDGET.maxEasterEggs).toBe(2);
    expect(Object.keys(EASTER_EGGS)).toHaveLength(FUN_BUDGET.maxEasterEggs);
    expect(FUN_BUDGET.bannedSurfaces).toContain("checkout");
    expect(FUN_BUDGET.bannedForever).toContain("confetti");
  });
});
