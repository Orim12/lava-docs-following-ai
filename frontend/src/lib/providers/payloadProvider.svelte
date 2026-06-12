<script module lang="ts">
	import { setContext, getContext } from 'svelte';
	import { createPayloadClient } from '$lib/payloadClient';

	export const PAYLOAD_CLIENT_CONTEXT = Symbol('payloadClientContext');

	export class PayloadClientProvider {
		client: ReturnType<typeof createPayloadClient> | undefined = $state();
		apiBase = $state<string>('');
		fetchOptions = $state<RequestInit>({ credentials: 'include' });

		constructor(apiBase?: string, fetchFn: typeof fetch = fetch) {
			if (apiBase) this.apiBase = apiBase;
			this.client = createPayloadClient({ fetchFn, baseUrl: this.apiBase });
		}

		updateFetchOptions(options: RequestInit) {
			this.fetchOptions = { ...this.fetchOptions, ...options };
			this.client = createPayloadClient({
				fetchFn: (input, init) => fetch(input, { ...init, ...this.fetchOptions }),
				baseUrl: this.apiBase
			});
		}

		async request(
			args: Parameters<NonNullable<ReturnType<typeof createPayloadClient>['request']>>[0]
		) {
			return this.client!.request(args);
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
		apiBase,
		fetchFn,
		children
	}: {
		apiBase: string;
		fetchFn?: typeof fetch;
		children?: Snippet;
	} = $props();

	setContext(PAYLOAD_CLIENT_CONTEXT, new PayloadClientProvider(apiBase, fetchFn));
</script>

{@render children?.()}
