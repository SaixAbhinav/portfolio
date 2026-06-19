# Explorer Journal portfolio redesign

## Goal

Redesign the portfolio from a single-page dark AI portfolio into a multi-page "Explorer Journal" site inspired by the supplied `dark-build-kit.png`. The site should feel like a cosmic field notebook for an applied AI builder: curious, warm, exploratory, and technical without becoming generic neon SaaS.

## Source direction

Use the build-kit as the primary design reference:

- Brand mood: curiosity, exploration, creativity, integrity, impact.
- Palette: dark navy/off-black base, warm peach line art, soft lavender notes, pale blue secondary accents, mint details used sparingly.
- Typography: editorial serif display headings paired with a readable sans-serif body and occasional handwritten-style annotation.
- Visual style: hand-drawn line art, star fields, telescopes, maps, planets, campfires, lanterns, journals, mountains, paths, and signal motifs.
- UI style: thin borders, small labels, structured panels, restrained motion, and warm hover states.

The implementation should copy the build-kit image into the project and crop/export multiple static art assets from it for page-specific use. Each route must include at least one visible art asset or line-art composition.

## Information architecture

Convert the portfolio to a multi-page App Router site with these routes:

- `/` as `Journey`: overview, manifesto, primary identity, key calls to action.
- `/discoveries`: featured projects and project outcomes.
- `/logbook`: experience, education, learning notes, and project process.
- `/signals`: skills, tools, measurable metrics, and technical strengths.
- `/about`: personal background and working style.
- `/contact`: email, GitHub, collaboration invitation.

The navigation should use the build-kit labels: `Journey`, `Discoveries`, `Logbook`, `Signals`, `About`, `Contact`. The active route should be visually clear. Pages should never feel like dead ends; each page should include contextual next-step links.

## Page designs

### Journey

The landing page introduces Sai Abhinav as an explorer-builder of intelligent systems. It should use a large serif name lockup, a handwritten-style line such as "The universe is larger than the map.", and a wide hero illustration based on the campfire/mountain/telescope art from the kit. It should provide clear paths to projects and contact.

### Discoveries

This page presents projects as discoveries rather than generic cards. SmartSignal, FakeGuard, AI Workflow Assistant, and Skin Cancer Detection remain the core projects. Each item should pair project copy with a small line-art motif or cropped panel. Metrics should stay visible but adopt the build-kit style instead of emerald badges.

### Logbook

This page presents experience and education as a journal timeline. IBM Skills Build, MCA, and BCA entries should remain intact. The page should use notebook, map, and handwritten annotation art. It can include short "field notes" describing how Sai approaches data, model building, and evaluation.

### Signals

This page groups skills into useful signal categories: programming, AI and ML, frameworks, AI tools, and visualization. It should include technical metrics from the current site and use telescope, signal, constellation, or star-map art. Skills should be scannable and not buried in long prose.

### About

This page should be warmer and more personal, using the explorer archetype from the build-kit. Keep the current durable facts: MCA in progress at Vivekananda Institute of Professional Studies with CGPA 8.6, BCA background, interest in workflow automation, prompt engineering, and reinforcement learning. Use the existing `public/me.jpg` portrait as a secondary element inside a thin illustrated frame so the page remains personal without losing the line-art direction.

### Contact

This page should feel like a final note in the journal, not a generic CTA block. Include email and GitHub links, with campfire, planet, or lantern art. It should be simple, accessible, and direct.

## Component and asset plan

Keep the existing Next.js App Router and Tailwind CSS v4 stack. Work inside the current conventions: colocated components under `app/`, TypeScript, and Tailwind utilities with custom CSS only in `globals.css` when shared styling is needed.

Expected components:

- `Nav`: route-aware top navigation with build-kit labels and active state.
- `ArtPanel`: reusable component for cropped build-kit art images.
- `PageShell`: consistent page frame with optional page number, label, title, subtitle, and art.
- `ProjectDiscovery`: project presentation row/card for `/discoveries`.
- `JournalEntry`: timeline entry for `/logbook`.
- `SignalGrid`: skill and metric layout for `/signals`.
- Shared contextual page links so each route points to a logical next route.

Expected assets:

- `public/build-kit/dark-build-kit.png`: source reference image.
- Cropped assets for hero, campfire/logo, telescope, planet, journal/map, signal/icons, project panels, and texture/pattern details.

Use `next/image` for all cropped bitmap art and the portrait. All meaningful images require descriptive alt text. Decorative repeated pattern images should be hidden from assistive technology.

## Visual system

Replace the current emerald/orb/typewriter direction with:

- Dark navy background close to the kit's off-black.
- Warm peach and copper lines for primary accents.
- Lavender and pale blue for secondary highlights.
- Thin ruled borders, star dividers, and subtle paper/grain texture.
- Serif display headings using an available Google font through `next/font/google`; pair it with a clean sans-serif body. Avoid Inter as the primary body font.
- Smaller handwritten annotations using a cursive Google font loaded through `next/font/google`.

Avoid large gradient orbs, emerald glows, generic three-column card rows, and marketing hero patterns. Motion should feel like a journal page or star map: gentle drift, draw-on line accents, hover lift, and subtle reveal.

## Content rules

Keep all current factual content unless the user provides replacements:

- Sai Abhinav identity and applied AI positioning.
- Project names, descriptions, GitHub URLs, tags, and metrics.
- IBM Skills Build internship.
- MCA and BCA education details.
- Email: `saiabhinav190404@gmail.com`.
- GitHub: `https://github.com/SaixAbhinav`.

Rewrite section headings and microcopy to match the Explorer Journal language, but keep the site clear for recruiters. Decorative language should support scanability, not obscure the work.

## Accessibility and responsiveness

- All pages must be keyboard navigable.
- Active navigation must not rely on color alone.
- Focus states must be visible against the dark background.
- Text must not overlap or overflow on mobile.
- Images must have useful alt text or be explicitly decorative.
- Motion must respect `prefers-reduced-motion`.
- The site must work on mobile, tablet, and desktop.

## Verification

After implementation, run:

- `npm run build`
- A local dev server check.
- Browser screenshots or visual inspection for desktop and mobile widths.

Verify that:

- All six routes load.
- Every route has visible line-art or build-kit-derived art.
- Navigation active states work.
- External links open correctly.
- The design no longer reads as the old emerald typewriter single-page site.
