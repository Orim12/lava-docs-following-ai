export type Config = {
  secret: string
  databaseURI: string
  corsCsrfUrls: string[]
  url: string
  frontendUrl: string
}

export const createConfig = (config: Partial<Config>): Config => {
  return {
    secret: '',
    databaseURI: '',
    corsCsrfUrls: [],
    url: '',
    frontendUrl: '',
    ...config,
  }
}