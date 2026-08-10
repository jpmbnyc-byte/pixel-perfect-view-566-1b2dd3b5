export type GalleryMode = "photos" | "name-it";

type Props = {
  mode: GalleryMode;
  onChange: (mode: GalleryMode) => void;
  /** Hide name-it when the SKU is not lettered */
  nameable: boolean;
};

/**
 * PDP above-the-fold control — never in a tab, never below the spec block.
 * R1 copy: "Put your name on it" — not Customize / Personalize / Configure.
 */
export function ImageTierToggle({ mode, onChange, nameable }: Props) {
  return (
    <div
      id="pdp-image-tier-toggle"
      className="grid grid-cols-2 gap-0 border border-ink/15"
      role="tablist"
      aria-label="Product image mode"
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === "photos"}
        onClick={() => onChange("photos")}
        className={`px-3 py-3 text-center text-sm font-semibold transition-colors ${
          mode === "photos" ? "bg-ink text-bone" : "bg-transparent text-ink/55 hover:text-ink"
        }`}
      >
        Photos
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "name-it"}
        disabled={!nameable}
        onClick={() => nameable && onChange("name-it")}
        className={`px-3 py-3 text-center text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
          mode === "name-it" ? "bg-garnet text-bone" : "bg-transparent text-ink/55 hover:text-ink"
        }`}
      >
        <span aria-hidden className="mr-1.5">
          ✏︎
        </span>
        Put your name on it
      </button>
    </div>
  );
}
