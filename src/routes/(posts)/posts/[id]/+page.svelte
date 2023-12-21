<script lang="ts">
    import type { PageServerData } from './$types';
	import Fa from "svelte-fa";
	import { faHome, faPencil } from "@fortawesome/free-solid-svg-icons";
    
    export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.post?.title}</title>
</svelte:head>

{#if data.post}
	<div class="text-sm breadcrumbs mb-4">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/posts/{data.post?.id}">{data.post?.title}</a></li>
		</ul>
	</div>

	<h1 class="font-bold text-2xl mb-4">
		<a href="/posts/{data.post?.id}">{data.post?.title}</a>
	</h1>

	<div class="flex justify-between text-sm mb-4">
		{data.post?.published}
		<a href="/posts/{data.post?.id}/edit"><Fa icon={faPencil} /></a>
	</div>

	<div class="prose max-w-none">
		{@html data.post?.content}
	</div>
{/if}