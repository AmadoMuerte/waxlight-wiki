import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema({
			extend: z.object({
				'waxlight.download': z.string(),
				'waxlight.support': z.string(),
				'waxlight.discord': z.string(),
				'waxlight.discordSidebar': z.string(),
				'waxlight.discordInvite': z.string(),
				'waxlight.heroStart': z.string(),
				'waxlight.heroDownloadGithub': z.string(),
				'waxlight.heroDiscordServer': z.string(),
				'waxlight.badgeLicense': z.string(),
				'waxlight.badgeWindows': z.string(),
				'waxlight.badgeLinux': z.string(),
				'waxlight.badgeLanguages': z.string(),
				'waxlight.badgeOpenSource': z.string(),
				'waxlight.heroLead': z.string(),
				'waxlight.bannerTitle': z.string(),
				'waxlight.bannerText': z.string(),
				'waxlight.bannerJoin': z.string(),
				'waxlight.footerAbout': z.string(),
				'waxlight.footerProject': z.string(),
				'waxlight.footerIssue': z.string(),
				'waxlight.footerSupport': z.string(),
				'waxlight.footerCommunity': z.string(),
				'waxlight.footerDiscord': z.string(),
				'waxlight.footerPolicies': z.string(),
				'waxlight.footerPrivacy': z.string(),
				'waxlight.footerSecurity': z.string(),
				'waxlight.footerSigning': z.string(),
				'waxlight.footerDocs': z.string(),
				'waxlight.footerLicense': z.string(),
				'waxlight.notFoundTitle': z.string(),
				'waxlight.notFoundText': z.string(),
				'waxlight.notFoundHome': z.string(),
				'waxlight.notFoundSearch': z.string(),
				'waxlight.notFoundRedirect': z.string(),
			}),
		}),
	}),
};
