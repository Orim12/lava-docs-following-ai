import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/admin/',
      permanent: false,
    },
  ],
  assetPrefix: process.env.NODE_ENV === 'development' ? undefined : '/admin',
  images: {
    path: process.env.NODE_ENV === 'development' ? undefined : '/admin/_next/image',
  },
  serverRuntimeConfig: {
    PORT: 4000,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })