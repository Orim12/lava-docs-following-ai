import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { config } from './config/config'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	editor: lexicalEditor(),
	collections: [Users],
	secret: config.secret,
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
		declare: false,
	},
	db: mongooseAdapter({
		url: config.databaseURI,
	}),
	cors: config.corsCsrfUrls,
	csrf: config.corsCsrfUrls,
	telemetry: false,
	admin: {
		user: 'users',
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
})
