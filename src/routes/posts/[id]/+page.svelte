<script lang="ts">
	import type { PageServerData } from './$types';
	import { ExternalLink, House, Pencil } from '@lucide/svelte';
	import Delete from '$lib/components/delete.svelte';

	let { data }: { data: PageServerData } = $props();
</script>

{#if data.post}
	<ul class="mb-4 inline-flex items-center gap-3 text-xs uppercase">
		<li><a href="/"><House size={16} /></a></li>
		<li>/</li>
		<li><a href="/posts">Posts</a></li>
		<li>/</li>
		<li><a href="/posts/{data.post?.id}">{data.post?.title}</a></li>
	</ul>

	<div class="mb-4 flex items-center justify-between">
		<h1 class="text-lg font-bold">
			<a href="/posts/{data.post?.id}">{data.post?.title}</a>
		</h1>

		<div class="inline-flex gap-3">
			<a href={data.post?.url} target="_blank"
				><ExternalLink size={16} /></a>
			<a href="/posts/{data.post?.id}/edit"><Pencil size={16} /></a>
			<Delete
				action="/posts/{data.post?.id}/delete"
				message="Delete this post?" />
		</div>
	</div>

	<div class="mb-4 text-sm">
		{data.post?.publishedAt}
	</div>

	<div class="prose prose-invert mb-4 max-w-none">
		{@html data.post?.content}
	</div>

	{#if data.post?.labels}
		<div class="flex justify-center gap-3">
			{#each data.post?.labels as label}
				<div class="badge">{label}</div>
			{/each}
		</div>
	{/if}
{/if}
