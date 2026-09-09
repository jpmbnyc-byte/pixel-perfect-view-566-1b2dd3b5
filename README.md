# Bayonne Athletics — Fall 001

Storefront for the Bayonne Athletics Fall 001 collection: 1936 Match, Performance, Travel + Core, Harbor Division, and Club Goods.

The site is a **Represent Clo × Dior Mens** lookbook: bone ground (`#EDE9E1`), ink (`#0B0B0B`), identity garnet (`#4B0F17`), serif wordmark, wide-tracked nav, and airy two- and three-column merchandising. Kit print colors (`#5A1626` / `#F4F1F0`) stay on the manufacturing tokens and are not used as site chrome.

**Live app**: https://pixel-perfect-view-566.lovable.app

Checkout is **Stripe-hosted** (no Shopify cart, no plugins). The product page creates a Checkout Session and redirects; Stripe collects email, shipping, Apple Pay / Google Pay / card, then returns to `/order/complete`.

## Development

```sh
bun install
cp .env.example .env.local   # then set STRIPE_SECRET_KEY
bun run dev
```

`STRIPE_SECRET_KEY` must be a restricted or secret key (`rk_`, `rkcs_`, or `sk_test_`). Never prefix it with `VITE_`. Without a key, checkout still redirects to a local confirmation so the UI can be reviewed.

Test card: `4242 4242 4242 4242`, any future expiry, any CVC.

Canonical imagery lives in `src/assets/bayonne/fall001/`. The live catalog is `src/lib/catalog.ts`. Apparel sizing is S–2XL. Footwear shows **only in-stock sizes** (men’s US, women’s = +1.5) — never a full empty run. The **201 Area Code Cap** is the current landing drop: charcoal wool, garnet brim, bone 201 with the New Jersey mark.

Neighborhood film: muted H.264 loop at `public/bayonne/neighborhood.mp4` (parish → Bayonne Bridge → portrait → crown). The landing hero autoplays it, with Shop Now / Watch Now over the frame. Paused when `prefers-reduced-motion`.

Shipping (Represent-simplified, USD): Standard $10 / Express $20 / complimentary standard over $175.
