<script lang="ts">
  import Button from './button/button.svelte';
  let { content } = $props();
</script>

{#if content?.children[0]?.text !== ''}
  {#if content?.fields?.style === 'default'}
    <Button label={content?.children[0]?.text} href={content?.doc?.value?.url ?? content?.url} target={content?.newTab ? '_blank' : undefined} />
  {:else if content?.fields?.style === 'transparent'}
    <Button label={content?.children[0]?.text} href={content?.doc?.value?.url ?? content?.url} target={content?.newTab ? '_blank' : undefined} transparant={true} />
  {:else if content?.linkType === 'internal'}
    <a class="text-alternate inline font-bold underline hover:no-underline" href={content?.doc?.value?.url} target={content?.newTab ? '_blank' : ''}>{content?.children?.[0]?.text}</a>
  {:else}
    <a class="text-alternate inline font-bold underline hover:no-underline" href={content?.url} target={content?.newTab ? '_blank' : ''}>{content?.children?.[0]?.text}</a>
  {/if}
{/if}
