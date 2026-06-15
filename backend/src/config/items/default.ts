import { createConfig, Config } from '../createConfig'

export const defaultConfig: Config = createConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  databaseURI: process.env.DATABASE_URL || 'mongodb://127.0.0.1/lava-docs-following-ai',
  corsCsrfUrls: [
    'http://localhost:3000',
    'http://localhost:4000',
    'http://localhost:3001',
    'http://localhost:4001',
  ],
  url: 'http://localhost:4000',
  frontendUrl: 'http://localhost:3000',
})
