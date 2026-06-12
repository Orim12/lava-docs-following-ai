import type { Locale } from '../../config/createConfig';
import { config } from '../../config/config';
import { page } from '$app/state';

export const getLocalizationByHostname = (url: URL): Locale => {
	const locale = (Object.keys(config.localization.urls) as Locale[]).find((locale) =>
		config.localization.urls[locale].some((hostname: string) => url.href.startsWith(hostname))
	);
	return locale || 'nl';
};

export const getLocalization = () => {
	return getLocalizationByHostname(page.url);
};
