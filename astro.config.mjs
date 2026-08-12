// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import starlightImageZoom from 'starlight-image-zoom';
import starlightGithubAlerts from 'starlight-github-alerts';
import starlightScrollToTop from 'starlight-scroll-to-top';

// https://astro.build/config
export default defineConfig({
	site: 'https://amadomuerte.github.io',
	base: '/waxlight-wiki/',
	trailingSlash: 'always',
	// starlight-image-zoom requires the unified() processor (Sätteri is not yet supported).
	markdown: {
		processor: unified(),
	},
	integrations: [
		sitemap(),
		starlight({
			title: 'Waxlight Wiki',
			description:
				'The complete documentation for Waxlight — an independent open-source launcher for Vintage Story.',
			logo: {
				src: './src/assets/waxlight.png',
				alt: 'Waxlight',
			},
			favicon: '/waxlight.png',
			defaultLocale: 'en',
			locales: {
				en: { label: 'English', lang: 'en' },
				ru: { label: 'Русский', lang: 'ru' },
			},
			plugins: [starlightImageZoom(), starlightGithubAlerts(), starlightScrollToTop()],
			editLink: {
				baseUrl: 'https://github.com/AmadoMuerte/waxlight-wiki/edit/main/src/content/docs/',
			},
			customCss: ['./src/styles/global.css'],
			credits: false,
			pagination: true,
			lastUpdated: false,
			disable404Route: true,
			components: {
				Header: './src/components/Header.astro',
				Footer: './src/components/Footer.astro',
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				PageTitle: './src/components/PageTitle.astro',
			},
			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'og:image',
						content: 'https://amadomuerte.github.io/waxlight-wiki/waxlight.png',
					},
				},
				{
					tag: 'meta',
					attrs: { name: 'og:image:alt', content: 'Waxlight logo' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary' },
				},
				{
					tag: 'script',
					attrs: { type: 'application/ld+json' },
					content: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						name: 'Waxlight Wiki',
						description:
							'The complete documentation for Waxlight — an independent open-source launcher for Vintage Story.',
						url: 'https://amadomuerte.github.io/waxlight-wiki/',
						inLanguage: ['en', 'ru'],
					}),
				},
			],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
