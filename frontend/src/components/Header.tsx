import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" end>
          <img src="/images/logo-web.png" alt="Z Halal Restaurant" className="brand-logo" />
        </NavLink>
        <nav className="main-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
