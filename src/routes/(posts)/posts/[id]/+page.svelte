<script lang="ts">
	import type { PageServerData } from './$types';
	import Fa from "svelte-fa";
	import { faHome, faPencil } from "@fortawesome/free-solid-svg-icons";

	export let data: PageServerData;
</script>

{#if data.post}
	<div class="text-sm breadcrumbs mb-4">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/posts">Posts</a></li>
			<li><a href="/posts/{data.post?.id}">{data.post?.title}</a></li>
		</ul>
	</div>

	<div class="flex justify-between mb-4">
		<h1 class="font-bold text-2xl">
			<a href="/posts/{data.post?.id}">{data.post?.title}</a>
		</h1>

		<a href="/posts/{data.post?.id}/edit"><Fa icon={faPencil} /></a>
	</div>

	<div class="text-sm mb-4">
		{data.post?.published}
	</div>

	<div class="prose max-w-none">
		{@html data.post?.content}
	</div>
{/if}