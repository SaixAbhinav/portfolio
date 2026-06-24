// Hand-drawn gold line-art motifs (toolkit illustration style). All strokes use
// currentColor, so the parent sets the gold tint (text-gold). Campfire flames
// carry their own amber. Pure SVG; animation comes from CSS classes in globals.css.

type ArtProps = { className?: string };

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── Small reusable motifs ──────────────────────────────────────────── */

export function PineTree({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 40 60" className={className} {...{ fill: "none" }}>
      <g {...S}>
        <path d="M20 6 L8 26 H14 L6 42 H16 V52 H24 V42 H34 L26 26 H32 Z" />
        <line x1="20" y1="52" x2="20" y2="58" />
      </g>
    </svg>
  );
}

export function PlanetRinged({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 80 64" className={className} fill="none">
      <g {...S}>
        <circle cx="40" cy="30" r="20" />
        <ellipse cx="40" cy="30" rx="38" ry="11" />
        <path d="M22 38 a20 20 0 0 0 36 0" opacity="0.5" />
        <circle cx="33" cy="24" r="2.4" />
        <circle cx="46" cy="33" r="1.6" />
      </g>
    </svg>
  );
}

export function Pagoda({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 60 70" className={className} fill="none">
      <g {...S}>
        <path d="M10 24 L30 10 L50 24" />
        <path d="M14 38 L30 26 L46 38" />
        <rect x="20" y="38" width="20" height="24" rx="2" />
        <line x1="30" y1="62" x2="30" y2="68" />
        <line x1="26" y1="44" x2="26" y2="56" />
        <line x1="34" y1="44" x2="34" y2="56" />
      </g>
    </svg>
  );
}

export function Signpost({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 60 70" className={className} fill="none">
      <g {...S}>
        <line x1="30" y1="14" x2="30" y2="66" />
        <path d="M30 22 H50 L56 28 L50 34 H30 Z" />
        <path d="M30 40 H14 L8 46 L14 52 H30 Z" />
      </g>
    </svg>
  );
}

export function LanternHanging({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 40 70" className={className} fill="none">
      <g {...S}>
        <line x1="20" y1="2" x2="20" y2="14" />
        <path d="M12 16 H28 L26 20 H14 Z" />
        <rect x="13" y="20" width="14" height="22" rx="3" />
        <path d="M13 42 H27 L24 48 H16 Z" />
        <line x1="20" y1="24" x2="20" y2="38" stroke="#ffb347" />
      </g>
    </svg>
  );
}

export function CompassRose({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <g {...S}>
        <circle cx="32" cy="32" r="26" />
        <circle cx="32" cy="32" r="20" opacity="0.5" />
        <path d="M32 14 L37 30 L32 50 L27 30 Z" />
        <path d="M14 32 L30 27 L50 32 L30 37 Z" opacity="0.7" />
        <circle cx="32" cy="32" r="2.2" />
      </g>
    </svg>
  );
}

export function OpenJournal({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 90 64" className={className} fill="none">
      <g {...S}>
        <path d="M45 16 C34 8 18 8 8 12 V52 C18 48 34 48 45 56 C56 48 72 48 82 52 V12 C72 8 56 8 45 16 Z" />
        <line x1="45" y1="16" x2="45" y2="56" />
        <path d="M16 22 H36 M16 30 H34 M16 38 H36" opacity="0.6" />
        <path d="M54 22 H74 M56 30 H74 M54 38 H74" opacity="0.6" />
      </g>
    </svg>
  );
}

export function FloatingIsland({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 110" className={className} fill="none">
      <g {...S}>
        <path d="M14 48 Q20 30 60 30 Q100 30 106 48 Q110 60 90 66 Q60 74 30 66 Q10 60 14 48 Z" />
        <path d="M34 64 Q44 84 50 100 Q56 84 60 70" opacity="0.7" />
        <path d="M70 66 Q78 80 80 92" opacity="0.5" />
        {/* pagoda + tree on top */}
        <path d="M44 30 L54 20 L64 30" />
        <rect x="48" y="30" width="12" height="6" />
        <path d="M74 30 Q70 14 80 14 Q90 14 86 30 Z" />
      </g>
    </svg>
  );
}

export function TelescopeStand({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 80 90" className={className} fill="none">
      <g {...S}>
        <rect x="30" y="20" width="34" height="13" rx="6.5" transform="rotate(-28 47 26)" />
        <circle cx="60" cy="20" r="3" />
        <line x1="40" y1="38" x2="40" y2="74" />
        <line x1="40" y1="50" x2="22" y2="80" />
        <line x1="40" y1="50" x2="58" y2="80" />
        <path d="M30 80 H50" opacity="0.5" />
      </g>
    </svg>
  );
}

export function CampfireScene({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 80 70" className={className} fill="none">
      <g {...S}>
        {/* logs */}
        <line x1="22" y1="56" x2="58" y2="48" />
        <line x1="22" y1="48" x2="58" y2="56" />
        <path d="M20 60 Q40 56 60 60" />
        {/* small stones */}
        <path d="M18 60 q-4 -4 0 -8" opacity="0.6" />
        <path d="M62 60 q4 -4 0 -8" opacity="0.6" />
      </g>
      {/* flame */}
      <g className="flame">
        <path d="M40 50 Q30 38 38 26 Q40 32 42 30 Q40 22 46 18 Q44 30 50 30 Q56 40 48 50 Z" fill="#ffb347" stroke="#ffb347" strokeWidth="1.2" />
      </g>
      <g className="flame-inner">
        <path d="M40 50 Q34 42 39 33 Q41 37 43 35 Q42 42 46 46 Z" fill="#ffd8b1" stroke="none" />
      </g>
    </svg>
  );
}

export function MountainRange({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 260 110" className={className} fill="none" preserveAspectRatio="xMidYMax meet">
      <g {...S}>
        <path d="M0 100 L46 44 L70 70 L96 30 L130 100 Z" />
        <path d="M86 100 L140 24 L168 60 L196 36 L236 100 Z" opacity="0.85" />
        <path d="M150 24 L160 36 M140 40 L150 36" opacity="0.6" />
        <path d="M0 100 H260" opacity="0.4" />
      </g>
    </svg>
  );
}

export function StarScatter({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none">
      <g {...S}>
        {[
          [20, 24], [60, 14], [120, 28], [170, 18], [40, 70],
          [150, 80], [186, 60], [90, 64], [110, 100],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y - 5} L${x} ${y + 5} M${x - 5} ${y} L${x + 5} ${y}`} opacity={0.8} />
        ))}
        <circle cx="78" cy="34" r="1.4" fill="currentColor" />
        <circle cx="160" cy="44" r="1.4" fill="currentColor" />
      </g>
    </svg>
  );
}

/* ── The hero scene — explorer at a campfire under the mountains ─────── */

export function HeroLineArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 720 460" className={className} fill="none" preserveAspectRatio="xMidYMid meet">
      <g {...S}>
        {/* distant planets + stars */}
        <g opacity="0.9">
          <circle cx="600" cy="70" r="34" />
          <ellipse cx="600" cy="70" rx="60" ry="16" />
          <circle cx="120" cy="60" r="16" />
          {[[60, 110], [220, 40], [320, 90], [470, 50], [540, 130], [660, 150], [180, 150], [380, 36]].map(
            ([x, y], i) => (
              <path key={i} d={`M${x} ${y - 5} L${x} ${y + 5} M${x - 5} ${y} L${x + 5} ${y}`} opacity="0.75" className="twinkle" style={{ animationDelay: `${i * 0.5}s` }} />
            ),
          )}
        </g>

        {/* mountain range */}
        <path className="draw-line" style={{ ["--draw-len" as string]: 1400 }} d="M40 360 L150 180 L210 250 L300 150 L360 230 L430 170 L520 300 L600 220 L690 360" />
        <path d="M40 360 H690" opacity="0.4" />
        <path d="M290 165 L300 150 L312 168 M352 222 L360 230 L370 214" opacity="0.6" />

        {/* pines */}
        <g opacity="0.85">
          <path d="M120 360 L110 330 L116 332 L108 312 L114 314 L118 300 L122 314 L128 312 L120 332 L126 330 Z" />
          <path d="M660 360 L652 336 L657 338 L650 320 L656 322 L660 310 L664 322 L670 320 L663 338 L668 336 Z" />
        </g>

        {/* floating island upper-right */}
        <g className="island-bob" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <path d="M430 90 Q438 76 470 76 Q502 76 510 90 Q514 100 498 104 Q470 110 446 104 Q428 100 430 90 Z" transform="translate(40 0)" />
          <path d="M478 104 Q484 120 486 132" opacity="0.6" transform="translate(40 0)" />
          <path d="M500 76 L508 66 L516 76" transform="translate(40 0)" />
        </g>

        {/* telescope on tripod (right of explorer) */}
        <g transform="translate(470 250)">
          <rect x="6" y="-6" width="40" height="14" rx="7" transform="rotate(-26 26 1)" />
          <circle cx="42" cy="-12" r="3" />
          <line x1="18" y1="14" x2="18" y2="58" />
          <line x1="18" y1="30" x2="2" y2="58" />
          <line x1="18" y1="30" x2="34" y2="58" />
        </g>

        {/* explorer — kneeling with a backpack, facing the fire */}
        <g transform="translate(290 270)" strokeWidth="1.6">
          {/* backpack */}
          <path d="M-16 6 Q-30 8 -30 30 Q-30 46 -16 48" />
          <path d="M-26 16 H-16 M-26 30 H-16" opacity="0.6" />
          {/* body kneeling */}
          <path d="M-16 4 Q4 -6 16 8 Q22 18 18 36 L-8 46 Q-18 24 -16 4 Z" />
          {/* head + brimmed hat */}
          <circle cx="-2" cy="-8" r="9" />
          <path d="M-16 -10 Q-2 -22 12 -10 Q2 -16 -2 -16 Q-8 -16 -16 -10 Z" />
          {/* arm reaching toward fire */}
          <path d="M14 14 Q34 18 44 34" />
          {/* lower leg kneeling */}
          <path d="M-8 46 Q14 50 40 48" />
        </g>

        {/* campfire in front of explorer */}
        <g transform="translate(360 300)">
          <line x1="-18" y1="14" x2="18" y2="6" />
          <line x1="-18" y1="6" x2="18" y2="14" />
          <g className="flame">
            <path d="M0 8 Q-12 -6 -2 -20 Q0 -12 3 -15 Q0 -24 8 -28 Q5 -14 12 -14 Q20 -2 8 8 Z" fill="#ffb347" stroke="#ffb347" strokeWidth="1.2" />
          </g>
          <g className="flame-inner">
            <path d="M2 6 Q-4 -2 1 -10 Q3 -7 4 -8 Q3 -13 7 -15 Q6 -7 9 -6 Z" fill="#ffd8b1" stroke="none" />
          </g>
          {/* embers */}
          {[0, 1, 2].map((i) => (
            <circle key={i} className="ember" cx={i * 6 - 6} cy={-4} r="1.6" fill="#ffb347" style={{ animationDelay: `${i * 0.7}s`, ["--ember-drift" as string]: `${i % 2 ? -6 : 6}px` }} />
          ))}
        </g>
      </g>
    </svg>
  );
}
