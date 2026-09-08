# Bayonne Athletics — Fall 001

Storefront for the Bayonne Athletics Fall 001 collection: 1936 Match, Performance, Travel + Core, Harbor Division, and Club Goods.

**Live app**: https://pixel-perfect-view-566.lovable.app  
**Shopify store**: https://noparade-store.com

The 1936 Heritage Jersey is the only customizable piece. Checkout stays gated until Shopify variants are synced — visual work is independent of commerce.

## Development

```sh
bun install
bun run dev
```

Canonical imagery lives in `src/assets/bayonne/fall001/`. Raw GUID uploads are archived in `src/assets/bayonne/archive/`. The live catalog is `src/lib/catalog.ts` with the image registry in `src/lib/imageRegistry.ts`.

Apparel sizing is S–2XL across the live site.
