/**
 * Campaign asset registry — Tier 1 on-body shots (SPEC PATCH 03).
 * Photoreal modules live in src/lib/campaignAssets.ts — no plate placeholders.
 */

import { CAMPAIGN_BY_SKU, CAMPAIGN_SHOTS } from "@/lib/campaignAssets";
import type { CatalogProduct } from "@/lib/catalog";
import { CAMPAIGN_DEMO_LETTERING, CAMPAIGN_VIEWS, type CampaignView } from "@/tokens/campaign";

export type CampaignAssetStatus = "missing" | "placeholder" | "shot" | "approved";

export type CampaignShotSet = {
  sku: string;
  productId?: string;
  status: CampaignAssetStatus;
  views: Partial<Record<CampaignView, string>>;
  demoLettering?: { name: string; number: string };
  modelReleaseOnFile: boolean;
  youthFlatLayOnly?: boolean;
};

export const LETTERED_CAMPAIGN_SKUS = [
  "BB-MJ-REP",
  "BB-MJ-AUT",
  "BB-LSJ",
  "BB-HOOPS",
  "BB-DRESS",
  "BB-CLASS",
] as const;

export type LetteredCampaignSku = (typeof LETTERED_CAMPAIGN_SKUS)[number];

export const STOREFRONT_TO_LETTERED: Record<string, LetteredCampaignSku> = {
  jersey: "BB-MJ-REP",
  "full-set": "BB-MJ-REP",
  "ls-jersey": "BB-LSJ",
  "hoops-jersey": "BB-HOOPS",
  "jersey-dress": "BB-DRESS",
};

export type CampaignViolation = {
  code: string;
  sku: string;
  fix: string;
};

const REGISTRY: CampaignShotSet[] = LETTERED_CAMPAIGN_SKUS.map((sku) => {
  const views = CAMPAIGN_BY_SKU[sku] ?? {};
  return {
    sku,
    status: "shot" as const,
    views: { ...views },
    demoLettering: { ...CAMPAIGN_DEMO_LETTERING },
    // AI stand-ins until a signed release shoot — not publish-approved
    modelReleaseOnFile: false,
  };
});

export function campaignForSku(sku: string): CampaignShotSet | undefined {
  return REGISTRY.find((r) => r.sku === sku);
}

export function campaignForProduct(product: CatalogProduct): CampaignShotSet | undefined {
  const letteredSku = STOREFRONT_TO_LETTERED[product.id];
  if (letteredSku) {
    const entry = campaignForSku(letteredSku);
    if (!entry) return undefined;
    return { ...entry, productId: product.id };
  }

  const views = CAMPAIGN_SHOTS[product.id];
  if (!views?.front) return undefined;
  return {
    sku: product.id,
    productId: product.id,
    status: "shot",
    views: { ...views },
    modelReleaseOnFile: false,
  };
}

/** Prefer campaign front for category grid / desire surfaces. */
export function campaignThumbFor(product: CatalogProduct): string | undefined {
  return campaignForProduct(product)?.views.front ?? CAMPAIGN_SHOTS[product.id]?.front;
}

export function validateCampaignSurfacing(product: CatalogProduct): CampaignViolation[] {
  const v: CampaignViolation[] = [];
  if (!product.nameNumber) return v;

  const sku = STOREFRONT_TO_LETTERED[product.id] ?? product.id;
  const set = campaignForProduct(product);

  if (!set) {
    v.push({
      code: "CAMPAIGN_BACK_REQUIRED",
      sku,
      fix: "lettered SKU must have a campaign shot set with a named back",
    });
    return v;
  }

  for (const view of CAMPAIGN_VIEWS) {
    if (!set.views[view]) {
      v.push({
        code: "CAMPAIGN_VIEW_MISSING",
        sku,
        fix: `add campaign ${view} shot`,
      });
    }
  }

  if (!set.demoLettering?.name || set.demoLettering.number !== "36") {
    v.push({
      code: "CAMPAIGN_BACK_LETTERING",
      sku,
      fix: "back shot must carry a non-roster name and number 36",
    });
  }

  if (set.status === "placeholder") {
    v.push({
      code: "CAMPAIGN_STILL_PLACEHOLDER",
      sku,
      fix: "replace plate placeholder with on-body campaign shot",
    });
  }

  if (set.status === "approved" && !set.modelReleaseOnFile) {
    v.push({
      code: "MODEL_RELEASE_REQUIRED",
      sku,
      fix: "adults 18+ with signed model release before approved",
    });
  }

  return v;
}

export function isNameable(product: CatalogProduct): boolean {
  return product.nameNumber === true;
}
