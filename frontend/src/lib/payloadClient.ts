import { PayloadSDK } from '@payloadcms/sdk';

export function createPayloadClient({
	fetchFn,
	baseUrl
}: {
	fetchFn?: typeof fetch;
	baseUrl?: string;
	token?: string;
}) {
	const client = new PayloadSDK({
		baseURL: baseUrl ? `${baseUrl}/api` : 'http://localhost:4000/api',
		fetch: fetchFn || fetch
	});

	return client;
}
