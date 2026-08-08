# Bayonne Bees × Merchize — Listing Map & Placement Guide

Supplier: **Merchize** (Shopify app sync)  
Brand: **Bayonne Bees** · No Parade F.C. Team Customs  
Palette: Maroon `#5A1626` · Black `#0A0A0A` · Bone `#F4F1F0` · optional sting gold outline `#C9A96A`  
Motif: School kit (crest + wordmark + number) + design-forward geometric accents  
Style bar: Adidas-quality heroes — **no Adidas trademarks / 3-stripe / wordmarks**

---

## Order path (Merchize)

```text
Configurator (/team/bayonne-bees)
  → POST noparade-store.com/cart/add
       (Merchize-synced Shopify variant ID
        + properties Name / Number / Size / _ArtSpec / _Confirmed)
  → Shopify Checkout (payment)
  → Shopify Order (line properties stored)
  → Merchize app imports order
  → If product is Merchize-synced + personalization mapped:
        ops / personalizer applies Name + Number
        confirm → print → ship → tracking to Shopify
     If product is Shopify-only (not Merchize):
        order sits in Shopify only — no fulfillment trigger
```

**Properties the configurator sends**

| Property | Purpose |
|---|---|
| `Name` | Back name bar |
| `Number` | Back / chest number |
| `Size` | Human-readable size |
| `_ArtSpec` | Base64 JSON art payload for ops |
| `_Confirmed` | Buyer confirmed final-sale custom |
| `Team` | Bayonne Bees |
| `Collection` | Team Customs |

---

## Listing map

Collection: **Team Customs**  
Tags (all): `team-customs`, `bayonne-bees`, `merchize`  
Extra tag when customizable: `custom-name-number`

| # | Shopify handle | Merchize blank (from assortment) | Tier | Custom Name/Number | Configurator item |
|---|---|---|---|---|---|
| 1 | `bayonne-bees-jersey` | AOP / soccer V-neck short-sleeve jersey | **Core** | Yes — back | `top` |
| 2 | `bayonne-bees-shorts` | Matching athletic shorts | **Core** | Optional side | `bottom` |
| 3 | `bayonne-bees-full-set` | Jersey + shorts set (or bundle) | **Core** | Yes — jersey | `set` |
| 4 | `bayonne-bees-hoops-jersey` | Basketball sleeveless jersey tank | Spirit | Yes — chest/back | — |
| 5 | `bayonne-bees-spirit-skirt-set` | Cropped V-neck jersey + pleated skirt | Spirit | Number + crest | — |
| 6 | `bayonne-bees-jersey-dress` | Basketball jersey dress | Spirit | Crest / small # | — |
| 7 | `bayonne-bees-crewneck` | AOP crewneck sweatshirt | Warm-up | Crest or back name | — |
| 8 | `bayonne-bees-ls-jersey` | Long-sleeve V-neck athletic jersey | Warm-up | Script front + Name/# back | — |
| 9 | `bayonne-bees-quarter-zip` | Quarter-zip pullover | Warm-up | Chest crest only | — |
| 10 | `bayonne-bees-geo-shorts` | AOP geometric lifestyle shorts | Separate | Soft brand mark | — |

**Launch set (ship first):** #1–3, then #7, #4. Rest wave 2.

**PDP rule:** Hide blind add-to-cart on customizable products; route Name/Number SKUs through `/team/bayonne-bees`.

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

Coordinates are **% of print area** (Merchize template / flat). Origin = top-left of the printable front or back panel.  
Safe margin: keep critical art ≥ **5%** from all panel edges.  
Bleed: follow Merchize AOP template bleed (typically extend geo fills to edge).

### Shared lettering (back — customizable tops)

| Element | Center X | Top Y | Height | Max width | Notes |
|---|---|---|---|---|---|
| Name bar | 50% | 18–22% | 4–5% | 38–42% | ALL CAPS, condensed athletic; 12 char max |
| Number | 50% | 38–48% | 22–28% | 50% | 0–99; outline in maroon or bone |

Matches app geometry in `src/lib/kit.ts` → `LETTERING` (mockup % may differ slightly from print template; always re-check on Merchize flat).

### 1. Soccer / football jersey (`bayonne-bees-jersey`)

**Front**
| Zone | Placement | Art |
|---|---|---|
| Chest wordmark | Center X 50%, Y 28–34%, H ~8% | `BAYONNE` block or script |
| Crest | Left chest X 18–22%, Y 22–28%, size ~8–10% W | Boxing bee |
| Geo accents | Sleeves + side panels only | Chevron / diagonal blocks |
| Center torso | Clear | No busy pattern behind number area on back |

**Back** — name + number table above.

**Files:** `front-aop.png`, `back-aop.png` (or placement PNGs per Merchize template), `crest.svg`

### 2. Athletic shorts (`bayonne-bees-shorts`)

| Zone | Placement | Art |
|---|---|---|
| Side panels | Outer thigh, full height | Geo chevron in maroon/black |
| Hem accent | Bottom 8–12% | Thin bone/maroon rule or micro-geo |
| Soft brand | Lower left leg, H ~6% | Small crest or `BEES` wordmark |
| Waistband | Solid black or maroon | No critical logos on elastic |

### 3. Full set (`bayonne-bees-full-set`)

Same art as #1 + #2. Listing can be Merchize set SKU or Shopify bundle of the two variants. Configurator `set` maps to this handle’s size variants.

### 4. Basketball jersey tank (`bayonne-bees-hoops-jersey`)

| Zone | Placement | Art |
|---|---|---|
| Chest wordmark | Center X 50%, Y 22–28% | `BAYONNE` or `BEES` |
| Chest number | Center X 50%, Y 40–55%, H ~20% | Custom number (white fill, maroon geo-outline) |
| Binding | Neck + armholes | Maroon–bone–maroon stripe rib |
| Side inserts | Optional | Subtle geo |

### 5. Spirit skirt set (`bayonne-bees-spirit-skirt-set`)

**Crop jersey**
| Zone | Art |
|---|---|
| Center number | Large block # |
| Left chest | Varsity letter / crest |
| Sleeve | Twin bone stripes (not Adidas 3-stripe — use **two** thin rules or broken geo dashes) |

**Skirt:** solid maroon or black pleats; optional small crest near hem.

### 6. Jersey dress (`bayonne-bees-jersey-dress`)

| Zone | Art |
|---|---|
| Center chest | Crest + arched `BAYONNE` or net-free crest lockup |
| Binding | Black–bone–black |
| Side panels | Optional geo wash |

### 7. Crewneck (`bayonne-bees-crewneck`)

| Zone | Art |
|---|---|
| AOP body | Large-scale maroon/bone/black geometric blocks (from sage/white Merchize ref → recolored) |
| Chest | Optional small crest if AOP is quiet enough; else crest-free AOP |
| Back | Optional name bar only (no huge number) |

### 8. Long-sleeve jersey (`bayonne-bees-ls-jersey`)

| Zone | Art |
|---|---|
| Front chest | Script `Bayonne` or `Bees` (bone + maroon outline) |
| Sleeve | Small crest |
| Back | Name + number (shared lettering table) |

### 9. Quarter-zip (`bayonne-bees-quarter-zip`)

| Zone | Art |
|---|---|
| Left chest | Crest only (~7–9% W) |
| Body | Tonal geo / marble distress in maroon-black-grey |
| No back number | — |

### 10. Geo lifestyle shorts (`bayonne-bees-geo-shorts`)

| Zone | Art |
|---|---|
| Panels | Polka / topo / chevron in maroon-black-bone |
| Brand lockup | Lower leg: crest + `BEES` (not Merchize sample text) |

---

## Merchize publish checklist (per SKU)

1. Create design on correct Merchize blank (AOP vs placement).
2. Apply Bayonne base art; leave personalization layers/fields for Name + Number where needed.
3. Push/sync to Shopify → collection **Team Customs**.
4. Set handle to the table above (or paste variant IDs into `src/lib/kits/bayonne-bees.ts`).
5. Confirm size option names match configurator (`2XS`…`3XL` or map aliases).
6. PDP: disable blind ATC for customizable SKUs.
7. Test order: paid → Merchize receives line properties → Name/Number applied → fulfill.

---

## Hero images (Adidas-quality bar)

Asset folder: `src/assets/bayonne/heroes/`

| ID | File | Outfit | Setting | Use |
|---|---|---|---|---|
| H1 | `hero-kit-studio.jpg` | Jersey + shorts, ball at hip | Studio, maroon/black diagonal field | `/team`, jersey PDP |
| H2 | `hero-spirit-gym.jpg` | Jersey dress or skirt set | Indoor court | Spirit SKUs |
| H3 | `hero-crewneck-studio.jpg` | Geo crewneck | Neutral grey studio | Sweats PDP |
| H4 | `hero-field-lifestyle.jpg` | Jersey + shorts on field | Daylight, shallow DOF | Landing / ads |
| H5 | `hero-ls-rack.jpg` | LS jersey front + back | Minimal hanger rack | Explains Name/Number |

Strip all Merchize watermarks from finals.

### Base mockups

Asset folder: `src/assets/bayonne/mockups/`

| File | Purpose |
|---|---|
| `mock-jersey-front.jpg` | Front placement review |
| `mock-jersey-back.jpg` | Name/number review |
| `mock-shorts.jpg` | Shorts geo + brand |
| `mock-crewneck.jpg` | AOP geo sweatshirt |
| `mock-hoops-jersey.jpg` | Basketball tank |
| `mock-quarter-zip.jpg` | Warm-up layer |

---

## Configurator wiring

After Merchize → Shopify sync, either:

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
