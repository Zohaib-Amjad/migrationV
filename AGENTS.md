# AGENTS.md — HOF Migration

Agent-facing project map and workflow. Keep this file accurate when architecture or conventions change.

---

## What this project is

Marketing site for **HOF Migration** (visa / immigration consultancy).

- Public Next.js App Router site + embedded **Payload CMS 3** admin at `/admin`
- Postgres via Supabase (DB only — no Supabase Auth/Storage/RLS)
- Content: pages, blog, case studies, FAQs, testimonials, services, contact form submissions
- Package manager: **pnpm**

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| CMS | Payload 3 (`@payloadcms/next`, Lexical rich text) |
| DB | PostgreSQL (`@payloadcms/db-postgres`) |
| UI | React 19, Tailwind 4, shadcn-style primitives |
| Media | Local disk `/media` for now |

---

## Repo layout (what matters)

```
hof-migration-website/  # Original reference source bundle
src/
├── app/(frontend)/     # Public routes — build features here
├── app/(payload)/      # Admin + API — avoid hand-edits
├── collections/        # Payload schemas
├── globals/            # Header, Footer, Site Settings
├── blocks/             # Page builder block configs
├── components/         # Shared UI (Navbar, Footer, PlaneWindow, ConsultationForm, I18nProvider, etc.)
├── data/               # site-content.ts (centralized services, team, stories, FAQs data)
├── styles/             # Modular CSS stylesheets ported from design bundle
├── lib/                # cms.ts, i18n.ts, media.ts, payload-client, utils
└── payload.config.ts
public/
└── assets/             # Active production images, icons, and SVG assets
```

- `(frontend)` / `(payload)` are route groups (not URL segments).
- CMS data fetched via `src/lib/cms.ts`; fallback/hardcoded marketing copy sourced from `src/data/site-content.ts`.
- All static reference materials from `hof-migration-website-complete` are preserved in `hof-migration-website/`.

---

## Public site map (current)

| Route | Notes |
|-------|--------|
| `/` | Homepage (`HomePageClient.tsx` + server `page.tsx`) with Airplane Window hero, Services pillars, Reviews, FAQs, Consultation form, and Typewriter feedback |
| `/about` | About page with animated brandmark, leadership, and core team profiles |
| `/services` | Five Pillars of Migration overview |
| `/services/[slug]` | Dedicated service pillar detail pages (`skilled-migration`, `study-abroad`, `family-sponsorship`, `usa-visas`, `europe-visas`) |
| `/success-stories`, `/success-stories/[slug]` | Client journey stories & case studies (`ahmed`, `priya`, `omar`, `fatima`) |
| `/team/[slug]` | Team member dynamic profile pages for 10 leadership and core team members |
| `/branding` | Visual identity & branding guidelines page |
| `/contact` | Global offices, callback consultation form, and contact info |
| `/privacy-policy`, `/terms`, `/cookies` | Legal & policy pages |
| `/admin` | Payload admin |
| `/api/*` | Payload REST & form submission APIs |

Legacy routes (`/destinations/*`, `/visa-types/*`, `/case-studies/*`) are redirected cleanly to `/services` and `/success-stories` via `next.config.ts`.

---

## CMS workflow

1. Content lives in Payload collections/globals (`/admin`).
2. Frontend Server Components fetch via `getPayload` helpers in `src/lib/cms.ts`.
3. FAQs are **page-scoped** — `getFaqs` matches the exact `page` field so Home FAQs do not leak onto other pages.
4. Contact form → **Form Submissions**; newsletter → **Newsletter Subscriptions**.
5. After schema changes: `pnpm generate:types` (and `pnpm generate:importmap` if admin UI components change).

Do **not**: enable Supabase Auth/RLS, hand-run SQL migrations, or hardcode copy that belongs in Payload (except intentional static destination/fallback data).

---

## Coding conventions

- Match existing patterns in nearby files (Tailwind scales, section components, client vs server split).
- Absolute public assets under `/images/...` (relative `images/` breaks on nested routes).
- Prefer editing existing components over new abstractions.
- Do not commit unless the user asks.

---

## Required completion workflow

After **every** coding task (unless user says skip):

1. `pnpm lint` — fix introduced errors.
2. `pnpm run build` — must succeed.
3. Update this `AGENTS.md` if routes, CMS wiring, or major architecture changed.

Commands:

```bash
pnpm lint
pnpm run build
pnpm dev                 # local: site :3000, admin :3000/admin
pnpm generate:types
pnpm generate:importmap
```

---

## Git / PR notes

- Commit only when the user asks.
- Push may fail if remote is ahead — pull/rebase first, then push.
- Prefer small, focused diffs; leave unrelated dirty files alone.

---

## Known product decisions (do not regress)

- Destinations hub removed; `/destinations` → USA.
- Destination detail pages share one template parameterized by `destination-details` data.
- Home FAQ set is separate from other-page FAQ fallbacks.
- Site Settings exist in Payload; frontend metadata may still be hardcoded in `layout.tsx` until wired.
- Automated Arabic localization engine: `I18nProvider.tsx` runs a 5-tier translation pipeline (exact dictionary, normalized lookup, delimiter decomposition, greedy substring matching, and `AR_WORD_DICTIONARY` regex token fallback) with memory caching. Any newly introduced English content is automatically translated into Arabic when the Arabic toggle is active.
- Hero consultants team photo: `.people-band` and `.people-band__wrap img` use responsive scaling (`max-width: min(100%, 540px)`, `aspect-ratio: 2200 / 625`, `object-fit: contain`) on screens `<= 900px` so every team member is fully visible on mobile viewports without left/right cropping.
- Language toggle: Navbar button renders `"العربية"` in Arabic script when in English mode, and `"English"` when in Arabic mode.
- Service detail pages logo center line: On `/services/[slug]`, the center vertical line (stem/trunk) of the navbar brandmark logo dynamically takes the exact background color of Section 1 (`svc.tint`), while all radiating fronds and the wordmark remain solid black (`#000000`). On non-service pages, it retains the brand sage color `#8DABA4`.
- Mobile navigation drawer: Redesigned with a luxury card-based services accordion, crisp high-contrast "5 services" badge, soft colored icon avatars, arrow indicators, and unified spacing.
- Theme-aware button hover & click interactions: All buttons (`.btn`, `.btn--panel`, `.btn--white`, `.btn--dark`, `.nav__icon-btn`, `.nav__lang`, `.nav__hamburger`, `.nav__drawer-accordion-btn`, `.service-card__link`, `.reviews__arrow`, `.stories__play`, `.footer__subscribe`, `.faq-item__question`) implement cubic-bezier elevation lift and theme-tinted glow shadows on hover, combined with immediate tactile physical press compression (`transform: translateY(1.5px) scale(0.96-0.97)`) on click (:active), dynamically harmonized with each page's specific theme accent (`--page-theme-accent` / `--svc-accent` / `--card-accent`).
