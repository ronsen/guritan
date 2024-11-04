<script lang="ts">
	import type { PageServerData } from './$types';
	import Delete from '$lib/components/delete.svelte';

	import Fa from 'svelte-fa';
	import {
		faHome,
		faLink,
		faPencil,
	} from '@fortawesome/free-solid-svg-icons';

	let { data }: { data: PageServerData } = $props();
</script>

{#if data.page}
	<ul class="mb-4 inline-flex items-baseline gap-3 text-xs uppercase">
		<li><a href="/"><Fa icon={faHome} /></a></li>
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
			<a href={data.page?.url} target="_blank"><Fa icon={faLink} /></a>
			<a href="/pages/{data.page?.id}/edit"><Fa icon={faPencil} /></a>
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
