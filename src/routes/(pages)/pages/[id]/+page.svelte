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

	function destroy(page: blogger_v3.Schema$Page) {
		action = `/pages/${page.id}/delete`;
        dialog.show();
	}

	export let data: PageServerData;
</script>

{#if data.page}
	<div class="breadcrumbs text-sm uppercase mb-4">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/pages">Pages</a></li>
			<li><a href="/pages/{data.page?.id}">{data.page?.title}</a></li>
		</ul>
	</div>

	<div class="flex justify-between items-center mb-4">
		<h1 class="font-bold text-2xl">
			<a href="/pages/{data.page?.id}">{data.page?.title}</a>
		</h1>

		<div class="inline-flex gap-3">
			<a href="/pages/{data.page?.id}/edit"><Fa icon={faPencil} /></a>
			<button on:click={() => destroy(data.page)}><Fa icon={faTrash }/></button>
		</div>
	</div>

	<div class="text-sm mb-4">
		{data.page?.publishedAt}
	</div>

	<div class="prose max-w-none">
		{@html data.page?.content}
	</div>

	<dialog bind:this={dialog} class="modal">
		<form {action} method="post" class="modal-box" on:submit|preventDefault={() => dialog.close()} use:enhance>
			<h3 class="font-bold text-lg">Confirm</h3>
			<p class="py-4">Delete this page?</p>
			<div class="modal-action">
				<button class="btn btn-neutral btn-sm" on:click|preventDefault={() => dialog.close()}>No</button>
				<button type="submit" class="btn btn-error btn-sm">Yes</button>
			</div>
		</form>
	</dialog>
{/if}