<script lang="ts">
    import type { ActionData, PageServerData } from './$types';
	import { enhance } from "$app/forms";
    import Alert from '$lib/components/alert.svelte';

	import Fa from "svelte-fa";
	import { faHome, faPencil } from "@fortawesome/free-solid-svg-icons";
    
    export let data: PageServerData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>{data.post?.title}</title>
</svelte:head>

{#if data.post}
	<div class="text-sm breadcrumbs mb-4">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/posts/{data.post?.id}/edit">{data.post?.title}</a></li>
		</ul>
	</div>

	{#if form?.error}
		<Alert>{@html form?.message}</Alert>
	{/if}

	<form method="post" use:enhance>
		<div class="mb-3">
			<input type="text" name="title" value="{data.post?.title}" class="input input-bordered w-full">
		</div>
		<div class="mb-3">
			<textarea name="content" class="textarea textarea-bordered w-full h-80">{data.post?.contentToMarkdown}</textarea>
		</div>
		<button type="submit" class="btn btn-primary w-full">Update</button>
	</form>
{/if}