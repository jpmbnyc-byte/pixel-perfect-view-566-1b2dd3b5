/**
 * Customer-facing Fall 001 copy.
 * No supplier names, blanks, COGS, DTF, or internal production codes.
 */

type CategoryId = "match" | "performance" | "travel" | "harbor" | "club";

export const COLLECTION_COPY = {
  brand: "Bayonne Athletics",
  season: "Fall 001 · 07002",
  lockup: "Built different.",
  place: "Bayonne · 07002",
  community: "The city on the water. Represent.",
  standard: "Athletics for a higher standard.",
  motto: "Train · Compete · Represent",
  title: "Made for movement. Made for the city that gives the collection its name.",
  body: "Bayonne Athletics is built around the things a uniform does when the game is over.\n\nMatch pieces. Training layers. Heavyweight travel goods. Waterfront outerwear. The cap you keep by the door.",
  cta: "Enter Fall 001",
  shopCta: "Shop the collection",
} as const;

export type ProductCopy = {
  tagline: string;
  /** Lookbook second line: material · color. Not a manifesto. */
  line: string;
  body: string;
  card: string;
  cta: string;
  confirm: string;
  personalizeHeading?: string;
  personalizeHelper?: string;
};

export const PRODUCT_COPY: Record<string, ProductCopy> = {
  "heritage-jersey": {
    tagline: "Put your name on it.",
    line: "Performance knit · Garnet / Black",
    body: "The 1936 Match Jersey in garnet and black — club marks on the chest, number on the front, your name and number across the back.\n\nWear it clean for $78, or put your name on it for $98.",
    card: "Garnet and black match jersey. Wear it clean, or put your name on it.",
    cta: "Put your name on it →",
    personalizeHeading: "Put your name on it.",
    personalizeHelper: "Add the name and number exactly as you want them printed on the back. Letters, spaces, hyphens and apostrophes. Leave both blank for the $78 club jersey.",
    confirm: "I’ve checked the spelling, number and size. I understand personalized pieces can’t be changed after checkout.",
  },
  "match-short": {
    tagline: "The bottom half of the strip.",
    line: "Athletic knit · Black / Garnet",
    body: "Clean black match short with restrained garnet club marks and an athletic cut built for movement.",
    card: "Clean black match short with restrained garnet club marks and an athletic cut built for movement.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "match-set": {
    tagline: "The complete club uniform.",
    line: "Jersey + short · Black / Garnet",
    body: "The complete club uniform: Match Jersey and Match Short together.",
    card: "The complete club uniform: Match Jersey and Match Short together.",
    cta: "Shop the set →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "broadway-21-jersey": {
    tagline: "Broadway on the back.",
    line: "Performance jersey · Garnet / Black / Bone",
    body: "The Broadway 21 club jersey uses the high-contrast garnet-and-black base, bone numbering, the Gothic B, Bayonne Athletics chest mark and Cake Bee club icon. Built as a limited club strip rather than a replacement for the 1936 kit.",
    card: "Garnet-and-black Broadway 21 club jersey with bone numbering and Bayonne club marks.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "broadway-club-short": {
    tagline: "The club short.",
    line: "Athletic knit · Black / Garnet",
    body: "Black club short for the Broadway strip, finished with the garnet Gothic B and collegiate Bayonne Athletics lockup.",
    card: "Black Broadway club short with garnet Gothic B and collegiate Bayonne lockup.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "broadway-21-set": {
    tagline: "One complete strip.",
    line: "Jersey + short · Garnet / Black",
    body: "Broadway 21 Club Jersey and Broadway Club Short together as one limited match set.",
    card: "Broadway 21 jersey and black club short as one complete strip.",
    cta: "Shop the set →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "performance-ls": {
    tagline: "Built to move.",
    line: "Technical knit · Black",
    body: "Lightweight technical long sleeve for training, running and cool-weather movement. Chest mark in white. Gothic B at the cuff.",
    card: "Technical long sleeve in black, with the chest mark and cuff B.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "performance-short": {
    tagline: "Seven inches. No extra noise.",
    line: "Technical knit · Black",
    body: "Seven-inch training short with clean movement, useful storage and minimal Bayonne marking. 07002 on one leg. Gothic B on the other.",
    card: "Seven-inch training short in black, with 07002 and the gothic B.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "mens-raglan": {
    tagline: "The training tee.",
    line: "Technical jersey · Black",
    body: "Lightweight raglan performance tee with an athletic fit and restrained Bayonne chest mark.",
    card: "Lightweight raglan performance tee with an athletic fit and restrained Bayonne chest mark.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "womens-raglan": {
    tagline: "Cut for movement.",
    line: "Technical jersey · Black",
    body: "Technical raglan tee shaped for movement, breathability and an easy athletic fit.",
    card: "Technical raglan tee shaped for movement, breathability and an easy athletic fit.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "performance-set": {
    tagline: "One training uniform.",
    line: "Long sleeve + short · Black",
    body: "Performance Long Sleeve and seven-inch short worn as one training uniform — photographed on both women’s and men’s fits.",
    card: "The training uniform: long sleeve and seven-inch short, photographed on both fits.",
    cta: "Shop the set →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "field-short-grey": {
    tagline: "Training utility.",
    line: "Performance polyester · Grey",
    body: "Seven-inch athletic short in grey with moisture-management performance fabric, covered elastic waistband and deep side pockets. Designed as the lighter neutral field option.",
    card: "Seven-inch grey performance short with deep side pockets and an athletic cut.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "field-short-bone": {
    tagline: "Training utility.",
    line: "Performance polyester · Bone",
    body: "Seven-inch athletic short in bone with moisture-management performance fabric, covered elastic waistband and deep side pockets. A warm neutral counterpart to the grey field short.",
    card: "Seven-inch bone performance short with deep side pockets and an athletic cut.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "max-heavy-full-zip": {
    tagline: "The everyday layer.",
    line: "Heavyweight fleece · Black",
    body: "Heavyweight full-zip hoodie with relaxed proportions, a quiet arched BAYONNE ATHLETICS 07002 chest mark, and the weight to live in between cities.",
    card: "Heavyweight full-zip hoodie with relaxed proportions and a quiet 07002 chest mark.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "max-heavy-sweatpant": {
    tagline: "Travel. Recovery. Repeat.",
    line: "Heavyweight fleece · Black",
    body: "Heavyweight relaxed sweatpant with the matching arched 07002 thigh mark. Built for transit, recovery and the walk from the platform.",
    card: "Heavyweight relaxed sweatpant with the matching arched 07002 thigh mark.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "travel-set": {
    tagline: "One uniform for transit.",
    line: "Full zip + sweatpant · Black",
    body: "The Max Heavy Full Zip and Sweatpant together — the same heavyweight fleece on both fits. One uniform for transit and off-hours.",
    card: "The Max Heavy Full Zip and Sweatpant together. One uniform for transit and off-hours.",
    cta: "Shop the set →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "pique-polo": {
    tagline: "Refined. Still Bayonne.",
    line: "Stretch piqué · Black",
    body: "Heavyweight stretch pique with a refined silhouette and understated Bayonne chest mark.",
    card: "Heavyweight stretch pique with a refined silhouette and understated Bayonne chest mark.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "pocket-ls": {
    tagline: "Substantial cotton.",
    line: "Cotton jersey · Black",
    body: "Substantial cotton jersey, relaxed fit and a restrained pocket-level Bayonne detail.",
    card: "Substantial cotton jersey, relaxed fit and a restrained pocket-level Bayonne detail.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "field-cargo": {
    tagline: "Utility, kept quiet.",
    line: "Utility twill · Black",
    body: "Relaxed utility cargo with practical storage, comfortable volume and minimal club branding.",
    card: "Relaxed utility cargo with practical storage, comfortable volume and minimal club branding.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "club-hood": {
    tagline: "The club layer.",
    line: "8.5 oz fleece · Black",
    body: "Soft-washed full-zip club hood built from substantial three-end fleece with a cotton-faced exterior, three-panel hood and covered zipper. Quiet enough for travel; substantial enough to live in.",
    card: "Soft-washed 8.5 oz full-zip club hood with a cotton-faced exterior.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "collegiate-tee": {
    tagline: "The everyday collegiate mark.",
    line: "6.1 oz cotton · Bone / Garnet",
    body: "Substantial soft-spun cotton tee with a classic rib-knit collar, taped neck and the Bayonne collegiate lockup. Built to feel like a club-store shirt that got better with age.",
    card: "6.1 oz soft-spun cotton collegiate tee with the Bayonne arch lockup.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "recreation-crew": {
    tagline: "Off-hours uniform.",
    line: "8.5 oz fleece · Heather / Garnet",
    body: "Smooth-faced 8.5 oz fleece crewneck with a ring-spun cotton face, taped neck and an easy recreation fit. A club sweatshirt without the souvenir-shop feel.",
    card: "Smooth-faced 8.5 oz fleece crewneck for travel, recovery and everyday wear.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "local-issue-ls": {
    tagline: "Local issue.",
    line: "6.1 oz cotton jersey · Black",
    body: "Traditional long-sleeve cotton jersey with substantial hand and a restrained Bayonne treatment. Built from the same uncomplicated logic as a dependable club-store essential.",
    card: "6.1 oz cotton long sleeve with a restrained Local Issue treatment.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "harbor-coach": {
    tagline: "Built on water.",
    line: "Water-resistant nylon · Black / Black",
    body: "Black hooded coach shell built for the waterfront: durable nylon with an interior water-resistant coating, snap front, elastic cuffs, underarm grommets and drawcord adjustment at the hood and hem. Tonal Harbor Division chest mark with the bridge treatment across the back.",
    card: "Water-resistant black hooded coach shell with Harbor Division chest mark and bridge back treatment.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "harbor-pullover": {
    tagline: "Harbor quarter-zip.",
    line: "Technical nylon · Garnet",
    body: "Garnet Harbor Division quarter-zip with a tonal diamond-grid yoke, pennant B on the chest, and arched BAYONNE ATHLETICS 07002 across the back. Elastic cuffs, side welt pockets, stand collar.",
    card: "Garnet Harbor Division quarter-zip with pennant B chest and arched 07002 back.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "harbor-sweatpant-black": {
    tagline: "Harbor fleece, black.",
    line: "Fleece · Black / Garnet",
    body: "Black Harbor Division fleece with a garnet club mark. Same waterfront language as the coach shell, cut as a sweatpant for travel and the walk along the water.",
    card: "Black Harbor Division fleece sweatpant with a garnet club mark.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "harbor-sweatpant-grey": {
    tagline: "Harbor fleece, heather.",
    line: "Fleece · Heather Grey / Garnet",
    body: "Heather grey Harbor Division fleece with the garnet BAYONNE ATHLETICS 07002 mark on the thigh, elastic waist, braided drawcord and side-seam pockets. Cuffed at the ankle.",
    card: "Heather grey Harbor Division fleece with a garnet 07002 mark.",
    cta: "Choose your size →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "two-tone-cap": {
    tagline: "Keep the mark close.",
    line: "Cotton twill · Bone / Black",
    body: "Bone crown. Black bill. Garnet Gothic B. Garment-washed cotton twill in a low, unstructured profile with an adjustable self-fabric strap and brass buckle.",
    card: "Bone-and-black cotton-twill club cap with garnet Gothic B.",
    cta: "View club good →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "gothic-b-beanie": {
    tagline: "Quiet all-season knit.",
    line: "Waffle knit · Black / Garnet",
    body: "Black waffle knit with a single garnet Gothic B on the front and a quiet all-season profile.",
    card: "Black waffle knit with a single garnet Gothic B on the front.",
    cta: "View club good →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "gothic-b-beanie-brown": {
    tagline: "Quiet all-season knit.",
    line: "Waffle knit · Brown / Garnet",
    body: "Brown waffle knit with a single garnet Gothic B on the front and a quiet all-season profile.",
    card: "Brown waffle knit with a single garnet Gothic B on the front.",
    cta: "View club good →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "club-sock": {
    tagline: "The mark at the ankle.",
    line: "Cotton athletic knit · White / Garnet",
    body: "White mid-calf club sock in soft cotton with moisture-wicking athletic construction and the garnet Gothic B at the ankle.",
    card: "White cotton mid-calf club sock with the garnet Gothic B.",
    cta: "View club sock →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "club-sock-4pk": {
    tagline: "Four for the rotation.",
    line: "4 × cotton athletic knit · White / Garnet",
    body: "Four pairs of the white mid-calf Club Sock — the same soft cotton, moisture-wicking athletic construction and garnet Gothic B, bundled for the weekly rotation.",
    card: "Four-pair Club Sock bundle in white with the garnet Gothic B.",
    cta: "Shop the 4-pack →",
    confirm: "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "market-tote": {
    tagline: "Carry the club.",
    line: "Cotton canvas · Natural",
    body: "Six-ounce cotton-canvas market tote with a six-inch gusset and long matching handles. Sized to carry the day without becoming another oversized branded bag.",
    card: "Six-ounce cotton-canvas market tote with long handles and quiet Bayonne marking.",
    cta: "View club good →",
    confirm: "I understand made-to-order pieces can’t be changed after checkout.",
  },
  "nb-bbp400": {
    tagline: "Court-built. Club-selected.",
    line: "Court footwear · Cloud Blue / White",
    body: "New Balance P400 court footwear selected to sit naturally inside the Bayonne Athletics uniform. Fresh Foam X core cushioning with EVA, a molded synthetic upper, perforated mesh outer layer and a lightweight nylon plate for quick stops and transitions.",
    card: "New Balance P400 with Fresh Foam X cushioning and a lightweight nylon plate.",
    cta: "Choose your pair →",
    confirm: "I’ve checked my size. I understand this pair can’t be changed after checkout.",
  },
  "nb-p400-chalk": {
    tagline: "Court-built. Club-selected.",
    line: "Textile / synthetic · Pink Chalk / White",
    body: "The P400 in Pink Chalk / White. Fresh Foam X core cushioning with EVA, a molded synthetic upper, perforated mesh outer layer and a lightweight nylon plate. Unisex last; the size on the page is the pair on the floor.",
    card: "Pink Chalk P400 with Fresh Foam X cushioning and a lightweight nylon plate.",
    cta: "Choose your pair →",
    confirm: "I’ve checked my size. I understand this pair can’t be changed after checkout.",
  },
  "nb-p400-volt": {
    tagline: "Court-built. Club-selected.",
    line: "Textile / synthetic · Afterglow",
    body: "The P400 in Afterglow. Fresh Foam X core cushioning with EVA, a molded synthetic upper, perforated mesh outer layer and a lightweight nylon plate. Unisex last; the size on the page is the pair on the floor.",
    card: "Afterglow P400 with Fresh Foam X cushioning and a lightweight nylon plate.",
    cta: "Choose your pair →",
    confirm: "I’ve checked my size. I understand this pair can’t be changed after checkout.",
  },
  "nb-runner": {
    tagline: "Daily miles.",
    line: "Everyday runner · Black / Afterglow",
    body: "Cushioned everyday runner selected for training days, travel and daily miles.",
    card: "Cushioned everyday runner selected for training days, travel and daily miles.",
    cta: "Choose your pair →",
    confirm: "I’ve checked my size. I understand this pair can’t be changed after checkout.",
  },
  "nb-runner-heat": {
    tagline: "Daily miles.",
    line: "Mesh · Pink Heat / Black",
    body: "The AC Runner in Pink Heat / Black. Fresh Foam X in three densities, firm rails for lateral work, mesh upper, sculpted midsole. Men’s sizing with women’s conversion on the size buttons — only the size in stock.",
    card: "Pink Heat / Black AC Runner. Fresh Foam X, in the size we actually have.",
    cta: "Choose your pair →",
    confirm: "I’ve checked my size. I understand this pair can’t be changed after checkout.",
  },
  "nb-runner-cardinal": {
    tagline: "Daily miles.",
    line: "Mesh · White / Cardinal",
    body: "The AC Runner in White / Cardinal. Fresh Foam X in three densities, firm rails for lateral work, mesh upper, sculpted midsole. Men’s sizing with women’s conversion on the size buttons — only the size in stock.",
    card: "White / Cardinal AC Runner. Fresh Foam X, in the size we actually have.",
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
    body: "The 1936 strip and limited Broadway 21 kit. The clearest expressions of Bayonne Athletics, reduced to the things that belong.",
    cta: "Shop 1936 Match →",
  },
  performance: {
    line: "Performance",
    title: "Built to move.",
    body: "Training tops, seven-inch shorts and field neutrals built around movement, storage and repeat wear.",
    cta: "Shop Performance →",
  },
  travel: {
    line: "Travel + Core",
    title: "The everyday uniform.",
    body: "Heavyweight fleece on both fits — couple and solo studio stills of the Max Heavy set — plus collegiate basics and utility pieces made for transit, recovery and repeat wear.",
    cta: "Shop Travel + Core →",
  },
  harbor: {
    line: "Harbor Division",
    title: "Built on water.",
    body: "Coach shell, garnet quarter-zip pullover and Harbor Division fleece for the waterfront: quiet fronts, garnet marks, weather-ready construction.",
    cta: "Shop Harbor Division →",
  },
  club: {
    line: "Club Goods",
    title: "Keep the mark close.",
    body: "Caps, knit, socks, canvas goods and footwear that carry the club without requiring the full uniform.",
    cta: "Shop Club Goods →",
  },
};

export function productCopyFor(productId: string): ProductCopy | null {
  return PRODUCT_COPY[productId] ?? null;
}

export function departmentLine(id: CategoryId): string {
  return DEPARTMENT_COPY[id].line;
}
