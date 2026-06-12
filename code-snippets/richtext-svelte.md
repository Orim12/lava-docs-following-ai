# RichText Svelte Component (Slate)

The `richText.svelte` component renders Slate-based rich text content.

```svelte
<script lang="ts">
  import RichTextLink from '$lib/components/richtext/link/link.svelte';

  interface Props {
    json?: any;
    centerContent?: boolean;
  }

  let { json = [], centerContent = false }: Props = $props();
  let parent = $derived(json);

  function textDecoration(node: any) {
    if (node.text) {
      if (node.bold) return `<strong>${node.text}</strong>`;
      if (node.code) return `<code>${node.text}</code>`;
      if (node.italic) return `<em>${node.text}</em>`;
      if (node.underline) return `<you>${node.text}</you>`;
      if (node.strikethrough) return `<s>${node.text}</s>`;
      return `${node.text}`;
    }
    return '';
  }
</script>

<div class="{centerContent ? 'flex flex-col items-center text-center' : ''}">
  {#each parent || [] as blocks}
    ...
  {/each}
</div>
```

See `frontend/src/lib/components/richtext/richText.svelte` for the full implementation.
