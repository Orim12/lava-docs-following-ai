import type { Config } from './createConfig';
import { PUBLIC_SELECTED_CONFIG } from '$env/static/public';
import { defaultConfig } from './items/default';
import { stagingConfig } from './items/staging';

export const configs: Record<string, Config> = {
	default: defaultConfig,
	staging: stagingConfig
};

export const getConfig = () => {
	return configs[PUBLIC_SELECTED_CONFIG || 'default'];
};

export const config = getConfig();
