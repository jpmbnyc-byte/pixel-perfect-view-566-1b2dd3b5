# Visual Parity Contract

> The hero image, the front live view, the side live view, and the back live view for any given variant MUST be pixel-consistent in colorway, graphic placement, and material rendering.

## Rule

```
hero === render(spec, "front", { resolution: HERO_RES })
```

The hero is **not** an authored asset. A hand-made hero file in the repo is a bug.

## Architecture

`KitSpec` → `resolveSpec()` → `render()` (single path) → `parityGate()` → publish.

Pinned constants live in `src/render/contract.ts` (`RENDER_CONTRACT_VERSION = 3`).

## Tolerances

| Check | Limit |
|---|---|
| Color ΔE00 (CIEDE2000) | ≤ 2.0 |
| Crest / band placement | ≤ 1.5 mm |
| Continuous chest band gap at seam | ≤ 0.5 mm |

## Probes

See `src/render/probes.ts`. Colors compared in Lab/ΔE00, not RGB distance.

## CI

`.github/workflows/parity.yml` runs:

```
npm run lint:render      # bans Math.random() under src/render/
npm run render:catalog   # all 17 SKUs × sublimation + publishVariant
npm run test:parity      # parity + sublimation unit tests
npm run test:matrix      # 4 fonts × 3 motifs sampled through the gate
```

Block merge on `ParityError`.
