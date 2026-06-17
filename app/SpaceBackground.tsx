"use client";

import Galaxy from "./Galaxy";

/**
 * Site-wide deep-space backdrop: a single fixed WebGL starfield (react-bits
 * "Galaxy") behind ALL page content. One canvas for the whole site — never one
 * per section, which would spin up many GL contexts and tank performance.
 *
 * - mouseRepulsion is OFF: stars drift in parallax with the cursor, they aren't
 *   pushed away from it.
 * - pointer-events-none so it never blocks clicks/scroll; Galaxy reads the cursor
 *   from the window, so parallax still works over content.
 *
 * NO reduced-motion gate. Windows commonly ships with "reduce motion" ON by
 * default, so disabling the animation there froze the stars for users who never
 * actually asked for a still page — the same trap that once hid TypedHeading (see
 * CLAUDE.md). The twinkle/drift here is gentle and continuous, so we keep it on.
 */
export function SpaceBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Opaque deep-space floor: near-black with a faint emerald horizon glow (brand accent). */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_-10%,#0a0f0d_0%,#05070a_45%,#020304_100%)]" />
      <div className="absolute inset-x-0 bottom-[-15%] h-[45%] bg-[radial-gradient(55%_100%_at_50%_100%,rgba(16,185,129,0.08),transparent_72%)]" />

      {/* The starfield itself — always animating. Settings dialed in by the user. */}
      <div className="absolute inset-0">
        <Galaxy
          mouseInteraction
          mouseRepulsion={false}
          density={0.8}
          glowIntensity={0.4}
          saturation={0}
          hueShift={100}
          twinkleIntensity={0.2}
          rotationSpeed={0.05}
          repulsionStrength={0.5}
          autoCenterRepulsion={0}
          starSpeed={0.4}
          speed={0.7}
          transparent
        />
      </div>

      {/* Gentle scrim + vignette so text stays legible over bright stars site-wide. */}
      <div className="absolute inset-0 bg-[#020304]/25" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_40%,transparent_45%,rgba(2,3,4,0.55)_100%)]" />
    </div>
  );
}
