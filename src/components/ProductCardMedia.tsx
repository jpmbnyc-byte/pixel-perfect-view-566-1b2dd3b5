import { ComingSoonMedia } from "@/components/ComingSoonMedia";
import { useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";

type Props = {
  product: CatalogProduct;
  aspect?: "landscape" | "portrait" | "square";
};

/**
 * Hover (pointer:fine): reveal secondary plate.
 * No view labels on the thumb — the photo is the product.
 */
export function ProductCardMedia({ product, aspect = "landscape" }: Props) {
  const secondary = product.previews.secondary;
  const hasPair = Boolean(secondary && secondary !== product.thumb) && !product.imageryPending;
  const [showSecondary, setShowSecondary] = useState(false);
  const aspectClass =
    aspect === "portrait" ? "aspect-[3/4]" : aspect === "square" ? "aspect-square" : "aspect-[5/4]";

  if (product.imageryPending) {
    return <ComingSoonMedia name={product.name} className={aspectClass} />;
  }

  return (
    <div
      className={`relative overflow-hidden bg-[color-mix(in_oklab,var(--paper)_85%,white)] ${aspectClass}`}
      onMouseEnter={() => hasPair && setShowSecondary(true)}
      onMouseLeave={() => setShowSecondary(false)}
    >
      <img
        src={product.thumb}
        alt={product.name}
        width={800}
        height={aspect === "portrait" ? 1067 : 640}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-standard ease-standard ${
          showSecondary && hasPair ? "opacity-0" : "opacity-100"
        }`}
        draggable={false}
      />
      {hasPair && (
        <img
          src={secondary}
          alt=""
          width={800}
          height={aspect === "portrait" ? 1067 : 640}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-standard ease-standard ${
            showSecondary ? "opacity-100" : "opacity-0"
          }`}
          draggable={false}
        />
      )}
    </div>
  );
}
