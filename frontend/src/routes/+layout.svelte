<script lang="ts">
	import './layout.css'
	import Fontloader from '$lib/components/fonts/fontloader.svelte'
	import PayloadClient from '$lib/providers/payloadProvider.svelte'

	let { children } = $props()
</script>

<PayloadClient apiBase="http://localhost:4000">
	<Fontloader />
	{@render children()}
</PayloadClient>
