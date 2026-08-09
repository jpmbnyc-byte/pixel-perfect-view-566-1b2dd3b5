# Go-live audit — Bayonne Bees Team Customs

**Date:** 2026-08-09  
**App:** configurator → `noparade-store.com` checkout  
**Verdict: FAIL — not ready to go live**

Passing score requires **all Critical** checks green, and **Launch** checks green for SKUs #1–3 (Match Jersey, Match Shorts, Full Kit Set).

---

## Scorecard

| Area | Weight | Result | Notes |
|---|---|---|---|
| App routes & PDPs | Critical | **PASS** | `/`, `/team`, store, all 11 product URLs load |
| Personalization UX | Critical | **PASS** | Name/number, fonts, live back preview, confirm gate |
| Size selection UX | Critical | **PASS** | Sizes stay selectable; selection sticks while unsynced |
| Production build | Critical | **PASS** | `npm run build` succeeds |
| Shopify launch listings | Critical | **FAIL** | All `bayonne-bees-*` handles **404** on storefront |
| Team Customs collection | Critical | **FAIL** | Collection handle missing (`/collections/team-customs` 404) |
| End-to-end checkout | Critical | **FAIL** | CTA correctly locks at “Checkout opening soon” — no paid path |
| Fulfillment sync path | Critical | **FAIL** | No print-partner → Shopify products to import |
| Wave-2 listing checkout wiring | Launch+ | **PASS** (app) | App now resolves **every** catalog handle for cart/add |
| Copy accuracy | Launch | **PASS** | Removed false “side panel you pick” language |
| Crest Cap naming | Launch | **PASS** | Fixed art; no customize-side copy |
| Live preview (`vite preview`) local | Nice-to-have | **FAIL** | Nitro preview `Request.ip` TypeError — Lovable deploy path unaffected |

**Overall: 6 / 10 critical+launch rows pass. Go-live score: FAIL.**

---

## Shopify probe (live storefront)

Store: `https://noparade-store.com` (home **200**)

| Handle | HTTP |
|---|---|
| `bayonne-bees-jersey` | **404** |
| `bayonne-bees-shorts` | **404** |
| `bayonne-bees-full-set` | **404** |
| `bayonne-bees-hoops-jersey` | **404** |
| `bayonne-bees-jersey-dress` | **404** |
| `bayonne-bees-aop-hat` | **404** |
| `bayonne-bees-crewneck` | **404** |
| `bayonne-bees-sweatpants` | **404** |
| `bayonne-bees-ls-jersey` | **404** |
| `bayonne-bees-quarter-zip` | **404** |
| `bayonne-bees-geo-shorts` | **404** |

- Collection `team-customs`: **missing**
- Store has other NPFC / resort products only — **zero** Bayonne Team Customs SKUs

Until those handles publish with Size options matching the configurator (`2XS`…`3XL`, Crest Cap `S/M` · `L/XL`), checkout cannot unlock.

---

## App feature audit (browser)

| # | Check | Result |
|---|---|---|
| 1 | `/` → `/team` | PASS |
| 2 | Landing brand + CTAs | PASS |
| 3 | Store categories Match / Sideline / Warmups / Alumni | PASS |
| 4 | Category switch + `#sideline` deep link | PASS |
| 5 | All 11 PDPs load | PASS |
| 6 | Front/back or front/side toggles + images | PASS |
| 7 | Name + number live lettering | PASS |
| 8 | Font picker (4 OTFs) | PASS |
| 9 | Size buttons selectable / sticky | PASS |
| 10 | Size guide | PASS |
| 11 | Confirm checkbox + CTA step ladder | PASS |
| 12 | Sync lock messaging (expected until Shopify live) | PASS |
| 13 | Crest Cap: no name/number; S/M · L/XL | PASS |
| 14 | Motif picker absent + copy honest | PASS (after copy fix) |

---

## What must happen before go-live

### Ops / Shopify (blocking)

1. In the **print partner**, create Garnet/Black **Jersey / Shorts / Full Set** with Name + Number where required.
2. Sync to Shopify into collection **`Team Customs`**.
3. Publish with exact handles from `docs/LISTING_MAP.md` (launch set first: jersey, shorts, full-set).
4. Size option values must match configurator labels (aliases `XXL`→`2XL` etc. are supported).
5. Prefer personalization style options containing “custom name” / “name number” when Style + Size exist.
6. Hide blind ATC on Shopify PDPs — route buyers through `/team/bayonne-bees/{product}`.
7. Place a **test paid order** → confirm line properties (`Name`, `Number`, `Size`, `Font`, `_ArtSpec`, `_Confirmed`) → fulfill.

### Optional static override

If handles differ, paste size → variant IDs into `src/lib/kits/bayonne-bees.ts` (`topVariants` / `bottomVariants` / `setVariants`).

### Re-score gate

Re-run:

```sh
for h in bayonne-bees-jersey bayonne-bees-shorts bayonne-bees-full-set; do
  curl -s -o /dev/null -w "%{http_code} $h\n" "https://noparade-store.com/products/$h.js"
done
```

All three must return **200**, then walk Match Jersey through confirm → **Checkout · $…** → Shopify cart/checkout.

---

## App changes bundled with this audit

- Size selection no longer disables every size when the variant map is empty.
- Catalog listings resolve Shopify variants **by product handle** (not only top/bottom/set), so wave-2 SKUs can checkout once published.
- Shorts / sweats copy no longer claims a side-panel picker.
- Crest Cap rename + fixed-art copy (from hat PR).
