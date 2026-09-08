/**
 * Bayonne Athletics brand asset manifest.
 * Storefront imagery resolves through imageRegistry. This file keeps
 * crests, surfaces, and plate aliases for internal production docs.
 */

import boxingBee from "@/assets/bayonne/spirit/boxing-bee.png";
import queenCrest from "@/assets/bayonne/reveal/reveal-01-crest.jpg";
import {
  COMING_SOON,
  HEROES,
  campaignViews,
  platePair,
  type CanonicalProductId,
} from "./imageRegistry";

export const CRESTS = {
  primary: boxingBee,
  queen: queenCrest,
} as const;

export type PlatePair = {
  front: string;
  secondary: string;
};

const CANONICAL_PLATES = {
  "heritage-jersey": platePair("heritage-jersey"),
  "match-short": platePair("match-short"),
  "match-set": platePair("match-set"),
  "performance-ls": platePair("performance-ls"),
  "performance-short": platePair("performance-short"),
  "mens-raglan": platePair("mens-raglan"),
  "womens-raglan": platePair("womens-raglan"),
  "performance-set": platePair("performance-set"),
  "max-heavy-full-zip": platePair("max-heavy-full-zip"),
  "max-heavy-sweatpant": platePair("max-heavy-sweatpant"),
  "travel-set": platePair("travel-set"),
  "pique-polo": platePair("pique-polo"),
  "pocket-ls": platePair("pocket-ls"),
  "field-cargo": platePair("field-cargo"),
  "harbor-coach": platePair("harbor-coach"),
  "two-tone-cap": platePair("two-tone-cap"),
  "gothic-b-beanie": platePair("gothic-b-beanie"),
  "club-sock": platePair("club-sock"),
  "nb-bbp400": platePair("nb-bbp400"),
  "nb-p400-chalk": platePair("nb-p400-chalk"),
  "nb-p400-volt": platePair("nb-p400-volt"),
  "nb-runner": platePair("nb-runner"),
  "nb-runner-heat": platePair("nb-runner-heat"),
  "nb-runner-cardinal": platePair("nb-runner-cardinal"),
} as const satisfies Record<CanonicalProductId, PlatePair>;

/** Legacy plate keys used by internal build-map SKUs. */
export const PLATES = {
  ...CANONICAL_PLATES,
  jersey: CANONICAL_PLATES["heritage-jersey"],
  shorts: CANONICAL_PLATES["match-short"],
  "full-set": CANONICAL_PLATES["match-set"],
  "ls-jersey": CANONICAL_PLATES["performance-ls"],
  "geo-shorts": CANONICAL_PLATES["performance-short"],
  "quarter-zip": CANONICAL_PLATES["mens-raglan"],
  crewneck: CANONICAL_PLATES["womens-raglan"],
  "baggy-sweats-black": CANONICAL_PLATES["performance-set"],
  "heritage-tee-black": CANONICAL_PLATES["max-heavy-full-zip"],
  sweatpants: CANONICAL_PLATES["max-heavy-sweatpant"],
  "baggy-sweats-garnet": CANONICAL_PLATES["travel-set"],
  "heritage-tee-garnet": CANONICAL_PLATES["pique-polo"],
  "hoops-jersey": CANONICAL_PLATES["pocket-ls"],
  "jersey-dress": CANONICAL_PLATES["field-cargo"],
  "aop-hat": CANONICAL_PLATES["two-tone-cap"],
  beanie: CANONICAL_PLATES["gothic-b-beanie"],
} as const satisfies Record<string, PlatePair>;

export type PlateProductId = keyof typeof PLATES;

export const SURFACES = {
  landingHero: HEROES.landing,
  landingMatchJersey: campaignViews("heritage-jersey").front ?? platePair("heritage-jersey").front,
  landingSideline: HEROES.performance,
  landingTravel: HEROES.travel,
  landingHarbor: HEROES.harbor,
  landingClub: HEROES.club,
  ogImage: HEROES.og,
  categoryHero: {
    match: HEROES.match,
    performance: HEROES.performance,
    travel: HEROES.travel,
    harbor: HEROES.harbor,
    club: HEROES.club,
  },
  comingSoon: COMING_SOON,
} as const;

export function plateFor(productId: PlateProductId): PlatePair {
  return PLATES[productId];
}
