# Bayonne Bees brand assets

**Single source of truth for what the app loads:** [`src/lib/brandAssets.ts`](../../lib/brandAssets.ts).

Do not import jpg/png paths from routes or components except through that manifest (or catalog fields built from it).

| Folder | Contents |
|---|---|
| `spirit/` | `boxing-bee.png` — Match crest + site chrome (`CRESTS.primary`) |
| `reveal/` | `reveal-01-crest.jpg` — Queen Bees crest mark (`CRESTS.queen`) |
| `lifestyle/` | Campaign story stills (`LIFESTYLE` — no manufacturer logos) |
| `originals/` | Studio / flat PNG masters (heritage tee, baggy sweats, crest cap refs) |
| `previews/` | Merchize printable plates — one front + secondary per SKU (`PLATES`) |
| `../fonts/` | Local OTF kit lettering faces |

## Rules

1. **One Match crest file** — `spirit/boxing-bee.png`. No parallel logo PNGs.
2. **One plate module per SKU view** — thumbs, category heroes, landing hero, OG, and PDP all resolve the same import.
3. **No `heroes/` fork** — campaign stills that duplicate plates are forbidden (they drift).
4. **Own front/back pair** — never borrow another SKU’s secondary when a dedicated plate exists.
5. **Queen Bees crest** is Faithful/story only — not the Match kit crest.

Creative: bold torso panel, white edge line, single crest left chest, garnet field. No student faces, manufacturer logos, or “official kit of” claims.

Placement + handles: [`docs/LISTING_MAP.md`](../../../docs/LISTING_MAP.md).  
Blank map: [`docs/MERCHIZE_BLANKS.md`](../../../docs/MERCHIZE_BLANKS.md).  
Queen Bees: [`docs/QUEEN_BEES_STACK.md`](../../../docs/QUEEN_BEES_STACK.md).
