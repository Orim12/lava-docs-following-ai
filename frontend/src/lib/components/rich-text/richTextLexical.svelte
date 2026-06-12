<script lang="ts">
	import RichTextLink from './link.svelte'

	interface Props {
		json?: any
		centerContent?: boolean
	}

	let { json, centerContent = false }: Props = $props()

	function renderNode(node: any): string {
		if (node.type === 'text') {
			let text = node.text || ''
			if (node.format & 1) text = `<strong>${text}</strong>`
			if (node.format & 2) text = `<em>${text}</em>`
			if (node.format & 4) text = `<s>${text}</s>`
			if (node.format & 8) text = `<code>${text}</code>`
			if (node.format & 16) text = `<u>${text}</u>`
			return text
		}
		return ''
	}

	function renderChildren(children: any[]): string {
		if (!children) return ''
		return children.map(renderNode).join('')
	}
</script>

<div class={`${centerContent ? 'flex flex-col items-center text-center' : ''}`}>
	{#if json?.root?.children}
		{#each json.root.children as block}
			{#if block.type === 'paragraph'}
				<p class="mt-[1rem] min-h-[20px] text-lg leading-[1.7rem] font-extralight tracking-[0.3px] break-words whitespace-pre-wrap">
					{#each block.children as node}
						{#if node.type === 'link'}
							<RichTextLink content={node} />
						{:else}
							{@html renderNode(node)}
						{/if}
					{/each}
				</p>
			{:else if block.type === 'heading'}
				<svelte:element this={block.tag} class="text-primary mt-[25px] mb-[10px] font-bold">
					{@html renderChildren(block.children)}
				</svelte:element>
			{:else if block.type === 'list'}
				{#if block.listType === 'bullet'}
					<ul class="mb-3 list-disc pl-8 text-lg leading-[1.7rem]">
						{#each block.children as item}
							<li>{@html renderChildren(item.children)}</li>
						{/each}
					</ul>
				{:else}
					<ol class="m-0 list-decimal pl-8 font-sans text-lg leading-[1.7rem]">
						{#each block.children as item}
							<li>{@html renderChildren(item.children)}</li>
						{/each}
					</ol>
				{/if}
			{:else if block.type === 'quote'}
				<blockquote class="mt-[1rem] text-lg leading-[1.7rem]">
					{@html renderChildren(block.children)}
				</blockquote>
			{:else if block.type === 'upload'}
				<img src={block.value?.url} alt={block.value?.filename} class="w-full" />
			{/if}
		{/each}
	{/if}
</div>
