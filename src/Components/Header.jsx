import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainPageLink = "/";
  const blogLink = "/blogs";
  const contactLink = "/contact";
  const supportLink = "/support";

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <h1 className="brand">My App</h1>
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
          <a href={mainPageLink} onClick={closeMenu}>Home</a>
          <a href={blogLink} onClick={closeMenu}>Blogs</a>
          <a href={contactLink} onClick={closeMenu}>Contact</a>
          <a href={supportLink} onClick={closeMenu}>Support</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
