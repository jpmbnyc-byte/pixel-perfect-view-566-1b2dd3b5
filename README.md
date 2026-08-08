# Bayonne Bees Team Kit — No Parade F.C.

Team Customs configurator for Bayonne Bees (VESPERS 26). Built with [Lovable](https://lovable.dev).

**Live app**: https://pixel-perfect-view-566.lovable.app  
**Shopify store**: https://noparade-store.com  
**Editor**: https://lovable.dev/projects/290b33e3-813e-41ff-8ac0-7450ef80c116

## Order path

```text
Configurator (/team/bayonne-bees)
  → POST noparade-store.com/cart/add
       (Printful-synced variant ID
        + properties Name / Number / Size / _ArtSpec / _Confirmed)
  → Shopify Checkout (payment)
  → Shopify Order (line properties stored)
  → Printful sync app imports order
  → Personalization required (DRAFT)
       → ops applies Name + Number → confirm → print → ship
```

Products must be created/synced **from Printful → Shopify**. Shopify-only products will accept cart/checkout but never trigger Printful fulfillment.

## Launch setup

1. In **Printful**: build Jersey / Shorts / Full Set (Navy/Gold), enable Name + Number personalization layers.
2. **Push/sync** those 3 products to Shopify into collection **Team Customs**.
3. Publish with these handles (auto-resolved by the configurator):
   - `bayonne-bees-jersey`
   - `bayonne-bees-shorts`
   - `bayonne-bees-full-set`
4. Or paste static variant IDs into `src/lib/kits/bayonne-bees.ts` (`shopify.*Variants`).
5. Keep the configurator as the only add-to-cart path for Team Customs.
6. Ops SOP: every Team Customs order → Printful draft → paste Name/Number from Shopify properties → confirm same-day.

## Development

```sh
bun install   # or npm i
bun run dev   # or npm run dev
```

Kit config: `src/lib/kits/bayonne-bees.ts`  
Shopify helpers: `src/lib/shopify.ts`  
Order UI: `src/routes/team.$slug.tsx`
