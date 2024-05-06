<script lang="ts">
	import type { PageServerData } from "./$types";
	import Alert from "$lib/components/alert.svelte";
	import Delete from "$lib/components/delete.svelte";

	import Fa from "svelte-fa";
	import {
		faHome,
		faLink,
		faPencil,
		faAdd,
	} from "@fortawesome/free-solid-svg-icons";

	export let data: PageServerData;
</script>

<div class="flex justify-between mb-4">
	<div class="breadcrumbs text-sm uppercase">
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
							<td>
								<div class="inline-flex gap-3">
									<a href={post.url} target="_blank"><Fa icon={faLink} /></a>
									<a href="/posts/{post.id}/edit"><Fa icon={faPencil} /></a>
									<Delete
										action="/posts/{post.id}/delete"
										message="Delete this post: {post.title}?"
									/>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{/if}
