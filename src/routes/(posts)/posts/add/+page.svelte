<script lang="ts">
    import type { ActionData } from './$types';
	import { enhance } from "$app/forms";
    import Alert from '$lib/components/alert.svelte';
    
	export let form: ActionData;
</script>

<svelte:head>
	<title>Add New Post</title>
</svelte:head>

{#if form?.error}
    <Alert>{@html form?.message}</Alert>
{/if}

<form method="post" use:enhance>
	<div class="mb-3">
		<input type="text" name="title" placeholder="Title" class="input input-bordered w-full">
	</div>
	<div class="mb-3">
		<textarea name="content" class="textarea textarea-bordered w-full h-80"></textarea>
	</div>
	<button type="submit" class="btn btn-primary w-full">Save</button>
</form>