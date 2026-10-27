import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";

export default function Projects() {
  return (
    <main id="main" className="page-wrap inner-page">
      <p className="eyebrow">PROJECTS · EXPERIMENTS · BUILDS</p>
      <h1>A little bit of<br /><span>how I think.</span></h1>
      <p className="page-lead">Projects pulled from my GitHub — from AI and geospatial risk tools to systems simulations and education.</p>
      <section className="project-grid all-projects" aria-label="Portfolio projects">
        {projects.map((project) => <ProjectCard project={project} key={project.repo} />)}
      </section>
      <section className="contact-banner" data-reveal><div><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let’s make something<br />meaningful.</h2></div><Link className="button button-primary" to="/contact">Contact me <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
