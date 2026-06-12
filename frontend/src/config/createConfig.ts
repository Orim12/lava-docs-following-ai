import { defaultConfig } from './items/default';

export type Locale = 'nl' | 'de';

export type Config = typeof defaultConfig & {
	localization: {
		urls: Record<Locale, string[]>;
	};
};

export const createConfig = (config: Partial<Config> & Record<string, unknown>): Config => {
	return { ...defaultConfig, ...config };
};
