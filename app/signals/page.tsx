import { ArtPanel } from "../ArtPanel";
import { PageShell } from "../PageShell";
import { SignalGrid } from "../SignalGrid";
import { artAssets, metrics, skills } from "../content";

export default function SignalsPage() {
  return (
    <PageShell
      eyebrow="03 / Signals"
      title="Technical signals for finding patterns that hold."
      subtitle="A compact map of the tools, methods, and measurable outcomes that show up across Sai's AI work."
      art={artAssets.signals}
      next={{ href: "/about", label: "Meet the explorer" }}
    >
      <SignalGrid skills={skills} metrics={metrics} />

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
        <ArtPanel asset={artAssets.telescope} className="min-h-[14rem]" />
        <div className="journal-frame bg-[rgba(12,23,34,0.72)] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--copper)]">
            Signal method
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[var(--cream)]">
            Build, measure, adjust.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
            The strongest systems start with a clear observation, a measurable
            target, and a feedback loop. That is the thread connecting traffic
            optimization, classification, workflow automation, and prompt
            engineering.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
