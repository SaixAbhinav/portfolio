// Per-section painterly sky: a soft pastel wash, drifting cloud blobs, and a
// slowly parallaxing star field. Pure CSS animation (see globals.css), so this
// stays a server component. Each section leans on ONE pastel tint
// (the Pastel-Rotation Rule) for journal rhythm.

type Tint = "dawn" | "wildflower" | "mint" | "peach" | "lavender";

const TINTS: Record<Tint, { wash: string; cloudA: string; cloudB: string }> = {
  dawn: { wash: "255,214,231", cloudA: "255,214,231", cloudB: "217,200,255" },
  wildflower: { wash: "191,215,255", cloudA: "191,215,255", cloudB: "207,239,217" },
  mint: { wash: "207,239,217", cloudA: "207,239,217", cloudB: "191,215,255" },
  peach: { wash: "255,216,177", cloudA: "255,216,177", cloudB: "255,214,231" },
  lavender: { wash: "217,200,255", cloudA: "217,200,255", cloudB: "191,215,255" },
};

// A scattered star field rendered as layered radial-gradient dots (cheap, no DOM).
const STAR_LAYER =
  "radial-gradient(1.5px 1.5px at 12% 18%, rgba(47,49,66,0.28), transparent)," +
  "radial-gradient(1.5px 1.5px at 78% 12%, rgba(47,49,66,0.22), transparent)," +
  "radial-gradient(1px 1px at 34% 42%, rgba(47,49,66,0.20), transparent)," +
  "radial-gradient(1.5px 1.5px at 64% 56%, rgba(47,49,66,0.22), transparent)," +
  "radial-gradient(1px 1px at 88% 38%, rgba(47,49,66,0.18), transparent)," +
  "radial-gradient(1.5px 1.5px at 22% 72%, rgba(47,49,66,0.22), transparent)," +
  "radial-gradient(1px 1px at 52% 84%, rgba(47,49,66,0.16), transparent)," +
  "radial-gradient(1.5px 1.5px at 92% 78%, rgba(47,49,66,0.20), transparent)";

export function SkyBackdrop({
  tint = "wildflower",
  position = "top",
}: {
  tint?: Tint;
  position?: "top" | "center" | "bottom";
}) {
  const t = TINTS[tint];
  const washY = position === "top" ? "-10%" : position === "bottom" ? "110%" : "40%";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Pastel sky wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at 50% ${washY}, rgba(${t.wash},0.55) 0%, rgba(${t.wash},0.18) 38%, transparent 70%)`,
        }}
      />
      {/* Drifting cloud blobs */}
      <div
        className="cloud-1 absolute -left-24 top-[12%] h-72 w-72 rounded-full blur-3xl"
        style={{ background: `rgba(${t.cloudA},0.45)` }}
      />
      <div
        className="cloud-2 absolute -right-20 bottom-[10%] h-80 w-80 rounded-full blur-3xl"
        style={{ background: `rgba(${t.cloudB},0.4)` }}
      />
      {/* Parallaxing star field (oversized so the drift never reveals an edge) */}
      <div
        className="star-field absolute -inset-32 opacity-70"
        style={{ backgroundImage: STAR_LAYER, backgroundSize: "320px 320px" }}
      />
    </div>
  );
}
