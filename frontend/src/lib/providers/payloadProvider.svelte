<script context="module" lang="ts">
	import { setContext, getContext } from 'svelte';
	import { createPayloadClient } from '$lib/payloadClient';
	import type { PayloadSDK } from '@payloadcms/sdk';

	export const PAYLOAD_CLIENT_CONTEXT = Symbol('payloadClientContext');

	export class PayloadClientProvider {
		client: PayloadSDK | undefined;
		apiBase: string;
		fetchOptions: RequestInit;

		constructor(apiBase?: string, fetchFn: typeof fetch = fetch) {
			this.apiBase = apiBase || '';
			this.fetchOptions = { credentials: 'include' };
			this.client = createPayloadClient({ fetchFn, baseUrl: this.apiBase });
		}

		updateFetchOptions(options: RequestInit) {
			this.fetchOptions = { ...this.fetchOptions, ...options };
			this.client = createPayloadClient({
				fetchFn: (input: RequestInfo | URL, init?: RequestInit) =>
					fetch(input, { ...init, ...this.fetchOptions }),
				baseUrl: this.apiBase
			});
		}

		async request(args: {
			path: string;
			method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
			json?: unknown;
			args?: Record<string, unknown>;
		}) {
			return this.client?.request(args);
		}

		switchToJWT(token: string) {
			this.updateFetchOptions({
				headers: {
					Authorization: `Bearer ${token}`,
					...(this.fetchOptions.headers as Record<string, string> | undefined)
				}
			});
		}

		static createServerClient(token?: string) {
			return createPayloadClient({ baseUrl: undefined, token });
		}
	}

	export const usePayloadProvider = () => {
		const provider = getContext<PayloadClientProvider>(PAYLOAD_CLIENT_CONTEXT);
		if (!provider) {
			throw new Error('PayloadClientProvider not found');
		}
		return provider;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		apiBase = '',
		fetchFn,
		children
	}: {
		apiBase: string;
		fetchFn?: typeof fetch;
		children?: Snippet;
	} = $props();

	const provider = new PayloadClientProvider(apiBase, fetchFn);
	setContext(PAYLOAD_CLIENT_CONTEXT, provider);
</script>

{@render children?.()}
