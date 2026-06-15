import { mainConfig } from '@/payload.config'
import { getTestConfig } from '../../../tests/test.config'
import { buildConfig, Config } from 'payload'

function parseConfig(): Config {
  const testConfigEnabled = process.env.PAYLOAD_TEST_CONFIG

  if (testConfigEnabled !== 'true') {
    return mainConfig
  }

  return getTestConfig()
}

const config = await parseConfig()
export default buildConfig(config)