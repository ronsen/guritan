<script lang="ts">
	import type { Snippet } from "svelte";

	import Fa from "svelte-fa";
	import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

	let { children }: { children: Snippet } = $props();
</script>

<div class="border border-zinc-700 rounded-lg p-4 shadow-lg mb-6">
    <div class="inline-flex items-center gap-2">
		<Fa icon={faTriangleExclamation} />
		<div>
			{@render children()}
		</div>
    </div>
</div>