/**
 * Tier 1 campaign shots — resolved from the canonical image registry.
 * Do not import retired garment aliases from routes.
 */

import { campaignViews, type CanonicalProductId } from "./imageRegistry";
import type { CampaignView } from "@/tokens/campaign";

export type CampaignViewMap = Partial<Record<CampaignView, string>> & {
  front?: string;
};

const LIVE_IDS: CanonicalProductId[] = [
  "heritage-jersey",
  "match-short",
  "match-set",
  "performance-ls",
  "performance-short",
  "mens-raglan",
  "womens-raglan",
  "performance-set",
  "max-heavy-full-zip",
  "max-heavy-sweatpant",
  "travel-set",
  "pique-polo",
  "pocket-ls",
  "field-cargo",
  "harbor-coach",
  "harbor-pullover",
  "harbor-sweatpant-grey",
  "two-tone-cap",
  "gothic-b-beanie",
  "gothic-b-beanie-brown",
  "club-sock",
  "nb-bbp400",
  "nb-p400-chalk",
  "nb-p400-volt",
  "nb-runner",
  "nb-runner-heat",
  "nb-runner-cardinal",
];

const shots = Object.fromEntries(LIVE_IDS.map((id) => [id, campaignViews(id)])) as Record<
  CanonicalProductId,
  CampaignViewMap
>;

/** Storefront product id → campaign views */
export const CAMPAIGN_SHOTS: Record<string, CampaignViewMap> = {
  ...shots,
  jersey: shots["heritage-jersey"],
  shorts: shots["match-short"],
  "full-set": shots["match-set"],
  "ls-jersey": shots["performance-ls"],
  "geo-shorts": shots["performance-short"],
  "quarter-zip": shots["mens-raglan"],
  crewneck: shots["womens-raglan"],
  "baggy-sweats-black": shots["performance-set"],
  "heritage-tee-black": shots["max-heavy-full-zip"],
  sweatpants: shots["max-heavy-sweatpant"],
  "baggy-sweats-garnet": shots["travel-set"],
  "heritage-tee-garnet": shots["pique-polo"],
  "hoops-jersey": shots["pocket-ls"],
  "jersey-dress": shots["field-cargo"],
  "aop-hat": shots["two-tone-cap"],
  beanie: shots["gothic-b-beanie"],
  "beanie-brown": shots["gothic-b-beanie-brown"],
};

/** Build-map SKU → campaign views (internal production docs). */
export const CAMPAIGN_BY_SKU: Record<string, CampaignViewMap> = {
  "BB-MJ-REP": CAMPAIGN_SHOTS["heritage-jersey"]!,
  "BB-MJ-AUT": CAMPAIGN_SHOTS["heritage-jersey"]!,
  "BB-LSJ": CAMPAIGN_SHOTS["performance-ls"]!,
  "BB-HOOPS": CAMPAIGN_SHOTS["pocket-ls"]!,
  "BB-DRESS": CAMPAIGN_SHOTS["field-cargo"]!,
  "BB-CLASS": CAMPAIGN_SHOTS["heritage-jersey"]!,
};
