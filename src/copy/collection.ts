/**
 * Customer-facing Fall 001 copy.
 * No supplier names, blanks, COGS, DTF, or internal production codes.
 */

type CategoryId = "match" | "performance" | "travel" | "harbor" | "club";

export const COLLECTION_COPY = {
  brand: "Bayonne Athletics",
  season: "Fall 001 · 07002",
  lockup: "Train. Belong. Endure.",
  title: "Made for movement. Made for the city that gives the collection its name.",
  body: "Bayonne Athletics is built around the things a uniform does when the game is over.\n\nMatch pieces. Training layers. Heavyweight travel goods. Waterfront outerwear. The cap you keep by the door.",
  cta: "Enter Fall 001 →",
} as const;

export type ProductCopy = {
  tagline: string;
  body: string;
  card: string;
  cta: string;
  confirm: string;
  personalizeHeading?: string;
  personalizeHelper?: string;
};

export const PRODUCT_COPY: Record<string, ProductCopy> = {
  "heritage-jersey": {
    tagline: "Heritage made wearable.",
    body: "Black and garnet club jersey built from the Bayonne 1936 language. Wear it clean or make it yours.\n\nYour name. Your number. Bayonne across the front.",
    card: "Black and garnet club jersey built from the Bayonne 1936 language. Wear it clean or make it yours.",
    cta: "Make it yours →",
    personalizeHeading: "Your name. Your number.",
    personalizeHelper: "Add the name and number exactly as you want them printed. Leave both blank for the $78 club jersey.",
    confirm:
      "I’ve checked the spelling, number and size. I understand personalized pieces can’t be changed after checkout.",
  },
  "match-short": {
    tagline: "The bottom half of the strip.",
    body: "Clean black match short with restrained garnet club marks and an athletic cut built for movement.",
    card: "Clean black match short with restrained garnet club marks and an athletic cut built for movement.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "match-set": {
    tagline: "The complete club uniform.",
    body: "The complete club uniform: Heritage Jersey and Match Short together.",
    card: "The complete club uniform: Heritage Jersey and Match Short together.",
    cta: "Shop the set →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "performance-ls": {
    tagline: "Built to move.",
    body: "Lightweight technical long sleeve for training, running and cool-weather movement.",
    card: "Lightweight technical long sleeve for training, running and cool-weather movement.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "performance-short": {
    tagline: "Seven inches. No extra noise.",
    body: "Seven-inch training short with clean movement, useful storage and minimal Bayonne marking.",
    card: "Seven-inch training short with clean movement, useful storage and minimal Bayonne marking.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "mens-raglan": {
    tagline: "The training tee.",
    body: "Lightweight raglan performance tee with an athletic fit and restrained Bayonne chest mark.",
    card: "Lightweight raglan performance tee with an athletic fit and restrained Bayonne chest mark.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "womens-raglan": {
    tagline: "Cut for movement.",
    body: "Technical raglan tee shaped for movement, breathability and an easy athletic fit.",
    card: "Technical raglan tee shaped for movement, breathability and an easy athletic fit.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "performance-set": {
    tagline: "One training uniform.",
    body: "Performance Long Sleeve and seven-inch short paired as one training uniform.",
    card: "Performance Long Sleeve and seven-inch short paired as one training uniform.",
    cta: "Shop the set →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "max-heavy-full-zip": {
    tagline: "The everyday layer.",
    body: "Heavyweight full-zip layer with relaxed proportions and quiet Bayonne branding.",
    card: "Heavyweight full-zip layer with relaxed proportions and quiet Bayonne branding.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "max-heavy-sweatpant": {
    tagline: "Travel. Recovery. Repeat.",
    body: "Heavyweight relaxed sweatpant built for travel, recovery and everyday wear.",
    card: "Heavyweight relaxed sweatpant built for travel, recovery and everyday wear.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "travel-set": {
    tagline: "One uniform for transit.",
    body: "The Max Heavy Full Zip and Sweatpant together. One uniform for transit and off-hours.",
    card: "The Max Heavy Full Zip and Sweatpant together. One uniform for transit and off-hours.",
    cta: "Shop the set →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "pique-polo": {
    tagline: "Refined. Still Bayonne.",
    body: "Heavyweight stretch pique with a refined silhouette and understated Bayonne chest mark.",
    card: "Heavyweight stretch pique with a refined silhouette and understated Bayonne chest mark.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "pocket-ls": {
    tagline: "Substantial cotton.",
    body: "Substantial cotton jersey, relaxed fit and a restrained pocket-level Bayonne detail.",
    card: "Substantial cotton jersey, relaxed fit and a restrained pocket-level Bayonne detail.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "field-cargo": {
    tagline: "Utility, kept quiet.",
    body: "Relaxed utility cargo with practical storage, comfortable volume and minimal club branding.",
    card: "Relaxed utility cargo with practical storage, comfortable volume and minimal club branding.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "harbor-coach": {
    tagline: "Built on water.",
    body: "Matte-black hooded coach shell built for the waterfront. Tonal Harbor Division chest mark with the bridge treatment across the back.",
    card: "Matte-black hooded coach shell built for the waterfront. Tonal Harbor Division chest mark with the bridge treatment across the back.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "two-tone-cap": {
    tagline: "Keep the mark close.",
    body: "Bone crown. Black bill. Garnet Gothic B. The everyday Bayonne club cap.",
    card: "Bone crown. Black bill. Garnet Gothic B. The everyday Bayonne club cap.",
    cta: "View club good →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "gothic-b-beanie": {
    tagline: "Quiet all-season knit.",
    body: "Textured knit with a single garnet Gothic B and a quiet all-season profile.",
    card: "Textured knit with a single garnet Gothic B and a quiet all-season profile.",
    cta: "View club good →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "club-sock": {
    tagline: "The mark at the ankle.",
    body: "Clean white club sock finished with the garnet Gothic B at the ankle.",
    card: "Clean white club sock finished with the garnet Gothic B at the ankle.",
    cta: "View club sock →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "nb-bbp400": {
    tagline: "Court-built. Club-selected.",
    body: "Court-built New Balance footwear selected to sit naturally inside the Bayonne Athletics uniform.",
    card: "Court-built New Balance footwear selected to sit naturally inside the Bayonne Athletics uniform.",
    cta: "Choose your pair →",
    confirm: "I’ve checked my size. I understand this pair can’t be changed after checkout.",
  },
  "nb-runner": {
    tagline: "Daily miles.",
    body: "Cushioned everyday runner selected for training days, travel and daily miles.",
    card: "Cushioned everyday runner selected for training days, travel and daily miles.",
    cta: "Choose your pair →",
    confirm: "I’ve checked my size. I understand this pair can’t be changed after checkout.",
  },
};

export const DEPARTMENT_COPY: Record<
  CategoryId,
  { line: string; title: string; body: string; cta: string }
> = {
  match: {
    line: "1936 Match",
    title: "Heritage made wearable.",
    body: "The club jersey and match short. The clearest expression of Bayonne Athletics, reduced to the things that belong.",
    cta: "Shop 1936 Match →",
  },
  performance: {
    line: "Performance",
    title: "Built to move.",
    body: "Technical layers for training, running and the hours before and after both.",
    cta: "Shop Performance →",
  },
  travel: {
    line: "Travel + Core",
    title: "The everyday uniform.",
    body: "Heavyweight layers, refined basics and utility pieces made for transit, recovery and repeat wear.",
    cta: "Shop Travel + Core →",
  },
  harbor: {
    line: "Harbor Division",
    title: "Built on water.",
    body: "Outerwear shaped by the industrial edge of the city: black shell, quiet front, bridge at the back.",
    cta: "Shop Harbor Division →",
  },
  club: {
    line: "Club Goods",
    title: "Keep the mark close.",
    body: "Caps, knit, socks and footwear that carry the club without requiring the full uniform.",
    cta: "Shop Club Goods →",
  },
};

export function productCopyFor(productId: string): ProductCopy | null {
  return PRODUCT_COPY[productId] ?? null;
}

export function departmentLine(id: CategoryId): string {
  return DEPARTMENT_COPY[id].line;
}
