import {
  GitBranch,
  Mail,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { type ReactNode } from "react";
import Image from "next/image";
import { Nav } from "./Nav";
import { HeroIntro } from "./HeroIntro";
import { SectionHeading } from "./SectionHeading";
import { AboutBio } from "./AboutBio";
import { ScrollReveal } from "./ScrollReveal";
import { StaggeredSkills } from "./StaggeredSkills";
import { SmartSignalDemo } from "./SmartSignalDemo";
import { FakeGuardDemo } from "./FakeGuardDemo";
import { WorkflowDemo } from "./WorkflowDemo";
import { SkinCancerDemo } from "./SkinCancerDemo";
import { SkyBackdrop } from "./SkyBackdrop";
import { ProjectCard, type IconName } from "./ProjectCard";

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
    title: "FakeGuard",
    subtitle: "Instagram Fake Profile Detection",
    description:
      "Predictive system trained on 3,000+ accounts using an ensemble model combining ML and CNN-based image classification. Achieved 92% accuracy, 90% precision, and 88% recall with a 15% reduction in false positives.",
    tags: ["Python", "CNN", "Scikit-learn", "TensorFlow", "Keras"],
    github: "https://github.com/SaixAbhinav/Instagram_fake_account_detector",
    iconName: "ShieldCheck",
    metric: { value: 92, suffix: "%", label: "accuracy", trend: "up" },
    demo: <FakeGuardDemo key="fakeguard-demo" />,
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

// Unified logbook — work + education interleaved as field-log entries
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

export default function Home() {
  return (
    <div id="top" className="min-h-dvh">
      <Nav />

      {/* Hero — the journey begins */}
      <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-6 pt-28">
        <SkyBackdrop tint="dawn" position="top" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <HeroIntro />
        </div>
      </section>

      {/* About — the explorer */}
      <section
        id="about"
        className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        <SkyBackdrop tint="wildflower" position="center" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <SectionHeading kicker="The Explorer" prefix="About " emphasis="me" className="mb-14" />
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Photo — framed like a journal polaroid with a margin note */}
            <ScrollReveal effect="slide-left" duration={900} className="lg:col-span-2">
              <div className="group relative">
                <div className="relative h-[26rem] w-full overflow-hidden rounded-[1.5rem] border border-ink/10 bg-paper p-2 shadow-[0_18px_40px_-16px_rgba(47,49,66,0.28)] sm:h-[32rem] lg:h-full lg:min-h-[34rem]">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.1rem]">
                    <Image
                      src="/me.jpg"
                      alt="Portrait of Sai Abhinav"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                {/* Hand-written margin note */}
                <span className="absolute -bottom-4 -right-3 -rotate-6 rounded-2xl bg-lavender px-4 py-1.5 font-hand text-2xl text-ink shadow-[0_6px_16px_-8px_rgba(47,49,66,0.4)]">
                  somewhere on the map ✷
                </span>
              </div>
            </ScrollReveal>
            {/* Bio */}
            <div className="flex flex-col justify-center lg:col-span-3">
              <AboutBio />
            </div>
          </div>
        </div>
      </section>

      {/* Logbook — experience & education */}
      <section
        id="logbook"
        className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        <SkyBackdrop tint="mint" position="center" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <SectionHeading kicker="Field Log" prefix="The " emphasis="Logbook" className="mb-14" />
          <div className="space-y-6">
            {timeline.map((item, index) => {
              const Icon = item.type === "work" ? Briefcase : GraduationCap;
              return (
                <ScrollReveal key={`${item.title}-${item.org}`} effect="fade-up" delay={index * 120} threshold={0.1}>
                  <div className="group rounded-[1.25rem] border border-ink/10 bg-paper/80 p-6 shadow-[0_2px_12px_-4px_rgba(47,49,66,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(47,49,66,0.22)] sm:p-7">
                    <div className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-8">
                      {/* Period rail */}
                      <div className="flex items-center gap-2.5 md:flex-col md:items-start md:gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mint">
                          <Icon size={18} className="text-ink" strokeWidth={1.75} />
                        </span>
                        <p className="font-sans text-sm font-medium text-ink-soft">{item.period}</p>
                      </div>
                      {/* Entry */}
                      <div className="max-w-2xl">
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.7rem]">
                          {item.title}
                        </h3>
                        <p className="mt-1 mb-3 text-sm font-semibold text-ember">{item.org}</p>
                        <p className="text-base leading-relaxed text-ink-soft">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Discoveries — projects */}
      <section
        id="discoveries"
        className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        <SkyBackdrop tint="peach" position="center" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <SectionHeading kicker="The Field" prefix="Recent " emphasis="Discoveries" className="mb-14" />
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
                  kicker={`Discovery 0${index + 1}`}
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
      </section>

      {/* Signals — skills */}
      <section
        id="signals"
        className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        <SkyBackdrop tint="lavender" position="center" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <SectionHeading kicker="Tuned In" prefix="My " emphasis="Signals" className="mb-6" />
          <p className="mb-12 max-w-xl text-lg leading-relaxed text-ink-soft">
            The tools and methods I reach for on an expedition — the instruments I&apos;ve
            learned to read along the way.
          </p>
          <StaggeredSkills
            skills={skills}
            delay={0}
            stagger={60}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </section>

      {/* Contact + Footer */}
      <section
        id="contact"
        className="relative flex min-h-dvh flex-col overflow-hidden px-6 pt-28"
      >
        <SkyBackdrop tint="dawn" position="bottom" />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 items-center">
          <ScrollReveal effect="fade-up" className="w-full" threshold={0.1}>
            <div className="w-full">
              <SectionHeading kicker="Say Hello" prefix="Send a " emphasis="Signal" className="mb-6" />
              <p className="mb-3 font-hand text-3xl text-ember">Let&apos;s map something new together.</p>
              <p className="mb-12 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                I&apos;m open to collaborations, research opportunities, and
                interesting AI projects. Feel free to reach out — I usually reply within a day.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:saiabhinav190404@gmail.com"
                  className="group flex items-center gap-2 rounded-full bg-amber-flame px-7 py-4 text-base font-semibold text-ink shadow-[0_8px_24px_-8px_rgba(255,179,71,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                >
                  <Mail size={18} />
                  saiabhinav190404@gmail.com
                </a>
                <a
                  href="https://github.com/SaixAbhinav"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-7 py-4 text-base font-semibold text-ink shadow-[0_2px_12px_-4px_rgba(47,49,66,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-flame/50"
                >
                  <GitBranch size={18} />
                  github.com/SaixAbhinav
                  <ArrowUpRight size={15} className="text-ink-soft" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
        <footer className="relative z-10 mt-12 border-t border-ink/10 py-8 text-center text-sm text-ink-soft">
          <p>
            Kept as a living journal · Built with Next.js &amp; Tailwind CSS · Sai Abhinav ©{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </section>
    </div>
  );
}
