<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { House } from '@lucide/svelte';
	import Alert from '$lib/components/alert.svelte';

	let { form }: { form: ActionData } = $props();
</script>

<ul class="mb-4 inline-flex items-center gap-3 text-xs uppercase">
	<li><a href="/"><House size={16} /></a></li>
	<li>/</li>
	<li><a href="/pages">Pages</a></li>
	<li>/</li>
	<li><a href="/pages/add">Add New Page</a></li>
</ul>

{#if form?.error}
	<Alert>{@html form?.message}</Alert>
{/if}

<form method="post" use:enhance>
	<div class="mb-3">
		<input
			type="text"
			name="title"
			placeholder="Title"
			class="w-full rounded-lg bg-zinc-800" />
	</div>
	<div class="mb-3">
		<textarea
			name="content"
			class="h-96 w-full rounded-lg bg-zinc-800 font-mono text-sm"
		></textarea>
	</div>
	<button
		type="submit"
		class="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-sm hover:bg-zinc-700"
		>Save</button>
</form>
