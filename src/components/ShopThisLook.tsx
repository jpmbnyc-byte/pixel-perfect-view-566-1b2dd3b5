import { Link } from "@tanstack/react-router";

import { productById, type CatalogProduct } from "@/lib/catalog";
import { imagesFor } from "@/lib/imageRegistry";
import { lookFor } from "@/lib/looks";

type Props = {
  product: CatalogProduct;
  slug: string;
};

function lookItems(productId: string): CatalogProduct[] {
  const look = lookFor(productId);
  if (!look) return [];
  return look.pieces
    .map((id) => productById(id))
    .filter((item): item is CatalogProduct => Boolean(item) && item.imageryPending !== true);
}

/** Compact chips under a sneaker PLP card — outside the main product link. */
export function ShopLookChips({ product, slug }: Props) {
  const items = lookItems(product.id);
  if (items.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="place-line text-ink/40">Shop this look</p>
      <ul className="mt-2 flex items-center gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to="/team/$slug/$product"
              params={{ slug, product: item.id }}
              className="block size-11 overflow-hidden bg-[color-mix(in_oklab,var(--paper)_70%,white)] focus-ring sm:size-12"
              aria-label={`${item.name}, $${item.price}`}
            >
              <img
                src={item.thumb}
                alt=""
                width={96}
                height={96}
                className="size-full object-contain object-center"
                draggable={false}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** PDP complete-the-look: lifestyle plate + companion listings. */
export function ShopThisLook({ product, slug }: Props) {
  const look = lookFor(product.id);
  const lifestyle = imagesFor(product.id).modelFront;
  const items = lookItems(product.id);
  if (!look || !lifestyle || items.length === 0) return null;

  return (
    <section className="mt-14 border-t border-ink/10 pt-10 sm:mt-16 sm:pt-12" aria-labelledby="shop-this-look">
      <p className="place-line">The look</p>
      <h2 id="shop-this-look" className="type-editorial mt-2 text-[clamp(1.5rem,3vw,2.1rem)] text-ink">
        Shop this look
      </h2>
      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-10">
        <div className="overflow-hidden bg-ink/5">
          <img
            src={lifestyle}
            alt={`${product.name}, worn with the look`}
            width={1200}
            height={1600}
            className="aspect-[3/4] h-auto w-full object-cover object-bottom"
          />
        </div>
        <ul className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to="/team/$slug/$product"
                params={{ slug, product: item.id }}
                className="group flex items-center gap-4 focus-ring"
              >
                <div className="size-20 shrink-0 overflow-hidden bg-[color-mix(in_oklab,var(--paper)_70%,white)] sm:size-24">
                  <img
                    src={item.thumb}
                    alt=""
                    width={192}
                    height={192}
                    className="size-full object-contain object-center transition-transform duration-500 ease-standard group-hover:scale-[1.04]"
                    draggable={false}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[0.95rem] leading-snug tracking-[0.04em] text-ink">
                    {item.name}
                  </p>
                  <p className="place-line mt-1 text-ink/45">{item.line}</p>
                  <p className="mt-1 font-sans text-sm tabular-nums text-ink">${item.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
