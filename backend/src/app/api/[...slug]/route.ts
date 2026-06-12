import config from '@/payload.config'
import { REST_GET } from '@payloadcms/next/routes'

const handler = REST_GET(config)

export { handler as GET }
