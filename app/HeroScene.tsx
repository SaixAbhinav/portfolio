// Dark "journal cover" hero backdrop: a drifting star field over the night
// canvas, a soft campfire glow, and the gold line-art scene (explorer at a
// campfire under the mountains). Decorative + aria-hidden; pure SVG/CSS.

import { HeroLineArt } from "./LineArt";

const STAR_LAYER =
  "radial-gradient(1.6px 1.6px at 12% 18%, rgba(245,243,255,0.9), transparent)," +
  "radial-gradient(1.4px 1.4px at 78% 12%, rgba(216,192,138,0.9), transparent)," +
  "radial-gradient(1px 1px at 34% 30%, rgba(245,243,255,0.7), transparent)," +
  "radial-gradient(1.5px 1.5px at 64% 22%, rgba(245,243,255,0.8), transparent)," +
  "radial-gradient(1px 1px at 88% 34%, rgba(216,192,138,0.7), transparent)," +
  "radial-gradient(1.4px 1.4px at 22% 46%, rgba(245,243,255,0.7), transparent)," +
  "radial-gradient(1px 1px at 52% 14%, rgba(245,243,255,0.6), transparent)," +
  "radial-gradient(1.4px 1.4px at 92% 52%, rgba(216,192,138,0.7), transparent)";

export function HeroScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Night vignette + dawn glow near the horizon */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_8%,rgba(57,59,81,0.55),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(60%_100%_at_50%_120%,rgba(255,179,71,0.12),transparent_70%)]" />

      {/* Drifting star field */}
      <div
        className="star-field absolute -inset-32 opacity-80"
        style={{ backgroundImage: STAR_LAYER, backgroundSize: "340px 340px" }}
      />

      {/* Gold line-art scene, anchored to the lower band */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center text-gold">
        <HeroLineArt className="h-auto w-full max-w-6xl translate-y-[6%] opacity-90" />
      </div>
    </div>
  );
}
