# Bayonne Athletics — Fall 001

Storefront for the Bayonne Athletics Fall 001 collection: 1936 Match, Performance, Travel + Core, Harbor Division, and Club Goods.

The site is a **Represent Clo × Dior Mens** lookbook: bone ground (`#EDE9E1`), ink (`#0B0B0B`), identity garnet (`#4B0F17`), serif wordmark, wide-tracked nav, and airy two- and three-column merchandising. Kit print colors (`#5A1626` / `#F4F1F0`) stay on the manufacturing tokens and are not used as site chrome.

Current preview is **Lovable via GitHub `main`**. Production will move to **https://noparade-store.com** on Cloudflare when you are ready to change DNS. Do not switch nameservers until that cutover.

Checkout is **Stripe-hosted** (no Shopify cart, no plugins). The product page creates a Checkout Session and redirects; Stripe collects email, shipping, Apple Pay / Google Pay / card, then returns to `/order/complete`.

## Development

```sh
bun install
cp .env.example .env.local   # then set STRIPE_SECRET_KEY
bun run dev
```

`STRIPE_SECRET_KEY` must be a restricted or secret key (`rk_`, `rkcs_`, or `sk_test_`). Never prefix it with `VITE_`. Without a key, checkout still redirects to a local confirmation so the UI can be reviewed.

Test card: `4242 4242 4242 4242`, any future expiry, any CVC.

Canonical imagery lives in `src/assets/bayonne/fall001/`. Neighborhood plates (Fluffies on Broadway) live in `src/assets/bayonne/places/`. The live catalog is `src/lib/catalog.ts`. Apparel sizing is S–2XL. Footwear shows **only in-stock sizes** (men’s US, women’s = +1.5) — never a full empty run. The **201 Area Code Cap** is the current landing drop: charcoal wool, garnet brim, bone 201 with a New Jersey outline (not a filled white state).

The garnet **BA** monogram is the mark in the nav, on the Broadway night band, and in `public/favicon.svg`. Sharing uses **Pass it on** (`src/copy/share.ts`): native share sheet on phones, copy-with-caption on desktop. Link previews all use `public/og.jpg` — Fluffies with the BA stamp and “Built different.”

Neighborhood film: muted H.264 loop at `public/bayonne/neighborhood.mp4` (parish → Bayonne Bridge → portrait → crown). The landing hero autoplays it, with Shop Now / Watch Now over the frame. Paused when `prefers-reduced-motion`.

Shipping (Represent-simplified, USD): Standard $10 / Express $20 / complimentary standard over $175.

## Production (Cloudflare + noparade-store.com)

Live hostname **after DNS cutover** is **https://noparade-store.com**. Until then, keep shipping to GitHub `main` so Lovable stays current. Checkout uses the request origin, so Stripe return URLs follow whatever host is serving the site.

Lovable is the preview host while we build. Shopify still holds the custom domain until you move nameservers.

### 1. Deploy the Worker

```sh
bun install
bun run deploy
bunx wrangler secret put STRIPE_SECRET_KEY
```

Wrangler logs you into Cloudflare. You get a temporary `*.workers.dev` URL for a smoke test before touching DNS.

### 2. Move DNS off Shopify onto Cloudflare

Do this at the registrar that currently points `noparade-store.com` at Shopify (often GoDaddy, Namecheap, Google Domains / Squarespace, or Cloudflare already).

1. In Cloudflare: **Add a site** → `noparade-store.com` (Free plan). Copy the two nameservers Cloudflare gives you (like `ada.ns.cloudflare.com`).
2. In the registrar: replace Shopify’s nameservers (or Shopify A records) with those Cloudflare nameservers. Do not delete the domain.
3. Wait until Cloudflare says the zone is **Active** (often minutes, sometimes a few hours).
4. In Cloudflare: **Workers & Pages** → `bayonne-athletics-07002` → **Settings → Domains** → add `noparade-store.com` and `www.noparade-store.com`. Cloudflare will create the apex + www records and issue SSL.
5. Optional: page rule / redirect `www` → apex (or the reverse). One canonical host is enough.

`wrangler.jsonc` already lists both hostnames as custom domains. If deploy errors with “zone not found”, finish step 2 first, then `bun run deploy` again.

### 3. After DNS is live

- Open https://noparade-store.com — you should see this storefront, not Shopify.
- Stripe Dashboard → add `https://noparade-store.com` as a checkout / website domain if asked.
- Shopify Admin → **Settings → Domains** → remove `noparade-store.com` so Shopify stops claiming it. Leave the shop password-protected or close the store when you are done.

GitHub auto-deploy: repo secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `STRIPE_SECRET_KEY`. Token: Cloudflare → **My Profile → API Tokens → Edit Cloudflare Workers**.

