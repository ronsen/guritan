<script lang="ts">
	import type { PageServerData } from './$types';
	import { ExternalLink, House, Pencil } from '@lucide/svelte';
	import Delete from '$lib/components/delete.svelte';

	let { data }: { data: PageServerData } = $props();
</script>

{#if data.page}
	<ul class="mb-4 inline-flex items-center gap-3 text-xs uppercase">
		<li><a href="/"><House size={16} /></a></li>
		<li>/</li>
		<li><a href="/pages">Pages</a></li>
		<li>/</li>
		<li><a href="/pages/{data.page?.id}">{data.page?.title}</a></li>
	</ul>

	<div class="mb-4 flex items-center justify-between">
		<h1 class="font-bold">
			<a href="/pages/{data.page?.id}">{data.page?.title}</a>
		</h1>

		<div class="inline-flex gap-3">
			<a href={data.page?.url} target="_blank"
				><ExternalLink size={16} /></a>
			<a href="/pages/{data.page?.id}/edit"><Pencil size={16} /></a>
			<Delete
				action="/pages/{data.page.id}/delete"
				message="Delete this page?" />
		</div>
	</div>

	<div class="mb-4 text-sm">
		{data.page?.publishedAt}
	</div>

	<div class="prose prose-invert max-w-none">
		{@html data.page?.content}
	</div>
{/if}
