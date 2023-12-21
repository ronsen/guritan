<script lang="ts">
    import type { PageServerData } from './$types';
    
    export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.post?.title}</title>
</svelte:head>

<form method="post">
	<div class="mb-3">
		<input type="text" name="title" value="{data.post?.title}" class="input input-bordered w-full">
	</div>
	<div class="mb-3">
		<textarea name="content" class="textarea textarea-bordered w-full h-80">{data.post?.content}</textarea>
	</div>
	<button type="submit" class="btn btn-primary w-full">Update</button>
</form>