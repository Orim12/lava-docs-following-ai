import { Config } from '../createConfig'
import { defaultConfig } from './default'

export const stagingConfig: Config = {
  ...defaultConfig,
  secret: 'staging-secret',
  databaseURI: 'mongodb://127.0.0.1/lava-docs-following-ai-staging',
  url: 'https://preview.example.com',
  frontendUrl: 'https://preview.example.com',
}
