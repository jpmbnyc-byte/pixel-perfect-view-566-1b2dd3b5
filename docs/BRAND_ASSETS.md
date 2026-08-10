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

Lifestyle stills carry the site story. Product plates stay for **Tier 2 TRUTH** (configurator / live preview). **Tier 1 CAMPAIGN** on-body model shots are a separate registry (`src/media/campaignAssets.ts`) — see `docs/CAMPAIGN_SHOOT.md` and `docs/parity.md`. Do not weaken the Tier 2 parity gate to match photography.

Until the campaign shoot lands, lettered SKUs bind campaign views to plate placeholders with status `placeholder` and demo lettering `AVENUE A` / `36` plus the “Your name goes here” badge.

## Adding a SKU image

1. Add files under `src/assets/bayonne/previews/` (truth plates).
2. Register the pair in `PLATES`.
3. Point the catalog product `thumb` / `previews` at `PLATES[id]`.
4. If it becomes a category lead, update `SURFACES.categoryHero`.
5. For campaign (Tier 1): front / three-quarter / back per `CAMPAIGN_SHOOT.md`; lettered backs carry name + `36`; grade ΔE00 ≤ 4.0 to `#5A1626`.
