import { PayloadSDK } from '@payloadcms/sdk';

type CreatePayloadClientParams = {
	fetchFn?: typeof fetch;
	baseUrl?: string;
	token?: string;
};

export const createPayloadClient = ({
	fetchFn = fetch,
	baseUrl = '',
	token
}: CreatePayloadClientParams = {}) => {
	const headers = new Headers();

	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	return new PayloadSDK({
		baseURL: baseUrl,
		fetch: async (url, init?) => {
			const response = await fetchFn(url, {
				...init,
				headers: new Headers({ ...headers, ...init?.headers }),
				credentials: 'include'
			});
			return response;
		}
	});
};
