import { Link, createFileRoute } from "@tanstack/react-router";

import { CRESTS } from "@/lib/brandAssets";
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
    <main className="studio-field mx-auto min-h-screen w-full max-w-[560px] px-6 py-16 text-ink sm:px-10">
      <img src={CRESTS.primary} alt="" className="h-12 w-12 object-contain" />
      <p className="place-line mt-8">Fall 001 · 07002</p>
      <h1 className="type-editorial mt-4 text-[clamp(1.8rem,6vw,2.4rem)]">Checkout paused.</h1>
      <div className="tip-asymmetric mt-7">
        <span className="tip-asymmetric-a" />
        <span className="tip-asymmetric-b" />
      </div>
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
  );
}
