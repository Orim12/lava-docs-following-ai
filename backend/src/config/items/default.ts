export const defaultConfig = {
	secret: process.env.PAYLOAD_SECRET || 'default-secret-change-in-production',
	databaseURI: process.env.DATABASE_URI || 'mongodb://127.0.0.1/payload',
	url: 'http://localhost:4000',
	frontendUrl: 'http://localhost:3000',
	corsCsrfUrls: [
		'http://localhost:4000',
		'http://localhost:3000',
	],
	blockGoogleIndexing: true,
	urls: {
		default: {
			nl: 'http://localhost:4000',
			de: 'http://localhost:4000',
		},
		internal: 'http://localhost:4000',
		cdn: undefined as string | undefined,
	},
	sentry: {
		enabled: false,
		environment: 'development',
		dsn: undefined as string | undefined,
	},
	localization: {
		urls: {
			nl: ['http://app-nl.localhost:3000'],
			de: ['http://app-de.localhost:3000'],
		},
	},
	mapbox: {
		accessToken: 'YOUR_MAPBOX_PUBLIC_TOKEN',
	},
	cache: {
		enabled: true,
		ttl: 15 * 1000,
	},
}
