import {
  GitBranch,
  Mail,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { type ReactNode } from "react";
import Image from "next/image";
import { Nav } from "./Nav";
import { HeroIntro } from "./HeroIntro";
import { TypedHeading } from "./TypedHeading";
import { TypedAboutBio } from "./TypedAboutBio";
import { TYPED_ABOUT_BIO_DURATION } from "./aboutConstants";
import { ScrollReveal } from "./ScrollReveal";
import { StaggeredSkills } from "./StaggeredSkills";
import { SmartSignalDemo } from "./SmartSignalDemo";
import { FakeGuardDemo } from "./FakeGuardDemo";
import { WorkflowDemo } from "./WorkflowDemo";
import { SkinCancerDemo } from "./SkinCancerDemo";
import { ProjectCard, type IconName } from "./ProjectCard";

// About-section animation choreography. Computed from constants so changing one
// (e.g. heading text, typing speed) automatically recomputes everything downstream.
const ABOUT_HEADING_TEXT = "About Me";
const ABOUT_HEADING_SPEED = 120; // ms/char — matches TypedHeading default
const ABOUT_HEADING_DURATION =
  ABOUT_HEADING_TEXT.length * ABOUT_HEADING_SPEED + 100; // small buffer

const PHOTO_SLIDE_DURATION = 1600;
const PHOTO_DELAY = ABOUT_HEADING_DURATION;
const BIO_DELAY = PHOTO_DELAY + PHOTO_SLIDE_DURATION;
const SKILLS_DELAY = BIO_DELAY + TYPED_ABOUT_BIO_DURATION;

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

// Unified timeline — mixing work + education avoids the 1-vs-2 card imbalance
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

      {/* Hero — centered intro */}
      <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-6">
        <div className="relative mx-auto w-full max-w-5xl">
          <HeroIntro />
        </div>
      </section>

      {/* About */}
      <section id="about" className="flex min-h-dvh flex-col items-center justify-center px-6 py-24">
        <div className="relative mx-auto w-full max-w-5xl">
          <TypedHeading prefix="About " emphasis="Me" className="mb-16" />
          {/* Two-column layout: tall photo on the left fills the column; bio + skills stacked on the right. */}
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Photo — left, spans 2 of 5 cols. Stretches to match right-column height on lg.
                Waits for the "About Me" heading to finish typing before sliding in. */}
            <ScrollReveal effect="slide-left" duration={PHOTO_SLIDE_DURATION} delay={PHOTO_DELAY} className="lg:col-span-2">
              <div className="group relative h-[26rem] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/30 sm:h-[32rem] lg:h-full lg:min-h-[36rem]">
                <Image
                  src="/me.jpg"
                  alt="Portrait of Sai Abhinav"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950/80 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
                />
              </div>
            </ScrollReveal>
            {/* Right column: bio on top, skills below */}
            <div className="flex flex-col gap-8 lg:col-span-3">
              {/* Bio — typewriter, paragraphs reveal sequentially. Waits for heading + photo slide to finish. */}
              <TypedAboutBio delay={BIO_DELAY} />
              {/* Skills — each chip fades in individually, starting after the bio finishes typing. */}
              <StaggeredSkills
                skills={skills}
                delay={SKILLS_DELAY}
                stagger={70}
                className="grid gap-5 sm:grid-cols-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="flex min-h-dvh flex-col items-center justify-center px-6 py-24">
        <div className="relative mx-auto w-full max-w-5xl">
          <TypedHeading prefix="Experience & " emphasis="Education" className="mb-16" />
          {/* Timeline — de-carded editorial rows: mono period rail left, content right.
              Work + education interleaved, icon distinguishes type. */}
          <div className="space-y-14">
            {timeline.map((item, index) => {
              const Icon = item.type === "work" ? Briefcase : GraduationCap;
              return (
                <ScrollReveal key={`${item.title}-${item.org}`} effect="fade-up" delay={index * 180} threshold={0.1}>
                  <div className="grid gap-3 md:grid-cols-[11rem_1fr] md:gap-10">
                    {/* Period rail */}
                    <p className="pt-1 font-mono text-sm tracking-wide text-zinc-500">
                      {item.period}
                    </p>
                    {/* Entry */}
                    <div className="max-w-2xl">
                      <div className="mb-2 flex items-center gap-3">
                        <Icon
                          size={18}
                          className={item.type === "work" ? "text-emerald-400" : "text-zinc-500"}
                        />
                        <h3 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mb-3 text-sm font-medium text-emerald-400/80">{item.org}</p>
                      <p className="text-base leading-relaxed text-zinc-400">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="flex min-h-dvh flex-col items-center justify-center px-6 py-24">
        <div className="relative mx-auto w-full max-w-5xl">
          <TypedHeading prefix="Featured " emphasis="Projects" className="mb-16" />
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

      {/* Contact + Footer */}
      <section id="contact" className="flex min-h-dvh flex-col px-6 pt-24">
        <div className="relative mx-auto flex w-full max-w-5xl flex-1 items-center">
          <ScrollReveal effect="fade-up" className="w-full" threshold={0.1}>
            <div className="w-full">
              <TypedHeading prefix="Let’s " emphasis="Connect" className="mb-8" />
              <p className="mb-12 max-w-xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
                I&apos;m open to collaborations, research opportunities, and
                interesting AI projects. Feel free to reach out.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:saiabhinav190404@gmail.com"
                  className="flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
                >
                  <Mail size={18} />
                  saiabhinav190404@gmail.com
                </a>
                <a
                  href="https://github.com/SaixAbhinav"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="flex items-center gap-2 rounded-full border border-zinc-700 px-8 py-4 text-base font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
                >
                  <GitBranch size={18} />
                  github.com/SaixAbhinav
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
        <footer className="-mx-6 mt-12 border-t border-zinc-800/50 px-6 py-8 text-center text-sm text-zinc-600">
          <p>Built with Next.js & Tailwind CSS · Sai Abhinav © {new Date().getFullYear()}</p>
        </footer>
      </section>
    </div>
  );
}
