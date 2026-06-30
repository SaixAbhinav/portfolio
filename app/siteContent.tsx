// Home page content: projects, experience timeline, and skills.
// Consumed by page.tsx. Demo JSX lives here because each demo is bound 1:1
// to its project; keeping it alongside the data avoids a separate lookup map.

import { type ReactNode } from "react";
import { type IconName } from "./ProjectCard";
import { SmartSignalDemo } from "./SmartSignalDemo";
import { WorkflowDemo } from "./WorkflowDemo";
import { SkinCancerDemo } from "./SkinCancerDemo";

export type Metric = { value: number; suffix?: string; label: string; trend: "up" | "down" };

export type Screenshot = { src: string; caption: string; width: number; height: number };

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string;
  iconName: IconName;
  metric?: Metric;
  highlights?: string[];
  screenshots?: Screenshot[];
  embedUrl?: string;
  demo: ReactNode;
};

export const projects: Project[] = [
  {
    title: "SmartSignal",
    subtitle: "AI Traffic Light Automation System",
    description:
      "AI-powered traffic signal control system using PPO reinforcement learning, benchmarked in SUMO against fixed-timer, actuated, and max-pressure baselines. Cuts average wait time by ~91% vs a fixed timer and ~60% vs actuated control, validated across off-peak, rush, and variable-demand traffic profiles (5-seed average).",
    tags: ["Python", "PPO", "SUMO", "Reinforcement Learning", "FastAPI"],
    github: "https://github.com/SaixAbhinav/smart-signal",
    embedUrl: "https://smart-signal-i0v5.onrender.com",
    iconName: "TrafficCone",
    metric: { value: 91, suffix: "%", label: "wait time vs fixed timer", trend: "down" },
    screenshots: [
      {
        src: "https://raw.githubusercontent.com/SaixAbhinav/smart-signal/main/docs/training_curve.png",
        caption: "PPO training curve: episode reward converging over 500k steps",
        width: 1040,
        height: 585,
      },
    ],
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

// Work + education interleaved.
export type TimelineItem = {
  type: "work" | "education";
  title: string;
  org: string;
  period: string;
  description: string;
};

export const timeline: TimelineItem[] = [
  {
    type: "education",
    title: "MCA",
    org: "Vivekananda Institute of Professional Studies",
    period: "In progress · CGPA 8.6",
    description:
      "Master of Computer Applications · coursework focused on applied AI, machine learning, and software engineering.",
  },
  {
    type: "work",
    title: "Data Analyst Intern",
    org: "IBM Skills Build",
    period: "Internship",
    description:
      "Built a CNN-based skin cancer detection model achieving 94% accuracy on dermoscopic images. Owned data preparation, model training, and evaluation end to end.",
  },
  {
    type: "education",
    title: "BCA",
    org: "Vivekananda Institute of Professional Studies",
    period: "Completed",
    description:
      "Bachelor of Computer Applications · foundations in CS, statistics, databases, and programming.",
  },
];

export type SkillGroup = {
  category: string;
  primary: boolean;
  items: string[];
};

export const skills: SkillGroup[] = [
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
