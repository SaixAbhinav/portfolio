# Explorer Journal Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved multi-page Explorer Journal portfolio using the supplied dark build-kit artwork on every route.

**Architecture:** Keep the Next.js App Router and Tailwind v4 stack. Move repeated portfolio content into a typed data module, create shared visual/layout components, then add six routes that use a consistent journal/art system. Use cropped bitmap assets from `dark-build-kit.png` via `next/image`.

**Tech Stack:** Next.js 16.2.6, React 19.2.4, TypeScript 5, Tailwind CSS v4, `next/font/google`, `next/image`, `lucide-react`.

## Global Constraints

- Use the build-kit as the primary design reference.
- Copy the build-kit image into the project and crop/export multiple static art assets from it for page-specific use.
- Each route must include at least one visible art asset or line-art composition.
- Routes: `/`, `/discoveries`, `/logbook`, `/signals`, `/about`, `/contact`.
- Navigation labels: `Journey`, `Discoveries`, `Logbook`, `Signals`, `About`, `Contact`.
- Keep the existing Next.js App Router and Tailwind CSS v4 stack.
- Components stay colocated under `app/`.
- Use `next/image` for all cropped bitmap art and the portrait.
- Avoid Inter as the primary body font.
- Avoid large gradient orbs, emerald glows, generic three-column card rows, and marketing hero patterns.
- Keep all current factual content unless the user provides replacements.
- Motion must respect `prefers-reduced-motion`.
- Verification must include `npm run build`, a local dev server check, and desktop/mobile visual inspection.

---

## File Structure

- Create `public/build-kit/dark-build-kit.png`: source artwork copied from `C:\Users\marsh\Downloads\dark-build-kit.png`.
- Create cropped assets in `public/build-kit/`: `hero-campfire.png`, `campfire-mark.png`, `planet.png`, `telescope.png`, `journal-map.png`, `signals.png`, `project-panels.png`, `texture-strip.png`.
- Create `app/content.ts`: typed route metadata, projects, skills, timeline entries, contact links, and art asset descriptors.
- Create `app/PageShell.tsx`: consistent page frame, section label, title, subtitle, art slot, and next-route footer.
- Create `app/ArtPanel.tsx`: reusable image panel using `next/image`.
- Create `app/ProjectDiscovery.tsx`: project row/card for `/discoveries`.
- Create `app/JournalEntry.tsx`: timeline entry for `/logbook`.
- Create `app/SignalGrid.tsx`: skills/metrics grid for `/signals`.
- Modify `app/Nav.tsx`: route-aware multi-page nav using `next/link` and `usePathname`.
- Modify `app/layout.tsx`: fonts, metadata, dark build-kit body styling.
- Replace `app/page.tsx`: Journey route.
- Create `app/discoveries/page.tsx`, `app/logbook/page.tsx`, `app/signals/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`.
- Modify `app/globals.css`: visual tokens, texture, focus states, responsive helpers, reduced-motion handling.
- Leave obsolete components in place until final cleanup: `HeroIntro.tsx`, `TypedHeading.tsx`, `SpotlightCard.tsx`, `Counter.tsx`, `CursorSpotlight.tsx`.

---

### Task 1: Build-Kit Assets and Content Model

**Files:**
- Create: `public/build-kit/dark-build-kit.png`
- Create: `public/build-kit/hero-campfire.png`
- Create: `public/build-kit/campfire-mark.png`
- Create: `public/build-kit/planet.png`
- Create: `public/build-kit/telescope.png`
- Create: `public/build-kit/journal-map.png`
- Create: `public/build-kit/signals.png`
- Create: `public/build-kit/project-panels.png`
- Create: `public/build-kit/texture-strip.png`
- Create: `app/content.ts`

**Interfaces:**
- Produces: `routes`, `projects`, `timeline`, `skills`, `metrics`, `contactLinks`, `artAssets`.
- Later tasks import these exact names from `app/content.ts`.

- [ ] **Step 1: Create the asset directory and copy the source image**

```powershell
New-Item -ItemType Directory -Force -LiteralPath "C:\Users\marsh\OneDrive\Desktop\portfolio\public\build-kit"
Copy-Item -LiteralPath "C:\Users\marsh\Downloads\dark-build-kit.png" -Destination "C:\Users\marsh\OneDrive\Desktop\portfolio\public\build-kit\dark-build-kit.png" -Force
```

Expected: `public/build-kit/dark-build-kit.png` exists.

- [ ] **Step 2: Crop the required art assets**

Run this PowerShell script from the repo root:

```powershell
Add-Type -AssemblyName System.Drawing
$src = "C:\Users\marsh\OneDrive\Desktop\portfolio\public\build-kit\dark-build-kit.png"
$out = "C:\Users\marsh\OneDrive\Desktop\portfolio\public\build-kit"
$bmp = [System.Drawing.Bitmap]::new($src)
$crops = @(
  @{ Name = "hero-campfire.png"; X = 430; Y = 40; W = 345; H = 245 },
  @{ Name = "campfire-mark.png"; X = 790; Y = 190; W = 175; H = 100 },
  @{ Name = "planet.png"; X = 635; Y = 35; W = 150; H = 110 },
  @{ Name = "telescope.png"; X = 760; Y = 1320; W = 110; H = 75 },
  @{ Name = "journal-map.png"; X = 20; Y = 1185; W = 340; H = 160 },
  @{ Name = "signals.png"; X = 650; Y = 760; W = 275; H = 160 },
  @{ Name = "project-panels.png"; X = 610; Y = 1320; W = 395; H = 170 },
  @{ Name = "texture-strip.png"; X = 360; Y = 1185; W = 255; H = 145 }
)
foreach ($crop in $crops) {
  $rect = [System.Drawing.Rectangle]::new($crop.X, $crop.Y, $crop.W, $crop.H)
  $clone = $bmp.Clone($rect, $bmp.PixelFormat)
  $clone.Save((Join-Path $out $crop.Name), [System.Drawing.Imaging.ImageFormat]::Png)
  $clone.Dispose()
}
$bmp.Dispose()
```

Expected: eight cropped PNG files exist under `public/build-kit/`.

- [ ] **Step 3: Add the typed content model**

Create `app/content.ts` with:

```ts
export type RouteItem = {
  href: string;
  label: string;
  eyebrow: string;
};

export type ArtAsset = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string;
  metric?: {
    value: string;
    label: string;
    trend: "up" | "down";
  };
  art: keyof typeof artAssets;
};

export const routes: RouteItem[] = [
  { href: "/", label: "Journey", eyebrow: "00" },
  { href: "/discoveries", label: "Discoveries", eyebrow: "01" },
  { href: "/logbook", label: "Logbook", eyebrow: "02" },
  { href: "/signals", label: "Signals", eyebrow: "03" },
  { href: "/about", label: "About", eyebrow: "04" },
  { href: "/contact", label: "Contact", eyebrow: "05" },
];

export const artAssets = {
  hero: {
    src: "/build-kit/hero-campfire.png",
    alt: "Line art of a traveler by a campfire beneath mountains, stars, planets, and a telescope.",
    caption: "The universe is larger than the map.",
  },
  campfire: {
    src: "/build-kit/campfire-mark.png",
    alt: "Line art campfire mark with small stars.",
    caption: "Warmth for the unknown.",
  },
  planet: {
    src: "/build-kit/planet.png",
    alt: "Line art ringed planet surrounded by small stars.",
    caption: "Signals from farther systems.",
  },
  telescope: {
    src: "/build-kit/telescope.png",
    alt: "Line art telescope pointed at a star field.",
    caption: "Looking for measurable proof.",
  },
  journal: {
    src: "/build-kit/journal-map.png",
    alt: "Line art notebook, observations, and technical map sketches.",
    caption: "Notes from the build.",
  },
  signals: {
    src: "/build-kit/signals.png",
    alt: "Line art landscape with sky islands, cliffs, stars, and signal-like marks.",
    caption: "Patterns worth following.",
  },
  projects: {
    src: "/build-kit/project-panels.png",
    alt: "A grid of illustrated project panels with mountains, maps, telescope, journal, lantern, and planet motifs.",
    caption: "Discoveries over details.",
  },
  texture: {
    src: "/build-kit/texture-strip.png",
    alt: "Decorative line-art texture panels from the brand kit.",
    caption: "Field textures.",
  },
};

export const projects: Project[] = [
  {
    title: "SmartSignal",
    subtitle: "AI Traffic Light Automation System",
    description:
      "AI-powered traffic signal control system using PPO reinforcement learning and SUMO simulation. Integrated TomTom API for realistic traffic data, reducing vehicle waiting time by roughly 28% and increasing throughput by 22%.",
    tags: ["Python", "PPO", "SUMO", "TomTom API", "Reinforcement Learning"],
    github: "https://github.com/SaixAbhinav/SmartSignal",
    metric: { value: "-28%", label: "vehicle wait time", trend: "down" },
    art: "telescope",
  },
  {
    title: "FakeGuard",
    subtitle: "Instagram Fake Profile Detection",
    description:
      "Predictive system trained on 3,000+ accounts using an ensemble model combining ML and CNN-based image classification. Achieved 92% accuracy, 90% precision, and 88% recall with a 15% reduction in false positives.",
    tags: ["Python", "CNN", "Scikit-learn", "TensorFlow", "Keras"],
    github: "https://github.com/SaixAbhinav/FakeGuard",
    metric: { value: "92%", label: "accuracy", trend: "up" },
    art: "planet",
  },
  {
    title: "AI Workflow Assistant",
    subtitle: "Intelligent Automation Tool",
    description:
      "AI-powered tool that automates summarization, insight extraction, and task generation from unstructured data. Built with prompt engineering workflows using the OpenAI API for structured, reliable outputs.",
    tags: ["Python", "OpenAI API", "Prompt Engineering", "Flask"],
    github: "https://github.com/SaixAbhinav/ai-workflow-assistant",
    art: "journal",
  },
  {
    title: "Skin Cancer Detection",
    subtitle: "IBM Skills Build Internship",
    description:
      "CNN-based image classifier for early skin cancer detection, built during a data analyst internship at IBM Skills Build. Achieved 94% accuracy on dermoscopic images through transfer learning and targeted data augmentation.",
    tags: ["Python", "CNN", "TensorFlow", "Keras", "Image Classification"],
    github: "https://github.com/SaixAbhinav/skin-cancer-detection",
    metric: { value: "94%", label: "accuracy", trend: "up" },
    art: "campfire",
  },
];

export const timeline = [
  {
    title: "Data Analyst Intern",
    org: "IBM Skills Build",
    meta: "Internship",
    body:
      "Built a CNN-based skin cancer detection model achieving 94% accuracy on dermoscopic images. Owned data preparation, model training, and evaluation end to end.",
  },
  {
    title: "MCA",
    org: "Vivekananda Institute of Professional Studies",
    meta: "In progress · CGPA 8.6",
    body:
      "Master of Computer Applications with coursework focused on applied AI, machine learning, and software engineering.",
  },
  {
    title: "BCA",
    org: "Vivekananda Institute of Professional Studies",
    meta: "Completed",
    body:
      "Bachelor of Computer Applications with foundations in computer science, statistics, databases, and programming.",
  },
];

export const skills = [
  { category: "Programming", items: ["Python", "SQL"] },
  { category: "AI & ML", items: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Optimization"] },
  { category: "Frameworks", items: ["TensorFlow", "Keras", "NumPy", "Pandas", "Flask"] },
  { category: "AI Tools", items: ["OpenAI API", "Prompt Engineering", "Workflow Automation"] },
  { category: "Visualization", items: ["Matplotlib", "Seaborn", "Excel", "Google Sheets"] },
];

export const metrics = [
  { value: "28%", label: "lower vehicle wait time" },
  { value: "92%", label: "FakeGuard accuracy" },
  { value: "94%", label: "skin cancer model accuracy" },
  { value: "3,000+", label: "accounts in model data" },
];

export const contactLinks = {
  email: "mailto:saiabhinav190404@gmail.com",
  emailLabel: "saiabhinav190404@gmail.com",
  github: "https://github.com/SaixAbhinav",
  githubLabel: "github.com/SaixAbhinav",
};
```

- [ ] **Step 4: Verify assets and content compile surface**

Run:

```powershell
Get-ChildItem -LiteralPath "C:\Users\marsh\OneDrive\Desktop\portfolio\public\build-kit" | Select-Object Name, Length
npm run build
```

Expected: eight cropped assets plus `dark-build-kit.png` are listed, and the build still succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/content.ts public/build-kit
git commit -m "feat: add explorer journal content and artwork"
```

---

### Task 2: Global Visual System and Shared Shell

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `app/ArtPanel.tsx`
- Create: `app/PageShell.tsx`

**Interfaces:**
- Consumes: `artAssets` from `app/content.ts`.
- Produces: `ArtPanel({ asset, priority, className })` and `PageShell({ eyebrow, title, subtitle, art, children, next })`.

- [ ] **Step 1: Replace primary fonts and body styling in `app/layout.tsx`**

Use `Fraunces`, `Manrope`, and `Caveat` from `next/font/google`. Apply CSS variables on `<body>` and remove `CursorSpotlight`.

- [ ] **Step 2: Replace global CSS tokens**

In `app/globals.css`, replace emerald/orb-specific styling with CSS variables for `--ink`, `--panel`, `--line`, `--peach`, `--lavender`, `--sky`, `--mint`; add `.journal-frame`, `.star-field`, `.hand-note`, focus styles, and `prefers-reduced-motion` handling.

- [ ] **Step 3: Create `ArtPanel.tsx`**

```tsx
import Image from "next/image";
import type { ArtAsset } from "./content";

type ArtPanelProps = {
  asset: ArtAsset;
  priority?: boolean;
  className?: string;
};

export function ArtPanel({ asset, priority = false, className = "" }: ArtPanelProps) {
  return (
    <figure className={`journal-frame overflow-hidden bg-[var(--panel)] ${className}`}>
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
```

- [ ] **Step 4: Create `PageShell.tsx`**

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArtPanel } from "./ArtPanel";
import type { ArtAsset } from "./content";

type PageShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  art: ArtAsset;
  children: React.ReactNode;
  next?: { href: string; label: string };
};

export function PageShell({ eyebrow, title, subtitle, art, children, next }: PageShellProps) {
  return (
    <main className="relative mx-auto min-h-dvh w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8 lg:px-10">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-end">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-[var(--peach)]">{eyebrow}</p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] text-[var(--cream)] sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">{subtitle}</p>
        </div>
        <ArtPanel asset={art} priority className="min-h-[19rem]" />
      </section>
      <div className="mt-14">{children}</div>
      {next ? (
        <footer className="mt-16 border-t border-[color:var(--line)] pt-6">
          <Link
            href={next.href}
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--peach)] transition hover:text-[var(--cream)]"
          >
            Next: {next.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </footer>
      ) : null}
    </main>
  );
}
```

- [ ] **Step 5: Verify**

Run:

```bash
npm run build
```

Expected: Build succeeds, with no TypeScript errors for the new shared components.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/globals.css app/ArtPanel.tsx app/PageShell.tsx
git commit -m "feat: add explorer journal visual shell"
```

---

### Task 3: Route-Aware Navigation

**Files:**
- Modify: `app/Nav.tsx`

**Interfaces:**
- Consumes: `routes` from `app/content.ts`.
- Produces: a top navigation that highlights the current pathname and links across all six routes.

- [ ] **Step 1: Rewrite `Nav.tsx`**

Use `next/link`, `usePathname`, and `routes`. The active route gets `aria-current="page"`, a visible marker, and a border/background change.

- [ ] **Step 2: Verify**

Run:

```bash
npm run build
```

Expected: Build succeeds and no hash-section assumptions remain in `Nav.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/Nav.tsx
git commit -m "feat: add explorer journal navigation"
```

---

### Task 4: Journey Landing Route

**Files:**
- Replace: `app/page.tsx`

**Interfaces:**
- Consumes: `artAssets`, `metrics`, `projects`.
- Produces: `/` Journey page with build-kit hero art, manifesto copy, metrics, and links to `/discoveries` and `/contact`.

- [ ] **Step 1: Replace `app/page.tsx`**

Build the page around `PageShell`, `ArtPanel`, `Link`, and `metrics`. Copy must include the line: `The universe is larger than the map.`

- [ ] **Step 2: Verify**

Run:

```bash
npm run build
```

Expected: `/` compiles and imports no obsolete hero/typewriter components.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: redesign journey landing page"
```

---

### Task 5: Discoveries Project Route

**Files:**
- Create: `app/ProjectDiscovery.tsx`
- Create: `app/discoveries/page.tsx`

**Interfaces:**
- Consumes: `projects`, `artAssets`.
- Produces: `ProjectDiscovery({ project, index })` and `/discoveries`.

- [ ] **Step 1: Create `ProjectDiscovery.tsx`**

Use a wide journal panel layout with project number, title, subtitle, description, metric, tags, GitHub link, and an `ArtPanel` image selected by `project.art`.

- [ ] **Step 2: Create `app/discoveries/page.tsx`**

Use `PageShell` with `artAssets.projects`, map all four projects, and set `next={{ href: "/logbook", label: "Read the logbook" }}`.

- [ ] **Step 3: Verify**

Run:

```bash
npm run build
```

Expected: `/discoveries` compiles and all project GitHub links are present.

- [ ] **Step 4: Commit**

```bash
git add app/ProjectDiscovery.tsx app/discoveries/page.tsx
git commit -m "feat: add discoveries project page"
```

---

### Task 6: Logbook and Signals Routes

**Files:**
- Create: `app/JournalEntry.tsx`
- Create: `app/SignalGrid.tsx`
- Create: `app/logbook/page.tsx`
- Create: `app/signals/page.tsx`

**Interfaces:**
- Consumes: `timeline`, `skills`, `metrics`, `artAssets`.
- Produces: `/logbook` and `/signals`.

- [ ] **Step 1: Create `JournalEntry.tsx`**

Render title, org, meta, and body in a numbered timeline panel with a thin left rule.

- [ ] **Step 2: Create `SignalGrid.tsx`**

Render `skills` as grouped lists and `metrics` as warm outlined metric cells.

- [ ] **Step 3: Create `app/logbook/page.tsx`**

Use `PageShell` with `artAssets.journal`, map `timeline`, and add three short field-note panels: data preparation, model evaluation, and automation workflows.

- [ ] **Step 4: Create `app/signals/page.tsx`**

Use `PageShell` with `artAssets.signals`, `SignalGrid`, and a small telescope art panel.

- [ ] **Step 5: Verify**

Run:

```bash
npm run build
```

Expected: `/logbook` and `/signals` compile and both routes include visible build-kit art.

- [ ] **Step 6: Commit**

```bash
git add app/JournalEntry.tsx app/SignalGrid.tsx app/logbook/page.tsx app/signals/page.tsx
git commit -m "feat: add logbook and signals pages"
```

---

### Task 7: About and Contact Routes

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `artAssets`, `contactLinks`.
- Produces: `/about` and `/contact`.

- [ ] **Step 1: Create `app/about/page.tsx`**

Use `PageShell` with `artAssets.campfire`, include `public/me.jpg` through `next/image`, and preserve MCA/BCA/AI interests copy from the spec.

- [ ] **Step 2: Create `app/contact/page.tsx`**

Use `PageShell` with `artAssets.planet`, render email and GitHub links from `contactLinks`, and include a final campfire or texture art panel.

- [ ] **Step 3: Verify**

Run:

```bash
npm run build
```

Expected: `/about` and `/contact` compile, portrait uses `next/image`, and email/GitHub hrefs are correct.

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx app/contact/page.tsx
git commit -m "feat: add about and contact pages"
```

---

### Task 8: Cleanup, Build, and Visual QA

**Files:**
- Delete: `app/HeroIntro.tsx`
- Delete: `app/TypedHeading.tsx`
- Delete: `app/SpotlightCard.tsx`
- Delete: `app/Counter.tsx`
- Delete: `app/CursorSpotlight.tsx`
- Modify: `app/opengraph-image.tsx`

**Interfaces:**
- Consumes: all routes and shared components.
- Produces: production-ready site with no unused old visual system.

- [ ] **Step 1: Search for obsolete imports**

```bash
rg "HeroIntro|TypedHeading|SpotlightCard|Counter|CursorSpotlight|emerald|orb-" app
```

Expected: no matches for old component names remain after deleting the obsolete component files. No matches for `emerald` or `orb-` remain in active route, component, or global CSS files.

- [ ] **Step 2: Update generated OG image**

Modify `app/opengraph-image.tsx` to use the new Explorer Journal palette and headline language: `Sai Abhinav · Explorer of intelligent systems`.

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Start the local dev server**

```bash
npm run dev
```

Expected: Local server starts on an available port, usually `http://localhost:3000`.

- [ ] **Step 5: Inspect routes in browser**

Open and inspect:

```text
http://localhost:3000/
http://localhost:3000/discoveries
http://localhost:3000/logbook
http://localhost:3000/signals
http://localhost:3000/about
http://localhost:3000/contact
```

Expected: every route loads, nav active states work, and each route displays build-kit-derived art.

- [ ] **Step 6: Inspect mobile width**

Use browser dev tools or Playwright screenshot at 390px width.

Expected: text does not overlap, nav remains usable, and images do not force horizontal scrolling.

- [ ] **Step 7: Commit**

```bash
git add app public/build-kit
git commit -m "chore: finalize explorer journal redesign"
```

---

## Self-Review

- Spec coverage: all six routes, build-kit cropping, route-aware nav, art on every page, typography, color, accessibility, motion, and verification are covered.
- Red-flag scan: the plan contains no unfinished markers or open-ended implementation tasks.
- Type consistency: `artAssets`, `projects`, `timeline`, `skills`, `metrics`, `contactLinks`, `ArtPanel`, `PageShell`, `ProjectDiscovery`, `JournalEntry`, and `SignalGrid` names are consistent across tasks.
