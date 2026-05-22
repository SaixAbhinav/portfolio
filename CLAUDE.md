# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react. Single-page personal portfolio rendered from `app/page.tsx` (server component) with client components for animation.

**What is NOT in this project — do not suggest adding any of these:**

- No `framer-motion` (all animation is CSS keyframes + JS IntersectionObserver)
- No `shadcn/ui`, no `components/ui/` folder, no `lib/utils.ts`, no `cn()` helper
- No test framework, no linting beyond `next build`'s type-check
- No `lib/` directory at all — everything lives in `app/`

## Commands

```bash
npm run dev      # Next dev server on :3000 (Turbopack)
npm run build    # Production build + type-check
npm run start    # Run the production build
```

There is no test command — no test infrastructure exists.

## Component placement

All components live directly in `app/`, named in PascalCase (`HeroIntro.tsx`, `ScrollReveal.tsx`, `StaggeredSkills.tsx`, etc.). Do not introduce `components/`, `components/ui/`, or `lib/` directories for one-off components — match the existing flat structure.

## Animation conventions

Three patterns are used. Pick the right one for the use case:

1. **CSS keyframes in `app/globals.css`** for continuous decorative animation: orb-drift, the `typing` width-grow, `blink-bar`, `stagger-in`. New continuous animations belong here.
2. **JS IntersectionObserver inside a client component** for scroll-triggered reveals. Examples: `ScrollReveal.tsx` (generic), `TypedHeading.tsx`, `TypedAboutBio.tsx`, `StaggeredSkills.tsx`, `Counter.tsx`. This pattern was deliberately chosen over CSS `animation-timeline: view()` because of patchy browser support — do not switch back without checking caniuse for the target browsers.
3. **Per-element inline `transition-delay`** for staggered reveals where the count or order is dynamic (see `StaggeredSkills.tsx`). Delays are computed in advance, never mutated mid-render.

## Critical: server/client constants split

`app/page.tsx` is a server component. Any value imported into it from a `"use client"` file gets serialized — for non-component exports this produces an **error-throwing stub at runtime**, silently breaking math (`number + stub = "<number><error fn>"`).

The fix: shared constants live in plain `.ts` modules with **no** `"use client"` directive. See `app/aboutConstants.ts` — it exports `ABOUT_PARAGRAPHS`, `TYPING_SPEED`, `PARAGRAPH_GAP`, and the computed `TYPED_ABOUT_BIO_DURATION`, consumed by both `app/page.tsx` (server) and `app/TypedAboutBio.tsx` (client).

When you add a constant that needs to cross the boundary, put it in a `.ts` module, not the client component.

## Animation sequencing in the About section

The About section plays a strict sequence: heading types → photo slides in → bio paragraphs type → skill chips fade in one-by-one. The delays in `app/page.tsx` (`PHOTO_DELAY`, `BIO_DELAY`, `SKILLS_DELAY`) are **derived** from `aboutConstants.TYPED_ABOUT_BIO_DURATION` and the heading length. **Do not hand-tune these numbers** — changing `TYPING_SPEED` in `aboutConstants.ts` must automatically resync everything downstream.

## Reduced-motion override

`globals.css` has a `@media (prefers-reduced-motion: reduce)` block that disables `.orb-1/2/3`, `.stagger > *`, `.scroll-slide-left`, `.scroll-fade-in`. The override is class-scoped — it does **not** cascade to elements without those classes. Confirm with the actual selector before assuming an animation will be killed by reduced motion.

Components do **not** need their own JS-level reduced-motion bypass for typewriter / scroll animations. `TypedHeading` originally had `if (reduced) setPhase('done')` which silently hid the heading on Windows machines (where reduced motion is commonly on by default). That bypass was removed deliberately — keep it out.

## Visual conventions

- Each section: `min-h-dvh flex flex-col items-center justify-center px-6 py-{16|24}`, contains a `<TypedHeading>` with a numbered marker (`/ 01`, `/ 02`, `/ 03`, `/ 04`) and content inside a `max-w-5xl` wrapper.
- Each section has its own orb backdrop (`.orb-1/2/3` classes) layered absolutely at `inset-0`.
- Skill categories carry a `primary?: boolean` flag in the data. `StaggeredSkills` reads this and renders primary chips with emerald-tinted styling, others with muted zinc. Hierarchy is data-driven, not duplicated in JSX.
- The hero portrait (`app/page.tsx`, About section) uses `next/image` with `fill` + `sizes` — match that pattern for any new photographic image. Decorative inline SVGs (icons) use `lucide-react`.

## Context limit — stop before overflow

When the conversation context is approaching its limit (roughly 95% full), **stop all implementation work** before starting any new task or file edit. At that point:

1. List every file that has been modified or created in the current session but not yet committed.
2. Tell the user: "Context is nearly full — please commit and push the changes above before continuing, then start a new conversation."
3. Do not attempt further edits, refactors, or new features until the user confirms they have saved their work.

The goal is to ensure no in-progress changes are lost when the context window resets.

## Memory

User-level preferences for this project live at `C:\Users\marsh\.claude\projects\C--Users-marsh-OneDrive-Desktop-portfolio\memory\MEMORY.md` (and feedback files alongside it). Read those before making style/process decisions — they cover the accent color rule, autonomy preference, ship-then-redirect workflow, and plugin defaults.
