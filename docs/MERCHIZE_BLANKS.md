# Fulfillment blank map — Bayonne Team Customs

**Match strip (jersey / shorts / set):** fulfilled by **owayo** (Regensburg — F6 Hero / FP6 Hero cut-and-sew sublimation). Spec lock: `docs/OWAYO_F6_HERO.md`.

Other SKUs below may still reference legacy Merchize AOP blanks until migrated.

## Print rendering rules

| Method | Use on | Look |
|---|---|---|
| **Cut-and-sew sublimation (owayo)** | Match jersey F6 Hero, shorts FP6 Hero | Self-fabric ringer collar, continuous chest band, flat cuff panels |
| **Dye sublimation (AOP)** | Full garment / panel color, geo fields, chest bands dyed in fabric | Soft fabric weave visible *through* ink; no raised edge; seams may show panel joins |
| **DTF** | Crest, wordmarks, small logos on dark mesh when needed | Thin film sit — flat, slight soft edge; **not** embroidered / 3D puff |

owayo collars are **sublimated self-fabric**, not knit rib. Use a flat two-color ringer (black + bone inner line) — not a folded polo with tipping.

## SKU → blank / model

| App product | Shopify handle | Blank / model | Print |
|---|---|---|---|
| Match Jersey | `bayonne-bees-jersey` | **owayo F6 Hero** (narrow crew ringer) | Full sublimation; name/number included |
| Match Shorts | `bayonne-bees-shorts` | **owayo FP6 Hero** | Full sublimation; single 18mm bone outseam tape |
| Full Kit Set | `bayonne-bees-full-set` | F6 Hero + FP6 Hero | As above |
| Hoops Jersey | `bayonne-bees-hoops-jersey` | [All-over Print Sleeveless Jersey Tank Top](https://merchize.com/product/all-over-print-sleeveless-jersey-tank-top/) | Sublimation + DTF |
| Jersey Dress | `bayonne-bees-jersey-dress` | [All-over Print Hoodie Dress](https://merchize.com/product/all-over-print-hoodie-dress/) *(closest Merchize dress blank)* | Sublimation AOP |
| Crest Cap | `bayonne-bees-aop-hat` | [All-over Print Baseball Cap](https://merchize.com/product/all-over-print-baseball-cap/) | Crown sublimation + DTF crest |
| 1936 Crewneck | `bayonne-bees-crewneck` | All-over Print crew / sweatshirt blank (Merchize AOP fleece) | Sublimation AOP + DTF crest |
| Base Layer Sweats | `bayonne-bees-sweatpants` | [All-over Print Sweatpants](https://merchize.com/product/all-over-print-sweatpants/) | Sublimation AOP |
| Long-Sleeve Jersey | `bayonne-bees-ls-jersey` | Long-sleeve AOP jersey / hockey long sleeve blank | Sublimation + DTF |
| Quarter-Zip | `bayonne-bees-quarter-zip` | [All-over Print Long Sleeve 1/4 Zip Jersey](https://merchize.com/product/all-over-print-long-sleeve-1-4-zip-jersey/) | Sublimation + DTF crest |
| Alumni Shorts | `bayonne-bees-geo-shorts` | All-over Print Sports / Jersey Shorts | Sublimation AOP; single 18mm bone outseam tape |

## Hero = live view

Category heroes and landing kit plates **import the same preview module** as the PDP (`src/lib/catalog.ts`). Do not maintain a parallel hero artwork set for the same garment.

## Asset folder

- Live + hero plates: `src/assets/bayonne/previews/`
- Merchize reference downloads (not shipped to shoppers): `src/assets/bayonne/merchize-refs/` (optional, gitignored if large)
