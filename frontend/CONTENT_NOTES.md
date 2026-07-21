# Content Notes — Z Halal Restaurant

Placeholders and pending items from the Contractor Project Brief. Everything
marked "editable in /admin" can be updated by logging into `/admin` — no code
changes needed.

## Pending from Blast

| Item | Current placeholder | Where |
|---|---|---|
| Price per pound | `[PRICE]/lb` | Menu page — editable in /admin under "Price per pound label" |
| Halal certifying body name | Generic "pending" text | Menu page — editable in /admin under "Halal certification text" |
| Real photos | Self-hosted stock photos (`public/images/`) of a steam-table rice dish and a rice/skewer/fish spread, both halal-appropriate (no pork/alcohol) | Home hero + Menu page |
| Social media handles | Not created — out of scope for this build | — |
| Google Reviews widget (EmbedSocial/Elfsight) | Hidden by default (`SiteSettings.showReviewsWidget = false`) | Turn on in /admin once Blast supplies a widget embed; paste the embed code into `src/components/ReviewsWidget.tsx` |
| GA4 | Not installed — needs Blast's Google account (cgaye6527@gmail.com) and a measurement ID | Set `VITE_GA_MEASUREMENT_ID` in `frontend/.env` once available (see `frontend/.env.example`) |
| Logo | Live — real logo supplied, in use in header/footer/hero/favicon | See "Logo assets" below |

## Taglines (brief Section 5 — pick one for Blast)

1. "Authentic West African flavors, fresh daily." *(currently live)*
2. "Your halal buffet, your neighborhood."
3. "From Senegal to Bed-Stuy — taste it fresh."

All three are defined in `src/lib/content.ts` (`TAGLINE_OPTIONS`). The live one is
stored in the database (`SiteSettings.tagline`) and editable from `/admin`.

## Language

English only, per the brief. No French toggle is built. If a language toggle is
added later, the natural approach is to add a `locale` param to the content API
and duplicate `SiteSettings`/`MenuItem` text fields per locale — not built now
since Bamba has no French content yet.

## Catering

No dedicated catering page — a WhatsApp CTA on the Menu page is sufficient per
the brief.

## Logo assets

The supplied logo (`frontend/brand-assets/logo-original.png`) had an opaque
white background. I generated a transparent cutout via a border-flood-fill
(so the white "HALAL" seal text and letterform counters stayed intact) and
derived the assets actually used on the site:

- `public/images/logo-web.png` — transparent, web-optimized (~500px, ~39KB),
  used in the header, footer, and hero badge.
- `public/favicon-16.png` / `favicon-32.png` / `favicon-48.png` / `apple-touch-icon.png`
  — generated from a square crop of the badge (ring + Z + wordmark).
- `frontend/brand-assets/` holds the full-resolution originals (not served by
  the site) in case a designer needs the source files later — including a
  1382×1382 square crop that also satisfies the brief's 400×400 WhatsApp
  profile photo requirement.

## Menu photos & diet labels

Each dish has a photo (falls back to a category photo — Rice Dishes / Stews &
Sauces / Sides — if a dish doesn't have its own yet), a short description, and
a Veg / Non-Veg / Contains Egg badge. All three are editable per dish in
`/admin`. Photos for the 4 "Most Popular" dishes (Tiebou Dieun, Tiebou Yapp,
Mafe, Soup Kandia) are unique; everything else currently uses its category's
photo until Blast sends real photos or an admin uploads dish-specific ones.

Diet classification was assigned by typical recipe knowledge for each dish
(e.g. fish/meat-based dishes = Non-Veg, bean/millet/pasta sides = Veg). None of
the current 17 dishes were tagged "Contains Egg" — I don't have confirmation
any current recipe includes egg, so I didn't want to assert that speculatively.
The category is fully wired up (schema, admin dropdown, menu badge) so it's
ready the moment a dish that includes egg (e.g. a boiled-egg garnish) is
added or confirmed.
