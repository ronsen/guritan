<script lang="ts">
	import type { PageServerData } from "./$types";
	import Fa from "svelte-fa";
	import { faHome } from "@fortawesome/free-solid-svg-icons";
	import Alert from "$lib/components/alert.svelte";

	export let data: PageServerData;
</script>

<div class="text-sm breadcrumbs mb-4">
	<ul>
		<li><a href="/"><Fa icon={faHome} /></a></li>
		<li><a href="/pages">Pages</a></li>
	</ul>
</div>