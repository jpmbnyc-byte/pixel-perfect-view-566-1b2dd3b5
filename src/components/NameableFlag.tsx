type Props = {
  /** One-word tooltip */
  label?: string;
};

/** Garnet corner mark on every lettered SKU card. Tooltip: Nameable. */
export function NameableFlag({ label = "Nameable" }: Props) {
  return (
    <span
      className="nameable-flag pointer-events-none absolute right-0 top-0 z-10"
      title={label}
      aria-label={label}
    >
      <span className="block h-0 w-0 border-l-[1.75rem] border-t-[1.75rem] border-l-transparent border-t-garnet" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
