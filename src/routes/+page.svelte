<script lang="ts">
	import type { PageServerData } from "./$types";
	import Fa from "svelte-fa";
	import { faPencil } from "@fortawesome/free-solid-svg-icons";
	import Alert from "$lib/components/alert.svelte";

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Guritan</title>
</svelte:head>

{#if data.posts}
	{#if !data.posts?.items}
		<Alert>No posts found.</Alert>
	{:else}
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr class="uppercase">
						<th>Title</th>
						<th class="w-10">&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{#each data.posts?.items as post}
						<tr>
							<td><a href="/posts/{post.id}">{post.title}</a></td>
							<td><a href="/posts/{post.id}/edit"><Fa icon={faPencil} /></a></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{/if}