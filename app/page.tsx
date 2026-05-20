import {
  GitBranch,
  Mail,
  ArrowUpRight,
  ChevronDown,
  Briefcase,
  GraduationCap,
  TrendingDown,
  TrendingUp,
  TrafficCone,
  ShieldCheck,
  Workflow,
  Activity,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Nav } from "./Nav";
import { HeroIntro } from "./HeroIntro";
import { SpotlightCard } from "./SpotlightCard";
import { Counter } from "./Counter";
import { TypedHeading } from "./TypedHeading";
import { TypedAboutBio, TYPED_ABOUT_BIO_DURATION } from "./TypedAboutBio";
import { ScrollReveal } from "./ScrollReveal";
import { StaggeredSkills } from "./StaggeredSkills";

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
  icon: LucideIcon;
  metric?: Metric;
}> = [
  {
    title: "SmartSignal",
    subtitle: "AI Traffic Light Automation System",
    description:
      "AI-powered traffic signal control system using PPO reinforcement learning and SUMO simulation. Integrated TomTom API for realistic traffic data, reducing vehicle waiting time by ~28% and increasing throughput by 22%.",
    tags: ["Python", "PPO", "SUMO", "TomTom API", "Reinforcement Learning"],
    github: "https://github.com/SaixAbhinav/SmartSignal",
    icon: TrafficCone,
    metric: { value: 28, suffix: "%", label: "wait time", trend: "down" },
  },
  {
    title: "FakeGuard",
    subtitle: "Instagram Fake Profile Detection",
    description:
      "Predictive system trained on 3,000+ accounts using an ensemble model combining ML and CNN-based image classification. Achieved 92% accuracy, 90% precision, and 88% recall with a 15% reduction in false positives.",
    tags: ["Python", "CNN", "Scikit-learn", "TensorFlow", "Keras"],
    github: "https://github.com/SaixAbhinav/FakeGuard",
    icon: ShieldCheck,
    metric: { value: 92, suffix: "%", label: "accuracy", trend: "up" },
  },
  {
    title: "AI Workflow Assistant",
    subtitle: "Intelligent Automation Tool",
    description:
      "AI-powered tool that automates summarization, insight extraction, and task generation from unstructured data. Built with prompt engineering workflows using the OpenAI API for structured, reliable outputs.",
    tags: ["Python", "OpenAI API", "Prompt Engineering", "Flask"],
    github: "https://github.com/SaixAbhinav/ai-workflow-assistant",
    icon: Workflow,
  },
  {
    title: "Skin Cancer Detection",
    subtitle: "IBM Skills Build Internship",
    description:
      "CNN-based image classifier for early skin cancer detection, built during a data analyst internship at IBM Skills Build. Achieved 94% accuracy on dermoscopic images through transfer learning and targeted data augmentation.",
    tags: ["Python", "CNN", "TensorFlow", "Keras", "Image Classification"],
    github: "https://github.com/SaixAbhinav/skin-cancer-detection",
    icon: Activity,
    metric: { value: 94, suffix: "%", label: "accuracy", trend: "up" },
  },
];

const experience = [
  {
    role: "Data Analyst Intern",
    org: "IBM Skills Build",
    period: "Internship",
    description:
      "Built a CNN-based skin cancer detection model achieving 94% accuracy on dermoscopic images. Owned data preparation, model training, and evaluation end to end.",
  },
];

const education = [
  {
    degree: "MCA",
    org: "Vivekananda Institute of Professional Studies",
    period: "In progress · CGPA 8.6",
    description:
      "Master of Computer Applications · coursework focused on applied AI, machine learning, and software engineering.",
  },
  {
    degree: "BCA",
    org: "Vivekananda Institute of Professional Studies",
    period: "Completed",
    description:
      "Bachelor of Computer Applications · foundations in CS, statistics, databases, and programming.",
  },
];

const skills = [
  {
    category: "AI & ML",
    items: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Optimization"],
  },
  { category: "Programming", items: ["Python", "SQL"] },
  {
    category: "Frameworks",
    items: ["TensorFlow", "Keras", "NumPy", "Pandas", "Flask"],
  },
  {
    category: "AI Tools",
    items: ["OpenAI API", "Prompt Engineering", "Workflow Automation"],
  },
  {
    category: "Visualization",
    items: ["Matplotlib", "Seaborn", "Excel", "Google Sheets"],
  },
];

export default function Home() {
  return (
    <div id="top" className="min-h-dvh">
      <Nav />

      {/* Hero */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="orb-1 absolute left-1/2 top-1/2 h-[36rem] w-[36rem] rounded-full bg-emerald-500/[0.10] blur-3xl" />
          <div className="orb-2 absolute right-[8%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-zinc-100/[0.04] blur-3xl" />
          <div className="orb-3 absolute left-[6%] bottom-[12%] h-[18rem] w-[18rem] rounded-full bg-zinc-100/[0.04] blur-3xl" />
        </div>
        <HeroIntro />
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="absolute bottom-10 animate-bounce text-zinc-600 hover:text-zinc-400 motion-reduce:animate-none"
        >
          <ChevronDown size={24} />
        </a>
      </section>

      {/* About */}
      <section id="about" className="flex min-h-dvh flex-col items-center justify-center px-6 py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="orb-2 absolute bottom-[15%] left-[8%] h-[14rem] w-[14rem] rounded-full bg-zinc-100/[0.035] blur-3xl" />
          <div
            className="orb-3 absolute right-[10%] top-[12%] h-[10rem] w-[10rem] rounded-full bg-zinc-100/[0.04] blur-3xl"
            style={{ animationDelay: "-3s" }}
          />
        </div>
        <div className="relative mx-auto w-full max-w-5xl">
          <TypedHeading marker="/ 01" prefix="About " emphasis="Me" className="mb-16" />
          {/* Two-column layout: tall photo on the left fills the column; bio + skills stacked on the right. */}
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Photo — left, spans 2 of 5 cols. Stretches to match right-column height on lg.
                Waits for the "About Me" heading to finish typing before sliding in. */}
            <ScrollReveal effect="slide-left" duration={PHOTO_SLIDE_DURATION} delay={PHOTO_DELAY} className="lg:col-span-2">
              <div className="group relative h-[26rem] w-full overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-900 shadow-2xl shadow-emerald-500/10 sm:h-[32rem] lg:h-full lg:min-h-[36rem]">
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
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="orb-2 absolute right-[12%] top-[18%] h-[12rem] w-[12rem] rounded-full bg-zinc-100/[0.035] blur-3xl"
            style={{ animationDelay: "-5s" }}
          />
          <div
            className="orb-3 absolute bottom-[10%] left-[15%] h-[14rem] w-[14rem] rounded-full bg-zinc-100/[0.04] blur-3xl"
            style={{ animationDelay: "-2s" }}
          />
        </div>
        <div className="relative mx-auto w-full max-w-5xl">
          <TypedHeading marker="/ 02" prefix="Experience & " emphasis="Education" className="mb-16" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-2">
                <Briefcase size={16} className="text-zinc-400" />
                <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-300">
                  Experience
                </h3>
              </div>
              <div className="stagger space-y-4">
                {experience.map((item) => (
                  <div
                    key={`${item.role}-${item.org}`}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700"
                  >
                    <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                      <p className="text-lg font-semibold text-zinc-100">{item.role}</p>
                      <span className="text-xs text-zinc-500">{item.period}</span>
                    </div>
                    <p className="mb-2 text-base text-zinc-300">{item.org}</p>
                    <p className="text-base leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-6 flex items-center gap-2">
                <GraduationCap size={16} className="text-zinc-400" />
                <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-300">
                  Education
                </h3>
              </div>
              <div className="stagger space-y-4">
                {education.map((item) => (
                  <div
                    key={`${item.degree}-${item.org}`}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700"
                  >
                    <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                      <p className="text-lg font-semibold text-zinc-100">{item.degree}</p>
                      <span className="text-xs text-zinc-500">{item.period}</span>
                    </div>
                    <p className="mb-2 text-base text-zinc-300">{item.org}</p>
                    <p className="text-base leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="flex min-h-dvh flex-col items-center justify-center px-6 py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="orb-2 absolute left-[6%] top-[20%] h-[10rem] w-[10rem] rounded-full bg-zinc-100/[0.04] blur-3xl"
            style={{ animationDelay: "-7s" }}
          />
          <div
            className="orb-3 absolute bottom-[15%] right-[10%] h-[14rem] w-[14rem] rounded-full bg-zinc-100/[0.035] blur-3xl"
            style={{ animationDelay: "-4s" }}
          />
        </div>
        <div className="relative mx-auto w-full max-w-5xl">
          <TypedHeading marker="/ 03" prefix="Featured " emphasis="Projects" className="mb-16" />
          <div className="stagger grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <SpotlightCard
                  key={project.title}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-7 transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"
                  />
                  {/* Header — icon tile on the left, index + repo link on the right */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] transition-all duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[0.12]">
                      <Icon size={26} className="text-emerald-400" strokeWidth={1.75} />
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} repository (opens in a new tab)`}
                        className="text-zinc-600 transition-all duration-300 hover:text-emerald-400 group-hover:-rotate-12 group-hover:text-emerald-400"
                      >
                        <ArrowUpRight size={22} />
                      </a>
                    </div>
                  </div>
                  {/* Title block */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">{project.subtitle}</p>
                  </div>
                  {/* Amplified metric — the loudest element on the card */}
                  {project.metric && (
                    <div className="mb-6 flex items-end gap-4 rounded-xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.12] to-emerald-500/[0.03] px-5 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-5xl font-black leading-none tracking-tight text-emerald-400">
                          <Counter target={project.metric.value} />
                          {project.metric.suffix}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 pb-1">
                        <span className="flex items-center gap-1 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-emerald-300/80">
                          {project.metric.trend === "up" ? (
                            <TrendingUp size={12} />
                          ) : (
                            <TrendingDown size={12} />
                          )}
                          {project.metric.trend === "up" ? "Increase" : "Reduction"}
                        </span>
                        <span className="text-sm text-zinc-300">{project.metric.label}</span>
                      </div>
                    </div>
                  )}
                  <p className="mb-6 flex-1 text-base leading-relaxed text-zinc-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-emerald-500/90 to-emerald-500/0 px-6 py-4 text-sm font-semibold text-zinc-950 transition-transform duration-300 group-hover:translate-y-0"
                  >
                    View Project <ArrowUpRight size={16} />
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact + Footer */}
      <section id="contact" className="flex min-h-dvh flex-col px-6 pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="orb-2 absolute right-[8%] top-[15%] h-[12rem] w-[12rem] rounded-full bg-zinc-100/[0.035] blur-3xl"
            style={{ animationDelay: "-6s" }}
          />
          <div
            className="orb-3 absolute bottom-[20%] left-[10%] h-[10rem] w-[10rem] rounded-full bg-zinc-100/[0.04] blur-3xl"
            style={{ animationDelay: "-1s" }}
          />
        </div>
        <div className="relative mx-auto flex w-full max-w-5xl flex-1 items-center">
          <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <TypedHeading marker="/ 04" prefix="Let’s " emphasis="Connect" align="center" className="mb-6" />
            <p className="mx-auto mb-12 max-w-lg text-lg text-zinc-300 sm:text-xl">
              I&apos;m open to collaborations, research opportunities, and
              interesting AI projects. Feel free to reach out.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:saiabhinav190404@gmail.com"
                className="flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-400"
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
        </div>
        <footer className="-mx-6 mt-12 border-t border-zinc-800/50 px-6 py-8 text-center text-sm text-zinc-600">
          <p>Built with Next.js & Tailwind CSS · Sai Abhinav © {new Date().getFullYear()}</p>
        </footer>
      </section>
    </div>
  );
}
