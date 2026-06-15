export const defaultConfig = {
	blockGoogleIndexing: true,
	urls: {
		default: {
			nl: 'http://localhost:4000',
			de: 'http://localhost:4000'
		},
		internal: 'http://localhost:4000',
		cdn: undefined as string | undefined
	},
	sentry: {
		enabled: false,
		environment: 'development',
		dsn: undefined as string | undefined // set via env in production
	},
	localization: {
		urls: {
			nl: ['http://app-nl.localhost:3000'],
			de: ['http://app-de.localhost:3000']
		}
	},
	mapbox: {
		accessToken: 'YOUR_MAPBOX_PUBLIC_TOKEN'
	},
	cache: {
		enabled: true,
		ttl: 15 * 1000 // 15 seconds
	}
};
