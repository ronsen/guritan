<script lang="ts">
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";
	import Alert from "$lib/components/alert.svelte";

	import Fa from "svelte-fa";
	import { faHome } from "@fortawesome/free-solid-svg-icons";

	let { form }: { form: ActionData } = $props();
</script>

<div class="breadcrumbs text-sm uppercase mb-4">
	<ul>
		<li><a href="/"><Fa icon={faHome} /></a></li>
		<li><a href="/posts">Posts</a></li>
		<li><a href="/posts/add">Add New Post</a></li>
	</ul>
</div>

{#if form?.error}
	<Alert>{@html form?.message}</Alert>
{/if}

<form method="post" use:enhance>
	<div class="mb-3">
		<input type="text" name="title" placeholder="Title" class="input input-bordered w-full">
	</div>
	<div class="mb-3">
		<textarea name="content" class="textarea textarea-bordered w-full h-40 font-mono"></textarea>
	</div>
	<div class="mb-3">
		<input type="text" name="labels" placeholder="Labels (seperated by comma)" class="input input-bordered w-full">
	</div>
	<button type="submit" class="btn btn-primary w-full">Save</button>
</form>
