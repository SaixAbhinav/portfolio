import Image from "next/image";
import type { ArtAsset } from "./content";

type ArtPanelProps = {
  asset: ArtAsset;
  priority?: boolean;
  className?: string;
};

export function ArtPanel({
  asset,
  priority = false,
  className = "",
}: ArtPanelProps) {
  return (
    <figure
      className={`journal-frame overflow-hidden bg-[var(--panel)] ${className}`}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={720}
        height={420}
        priority={priority}
        className="h-full w-full object-cover opacity-95"
      />
      <figcaption className="hand-note border-t border-[color:var(--line)] px-4 py-3 text-lg text-[var(--lavender)]">
        {asset.caption}
      </figcaption>
    </figure>
  );
}
