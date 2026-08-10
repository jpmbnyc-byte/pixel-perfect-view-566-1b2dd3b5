/**
 * Tier 1 — CAMPAIGN shot protocol (SPEC PATCH 03).
 * Photographed, on-body. Not governed by the full Tier 2 parity gate.
 * Sibling to STAGE in src/render/contract.ts — do not mix the tiers.
 */

export const CAMPAIGN_SHOT = {
  background: "#EFEFEE",
  vignette: 0.06,
  contactShadow: true,
  aspect: "1:1",
  crop: "crown-to-midthigh",
  lens: "85mm equivalent",
  keyLight: "large frontal softbox, ~45° above, shadowless fill",
  colorTemp: 5600,
  expression: "neutral",
  pose: "square to camera, arms at sides, weight even",
} as const;

export const CAMPAIGN_VIEWS = ["front", "three-quarter", "back"] as const;

export type CampaignView = (typeof CAMPAIGN_VIEWS)[number];

/** Wider than Tier 2 — real fabric under real light shifts. Fail the asset, not the build. */
export const CAMPAIGN_TOLERANCE = {
  colorDeltaE00: 4.0,
} as const;

/**
 * Fixed demo lettering on lettered SKU campaign backs.
 * Non-roster only. Number 36 = founding year.
 */
export const CAMPAIGN_DEMO_LETTERING = {
  name: "AVENUE A",
  number: "36",
} as const;

export const CAMPAIGN_NAME_BADGE = "Your name goes here" as const;
