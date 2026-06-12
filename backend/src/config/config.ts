import type { Config } from './createConfig'
import { defaultConfig } from './items/default'
import { stagingConfig } from './items/staging'

export const configs: Record<string, Config> = {
	default: defaultConfig,
	staging: stagingConfig,
}

export const getConfig = (selected?: string) => {
	return configs[selected || 'default']
}

export const config = getConfig()
