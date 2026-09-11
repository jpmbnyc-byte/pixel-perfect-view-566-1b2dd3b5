import { Link } from "@tanstack/react-router";

import { NameableFlag } from "@/components/NameableFlag";
import { ProductCardMedia } from "@/components/ProductCardMedia";
import { ShopLookChips } from "@/components/ShopThisLook";
import type { CatalogProduct } from "@/lib/catalog";

type CardProps = {
  product: CatalogProduct;
  slug: string;
};

/** Portrait plate, name, material line, price — no manifesto on the grid. */
export function ProductLookbookCard({ product, slug }: CardProps) {
  const shoe = product.sizeChart === "shoe";
  return (
    <div>
      <Link
        to="/team/$slug/$product"
        params={{ slug, product: product.id }}
        className="group block focus-ring"
      >
        <div className="relative">
          {product.nameNumber && <NameableFlag />}
          <ProductCardMedia product={product} aspect={shoe ? "square" : "portrait"} />
        </div>
        <div className="mt-5 space-y-1.5">
          <h3 className="font-display text-[1.05rem] font-medium leading-snug tracking-[0.04em] text-ink">
            {product.name}
          </h3>
          <p className="place-line text-ink/45">{product.line}</p>
          <p className="font-sans text-sm tabular-nums text-ink">${product.price}</p>
          {product.nameNumber && (
            <p className="place-line mt-2 text-garnet">Put your name on it</p>
          )}
        </div>
        {product.imageryPending && (
          <p className="place-line mt-2 text-ink/35">Photography in production</p>
        )}
      </Link>
      {!product.imageryPending ? <ShopLookChips product={product} slug={slug} /> : null}
    </div>
  );
}

type GridProps = {
  products: CatalogProduct[];
  slug: string;
};

export function ProductLookbookGrid({ products, slug }: GridProps) {
  return (
    <ul className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10">
      {products.map((p) => (
        <li key={p.id} className="min-w-0">
          <ProductLookbookCard product={p} slug={slug} />
        </li>
      ))}
    </ul>
  );
}
