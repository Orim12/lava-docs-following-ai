import config from '@/payload.config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '@/importMap/generated'

type Args = {
	params: Promise<{
		segments: string[]
	}>
	searchParams: Promise<{
		[key: string]: string | string[]
	}>
}

const Page = ({ params, searchParams }: Args) =>
	RootPage({ config, importMap, params, searchParams })

export const generateMetadata = ({ params, searchParams }: Args) =>
	generatePageMetadata({ config, params, searchParams })

export default Page
