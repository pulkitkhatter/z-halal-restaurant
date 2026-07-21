import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetDirectionsButton } from "../components/GetDirectionsButton";
import { GoogleMapEmbed } from "../components/GoogleMapEmbed";
import { ReviewsWidget } from "../components/ReviewsWidget";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { api, type MenuItem, type SiteSettings } from "../lib/api";
import {
  BUSINESS,
  CATEGORY_IMAGES,
  FALLBACK_CATEGORY_IMAGE,
  HOW_IT_WORKS,
  TAGLINE_OPTIONS,
  TRUST_BADGES,
} from "../lib/content";
import { Seo } from "../seo/Seo";

function dishImage(dish: MenuItem): string {
  return dish.imageUrl || CATEGORY_IMAGES[dish.category] || FALLBACK_CATEGORY_IMAGE;
}

export function Home() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [favorites, setFavorites] = useState<MenuItem[]>([]);

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => setSettings(null));
    api
      .getMenu()
      .then((items) => setFavorites(items.filter((item) => item.isPopular)))
      .catch(() => setFavorites([]));
  }, []);

  const tagline = settings?.tagline ?? TAGLINE_OPTIONS[0];
  const heroImage = settings?.heroImageUrl || "/images/hero-steam-table.jpg";

  return (
    <>
      <Seo
        title="Halal Restaurant Bed-Stuy Brooklyn | Z Halal Restaurant"
        description="Z Halal Restaurant is a West African halal steam table buffet in Bed-Stuy, Brooklyn — fresh Senegalese dishes, priced by the pound, open 9am–1am daily."
        path="/"
      />

      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <img
            src="/images/logo-web.png"
            alt="Z Halal Restaurant"
            className="hero-logo-badge"
          />
          <h1>{BUSINESS.name}</h1>
          <span className="hero-divider" aria-hidden="true" />
          <p className="tagline">{tagline}</p>
          <div className="cta-row">
            <WhatsAppButton label="Chat on WhatsApp" />
            <GetDirectionsButton />
          </div>
        </div>
      </section>

      <section className="container section">
        <h2>How It Works</h2>
        <p>New to a steam table buffet? It's simple:</p>
        <ol className="how-it-works">
          {HOW_IT_WORKS.map((item) => (
            <li key={item.step}>
              <span className="step-number">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {favorites.length > 0 && (
        <section className="container section">
          <h2>Fan Favorites</h2>
          <p>The dishes everyone comes back for.</p>
          <div className="dish-grid">
            {favorites.map((dish) => (
              <Link to="/menu" className="dish-card fan-favorite-card" key={dish.id}>
                <div className="dish-card-image">
                  <img src={dishImage(dish)} alt={dish.name} loading="lazy" />
                </div>
                <div className="dish-card-body">
                  <h3>{dish.name}</h3>
                  {dish.description && (
                    <p className="dish-description">{dish.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container section">
        <div className="trust-badges">
          {TRUST_BADGES.map((badge) => (
            <div className="trust-badge" key={badge.title}>
              <span className="trust-badge-icon" aria-hidden="true">
                {badge.icon}
              </span>
              <h3>{badge.title}</h3>
              <p>{badge.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2>Find Us</h2>
        <p>{BUSINESS.address}</p>
        <GoogleMapEmbed />
      </section>

      <ReviewsWidget show={settings?.showReviewsWidget ?? false} />
    </>
  );
}
