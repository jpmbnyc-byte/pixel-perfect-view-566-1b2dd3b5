# Bayonne Athletics — Fall 001

Storefront for the Bayonne Athletics Fall 001 collection: 1936 Match, Performance, Travel + Core, Harbor Division, and Club Goods.

The site is a **Represent Clo × Dior Mens** lookbook: bone ground (`#EDE9E1`), ink (`#0B0B0B`), identity garnet (`#4B0F17`), serif wordmark, wide-tracked nav, and airy two- and three-column merchandising. Kit print colors (`#5A1626` / `#F4F1F0`) stay on the manufacturing tokens and are not used as site chrome.

Production is **Cloudflare Workers** (free `*.workers.dev`, then your own domain). Lovable is not the live host.

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

## Production (Cloudflare, free)

Main deploy is Cloudflare Workers. Do not use Lovable as production.

```sh
bun install
bun run deploy
```

The first time, Wrangler will ask you to log in to Cloudflare (free account). After that you get a `*.workers.dev` URL. Point a custom domain at the Worker from the Cloudflare dashboard if you want `bayonneathletics.com` (or similar) on the same free plan.

Put the Stripe key on the Worker, not in the client:

```sh
bunx wrangler secret put STRIPE_SECRET_KEY
```

GitHub: add repo secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and `STRIPE_SECRET_KEY`. Pushes to `main` deploy via `.github/workflows/deploy-cloudflare.yml`.

Create the API token at Cloudflare → **My Profile → API Tokens → Edit Cloudflare Workers**.

