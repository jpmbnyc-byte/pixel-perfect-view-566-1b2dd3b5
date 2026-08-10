/**
 * Two image tiers — different jobs, different rules (SPEC PATCH 03).
 *
 * Tier 1 CAMPAIGN — photographed, on-body. Desire.
 * Tier 2 TRUTH    — generated render, ghost. Exact purchase.
 *
 * Do not weaken the Tier 2 parity gate to accommodate photography.
 */

export type ImageTier = "campaign" | "truth";

export type ImageSurface =
  | "pdp-hero"
  | "category-grid"
  | "lookbook"
  | "social"
  | "configurator"
  | "live-preview"
  | "order-confirmation"
  | "cart-line";

/** Default tier for a surface when personalization is unset. */
export const SURFACE_TIER: Record<ImageSurface, ImageTier> = {
  "pdp-hero": "campaign",
  "category-grid": "campaign",
  lookbook: "campaign",
  social: "campaign",
  configurator: "truth",
  "live-preview": "truth",
  "order-confirmation": "truth",
  "cart-line": "campaign",
};

/**
 * Once a name exists, every downstream surface shows Tier 2 with that name.
 * The photo has done its job.
 */
export function imageTierForSurface(
  surface: ImageSurface,
  opts?: { personalizationSet?: boolean },
): ImageTier {
  if (
    opts?.personalizationSet &&
    (surface === "cart-line" || surface === "order-confirmation" || surface === "live-preview")
  ) {
    return "truth";
  }
  if (opts?.personalizationSet && surface === "configurator") return "truth";
  return SURFACE_TIER[surface];
}

/** Cart / confirmation: Tier 2 render when personalization is set. */
export function lineItemImageTier(personalization: { name?: string; number?: string }): ImageTier {
  const set = Boolean(personalization.name || personalization.number);
  return imageTierForSurface("cart-line", { personalizationSet: set });
}
