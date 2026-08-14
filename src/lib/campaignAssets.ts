/**
 * Tier 1 campaign shot modules — imported once, resolved via media/campaignAssets.
 * Do not import these jpg paths from routes directly.
 */

import jerseyFront from "@/assets/bayonne/campaign/jersey-front.jpg";
import jerseyTq from "@/assets/bayonne/campaign/jersey-three-quarter.jpg";
import jerseyBack from "@/assets/bayonne/campaign/jersey-back.jpg";
import lsFront from "@/assets/bayonne/campaign/ls-front.jpg";
import lsTq from "@/assets/bayonne/campaign/ls-three-quarter.jpg";
import lsBack from "@/assets/bayonne/campaign/ls-back.jpg";
import hoopsFront from "@/assets/bayonne/campaign/hoops-front.jpg";
import hoopsTq from "@/assets/bayonne/campaign/hoops-three-quarter.jpg";
import hoopsBack from "@/assets/bayonne/campaign/hoops-back.jpg";
import dressFront from "@/assets/bayonne/campaign/dress-front.jpg";
import dressTq from "@/assets/bayonne/campaign/dress-three-quarter.jpg";
import dressBack from "@/assets/bayonne/campaign/dress-back.jpg";
import shortsFront from "@/assets/bayonne/campaign/shorts-front.jpg";
import shortsTq from "@/assets/bayonne/campaign/shorts-three-quarter.jpg";
import shortsBack from "@/assets/bayonne/campaign/shorts-back.jpg";
import geoShortsFront from "@/assets/bayonne/campaign/geo-shorts-front.jpg";
import crewFront from "@/assets/bayonne/campaign/crew-front.jpg";
import qzipFront from "@/assets/bayonne/campaign/qzip-front.jpg";
import heritageTeeGarnetFront from "@/assets/bayonne/campaign/heritage-tee-garnet-front.jpg";
import heritageTeeGarnetBack from "@/assets/bayonne/campaign/heritage-tee-garnet-back.jpg";
import heritageTeeBlackFront from "@/assets/bayonne/campaign/heritage-tee-black-front.jpg";
import heritageTeeBlackBack from "@/assets/bayonne/campaign/heritage-tee-black-back.jpg";
import baggySweatsGarnetFront from "@/assets/bayonne/campaign/baggy-sweats-garnet-front.jpg";
import baggySweatsBlackFront from "@/assets/bayonne/campaign/baggy-sweats-black-front.jpg";
import crestCapFront from "@/assets/bayonne/campaign/crest-cap-front.jpg";

import type { CampaignView } from "@/tokens/campaign";

export type CampaignViewMap = Partial<Record<CampaignView, string>> & {
  /** Optional single-view products (motif / alumni) */
  front?: string;
};

/** Storefront product id → campaign views */
export const CAMPAIGN_SHOTS: Record<string, CampaignViewMap> = {
  jersey: {
    front: jerseyFront,
    "three-quarter": jerseyTq,
    back: jerseyBack,
  },
  "full-set": {
    front: jerseyFront,
    "three-quarter": jerseyTq,
    back: jerseyBack,
  },
  "ls-jersey": {
    front: lsFront,
    "three-quarter": lsTq,
    back: lsBack,
  },
  "hoops-jersey": {
    front: hoopsFront,
    "three-quarter": hoopsTq,
    back: hoopsBack,
  },
  "jersey-dress": {
    front: dressFront,
    "three-quarter": dressTq,
    back: dressBack,
  },
  shorts: {
    front: shortsFront,
    "three-quarter": shortsTq,
    back: shortsBack,
  },
  "geo-shorts": { front: geoShortsFront },
  crewneck: { front: crewFront },
  "quarter-zip": { front: qzipFront },
  "heritage-tee-garnet": {
    front: heritageTeeGarnetFront,
    back: heritageTeeGarnetBack,
  },
  "heritage-tee-black": {
    front: heritageTeeBlackFront,
    back: heritageTeeBlackBack,
  },
  "baggy-sweats-garnet": { front: baggySweatsGarnetFront },
  "baggy-sweats-black": { front: baggySweatsBlackFront },
  "aop-hat": { front: crestCapFront },
};

/** Build-map SKU → campaign views (lettered sets share storefront modules). */
export const CAMPAIGN_BY_SKU: Record<string, CampaignViewMap> = {
  "BB-MJ-REP": CAMPAIGN_SHOTS["jersey"]!,
  "BB-MJ-AUT": CAMPAIGN_SHOTS["jersey"]!,
  "BB-LSJ": CAMPAIGN_SHOTS["ls-jersey"]!,
  "BB-HOOPS": CAMPAIGN_SHOTS["hoops-jersey"]!,
  "BB-DRESS": CAMPAIGN_SHOTS["jersey-dress"]!,
  "BB-CLASS": CAMPAIGN_SHOTS["jersey"]!,
};
