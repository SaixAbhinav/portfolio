import { PageShell } from "../PageShell";
import { ProjectDiscovery } from "../ProjectDiscovery";
import { artAssets, projects } from "../content";

export default function DiscoveriesPage() {
  return (
    <PageShell
      eyebrow="01 / Discoveries"
      title="Projects as field notes from the edge of useful AI."
      subtitle="A set of applied experiments across traffic optimization, model evaluation, detection systems, and AI-assisted workflows."
      art={artAssets.projects}
      next={{ href: "/logbook", label: "Read the logbook" }}
    >
      <section className="space-y-6">
        {projects.map((project, index) => (
          <ProjectDiscovery
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </section>
    </PageShell>
  );
}
