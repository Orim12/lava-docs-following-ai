import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, Config } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { config } from './config/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const mainConfig: Config = {
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/graphics/Logo',
        Icon: '/components/graphics/Icon',
      },
    },
    meta: {
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/icon.svg',
        },
      ],
    },
  },
  collections: [Users],
  editor: lexicalEditor(),
  secret: config.secret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    declare: false,
  },
  db: mongooseAdapter({
    url: config.databaseURI,
  }),
  sharp,
  telemetry: false,
  cors: config.corsCsrfUrls,
  csrf: config.corsCsrfUrls,
}

export default mainConfig