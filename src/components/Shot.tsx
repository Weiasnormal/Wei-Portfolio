import Image from "next/image";

/** An image in a post. Shows a dashed placeholder frame until `src` is set. */
export function Shot({ label, src }: { label: string; src?: string }) {
  return (
    <figure className="mt-5 mb-5">
      <div className="frame-dash relative grid aspect-video place-content-center overflow-hidden rounded-lg border border-line bg-sunk p-4 text-center text-[13px] text-muted">
        {src ? <Image src={src} alt={label} fill sizes="(min-width: 768px) 640px, 100vw" className="object-cover" /> : <span>{label}</span>}
      </div>
    </figure>
  );
}
