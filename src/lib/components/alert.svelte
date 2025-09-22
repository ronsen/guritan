<script lang="ts">
	import type { Snippet } from 'svelte';
	import { TriangleAlert } from '@lucide/svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="mb-6 rounded-lg border border-zinc-700 p-4 shadow-lg">
	<div class="inline-flex items-center gap-2">
		<TriangleAlert size={16} />
		<div>
			{@render children()}
		</div>
	</div>
</div>
