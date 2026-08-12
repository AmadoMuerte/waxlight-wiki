# Migration from the launcher repository

This document describes how the old Waxlight Wiki (served from the `docs/` folder of `AmadoMuerte/Waxlight-launcher` GitHub Pages) was migrated into the standalone `AmadoMuerte/waxlight-wiki` repository, what changed, and what still needs manual work.

## Old site → new site

Old Wiki (launcher repo, GitHub Pages): `https://amadomuerte.github.io/Waxlight-launcher/`

New Wiki (standalone repo): `https://amadomuerte.github.io/waxlight-wiki/`

URL mapping (old path → new path):

| Old URL (launcher Pages)                                          | New URL (wiki Pages)                 | Redirect   |
| ----------------------------------------------------------------- | ------------------------------------ | ---------- |
| `/Waxlight-launcher/` (language sniff redirect)                   | `/waxlight-wiki/en/`                 | manual     |
| `/Waxlight-launcher/en/`                                          | `/waxlight-wiki/en/`                 | 404 script |
| `/Waxlight-launcher/ru/`                                          | `/waxlight-wiki/ru/`                 | 404 script |
| `/Waxlight-launcher/en/<page>.html` (e.g. `getting-started.html`) | `/waxlight-wiki/en/<page>/`          | 404 script |
| `/Waxlight-launcher/ru/<page>.html`                               | `/waxlight-wiki/ru/<page>/`          | 404 script |
| `/Waxlight-launcher/en/features/<page>.html`                      | `/waxlight-wiki/en/features/<page>/` | 404 script |
| `/Waxlight-launcher/en/policies/<page>.html`                      | `/waxlight-wiki/en/policies/<page>/` | 404 script |

Redirect support: **GitHub Pages has no server-side redirects.** The new wiki ships a custom `404.html` (`src/pages/404.astro`) that JavaScript-maps legacy URLs (`/en/…`, `/ru/…`, `*.html`, trailing-slash variants) to their new locations and performs a client-side redirect. This covers users who type or bookmark old-style paths on the new site.

**Important:** the old pages are served from the _launcher_ repo's Pages site (`/Waxlight-launcher/…`). Until the launcher repo's `docs/` folder is removed, old URLs keep working there. When it is removed, those URLs will 404 on GitHub's side and the new wiki's redirect script cannot intercept them. To preserve SEO equity:

1. Point the launcher repo's Pages settings to a new minimal site (or keep `docs/` for a while) with a `404.html` that redirects to the corresponding new wiki URL using the same mapping table above.
2. Add the new site URL to the launcher README (badges/links currently point at `/Waxlight-launcher/ru.html` and `/Waxlight-launcher/en/`).
3. After Google/Bing re-crawl, the old URLs will be replaced by the new ones in the index.

## What moved

- All 16 public wiki pages per language (EN/RU) — migrated from `docs/content/{en,ru}/**` to `src/content/docs/{en,ru}/**` as plain Markdown.
- The logo (`docs/assets/waxlight.png`) → `src/assets/waxlight.png` and `public/waxlight.png` (favicon).
- Screenshots `docs/guide/guide1..7.png` (1536×1024 launcher UI shots) → compressed WebP in `src/assets/screenshots/`. The old wiki never referenced them; they are kept for future use in documentation (e.g. a visual guide). They are not used by any page yet.

## Structural changes made during migration

- `order: N` frontmatter → `sidebar.order: N` (values offset so the auto-generated sidebar groups sort correctly: getting-started 10, features 21–28, policies 31–33, documents 40, development 50, faq 60).
- Internal Markdown links (`./page.md`, `../section/page.md`) → absolute paths without the base (`/en/features/mods/`, `/ru/policies/security/`), resolved against each file's directory.
- Leading `# Title` headings removed from page bodies (the frontmatter `title` renders the page heading now).
- Homepage placeholders (`{{hero}}`, `{{cards:features}}`, `{{cards:policies}}`, `{{discord-banner}}`) → an MDX homepage using Starlight's `CardGrid`/`LinkCard` and the `WaxlightHero`/`DiscordBanner`/`SectionCards` components.
- GitHub alert syntax (`> [!WARNING]`) was kept as-is; `starlight-github-alerts` converts it to Starlight asides at build time.
- "Canonical source" links pointing at `docs/*.md` files in the launcher repo (e.g. `docs/authentication.md`) were kept unchanged — they will keep working as long as the launcher repo keeps those files.

## Not carried over

- `docs/build.mjs` (the custom HTML generator), `docs/assets/app.js`, `docs/assets/wiki-data.js`, and all generated HTML under `docs/{en,ru}/**` — replaced by Starlight.
- Developer-only documents that belong beside the launcher source: `docs/backend-architecture.md`, `docs/authentication.md`, `docs/game-versions.md`, `docs/modpack.md`, `docs/operations-page.md`, `docs/windows-updater.md`, `docs/CODE_SIGNING_POLICY.md`, `docs/CONTRIBUTING.md`, `docs/PRIVACY.md`, `docs/SECURITY.md`, `docs/README.md`, `docs/README.ru.md`, `docs/wails-api-inventory.json`. Some are linked from wiki pages as canonical sources (see above). Recommended launcher cleanup after the new wiki is live:

  - Remove `docs/content/`, `docs/en/`, `docs/ru/`, `docs/assets/app.js`, `docs/assets/styles.css`, `docs/assets/wiki-data.js`, `docs/build.mjs`, `docs/index.html`, `docs/ru.html`.
  - Keep `docs/waxlight.png` if README references it; otherwise move the logo into the wiki only.
  - Decide where `docs/guide/*.png` belong (currently unused; the wiki has compressed copies).
  - Decide what to do with the launcher Pages site and its old URLs (see "Redirect support" above).

## Links in the launcher repo that need updating (later, in the launcher repo)

- `README.md` and `README.ru.md`: the "Гайд/Wiki" links pointing at `https://amadomuerte.github.io/Waxlight-launcher/ru.html` and `/en/` should point to `https://amadomuerte.github.io/waxlight-wiki/en/`.
- `docs/README.md` describes the old generator workflow; delete it with the rest of the generated wiki.
- Any issue templates or `AGENTS.md` references to `docs/content/` paths.

## TODO / known manual work

- Add the wiki's GitHub Pages deployment: create the `waxlight-wiki` repository, push `main`, enable Pages (deploy from GitHub Actions), and set the wiki repo's Pages settings to the `github-pages` environment.
- After deployment, verify search (`Ctrl+K`), image zoom, and the legacy-URL redirects on the live site.
- The screenshots in `src/assets/screenshots/` are not referenced by any page yet — add them to documentation pages when a visual guide is written (or remove them).
- The launcher repo cleanup described above is a separate task and has not been performed.
