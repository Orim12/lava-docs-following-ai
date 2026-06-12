<script lang="ts">
	import RichTextLink from './link.svelte'
	interface Props {
		json?: any
		centerContent?: boolean
	}

	let { json = [], centerContent = false }: Props = $props()

	let parent = $derived(json)

	function textDecoration(node: any) {
		if (node.text) {
			if (node.bold) {
				return `<strong>${node.text}</strong>`
			}
			if (node.code) {
				return `<code>${node.text}</code>`
			}
			if (node.italic) {
				return `<em>${node.text}</em>`
			}
			if (node.underline) {
				return `<you>${node.text}</you>`
			}
			if (node.strikethrough) {
				return `<s>${node.text}</s>`
			}
			return `${node.text}`
		}
		return ''
	}
</script>

<div class={`${centerContent ? 'flex flex-col items-center text-center' : ''}`}>
	{#if (parent && typeof parent !== 'string') || (parent?.length > 0 && typeof parent !== 'string')}
		{#each parent || [] as blocks}
			{#if !blocks?.type || blocks?.type === 'p' || blocks?.type === 'blockquote'}
				<p
					class={`${blocks?.textAlign ? blocks.textAlign : ''} mt-[1rem] min-h-[20px] text-lg leading-[1.7rem] font-extralight tracking-[0.3px] break-words whitespace-pre-wrap`}
				>
					{#each blocks.children as node}
						{#if node.type === 'link'}
							<RichTextLink content={node} />
						{:else}
							{@html textDecoration(node)}
						{/if}
					{/each}
				</p>
			{:else if blocks?.type === 'h1'}
				{#each blocks?.children as node}
					{#if node?.text}
						<span class={`text-primary h1 mb-8 text-4xl font-bold ${blocks?.textAlign || ''}`}>
							{node?.text}
						</span>
					{/if}
				{/each}
			{:else if blocks?.type.match(/^h[2-6]$/)}
				{#each blocks?.children as node}
					{#if node?.text}
						<svelte:element
							this={blocks?.type}
							class={`${blocks?.textAlign ? blocks.textAlign : ''} text-primary mt-[25px] mb-[10px] font-bold`}
						>
							{node?.text}
						</svelte:element>
					{/if}
				{/each}
			{:else if blocks?.type === 'ul'}
				<ul class={`${blocks?.textAlign ? blocks.textAlign : ''} mb-3 list-disc pl-8 text-lg leading-[1.7rem]`}>
					{#if blocks?.children || blocks?.children?.length > 0}
						{#each blocks?.children as node}
							<li>
								{#if node.children || node.children?.length > 0}
									{#each node?.children as child}
										{#if child?.type === 'link'}
											<RichTextLink content={child} />
										{:else}
											{@html textDecoration(child)}
										{/if}
									{/each}
								{/if}
							</li>
						{/each}
					{/if}
				</ul>
			{:else if blocks?.type === 'ol'}
				<ol
					class={`${blocks?.textAlign ? blocks.textAlign : ''} m-0 list-decimal pl-8 font-sans text-lg leading-[1.7rem] tracking-[-0.23px]`}
				>
					{#if blocks?.children || blocks?.children?.length > 0}
						{#each blocks?.children as node}
							<li>
								{#each node?.children as child}
									{#if child?.type === 'link'}
										<RichTextLink content={child} />
									{:else}
										{@html textDecoration(child)}
									{/if}
								{/each}
							</li>
						{/each}
					{/if}
				</ol>
			{:else if blocks?.type === 'upload'}
				<img src={blocks?.value?.url} alt={blocks?.value?.filename} class="w-full" />
			{:else if blocks?.type === 'link'}
				<RichTextLink content={blocks} />
			{:else if blocks?.type === 'video'}
				{#if blocks?.source === 'youtube'}
					<iframe
						src={`https://www.youtube.com/embed/${blocks?.id}?loop=1&modestbranding=1&rel=0&showinfo=0`}
						title="Youtube"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						class="aspect-video w-full"
					></iframe>
				{:else if blocks?.source === 'vimeo'}
					<iframe
						src={`https://player.vimeo.com/video/${blocks?.id}`}
						title="Vimeo"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						class="aspect-video w-full"
					></iframe>
				{/if}
			{/if}
		{/each}
	{/if}
</div>
