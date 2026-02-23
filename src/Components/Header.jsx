import { useState } from "react";
import "./Header.css";

const Header = ({ theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const aboutLink = "/";
  const servicesLink = "/services";
  const projectsLink = "/projects";
  const contactLink = "/contact";
  const supportLink = "/support";

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <h1 className="brand">My Portfolio</h1>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-nav"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
          <span className="sr-only">Toggle menu</span>
        </button>

        <nav className={`header-nav ${isMenuOpen ? "is-open" : ""}`} id="primary-nav">
          <a href={aboutLink} onClick={closeMenu}>About</a>
          <a href={servicesLink} onClick={closeMenu}>Services</a>
          <a href={projectsLink} onClick={closeMenu}>Projects</a>
          <a href={contactLink} onClick={closeMenu}>Contact</a>
          <a href={supportLink} onClick={closeMenu}>Support</a>
          <button type="button" className="theme-toggle" onClick={onToggleTheme}>
            {theme === "dark" ? "Light" : "Dark"} mode
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
