<script lang="ts">
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";
	import Alert from "$lib/components/alert.svelte";

	import Fa from "svelte-fa";
	import { faHome } from "@fortawesome/free-solid-svg-icons";

	let { form }: { form: ActionData } = $props();
</script>

<ul class="inline-flex items-baseline gap-3 text-xs uppercase mb-4">
	<li><a href="/"><Fa icon={faHome} /></a></li>
	<li>/</li>
	<li><a href="/posts">Posts</a></li>
	<li>/</li>
	<li><a href="/posts/add">Add New Post</a></li>
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
			class="rounded-lg bg-zinc-800 w-full"
		/>
	</div>
	<div class="mb-3">
		<textarea
			name="content"
			class="rounded-lg bg-zinc-800 w-full h-96 text-sm font-mono"
		></textarea>
	</div>
	<div class="mb-3">
		<input
			type="text"
			name="labels"
			placeholder="Labels (seperated by comma)"
			class="rounded-lg bg-zinc-800 w-full"
		/>
	</div>
	<button
		type="submit"
		class="p-2 text-sm border border-zinc-700 rounded-lg bg-zinc-800 hover:bg-zinc-700 w-full"
		>Save</button
	>
</form>
