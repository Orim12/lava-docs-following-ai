import { Config } from 'payload'
import config from '@/payload.config'
import { PAYLOAD_TEST_DB_NAME, PAYLOAD_TEST_SECRET } from './helpers/constants'

export function getTestConfig(testName: string = PAYLOAD_TEST_DB_NAME): Config {
	let DB_URI = process.env.MONGODB_MEMORY_SERVER_URI
	DB_URI = DB_URI?.replace('replaceWithDbName', testName)

	const testConfig: Config = {
		...(config as unknown as Config),
		secret: PAYLOAD_TEST_SECRET,
		admin: {
			...(config as any).admin,
			disable: true,
		},
		loggingLevels: {
			...(config as any).loggingLevels,
			APIError: false,
		},
	}

	return testConfig
}
