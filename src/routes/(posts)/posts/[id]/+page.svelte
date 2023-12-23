<script lang="ts">
	import type { PageServerData } from './$types';
	import { enhance } from "$app/forms";
	import type { blogger_v3 } from "googleapis";

	import Fa from "svelte-fa";
	import { 
		faHome, 
		faPencil,
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

{#if data.post}
	<div class="text-sm breadcrumbs mb-4">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/posts">Posts</a></li>
			<li><a href="/posts/{data.post?.id}">{data.post?.title}</a></li>
		</ul>
	</div>

	<div class="flex justify-between items-center mb-4">
		<h1 class="font-bold text-2xl">
			<a href="/posts/{data.post?.id}">{data.post?.title}</a>
		</h1>

		<div class="inline-flex gap-3">
			<a href="/posts/{data.post?.id}/edit"><Fa icon={faPencil} /></a>
			<button on:click={() => destroy(data.post)}><Fa icon={faTrash }/></button>
		</div>
	</div>

	<div class="text-sm mb-4">
		{data.post?.published}
	</div>

	<div class="prose max-w-none">
		{@html data.post?.content}
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