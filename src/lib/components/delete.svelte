<script lang="ts">
	import { enhance } from "$app/forms";

	import Fa from "svelte-fa";
	import { faTrash } from "@fortawesome/free-solid-svg-icons";

	let dialog: HTMLDialogElement;

	let { action, message }: { action: string; message: string } = $props();

	function close(event: Event) {
		event.preventDefault();
		dialog.close();
	}

	function submit() {
		dialog.close();
	}
</script>

<button onclick={() => dialog.show()}><Fa icon={faTrash} /></button>

<dialog
	bind:this={dialog}
	class="w-3/4 md:w-2/5 border border-zinc-700 rounded-lg shadow-lg bg-zinc-900 text-white/90"
>
	<form {action} method="post" onsubmit={submit} use:enhance>
		<div class="p-4">
			<h3 class="font-bold mb-3">Confirm</h3>
			<p>{@html message}</p>
		</div>
		<div class="flex justify-between gap-4 items-center p-4 bg-zinc-800">
			<button
				class="px-3 py-2 text-sm border border-zinc-700 rounded-lg bg-zinc-800 hover:bg-zinc-700"
				onclick={close}>No</button
			>
			<button
				type="submit"
				class="px-3 py-2 text-sm text-black/90 rounded-lg bg-zinc-100 hover:bg-zinc-200"
				>Yes</button
			>
		</div>
	</form>
</dialog>
