<script lang="ts">
    import type { ActionData, PageServerData } from './$types';
	import { enhance } from "$app/forms";
    import Alert from '$lib/components/alert.svelte';

	import Fa from "svelte-fa";
	import { faHome } from "@fortawesome/free-solid-svg-icons";
    
    export let data: PageServerData;
	export let form: ActionData;
</script>

{#if data.page}
	<div class="text-sm breadcrumbs mb-4">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/pages">Pages</a></li>
			<li><a href="/pages/{data.page?.id}/edit">{data.page?.title}</a></li>
		</ul>
	</div>

	{#if form?.error}
		<Alert>{@html form?.message}</Alert>
	{/if}

	<form method="post" use:enhance>
		<div class="mb-3">
			<input
				type="text"
				name="title"
				value="{data.page?.title}"
				class="input input-bordered w-full">
		</div>
		<div class="mb-3">
			<textarea
				name="content"
				class="textarea textarea-bordered w-full h-80 font-mono"
			>{data.page?.contentToMarkdown}</textarea>
		</div>
		<button type="submit" class="btn btn-primary w-full">Update</button>
	</form>
{/if}