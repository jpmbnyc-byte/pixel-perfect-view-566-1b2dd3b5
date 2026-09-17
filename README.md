# Bayonne Athletics — Fall 001

Storefront for the Bayonne Athletics Fall 001 collection: 1936 Match, Performance, Travel + Core, Harbor Division, and Club Goods.

The site is a **Represent Clo × Dior Mens** lookbook: bone ground (`#EDE9E1`), ink (`#0B0B0B`), identity garnet (`#4B0F17`), serif wordmark, wide-tracked nav, and airy two- and three-column merchandising. Kit print colors (`#5A1626` / `#F4F1F0`) stay on the manufacturing tokens and are not used as site chrome.

Current preview is **Lovable via GitHub `main`**. Production is live at **https://www.ba-athletics.com** on Vercel (`www` is canonical — the apex should redirect to it).

Checkout is **Stripe-hosted** (no Shopify cart, no plugins). The product page creates a Checkout Session and redirects; Stripe collects email, shipping, Apple Pay / Google Pay / card, then returns to `/order/complete`.

## Development

```sh
bun install
cp .env.example .env.local   # then set STRIPE_SECRET_KEY
bun run dev
```

`STRIPE_SECRET_KEY` must be a restricted or secret key (`rk_`, `rkcs_`, or `sk_test_`). Never prefix it with `VITE_`. Without a key, checkout still redirects to a local confirmation so the UI can be reviewed.

Test card: `4242 4242 4242 4242`, any future expiry, any CVC.

Canonical imagery lives in `src/assets/bayonne/fall001/`. Neighborhood plates live in `src/assets/bayonne/places/`. The live catalog is `src/lib/catalog.ts`. Apparel sizing is S–2XL. Footwear shows **only in-stock sizes** (men’s US, women’s = +1.5) — never a full empty run. The **201 Area Code Cap** is the current landing drop: charcoal wool, garnet brim, bone 201 with a New Jersey outline (not a filled white state).

The Broadway band racks the shop sign out of focus onto a black-and-white reverse of the 201 worn backwards, walking in. The garnet **BA** monogram is the mark in the nav, on that band, and in `public/favicon.svg`. Sharing uses **Pass it on** (`src/copy/share.ts`): native share sheet on phones, copy-with-caption on desktop. Link previews all use `public/og.png` — a dark editorial card with the Bayonne wordmark, the “Built different.” headline, the crest watermark, and the 201 area code mark.

Neighborhood film: muted H.264 loop at `public/bayonne/neighborhood.mp4` (parish → Bayonne Bridge → portrait → crown). The landing hero autoplays it, with Shop Now / Watch Now over the frame. Paused when `prefers-reduced-motion`.

Shipping (Represent-simplified, USD): Standard $10 / Express $20 / complimentary standard over $175.

## Production (Vercel + www.ba-athletics.com)

Live hostname is **https://www.ba-athletics.com** (`www` is canonical, not the apex), hosted on Vercel — not Cloudflare Workers. `vite.config.ts` already auto-selects the `vercel` Nitro preset whenever it's not building for Cloudflare, and `vercel.json` declares the framework, so no build config changes are needed. `wrangler.jsonc` is kept only as a dormant alternate path (e.g. local `wrangler dev`); it no longer claims any custom domain.

### 1. Import the repo into Vercel

Vercel → Add New → Project → import this repo. Framework preset auto-detects from `vercel.json`. Add the `STRIPE_SECRET_KEY` environment variable (a restricted or secret key, `rk_`/`sk_` — never `VITE_`-prefixed). First deploy happens automatically.

### 2. Add the domain

In that Vercel project → Settings → Domains → add `www.ba-athletics.com` and `ba-athletics.com` (set the apex to redirect to `www`, since `www` is the canonical host here). Vercel shows the exact DNS records to create — use those values, not ones from memory, since Vercel's IPs/targets can change.

### 3. Point DNS at Vercel

At `ba-athletics.com`'s DNS provider: a `CNAME` for `www` → `cname.vercel-dns.com`, and an `A`/`ALIAS` record on the apex per Vercel's instructions (redirecting to `www`). Once it propagates, `https://www.ba-athletics.com` serves this storefront directly — no Shopify domain hand-off needed for this domain.

GitHub auto-deploy is automatic once the repo is imported into Vercel (a new deploy on every push to `main`); no repo secrets needed beyond the `STRIPE_SECRET_KEY` env var set in Vercel.

