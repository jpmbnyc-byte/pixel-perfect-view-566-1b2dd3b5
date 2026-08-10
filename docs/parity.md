# Visual Parity Contract

SPEC PATCH 03 splits the image system. **Do not weaken the Tier 2 gate for photography.**

## Two tiers

| | **Tier 1 — CAMPAIGN** | **Tier 2 — TRUTH** |
|---|---|---|
| What | Photographed, on-body | Generated render, ghost |
| Job | Desire | Exact purchase |
| Views | Front · three-quarter · back | Front · side · back |
| Gate | Colorway only — ΔE00 ≤ 4.0 vs `COLOR.garnet` | Full gate below |
| Where | PDP Photos, grid, lookbook, social | Configurator, live preview; cart/confirm once named |
| Personalization | Fixed demo name/number per shoot | Live, per keystroke |

See `docs/CAMPAIGN_SHOOT.md` and `src/tokens/campaign.ts`.

## Tier 2 rule (unchanged)

```
truthHero === render(spec, "front", { resolution: HERO_RES })
```

A hand-made **truth** hero is a bug. Campaign photos are a separate tier and are not this rule.

## Architecture (Tier 2)

`KitSpec` → `resolveSpec()` → `render()` (single path) → `parityGate()` → publish.

Pinned constants: `src/render/contract.ts` (`RENDER_CONTRACT_VERSION = 3`).  
`STAGE.mannequin: "ghost"` applies to **Tier 2 only**. Campaign uses `CAMPAIGN_SHOT`.

## Tolerances

| Check | Limit | Tier |
|---|---|---|
| Color ΔE00 (CIEDE2000) | ≤ 2.0 | 2 |
| Crest / band placement | ≤ 1.5 mm | 2 |
| Continuous chest band gap at seam | ≤ 0.5 mm | 2 |
| Campaign body vs `COLOR.garnet` | ≤ 4.0 ΔE00 | 1 |

## Probes

Tier 2: `src/render/probes.ts`. Tier 1: `src/media/campaignGate.ts`.

## Definition of Done (SKU)

- [ ] `validateSublimation(spec)` returns zero errors
- [ ] `parityGate` passes on front / side / back / truth-hero
- [ ] Truth-hero SHA matches `render(spec,'front',HERO_RES)` SHA
- [ ] Cross-view body ΔE00 < 2.0 on all three views
- [ ] Continuous chest band shows < 0.5mm gap at the side seam across views
- [ ] Matrix test passes: 4 fonts × 3 motifs sampled
- [ ] Campaign front / three-quarter / back shots exist for the SKU
- [ ] Lettered SKUs: back shot carries a real name and number `36`
- [ ] Campaign colorway within ΔE00 4.0 of `COLOR.garnet`
- [ ] PDP toggle (`Photos` / `Put your name on it`) renders above the fold at 375px
- [ ] Model release on file; no minors in any commercial asset
- [ ] One plate pair only in `PLATES` for truth surfaces
- [ ] No blocked mark, no three-stripe geometry, no Venezia orange/green within ΔE00 10
- [ ] Queen Bees crest absent from every purchasable spec
- [ ] Pattern meaning documented in PDP copy
- [ ] Deviation register unchanged, or a new row with justification (max 5)

## Build order (insert)

… → catalog → **7.6 PDP photo/render toggle** → personalization → site chrome → CI.

The toggle is the seam between the two image tiers; everything downstream depends on it.

## CI

`.github/workflows/parity.yml` runs:

```
npm run lint:render
npm run render:catalog
npm run test:parity
npm run test:matrix
```

Also: `npm run test:campaign` for Tier 1 surfacing + colorway helpers.

Block merge on `ParityError`.
