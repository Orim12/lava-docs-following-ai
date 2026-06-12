import type { PayloadTypes } from '$lib/payload-types';
import { defaultConfig } from './items/default';

export type Config = typeof defaultConfig & {
	localization: {
		urls: Record<PayloadTypes.Config['locale'], string[]>;
	};
};

export const createConfig = (config: Partial<Config> & Record<string, unknown>): Config => {
	return { ...defaultConfig, ...config };
};
