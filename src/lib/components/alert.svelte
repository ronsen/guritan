<script lang="ts">
	import type {Snippet} from 'svelte';

	import Fa from 'svelte-fa';
	import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

	let {children}: {children: Snippet} = $props();
</script>

<div class="mb-6 rounded-lg border border-zinc-700 p-4 shadow-lg">
	<div class="inline-flex items-center gap-2">
		<Fa icon={faTriangleExclamation} />
		<div>
			{@render children()}
		</div>
	</div>
</div>
