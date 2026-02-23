import "./Body.css";
import FeatureCards from "./FeatureCards";
import profilePhoto from "../../Profile Photo.png";

const Body = () => {
  return (
    <main className="page-body" id="about">
      <section className="about-hero" id="intro">
        <div className="hero-copy">
          <p className="eyebrow">About Me</p>
          <h2>Frontend Developer building clean and useful web products</h2>
          <p>
            I am a portfolio-focused developer who turns product ideas into
            responsive, accessible, and maintainable web experiences.
          </p>
          <a className="hero-cta" href="/contact">Let&apos;s Work Together</a>
          <div className="hero-links">
            <span>GitHub</span>
            <span>LinkedIn</span>
            <span>Upwork</span>
          </div>
        </div>
        <img className="profile-photo" src={profilePhoto} alt="Profile" />
      </section>

      <section className="about-summary">
        <article className="about-tile">
          <h3>What I Do</h3>
          <p>
            I design and build modern interfaces using React, JavaScript, and
            scalable CSS architecture.
          </p>
        </article>
        <article className="about-tile">
          <h3>How I Work</h3>
          <p>
            I focus on clear communication, clean code, and measurable outcomes
            so projects ship faster and stay easy to maintain.
          </p>
        </article>
        <article className="about-tile">
          <h3>Tech Stack</h3>
          <p>
            React, Vite, Node.js, REST APIs, component-driven UI, and responsive
            design systems.
          </p>
        </article>
      </section>

      <section className="skills-section">
        <p className="eyebrow">Skills</p>
        <h2>Core capabilities</h2>
        <div className="skills-grid">
          <article className="skill-card">
            <h3>Frontend</h3>
            <ul>
              <li>React</li>
              <li>JavaScript (ES6+)</li>
              <li>Vite</li>
            </ul>
          </article>
          <article className="skill-card">
            <h3>UI & Styling</h3>
            <ul>
              <li>Responsive Design</li>
              <li>CSS Architecture</li>
              <li>Accessibility</li>
            </ul>
          </article>
          <article className="skill-card">
            <h3>Backend & Tools</h3>
            <ul>
              <li>Node.js</li>
              <li>REST APIs</li>
              <li>Git Workflow</li>
            </ul>
          </article>
        </div>
      </section>

      <FeatureCards />

    </main>
  );
};

export default Body;
