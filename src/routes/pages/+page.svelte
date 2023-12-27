<script lang="ts">
	import type { PageServerData } from "./$types";
	import { enhance } from "$app/forms";
	import type { blogger_v3 } from "googleapis";
	import Alert from "$lib/components/alert.svelte";
	
	import Fa from "svelte-fa";
	import {
		faHome,
		faAdd,
		faLink,
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


<div class="flex justify-between mb-4">
	<div class="breadcrumbs text-sm uppercase">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/pages">Pages</a></li>
		</ul>
	</div>

	<a href="/pages/add" class="btn btn-ghost"><Fa icon={faAdd} /></a>
</div>

{#if data.pages}
	{#if !data.pages?.items}
		<Alert>No pages found.</Alert>
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
					{#each data.pages?.items as page}
						<tr>
							<td><a href="/pages/{page.id}">{page.title}</a></td>
							<td>
								<div class="inline-flex gap-3">
									<a href="{page.url}" target="_blank"><Fa icon={faLink} /></a>
									<a href="/pages/{page.id}/edit"><Fa icon={faPencil} /></a>
									<button on:click={() => destroy(page)}><Fa icon={faTrash }/></button>
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
				<p class="py-4">Delete this page?</p>
				<div class="modal-action">
					<button class="btn btn-neutral btn-sm" on:click|preventDefault={() => dialog.close()}>No</button>
					<button type="submit" class="btn btn-error btn-sm">Yes</button>
				</div>
			</form>
		</dialog>
	{/if}
{/if}