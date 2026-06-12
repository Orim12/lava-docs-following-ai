import { defaultConfig } from './items/default'

export type Config = typeof defaultConfig & {
	localization: {
		urls: Record<string, string[]>
	}
}

export const createConfig = (config: Partial<Config> & Record<string, unknown>): Config => {
	return { ...defaultConfig, ...config }
}
