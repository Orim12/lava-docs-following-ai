import { defaultConfig } from './items/default'

export type Config = typeof defaultConfig & {
	secret: string
	databaseURI: string
	corsCsrfUrls: string[]
}

export const createConfig = (config: Partial<Config> & Record<string, unknown>): Config => {
	return { ...defaultConfig, ...config } as Config
}
