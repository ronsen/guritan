<script lang="ts">
	import type { PageServerData } from "./$types";
	import { enhance } from "$app/forms";
	import type { blogger_v3 } from "googleapis";
	import Alert from "$lib/components/alert.svelte";
	
	import Fa from "svelte-fa";
	import { 
		faHome, 
		faPencil, 
		faAdd,
		faTrash
	} from "@fortawesome/free-solid-svg-icons";

	let dialog: HTMLDialogElement;
	let action: string = '';

	function destroy(post: blogger_v3.Schema$Post) {
		action = `/posts/${post.id}/delete`;
        dialog.show();
	}

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
									<a href="/posts/{post.id}/edit"><Fa icon={faPencil} /></a>
									<button on:click={() => destroy(post)}><Fa icon={faTrash }/></button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<dialog bind:this={dialog} class="modal">
			<form {action} method="post" class="modal-box" on:submit|preventDefault={() => dialog.close()} use:enhance>
				<h3 class="font-bold text-lg">Confirm</h3>
				<p class="py-4">Delete this post?</p>
				<div class="modal-action">
					<button class="btn btn-neutral btn-sm" on:click|preventDefault={() => dialog.close()}>No</button>
					<button type="submit" class="btn btn-error btn-sm">Yes</button>
				</div>
			</form>
		</dialog>
	{/if}
{/if}