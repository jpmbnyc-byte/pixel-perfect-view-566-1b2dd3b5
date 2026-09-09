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
  IMAGE_REGISTRY,
  campaignViews,
  platePair,
  type CanonicalProductId,
} from "./imageRegistry";

export const CRESTS = {
  /** Kit / manufacturing crest (boxing bee). Not storefront chrome. */
  kit: boxingBee,
  /** @deprecated Storefront uses BrandMarks — kept for production docs. */
  primary: boxingBee,
  queen: queenCrest,
} as const;

export type PlatePair = {
  front: string;
  secondary: string;
};

const CANONICAL_PLATES = Object.fromEntries(
  (Object.keys(IMAGE_REGISTRY) as CanonicalProductId[]).map((id) => [id, platePair(id)]),
) as Record<CanonicalProductId, PlatePair>;
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
  landingHeroModel: HEROES.landingModel,
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
