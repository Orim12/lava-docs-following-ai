import type { PayloadTypes } from '$lib/payload-types'
import { config } from '../../config/config'
import { page } from '$app/state'

export const getLocalizationByHostname = (url: URL): PayloadTypes.Config['locale'] => {
	const locale = Object.keys(config.localization.urls).find((locale) =>
		config.localization.urls[locale as PayloadTypes.Config['locale']].some((hostname) => url.href.startsWith(hostname)),
	) as PayloadTypes.Config['locale'] | undefined
	return locale || 'nl'
}

export const getLocalization = () => {
	return getLocalizationByHostname(page.url)
}
