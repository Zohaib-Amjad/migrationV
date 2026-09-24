# HOF Migration

Boilerplate for the HOF Migration company marketing website. This is a CMS-driven site for business info pages, a blog, and case studies — built so a junior developer can start adding pages and components immediately.

## What this project is

- A **marketing / company website** (Home, About, Services, Contact, Blog, Case Studies)
- **Content-managed** via Payload CMS admin panel at `/admin`
- **Non-developers** can add blog posts, case studies, and block-based pages without touching code

## What this project is NOT

- **No e-commerce** — no cart, checkout, or product catalog
- **No visitor authentication** — Payload Users are for **admin login only**
- **No dashboards or heavy custom logic** — keep it simple
- **No Supabase Auth, Storage, or RLS** — Supabase is only the Postgres host

---

## Tech stack

| Tool | Role |
|------|------|
| **Next.js 15** | React framework; App Router serves the public site and Payload admin |
| **Payload CMS 3.x** | Headless CMS embedded in the Next.js app; admin panel + content API |
| **PostgreSQL (Supabase)** | Database host; Payload uses `@payloadcms/db-postgres` with a connection string |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Accessible UI primitives (`button`, `card`, `input`, `textarea`) |
| **Lexical** | Payload's default rich text editor for blog/case study content |
| **Local disk (`/media`)** | Media uploads stored on disk for now (S3 comes later) |

---

## Running locally

### 1. Prerequisites

- Node.js 20+
- pnpm 9+
- A Supabase project (for Postgres only)

### 2. Environment variables

Copy the example env file and fill in values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URI` | Supabase Postgres connection string (see below) |
| `PAYLOAD_SECRET` | Random secret string for Payload (use a long random value) |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the app (e.g. `http://localhost:3000`) |

**Getting a Supabase Postgres connection string:**

1. Open your [Supabase](https://supabase.com) project
2. Go to **Settings → Database**
3. Under **Connection string**, choose **URI**
4. Copy the string and replace `[YOUR-PASSWORD]` with your database password
5. For remote connections, append `?sslmode=require` if needed

Use the **direct Postgres** connection string. Do **not** enable Supabase Auth, Storage, or RLS for this project.

### 3. Install and run

```bash
pnpm install
pnpm dev
```

- **Public site:** http://localhost:3000
- **Admin panel:** http://localhost:3000/admin

On first visit to `/admin`, create an admin user (Payload will prompt you).

---

## Folder structure

```
src/
├── app/
│   ├── (frontend)/          # Public website routes — YOU build here
│   │   ├── layout.tsx       # Navbar + Footer wrapper
│   │   ├── page.tsx         # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   ├── blog/
│   │   ├── case-studies/
│   │   └── contact/
│   └── (payload)/           # Payload admin + API — DO NOT edit manually
│       ├── admin/
│       └── api/
├── collections/             # Data models (FAQs, Testimonials, Services, Insights, Posts, Forms, Media…)
├── globals/                 # Site-wide singletons (Header, Footer, Site Settings)
├── blocks/                  # Reusable page-builder blocks (Hero, TextImage, etc.)
├── components/              # React components (Navbar, Footer, RichText, ui/)
├── lib/                     # Utilities (cms fetch helpers, payload-client, media, cn)
└── payload.config.ts        # Payload CMS configuration
```

### Route groups: `(frontend)` vs `(payload)`

- **`(frontend)`** — Parentheses mean the folder name does **not** appear in the URL. This is where you add pages and fetch CMS content.
- **`(payload)`** — Payload's admin UI and REST API. Generated/managed by Payload; avoid editing unless you know what you're doing.

Payload uses **multiple root layouts** (one per route group), so `(frontend)/layout.tsx` owns the public site's `<html>` / `<body>`.

### Key directories

| Directory | Purpose |
|-----------|---------|
| `collections/` | Database schemas — FAQs, Testimonials, Services, Insights, Posts, Case Studies, Form Submissions, Newsletter, Media, Users |
| `globals/` | Single-instance site config — Header nav, Footer links, Site Settings |
| `blocks/` | Field configs for the Pages layout builder (Hero, TextImage, Testimonials, CTA) |
| `lib/cms.ts` | Server helpers to fetch CMS content for the frontend |
| `components/ui/` | shadcn/ui primitives |

---

## Adding content via `/admin`

All of the following support **add / edit / delete**, including **image uploads** via Media.

### Content collections

| Collection | What it powers |
|------------|----------------|
| **FAQs** | FAQ accordions (Home, Contact, Services, …) — set `page` to control where each FAQ shows |
| **Testimonials** | Client quotes + avatar images |
| **Services** | Homepage featured services (`category: featured`) and Services-page pathways (`category: pathway`) |
| **Insights** | Homepage “Immigration Insights” cards (image + link to a Post) |
| **Posts** | Blog listing (`/blog`) and post pages (`/blog/[slug]`) — set status to **Published** |
| **Case Studies** | Case study pages |
| **Media** | All images used across the site |
| **Form Submissions** | Contact form messages (view/manage only — created by the public form) |
| **Newsletter Subscriptions** | Footer newsletter signups |

### Add a blog post

1. Go to http://localhost:3000/admin and log in
2. Click **Posts** in the sidebar
3. Click **Create New**
4. Fill in: Title, Slug, Featured Image, Excerpt, Content, Status (**Published**), Published Date
5. Click **Save**

### Add a FAQ / testimonial / service / insight

1. Open the matching collection in `/admin`
2. Click **Create New**
3. Upload images through the Media field where prompted
4. Set **Order** (lower = first) and click **Save**

### Add a case study

1. Go to `/admin` → **Case Studies**
2. Click **Create New**
3. Fill in: Title, Slug, Client Name, Featured Image, Summary, Content, Results, Published Date
4. Click **Save**

### Add a page (block layout builder)

1. Go to `/admin` → **Pages**
2. Click **Create New**
3. Enter **Title** and **Slug**
4. Under **Layout**, click **Add Block** and choose: Hero, Text Image, Testimonials, or CTA
5. Fill in each block's fields
6. Click **Save**

### Forms

- Contact form → creates a row in **Form Submissions**
- Footer newsletter → creates a row in **Newsletter Subscriptions**

### Edit site-wide settings

- **Header** — logo and nav links (`/admin` → Globals → Header)
- **Footer** — columns, social links, copyright (`/admin` → Globals → Footer)
- **Site Settings** — site title, meta description, contact info (`/admin` → Globals → Site Settings)

---

## Where to build (and where not to)

### Do build here

- New pages: `src/app/(frontend)/...`
- New components: `src/components/`
- Fetching CMS data: use `src/lib/cms.ts` (or `src/lib/payload-client.ts`) in Server Components

### Do not touch (unless you know Payload internals)

- `src/app/(payload)/` — admin routes and API handlers
- `src/app/(payload)/admin/importMap.js` — auto-generated; run `pnpm generate:importmap` after admin component changes

---

## Do not do this

1. **Do not enable Supabase Auth, Storage, or RLS** — Payload manages auth and schema; Supabase is Postgres only
2. **Do not hardcode content** that should live in Payload (copy, images, nav links from globals, etc.)
3. **Do not run manual SQL migrations** in the Supabase SQL editor — Payload syncs schema via its adapter (`push: true` in dev)
4. **Do not add SEO plugins, analytics, or S3** until explicitly requested
5. **Do not put business copy in placeholder pages** — wire up CMS data when building each page

---

## Useful commands

```bash
pnpm dev                  # Start dev server
pnpm build                # Production build
pnpm generate:types       # Regenerate TypeScript types from Payload schema
pnpm generate:importmap   # Regenerate Payload admin import map
```

---

## Next steps for developers

1. Wire each `(frontend)` page to fetch content from Payload collections/globals
2. Build React components to render `Pages` layout blocks
3. Style pages with Tailwind and shadcn/ui components
4. Connect Navbar/Footer to Header and Footer globals

Placeholder pages currently show `{/* TODO: content */}` — replace with real CMS-driven UI as you build.
