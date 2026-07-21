import { Link } from "react-router-dom";
import { BUSINESS } from "../lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/images/logo-web.png" alt="Z Halal Restaurant" className="footer-logo" />
          <div>
            <p>{BUSINESS.address}</p>
            <p>
              <a href={BUSINESS.phoneTel}>{BUSINESS.phoneDisplay}</a>
            </p>
            <p>{BUSINESS.hours}</p>
          </div>
        </div>
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
