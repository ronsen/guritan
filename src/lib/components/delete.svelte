<script lang="ts">
	import { enhance } from "$app/forms";

	import Fa from "svelte-fa";
	import { faTrash } from "@fortawesome/free-solid-svg-icons";

	let dialog: HTMLDialogElement;

	let { action, message }: { action: string; message: string } = $props();
</script>

<button onclick={() => dialog.show()}><Fa icon={faTrash }/></button>

<dialog bind:this={dialog} class="modal">
	<form {action} method="post" class="modal-box" onsubmit={() => dialog.close()} use:enhance>
		<h3 class="font-bold text-lg">Confirm</h3>
		<p class="py-4">{@html message}</p>
		<div class="modal-action">
			<button class="btn btn-neutral btn-sm" onclick={() => dialog.close()}>No</button>
			<button type="submit" class="btn btn-error btn-sm">Yes</button>
		</div>
	</form>
</dialog>