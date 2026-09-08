import { Link, createFileRoute } from "@tanstack/react-router";

import { MotionMark, Wordmark } from "@/components/brand/BrandMarks";
import { StoreFooter } from "@/components/brand/StoreFooter";
import { StoreNav } from "@/components/brand/StoreNav";
import { productById } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

export const Route = createFileRoute("/order/cancel")({
  validateSearch: (search: Record<string, unknown>) => ({
    product: typeof search["product"] === "string" ? search["product"] : undefined,
  }),
  head: () => ({
    meta: [{ title: "Checkout cancelled — Bayonne Athletics" }],
  }),
  component: OrderCancel,
});

function OrderCancel() {
  const { product: productId } = Route.useSearch();
  const kit = BAYONNE_BEES_KIT;
  const product = productId ? productById(productId) : null;

  return (
    <div className="studio-field min-h-screen text-ink">
      <StoreNav />
      <main className="mx-auto w-full max-w-[720px] px-6 py-16 sm:px-10 sm:py-24">
        <Wordmark variant="compact" align="left" />
        <p className="place-line mt-10">Fall 001 · 07002</p>
        <h1 className="type-editorial mt-4 text-[clamp(2rem,6vw,3.2rem)]">Checkout paused.</h1>
        <MotionMark className="mt-6 block text-garnet" />
        <p className="mt-8 max-w-sm text-sm leading-relaxed text-ink/60">
          Nothing was charged. Your selection is still on the product page if you want to finish.
        </p>
        {product ? (
          <Link
            to="/team/$slug/$product"
            params={{ slug: kit.slug, product: product.id }}
            className="place-line mt-10 inline-flex items-center gap-3 border-b border-ink/30 pb-2"
          >
            Return to {product.name}
            <span aria-hidden>→</span>
          </Link>
        ) : (
          <Link
            to="/team/$slug/match"
            params={{ slug: kit.slug }}
            className="place-line mt-10 inline-flex items-center gap-3 border-b border-ink/30 pb-2"
          >
            Back to Fall 001
            <span aria-hidden>→</span>
          </Link>
        )}
      </main>
      <StoreFooter />
    </div>
  );
}
