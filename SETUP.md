# Setup — Z Halal Restaurant

## 1. Create a Supabase project

1. Go to https://supabase.com, sign in / sign up, and create a new project
   (any name, e.g. "z-halal-restaurant"). Save the database password you set —
   you'll need it for the connection string.
2. **Connection string** (for `backend/.env` → `DATABASE_URL`): in the
   project, go to **Project Settings → Database → Connection string**, select
   the **"Transaction pooler"** tab (port 6543), copy it, and replace
   `[YOUR-PASSWORD]` with the database password from step 1.
3. **API keys** (for `backend/.env` → `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`):
   go to **Project Settings → API**. Copy the **Project URL** and the
   **service_role** secret key (not the `anon` key — the service role key is
   needed for the admin image-upload endpoint to write to storage).
4. **Storage bucket**: go to **Storage**, create a new bucket named
   `site-images`, and set it to **Public** (so uploaded hero/menu photos are
   viewable on the site without extra signed-URL logic).

## 2. Configure the backend

```bash
cd backend
cp .env.example .env
```

Fill in `backend/.env`:
- `DATABASE_URL` — the pooled connection string from step 1.2
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — from step 1.3
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — whatever you want your `/admin` login to be
- `JWT_SECRET` — generate one: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- `FRONTEND_URL` — `http://localhost:5173` for local dev

Then run:

```bash
npm install
npm run prisma:migrate   # creates the tables in Supabase
npm run seed             # creates your admin login + seeds the menu
npm run dev              # starts the API on http://localhost:4000
```

## 3. Configure the frontend

```bash
cd frontend
cp .env.example .env     # VITE_API_URL defaults to http://localhost:4000
npm install
npm run dev              # starts the site on http://localhost:5173
```

Visit `/admin/login` to log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you
set above and manage the menu, tagline, price/lb, halal cert text, and hero
photo.

## 4. Before going live

See `frontend/CONTENT_NOTES.md` for everything still marked as a placeholder
(price/lb, halal cert body, real photos, logo, reviews widget, GA4) — these
need Blast's input before launch, per the contractor brief's "do not launch
without written approval" rule.
