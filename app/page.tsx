import { GitBranch, Mail, ExternalLink, ChevronDown, Briefcase, GraduationCap } from "lucide-react";
import { Nav } from "./Nav";

const projects = [
  {
    title: "SmartSignal",
    subtitle: "AI Traffic Light Automation System",
    description:
      "AI-powered traffic signal control system using PPO reinforcement learning and SUMO simulation. Integrated TomTom API for realistic traffic data, reducing vehicle waiting time by ~28% and increasing throughput by 22%.",
    tags: ["Python", "PPO", "SUMO", "TomTom API", "Reinforcement Learning"],
    github: "https://github.com/SaixAbhinav/SmartSignal",
  },
  {
    title: "FakeGuard",
    subtitle: "Instagram Fake Profile Detection",
    description:
      "Predictive system trained on 3,000+ accounts using an ensemble model combining ML and CNN-based image classification. Achieved 92% accuracy, 90% precision, and 88% recall with a 15% reduction in false positives.",
    tags: ["Python", "CNN", "Scikit-learn", "TensorFlow", "Keras"],
    github: "https://github.com/SaixAbhinav/FakeGuard",
  },
  {
    title: "AI Workflow Assistant",
    subtitle: "Intelligent Automation Tool",
    description:
      "AI-powered tool that automates summarization, insight extraction, and task generation from unstructured data. Built with prompt engineering workflows using the OpenAI API for structured, reliable outputs.",
    tags: ["Python", "OpenAI API", "Prompt Engineering", "Flask"],
    github: "https://github.com/SaixAbhinav/ai-workflow-assistant",
  },
  {
    title: "Skin Cancer Detection",
    subtitle: "IBM Skills Build Internship",
    description:
      "CNN-based image classifier for early skin cancer detection, built during a data analyst internship at IBM Skills Build. Achieved 94% accuracy on dermoscopic images through transfer learning and targeted data augmentation.",
    tags: ["Python", "CNN", "TensorFlow", "Keras", "Image Classification"],
    github: "https://github.com/SaixAbhinav/skin-cancer-detection",
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
  { category: "Programming", items: ["Python", "SQL"] },
  {
    category: "AI & ML",
    items: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Optimization"],
  },
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
          <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.08] blur-3xl" />
          <div className="absolute right-[8%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-zinc-100/[0.04] blur-3xl" />
          <div className="absolute left-[6%] bottom-[12%] h-[18rem] w-[18rem] rounded-full bg-zinc-100/[0.04] blur-3xl" />
        </div>
        <div className="relative max-w-3xl">
          <p className="mb-6 text-base font-medium tracking-[0.3em] text-emerald-400 uppercase sm:text-lg">
            Applied AI Builder
          </p>
          <h1 className="mb-8 bg-gradient-to-br from-white via-zinc-200 to-emerald-300 bg-clip-text text-6xl font-bold tracking-tighter text-transparent sm:text-8xl lg:text-9xl">
            Sai Abhinav
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-zinc-300 sm:text-2xl lg:text-3xl">
            I enjoy building stuff. Mostly AI, sometimes chaos.
          </p>
          <p className="mb-12 text-base text-zinc-400 sm:text-lg">
            <span className="font-semibold text-emerald-400">Welcome</span> — take a look around.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-400"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-zinc-700 px-8 py-4 text-base font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              Get in Touch
            </a>
          </div>
        </div>
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="absolute bottom-10 animate-bounce text-zinc-600 hover:text-zinc-400 motion-reduce:animate-none"
        >
          <ChevronDown size={24} />
        </a>
      </section>

      {/* About */}
      <section id="about" className="reveal flex min-h-dvh flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="mb-16 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
            About <span className="text-emerald-400">Me</span>
          </h2>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                I&apos;m an Applied AI builder currently pursuing my{" "}
                <span className="text-zinc-200">MCA at Vivekananda Institute of Professional Studies</span>{" "}
                (CGPA 8.6), with a BCA background from the same institution.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                My focus is on building systems that work in the real world —
                not just in notebooks. I&apos;ve interned at{" "}
                <span className="text-zinc-200">IBM Skills Build</span> as a
                Data Analyst, where I built a skin cancer detection model
                achieving 94% accuracy.
              </p>
              <p className="text-lg leading-relaxed text-zinc-300">
                I&apos;m particularly interested in{" "}
                <span className="text-zinc-200">
                  workflow automation, prompt engineering, and reinforcement learning
                </span>{" "}
                — areas where AI can eliminate tedious manual work and create
                measurable impact.
              </p>
            </div>
            <div className="space-y-5">
              {skills.map((group) => (
                <div key={group.category}>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-300">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="reveal flex min-h-dvh flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="mb-16 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
            Experience & <span className="text-emerald-400">Education</span>
          </h2>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-2">
                <Briefcase size={16} className="text-zinc-400" />
                <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-300">
                  Experience
                </h3>
              </div>
              <div className="space-y-4">
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
              <div className="space-y-4">
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
      <section id="projects" className="reveal flex min-h-dvh flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="mb-16 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
            Featured <span className="text-emerald-400">Projects</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-100/5"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"
                />
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-50 sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">{project.subtitle}</p>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} repository (opens in a new tab)`}
                    className="text-zinc-600 transition-colors hover:text-zinc-300"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Footer */}
      <section id="contact" className="reveal flex min-h-dvh flex-col px-6 pt-24">
        <div className="mx-auto flex w-full max-w-5xl flex-1 items-center">
          <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              Let&apos;s <span className="text-emerald-400">Connect</span>
            </h2>
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
