import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Seo } from "../seo/Seo";

export function Cart() {
  const { lines, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container section cart-page">
      <Seo
        title="Your Cart | Z Halal Restaurant"
        description="Review your order before checkout."
        path="/cart"
      />
      <h1>Your Cart</h1>

      {lines.length === 0 && (
        <p>
          Your cart is empty. <Link to="/menu">Browse the menu</Link> to add dishes.
        </p>
      )}

      {lines.length > 0 && (
        <>
          <div className="cart-lines">
            {lines.map((line) => (
              <div className="cart-line" key={line.key}>
                <div className="cart-line-info">
                  <strong>{line.dishName}</strong>
                  <span className="cart-line-size">
                    {line.size === "SMALL" ? "Small" : "Large"}
                  </span>
                </div>
                <div className="quantity-stepper">
                  <button
                    type="button"
                    aria-label={`Decrease ${line.dishName} quantity`}
                    onClick={() => updateQuantity(line.key, line.quantity - 1)}
                  >
                    −
                  </button>
                  <span>{line.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${line.dishName} quantity`}
                    onClick={() => updateQuantity(line.key, line.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-small"
                  onClick={() => removeItem(line.key)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button type="button" className="btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
