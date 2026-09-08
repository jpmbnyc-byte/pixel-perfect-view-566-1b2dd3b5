import { ComingSoonMedia } from "@/components/ComingSoonMedia";
import { useCallback, useState, type MouseEvent } from "react";
import type { CatalogProduct } from "@/lib/catalog";

type Props = {
  product: CatalogProduct;
  aspect?: "landscape" | "portrait";
};

/**
 * Hover (pointer:fine): reveal secondary plate.
 * Touch: tap cycles primary ↔ secondary — never a dead hover-only state.
 */
export function ProductCardMedia({ product, aspect = "landscape" }: Props) {
  const secondary = product.previews.secondary;
  const hasPair = Boolean(secondary && secondary !== product.thumb) && !product.imageryPending;
  const [showSecondary, setShowSecondary] = useState(false);
  const label = product.previewPair === "front-side" ? "side" : "back";
  const aspectClass = aspect === "portrait" ? "aspect-[3/4]" : "aspect-[5/4]";

  const onTouchToggle = useCallback(
    (e: MouseEvent) => {
      if (!hasPair) return;
      e.preventDefault();
      e.stopPropagation();
      setShowSecondary((v) => !v);
    },
    [hasPair],
  );

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
        alt={`${product.name}, front view`}
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
          alt={`${product.name}, ${label} view`}
          width={800}
          height={aspect === "portrait" ? 1067 : 640}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-standard ease-standard ${
            showSecondary ? "opacity-100" : "opacity-0"
          }`}
          draggable={false}
        />
      )}
      {hasPair && (
        <button
          type="button"
          className="absolute bottom-2 right-2 z-10 tap-44 place-line bg-paper/90 px-3 text-ink focus-ring md:hidden"
          onClick={onTouchToggle}
          aria-label={showSecondary ? "Show front view" : `Show ${label} view`}
        >
          {showSecondary ? "Front" : label}
        </button>
      )}
      {hasPair && (
        <span className="pointer-events-none absolute bottom-2 right-2 hidden place-line bg-paper/80 px-2 py-1 text-ink/70 opacity-0 transition-opacity duration-micro ease-standard group-hover:opacity-100 md:inline">
          {label}
        </span>
      )}
    </div>
  );
}
