import { Helmet } from "react-helmet-async";
import { BUSINESS } from "../lib/content";

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

const SITE_URL = "https://zhalalrestaurant.com"; // placeholder — update once the real domain is live

export function Seo({ title, description, path }: SeoProps) {
  const url = `${SITE_URL}${path}`;

  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1168 Fulton St",
      addressLocality: "Brooklyn",
      addressRegion: "NY",
      postalCode: "11216",
      addressCountry: "US",
    },
    telephone: BUSINESS.phoneDisplay,
    servesCuisine: "West African",
    priceRange: "$",
    openingHours: "Mo-Su 09:00-01:00",
    url: SITE_URL,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <script type="application/ld+json">
        {JSON.stringify(restaurantSchema)}
      </script>
    </Helmet>
  );
}
