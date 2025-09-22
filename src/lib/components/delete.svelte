<script lang="ts">
	import { enhance } from '$app/forms';
	import { Trash } from '@lucide/svelte';

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

<button onclick={() => dialog.show()}><Trash size={16} /></button>

<dialog
	bind:this={dialog}
	class="m-auto w-3/4 rounded-lg border border-zinc-700 bg-zinc-900 text-white/90 shadow-lg backdrop-blur-sm md:w-2/5">
	<form {action} method="post" onsubmit={submit} use:enhance>
		<div class="p-4">
			<h3 class="mb-3 font-bold">Confirm</h3>
			<p>{@html message}</p>
		</div>
		<div class="flex items-center justify-between gap-4 bg-zinc-800 p-4">
			<button
				class="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm hover:bg-zinc-700"
				onclick={close}>No</button>
			<button
				type="submit"
				class="rounded-lg bg-zinc-100 px-3 py-2 text-sm text-black/90 hover:bg-zinc-200"
				>Yes</button>
		</div>
	</form>
</dialog>
