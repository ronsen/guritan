<script lang="ts">
	import type { PageServerData } from "./$types";
	import Alert from "$lib/components/alert.svelte";
	
	import Fa from "svelte-fa";
	import {
		faHome,
		faAdd,
		faPencil
	} from "@fortawesome/free-solid-svg-icons";

	export let data: PageServerData;
</script>


<div class="flex justify-between mb-4">
	<div class="text-sm breadcrumbs">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/pages">Pages</a></li>
		</ul>
	</div>

	<a href="/pages/add" class="btn btn-ghost"><Fa icon={faAdd} /></a>
</div>

{#if data.pages}
	{#if !data.pages?.items}
		<Alert>No Pages found.</Alert>
	{:else}
	<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr class="uppercase">
					<th>Title</th>
					<th class="w-10">&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				{#each data.pages?.items as page}
					<tr>
						<td><a href="/pages/{page.id}">{page.title}</a></td>
						<td><a href="/pages/{page.id}/edit"><Fa icon={faPencil} /></a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{/if}
{/if}