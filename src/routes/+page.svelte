<script lang="ts">
	import type { PageServerData } from "./$types";

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Guritan</title>
</svelte:head>

{#if data.blog}
	<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr>
					<th>Title</th>
					<th class="w-[200px]">Published</th>
				</tr>
			</thead>
			<tbody>
				{#each data.posts as post}
					<tr>
						<td>{post.title}</td>
						<td>{post.published}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
