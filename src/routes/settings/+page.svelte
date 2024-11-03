<script lang="ts">
	import type { PageServerData } from "./$types";
	import { enhance } from "$app/forms";

	import Fa from "svelte-fa";
	import { faHome } from "@fortawesome/free-solid-svg-icons";

	let { data }: { data: PageServerData } = $props();
</script>


<ul class="inline-flex items-baseline gap-3 text-xs uppercase mb-4">
	<li><a href="/"><Fa icon={faHome} /></a></li>
	<li>/</li>
	<li><a href="/settings">Settings</a></li>
</ul>

<form method="post" use:enhance>
	<div class="mb-3">
		<input type="text"
			   name="blog"
			   value={data.blogId}
			   placeholder="Blog ID"
			   class="rounded-lg bg-zinc-800 w-full">
		<div class="mt-1 text-xs text-white/80">Blog ID</div>
	</div>
	<button
			type="submit"
			class="p-2 text-sm border border-zinc-700 rounded-lg bg-zinc-800 hover:bg-zinc-700 w-full"
	>Save</button>
</form>
