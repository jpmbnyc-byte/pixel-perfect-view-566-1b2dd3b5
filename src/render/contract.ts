/**
 * Pinned render constants — DO NOT PARAMETERIZE.
 * Changing any value invalidates every cached render.
 * Bump RENDER_CONTRACT_VERSION and regenerate the whole catalog.
 *
 * STAGE / ghost mannequin = Tier 2 TRUTH only (configurator, live preview).
 * Tier 1 CAMPAIGN photography uses CAMPAIGN_SHOT — see src/tokens/campaign.ts.
 * Do not weaken the Tier 2 parity gate to accommodate photography.
 */

export { CAMPAIGN_SHOT, CAMPAIGN_VIEWS, CAMPAIGN_TOLERANCE } from "@/tokens/campaign";

export const RENDER_CONTRACT_VERSION = 3;

export const CAMERA = {
  front: { azimuth: 0, elevation: 0, distance: 2400, fov: 32 },
  side: { azimuth: 90, elevation: 0, distance: 2400, fov: 32 },
  back: { azimuth: 180, elevation: 0, distance: 2400, fov: 32 },
} as const;

export const LIGHTING = {
  key: { intensity: 1.0, azimuth: -25, elevation: 35, softness: 0.72 },
  fill: { intensity: 0.38, azimuth: 40, elevation: 10, softness: 0.9 },
  rim: { intensity: 0.22, azimuth: 165, elevation: 25, softness: 0.55 },
  ambient: { intensity: 0.15 },
} as const;

/** Tier 2 only — ghost mannequin studio. Campaign (Tier 1) uses CAMPAIGN_SHOT. */
export const STAGE = {
  background: "#F7F5F4",
  shadow: "contact-only" as const,
  mannequin: "ghost" as const,
} as const;

export const MATERIAL = {
  roughness: 0.82,
  /** Sublimation has no metallic gamut. Locked at zero. */
  metalness: 0.0,
  sheen: 0.06,
} as const;

export const RES = {
  thumb: 640,
  live: 1200,
  hero: 2400,
  pdp: 1600,
} as const;
