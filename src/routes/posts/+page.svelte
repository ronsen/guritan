<script lang="ts">
	import type { PageServerData } from './$types';
	import Alert from '$lib/components/alert.svelte';
	import Delete from '$lib/components/delete.svelte';

	import Fa from 'svelte-fa';
	import {
		faHome,
		faLink,
		faPencil,
		faAdd,
	} from '@fortawesome/free-solid-svg-icons';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="mb-4 flex justify-between">
	<ul class="inline-flex items-baseline gap-3 text-xs uppercase">
		<li><a href="/"><Fa icon={faHome} /></a></li>
		<li>/</li>
		<li><a href="/posts">Posts</a></li>
	</ul>

	<a href="/posts/add" class="btn btn-ghost"><Fa icon={faAdd} /></a>
</div>

{#if data.posts}
	{#if !data.posts?.items}
		<Alert>Empty.</Alert>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full table-auto">
				<thead>
					<tr
						class="border-b border-zinc-800 text-left text-xs uppercase">
						<th class="p-2">Title</th>
						<th class="w-10 p-2">&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{#each data.posts?.items as post}
						<tr class="border-b border-zinc-800">
							<td class="p-2"
								><a href="/posts/{post.id}">{post.title}</a
								></td>
							<td class="p-2">
								<div class="inline-flex gap-3">
									<a href={post.url} target="_blank"
										><Fa icon={faLink} /></a>
									<a href="/posts/{post.id}/edit"
										><Fa icon={faPencil} /></a>
									<Delete
										action="/posts/{post.id}/delete"
										message="Delete this post: {post.title}?" />
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{/if}
