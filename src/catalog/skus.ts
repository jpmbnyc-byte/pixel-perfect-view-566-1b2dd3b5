/**
 * Build-map catalog (+ pop-up buy SKUs).
 * Gate: validateSublimation + parity before publish. Do not ship without both.
 * Legal: no Bees / school marks on purchasable units until BOE permission — see legal.ts.
 */

import { COLOR } from "@/tokens/brand";
import { MOTIF_MEANING } from "@/tokens/motif";
import type { KitSpec, ProcessId, FabricId, CategoryId, PersonalizationMode } from "@/spec/types";

type Draft = {
  sku: string;
  name: string;
  price: number;
  category: CategoryId;
  process: ProcessId;
  fabric: FabricId;
  gsm: number;
  block: string;
  mode: PersonalizationMode;
  blurb: string;
  continuousBand?: boolean;
  plateFront: string;
  plateSecondary: string;
  motifDefault?: "chevron" | "grid" | "arc";
  patternCopy?: string;
  strikeOffApproved?: boolean;
};

function trimsFor(process: ProcessId): KitSpec["garment"]["trims"] {
  if (process === "knit") return [];
  return [
    { id: "collar", finish: "pre-dyed" },
    { id: "cuff", finish: "pre-dyed" },
    { id: "waistband", finish: "pre-dyed" },
  ];
}

function build(d: Draft): KitSpec {
  const panels = ["front", "back", "yoke-left", "yoke-right", "side-left", "side-right"];
  const base: KitSpec = {
    sku: d.sku,
    name: d.name,
    price: d.price,
    category: d.category,
    process: d.process,
    blurb: d.blurb,
    garment: {
      block: d.block,
      panels,
      trims: trimsFor(d.process),
      gsm: d.gsm,
      fabric: d.fabric,
    },
    colorway: {
      body: COLOR.garnet,
      panel: COLOR.inkBlack,
      piping: COLOR.bone,
      trim: COLOR.trimBlack,
    },
    graphics: {
      crest: "boxing-bee",
      crestPlacement: { x: 0.34, y: 0.29, sizeMm: 55 },
      ...(d.continuousBand
        ? {
            chestBand: {
              text: "BAYONNE" as const,
              continuous: true,
              height: 48,
            },
          }
        : {}),
      ...(d.motifDefault ? { motif: d.motifDefault } : {}),
      tonalTexture: {
        mark: "boxing-bee",
        luminanceShift: 0.04,
        repeatMm: 28,
        rotationDeg: 15,
      },
      interiorPrint: "AVENUE A · EST. 1936",
    },
    personalization: { mode: d.mode },
    plates: { front: d.plateFront, secondary: d.plateSecondary },
    ...(d.patternCopy ? { patternCopy: d.patternCopy } : {}),
    ...(d.strikeOffApproved ? { strikeOffApproved: true } : {}),
  };
  return base;
}

const DRAFTS: Draft[] = [
  {
    sku: "BB-MJ-REP",
    name: "Match Jersey (Replica)",
    price: 58,
    category: "match",
    process: "sublimation-cutsew",
    fabric: "poly-interlock-matte",
    gsm: 150,
    block: "articulated-football-v2",
    mode: "name-number",
    continuousBand: true,
    blurb: "150gsm matte interlock. Continuous chest band. Tonal texture. Interior collar print.",
    plateFront: "jersey",
    plateSecondary: "jersey",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.chevron,
  },
  {
    sku: "BB-MJ-AUT",
    name: "Match Jersey (Authentic)",
    price: 98,
    category: "match",
    process: "sublimation-cutsew",
    fabric: "poly-mesh-engineered",
    gsm: 130,
    block: "articulated-football-v2-auth",
    mode: "name-number",
    continuousBand: true,
    blurb: "130gsm engineered mesh, laser-perf side zones, bonded crew, heat-sealed hems.",
    plateFront: "jersey",
    plateSecondary: "jersey",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.chevron,
  },
  {
    sku: "BB-MS",
    name: "Match Shorts",
    price: 36,
    category: "match",
    process: "sublimation-cutsew",
    fabric: "micro-poly",
    gsm: 135,
    block: "match-short-v1",
    mode: "motif",
    motifDefault: "chevron",
    blurb:
      "135gsm micro-poly. Double bone/white ink pinstripes on the side — sublimated, not embroidered. Pop-up: do not carry loose stock — sell inside sets or at $44+.",
    plateFront: "shorts",
    plateSecondary: "shorts",
    strikeOffApproved: true,
    patternCopy:
      "Double white ink pinstripes — match-day side language, two lines only (never three).",
  },
  {
    sku: "BB-SOCK",
    name: "Match Socks",
    price: 18,
    category: "match",
    process: "knit",
    fabric: "knit-jacquard",
    gsm: 0,
    block: "sock-knit",
    mode: "none",
    blurb: "Garnet sock, black/bone hoop. Attach-rate item.",
    plateFront: "shorts",
    plateSecondary: "shorts",
  },
  {
    sku: "BB-SET-REP",
    name: "Full Kit Set (Replica)",
    price: 104,
    category: "match",
    process: "sublimation-cutsew",
    fabric: "poly-interlock-matte",
    gsm: 150,
    block: "kit-set-rep",
    mode: "name-number",
    continuousBand: true,
    blurb: "Replica jersey + shorts + socks.",
    plateFront: "full-set",
    plateSecondary: "full-set",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.chevron,
  },
  {
    sku: "BB-SET-AUT",
    name: "Kit Set (Authentic)",
    price: 142,
    category: "match",
    process: "sublimation-cutsew",
    fabric: "poly-mesh-engineered",
    gsm: 130,
    block: "kit-set-auth",
    mode: "name-number",
    continuousBand: true,
    blurb: "Authentic jersey + shorts + socks.",
    plateFront: "full-set",
    plateSecondary: "full-set",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.chevron,
  },
  {
    sku: "BB-LSJ",
    name: "Long-Sleeve Jersey",
    price: 62,
    category: "training",
    process: "sublimation-cutsew",
    fabric: "poly-interlock-matte",
    gsm: 160,
    block: "ls-jersey-v1",
    mode: "name-number",
    continuousBand: true,
    blurb: "Thumbholes, interior hem print.",
    plateFront: "ls-jersey",
    plateSecondary: "ls-jersey",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.grid,
  },
  {
    sku: "BB-QZ",
    name: "Training Top ¼-Zip",
    price: 68,
    category: "training",
    process: "sublimation-cutsew",
    fabric: "poly-interlock-matte",
    gsm: 180,
    block: "quarter-zip-v1",
    mode: "motif",
    motifDefault: "grid",
    blurb: "Raglan sub body, pre-dyed black collar + zip guard.",
    plateFront: "quarter-zip",
    plateSecondary: "quarter-zip",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.grid,
  },
  {
    sku: "BB-ANTHEM",
    name: "Anthem Jacket",
    price: 128,
    category: "sideline",
    process: "sublimation-cutsew",
    fabric: "bonded-double-knit",
    gsm: 250,
    block: "anthem-v1",
    mode: "motif",
    motifDefault: "arc",
    blurb:
      "Signature piece. 250gsm bonded double-knit, garnet body, black raglan sleeves, bone piping at raglan seam, BAYONNE upper back, YKK zip.",
    plateFront: "quarter-zip",
    plateSecondary: "quarter-zip",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.arc,
  },
  {
    sku: "BB-F36",
    name: "Founding 36 Jacket",
    price: 165,
    category: "sideline",
    process: "sublimation-cutsew",
    fabric: "bonded-double-knit",
    gsm: 250,
    block: "founding-36-v1",
    mode: "motif",
    motifDefault: "arc",
    blurb:
      "Anthem silhouette, numbered 1/36–36/36 inside the collar. Pop-up anchor — BAYONNE, garnet, Avenue A. Six units only.",
    plateFront: "quarter-zip",
    plateSecondary: "quarter-zip",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.arc,
  },
  {
    sku: "BB-BEANIE",
    name: "Garnet Beanie",
    price: 34,
    category: "sideline",
    process: "knit",
    fabric: "knit-jacquard",
    gsm: 0,
    block: "beanie-knit",
    mode: "none",
    blurb: "One size. Garnet knit. September velocity item — no size risk.",
    plateFront: "aop-hat",
    plateSecondary: "aop-hat",
  },
  {
    sku: "BB-TEE",
    name: "Bayonne Tee",
    price: 38,
    category: "alumni",
    process: "sublimation-cutsew",
    fabric: "poly-interlock-matte",
    gsm: 145,
    block: "bayonne-tee-v1",
    mode: "none",
    blurb: "BAYONNE · 1936 · Avenue A. No school marks. No nickname until BOE permission.",
    plateFront: "jersey",
    plateSecondary: "jersey",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.grid,
  },
  {
    sku: "BB-PANT",
    name: "Sideline Pant",
    price: 62,
    category: "sideline",
    process: "sublimation-cutsew",
    fabric: "micro-poly",
    gsm: 140,
    block: "sideline-pant-v1",
    mode: "motif",
    motifDefault: "chevron",
    blurb: "Poly track pant (not fleece), gradient side panel, ankle zip.",
    plateFront: "sweatpants",
    plateSecondary: "sweatpants",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.chevron,
  },
  {
    sku: "BB-HOOPS",
    name: "Hoops Jersey",
    price: 52,
    category: "sideline",
    process: "sublimation-cutsew",
    fabric: "poly-mesh-engineered",
    gsm: 140,
    block: "hoops-v1",
    mode: "name-number",
    blurb: "Basketball — blackout mesh, garnet trim, crest left.",
    plateFront: "hoops-jersey",
    plateSecondary: "hoops-jersey",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.grid,
  },
  {
    sku: "BB-DRESS",
    name: "Jersey Dress",
    price: 72,
    category: "sideline",
    process: "sublimation-cutsew",
    fabric: "poly-interlock-matte",
    gsm: 155,
    block: "jersey-dress-v1",
    mode: "name-number",
    continuousBand: true,
    blurb: "One-piece sideline cut — strongest differentiated SKU in the line.",
    plateFront: "jersey-dress",
    plateSecondary: "jersey-dress",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.arc,
  },
  {
    sku: "BB-HAT",
    name: "AOP Hat",
    price: 36,
    category: "sideline",
    process: "sublimation-cutsew",
    fabric: "micro-poly",
    gsm: 0,
    block: "aop-hat-v1",
    mode: "motif-size",
    motifDefault: "grid",
    blurb: "Sub poly crown, pre-dyed black brim. S/M · L/XL.",
    plateFront: "aop-hat",
    plateSecondary: "aop-hat",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.grid,
  },
  {
    sku: "BB-1936",
    name: "1936 Crewneck",
    price: 72,
    category: "alumni",
    process: "embroidery-predyed",
    fabric: "cotton-poly-fleece",
    gsm: 320,
    block: "crew-1936",
    mode: "motif",
    motifDefault: "arc",
    blurb: "Pre-dyed garnet cotton-poly fleece, tonal embroidery, year on left sleeve.",
    plateFront: "crewneck",
    plateSecondary: "crewneck",
    patternCopy: MOTIF_MEANING.arc,
  },
  {
    sku: "BB-ASHORT",
    name: "Alumni Shorts",
    price: 42,
    category: "alumni",
    process: "sublimation-cutsew",
    fabric: "micro-poly",
    gsm: 135,
    block: "alumni-short-v1",
    mode: "motif",
    motifDefault: "chevron",
    blurb:
      "Same garnet as the Match strip. Double black ink pinstripes on the side — sublimated, not embroidered. Off-field cut.",
    plateFront: "geo-shorts",
    plateSecondary: "geo-shorts",
    strikeOffApproved: true,
    patternCopy:
      "Double black ink pinstripes — alumni/sideline side language, two lines only (never three).",
  },
  {
    sku: "BB-CLASS",
    name: "Class-Year Tee",
    price: 38,
    category: "alumni",
    process: "sublimation-cutsew",
    fabric: "poly-interlock-matte",
    gsm: 145,
    block: "class-tee-v1",
    mode: "name-number",
    blurb: "Grad year as the back number, Rail Cut. Reuses the personalization engine.",
    plateFront: "jersey",
    plateSecondary: "jersey",
    strikeOffApproved: true,
    patternCopy: MOTIF_MEANING.grid,
  },
  {
    sku: "BB-SCARF",
    name: "Avenue A Scarf",
    price: 34,
    category: "alumni",
    process: "knit",
    fabric: "knit-jacquard",
    gsm: 0,
    block: "scarf-jacquard",
    mode: "none",
    blurb: "Jacquard. Highest margin, universal sizing, ships flat.",
    plateFront: "crewneck",
    plateSecondary: "crewneck",
  },
];

export const SKUS: KitSpec[] = DRAFTS.map(build);

export function skuById(sku: string): KitSpec | undefined {
  return SKUS.find((s) => s.sku === sku);
}

export function skusInCategory(category: CategoryId): KitSpec[] {
  return SKUS.filter((s) => s.category === category);
}
