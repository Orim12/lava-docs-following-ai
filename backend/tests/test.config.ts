import { mongooseAdapter } from '@payloadcms/db-mongodb'
import type { Config } from 'payload'
import payloadConfig from '@/payload.config'
import { PAYLOAD_TEST_DB_NAME, PAYLOAD_TEST_SECRET } from './helpers/constants'

export function getTestConfig(testName: string = PAYLOAD_TEST_DB_NAME): Config {
	let DB_URI = process.env.MONGODB_MEMORY_SERVER_URI
	DB_URI = DB_URI?.replace('replaceWithDbName', testName)

	return {
		...(payloadConfig as any),
		db: mongooseAdapter({
			url: `${DB_URI}`,
			ensureIndexes: true,
			transactionOptions: {
				readConcern: { level: 'majority' },
				writeConcern: { w: 'majority' },
				maxCommitTimeMS: 10000,
				maxTimeMS: 20000,
			},
		}),
		secret: PAYLOAD_TEST_SECRET,
		admin: {
			...(payloadConfig as any).admin,
			disable: true,
		},
	}
}
