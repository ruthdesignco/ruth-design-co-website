# AGENTS.md — Aubergine (`@lexington/aubergine`)

**Aubergine** is a multipage Astro theme for agencies and SaaS-style marketing sites: a long-form landing homepage (hero, services, work preview, pricing, testimonials, CTA), plus blog, case studies (“work”), services detail pages, team bios, legal pages, a mini design-system section under `/system/*`, and sign-in / sign-up screens. Use it when you need a polished marketing site with content-driven case studies and posts.

## Tech stack

| Area | Details |
|------|---------|
| Framework | **Astro** `^6.0.2` |
| Styling | **Tailwind CSS** `^4.1.18` via **`@tailwindcss/vite`** in `astro.config.mjs` |
| Content authoring | **MDX** via `@astrojs/mdx` `^5.0.0`; Markdown posts use [`astro:content`](https://docs.astro.build/en/guides/content-collections/) + `glob` loaders in `src/content.config.ts` |
| SEO / feeds / sitemap | `@lexingtonthemes/seo` `^0.1.0`, `@astrojs/rss` `^4.0.17`, `@astrojs/sitemap` `^3.7.1` |
| Tailwind plugins (JS) | `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwind-scrollbar-hide` (wired in `src/styles/global.css` with `@plugin`) |
| Aliases | `@/*` → `src/*` (`tsconfig.json`) |

Site base URL: `site: 'https://yourdomain.com'` in `astro.config.mjs` (placeholder — replace for production).

A **`tailwind.config.cjs`** file exists in the repo (extra color names, fonts); runtime design tokens used in components largely come from **`src/styles/global.css`** (`@theme`, fonts, base/accent scales).

## Folder map

- **`src/pages/`** — File-based routes (home, blog, work, team, services, legal, `/system/*`, auth shells, `404.astro`, `rss.xml.js`).
- **`src/layouts/`** — `BaseLayout.astro`, plus `BlogLayout`, `WorkLayout`, `TeamLayout`, `ServicesLayout`, `LegalLayout`.
- **`src/components/`** — `landing/` (homepage sections), `blog/`, `work/`, `team/`, `services/`, `global/` (nav, footer, search, CTA), `assets/` (logo, header grid), **`fundations/`** (head, UI primitives, icons, script wrappers — keep this folder name as-is).
- **`src/content/`** — Markdown per collection: `posts/`, `work/`, `team/`, `services/`, `legal/`.
- **`src/styles/global.css`** — Tailwind entry, `@theme` tokens (fonts, `base-*` / `accent-*` colors, radii, shadows), Astro/Shiki code colors.
- **`src/images/`** — Images referenced from content (e.g. logos under `logos/`, brands under `brands/`). Sample content may reference other paths (e.g. `/src/images/blog/…`); add files to match or update frontmatter.
- **`public/`** — Not present in this repo.

## Content collections (`src/content.config.ts`)

All collections use `defineCollection` with `glob({ pattern: "**/*.md", base: "./src/content/<folder>" })` and Zod via `import { z } from "astro/zod"`.

### `team` → `src/content/team/`

- **Required fields:** `name`, `role`, `intro` (string), `education` (array of strings), `experience` (array of strings), `avatar: { url: image(), alt: string }`.
- **Images:** `avatar.url` must satisfy Astro’s `image()` helper (local or remote per Astro rules).
- **Template:** copy from `src/content/team/1.md`.

**URL:** `/team/<id>` where `<id>` is the entry id (e.g. `1` for `1.md`). See `src/pages/team/[...slug].astro`.

### `services` → `src/content/services/`

- **Required fields:** `service` (string), `description` (string).
- **Images:** none in schema.
- **Template:** copy from `src/content/services/web-dev.md`.

**URL:** `/services/<id>` (e.g. `web-dev`). See `src/pages/services/[...slug].astro`.

### `work` → `src/content/work/`

- **Required fields:** `launchDate` (date), `client`, `work`, `description` (strings), `logo: { url: image(), alt: string }`.
- **Images:** `logo.url` uses `image()`.
- **Template:** copy from `src/content/work/1.md`.

**URL:** `/work/<id>`. See `src/pages/work/[...slug].astro`.

### `legal` → `src/content/legal/`

- **Required fields:** `page` (string), `pubDate` (date).
- **Images:** none in schema.
- **Template:** copy from `src/content/legal/terms.md`.

**URL:** `/legal/<id>` (e.g. `terms`, `privacy`). See `src/pages/legal/[...slug].astro`.

### `posts` → `src/content/posts/`

- **Required fields:** `title`, `description`, `pubDate`, `tags` (string array), `image: { url: image(), alt: string }`.
- **Images:** `image.url` uses `image()`.
- **Template:** copy from `src/content/posts/1.md`.

**URLs:** `/blog/posts/<id>`; tag pages `/blog/tags/<tag>` and `/blog/tags/`. See `src/pages/blog/posts/[...slug].astro` and `src/pages/blog/tags/[tag].astro`.

---

If you add required fields to any Zod schema, update every layout and component that reads `entry.data` for that collection.

## Routing conventions

| Content / area | Route pattern | Notes |
|----------------|---------------|--------|
| Blog listing | `/blog` | `src/pages/blog/index.astro` |
| Blog post | `/blog/posts/[...slug]` | `params.slug` = content entry `id` |
| Blog tags | `/blog/tags`, `/blog/tags/[tag]` | Tag slug is the raw tag string from frontmatter |
| Work | `/work`, `/work/[...slug]` | Index + detail |
| Team | `/team`, `/team/[...slug]` | Index + detail |
| Services | `/services/[...slug]` | **No** `services/index.astro`; services are linked from homepage sections (`/#services`) and cards |
| Legal | `/legal/[...slug]` | e.g. `/legal/terms` |
| System UI kit | `/system/overview`, `/system/typography`, `/system/colors`, `/system/buttons`, `/system/links` | Static showcase pages |
| Auth-style pages | `/sign-in`, `/sign-up` | Uses `BaseLayout` with `hideNav` / `hideFooter` |
| RSS | `/rss.xml` | Implemented in `src/pages/rss.xml.js` via `@astrojs/rss`. The glob there is `import.meta.glob('./blog/*.{md,mdx}')` relative to `src/pages/`, while blog Markdown in this theme lives under **`src/content/posts/`** — align the RSS glob or feed source with your real post location if you need items in the feed. |
| 404 | `/404` | `src/pages/404.astro` |

**Changelog** as a route: not present in this repo (theme changelog on Lexington’s site only; see README links).

## Customization guide

- **Site URL / domain:** `astro.config.mjs` → `site`. Replace hardcoded URLs in `src/components/fundations/head/Seo.astro` props and `Meta.astro` as needed; `context.site` in RSS uses the Astro `site` config.
- **Brand colors & typography:** `src/styles/global.css` → `@theme` (`--font-sans`, `--font-display`, `--font-mono`, `--color-base-*`, `--color-accent-*`, radii, shadows). Optional overlap with `tailwind.config.cjs` for legacy class names.
- **Navigation:** `src/components/global/Navigation.astro` (`navLinks`, CTA URL).
- **Footer:** `src/components/global/Footer.astro` (system links, logo).
- **Shell / head:** `src/layouts/BaseLayout.astro` (header grid, search, nav, footer, AOS/Tilt body scripts). Global head composition: `src/components/fundations/head/BaseHead.astro` → `Seo`, `Meta`, `Fonts`, `Favicons`, Fuse.js + AOS head snippets.

## Commands

From the README (project root):

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview production build |
| `npm run astro ...` | Astro CLI |

## Guardrails

- **Do not rename** `src/components/fundations/` — the codebase and comments use this spelling; paths and imports depend on it.
- **Content schemas:** do not add or widen Zod fields without updating layouts and any component that maps `entry.data` (e.g. cards, layouts).
- **Minimal diffs:** match existing patterns (`@/` imports, `Wrapper`/`Text`/`Button` from fundations, `getCollection` + `render` in dynamic pages).
- **Images:** keep `image()`-compatible `url` values and existing `Image` usage (`astro:assets`) so dimensions and optimization keep working.

## Lexington Themes links

Same pattern as **README.md**:

- Theme specs: https://lexingtonthemes.com/templates/aubergine
- Documentation: https://lexingtonthemes.com/documentation
- Changelog: https://lexingtonthemes.com/changelog/aubergine
- Support: https://lexingtonthemes.com/legal/support/
- Bundle: https://lexingtonthemes.com
