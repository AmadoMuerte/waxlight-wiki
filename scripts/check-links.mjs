/**
 * Internal link checker for the built Waxlight Wiki.
 *
 * The starlight-links-validator plugin cannot validate base-less internal
 * links on sites deployed under a non-root `base` (known upstream issue,
 * closed "not planned": https://github.com/HiDeoo/starlight-links-validator/issues/148).
 * This small script does the same job for this site's URL layout:
 *
 *   - every page is at  <base>/<lang>/<path>/          (dist/<lang>/<path>/index.html)
 *   - content links are written without the base, e.g. `/en/faq/`, `../policies/x/`
 *
 * Usage: node scripts/check-links.mjs [distDir]
 * Exits with code 1 when any internal link or anchor is broken.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = process.argv[2]
	? resolve(process.argv[2])
	: join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

function walk(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = join(dir, entry.name);
		return entry.isDirectory() ? walk(full) : [full];
	});
}

const htmlFiles = walk(distDir).filter((file) => file.endsWith('.html'));
const assetFiles = new Set(walk(distDir).filter((file) => !file.endsWith('.html')));

const errors = [];

function resolveTarget(pageFile, href) {
	if (href.startsWith('#')) return null;
	const [pathPart, hash] = href.split('#');
	if (/^(https?:|mailto:|tel:|data:)/.test(pathPart)) return null;

	// Strip query string.
	const clean = pathPart.split('?')[0];
	if (!clean || clean === '/') {
		return { file: join(distDir, 'index.html'), hash, external: false };
	}

	// Absolute site path: /en/faq/ or /en/faq#x or /waxlight-wiki/en/faq/
	let absolute = clean;
	if (clean.startsWith('/')) {
		// Strip a leading base prefix if present (e.g. /waxlight-wiki/...).
		absolute = clean.replace(/^\/[^/]+\/(?=en\/|ru\/)/, '/');
	} else {
		absolute =
			'/' + join(dirname('/' + pageFile.slice(distDir.length + 1).replace(sep, '/')), clean);
	}
	absolute = absolute.replace(/\/+/g, '/');

	const segments = absolute.split('/').filter(Boolean);
	const file = join(distDir, ...segments.map(decodeURIComponent));

	const candidates = [file + '.html', join(file, 'index.html'), file];
	const found = candidates.find((c) => existsSync(c) && statSync(c).isFile());

	if (!found) return { file: null, hash, external: false, missing: true };
	return { file: found, hash, external: false };
}

for (const pageFile of htmlFiles) {
	const html = readFileSync(pageFile, 'utf8');
	const pageUrl = '/' + pageFile.slice(distDir.length + 1).replace(/\\/g, '/');
	// Skip the 404 page's inline script and footer-external links by only scanning anchor hrefs in content/nav.
	const linkRegex = /<a\s[^>]*href="([^"]+)"/g;
	let match;
	while ((match = linkRegex.exec(html))) {
		const href = match[1];
		if (
			!href ||
			href.startsWith('http') ||
			href.startsWith('#') ||
			href.startsWith('mailto:') ||
			href.startsWith('tel:')
		)
			continue;

		const target = resolveTarget(pageFile, href);
		if (!target) continue;
		if (target.missing) {
			errors.push(`${pageUrl}: broken link → "${href}" (${target.file ?? 'no target'})`);
			continue;
		}
		if (!target.hash || target.hash === '#') continue;

		// Anchor must exist in the target page.
		const targetHtml = readFileSync(target.file, 'utf8');
		const ids = new Set([...targetHtml.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
		if (!ids.has(target.hash.slice(1))) {
			errors.push(
				`${pageUrl}: broken anchor → "${href}" (id "${target.hash}" not found in ${target.file})`,
			);
		}
	}

	// Any link pointing at a raw asset that doesn't exist?
	const assetRegex = /(?:src|href)="([^"]+\.(?:png|webp|jpg|jpeg|svg|ico|gif|css|js|woff2?))"/g;
	while ((match = assetRegex.exec(html))) {
		const href = match[1];
		if (href.startsWith('http') || href.startsWith('/')) continue;
		const resolved = resolve(dirname(pageFile), href);
		if (!existsSync(resolved)) {
			errors.push(`${pageUrl}: missing asset → "${href}"`);
		}
	}
}

if (errors.length > 0) {
	console.error(
		`\nFound ${errors.length} broken internal ${errors.length === 1 ? 'link' : 'links'}:\n`,
	);
	for (const error of errors) console.error('  - ' + error);
	process.exit(1);
}

console.log(`check-links: ${htmlFiles.length} pages, no broken internal links.`);
