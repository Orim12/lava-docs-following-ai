import config from '@/payload.config'
import { REST_POST } from '@payloadcms/next/routes'

const handler = REST_POST(config)

export { handler as POST }
