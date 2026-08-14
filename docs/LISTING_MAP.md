# Bayonne Bees — Listing Map & Placement Guide

Fulfillment: **owayo** for Match strip (F6 / FP6 Hero); see `docs/OWAYO_F6_HERO.md`  
Brand: **Bayonne Bees** · No Parade F.C. Team Customs  
Palette: Garnet `#5A1626` · Black `#0A0A0A` · Bone `#F4F1F0` · optional sting gold outline `#C9A96A`  
Motif: School kit (crest + wordmark + number) + design-forward geometric accents  
Style bar: Behance kit-campaign heroes — **no manufacturer trademarks / 3-stripe / wordmarks**

---

## Order path

```text
Store (/team/bayonne-bees)
  → Category (Core / Spirit / Warm-Up / Lifestyle)
  → Listing (/team/bayonne-bees/{product})
       customize: base maroon + motif + font + name/number + size
  → POST noparade-store.com/cart/add
       (fulfillment-synced Shopify variant ID
        + properties Name / Number / Size / Font / _ArtSpec / _Confirmed)
  → Shopify Checkout (payment)
  → Shopify Order (line properties stored)
  → Fulfillment partner imports order
  → If product is fulfillment-synced + personalization mapped:
        ops / personalizer applies Name + Number (+ motif/font from properties)
        confirm → print → ship → tracking to Shopify
     If product is Shopify-only (not fulfillment-synced):
        order sits in Shopify only — no fulfillment trigger
```

**Properties the configurator sends**

| Property | Purpose |
|---|---|
| `Name` | Back name bar |
| `Number` | Back / chest number |
| `Size` | Human-readable size |
| `Font` | Rail Cut / Beacon / Whistle / Forge |
| `Product` | Listing display name |
| `_ArtSpec` | Base64 JSON art payload for ops (includes font) |
| `_Confirmed` | Buyer confirmed final-sale custom |
| `Team` | Bayonne Bees |
| `Collection` | Team Customs |

**In-app design controls**

| Control | Options |
|---|---|
| Base layer | Single maroon field (always on) |
| Lettering font | Rail Cut · Beacon · Whistle · Forge (local OTF) |

Live PDP preview shows the garment photo only — no geometric motif overlay. Name/number lettering is personalization on the back view.

---

## Listing map

Collection: **Team Customs**  
Tags (all): `team-customs`, `bayonne-bees`  
Extra tag when customizable: `custom-name-number`

| # | Shopify handle | Merchize blank (printable) | Tier | Custom Name/Number | Configurator item |
|---|---|---|---|---|---|
| 1 | `bayonne-bees-jersey` | **owayo F6 Hero** (crew, K-TEX) — cut-and-sew sublimation | **Core** | Yes — back (included) | `top` |
| 2 | `bayonne-bees-shorts` | **owayo FP6 Hero** — cut-and-sew sublimation | **Core** | No — side tape | `bottom` |
| 3 | `bayonne-bees-full-set` | F6 Hero + FP6 Hero set | **Core** | Yes — jersey (included) | `set` |
| 4 | `bayonne-bees-hoops-jersey` | AOP Sleeveless Jersey Tank — dye-sub + DTF crest | Spirit | Yes — back | — |
| 5 | `bayonne-bees-jersey-dress` | AOP Hoodie Dress (closest dress blank) — dye-sub | Spirit | Yes — back | — |
| 6 | `bayonne-crest-cap` | Structured snapback — embroidered BB crest + side bee | Spirit | No — fixed art | — |
| 7 | `bayonne-bees-crewneck` | AOP crew / sweatshirt blank — dye-sub + DTF crest | Warm-up | No — side geo | — |
| 8 | `bayonne-bees-ls-jersey` | AOP long-sleeve jersey blank — dye-sub + DTF | Warm-up | Yes — back | — |
| 9 | `bayonne-bees-quarter-zip` | AOP Long Sleeve 1/4 Zip Jersey — dye-sub + DTF crest | Warm-up | Chest crest only | — |
| 10 | `bayonne-bees-sweatpants` | AOP Sweatpants — dye-sub | Warm-up | No — side geo | — |
| 11 | `bayonne-bees-geo-shorts` | AOP Sports / Jersey Shorts — dye-sub | Alumni | No — side geo | — |

**Image rule:** Category heroes and PDP live views share the same preview file per garment. See `docs/MERCHIZE_BLANKS.md`.

**PDP preview pairs**
- Lettered tops → **front + back** (font + name/number UI)
- Shorts / sweats / Crest Cap → **front + side** (motif UI only; no typography)

**Launch set (ship first):** #1–3, then #7, #4. Rest wave 2.

**PDP rule:** Hide blind add-to-cart on Shopify PDPs; route customizable SKUs through `/team/bayonne-bees/{product}` (e.g. `/team/bayonne-bees/jersey`).

---

## Design system

### School motif (primary)
- Boxing-bee crest (chest left or center-small; sleeve secondary)
- `BAYONNE` block or script wordmark
- Back: name bar + large number (configurator)

### Geometric accents (secondary)
- Sharp chevron / diagonal blocks on sleeves & side panels
- Tonal herringbone or micro-mosaic in side panels only
- Distressed brush panels with subtle geo fill → maroon/black
- Keep center chest + full back **clear** for crest / name / number

### Trim
- Rib / binding: black–bone–black or maroon–bone–maroon
- No third-party brand marks on mockups or art

---

## Placement instructions (reference)

Coordinates are **% of print area** (print template / flat). Origin = top-left of the printable front or back panel.  
Safe margin: keep critical art ≥ **5%** from all panel edges.  
Bleed: follow AOP template bleed (typically extend geo fills to edge).

### Shared lettering (back — customizable tops)

Print-zone reference scale (`src/lib/kit.ts` → `LETTERING`), as % of mockup / template:

| Element | Center X | Top Y | Height | Max width | Notes |
|---|---|---|---|---|---|
| Name bar | **48%** (spine) | **16%** | **7%** | **56%** | ALL CAPS; max 12; single line; ink-centered |
| Number | **48%** (spine) | **28%** | **36%** | **46%** | 0–99; prominent; ink-centered to clear-panel midline |

`centerX` is the garment spine / clear-panel midline (not always photo 50% — side panels shift the field). Live preview also corrects OTF ink bias (Forge). Overrides: hoops `50%`, dress `49.5%`, long-sleeve `50%`. Full-set shares jersey back. Always re-check on the print-partner flat before print.

### 1. Soccer / football jersey (`bayonne-bees-jersey`)

**owayo F6 Hero** — narrow crew ringer (black + bone inner line, hidden seam). No polo, no placket. Continuous BAYONNE chest band.

**Front**
| Zone | Placement | Art |
|---|---|---|
| Collar | Narrow crew, flat ringer | Black `#0A0A0A` band + bone `#F4F1F0` inner line |
| Chest wordmark | Continuous black band, center | `BAYONNE` bone block — unbroken across placketless front |
| Crest | Left chest X 18–22%, Y 22–28%, size ~8–10% W | Boxing bee |
| Sleeve cuffs | Flat black panels | No fold / no registration tipping |
| Center torso | Clear | No busy pattern behind number area on back |

**Back** — name + number table above (included in unit price).

**Files:** `front-aop.png`, `back-aop.png` (or placement PNGs per print template), `crest.svg`

### 2. Athletic shorts (`bayonne-bees-shorts`)

App preview: **front + side** (not back). No name/number/font.

**Side language (all shorts):** exactly **one** sublimated bone outseam tape, **18mm** — never embroidered, never three (adidas trade dress).  
See `docs/OWAYO_F6_HERO.md` (FP6 Hero) and `src/tokens/pinstripe.ts`.

| Zone | Placement | Art |
|---|---|---|
| Outseam tape | Outer thigh, full height | Single bone `#F4F1F0` tape, 18mm |
| Soft brand | Lower left leg, H ~6% | Boxing-bee crest |
| Waistband | Solid black | No critical logos on elastic |

### 2b. Crest Cap (`bayonne-crest-cap`)

App preview: **front (flat) + side (on-model)**. Fixed art — BB crest front, boxing-bee side, bone pinstripe crown, garnet brim. Hat sizes S/M · L/XL. No typography.

| Zone | Placement | Art |
|---|---|---|
| Front crest | Center crown | BB monogram crest + small crown |
| Side | Wearer’s right panel | Boxing-bee line art |
| Crown | Full panels | Bone field, quiet garnet pinstripe |
| Brim | Flat visor | Solid garnet |

### 3. Full set (`bayonne-bees-full-set`)

Same art as #1 + #2. Listing can be a set SKU or Shopify bundle of the two variants. Configurator `set` maps to this handle’s size variants.

### 4. Basketball jersey tank (`bayonne-bees-hoops-jersey`)

| Zone | Placement | Art |
|---|---|---|
| Chest wordmark | Center X 50%, Y 22–28% | `BAYONNE` or `BEES` |
| Chest number | Center X 50%, Y 40–55%, H ~20% | Custom number (white fill, maroon geo-outline) |
| Binding | Neck + armholes | Garnet–bone–garnet stripe rib |
| Side inserts | Optional | Subtle geo |

### 5. Jersey dress (`bayonne-bees-jersey-dress`)

One-piece mid-thigh jersey dress. Color-block chest logo (not all-white).

| Zone | Art |
|---|---|
| Chest lockup | Orange basketball + arched `BAYONNE` banner + net + boxing-bee hex |
| Binding | Black–bone–black on V-neck + armholes |
| Back | Name + number (shared lettering) |

### 6. Crewneck (`bayonne-bees-crewneck`)

| Zone | Art |
|---|---|
| AOP body | Large-scale maroon/bone/black geometric blocks (from sage/white reference → recolored) |
| Chest | Optional small crest if AOP is quiet enough; else crest-free AOP |
| Back | Optional name bar only (no huge number) |

### 7. Long-sleeve jersey (`bayonne-bees-ls-jersey`)

| Zone | Art |
|---|---|
| Front chest | Script `Bayonne` or `Bees` (bone + maroon outline) |
| Sleeve | Small crest |
| Back | Name + number (shared lettering table) |

### 8. Quarter-zip (`bayonne-bees-quarter-zip`)

| Zone | Art |
|---|---|
| Left chest | Crest only (~7–9% W) |
| Body | Tonal geo / marble distress in maroon-black-grey |
| No back number | — |

### 9. Base layer sweats (`bayonne-bees-sweatpants`)

App preview: **front + side**. Versatile black base with garnet accent side panel (collection-aligned). Motif on panel; crest left thigh. No typography.

| Zone | Placement | Art |
|---|---|---|
| Body | Full | Solid black (base layer) |
| Side panels | Hip to ankle | Garnet field + customer motif (chevron / grid / arc) |
| Soft brand | Left thigh | Small boxing-bee crest |
| Waist / cuff | Black rib | Drawcord optional |

### 10. Alumni shorts (`bayonne-bees-geo-shorts`)

Same double-pinstripe system as Match Shorts; ink is **black** (not white).

| Zone | Art |
|---|---|
| Side pinstripes | Double black ink lines, waist to hem |
| Brand lockup | Lower leg: boxing-bee crest |

---

## Publish checklist (per SKU)

1. Create design on the correct blank (AOP vs placement).
2. Apply Bayonne base art; leave personalization layers/fields for Name + Number where needed.
3. Push/sync to Shopify → collection **Team Customs**.
4. Set handle to the table above (or paste variant IDs into `src/lib/kits/bayonne-bees.ts`).
5. Confirm size option names match configurator (`2XS`…`3XL` or map aliases).
6. PDP: disable blind ATC for customizable SKUs.
7. Test order: paid → fulfillment receives line properties → Name/Number applied → fulfill.

---

## Brand imagery (single source of truth)

All shop surfaces resolve through [`src/lib/brandAssets.ts`](../src/lib/brandAssets.ts) — see [`docs/BRAND_ASSETS.md`](./BRAND_ASSETS.md).

- Crest / chrome: `CRESTS.primary` (`spirit/boxing-bee.png`)
- Queen Bees story: `CRESTS.queen` (`reveal/reveal-01-crest.jpg`)
- Garment plates: `PLATES[productId]` under `src/assets/bayonne/previews/`
- Landing hero / OG / category heroes: `SURFACES.*` (same modules as Match Jersey / category lead fronts)

Do not maintain a parallel `heroes/` directory — it drifts from PDP plates.

---

## Configurator wiring

After fulfillment → Shopify sync, either:

1. Publish with handles in `BAYONNE_BEES_KIT.shopify.productHandles` (auto-resolve), or  
2. Paste size → variant IDs into `topVariants` / `bottomVariants` / `setVariants`.

Core handles expected by the app today:

```ts
productHandles: {
  top: "bayonne-bees-jersey",
  bottom: "bayonne-bees-shorts",
  set: "bayonne-bees-full-set",
}
```
