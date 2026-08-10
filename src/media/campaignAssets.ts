/**
 * Campaign asset registry — Tier 1 on-body shots.
 * Until the shoot lands, URLs may resolve to plate placeholders with status "placeholder".
 * Publish / DoD requires status "approved" + model release on file.
 */

import { CAMPAIGN_DEMO_LETTERING, CAMPAIGN_VIEWS, type CampaignView } from "@/tokens/campaign";
import type { CatalogProduct } from "@/lib/catalog";

export type CampaignAssetStatus = "missing" | "placeholder" | "shot" | "approved";

export type CampaignShotSet = {
  sku: string;
  /** Storefront product id when mapped */
  productId?: string;
  status: CampaignAssetStatus;
  views: Partial<Record<CampaignView, string>>;
  /** Fixed name/number on the back plate — lettered SKUs only */
  demoLettering?: { name: string; number: string };
  /** Model release on file (18+). Required before approved. */
  modelReleaseOnFile: boolean;
  /** Youth SKUs: flat-lay only — never on a child */
  youthFlatLayOnly?: boolean;
};

/** Build-map lettered SKUs that require a named back campaign shot. */
export const LETTERED_CAMPAIGN_SKUS = [
  "BB-MJ-REP",
  "BB-MJ-AUT",
  "BB-LSJ",
  "BB-HOOPS",
  "BB-DRESS",
  "BB-CLASS",
] as const;

export type LetteredCampaignSku = (typeof LETTERED_CAMPAIGN_SKUS)[number];

/** Storefront product id → build-map lettered SKU (when applicable). */
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

/**
 * Placeholder registry — plate URLs injected at bind time from catalog.
 * Real shoot replaces views + flips status to approved.
 */
const REGISTRY: CampaignShotSet[] = LETTERED_CAMPAIGN_SKUS.map((sku) => ({
  sku,
  status: "placeholder" as const,
  views: {},
  demoLettering: { ...CAMPAIGN_DEMO_LETTERING },
  modelReleaseOnFile: false,
}));

export function campaignForSku(sku: string): CampaignShotSet | undefined {
  return REGISTRY.find((r) => r.sku === sku);
}

export function campaignForProduct(product: CatalogProduct): CampaignShotSet | undefined {
  const sku = STOREFRONT_TO_LETTERED[product.id];
  if (!sku) return undefined;
  const entry = campaignForSku(sku);
  if (!entry) return undefined;
  return {
    ...entry,
    productId: product.id,
    views: {
      front: product.previews.front,
      "three-quarter": product.previews.front,
      back: product.previews.secondary,
      ...entry.views,
    },
  };
}

/** Structural validation for Tier 1 DoD (does not load pixels). */
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
