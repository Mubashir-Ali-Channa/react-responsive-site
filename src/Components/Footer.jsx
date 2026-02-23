import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© 2026 My Portfolio. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">About</a>
          <a href="/services">Services</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
          <a href="/support">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
