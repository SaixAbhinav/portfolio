import { ArtPanel } from "../ArtPanel";
import { JournalEntry } from "../JournalEntry";
import { PageShell } from "../PageShell";
import { artAssets, timeline } from "../content";

const fieldNotes = [
  {
    title: "Data preparation",
    body: "Clean inputs, inspect imbalance, and keep the path from raw data to model output easy to audit.",
  },
  {
    title: "Model evaluation",
    body: "Use accuracy alongside precision, recall, false positives, and real-world cost when judging a model.",
  },
  {
    title: "Automation workflows",
    body: "Turn repeated manual steps into structured prompts, scripts, or small tools that can be reused.",
  },
];

export default function LogbookPage() {
  return (
    <PageShell
      eyebrow="02 / Logbook"
      title="Notes from the build, the classroom, and the experiment."
      subtitle="A concise record of experience, education, and the working habits behind the projects."
      art={artAssets.journal}
      next={{ href: "/signals", label: "Read the signals" }}
    >
      <section className="grid gap-10 lg:grid-cols-[1fr_0.82fr]">
        <div className="space-y-6">
          {timeline.map((entry, index) => (
            <JournalEntry
              key={`${entry.title}-${entry.org}`}
              index={index}
              title={entry.title}
              org={entry.org}
              meta={entry.meta}
              body={entry.body}
            />
          ))}
        </div>

        <div className="space-y-5">
          <ArtPanel asset={artAssets.texture} className="min-h-[14rem]" />
          <div className="grid gap-4">
            {fieldNotes.map((note) => (
              <article
                key={note.title}
                className="ruled-panel p-5 text-[var(--muted)]"
              >
                <h2 className="font-serif text-2xl text-[var(--cream)]">
                  {note.title}
                </h2>
                <p className="mt-3 text-sm leading-7">{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
