<script lang="ts">
    import type { PageServerData } from './$types';
    
    export let data: PageServerData;
</script>

<form method="post">
	<div class="mb-3">
		<input type="number" name="blog" value="{data.blogId}" placeholder="Blog ID" class="input input-bordered w-full">
		<div class="label">
			<div class="label-text-alt">Blog ID</div>
		</div>
	</div>
	<button type="submit" class="btn btn-primary w-full">Save</button>
</form>