import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from './config/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const mainConfig = {
	editor: lexicalEditor(),
	collections: [],
	secret: config.secret,
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
		declare: false as const,
	},
	db: mongooseAdapter({
		url: config.databaseURI,
	}),
	sharp,
	plugins: [],
	telemetry: false,
	cors: config.corsCsrfUrls,
	csrf: config.corsCsrfUrls,
	admin: {
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
}

export default buildConfig(mainConfig)
