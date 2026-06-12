<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Fontloader from '$lib/components/fonts/fontloader.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Fontloader />

{@render children()}
