export type RouteItem = {
  href: string;
  label: string;
  eyebrow: string;
};

export type ArtAsset = {
  src: string;
  alt: string;
  caption: string;
};

export const routes: RouteItem[] = [
  { href: "/", label: "Journey", eyebrow: "00" },
  { href: "/discoveries", label: "Discoveries", eyebrow: "01" },
  { href: "/logbook", label: "Logbook", eyebrow: "02" },
  { href: "/signals", label: "Signals", eyebrow: "03" },
  { href: "/about", label: "About", eyebrow: "04" },
  { href: "/contact", label: "Contact", eyebrow: "05" },
];

export const artAssets = {
  hero: {
    src: "/build-kit/hero-campfire.png",
    alt: "Line art of a traveler by a campfire beneath mountains, stars, planets, and a telescope.",
    caption: "The universe is larger than the map.",
  },
  campfire: {
    src: "/build-kit/campfire-mark.png",
    alt: "Line art campfire mark with small stars.",
    caption: "Warmth for the unknown.",
  },
  planet: {
    src: "/build-kit/planet.png",
    alt: "Line art ringed planet surrounded by small stars.",
    caption: "Signals from farther systems.",
  },
  telescope: {
    src: "/build-kit/telescope.png",
    alt: "Line art telescope pointed at a star field.",
    caption: "Looking for measurable proof.",
  },
  journal: {
    src: "/build-kit/journal-map.png",
    alt: "Line art notebook, observations, and technical map sketches.",
    caption: "Notes from the build.",
  },
  signals: {
    src: "/build-kit/signals.png",
    alt: "Line art landscape with sky islands, cliffs, stars, and signal-like marks.",
    caption: "Patterns worth following.",
  },
  projects: {
    src: "/build-kit/project-panels.png",
    alt: "A grid of illustrated project panels with mountains, maps, telescope, journal, lantern, and planet motifs.",
    caption: "Discoveries over details.",
  },
  texture: {
    src: "/build-kit/texture-strip.png",
    alt: "Decorative line-art texture panels from the brand kit.",
    caption: "Field textures.",
  },
};

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string;
  metric?: {
    value: string;
    label: string;
    trend: "up" | "down";
  };
  art: keyof typeof artAssets;
};

export const projects: Project[] = [
  {
    title: "SmartSignal",
    subtitle: "AI Traffic Light Automation System",
    description:
      "AI-powered traffic signal control system using PPO reinforcement learning and SUMO simulation. Integrated TomTom API for realistic traffic data, reducing vehicle waiting time by roughly 28% and increasing throughput by 22%.",
    tags: ["Python", "PPO", "SUMO", "TomTom API", "Reinforcement Learning"],
    github: "https://github.com/SaixAbhinav/SmartSignal",
    metric: { value: "-28%", label: "vehicle wait time", trend: "down" },
    art: "telescope",
  },
  {
    title: "FakeGuard",
    subtitle: "Instagram Fake Profile Detection",
    description:
      "Predictive system trained on 3,000+ accounts using an ensemble model combining ML and CNN-based image classification. Achieved 92% accuracy, 90% precision, and 88% recall with a 15% reduction in false positives.",
    tags: ["Python", "CNN", "Scikit-learn", "TensorFlow", "Keras"],
    github: "https://github.com/SaixAbhinav/FakeGuard",
    metric: { value: "92%", label: "accuracy", trend: "up" },
    art: "planet",
  },
  {
    title: "AI Workflow Assistant",
    subtitle: "Intelligent Automation Tool",
    description:
      "AI-powered tool that automates summarization, insight extraction, and task generation from unstructured data. Built with prompt engineering workflows using the OpenAI API for structured, reliable outputs.",
    tags: ["Python", "OpenAI API", "Prompt Engineering", "Flask"],
    github: "https://github.com/SaixAbhinav/ai-workflow-assistant",
    art: "journal",
  },
  {
    title: "Skin Cancer Detection",
    subtitle: "IBM Skills Build Internship",
    description:
      "CNN-based image classifier for early skin cancer detection, built during a data analyst internship at IBM Skills Build. Achieved 94% accuracy on dermoscopic images through transfer learning and targeted data augmentation.",
    tags: ["Python", "CNN", "TensorFlow", "Keras", "Image Classification"],
    github: "https://github.com/SaixAbhinav/skin-cancer-detection",
    metric: { value: "94%", label: "accuracy", trend: "up" },
    art: "campfire",
  },
];

export const timeline = [
  {
    title: "Data Analyst Intern",
    org: "IBM Skills Build",
    meta: "Internship",
    body:
      "Built a CNN-based skin cancer detection model achieving 94% accuracy on dermoscopic images. Owned data preparation, model training, and evaluation end to end.",
  },
  {
    title: "MCA",
    org: "Vivekananda Institute of Professional Studies",
    meta: "In progress Â· CGPA 8.6",
    body:
      "Master of Computer Applications with coursework focused on applied AI, machine learning, and software engineering.",
  },
  {
    title: "BCA",
    org: "Vivekananda Institute of Professional Studies",
    meta: "Completed",
    body:
      "Bachelor of Computer Applications with foundations in computer science, statistics, databases, and programming.",
  },
];

export const skills = [
  { category: "Programming", items: ["Python", "SQL"] },
  {
    category: "AI & ML",
    items: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Optimization"],
  },
  { category: "Frameworks", items: ["TensorFlow", "Keras", "NumPy", "Pandas", "Flask"] },
  { category: "AI Tools", items: ["OpenAI API", "Prompt Engineering", "Workflow Automation"] },
  { category: "Visualization", items: ["Matplotlib", "Seaborn", "Excel", "Google Sheets"] },
];

export const metrics = [
  { value: "28%", label: "lower vehicle wait time" },
  { value: "92%", label: "FakeGuard accuracy" },
  { value: "94%", label: "skin cancer model accuracy" },
  { value: "3,000+", label: "accounts in model data" },
];

export const contactLinks = {
  email: "mailto:saiabhinav190404@gmail.com",
  emailLabel: "saiabhinav190404@gmail.com",
  github: "https://github.com/SaixAbhinav",
  githubLabel: "github.com/SaixAbhinav",
};
