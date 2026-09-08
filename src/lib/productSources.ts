/**
 * Internal sourcing provenance for Bayonne Athletics.
 *
 * Customer-facing copy must not expose supplier names, blank garment names,
 * wholesale costs, or source URLs. This file exists so product specs can be
 * traced back to a current public source before publication.
 */

export type ProductSource = {
  supplier: "OpenTip" | "Foot Locker";
  sourceName: string;
  sourceUrl: string;
  verifiedOn: string;
  facts: string[];
};

export const PRODUCT_SOURCES: Record<string, ProductSource> = {
  "club-sock": {
    supplier: "OpenTip",
    sourceName: "TOPTIE Custom Socks Cotton Unisex Mid-Calf Socks",
    sourceUrl: "https://www.opentip.com/TOPTIE-Custom-Socks-Cotton-Unisex-Socks-Ankle-Socks-Embroidered-Logo-p-16135966.html",
    verifiedOn: "2026-09-08",
    facts: [
      "Cotton construction",
      "Mid-calf athletic profile",
      "White or black base colors",
      "Moisture-wicking",
      "One size listed for shoe sizes 7–9.5",
      "7–9 working day listed production time",
    ],
  },
  "club-sock-4pk": {
    supplier: "OpenTip",
    sourceName: "TOPTIE Custom Socks Cotton Unisex Mid-Calf Socks",
    sourceUrl: "https://www.opentip.com/TOPTIE-Custom-Socks-Cotton-Unisex-Socks-Ankle-Socks-Embroidered-Logo-p-16135966.html",
    verifiedOn: "2026-09-08",
    facts: [
      "Four pairs of the same cotton mid-calf club sock",
      "White base",
      "Moisture-wicking athletic construction",
      "One size listed for shoe sizes 7–9.5",
    ],
  },
  "two-tone-cap": {
    supplier: "OpenTip",
    sourceName: "Port & Co CP83 Two-Tone Pigment-Dyed Cap",
    sourceUrl: "https://www.opentip.com/Custom-Port-Co-CP83-Two-Tone-Pigment-Dyed-Cap-p-13418096.html",
    verifiedOn: "2026-09-08",
    facts: [
      "100% cotton twill",
      "Garment-washed pigment-dyed finish",
      "Unstructured low profile",
      "Self-fabric slide closure with brass buckle and grommet",
      "One size",
    ],
  },
  "club-hood": {
    supplier: "OpenTip",
    sourceName: "Cotton Heritage M2781 Premium Full-Zip Hoodie",
    sourceUrl: "https://www.opentip.com/Cotton-Heritage-M2781-Premium-Full-Zip-Hoodie-p-15596188.html",
    verifiedOn: "2026-09-08",
    facts: [
      "8.5 oz three-end fleece",
      "65/35 cotton-polyester blend on core colors",
      "100% cotton-faced exterior",
      "Soft-washed finish",
      "Three-panel hood",
      "Covered zipper and tear-away label",
    ],
  },
  "recreation-crew": {
    supplier: "OpenTip",
    sourceName: "Port & Company PC850 Fan Favorite Fleece Crewneck",
    sourceUrl: "https://www.opentip.com/Custom-Port-Company-174-Fan-Favorite-Fleece-Crewneck-Sweatshirt-PC850-p-15756919.html",
    verifiedOn: "2026-09-08",
    facts: [
      "8.5 oz fleece",
      "80/20 ring-spun cotton-polyester on core colors",
      "Ring-spun cotton face",
      "Twill-taped neck",
      "Removable tag",
    ],
  },
  "collegiate-tee": {
    supplier: "OpenTip",
    sourceName: "Port & Co PC61 Essential Tee",
    sourceUrl: "https://www.opentip.com/Port-Company-174-Essential-Tee-PC61-p-4781221.html",
    verifiedOn: "2026-09-08",
    facts: [
      "6.1 oz soft-spun cotton",
      "100% cotton on core colors",
      "1x1 rib-knit collar",
      "Shoulder-to-shoulder back neck tape",
      "Removable tag",
    ],
  },
  "local-issue-ls": {
    supplier: "OpenTip",
    sourceName: "Port & Co PC61LSP Long Sleeve Essential Pocket Tee",
    sourceUrl: "https://www.opentip.com/Custom-Port-Co-PC61LSP-Long-Sleeve-Essential-Pocket-Tee-p-15756874.html",
    verifiedOn: "2026-09-08",
    facts: [
      "6.1 oz soft-spun cotton",
      "100% cotton on core colors",
      "Long-sleeve jersey construction",
      "Left chest pocket on the source blank",
    ],
  },
  "harbor-coach": {
    supplier: "OpenTip",
    sourceName: "Independent Trading Co. EXP95NB Hooded Windbreaker Coaches Jacket",
    sourceUrl: "https://www.opentip.com/Custom-Independent-Trading-Co-EXP95NB-Water-Resistant-Hooded-Windbreaker-Coaches-Jacket-p-13571174.html",
    verifiedOn: "2026-09-08",
    facts: [
      "100% nylon 330D shell with interior PU coating",
      "10,000 mm listed water-pressure resistance",
      "5,000 listed breathability/permeability",
      "Unlined hood",
      "Six-snap front",
      "Elastic cuffs and underarm grommets",
      "Drawcord at hood and hem",
    ],
  },
  "sideline-shell": {
    supplier: "OpenTip",
    sourceName: "Independent Trading Co. EXP54LWZ Lightweight Windbreaker Jacket",
    sourceUrl: "https://www.opentip.com/product.php?products_id=13571156",
    verifiedOn: "2026-09-08",
    facts: [
      "82 gsm 100% polyester shell",
      "Interior water-resistant coating",
      "600 mm listed water-pressure resistance",
      "Zip front",
      "Mesh-lined three-panel hood",
      "Welt pockets",
      "Packable lightweight construction",
    ],
  },
  "field-short-grey": {
    supplier: "OpenTip",
    sourceName: "Badger Sport 421200 Lineup Short",
    sourceUrl: "https://www.opentip.com/Custom-Badger-Sport-421200-Lineup-Short-p-15482653.html",
    verifiedOn: "2026-09-08",
    facts: [
      "100% polyester performance fabric",
      "Moisture-management and odor-protection finish",
      "Seven-inch inseam",
      "Two-inch covered elastic waistband",
      "Two deep side-seam pockets",
      "Athletic cut",
    ],
  },
  "field-short-bone": {
    supplier: "OpenTip",
    sourceName: "Badger Sport 421200 Lineup Short",
    sourceUrl: "https://www.opentip.com/Custom-Badger-Sport-421200-Lineup-Short-p-15482653.html",
    verifiedOn: "2026-09-08",
    facts: [
      "100% polyester performance fabric",
      "Moisture-management and odor-protection finish",
      "Seven-inch inseam",
      "Two-inch covered elastic waistband",
      "Two deep side-seam pockets",
      "Athletic cut",
    ],
  },
  "market-tote": {
    supplier: "OpenTip",
    sourceName: "Cotton Canvas Tote Bag, Color Evolution",
    sourceUrl: "https://www.opentip.com/Custom-Cotton-Canvas-Tote-Bag-Color-Evolution-p-8696833.html",
    verifiedOn: "2026-09-08",
    facts: [
      "6 oz cotton canvas",
      "16 in W x 6 in gusset x 12 in H",
      "20 in matching canvas handles",
      "Front and back print locations available on source blank",
    ],
  },
  "nb-bbp400": {
    supplier: "Foot Locker",
    sourceName: "New Balance P400",
    sourceUrl: "https://www.footlocker.com/product/model/new-balance-p400/466841.html",
    verifiedOn: "2026-09-08",
    facts: [
      "$130 current listed retail",
      "Fresh Foam X core with EVA cushioning",
      "Molded synthetic upper",
      "Lightweight nylon plate",
      "Perforated mesh outer layer",
      "D-width men's sizing on current Foot Locker listing",
    ],
  },
  "nb-p400-chalk": {
    supplier: "Foot Locker",
    sourceName: "New Balance P400",
    sourceUrl: "https://www.footlocker.com/product/model/new-balance-p400/466841.html",
    verifiedOn: "2026-09-08",
    facts: [
      "$130 current listed retail for the P400 family",
      "Fresh Foam X core with EVA cushioning",
      "Molded synthetic upper",
      "Lightweight nylon plate",
      "Perforated mesh outer layer",
    ],
  },
  "nb-p400-volt": {
    supplier: "Foot Locker",
    sourceName: "New Balance P400",
    sourceUrl: "https://www.footlocker.com/product/model/new-balance-p400/466841.html",
    verifiedOn: "2026-09-08",
    facts: [
      "$130 current listed retail for the P400 family",
      "Fresh Foam X core with EVA cushioning",
      "Molded synthetic upper",
      "Lightweight nylon plate",
      "Perforated mesh outer layer",
    ],
  },
};

export function sourceForProduct(id: string) {
  return PRODUCT_SOURCES[id];
}
