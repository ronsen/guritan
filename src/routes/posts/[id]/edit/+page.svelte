<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import { enhance } from '$app/forms';
	import { House } from '@lucide/svelte';
	import Alert from '$lib/components/alert.svelte';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

{#if data.post}
	<ul class="mb-4 inline-flex items-center gap-3 text-xs uppercase">
		<li><a href="/"><House size={16} /></a></li>
		<li>/</li>
		<li><a href="/posts">Posts</a></li>
		<li>/</li>
		<li>
			<a href="/posts/{data.post?.id}/edit"
				>{data.post?.title ? data.post?.title : ['[No Title]']}</a>
		</li>
	</ul>

	{#if form?.error}
		<Alert>{@html form?.message}</Alert>
	{/if}

	<form method="post" use:enhance>
		<div class="mb-3">
			<input
				type="text"
				name="title"
				value={data.post?.title}
				class="w-full rounded-lg bg-zinc-800" />
		</div>

		<div class="mb-3">
			<textarea
				name="content"
				class="h-96 w-full rounded-lg bg-zinc-800 font-mono text-sm"
				>{data.post?.contentToMarkdown}</textarea>
		</div>

		<div class="mb-3">
			<input
				type="text"
				name="labels"
				value={data.post?.labels ? data.post?.labels : ''}
				class="w-full rounded-lg bg-zinc-800" />
			<div class="mt-1 text-xs">Seperated by comma</div>
		</div>

		<button
			type="submit"
			class="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-sm hover:bg-zinc-700"
			>Update</button>
	</form>
{/if}
