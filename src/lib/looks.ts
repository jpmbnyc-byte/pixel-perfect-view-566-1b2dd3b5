/**
 * Shop this look — live products only.
 * Pieces must already have photography. Never coming-soon plates.
 */

import type { CanonicalProductId } from "./imageRegistry";

export type ShopLook = {
  productId: CanonicalProductId;
  pieces: CanonicalProductId[];
};

export const SHOP_LOOKS: Record<string, ShopLook> = {
  "heritage-jersey": {
    productId: "heritage-jersey",
    pieces: ["match-short", "club-sock", "gothic-b-beanie"],
  },
  "match-short": {
    productId: "match-short",
    pieces: ["heritage-jersey", "club-sock", "gothic-b-beanie"],
  },
  "match-set": {
    productId: "match-set",
    pieces: ["club-sock", "gothic-b-beanie", "area-code-cap"],
  },
  "performance-ls": {
    productId: "performance-ls",
    pieces: ["performance-short", "club-sock", "nb-runner-heat"],
  },
  "performance-short": {
    productId: "performance-short",
    pieces: ["performance-ls", "club-sock", "nb-runner-cardinal"],
  },
  "performance-set": {
    productId: "performance-set",
    pieces: ["club-sock", "nb-runner-heat", "gothic-b-beanie"],
  },
  "max-heavy-full-zip": {
    productId: "max-heavy-full-zip",
    pieces: ["max-heavy-sweatpant", "club-sock", "two-tone-cap"],
  },
  "max-heavy-sweatpant": {
    productId: "max-heavy-sweatpant",
    pieces: ["max-heavy-full-zip", "club-sock", "gothic-b-beanie"],
  },
  "travel-set": {
    productId: "travel-set",
    pieces: ["two-tone-cap", "club-sock", "nb-runner"],
  },
  "harbor-coach": {
    productId: "harbor-coach",
    pieces: ["harbor-sweatpant-grey", "gothic-b-beanie", "club-sock"],
  },
  "harbor-pullover": {
    productId: "harbor-pullover",
    pieces: ["harbor-sweatpant-grey", "gothic-b-beanie", "club-sock"],
  },
  "harbor-sweatpant-grey": {
    productId: "harbor-sweatpant-grey",
    pieces: ["harbor-pullover", "gothic-b-beanie", "club-sock"],
  },
  "harbor-sweatpant-black": {
    productId: "harbor-sweatpant-black",
    pieces: ["harbor-pullover", "gothic-b-beanie", "club-sock"],
  },
  "area-code-cap": {
    productId: "area-code-cap",
    pieces: ["heritage-jersey", "club-sock", "harbor-coach"],
  },
  "two-tone-cap": {
    productId: "two-tone-cap",
    pieces: ["max-heavy-full-zip", "club-sock", "gothic-b-beanie"],
  },
  "gothic-b-beanie": {
    productId: "gothic-b-beanie",
    pieces: ["harbor-pullover", "club-sock", "max-heavy-full-zip"],
  },
  "gothic-b-beanie-brown": {
    productId: "gothic-b-beanie-brown",
    pieces: ["harbor-sweatpant-grey", "club-sock", "two-tone-cap"],
  },
  "club-sock": {
    productId: "club-sock",
    pieces: ["performance-short", "nb-runner-heat", "gothic-b-beanie"],
  },
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
  return SHOP_LOOKS[id];
}
