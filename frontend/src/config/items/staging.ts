import type { Config } from '../createConfig';
import { defaultConfig } from './default';

export const stagingConfig: Config = {
  ...defaultConfig,
  blockGoogleIndexing: true,
  urls: {
    default: {
      nl: 'https://preview.example-nl.com',
      de: 'https://preview.example-de.com'
    },
    internal: 'http://backend:4000',
    cdn: 'https://cdn.example.com'
  },
  sentry: {
    ...defaultConfig.sentry,
    enabled: true,
    environment: 'staging'
  },
  localization: {
    urls: {
      nl: ['https://preview.example-nl.com'],
      de: ['https://preview.example-de.com']
    }
  },
  cache: {
    ...defaultConfig.cache,
    enabled: true
  }
};
