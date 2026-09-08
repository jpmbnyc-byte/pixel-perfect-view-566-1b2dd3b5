import type { KitSpec, View } from "./types";
import { sublimationErrors } from "./validate";

export class SpecResolveError extends Error {
  constructor(
    public readonly sku: string,
    public readonly violations: ReturnType<typeof sublimationErrors>,
  ) {
    super(`KitSpec ${sku} failed sublimation validation`);
    this.name = "SpecResolveError";
  }
}

/** Single entry — nothing renders from an unresolved spec. */
export function resolveSpec(spec: KitSpec): KitSpec {
  const errors = sublimationErrors(spec);
  if (errors.length > 0) throw new SpecResolveError(spec.sku, errors);
  return Object.freeze(structuredClone(spec)) as KitSpec;
}

export function viewsForMode(spec: KitSpec): View[] {
  if (spec.personalization.mode === "none" && !spec.graphics.chestBand) {
    return ["front", "side", "back"];
  }
  return ["front", "side", "back"];
}
