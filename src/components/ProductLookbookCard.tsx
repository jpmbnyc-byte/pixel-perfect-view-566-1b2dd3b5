import { Link } from "@tanstack/react-router";

import { NameableFlag } from "@/components/NameableFlag";
import { ProductCardMedia } from "@/components/ProductCardMedia";
import type { CatalogProduct } from "@/lib/catalog";

type CardProps = {
  product: CatalogProduct;
  slug: string;
};

/** Portrait plate, name, material line, price — no manifesto on the grid. */
export function ProductLookbookCard({ product, slug }: CardProps) {
  return (
    <Link
      to="/team/$slug/$product"
      params={{ slug, product: product.id }}
      className="group block focus-ring"
    >
      <div className="relative">
        {product.nameNumber && <NameableFlag />}
        <ProductCardMedia product={product} aspect="portrait" />
      </div>
      <div className="mt-5 space-y-1.5">
        <h3 className="font-display text-[1.05rem] font-medium leading-snug tracking-[0.04em] text-ink">
          {product.name}
        </h3>
        <p className="place-line text-ink/45">{product.line}</p>
        <p className="font-sans text-sm tabular-nums text-ink">${product.price}</p>
      </div>
      {product.imageryPending && (
        <p className="place-line mt-2 text-ink/35">Photography in production</p>
      )}
    </Link>
  );
}

type GridProps = {
  products: CatalogProduct[];
  slug: string;
};

export function ProductLookbookGrid({ products, slug }: GridProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10">
      {products.map((p) => (
        <li key={p.id}>
          <ProductLookbookCard product={p} slug={slug} />
        </li>
      ))}
    </ul>
  );
}
