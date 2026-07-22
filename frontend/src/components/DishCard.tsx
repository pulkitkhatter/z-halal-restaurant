import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { MenuItem, PlateSize } from "../lib/api";
import { DietBadge } from "./DietBadge";

interface Props {
  dish: MenuItem;
  image: string;
  smallPlatePrice: string;
  largePlatePrice: string;
}

export function DishCard({ dish, image, smallPlatePrice, largePlatePrice }: Props) {
  const { addItem } = useCart();
  const [size, setSize] = useState<PlateSize>("SMALL");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(dish.name, size, quantity);
    setQuantity(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="dish-card">
      <div className="dish-card-image">
        <img src={image} alt={dish.name} loading="lazy" />
        {dish.isPopular && <span className="badge dish-card-ribbon">Most Popular</span>}
      </div>
      <div className="dish-card-body">
        <div className="dish-card-header">
          <h3>{dish.name}</h3>
          <DietBadge dietType={dish.dietType} />
        </div>
        {dish.description && <p className="dish-description">{dish.description}</p>}

        <div className="dish-card-order">
          <div className="size-selector" role="radiogroup" aria-label={`${dish.name} plate size`}>
            <button
              type="button"
              role="radio"
              aria-checked={size === "SMALL"}
              className={`size-option ${size === "SMALL" ? "size-option-active" : ""}`}
              onClick={() => setSize("SMALL")}
            >
              Small · {smallPlatePrice}
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={size === "LARGE"}
              className={`size-option ${size === "LARGE" ? "size-option-active" : ""}`}
              onClick={() => setSize("LARGE")}
            >
              Large · {largePlatePrice}
            </button>
          </div>

          <div className="dish-card-order-row">
            <div className="quantity-stepper">
              <button
                type="button"
                aria-label={`Decrease ${dish.name} quantity`}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label={`Increase ${dish.name} quantity`}
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button type="button" className="btn btn-small" onClick={handleAdd}>
              {added ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
