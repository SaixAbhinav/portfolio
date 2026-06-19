// Per-section night sky: a drifting star field, a soft pastel glow, and a faint
// topographic texture. Pure CSS animation, so it stays a server component.
// Each section leans on ONE pastel tint for rhythm.

type Tint = "dawn" | "wildflower" | "mint" | "peach" | "lavender" | "gold";

const GLOW: Record<Tint, string> = {
  dawn: "255,214,231",
  wildflower: "191,215,255",
  mint: "207,239,217",
  peach: "255,216,177",
  lavender: "217,200,255",
  gold: "216,192,138",
};

const STAR_LAYER =
  "radial-gradient(1.5px 1.5px at 12% 18%, rgba(245,243,255,0.85), transparent)," +
  "radial-gradient(1.4px 1.4px at 78% 12%, rgba(216,192,138,0.8), transparent)," +
  "radial-gradient(1px 1px at 34% 42%, rgba(245,243,255,0.6), transparent)," +
  "radial-gradient(1.5px 1.5px at 64% 56%, rgba(245,243,255,0.7), transparent)," +
  "radial-gradient(1px 1px at 88% 38%, rgba(216,192,138,0.6), transparent)," +
  "radial-gradient(1.4px 1.4px at 22% 72%, rgba(245,243,255,0.6), transparent)," +
  "radial-gradient(1px 1px at 52% 84%, rgba(245,243,255,0.5), transparent)," +
  "radial-gradient(1.5px 1.5px at 92% 78%, rgba(216,192,138,0.6), transparent)";

export function SkyBackdrop({
  tint = "gold",
  position = "center",
  topo = false,
}: {
  tint?: Tint;
  position?: "top" | "center" | "bottom";
  topo?: boolean;
}) {
  const glow = GLOW[tint];
  const glowY = position === "top" ? "-5%" : position === "bottom" ? "105%" : "30%";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft pastel glow over the night */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(110% 70% at 50% ${glowY}, rgba(${glow},0.12) 0%, rgba(${glow},0.04) 40%, transparent 72%)`,
        }}
      />
      {/* Faint topographic contour texture */}
      {topo && <div className="topo-texture absolute inset-0 opacity-[0.07]" />}
      {/* Parallaxing star field */}
      <div
        className="star-field absolute -inset-32 opacity-70"
        style={{ backgroundImage: STAR_LAYER, backgroundSize: "320px 320px" }}
      />
    </div>
  );
}
