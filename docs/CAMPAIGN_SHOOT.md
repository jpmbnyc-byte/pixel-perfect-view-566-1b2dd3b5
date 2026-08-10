# Campaign shoot protocol — Tier 1

SPEC PATCH 03. Presentation from the NOCTA × Venezia FC on-body reference — **not** the palette. Manufacturer marks and Venezia orange/green remain hard-blocked.

## Two tiers

| | **Tier 1 — CAMPAIGN** | **Tier 2 — TRUTH** |
|---|---|---|
| What | Photographed, on-body | Generated render, ghost |
| Job | Make someone want it | Show exactly what they're buying |
| Views | Front · three-quarter · back | Front · side · back |
| Parity | Colorway ΔE00 ≤ 4.0 vs `COLOR.garnet` | Full gate (`docs/parity.md`) |
| Where | PDP Photos, category grid, lookbook, social | Configurator, live preview, cart/confirm when named |

Pinned constants: `src/tokens/campaign.ts` → `CAMPAIGN_SHOT`, `CAMPAIGN_VIEWS`, `CAMPAIGN_TOLERANCE`.

## Shot protocol

- Seamless `#EFEFEE`, slight vignette (0.06), faint contact shadow at the feet
- Model dead-center, square to camera, arms relaxed, neutral expression
- Crop: crown to mid-thigh — jersey and shorts both fully visible
- Soft frontal key, almost shadowless; 85mm equivalent; ~5600K
- Full kit worn as a kit. Never jersey alone
- No props, no set, no location. Roughly square frame
- Every SKU same day, same light

## Back shot (mandatory on lettered SKUs)

`BB-MJ-REP`, `BB-MJ-AUT`, `BB-LSJ`, `BB-HOOPS`, `BB-DRESS`, `BB-CLASS`:

- Real name + number **36** on the garment (non-roster: street, `AVENUE A`, `BAYONNE`, or model’s name with consent)
- Persistent badge overlay, bottom-left, garnet on bone: **Your name goes here**

## Casting

- Adults only, 18+, signed model release
- Late teens–late twenties, Hudson County read — not agency-polished
- Minimum three models
- **Youth SKUs never on a child** — flat-lay / folded only

## Grade gate

Shoot Match Jersey first. Grade against the Tier 2 render / `#5A1626`. Approve that single frame before continuing. Failures are grading fixes, not taste.

## Risk

Model photography is expensive and irreversible. Color drift on `#5A1626` cannot be regenerated like a render. One hour of caution on the first frame protects the catalog.

## Current assets

Photoreal AI stand-ins (pre-release shoot) are checked into `src/assets/bayonne/campaign/`. Status is `shot`, not `approved` — flip to `approved` only with a signed model release on file.
