<script lang="ts">
	import type { PageServerData } from "./$types";
	import Delete from "$lib/components/delete.svelte";

	import Fa from "svelte-fa";
	import {
		faHome,
		faLink,
		faPencil,
	} from "@fortawesome/free-solid-svg-icons";

	let { data }: { data: PageServerData } = $props();
</script>

{#if data.page}
	<div class="breadcrumbs text-sm uppercase mb-4">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/pages">Pages</a></li>
			<li><a href="/pages/{data.page?.id}">{data.page?.title}</a></li>
		</ul>
	</div>

	<div class="flex justify-between items-center mb-4">
		<h1 class="font-bold text-2xl">
			<a href="/pages/{data.page?.id}">{data.page?.title}</a>
		</h1>

		<div class="inline-flex gap-3">
			<a href={data.page?.url} target="_blank"><Fa icon={faLink} /></a>
			<a href="/pages/{data.page?.id}/edit"><Fa icon={faPencil} /></a>
			<Delete
				action="/pages/{data.page.id}/delete"
				message="Delete this page?"
			/>
		</div>
	</div>

	<div class="text-sm mb-4">
		{data.page?.publishedAt}
	</div>

	<div class="prose max-w-none">
		{@html data.page?.content}
	</div>
{/if}
