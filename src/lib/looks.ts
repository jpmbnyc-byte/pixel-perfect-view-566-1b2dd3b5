/**
 * Adidas-style "Shop this look" pairings.
 * Lifestyle plates live on IMAGE_REGISTRY.modelFront for each sneaker.
 * Pieces are photographed Fall 001 garments that appear in the look.
 */

import type { CanonicalProductId } from "./imageRegistry";
import type { FootwearId } from "./footwear";

export type ShopLook = {
  productId: FootwearId;
  pieces: CanonicalProductId[];
};

export const SHOP_LOOKS: Record<FootwearId, ShopLook> = {
  "nb-bbp400": {
    productId: "nb-bbp400",
    pieces: ["performance-ls", "performance-short", "club-sock"],
  },
  "nb-p400-chalk": {
    productId: "nb-p400-chalk",
    pieces: ["performance-ls", "performance-short", "club-sock"],
  },
  "nb-p400-volt": {
    productId: "nb-p400-volt",
    pieces: ["performance-ls", "performance-short", "club-sock"],
  },
  "nb-runner": {
    productId: "nb-runner",
    pieces: ["max-heavy-full-zip", "max-heavy-sweatpant", "club-sock"],
  },
  "nb-runner-heat": {
    productId: "nb-runner-heat",
    pieces: ["performance-ls", "performance-short", "club-sock"],
  },
  "nb-runner-cardinal": {
    productId: "nb-runner-cardinal",
    pieces: ["performance-ls", "performance-short", "club-sock"],
  },
};

export function lookFor(id: string): ShopLook | undefined {
  return SHOP_LOOKS[id as FootwearId];
}
