import { RootPage } from '@payloadcms/next/views'
import { generatePageMetadata } from '@payloadcms/next/views'
import type { Metadata } from 'next'
import React from 'react'

type Args = {
	params: Promise<{ segments: string[] }>
	searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
	return generatePageMetadata({ params, searchParams })
}

const Page = async ({ params, searchParams }: Args) => {
	return <RootPage params={params} searchParams={searchParams} />
}

export default Page
