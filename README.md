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

### Vercel

GitHub `main` is the production branch. Vercel should build from that Git connection (`bun install` + TanStack Start / Nitro). In the project: **Settings → Environment Variables**, add:

| Name | Notes |
| --- | --- |
| `STRIPE_SECRET_KEY` | Restricted or secret key (`rk_` / `rkcs_` / `sk_live_` / `sk_test_`). **Do not** name it `VITE_STRIPE_SECRET_KEY`. Production, Preview, and Development as needed. |

Redeploy after adding the key. If it is missing, checkout still completes on a confirmation page so the storefront can be reviewed.

Confirm the framework preset is **TanStack Start**. The repo has `bun.lock`, so the installer should stay Bun (also set as `installCommand` in `vercel.json`). Node 22+ is sufficient; Vercel’s current default (22 or 24) is fine.

Test card: `4242 4242 4242 4242`, any future expiry, any CVC.

Canonical imagery lives in `src/assets/bayonne/fall001/`. The live catalog is `src/lib/catalog.ts`. Apparel sizing is S–2XL. Footwear shows **only in-stock sizes** (men’s US, women’s = +1.5) — never a full empty run. The **201 Area Code Cap** is the current landing drop: charcoal wool, garnet brim, bone 201 with the New Jersey mark.

Neighborhood film: muted H.264 loop at `public/bayonne/neighborhood.mp4` (parish → Bayonne Bridge → portrait → crown). The landing hero autoplays it, with Shop Now / Watch Now over the frame. Paused when `prefers-reduced-motion`.

Shipping (Represent-simplified, USD): Standard $10 / Express $20 / complimentary standard over $175.
