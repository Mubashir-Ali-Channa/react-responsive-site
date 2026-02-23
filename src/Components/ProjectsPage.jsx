import "./Body.css";

const projects = [
  {
    id: 1,
    name: "Portfolio Website",
    summary:
      "A fast personal website to showcase profile, services, and selected work.",
    stack: "React, Vite, CSS",
  },
  {
    id: 2,
    name: "Restaurant Ordering UI",
    summary:
      "Responsive ordering flow with menu categories, cart actions, and checkout preview.",
    stack: "React, Context API",
  },
  {
    id: 3,
    name: "Support Dashboard",
    summary:
      "Internal dashboard for tracking support tickets and agent productivity.",
    stack: "React, Node.js, REST API",
  },
  {
    id: 4,
    name: "Learning Platform UI",
    summary:
      "Course listing and lesson navigation optimized for desktop and mobile learners.",
    stack: "React, CSS Modules",
  },
];

const ProjectsPage = () => {
  return (
    <main className="page-body">
      <section className="projects-section">
        <p className="eyebrow">Projects</p>
        <h2>Selected portfolio work</h2>
        <p className="section-intro">
          A snapshot of recent builds that focus on usability, performance, and
          maintainable code.
        </p>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <span className="project-stack">{project.stack}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
