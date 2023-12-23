<script lang="ts">
	import type { PageServerData } from './$types';
	import Fa from "svelte-fa";
	import { faHome, faPencil } from "@fortawesome/free-solid-svg-icons";

	export let data: PageServerData;
</script>

{#if data.page}
	<div class="text-sm breadcrumbs mb-4">
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

		<a href="/pages/{data.page?.id}/edit"><Fa icon={faPencil} /></a>
	</div>

	<div class="text-sm mb-4">
		{data.page?.published}
	</div>

	<div class="prose max-w-none">
		{@html data.page?.content}
	</div>
{/if}