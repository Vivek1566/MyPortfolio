import { Link } from "react-router-dom";

const skillCategories = [
  {
    name: "Frontend Development",
    emoji: "🎨",
    skills: [
      { name: "React / JSX", level: 88 },
      { name: "JavaScript (ES2024)", level: 90 },
      { name: "TypeScript", level: 78 },
      { name: "HTML5 & CSS3", level: 92 },
      { name: "GSAP / Animations", level: 70 },
    ],
  },
  {
    name: "Backend & APIs",
    emoji: "⚙️",
    skills: [
      { name: "Python", level: 91 },
      { name: "FastAPI", level: 83 },
      { name: "Flask", level: 78 },
      { name: "Node.js / Express", level: 68 },
      { name: "REST API Design", level: 85 },
    ],
  },
  {
    name: "AI & Machine Learning",
    emoji: "🤖",
    skills: [
      { name: "Scikit-learn / ML", level: 80 },
      { name: "Computer Vision (OpenCV)", level: 76 },
      { name: "Data Analysis (Pandas)", level: 82 },
      { name: "LLM / AI Integration", level: 72 },
      { name: "Model Deployment", level: 70 },
    ],
  },
  {
    name: "Databases & Data",
    emoji: "🗄️",
    skills: [
      { name: "PostgreSQL / PostGIS", level: 78 },
      { name: "MySQL", level: 80 },
      { name: "SQL & Query Design", level: 83 },
      { name: "Database Architecture", level: 73 },
    ],
  },
];

const tools = [
  "Git & GitHub", "VS Code", "Vite", "Figma", "Postman", "Docker (basics)",
  "Vercel", "Railway", "Linux / WSL", "Jupyter Notebook", "Chrome DevTools",
  "GSAP", "React Router", "Axios", "SQLAlchemy", "Alembic",
];

const softSkills = [
  { icon: "🧩", title: "Problem Decomposition", desc: "Breaking complex problems into clear, solvable sub-problems before writing a single line of code." },
  { icon: "📐", title: "Systems Thinking", desc: "Considering how APIs, data models, and interfaces fit together — not just the visible surface." },
  { icon: "🎯", title: "Product Mindset", desc: "Always asking: who uses this, why does it matter, and what's the simplest path to something useful?" },
  { icon: "📚", title: "Continuous Learning", desc: "Actively exploring new tools, papers, and patterns — turning curiosity into shipped projects." },
  { icon: "🤝", title: "Collaboration", desc: "Comfortable working in teams, doing code reviews, and communicating technical decisions clearly." },
  { icon: "🏗️", title: "Build-First Approach", desc: "I learn best by doing — turning ideas into working prototypes quickly and iterating from there." },
];

export default function Skills() {
  return (
    <main id="main" className="page-wrap skills-page">
      <p className="eyebrow">STACK · TOOLS · STRENGTHS</p>
      <h1>The tools I use<br /><span>to get things done.</span></h1>
      <p className="page-lead">
        A breakdown of the languages, frameworks, and skills I bring to every project — from frontend craft to backend systems and AI/ML.
      </p>

      {/* ── Skill Bars ───────────────────────────────────────────────── */}
      <div className="skills-categories" data-reveal>
        {skillCategories.map((category) => (
          <div className="skills-category" key={category.name}>
            <h2>
              {category.emoji} {category.name}
              <span>/ {category.skills.length} skills</span>
            </h2>
            <div className="skills-bars">
              {category.skills.map((skill) => (
                <div className="skill-bar" key={skill.name}>
                  <span className="skill-bar-name">{skill.name}</span>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${skill.level}%` }}
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name}: ${skill.level}%`}
                    />
                  </div>
                  <span className="skill-bar-pct">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Tools & Ecosystem ────────────────────────────────────────── */}
      <section style={{ marginTop: "72px", paddingTop: "40px", borderTop: "1.5px solid var(--line)" }} data-reveal>
        <p className="eyebrow">TOOLS & ECOSYSTEM</p>
        <h2 style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-.03em", marginBottom: "8px", color: "var(--text)" }}>
          Everything in my <span className="accent-text">toolbox</span>
        </h2>
        <p style={{ color: "var(--text-body)", fontSize: "14px", marginBottom: "26px", maxWidth: "520px" }}>
          The tools, platforms, and libraries I reach for regularly across different stages of a project.
        </p>
        <div className="tools-grid">
          {tools.map((tool) => (
            <span className="tool-chip" key={tool}>{tool}</span>
          ))}
        </div>
      </section>

      {/* ── Soft Skills ──────────────────────────────────────────────── */}
      <section style={{ marginTop: "72px" }} data-reveal>
        <p className="eyebrow">BEYOND THE CODE</p>
        <h2 style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-.03em", marginBottom: "28px", color: "var(--text)" }}>
          How I <span className="accent-text">think & work</span>
        </h2>
        <div className="value-grid">
          {softSkills.map((item) => (
            <article key={item.title}>
              <span style={{ fontSize: "24px" }}>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="contact-banner" data-reveal style={{ marginBottom: "0" }}>
        <div>
          <p className="eyebrow">WANT TO SEE IT IN ACTION?</p>
          <h2>Check out my projects<br />or get in touch.</h2>
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link className="button button-primary" to="/projects">View projects <span aria-hidden="true">↗</span></Link>
          <Link className="button" style={{ border: "1.5px solid var(--line)", borderRadius: "999px", minHeight: "48px", display: "inline-flex", alignItems: "center", padding: "0 20px", fontSize: "13px", fontWeight: 600, color: "var(--text)", gap: "10px", transition: "border-color .2s" }} to="/contact">Contact me</Link>
        </div>
      </section>
    </main>
  );
}
