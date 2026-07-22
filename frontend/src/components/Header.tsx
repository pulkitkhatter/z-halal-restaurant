import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function Header() {
  const { totalItems } = useCart();

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
          <NavLink to="/cart" className="cart-link">
            Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
