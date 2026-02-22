import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© 2026 My App. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/blogs">Blogs</a>
          <a href="/contact">Contact</a>
          <a href="/support">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
