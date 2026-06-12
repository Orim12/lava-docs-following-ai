# RichText Svelte Component (Lexical)

The Lexical rich text renderer follows the same component structure as the Slate example.

```svelte
{#each data.items as item}
  <RichText json={item.richTextField} />
{/each}
```

For Lexical-specific rendering, use the helpers from `@payloadcms/richtext-lexical` such as `convertHTMLToLexical` or `convertLexicalToPlaintext`.

See `frontend/src/lib/components/richtext/richText.svelte` for the base renderer component.
