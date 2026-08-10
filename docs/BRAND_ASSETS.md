# Brand assets — single source of truth

All Bayonne Bees imagery that the shop loads is declared in:

**[`src/lib/brandAssets.ts`](../src/lib/brandAssets.ts)**

| Export | Purpose |
|---|---|
| `CRESTS.primary` | Site chrome + Match crest master (`boxing-bee.png`) |
| `CRESTS.queen` | Queen Bees story crest only |
| `PLATES[productId]` | Front + secondary plate for each catalog SKU |
| `SURFACES.*` | Landing hero, lookbook, place plate, OG image, category heroes |

`src/lib/catalog.ts` builds product thumbs / previews and category heroes from `PLATES` / `SURFACES`. Routes import `CRESTS` / `SURFACES` — they must not import raw asset paths.

## Surface map

| Surface | Manifest key | Plate / crest |
|---|---|---|
| Landing hero | `SURFACES.landingHero` | Match Jersey front |
| Landing Match lookbook | `SURFACES.landingMatchJersey` | Match Jersey front |
| Landing place | `SURFACES.landingPlace` | Alumni Shorts front |
| Landing / store logo | `CRESTS.primary` | boxing-bee |
| Queen Bees block | `CRESTS.queen` | reveal-01-crest |
| Category heroes | `SURFACES.categoryHero.*` | Lead SKU front |
| Product cards / PDP | `PLATES[id]` via catalog | Per-SKU pair |
| Open Graph | `SURFACES.ogImage` | Match Jersey front |

Landing hero intentionally uses **Match Jersey** front so the first viewport matches the primary CTA and PDP front view.

## Adding a SKU image

1. Add files under `src/assets/bayonne/previews/`.
2. Register the pair in `PLATES`.
3. Point the catalog product `thumb` / `previews` at `PLATES[id]`.
4. If it becomes a category lead, update `SURFACES.categoryHero`.
