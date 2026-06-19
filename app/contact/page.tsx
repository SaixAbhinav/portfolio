import { ArrowUpRight, GitBranch, Mail } from "lucide-react";
import { ArtPanel } from "../ArtPanel";
import { PageShell } from "../PageShell";
import { artAssets, contactLinks } from "../content";

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="05 / Contact"
      title="Send a signal when the next map needs building."
      subtitle="Open to collaborations, research opportunities, applied AI projects, and thoughtful systems work."
      art={artAssets.planet}
    >
      <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-stretch">
        <div className="ruled-panel p-6 sm:p-8">
          <p className="hand-note text-4xl leading-tight text-[var(--lavender)]">
            Small steps. New signals. Different worlds. Same curiosity.
          </p>
          <div className="mt-8 grid gap-4">
            <a
              href={contactLinks.email}
              className="journal-frame flex flex-col gap-3 bg-[rgba(12,23,34,0.72)] p-5 text-[var(--muted)] transition hover:border-[color:var(--line-strong)] hover:text-[var(--cream)] sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="inline-flex items-center gap-3">
                <Mail size={18} className="text-[var(--peach)]" />
                {contactLinks.emailLabel}
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="journal-frame flex flex-col gap-3 bg-[rgba(12,23,34,0.72)] p-5 text-[var(--muted)] transition hover:border-[color:var(--line-strong)] hover:text-[var(--cream)] sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="inline-flex items-center gap-3">
                <GitBranch size={18} className="text-[var(--peach)]" />
                {contactLinks.githubLabel}
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid gap-5">
          <ArtPanel asset={artAssets.campfire} className="min-h-[14rem]" />
          <ArtPanel asset={artAssets.texture} className="min-h-[12rem]" />
        </div>
      </section>
    </PageShell>
  );
}
