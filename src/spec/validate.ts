import { COLOR, BLOCKED_HEX } from "@/tokens/brand";
import type { FabricId, KitSpec, Violation } from "./types";
import { hexToLab, deltaE00 } from "@/render/color";

const POLY_FABRICS: FabricId[] = [
  "poly-interlock-matte",
  "poly-mesh-engineered",
  "micro-poly",
  "bonded-double-knit",
];

function usesMetallic(spec: KitSpec): boolean {
  const hexes = [
    spec.colorway.body,
    spec.colorway.panel,
    spec.colorway.piping,
    spec.colorway.trim,
  ];
  // Gold/metallic family heuristics (flat mustard risk in dye-sub)
  for (const h of hexes) {
    const lab = hexToLab(h);
    if (lab.L > 45 && lab.L < 75 && lab.a > -5 && lab.a < 25 && lab.b > 35) return true;
  }
  return false;
}

function hasWhiteGraphic(spec: KitSpec): boolean {
  return (
    spec.colorway.piping.toUpperCase() === COLOR.bone.toUpperCase() ||
    Boolean(spec.graphics.chestBand)
  );
}

function nearBlockedHue(hex: string): string | null {
  const lab = hexToLab(hex);
  for (const [name, blocked] of Object.entries(BLOCKED_HEX)) {
    if (deltaE00(lab, hexToLab(blocked)) < 10) return name;
  }
  return null;
}

/**
 * Every SKU must pass before publish. Sublimation-only rules skip for EMB/KNIT.
 */
export function validateSublimation(spec: KitSpec): Violation[] {
  const v: Violation[] = [];

  // Brand exclusions — all processes
  for (const hex of [
    spec.colorway.body,
    spec.colorway.panel,
    spec.colorway.piping,
    spec.colorway.trim,
  ]) {
    const hit = nearBlockedHue(hex);
    if (hit) {
      v.push({
        code: "BLOCKED_HUE",
        fix: `remove Venezia/manufacturer hue proximity (${hit})`,
      });
    }
  }

  const crestOk =
    spec.graphics.crest === "boxing-bee" ||
    (spec.graphics.crest === "lady-bee" && spec.sku === "BB-DRESS");
  if (!crestOk) {
    v.push({
      code: "ILLEGAL_CREST",
      fix: "purchasable SKUs use boxing-bee; lady-bee is BB-DRESS only; Queen Bees is story-only",
    });
  }

  if (spec.process !== "sublimation-cutsew") {
    // Embroidery / knit: still enforce crest + hue, skip dye-sub substrate rules
    return v;
  }

  if (!POLY_FABRICS.includes(spec.garment.fabric)) {
    v.push({
      code: "NON_POLY_SUBSTRATE",
      fix: "switch process to embroidery-predyed or use a poly fabric",
    });
  }

  if (usesMetallic(spec)) {
    v.push({
      code: "METALLIC_IMPOSSIBLE",
      fix: "substitute bone #F4F1F0 hairline piping",
    });
  }

  if (hasWhiteGraphic(spec) && spec.garment.block === "blank-transfer") {
    v.push({
      code: "WHITE_ON_BLANK",
      fix: "cut-and-sew required for any white letterform",
    });
  }

  if (spec.colorway.panel === COLOR.trimBlack) {
    v.push({
      code: "BLACK_UNACHIEVABLE",
      fix: "panel black must be COLOR.inkBlack (#1C1A1B)",
    });
  }

  for (const trim of spec.garment.trims) {
    if (trim.finish !== "pre-dyed") {
      v.push({ code: "TRIM_MUST_BE_PREDYED", part: trim.id });
    }
  }

  if (spec.colorway.body === COLOR.garnet && !spec.strikeOffApproved) {
    v.push({
      code: "STRIKEOFF_REQUIRED",
      severity: "warn",
      fix: "#5A1626 is low-chroma and dark — worst zone for dye-sub consistency",
    });
  }

  return v;
}

export function sublimationErrors(spec: KitSpec): Violation[] {
  return validateSublimation(spec).filter((x) => x.severity !== "warn");
}
