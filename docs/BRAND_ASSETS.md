# Brand assets — single source of truth

All Bayonne Bees imagery that the shop loads is declared in:

**[`src/lib/brandAssets.ts`](../src/lib/brandAssets.ts)**

| Export | Purpose |
|---|---|
| `CRESTS.primary` | Site chrome + Match crest master (`boxing-bee.png`) |
| `CRESTS.queen` | Queen Bees crest mark only |
| `LIFESTYLE.*` | Campaign story stills (`lifestyle/` — no manufacturer logos) |
| `PLATES[productId]` | Front + secondary plate for each catalog SKU |
| `SURFACES.*` | Landing hero, story, lookbook, OG, category heroes |

`src/lib/catalog.ts` builds product thumbs / previews and category heroes from `PLATES` / `SURFACES`. Routes import `CRESTS` / `SURFACES` — they must not import raw asset paths.

## Surface map

| Surface | Manifest key | Source |
|---|---|---|
| Landing hero | `SURFACES.landingHero` | `LIFESTYLE.focus` |
| Queen Bees lifestyle | `SURFACES.landingQueenStory` | `LIFESTYLE.queen` |
| Sideline lifestyle | `SURFACES.landingSideline` | `LIFESTYLE.sideline` |
| Landing Match lookbook | `SURFACES.landingMatchJersey` | Match Jersey front plate |
| Landing / store logo | `CRESTS.primary` | boxing-bee |
| Queen crest mark | `CRESTS.queen` | reveal-01-crest |
| Category heroes | `SURFACES.categoryHero.*` | Lead SKU front |
| Product cards / PDP | `PLATES[id]` via catalog | Per-SKU pair |
| Open Graph | `SURFACES.ogImage` | `LIFESTYLE.focus` |

Lifestyle stills carry the site story (Adidas visual language, no logos). Product plates stay for commerce / PDP identical match.

## Adding a SKU image

1. Add files under `src/assets/bayonne/previews/`.
2. Register the pair in `PLATES`.
3. Point the catalog product `thumb` / `previews` at `PLATES[id]`.
4. If it becomes a category lead, update `SURFACES.categoryHero`.
