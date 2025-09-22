<script lang="ts">
	import type { PageServerData } from './$types';
	import { enhance } from '$app/forms';
	import { House } from '@lucide/svelte';

	let { data }: { data: PageServerData } = $props();
</script>

<ul class="mb-4 inline-flex items-center gap-3 text-xs uppercase">
	<li><a href="/"><House size={16} /></a></li>
	<li>/</li>
	<li><a href="/settings">Settings</a></li>
</ul>

<form method="post" use:enhance>
	<div class="mb-3">
		<input
			type="text"
			name="blog"
			value={data.blogId}
			placeholder="Blog ID"
			class="w-full rounded-lg bg-zinc-800" />
		<div class="mt-1 text-xs text-white/80">Blog ID</div>
	</div>
	<button
		type="submit"
		class="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-sm hover:bg-zinc-700"
		>Save</button>
</form>
