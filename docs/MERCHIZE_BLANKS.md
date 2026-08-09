# Merchize blank map — Bayonne Team Customs

Print partner: **Merchize** (dye-sublimation AOP + DTF placements where noted).  
Every store hero and live PDP preview must show the **same** garment plate for that SKU.

## Print rendering rules

| Method | Use on | Look |
|---|---|---|
| **Dye sublimation (AOP)** | Full garment / panel color, geo fields, chest bands dyed in fabric | Soft fabric weave visible *through* ink; no raised edge; seams may show panel joins |
| **DTF** | Crest, wordmarks, small logos on dark mesh when needed | Thin film sit — flat, slight soft edge; **not** embroidered / 3D puff |

Do **not** show constructed multi-fabric color-block collars that Merchize blanks don’t sew. Greys/blacks on AOP blanks are **printed**, not separate rib pieces (unless the blank’s real construction includes that trim).

## SKU → Merchize blank

| App product | Shopify handle | Merchize blank | Print |
|---|---|---|---|
| Match Jersey | `bayonne-bees-jersey` | [All-over Print V-neck Short Sleeve Jersey](https://merchize.com/product/v-neck-short-sleeve-jersey/) (SKU `VSSJVN`) | Sublimation AOP + DTF crest |
| Match Shorts | `bayonne-bees-shorts` | [All-over Print Soccer Jersey Shorts](https://merchize.com/product/all-over-print-soccer-jersey-shorts/) | Sublimation AOP |
| Full Kit Set | `bayonne-bees-full-set` | [All-over Print Soccer Jersey Set](https://merchize.com/product/all-over-print-soccer-jersey-set/) (SKU `SJSEVN`) | Sublimation AOP + DTF crest |
| Hoops Jersey | `bayonne-bees-hoops-jersey` | [All-over Print Sleeveless Jersey Tank Top](https://merchize.com/product/all-over-print-sleeveless-jersey-tank-top/) | Sublimation + DTF |
| Jersey Dress | `bayonne-bees-jersey-dress` | [All-over Print Hoodie Dress](https://merchize.com/product/all-over-print-hoodie-dress/) *(closest Merchize dress blank)* | Sublimation AOP |
| Crest Cap | `bayonne-bees-aop-hat` | [All-over Print Baseball Cap](https://merchize.com/product/all-over-print-baseball-cap/) | Crown sublimation + DTF crest |
| 1936 Crewneck | `bayonne-bees-crewneck` | All-over Print crew / sweatshirt blank (Merchize AOP fleece) | Sublimation AOP + DTF crest |
| Base Layer Sweats | `bayonne-bees-sweatpants` | [All-over Print Sweatpants](https://merchize.com/product/all-over-print-sweatpants/) | Sublimation AOP |
| Long-Sleeve Jersey | `bayonne-bees-ls-jersey` | Long-sleeve AOP jersey / hockey long sleeve blank | Sublimation + DTF |
| Quarter-Zip | `bayonne-bees-quarter-zip` | [All-over Print Long Sleeve 1/4 Zip Jersey](https://merchize.com/product/all-over-print-long-sleeve-1-4-zip-jersey/) | Sublimation + DTF crest |
| Alumni Shorts | `bayonne-bees-geo-shorts` | All-over Print Sports / Jersey Shorts | Sublimation AOP |

## Hero = live view

Category heroes and landing kit plates **import the same preview module** as the PDP (`src/lib/catalog.ts`). Do not maintain a parallel hero artwork set for the same garment.

## Asset folder

- Live + hero plates: `src/assets/bayonne/previews/`
- Merchize reference downloads (not shipped to shoppers): `src/assets/bayonne/merchize-refs/` (optional, gitignored if large)
