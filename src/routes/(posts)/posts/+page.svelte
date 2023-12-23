<script lang="ts">
	import type { PageServerData } from "./$types";
	import Alert from "$lib/components/alert.svelte";
	
	import Fa from "svelte-fa";
	import { 
		faHome, 
		faPencil, 
		faAdd
	} from "@fortawesome/free-solid-svg-icons";

	export let data: PageServerData;
</script>

<div class="flex justify-between mb-4">
	<div class="text-sm breadcrumbs">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/posts">Posts</a></li>
		</ul>
	</div>

	<a href="/posts/add" class="btn btn-ghost"><Fa icon={faAdd} /></a>
</div>

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