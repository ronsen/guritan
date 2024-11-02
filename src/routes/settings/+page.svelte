<script lang="ts">
	import type { PageServerData } from "./$types";
	import { enhance } from "$app/forms";

	import Fa from "svelte-fa";
	import { faHome } from "@fortawesome/free-solid-svg-icons";

	let { data }: { data: PageServerData } = $props();
</script>

<div class="breadcrumbs text-sm uppercase mb-4">
	<ul>
		<li><a href="/"><Fa icon={faHome} /></a></li>
		<li><a href="/settings">Settings</a></li>
	</ul>
</div>

<form method="post" use:enhance>
	<div class="mb-3">
		<input type="text" name="blog" value={data.blogId} placeholder="Blog ID" class="input input-bordered w-full">
		<div class="label">
			<div class="label-text-alt">Blog ID</div>
		</div>
	</div>
	<button type="submit" class="btn btn-primary w-full">Save</button>
</form>
