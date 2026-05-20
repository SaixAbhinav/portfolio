// Shared timing constants for the About section animation sequence.
// Lives in a plain .ts file (not a client component) so both page.tsx (server)
// and TypedAboutBio.tsx (client) can import without violating the server/client boundary.

export const ABOUT_PARAGRAPHS = [
  "I'm an Applied AI builder currently pursuing my MCA at Vivekananda Institute of Professional Studies (CGPA 8.6), with a BCA background from the same institution.",
  "My focus is on building systems that work in the real world — not just in notebooks. I've interned at IBM Skills Build as a Data Analyst, where I built a skin cancer detection model achieving 94% accuracy.",
  "I'm particularly interested in workflow automation, prompt engineering, and reinforcement learning — areas where AI can eliminate tedious manual work and create measurable impact.",
];

export const TYPING_SPEED = 13; // ms per character
export const PARAGRAPH_GAP = 400; // ms pause between paragraphs

const TOTAL_CHARS = ABOUT_PARAGRAPHS.reduce((sum, p) => sum + p.length, 0);

export const TYPED_ABOUT_BIO_DURATION =
  TOTAL_CHARS * TYPING_SPEED + (ABOUT_PARAGRAPHS.length - 1) * PARAGRAPH_GAP;
