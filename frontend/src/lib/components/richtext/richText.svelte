<script lang="ts">
	import RichTextLink from './link/link.svelte';

	interface TextNode {
		text?: string;
		bold?: boolean;
		code?: boolean;
		italic?: boolean;
		underline?: boolean;
		strikethrough?: boolean;
		type?: string;
		children?: TextNode[];
		value?: { url?: string; filename?: string };
		source?: string;
		id?: string;
		textAlign?: string;
	}

	interface Props {
		json?: TextNode[];
		centerContent?: boolean;
	}

	let { json = [], centerContent = false }: Props = $props();
</script>

<div class={`${centerContent ? 'flex flex-col items-center text-center' : ''}`}>
	{#if json?.length}
		{#each json as blocks (blocks)}
			{#if !blocks?.type || blocks?.type === 'p' || blocks?.type === 'blockquote'}
				<p
					class={`${blocks?.textAlign ? blocks.textAlign : ''} mt-[1rem] min-h-[20px] text-lg leading-[1.7rem] font-extralight tracking-[0.3px] break-words whitespace-pre-wrap`}
				>
					{#each blocks.children ?? [] as node (node)}
						{#if node.type === 'link'}
							<RichTextLink content={node} />
						{:else}
							<svelte:element
								this={node.bold ? 'strong' : node.code ? 'code' : node.italic ? 'em' : 'span'}
							>
								{node.text}
							</svelte:element>
						{/if}
					{/each}
				</p>
			{:else if blocks?.type === 'h1'}
				{#each blocks?.children ?? [] as node (node)}
					{#if node?.text}
						<span class={`text-primary h1 mb-8 text-4xl font-bold ${blocks?.textAlign || ''}`}>
							{node?.text}
						</span>
					{/if}
				{/each}
			{:else if blocks?.type?.match(/^h[2-6]$/)}
				{#each blocks?.children ?? [] as node (node)}
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
				<ul
					class={`${blocks?.textAlign ? blocks.textAlign : ''} mb-3 list-disc pl-8 text-lg leading-[1.7rem]`}
				>
					{#each blocks?.children ?? [] as node (node)}
						<li>
							{#each node?.children ?? [] as child (child)}
								{#if child?.type === 'link'}
									<RichTextLink content={child} />
								{:else}
									<svelte:element this={child.bold ? 'strong' : 'span'}>{child.text}</svelte:element
									>
								{/if}
							{/each}
						</li>
					{/each}
				</ul>
			{:else if blocks?.type === 'ol'}
				<ol
					class={`${blocks?.textAlign ? blocks.textAlign : ''} m-0 list-decimal pl-8 font-sans text-lg leading-[1.7rem] tracking-[-0.23px]`}
				>
					{#each blocks?.children ?? [] as node (node)}
						<li>
							{#each node?.children ?? [] as child (child)}
								{#if child?.type === 'link'}
									<RichTextLink content={child} />
								{:else}
									<svelte:element this={child.bold ? 'strong' : 'span'}>{child.text}</svelte:element
									>
								{/if}
							{/each}
						</li>
					{/each}
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
