import Image from "next/image";
import { ArtPanel } from "../ArtPanel";
import { PageShell } from "../PageShell";
import { artAssets } from "../content";

const values = [
  "Curiosity before certainty",
  "Measurements before claims",
  "Readable systems over clever tricks",
  "Useful automation over spectacle",
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="04 / About"
      title="An explorer's journal for applied AI work."
      subtitle="Sai Abhinav is an applied AI builder with an MCA in progress, a BCA foundation, and a focus on systems that survive contact with real data."
      art={artAssets.campfire}
      next={{ href: "/contact", label: "Send a signal" }}
    >
      <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <figure className="journal-frame overflow-hidden bg-[var(--panel)]">
          <Image
            src="/me.jpg"
            alt="Portrait of Sai Abhinav."
            width={720}
            height={900}
            className="aspect-[4/5] w-full object-cover opacity-90 saturate-[0.82]"
            priority
          />
          <figcaption className="hand-note border-t border-[color:var(--line)] px-5 py-4 text-2xl text-[var(--lavender)]">
            Build. Observe. Understand.
          </figcaption>
        </figure>

        <div className="space-y-6">
          <article className="ruled-panel p-6 sm:p-8">
            <p className="text-lg leading-9 text-[var(--muted)]">
              I am currently pursuing my MCA at Vivekananda Institute of
              Professional Studies with a CGPA of 8.6, after completing my BCA
              from the same institution. My work sits close to applied AI:
              workflow automation, prompt engineering, reinforcement learning,
              and machine learning systems with measurable outcomes.
            </p>
            <p className="mt-5 text-lg leading-9 text-[var(--muted)]">
              I like building systems that make the invisible visible: traffic
              patterns, fake-account signals, model behavior, and repeated work
              that can be turned into structured automation.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value}
                className="star-field journal-frame bg-[rgba(12,23,34,0.72)] p-5 text-sm uppercase tracking-[0.16em] text-[var(--muted)]"
              >
                {value}
              </div>
            ))}
          </div>

          <ArtPanel asset={artAssets.journal} className="min-h-[14rem]" />
        </div>
      </section>
    </PageShell>
  );
}
