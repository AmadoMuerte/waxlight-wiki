# AGENTS.md — Waxlight Wiki

Rules for coding agents working on this repository.

## Content

- **Markdown is the preferred content format.** Normal pages are `.md` files under `src/content/docs/<lang>/`. Use MDX only when richer presentation genuinely needs components (the homepage `index.mdx` is the one current example).
- **One page = one `.md` file + frontmatter** (`title`, `description`, optional `sidebar.order`). Never edit routers, navigation registries, or generated files to add a page — Starlight auto-generates the sidebar, pagination, TOC, search index and sitemap.
- Internal links are absolute site paths **without** the deployment base: `/en/features/backups/`, `/ru/policies/security/`. No `.md` extensions in links, no hardcoded `/waxlight-wiki/` prefix.
- Keep EN and RU in sync: every page must exist in both languages at the same relative path.
- Prefer Starlight built-ins (asides `:::note`/`:::tip`/`:::caution`/`:::danger`, `Card`, `CardGrid`, `Tabs`, `Steps`, `FileTree`, `LinkCard`, `LinkButton`) over custom components. GitHub alert syntax (`> [!WARNING]`) is also supported.

## Design

- Preserve the Waxlight identity: dark-only theme, warm palette (night/bark/paper/copper/amber), serif headings. All visual values must come from `src/styles/tokens.css` — do not scatter raw colors or radii in components.
- Override Starlight behavior via configuration and CSS variables first; only add a component override when styling cannot achieve it, and keep overrides small (see the component table in `README.md`).
- Do not introduce a light theme; `ThemeProvider`/`ThemeSelect` overrides exist specifically to keep the site dark-only.

## Architecture constraints

- No backend services, databases, or custom search/indexing. The site is static; search is Starlight's built-in Pagefind.
- No new dependencies without justification — prefer mature Starlight plugins over custom code.
- Do not change `site`/`base` casually; both are set once in `astro.config.mjs` for GitHub Pages deployment.

## Validation (required before finishing any task)

```bash
npm run format:check
npm run check
npm run build        # fails on broken internal links (scripts/check-links.mjs is part of npm test)
```

`npm test` runs `check` + `build` + `validate:links`. A broken link or a type error means the task is not done.

## Keep out of this repository

- Generated HTML (the old `build.mjs`/`wiki-data.js` generator does not exist here)
- Launcher developer documentation that belongs to the launcher repository (see `MIGRATION.md`)
