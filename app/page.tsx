import {
  GitBranch,
  Mail,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  BookOpen,
  Map as MapIcon,
  Telescope,
  RadioTower,
  Flame,
  Orbit,
} from "lucide-react";
import { type ReactNode } from "react";
import { Nav } from "./Nav";
import { ScrollZoomImage } from "./ScrollZoomImage";
import { HeroIntro } from "./HeroIntro";
import { SectionHeading } from "./SectionHeading";
import { AboutBio } from "./AboutBio";
import { ScrollReveal } from "./ScrollReveal";
import { StaggeredSkills } from "./StaggeredSkills";
import { SmartSignalDemo } from "./SmartSignalDemo";
import { WorkflowDemo } from "./WorkflowDemo";
import { SkinCancerDemo } from "./SkinCancerDemo";
import { SkyBackdrop } from "./SkyBackdrop";
import { HeroScene } from "./HeroScene";
import { ZoomStackSection } from "./ZoomStackSection";
import { ProjectCard, type IconName } from "./ProjectCard";
import { ProjectPrewarm } from "./ProjectPrewarm";
import {
  OpenJournal,
  CompassRose,
  PlanetRinged,
  TelescopeStand,
  MountainRange,
  Signpost,
  LanternHanging,
  CampfireScene,
  FloatingIsland,
  PineTree,
  StarScatter,
  Pagoda,
} from "./LineArt";

type Metric = { value: number; suffix?: string; label: string; trend: "up" | "down" };

const projects: Array<{
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string;
  iconName: IconName;
  metric?: Metric;
  highlights?: string[];
  screenshots?: { src: string; caption: string; width: number; height: number }[];
  embedUrl?: string;
  demo: ReactNode;
}> = [
  {
    title: "SmartSignal",
    subtitle: "AI Traffic Light Automation System",
    description:
      "AI-powered traffic signal control system using PPO reinforcement learning and SUMO simulation. Integrated TomTom API for realistic traffic data, reducing vehicle waiting time by ~28% and increasing throughput by 22%.",
    tags: ["Python", "PPO", "SUMO", "TomTom API", "Reinforcement Learning"],
    github: "https://github.com/SaixAbhinav/smart-signal",
    embedUrl: "https://smart-signal-i0v5.onrender.com",
    iconName: "TrafficCone",
    metric: { value: 28, suffix: "%", label: "wait time", trend: "down" },
    demo: <SmartSignalDemo key="smartsignal-demo" />,
  },
  {
    title: "AI Workflow Copilot",
    subtitle: "Local-first AI desktop assistant",
    description:
      "A local-first PyQt5 desktop app that turns documents and Gmail into summaries, tasks, insights, and comparisons. Powered by a local Ollama model, nothing ever leaves your machine. Auto mode triages your inbox in parallel, ranks emails by urgency, and pushes the important action items straight to Google Calendar.",
    tags: ["Python", "PyQt5", "Ollama · local LLM", "Gmail & Calendar API", "SQLite"],
    github: "https://github.com/SaixAbhinav/Workflow_copilot",
    iconName: "Workflow",
    highlights: [
      "100% local LLM via Ollama, so documents and emails never touch a third-party API",
      "Auto inbox triage: parallel-scans recent Gmail and ranks each message high / medium / low urgency",
      "One-click push of extracted action items to Google Calendar, with a review step first",
      "Four workflows: Summary, Tasks, Insights, and side-by-side Compare",
      "Multi-account Google OAuth, cancellable runs, and a searchable SQLite run history",
    ],
    screenshots: [
      {
        src: "https://raw.githubusercontent.com/SaixAbhinav/Workflow_copilot/main/docs/screenshots/main.png",
        caption: "Main window: choose a workflow and run it on a local model",
        width: 1198,
        height: 712,
      },
      {
        src: "https://raw.githubusercontent.com/SaixAbhinav/Workflow_copilot/main/docs/screenshots/task-review.png",
        caption: "Extracted tasks, ranked and ready to push to Calendar",
        width: 1199,
        height: 717,
      },
      {
        src: "https://raw.githubusercontent.com/SaixAbhinav/Workflow_copilot/main/docs/screenshots/task-review-dialog.png",
        caption: "Edit titles, deadlines & priority before anything hits your calendar",
        width: 786,
        height: 471,
      },
      {
        src: "https://raw.githubusercontent.com/SaixAbhinav/Workflow_copilot/main/docs/screenshots/history.png",
        caption: "Every run saved to a searchable local SQLite history",
        width: 508,
        height: 641,
      },
    ],
    demo: <WorkflowDemo key="workflow-demo" />,
  },
  {
    title: "Skin Cancer Detection",
    subtitle: "IBM Skills Build Internship",
    description:
      "CNN-based image classifier for early skin cancer detection, built during a data analyst internship at IBM Skills Build. Achieved 94% accuracy on dermoscopic images through transfer learning and targeted data augmentation.",
    tags: ["Python", "CNN", "TensorFlow", "Keras", "Image Classification"],
    github: "https://github.com/SaixAbhinav/skin_cancer_prediction",
    iconName: "Activity",
    metric: { value: 94, suffix: "%", label: "accuracy", trend: "up" },
    demo: <SkinCancerDemo key="skincancer-demo" />,
  },
];

// Work + education interleaved
const timeline = [
  {
    type: "education" as const,
    title: "MCA",
    org: "Vivekananda Institute of Professional Studies",
    period: "In progress · CGPA 8.6",
    description:
      "Master of Computer Applications · coursework focused on applied AI, machine learning, and software engineering.",
  },
  {
    type: "work" as const,
    title: "Data Analyst Intern",
    org: "IBM Skills Build",
    period: "Internship",
    description:
      "Built a CNN-based skin cancer detection model achieving 94% accuracy on dermoscopic images. Owned data preparation, model training, and evaluation end to end.",
  },
  {
    type: "education" as const,
    title: "BCA",
    org: "Vivekananda Institute of Professional Studies",
    period: "Completed",
    description:
      "Bachelor of Computer Applications · foundations in CS, statistics, databases, and programming.",
  },
];

const skills = [
  {
    category: "AI & ML",
    primary: true,
    items: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Optimization"],
  },
  { category: "Programming", primary: true, items: ["Python", "SQL"] },
  {
    category: "Frameworks",
    primary: false,
    items: ["TensorFlow", "Keras", "NumPy", "Pandas", "Flask"],
  },
  {
    category: "AI Tools",
    primary: false,
    items: ["OpenAI API", "Prompt Engineering", "Workflow Automation"],
  },
  {
    category: "Visualization",
    primary: false,
    items: ["Matplotlib", "Seaborn", "Excel", "Google Sheets"],
  },
];

// Decorative line-art layer helper
function Art({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute text-gold ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div id="top" className="min-h-dvh">
      <ProjectPrewarm
        urls={projects.map((project) => project.embedUrl).filter((url): url is string => Boolean(url))}
      />
      <Nav />

      {/* Hero */}
      <ZoomStackSection
        className="twk-soft"
        zoomOrigin="bottom"
        backdrop={<HeroScene />}
        contentClassName="flex min-h-dvh flex-col justify-start overflow-hidden px-6 pb-44 pt-44 sm:pb-0"
      >
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <HeroIntro />
        </div>
      </ZoomStackSection>

      {/* About Me */}
      <ZoomStackSection
        id="about"
        backdrop={<SkyBackdrop tint="lavender" topo />}
        contentClassName="flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        <Art className="right-6 top-24 opacity-25 sm:right-16"><OpenJournal className="w-36 sm:w-48" /></Art>
        <Art className="bottom-16 left-6 opacity-20 sm:left-16"><CompassRose className="float-slow w-24 sm:w-28" /></Art>
        <Art className="right-20 bottom-28 opacity-15"><PlanetRinged className="w-28" /></Art>
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <SectionHeading icon={<BookOpen size={14} />} kicker="Get to know me" prefix="About " emphasis="Me" className="mb-14" />
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Photo — framed like a journal plate with a margin note */}
            <ScrollReveal effect="slide-left" duration={900} className="lg:col-span-2">
              <div className="group relative lg:h-full">
                <div className="relative h-[26rem] w-full overflow-hidden rounded-[1.5rem] border border-gold/30 bg-ink p-2 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)] sm:h-[32rem] lg:h-full lg:min-h-[34rem]">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.1rem]">
                    <ScrollZoomImage
                      src="/me.jpg"
                      alt="Portrait of Sai Abhinav"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="h-full w-full"
                      imageClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <span className="absolute -bottom-4 -right-3 -rotate-6 rounded-2xl bg-lavender px-4 py-1.5 font-hand text-2xl text-ink shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)]">
                  that&apos;s me ✷
                </span>
              </div>
            </ScrollReveal>
            <div className="flex flex-col justify-center lg:col-span-3">
              <AboutBio />
            </div>
          </div>
        </div>
      </ZoomStackSection>

      {/* Experience */}
      <ZoomStackSection
        id="experience"
        backdrop={<SkyBackdrop tint="mint" topo />}
        contentClassName="flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        <Art className="inset-x-0 bottom-0 flex justify-center opacity-25"><MountainRange className="w-full max-w-5xl" /></Art>
        <Art className="left-8 top-24 opacity-25"><LanternHanging className="float-slow w-12" /></Art>
        <Art className="right-10 bottom-32 opacity-20"><Signpost className="w-24" /></Art>
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <SectionHeading icon={<MapIcon size={14} />} kicker="Where I've been" prefix="My " emphasis="Experience" className="mb-14" />
          <div className="space-y-6">
            {timeline.map((item, index) => {
              const Icon = item.type === "work" ? Briefcase : GraduationCap;
              return (
                <ScrollReveal key={`${item.title}-${item.org}`} effect="fade-up" delay={index * 120} threshold={0.1}>
                  <div className="group rounded-[1.25rem] border border-cream/10 bg-ink/70 p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-mint/40 hover:shadow-[0_20px_44px_-18px_rgba(0,0,0,0.6)] sm:p-7">
                    <div className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-8">
                      <div className="flex items-center gap-2.5 md:flex-col md:items-start md:gap-3">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-mint/30 bg-mint/12">
                          <Icon size={26} className="text-mint" strokeWidth={1.7} />
                        </span>
                        <p className="font-sans text-sm font-medium text-cream-soft">{item.period}</p>
                      </div>
                      <div className="max-w-2xl">
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-cream sm:text-[1.7rem]">
                          {item.title}
                        </h3>
                        <p className="mt-1 mb-3 text-sm font-semibold text-gold">{item.org}</p>
                        <p className="text-base leading-relaxed text-cream-soft">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </ZoomStackSection>

      {/* Projects */}
      <ZoomStackSection
        id="projects"
        backdrop={<SkyBackdrop tint="peach" topo />}
        contentClassName="flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        <Art className="right-8 top-20 opacity-25"><PlanetRinged className="float-slow w-36" /></Art>
        <Art className="left-6 top-40 opacity-20"><StarScatter className="w-40" /></Art>
        <Art className="bottom-10 left-10 opacity-20"><TelescopeStand className="w-24" /></Art>
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <SectionHeading icon={<Telescope size={14} />} kicker="Things I've built" prefix="Featured " emphasis="Projects" className="mb-14" />
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} effect="zoom-up" duration={800} delay={index * 100} threshold={0.1}>
                <ProjectCard
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  tags={project.tags}
                  github={project.github}
                  iconName={project.iconName}
                  kicker={`Project 0${index + 1}`}
                  metric={project.metric}
                  highlights={project.highlights}
                  screenshots={project.screenshots}
                  embedUrl={project.embedUrl}
                  demo={project.demo}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ZoomStackSection>

      {/* Skills */}
      <ZoomStackSection
        id="skills"
        backdrop={<SkyBackdrop tint="wildflower" topo />}
        contentClassName="flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        <Art className="right-10 top-24 opacity-20"><Orbit size={56} strokeWidth={1.2} className="float-slow" /></Art>
        <Art className="left-8 bottom-24 opacity-20"><Pagoda className="w-24" /></Art>
        <Art className="right-16 bottom-16 opacity-25"><PineTree className="w-12" /></Art>
        <Art className="left-1/3 top-16 opacity-20"><StarScatter className="w-48" /></Art>
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <SectionHeading icon={<RadioTower size={14} />} kicker="My toolkit" prefix="My " emphasis="Skills" className="mb-6" />
          <p className="mb-12 max-w-xl text-lg leading-relaxed text-cream-soft">
            What I work with day to day: languages, frameworks, and tools.
          </p>
          <StaggeredSkills
            skills={skills}
            delay={0}
            stagger={60}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </ZoomStackSection>

      {/* Contact */}
      <ZoomStackSection
        id="contact"
        backdrop={<SkyBackdrop tint="dawn" position="bottom" topo />}
        contentClassName="flex min-h-dvh flex-col overflow-hidden px-6 pt-28"
      >
        <Art className="bottom-24 right-10 opacity-30 sm:right-24"><CampfireScene className="fire-glow-wrap w-32" /></Art>
        <Art className="bottom-16 left-6 opacity-20"><FloatingIsland className="island-bob w-40" /></Art>
        <Art className="bottom-10 right-1/3 opacity-20"><PineTree className="w-10" /></Art>
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 items-center">
          <ScrollReveal effect="fade-up" className="w-full" threshold={0.1}>
            <div className="w-full">
              <SectionHeading icon={<Flame size={14} />} kicker="Say hello" prefix="Get in " emphasis="Touch" className="mb-6" />
              {/* Note-to-self sticky */}
              <div className="mb-8 inline-block -rotate-2 rounded-2xl bg-peach px-5 py-3 font-hand text-2xl text-ink shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)]">
                Let&apos;s build something worth remembering.
              </div>
              <p className="mb-12 max-w-xl text-lg leading-relaxed text-cream-soft sm:text-xl">
                I&apos;m open to collaborations, research opportunities, and
                interesting AI projects. Feel free to reach out.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:saiabhinav190404@gmail.com"
                  className="group flex items-center gap-2 rounded-full bg-dawn px-7 py-4 text-base font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(255,214,231,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                >
                  <Mail size={18} />
                  saiabhinav190404@gmail.com
                </a>
                <a
                  href="https://github.com/SaixAbhinav"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="flex items-center gap-2 rounded-full border border-cream/25 px-7 py-4 text-base font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-dawn/60"
                >
                  <GitBranch size={18} />
                  github.com/SaixAbhinav
                  <ArrowUpRight size={15} className="text-cream-soft" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
        <footer className="relative z-10 mt-12 border-t border-cream/10 py-8 text-center text-sm text-cream-soft">
          <p>
            Built with Next.js &amp; Tailwind CSS · Sai Abhinav © {new Date().getFullYear()}
          </p>
        </footer>
      </ZoomStackSection>
    </div>
  );
}
