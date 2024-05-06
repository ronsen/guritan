<script lang="ts">
	import type { PageServerData } from "./$types";
	import Delete from "$lib/components/delete.svelte";

	import Fa from "svelte-fa";
	import {
		faHome,
		faLink,
		faPencil,
		faTrash,
	} from "@fortawesome/free-solid-svg-icons";

	export let data: PageServerData;
</script>

{#if data.post}
	<div class="breadcrumbs text-sm uppercase mb-4">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/posts">Posts</a></li>
			<li><a href="/posts/{data.post?.id}">{data.post?.title}</a></li>
		</ul>
	</div>

	<div class="flex justify-between items-center mb-4">
		<h1 class="font-bold text-2xl">
			<a href="/posts/{data.post?.id}">{data.post?.title}</a>
		</h1>

		<div class="inline-flex gap-3">
			<a href={data.post?.url} target="_blank"><Fa icon={faLink} /></a>
			<a href="/posts/{data.post?.id}/edit"><Fa icon={faPencil} /></a>
			<Delete
				action="/posts/{data.post?.id}/delete"
				message="Delete this post?"
			/>
		</div>
	</div>

	<div class="text-sm mb-4">
		{data.post?.publishedAt}
	</div>

	<div class="prose max-w-none mb-4">
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
