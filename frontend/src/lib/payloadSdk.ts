import { PayloadSDK } from '@payloadcms/sdk';
import { config } from '$config/config';
import { getLocalizationByHostname } from '$lib/localization/getLocalizationByUrl';
import { browser } from '$app/environment';

type GetSdkParams = {
	// Way to inject SvelteKit's fetch function
	fetchFn: typeof fetch;
	// The parent URL to determine localization
	parentUrl: URL;
	// Credentials mode for fetch requests, defaulting to 'include' for cookie handling
	credentials?: RequestCredentials;
};

const addLocaleToUrl = (incoming: string | URL | Request, parentUrl: URL): URL | Request => {
	const locale = getLocalizationByHostname(parentUrl);
	if (incoming instanceof URL || typeof incoming === 'string') {
		const url = new URL(incoming);
		url.searchParams.set('locale', locale);
		return url;
	}

	const url = new URL(incoming.url);
	url.searchParams.set('locale', locale);

	return new Request(url.toString(), incoming);
};

export const payloadSdk = ({ fetchFn, parentUrl, credentials = 'include' }: GetSdkParams) => {
	const locale = getLocalizationByHostname(parentUrl);
	const defaultUrl = browser ? config.urls.default[locale] : config.urls.internal;

	return new PayloadSDK({
		baseURL: `${defaultUrl}/api`,
		fetch: async (url, init?) => {
			// Append locale as query param
			url = addLocaleToUrl(url, parentUrl);
			// Append Force-Locale header to force locale fetching even if localization fallback is disabled
			const headers = new Headers(init?.headers);
			// Custom header to force locale fetching even if localization is not included in the request
			headers.set('Force-Locale', '1');
			// Custom header to identify frontend requests, useful for populating blocks conditionally
			headers.set('Frontend', '1');
			const response = await fetchFn(url, {
				...init,
				credentials,
				headers
			});

			return response;
		}
	});
};
