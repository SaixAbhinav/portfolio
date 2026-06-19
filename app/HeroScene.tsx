// Painterly "journal cover" hero scene — a small explorer at a campfire on a
// floating island, under a dawn sky with a soft planet, drifting islands,
// twinkling stars and rising embers. Pure SVG + CSS animation (keyframes in
// globals.css), so it stays a server component. The explorer is deliberately
// tiny: the universe is larger than the map.

const STARS = [
  { x: 140, y: 90, r: 1.6, t: true },
  { x: 300, y: 150, r: 1.1 },
  { x: 480, y: 70, r: 1.4, t: true },
  { x: 650, y: 130, r: 1 },
  { x: 820, y: 80, r: 1.5, t: true },
  { x: 980, y: 160, r: 1.1 },
  { x: 1120, y: 70, r: 1.3 },
  { x: 1260, y: 140, r: 1.5, t: true },
  { x: 1360, y: 60, r: 1 },
  { x: 220, y: 250, r: 1.1 },
  { x: 560, y: 240, r: 1.3, t: true },
  { x: 900, y: 280, r: 1 },
  { x: 1180, y: 250, r: 1.4, t: true },
  { x: 80, y: 180, r: 1.2 },
  { x: 1320, y: 300, r: 1.1 },
];

const EMBERS = [
  { dx: 0, delay: 0, drift: "6px" },
  { dx: 6, delay: 0.6, drift: "-5px" },
  { dx: -5, delay: 1.1, drift: "8px" },
  { dx: 3, delay: 1.7, drift: "-7px" },
  { dx: -3, delay: 2.3, drift: "5px" },
];

export function HeroScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ece7ff" />
            <stop offset="38%" stopColor="#f4e6f1" />
            <stop offset="64%" stopColor="#ffe7d4" />
            <stop offset="100%" stopColor="#ffdcc4" />
          </linearGradient>
          <radialGradient id="hs-horizon" cx="50%" cy="92%" r="58%">
            <stop offset="0%" stopColor="#fff1df" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ffe0c4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffe0c4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hs-planet" cx="38%" cy="34%" r="70%">
            <stop offset="0%" stopColor="#e7dffb" />
            <stop offset="55%" stopColor="#cdbef0" />
            <stop offset="100%" stopColor="#b3a2e0" />
          </radialGradient>
          <radialGradient id="hs-fire" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#ffd8b1" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#ffb347" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffb347" stopOpacity="0" />
          </radialGradient>
          <filter id="hs-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="hs-blur-lg" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="1440" height="900" fill="url(#hs-sky)" />
        <rect width="1440" height="900" fill="url(#hs-horizon)" />

        {/* Stars */}
        <g fill="#2f3142">
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              opacity={0.22}
              className={s.t ? "twinkle" : undefined}
              style={s.t ? { animationDelay: `${(i % 5) * 0.7}s` } : undefined}
            />
          ))}
        </g>
        {/* A couple of warm accent stars near the fire's hemisphere */}
        <circle cx="1040" cy="120" r="2" fill="#ffb347" opacity="0.8" className="twinkle" />
        <circle cx="380" cy="200" r="1.8" fill="#ffb347" opacity="0.7" className="twinkle" style={{ animationDelay: "1.5s" }} />

        {/* Planet with ring, upper area */}
        <g className="float-slow">
          <ellipse cx="1115" cy="232" rx="150" ry="44" fill="none" stroke="#2f3142" strokeOpacity="0.1" strokeWidth="6" />
          <circle cx="1115" cy="225" r="82" fill="url(#hs-planet)" />
          <ellipse cx="1115" cy="225" rx="150" ry="44" fill="none" stroke="#b3a2e0" strokeOpacity="0.55" strokeWidth="4" />
          <circle cx="1085" cy="205" r="10" fill="#bcaee6" opacity="0.6" />
          <circle cx="1135" cy="250" r="7" fill="#a796d6" opacity="0.5" />
        </g>

        {/* Soft drifting clouds */}
        <g fill="#ffffff" opacity="0.5" filter="url(#hs-soft)">
          <ellipse className="cloud-1" cx="320" cy="430" rx="170" ry="34" />
          <ellipse className="cloud-2" cx="1080" cy="470" rx="200" ry="40" />
          <ellipse className="cloud-1" cx="720" cy="360" rx="140" ry="26" />
        </g>

        {/* Distant floating islands */}
        <g className="island-bob-slow">
          <FloatingIsland x={250} y={520} scale={0.7} fill="#9b91c2" tree="#857aad" pagoda />
        </g>
        <g className="island-bob">
          <FloatingIsland x={1180} y={560} scale={0.62} fill="#8e84ba" tree="#7a6fa6" />
        </g>
        <g className="island-bob" style={{ animationDelay: "2s" }}>
          <FloatingIsland x={560} y={610} scale={0.5} fill="#a89ecb" tree="#9389bb" />
        </g>

        {/* ── Foreground island with the explorer + campfire ── */}
        <g className="island-bob-slow" style={{ animationDelay: "1s" }}>
          {/* Island mass */}
          <path
            d="M520 812
               q60 -52 200 -52
               q150 0 210 50
               q40 34 -20 60
               q-90 36 -190 36
               q-110 0 -196 -34
               q-66 -28 -4 -60 Z"
            fill="#4a4566"
          />
          {/* grassy top */}
          <path
            d="M520 812 q60 -52 200 -52 q150 0 210 50 q-100 28 -210 28 q-118 0 -200 -26 Z"
            fill="#5b5680"
          />
          {/* hanging roots */}
          <path d="M600 832 q-6 40 -14 64 q-10 -22 -12 -56 Z" fill="#3c3856" />
          <path d="M840 836 q8 46 2 74 q-14 -24 -18 -66 Z" fill="#3c3856" />
          <path d="M720 846 q0 50 -6 78 q-10 -28 -10 -72 Z" fill="#3c3856" />

          {/* Campfire glow */}
          <ellipse className="fire-glow" cx="800" cy="772" rx="120" ry="86" fill="url(#hs-fire)" filter="url(#hs-blur-lg)" />

          {/* Logs */}
          <g stroke="#34304a" strokeWidth="7" strokeLinecap="round">
            <line x1="778" y1="794" x2="822" y2="786" />
            <line x1="782" y1="786" x2="826" y2="794" />
          </g>
          {/* Flames */}
          <g className="flame">
            <path d="M800 792 q-16 -22 -6 -40 q6 -12 2 -24 q14 10 14 28 q10 -8 8 -22 q14 16 10 40 q-4 22 -28 18 Z" fill="#ffb347" />
            <path d="M800 790 q-9 -14 -3 -26 q4 -8 2 -16 q9 8 8 19 q7 -5 6 -14 q8 12 5 26 q-4 14 -18 11 Z" fill="#ffd8b1" />
          </g>

          {/* Embers */}
          <g>
            {EMBERS.map((e, i) => (
              <circle
                key={i}
                className="ember"
                cx={800 + e.dx}
                cy={780}
                r={2}
                fill="#ffb347"
                style={{ animationDelay: `${e.delay}s`, ["--ember-drift" as string]: e.drift }}
              />
            ))}
          </g>

          {/* Explorer — small seated silhouette beside the fire */}
          <g fill="#2f3142">
            {/* backpack */}
            <path d="M726 742 q-14 4 -16 26 l4 20 q14 6 22 2 Z" fill="#3a3550" />
            {/* torso leaning toward fire */}
            <path d="M734 740 q18 -10 30 6 q8 12 4 30 l-34 6 q-12 -22 0 -42 Z" />
            {/* head */}
            <circle cx="742" cy="730" r="11" />
            {/* simple brim hat */}
            <path d="M726 726 q16 -12 34 0 q-8 5 -17 5 q-9 0 -17 -5 Z" />
            {/* legs toward fire */}
            <path d="M748 778 q22 -2 38 8 q4 8 -6 12 q-22 -4 -36 -6 Z" />
            {/* arm */}
            <path d="M760 752 q18 4 24 18 q-2 8 -10 6 q-12 -8 -20 -14 Z" />
          </g>
        </g>

        {/* Bottom atmospheric haze */}
        <rect x="0" y="820" width="1440" height="80" fill="#ffdcc4" opacity="0.5" filter="url(#hs-soft)" />
      </svg>
    </div>
  );
}

function FloatingIsland({
  x,
  y,
  scale = 1,
  fill,
  tree,
  pagoda = false,
}: {
  x: number;
  y: number;
  scale?: number;
  fill: string;
  tree: string;
  pagoda?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* island body */}
      <path d="M-90 0 q26 -34 90 -34 q66 0 92 32 q18 24 -10 40 q-40 22 -84 22 q-46 0 -82 -22 q-30 -16 -6 -38 Z" fill={fill} />
      {/* tapering underside */}
      <path d="M-40 36 q40 18 86 0 q-18 50 -44 78 q-26 -30 -42 -78 Z" fill={fill} opacity="0.7" />
      {/* trees / pagoda */}
      {pagoda ? (
        <g fill={tree}>
          <rect x="-14" y="-58" width="28" height="26" rx="3" />
          <path d="M-22 -56 h44 l-10 -16 h-24 Z" />
          <path d="M-16 -76 h32 l-8 -14 h-16 Z" />
        </g>
      ) : (
        <g fill={tree}>
          <path d="M-30 -28 q-6 -34 8 -34 q14 0 8 34 Z" />
          <path d="M18 -26 q-6 -40 10 -40 q14 0 6 40 Z" />
          <path d="M-6 -30 q-5 -28 7 -28 q12 0 5 28 Z" />
        </g>
      )}
    </g>
  );
}
