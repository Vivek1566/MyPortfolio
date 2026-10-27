import { Link } from "react-router-dom";
import { githubProfile } from "../data/projects.js";

const values = [
  ["01", "Product-minded", "Understand the problem and the people before choosing the technology."],
  ["02", "Systems-aware", "Think through APIs, data, and architecture — not only the screen."],
  ["03", "Always learning", "Explore AI and emerging tools with a focus on practical outcomes."],
];

export default function About() {
  return (
    <main id="main" className="page-wrap inner-page">
      <p className="eyebrow">ABOUT VIVEK</p>
      <h1>Grounded in code.<br /><span>Driven by curiosity.</span></h1>
      <div className="about-layout" data-reveal>
        {/* Scenic art panel using the landscape image */}
        <div className="about-art" aria-hidden="true">
          <span>Build<br />with intent.</span>
        </div>
        <div className="about-copy">
          <h2>Hi, I'm Vivek Rajak.</h2>
          <p className="lead">I'm a Computer Science Engineering student and software developer building full-stack applications, backend services, and AI-powered products.</p>
          <p>I enjoy working across the stack — shaping a clear user experience, designing the API behind it, and figuring out how the data and system fit together.</p>
          <p>My projects range from AI-assisted community and GIS decision tools to computer-vision experiments, education products, and visual systems simulations.</p>
          <p>When I'm not building, I'm reading about product design, systems thinking, or the latest in AI/ML research.</p>
          <Link className="text-link" to="/contact">Tell me what you're working on <span aria-hidden="true">→</span></Link>
          <a className="text-link about-github" href={githubProfile} target="_blank" rel="noreferrer">Explore my GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      {/* Values / Work ethic */}
      <section className="values" data-reveal>
        <p className="eyebrow">HOW I WORK</p>
        <div className="value-grid">
          {values.map(([number, title, description]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>

      {/* Skills CTA */}
      <section className="contact-banner" data-reveal>
        <div>
          <p className="eyebrow">CURIOUS ABOUT MY STACK?</p>
          <h2>See the tools and<br />skills I work with.</h2>
        </div>
        <Link className="button button-primary" to="/skills">View my skills <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
