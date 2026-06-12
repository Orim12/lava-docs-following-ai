import { PayloadSDK } from '@payloadcms/sdk';

export const createPayloadClient = (options: {
	fetchFn?: typeof fetch;
	baseUrl?: string;
	token?: string;
}) => {
	return new PayloadSDK({
		baseURL: options.baseUrl || '',
		fetch: options.fetchFn
	});
};
