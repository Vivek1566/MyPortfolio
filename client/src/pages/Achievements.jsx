import { Link } from "react-router-dom";

const achievements = [
  {
    icon: "🏆",
    tag: "Hackathon",
    title: "Edugame — Hackathon Build",
    description: "Built an educational gaming web platform during a competitive hackathon, exploring how interactive experiences can make learning more engaging for students.",
    meta: "2024 · Team Project",
  },
  {
    icon: "🤖",
    tag: "AI / ML",
    title: "DrishtiSetu — AI-GIS Decision Tool",
    description: "Developed a full-stack AI-driven geospatial decision-support prototype for understanding multi-hazard risk and planning safer relocation — combining React, FastAPI, and PostGIS.",
    meta: "2025 · Solo Build",
  },
  {
    icon: "🧠",
    tag: "Computer Vision",
    title: "Glow.AI — Skincare Vision System",
    description: "Built a multi-condition skin analysis system pairing computer vision image detection with a conversational AI assistant for personalized skincare guidance.",
    meta: "2025 · ML Project",
  },
  {
    icon: "🌐",
    tag: "Full-Stack",
    title: "AlumUnity — Alumni Networking Platform",
    description: "Designed and developed a multi-role campus community platform with alumni profiles, mentorship discovery, career opportunities, and an AI-assisted career experience.",
    meta: "2025 · Full-Stack Build",
  },
  {
    icon: "⚙️",
    tag: "Systems Programming",
    title: "GCMaxy — Garbage Collection Visualizer",
    description: "Created a live, interactive visual playground to compare GC strategies — Mark-Sweep, Reference Counting, Generational, and Copying — deployed to Vercel.",
    meta: "2025 · Live Demo Available",
  },
  {
    icon: "📊",
    tag: "Machine Learning",
    title: "EduPredict — Student Performance ML",
    description: "Trained and deployed an end-to-end machine learning model predicting student performance outcomes with an interactive Flask-based web interface.",
    meta: "2024 · End-to-End ML",
  },
];

const certifications = [
  { icon: "🐍", name: "Python for Data Science", issuer: "IBM / Coursera", year: "2024" },
  { icon: "🤖", name: "Machine Learning Fundamentals", issuer: "Coursera / Google", year: "2024" },
  { icon: "🌐", name: "Full-Stack Web Development", issuer: "Self-directed + Projects", year: "2025" },
  { icon: "🛢️", name: "SQL & Database Design", issuer: "Academic + Industry", year: "2024" },
  { icon: "☁️", name: "Cloud & Deployment (Vercel, Railway)", issuer: "Hands-on Projects", year: "2025" },
  { icon: "🔬", name: "Computer Vision with OpenCV", issuer: "Self-directed", year: "2025" },
];

export default function Achievements() {
  return (
    <main id="main" className="page-wrap achievements-page">
      <p className="eyebrow">WINS · MILESTONES · CREDENTIALS</p>
      <h1>Where effort<br /><span>meets recognition.</span></h1>
      <p className="page-lead">
        A record of hackathons, builds, and learning milestones that shaped my skills as a developer and problem-solver.
      </p>

      {/* ── Achievements Grid ─────────────────────────────────────────── */}
      <div className="achievements-grid" data-reveal>
        {achievements.map((item) => (
          <div className="achievement-card" key={item.title}>
            <span className="achievement-icon">{item.icon}</span>
            <span className="achievement-tag">{item.tag}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p className="achievement-meta">{item.meta}</p>
          </div>
        ))}
      </div>

      {/* ── Certifications / Learning ─────────────────────────────────── */}
      <section className="certs-section" data-reveal>
        <h2>Certifications &amp; <span className="accent-text">Learning</span></h2>
        <div className="certs-grid">
          {certifications.map((cert) => (
            <div className="cert-card" key={cert.name}>
              <span className="cert-icon">{cert.icon}</span>
              <span className="cert-name">{cert.name}</span>
              <span className="cert-issuer">{cert.issuer}</span>
              <span className="cert-year">{cert.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="contact-banner" data-reveal>
        <div>
          <p className="eyebrow">INTERESTED IN WHAT I BUILD?</p>
          <h2>Let's build something<br />meaningful together.</h2>
        </div>
        <Link className="button button-primary" to="/contact">Contact me <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
