/** A single-color logo from public/logos, painted with a brand color or the current text color. */
export function Logo({ file, color, className = "" }: { file: string; color?: string; className?: string }) {
  const url = `url(/logos/${file}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={`logo ${className}`}
      style={{ background: color ?? "currentColor", WebkitMaskImage: url, maskImage: url }}
    />
  );
}
