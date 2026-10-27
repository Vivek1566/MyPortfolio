import { githubProfile, projects } from "../data/projects.js";

export default function ProjectCard({ project }) {
  const projectIndex = projects.indexOf(project);

  return (
    <article
      className={`project-card project-${project.visual}`}
      data-reveal
      style={{ "--reveal-delay": `${(projectIndex % 4) * 80}ms` }}
    >
      {/* Visual banner — scenic landscape with project tint overlay */}
      <a
        className="project-visual"
        href={`${githubProfile}/${project.repo}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${project.name} on GitHub`}
      >
        <span className="visual-index">{String(projectIndex + 1).padStart(2, "0")}</span>
        {/* Project name as the central visual element */}
        <span className="visual-project-label">{project.name}</span>
        <span className="visual-caption">{project.category}</span>
        <span className="visual-arrow" aria-hidden="true">↗</span>
      </a>

      {/* Text content */}
      <div className="project-content">
        <p className="project-category">{project.category}</p>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        <ul className="tag-list" aria-label="Technologies and themes">
          {project.stack.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="project-links">
          <a href={`${githubProfile}/${project.repo}`} target="_blank" rel="noreferrer">GitHub repository <span aria-hidden="true">↗</span></a>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </article>
  );
}
