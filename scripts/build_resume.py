"""
Generate an ATS-safe one-page PDF resume for Sai Abhinav.

ATS-safe choices:
- Single column, left-aligned, real selectable text (no images/tables/text boxes).
- Core font (Helvetica) -> always embeds as standard, extracts cleanly.
- Plain-text hyperlinks (also clickable), standard section headers.
- ASCII/latin-1 only so text extraction never garbles.

Run: python scripts/build_resume.py  ->  writes public/resume.pdf
"""

from fpdf import FPDF

INK = (17, 17, 17)        # near-black body
MUTED = (90, 90, 90)      # secondary text
RULE = (200, 200, 200)    # hairline rules
ACCENT = (4, 120, 87)     # emerald-700, used sparingly for links

LEFT = 14.0               # mm margins
RIGHT = 14.0
TOP = 13.0


class Resume(FPDF):
    def header(self):
        pass

    def footer(self):
        pass

    # --- helpers -------------------------------------------------------
    def section(self, title):
        self.ln(2.2)
        self.set_font("Helvetica", "B", 10.5)
        self.set_text_color(*INK)
        self.cell(0, 5, title.upper())
        self.ln(5.4)
        y = self.get_y()
        self.set_draw_color(*RULE)
        self.set_line_width(0.25)
        self.line(LEFT, y, self.w - RIGHT, y)
        self.ln(1.8)

    def bullet(self, text):
        x = self.get_x()
        y = self.get_y()
        # small filled disc as the bullet marker
        self.set_fill_color(*INK)
        self.ellipse(LEFT + 0.6, y + 1.6, 1.1, 1.1, style="F")
        self.set_xy(LEFT + 4.0, y)
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(*INK)
        self.multi_cell(self.w - RIGHT - (LEFT + 4.0), 4.3, text)
        self.set_x(LEFT)

    def kv_inline(self, label, value):
        self.set_x(LEFT)
        self.set_font("Helvetica", "B", 9.5)
        self.set_text_color(*INK)
        w = self.get_string_width(label + " ") + 0.5
        self.cell(w, 4.4, label)
        self.set_font("Helvetica", "", 9.5)
        self.multi_cell(self.w - RIGHT - LEFT - w, 4.4, value)


def s(t):
    """Sanitize to latin-1 safe ASCII."""
    return (t.replace("–", "-").replace("—", "-")
             .replace("’", "'").replace("‘", "'")
             .replace("“", '"').replace("”", '"')
             .replace("·", "-").replace("•", "-"))


pdf = Resume(format="Letter", unit="mm")
pdf.set_auto_page_break(auto=False)
pdf.set_margins(LEFT, TOP, RIGHT)
pdf.add_page()

# ---------------- Header ----------------
pdf.set_font("Helvetica", "B", 21)
pdf.set_text_color(*INK)
pdf.cell(0, 8.5, "SAI ABHINAV")
pdf.ln(7.8)
pdf.set_font("Helvetica", "", 10.5)
pdf.set_text_color(*ACCENT)
pdf.cell(0, 5, "Aspiring AI / ML Engineer")
pdf.ln(5.6)
pdf.set_font("Helvetica", "", 8.8)
pdf.set_text_color(*MUTED)
line1 = "Noida, UP, India   |   +91-9958434717   |   saiabhinav190404@gmail.com"
pdf.cell(0, 4.2, line1)
pdf.ln(4.2)
# Links line (clickable + plain text)
links = [
    ("linkedin.com/in/sai-abhinav-933b3b285", "https://www.linkedin.com/in/sai-abhinav-933b3b285/"),
    ("github.com/SaixAbhinav", "https://github.com/SaixAbhinav"),
    ("saixabhinav.vercel.app", "https://saixabhinav.vercel.app"),
]
pdf.set_text_color(*ACCENT)
for i, (txt, url) in enumerate(links):
    if i:
        pdf.set_text_color(*MUTED)
        pdf.cell(pdf.get_string_width("   |   "), 4.2, "   |   ")
        pdf.set_text_color(*ACCENT)
    pdf.cell(pdf.get_string_width(txt), 4.2, txt, link=url)
pdf.ln(5.0)

# ---------------- Summary ----------------
pdf.section("Summary")
pdf.set_font("Helvetica", "", 9.5)
pdf.set_text_color(*INK)
summary = s(
    "MCA student and applied ML engineer who builds and deploys end-to-end systems across "
    "reinforcement learning, computer vision, and LLM workflows. Shipped a live, production-"
    "deployed RL traffic-optimization app (PPO + SUMO) that cut vehicle wait time ~28%, plus "
    "CNN detection models reaching 92-94% accuracy. Seeking a Junior AI/ML Engineer role to "
    "build production ML and GenAI systems."
)
pdf.set_x(LEFT)
pdf.multi_cell(pdf.w - LEFT - RIGHT, 4.3, summary)

# ---------------- Skills ----------------
pdf.section("Technical Skills")
skills = [
    ("Languages:", "Python, SQL"),
    ("ML / Deep Learning:", "PyTorch, TensorFlow, Keras, scikit-learn; CNNs / Computer Vision; "
                            "Reinforcement Learning (PPO, Stable-Baselines3); Feature Engineering; Model Optimization"),
    ("GenAI / LLM:", "OpenAI API, Prompt Engineering, Structured-Output Workflows"),
    ("Deployment & Tools:", "Git & GitHub, Flask (REST APIs), Render, SUMO"),
    ("Data:", "Pandas, NumPy, Matplotlib, Seaborn, Excel / Google Sheets"),
]
for label, val in skills:
    pdf.kv_inline(s(label), s(val))
    pdf.ln(0.6)

# ---------------- Projects ----------------
pdf.section("Projects")


def project(title, links_pairs, stack, bullets):
    pdf.set_x(LEFT)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*INK)
    pdf.cell(0, 4.8, s(title))
    pdf.ln(4.8)
    # links row
    pdf.set_x(LEFT)
    pdf.set_font("Helvetica", "", 8.6)
    for i, (lbl, url) in enumerate(links_pairs):
        if i:
            pdf.set_text_color(*MUTED)
            pdf.cell(pdf.get_string_width("   "), 4.0, "   ")
        pdf.set_text_color(*ACCENT)
        pdf.cell(pdf.get_string_width(lbl), 4.0, lbl, link=url)
    pdf.ln(4.2)
    # stack
    pdf.set_x(LEFT)
    pdf.set_font("Helvetica", "I", 8.6)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(pdf.w - LEFT - RIGHT, 3.9, s(stack))
    pdf.ln(0.4)
    for b in bullets:
        pdf.bullet(s(b))
    pdf.ln(1.6)


project(
    "SmartSignal - RL Traffic-Signal Optimization",
    [("Live Demo", "https://smart-signal-i0v5.onrender.com/"),
     ("Code", "https://github.com/SaixAbhinav/smart-signal")],
    "Python - PPO (Stable-Baselines3) - SUMO - TomTom API - Flask - Render",
    [
        "Built and deployed to production a reinforcement-learning agent (PPO) controlling multi-junction "
        "traffic signals in SUMO, cutting average vehicle wait time ~28% and raising throughput 22% vs. fixed-timer baselines.",
        "Integrated the live TomTom API to drive simulations from real-world traffic data, and engineered the "
        "environment to scale across multiple junctions concurrently.",
        "Served the trained model behind a Flask REST app hosted on Render for live demonstration.",
    ],
)

project(
    "AI Workflow Copilot - LLM Document Automation",
    [("Code", "https://github.com/SaixAbhinav/Workflow_copilot")],
    "Python - OpenAI API - Prompt Engineering - Flask",
    [
        "Built an LLM tool that summarizes unstructured documents and auto-generates tasks and insights, "
        "using structured-output prompt workflows to return reliable, parseable JSON.",
        "Designed reusable prompt chains for extraction and task generation, reducing manual document-review effort.",
    ],
)

project(
    "Instagram Fake-Profile Detection",
    [("Code", "https://github.com/SaixAbhinav/Instagram_fake_account_detector")],
    "Python - scikit-learn - TensorFlow/Keras (CNN) - Pandas",
    [
        "Engineered an ensemble of classical ML + a CNN image classifier on a 3,000+ account dataset, "
        "reaching 92% accuracy, 90% precision, and 88% recall.",
        "Cut false positives 15% through feature engineering and decision-threshold tuning.",
    ],
)

# ---------------- Experience ----------------
pdf.section("Experience")
pdf.set_x(LEFT)
pdf.set_font("Helvetica", "B", 10)
pdf.set_text_color(*INK)
pdf.cell(pdf.w - LEFT - RIGHT - 32, 4.8, "Data Analyst Intern - IBM SkillsBuild")
pdf.set_font("Helvetica", "", 9)
pdf.set_text_color(*MUTED)
pdf.cell(32, 4.8, "Jun 2024 - Aug 2024", align="R")
pdf.ln(4.8)
pdf.set_x(LEFT)
pdf.set_font("Helvetica", "", 8.6)
pdf.set_text_color(*ACCENT)
pdf.cell(0, 4.0, "Code: github.com/SaixAbhinav/skin_cancer_prediction",
         link="https://github.com/SaixAbhinav/skin_cancer_prediction")
pdf.ln(4.4)
for b in [
    "Built and tuned a CNN for skin-cancer image classification, reaching 94% accuracy via data "
    "preprocessing, feature engineering, and hyperparameter tuning.",
    "Collaborated in a 6-person team and presented model findings to stakeholders.",
]:
    pdf.bullet(s(b))

# ---------------- Education ----------------
pdf.section("Education")


def edu(degree, school, period, cgpa):
    pdf.set_x(LEFT)
    pdf.set_font("Helvetica", "B", 9.8)
    pdf.set_text_color(*INK)
    pdf.cell(pdf.w - LEFT - RIGHT - 40, 4.6, s(degree))
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(40, 4.6, period, align="R")
    pdf.ln(4.4)
    pdf.set_x(LEFT)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 4.2, s(school + "   |   CGPA " + cgpa))
    pdf.ln(5.0)


edu("Master of Computer Applications (MCA)",
    "Vivekananda Institute of Professional Studies, Delhi", "2025-2027 (Expected)", "8.6")
edu("Bachelor of Computer Applications (BCA)",
    "Vivekananda Institute of Professional Studies, Delhi", "2022-2025", "7.6")

import os
os.makedirs("public", exist_ok=True)
pdf.output("public/resume.pdf")
print("wrote public/resume.pdf  | final Y =", round(pdf.get_y(), 1), "mm of", round(pdf.h, 1))
