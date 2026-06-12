import { PayloadSDK } from '@payloadcms/sdk'
import { config } from '../config/config'
import { getLocalizationByHostname } from '$lib/localization/getLocalizationByUrl'
import { browser } from '$app/environment'

type GetSdkParams = {
	fetchFn: typeof fetch
	parentUrl: URL
	credentials?: RequestCredentials
}

const addLocaleToUrl = (incoming: string | URL | Request, parentUrl: URL): URL | Request => {
	const locale = getLocalizationByHostname(parentUrl)
	if (incoming instanceof URL || typeof incoming === 'string') {
		const url = new URL(incoming)
		url.searchParams.set('locale', locale)
		return url
	}

	const url = new URL(incoming.url)
	url.searchParams.set('locale', locale)

	return new Request(url.toString(), incoming)
}

export const payloadSdk = ({ fetchFn, parentUrl, credentials = 'include' }: GetSdkParams) => {
	const locale = getLocalizationByHostname(parentUrl)
	const defaultUrl = browser ? (config.urls.default as Record<string, string>)[locale] : config.urls.internal

	return new PayloadSDK<any>({
		baseURL: `${defaultUrl}/api`,
		fetch: async (url, init?) => {
			url = addLocaleToUrl(url, parentUrl)
			const headers = new Headers(init?.headers)
			headers.set('Force-Locale', '1')
			headers.set('Frontend', '1')
			const response = await fetchFn(url, {
				...init,
				credentials,
				headers,
			})

			return response
		},
	})
}
