# Waxlight Wiki

The standalone documentation website for [Waxlight](https://github.com/AmadoMuerte/Waxlight-launcher) — an independent open-source launcher for Vintage Story.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build), styled with the Waxlight design system (dark warm palette, serif headings), and deployed automatically to GitHub Pages.

## Requirements

- Node.js 22+ (npm 10+)

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:4321)
```

Production build and preview:

```bash
npm run build     # static build into dist/ (includes Pagefind search index)
npm run preview   # serve the built site locally
```

Validation scripts:

```bash
npm run check           # TypeScript/Astro type checking (astro check)
npm run validate:links  # broken internal link/anchor check over the built site
npm run format          # auto-format with Prettier
npm run format:check    # verify formatting
npm run test            # check + build + validate:links
```

## Project structure

```text
src/
├── assets/                  # logo and documentation screenshots (WebP)
├── components/              # small Starlight overrides (see below)
├── content/
│   ├── docs/                # the wiki itself
│   │   ├── en/              #   English (default locale)
│   │   │   ├── index.mdx    #     homepage (hero + cards + discord banner)
│   │   │   ├── getting-started.md
│   │   │   ├── features/    #     accounts, game-versions, instances, mods, …
│   │   │   ├── policies/    #     privacy, security, code-signing
│   │   │   ├── faq.md / documents.md / development.md
│   │   └── ru/              # Russian mirror of the same tree
│   └── i18n/                # UI strings (en.json, ru.json)
├── pages/                   # custom 404 page (with legacy URL redirects)
└── styles/                  # Waxlight design tokens + Starlight theme
scripts/
└── check-links.mjs          # internal link validation for the built site
public/
└── robots.txt, waxlight.png
```

## Adding a page

A normal documentation page is just a Markdown file:

```markdown
---
title: Installing Mods
description: Learn how to install and manage Vintage Story mods with Waxlight.
---

# Installing Mods

…
```

1. Create the file: `src/content/docs/en/some/section.md`
2. Mirror it in Russian: `src/content/docs/ru/some/section.md`
3. Commit.

That's it. The sidebar, pagination, search index, sitemap and table of contents are generated automatically. Use `sidebar.order` in frontmatter to control sorting; the homepage feature/policy cards read titles and descriptions from the section pages, so they never drift.

Internal links use absolute site paths without the deployment base:

```markdown
See [Backups](/en/features/backups/) and [Security](/en/policies/security/).
```

Useful Markdown features (all built-in):

- Starlight asides: `:::note`, `:::tip`, `:::caution`, `:::danger`
- GitHub alert syntax is also supported: `> [!WARNING] …` (converted by `starlight-github-alerts`)
- Starlight components in MDX: `Card`, `CardGrid`, `Tabs`, `TabItem`, `Steps`, `FileTree`, `LinkCard`, `LinkButton`, `Badge`
- Code blocks with Expressive Code, clickable image zoom (`starlight-image-zoom`)

## Adding an image

1. Place the optimized image in `src/assets/` (WebP recommended; keep the file size reasonable).
2. Reference it from Markdown with a relative path (Astro processes and optimizes it):

```markdown
![Accounts & sign-in in Waxlight](../../assets/screenshots/accounts.webp)
```

## Adding a translation

UI chrome strings live in `src/content/i18n/en.json` (and `ru.json`); page content lives in `src/content/docs/<lang>/`. To add a new language:

1. Add the locale to `locales` in `astro.config.mjs`.
2. Add `src/content/i18n/<lang>.json` with the `waxlight.*` keys.
3. Create `src/content/docs/<lang>/` mirroring the default locale's tree.

Starlight handles routing, the language switcher, `<html lang>`, and hreflang automatically. Untranslated pages fall back to English.

## Build and deployment

`npm run build` produces a fully static site in `dist/`. GitHub Actions deploys it to GitHub Pages on every push to `main`:

- `.github/workflows/deploy.yml` — builds and deploys to Pages.
- `.github/workflows/ci.yml` — runs on PRs: `format:check`, `astro check`, build (with internal link validation). A broken wiki link fails CI.

The production URL is configured in one place: `site` and `base` in `astro.config.mjs`.

## Custom components

Small Starlight overrides live in `src/components/`. Each one exists for a concrete reason:

| Component                                                           | Why                                                                                             |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `Header.astro`                                                      | Waxlight header: action links (Discord, Support, GitHub, Download) + search + language switcher |
| `Footer.astro`                                                      | The original four-column Waxlight footer                                                        |
| `ThemeProvider.astro`                                               | Forces the dark theme (the original Wiki is dark-only)                                          |
| `ThemeSelect.astro`                                                 | Renders nothing — hides Starlight's theme switcher                                              |
| `PageTitle.astro`                                                   | Hides the default page title on the homepage (hero renders its own `<h1>`)                      |
| `WaxlightHero.astro` / `DiscordBanner.astro` / `SectionCards.astro` | Homepage hero, Discord banner, auto-updating card grids                                         |

## License

Content and site: GPL-3.0 (matching the Waxlight project). See `LICENSE`.
