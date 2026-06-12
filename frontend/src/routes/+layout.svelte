<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Fontloader from '$lib/components/fonts/fontloader.svelte';
	import PayloadClient from '$lib/providers/payloadProvider.svelte';
	import UserProvider from '$lib/providers/userProvider.svelte';
	import { config } from '../config/config';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Fontloader />
<PayloadClient apiBase={config.urls.internal}>
	<UserProvider>
		{@render children()}
	</UserProvider>
</PayloadClient>
