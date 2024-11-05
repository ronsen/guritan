<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import { enhance } from '$app/forms';
	import Alert from '$lib/components/alert.svelte';

	import Fa from 'svelte-fa';
	import { faHome } from '@fortawesome/free-solid-svg-icons';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

{#if data.page}
	<ul class="mb-4 inline-flex items-center gap-3 text-xs uppercase">
		<li><a href="/"><Fa icon={faHome} /></a></li>
		<li>/</li>
		<li><a href="/pages">Pages</a></li>
		<li>/</li>
		<li>
			<a href="/pages/{data.page?.id}/edit">{data.page?.title}</a>
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
				value={data.page?.title}
				class="w-full rounded-lg bg-zinc-800" />
		</div>
		<div class="mb-3">
			<textarea
				name="content"
				class="h-96 w-full rounded-lg bg-zinc-800 font-mono text-sm"
				>{data.page?.contentToMarkdown}</textarea>
		</div>
		<button
			type="submit"
			class="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-sm hover:bg-zinc-700"
			>Update</button>
	</form>
{/if}
