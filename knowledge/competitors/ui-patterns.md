# Competitor UI patterns — adidas.com & representclo.com

Captured live on **2026-08-14**. Observations only; not memory. adidas US homepage was reachable once; deeper navigation hit bot/CAPTCHA (403). Represent was fully browsable (home → collection → PDP → cart drawer).

---

## adidas.com/us

### Route structure (observed / partial)

| Surface | URL | Notes |
|---|---|---|
| Home | `https://www.adidas.com/us` | Loaded |
| Men | `https://www.adidas.com/us/men` | Blocked by security challenge after click |
| Product (from hover preview) | e.g. `/us/hyperboost-running` | Link target visible; PDP not opened |

**Limitation:** PLP → PDP → cart path not completed. Findings below are homepage + header only unless noted.

### Persistence across navigation

- Fixed header: logo, MEN / WOMEN / KIDS / SALE / SPORTS / NEW & TRENDING
- Utilities: search, account, wishlist, bag (badge with count)
- Top promo bars (gift-card offer) sticky above/with header
- Small utility row: store finder, help, orders/returns, gift cards, adiClub

### Product card hover

- **No second-image swap** on “SHOP THE LATEST DROPS” cards
- Hover feedback: thin black border; ~instant / &lt;100ms, snappy
- No lift, scale, or shadow choreography observed

### Category → product transition

- Not observed (blocked). Header link navigation triggered full security redirect — suggests traditional multi-page loads rather than client view transitions.

### Cart pattern

- Bag icon persistent with count badge
- Drawer vs page: **unconfirmed** (could not open cart)

### Animations observed

| Trigger | Behaviour | Feel |
|---|---|---|
| Product card hover | Border appear | Instant / &lt;100ms, snappy |
| Page scroll | Native smooth scroll | No parallax / section reveal choreography on home |
| Hero | Static 3-panel photography | No autoplay video on home hero |
| Product grid load | Immediate paint | No stagger reveal |

### Video

- **None observed** on homepage hero or drop cards during capture. Static lifestyle photography.

### `prefers-reduced-motion`

- **Unknown** (could not inspect fully loaded CSS under CAPTCHA). Motion already minimal on home.

### Mobile

- Not verified (resize blocked by security). Desktop ~1280 observed: 3–4 card grid, full nav.

### Takeaway for us

adidas motion is **utilitarian and short**. They do **not** use hover second-view on the home drop grid we saw. Structure is department-first (Men/Women/Kids as real destinations). Instant-gratification ATC patterns are for in-stock goods — wrong to copy wholesale for made-to-order with multi-week lead time.

---

## representclo.com

### Route structure

| Surface | URL |
|---|---|
| Home | `https://representclo.com/` |
| Collection PLP | `https://representclo.com/collections/winter-by-247` |
| PDP | `https://representclo.com/products/247-power-shield-windbreaker-jet-black` |
| Retail | `https://representclo.com/pages/retail` |

Shopify theme — **full page loads**, not an SPA.

### Persistence

- Top bar: Retail, The Vault, Loyalty, locale/currency, search, account, bag
- Centered logo
- Footer on all pages

### Product card hover

- **No second image/video swap** observed on tested cards during capture
- Transitions elsewhere: opacity / border / background ~300ms

### Category → product

- Standard full-page navigation; no shared-element / View Transition theatre

### Cart pattern

- **Right drawer** (slide-in)
- Empty state: “Your Cart is Empty”
- Upsell block: “POPULAR ITEMS”
- Overlay dims page; X to close

### Animations observed

| Trigger | Behaviour | Duration / easing |
|---|---|---|
| Nav height expand/collapse | height transition | **250ms**, `cubic-bezier(0.4, 0, 0.2, 1)` |
| Generic UI hover | bg / border / opacity | **~300ms** (`duration-300`) |
| Cart open | translate-X from right | ~300ms, ease-out feel |
| Hero video | loop playback | N/A |

### Video (homepage) — implementation detail

Represent weights video in the same register as Reels/TikTok. Captured markup pattern:

- `autoplay` + `muted` + `playsinline` + `loop`
- `data-autoplay-on-intersect="0"` — intersection-driven autoplay gating
- `data-tier="vip"` — **conditional** serve (not every visit/device gets video)
- `poster` = 1×1 transparent GIF (CLS minimized via container, not a rich poster frame)
- `object-cover h-full w-full absolute inset-0` — aspect reserved by parent
- Separate `<source>` for `orientation: portrait` vs `landscape`
- CDN: SpeedSize, HD 1080p ~7.2 Mbps MP4

**PLP/PDP:** product media was **static images** in capture — no gallery video on the windbreaker PDP.

### `prefers-reduced-motion`

- Not visually confirmed via emulation in session
- Utility classes like `!transition-none` present — support **plausible but unverified**

### Takeaway for us

Represent’s signature is **conditional hero video + quiet chrome + cart drawer**. Their instant bag pattern assumes stock. Our store sells named kit with a close window — keep commerce quieter; spend motion on the **name-on-jersey** moment, not on Reels theatre unless we own the footage.

---

## Cross-reference summary

| Pattern | adidas (partial) | Represent | Implication for Bayonne store |
|---|---|---|---|
| Departments as routes | Yes (Men/Women/…) | Collections as routes | Our Match/Sideline/Warmups/Alumni as `#` anchors is a structural gap |
| Card hover second view | No (home grid) | No (observed) | Second view is optional; if we add it, make touch-safe |
| Cart | Unconfirmed | Drawer | Prefer context retention; MTO may want confirmation over speed |
| Hero video | None observed | Conditional autoplay muted | Only if we have real kit film; reserve aspect |
| Motion density | Minimal | Moderate (250–300ms) | Prefer short tokens; no decorative replay reveals |
| Instant ATC | Brand DNA | Brand DNA | **Conflict with our position** — do not ape; lead time is the product |
