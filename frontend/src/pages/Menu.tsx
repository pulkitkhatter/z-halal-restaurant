import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DishCard } from "../components/DishCard";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useCart } from "../context/CartContext";
import { api, type MenuItem, type SiteSettings } from "../lib/api";
import { CATEGORY_IMAGES, FALLBACK_CATEGORY_IMAGE } from "../lib/content";
import { Seo } from "../seo/Seo";

function groupByCategory(items: MenuItem[]): Map<string, MenuItem[]> {
  const map = new Map<string, MenuItem[]>();
  for (const item of items) {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  }
  return map;
}

function dishImage(dish: MenuItem): string {
  return dish.imageUrl || CATEGORY_IMAGES[dish.category] || FALLBACK_CATEGORY_IMAGE;
}

export function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { totalItems } = useCart();

  useEffect(() => {
    Promise.all([api.getMenu(), api.getSettings()])
      .then(([menuItems, siteSettings]) => {
        setItems(menuItems);
        setSettings(siteSettings);
      })
      .catch(() => {
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const grouped = groupByCategory(items);
  const smallPlatePrice = settings?.smallPlatePrice ?? "$10";
  const largePlatePrice = settings?.largePlatePrice ?? "$15";
  const halalCertText =
    settings?.halalCertText ??
    "Halal certification details pending — certifying body to be confirmed.";

  return (
    <div className="container section">
      <Seo
        title="Menu — Z Halal Restaurant | Halal Steam Table Bed-Stuy Brooklyn"
        description="Daily-changing West African steam table buffet at Z Halal Restaurant — Senegalese rice dishes, stews, and sides. Small plate $10, large plate $15."
        path="/menu"
      />

      <h1>What We Serve</h1>
      <img
        src="/images/menu-spread.jpg"
        alt="A spread of West African rice dishes"
        className="menu-hero-image"
      />
      <p>
        Our steam table buffet changes daily — self-serve, any dish, any
        combination. Small plate {smallPlatePrice}, large plate{" "}
        {largePlatePrice}. Selection varies daily — come in to see what's
        freshest.
      </p>

      {loading && <p>Loading menu…</p>}

      {!loading && items.length === 0 && (
        <p>Menu is being updated — check back shortly, or ask us on WhatsApp.</p>
      )}

      {[...grouped.entries()].map(([category, dishes]) => (
        <section key={category} className="menu-category">
          <h2>{category}</h2>
          <div className="dish-grid">
            {dishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                image={dishImage(dish)}
                smallPlatePrice={smallPlatePrice}
                largePlatePrice={largePlatePrice}
              />
            ))}
          </div>
        </section>
      ))}

      {totalItems > 0 && (
        <div className="menu-cart-cta">
          <Link to="/cart" className="btn">
            View Cart ({totalItems})
          </Link>
        </div>
      )}

      <p className="halal-note">{halalCertText}</p>

      <div className="catering-cta">
        <p>Planning an event? Message us on WhatsApp for catering.</p>
        <WhatsAppButton
          label="Ask About Catering"
          message="Hi! I'd like to ask about catering."
        />
      </div>
    </div>
  );
}
