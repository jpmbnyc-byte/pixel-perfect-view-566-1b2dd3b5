# UI audit — Bayonne team store (after Tier 1)

**Date:** 2026-08-14  
**Compared to:** `knowledge/audits/ui-audit-2026-08-14.md` (before — immutable)  
**Implemented on:** `cursor/ui-audit-motion-8bc8`  
**Tier 2 (unmerged):** `cursor/ui-dept-routes-8bc8` → PR #53

---

## Scorecard (before → after → Δ)

| # | Dimension | Before | After | Δ | Notes |
|---|---|---|---|---|---|
| 1 | Department routing | 0 | 0* | 0 | Still anchors on Tier 1. **Tier 2 branch** adds real routes — unmerged. |
| 2 | URL design | 1 | 1* | 0 | PDP shareable; dept URLs wait on Tier 2. |
| 3 | Depth to purchase | 2 | 2 | 0 | Unchanged (correct for MTO). |
| 4 | Nav persistence | 0 | 0 | 0 | Sticky chrome deferred (would compete with sticky CTA). |
| 5 | Back-path to department | 1 | 2 | +1 | PDP passes `hash={category}` (Tier 1); Tier 2 uses real dept path. |
| 6 | Variant URL state | 1 | 1 | 0 | Still component state — Tier 2/3. |
| 7 | Card hover second view | 0 | 3 | +3 | `ProductCardMedia` — hover swap + touch toggle. |
| 8 | Size selection | 2 | 2 | 0 | Clearer sync copy; still not true OOS. |
| 9 | Cart pattern | 1 | 1 | 0 | Shopify leave retained (MTO conflict with drawer speed). |
| 10 | Gallery | 1 | 1 | 0 | Tier 2 candidate — unmerged. |
| 11 | Name/number feedback | 2 | 3 | +1 | Diacritics, size scale, commit flash, counters. |
| 12 | Empty/loading/error | 1 | 2 | +1 | Empty filter state + actionable sync copy. |
| 13 | Sticky purchase | 3 | 3 | 0 | Kept. |
| 14 | Touch / focus | 1 | 3 | +2 | `tap-44`, `focus-ring` on controls. |
| 15 | Page-load sequence | 1 | 2 | +1 | Tokens; infinite kenburns → once; liquid drift **removed**. |
| 16 | Scroll reveals | 0 | 0 | 0 | None added (no decorative replay). |
| 17 | Dept→product transition | 0 | 0 | 0 | Tier 2 candidate. |
| 18 | Hover micro tokens | 1 | 3 | +2 | `--dur-micro` / `--ease-standard`. |
| 19 | Countdown live | 2 | 3 | +1 | Store uses `StoreCloseCountdown` (60s tick + cleanup). |
| 20 | Video | 0 | 0 | 0 | Intentionally absent. |
| 21 | `prefers-reduced-motion` | 2 | 3 | +1 | Transforms killed; opacity/color ≤80ms kept. |
| 22 | Layout stability | 2 | 3 | +1 | width/height on key plates; aspect boxes. |
| | **Total** | **24** | **39*** | **+15** | *+Tier 2 would lift 1–2, 5, 17 further |

\*After score on Tier 1 only. With Tier 2 merged, estimate **~44–46 / 66**.

---

## Signature interaction (name on jersey)

| Spec | Before | After |
|---|---|---|
| Per-keystroke preview | Yes | Yes |
| &lt;100ms paint | Unmeasured | Instrumented via `performance.measure('lettering-keypress-to-paint')` — double-rAF after state commit. **Lab estimate &lt;50ms** on desktop when fonts cached; not Continuum CLS lab. |
| Kit OTF @ print % | Yes | Yes + **size-linked `printScale`** |
| Visible counter / hard max | Yes | Yes |
| Diacritics / `'` / `-` | Partial | **Yes** (`\p{L}`, NFC) — tested |
| Scale with size | No | Yes (`printScaleForSize`) |
| Confirmation moment | Weak checkbox | **Flash + status** when name+number first valid |

**Signature score: 1 → 3**

---

## Motion tokens (shipped)

```
--dur-micro: 120ms
--dur-standard: 240ms
--dur-transition: 400ms
--ease-standard / --ease-entrance / --ease-exit
--stagger: 60ms
--reveal-thresh: 0.15
```

**Removed (decorative):** infinite liquid drift/sheen; unused bee-pulse / hero-drift utilities; infinite kenburns → single entrance.

**No animation library added.**

---

## Verification notes

| Check | Result |
|---|---|
| Vitest | 35/35 pass (incl. `sanitizeName`) |
| Production build | Pass (Tier 2 branch also builds dept routes) |
| Reduced-motion | CSS media query suppresses animation + transform transitions; opacity/color 80ms |
| CLS | Not Continuum-measured; aspect boxes + intrinsic dims on store/PDP plates. Report as **unmeasured in field** — drive toward 0 via reserved aspect. |
| Screenshots 390 / 1440 | **Not captured in this run** (no long-lived preview session). Recommend local `vite preview` pass. |
| Cart drawer / gallery zoom | Tier 2 — not implemented (report-only escalation) |

---

## Files changed (Tier 1)

- `knowledge/competitors/ui-patterns.md`
- `knowledge/audits/ui-audit-2026-08-14.md` (before — frozen)
- `knowledge/audits/ui-audit-2026-08-14-after.md` (this file)
- `src/styles.css` — tokens, reduced-motion, focus/tap utilities
- `src/components/LiquidBackdrop.tsx` — static
- `src/components/ProductCanvas.tsx` — scale, flash, perf marks
- `src/components/ProductCardMedia.tsx` — new
- `src/lib/kit.ts` — sanitizeName
- `src/lib/printScale.ts` — new
- `src/routes/team.$slug.index.tsx` — countdown, empty, cards, a11y
- `src/routes/team.$slug.$product.tsx` — signature + focus
- `src/routes/team.index.tsx` — motion-safe hover
- `tests/sanitizeName.test.ts` — new

## Branches left unmerged

| Branch | PR | Purpose |
|---|---|---|
| `cursor/ui-dept-routes-8bc8` | #53 | Department routes + hash redirects |
| (not started) | — | Gallery zoom/keyboard; View Transitions; cart drawer |

## Rollback paths

- **Tier 1:** revert commits on `cursor/ui-audit-motion-8bc8` or close PR before merge.
- **Tier 2:** `knowledge/audits/tier2-dept-routes-ROLLBACK.md`

---

## Tier 3 (report only — not implemented)

- Price / copy strings (other prompts)
- Queen Bees crest chapter
- Third-party platforms
- adidas visual language / three-stripe — hard no
