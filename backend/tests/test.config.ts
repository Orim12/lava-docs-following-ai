import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { Config } from 'payload'
import { mainConfig } from '@/payload.config'
import { PAYLOAD_TEST_DB_NAME, PAYLOAD_TEST_SECRET } from './helpers/constants'

export function getTestConfig(testName: string = PAYLOAD_TEST_DB_NAME): Config {
  let DB_URI = process.env.MONGODB_MEMORY_SERVER_URI
  DB_URI = DB_URI?.replace('replaceWithDbName', testName)

  return {
    ...mainConfig,
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
      ...mainConfig.admin,
      disable: true,
    },
    loggingLevels: {
      ...mainConfig.loggingLevels,
      APIError: false,
    },
  }
}