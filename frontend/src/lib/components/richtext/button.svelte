<script lang="ts">
  export let label: string;
  export let href: string;
  export let target: string = '';
  export let transparant: boolean = false;
</script>

<a {href} {target} class="button {transparant ? 'transparant' : ''}">
  {label}
</a>

<style>
  .button { display: inline-block; padding: 8px 16px; background-color: #007acc; color: white; text-decoration: none; border-radius: 4px; transition: background-color 0.2s ease; }
  .button:hover { background-color: #005fa3; }
  .button.transparant { background-color: transparent; border: 1px solid #007acc; color: #007acc; }
  .button.transparant:hover { background-color: rgba(0, 122, 204, 0.1); }
</style>
