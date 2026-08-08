# Bayonne Bees Team Kit — No Parade F.C.

Team Customs configurator for Bayonne Bees / Queen Bees crest build. Built with [Lovable](https://lovable.dev).

**Live app**: https://pixel-perfect-view-566.lovable.app  
**Shopify store**: https://noparade-store.com  
**Editor**: https://lovable.dev/projects/290b33e3-813e-41ff-8ac0-7450ef80c116  
**Fulfillment**: Merchize  
**Listing map & placement**: [docs/MERCHIZE_LISTING_MAP.md](docs/MERCHIZE_LISTING_MAP.md)

## Order path

```text
Configurator (/team/bayonne-bees)
  → POST noparade-store.com/cart/add
       (Merchize-synced variant ID
        + properties Name / Number / Size / _ArtSpec / _Confirmed)
  → Shopify Checkout (payment)
  → Shopify Order (line properties stored)
  → Merchize app imports order
  → Name + Number applied from line properties → print → ship
```

Products must be created/synced **from Merchize → Shopify**. Shopify-only products will accept cart/checkout but never trigger Merchize fulfillment.

## Launch setup

1. In **Merchize**: build Jersey / Shorts / Full Set (Garnet/Black) with crest + panel accents; enable Name + Number personalization where supported.
2. **Push/sync** those products to Shopify into collection **Team Customs**.
3. Publish with handles in the [listing map](docs/MERCHIZE_LISTING_MAP.md) (auto-resolved), or paste static variant IDs into `src/lib/kits/bayonne-bees.ts`.
4. Keep the configurator as the only add-to-cart path for customizable Team Customs SKUs.
5. Ops: every custom order → Merchize → confirm Name/Number from Shopify properties → fulfill same-day when possible.

## Development

```sh
bun install   # or npm i
bun run dev   # or npm run dev
```

Kit config: `src/lib/kits/bayonne-bees.ts`  
Shopify helpers: `src/lib/shopify.ts`  
Order UI: `src/routes/team.$slug.tsx`  
Brand assets: `src/assets/bayonne/`
