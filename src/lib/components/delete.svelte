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

<button onclick={() => dialog.show()}><Fa icon={faTrash }/></button>

<dialog bind:this={dialog} class="w-full md:w-2/5 rounded-lg shadow-lg backdrop:backdrop-blur bg-zinc-800 text-white/90 p-4">
	<form {action} method="post" onsubmit="{submit}"  use:enhance>
		<h3 class="font-bold">Confirm</h3>
		<p class="py-4">{@html message}</p>
		<div>
			<button class="px-3 py-2 text-sm border border-zinc-700 rounded-lg bg-zinc-800 hover:bg-zinc-700" onclick={close}>No</button>
			<button type="submit" class="px-3 py-2 text-sm border border-red-800 rounded-lg bg-red-800 hover:bg-red-700">Yes</button>
		</div>
	</form>
</dialog>