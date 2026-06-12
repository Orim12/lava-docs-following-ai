import payloadConfig from '@/payload.config'
import { getTestConfig } from 'tests/test.config'
import { buildConfig, type Config } from 'payload'

function parseConfig(): Config {
	const testConfigEnabled = process.env.PAYLOAD_TEST_CONFIG

	if (testConfigEnabled !== 'true') {
		return payloadConfig as unknown as Config
	}

	return getTestConfig()
}

const config = await parseConfig()
export default buildConfig(config)
