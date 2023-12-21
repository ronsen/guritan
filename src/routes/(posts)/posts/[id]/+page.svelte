<script lang="ts">
    import type { PageServerData } from './$types';
    
    export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.post?.title}</title>
</svelte:head>

{#if data.post}
	<h1 class="font-bold text-2xl mb-6">{data.post?.title}</h1>

	<div class="prose max-w-none">
		{@html data.post?.content}
	</div>
{/if}