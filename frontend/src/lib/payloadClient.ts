import { PayloadSDK } from '@payloadcms/sdk'

type CreatePayloadClientOptions = {
	fetchFn?: typeof fetch
	baseUrl?: string
	token?: string
}

export const createPayloadClient = ({ fetchFn = fetch, baseUrl, token }: CreatePayloadClientOptions) => {
	const baseURL = baseUrl || 'http://localhost:4000'

	return new PayloadSDK({
		baseURL: `${baseURL}/api`,
		fetch: async (url, init) => {
			const headers = new Headers(init?.headers)
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return fetchFn(url, { ...init, credentials: 'include', headers })
		},
	})
}
