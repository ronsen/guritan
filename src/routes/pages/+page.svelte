<script lang="ts">
	import type { PageServerData } from "./$types";
	import Alert from "$lib/components/alert.svelte";
	import Delete from "$lib/components/delete.svelte";

	import Fa from "svelte-fa";
	import {
		faHome,
		faAdd,
		faLink,
		faPencil,
	} from "@fortawesome/free-solid-svg-icons";

	export let data: PageServerData;
</script>

<div class="flex justify-between mb-4">
	<div class="breadcrumbs text-sm uppercase">
		<ul>
			<li><a href="/"><Fa icon={faHome} /></a></li>
			<li><a href="/pages">Pages</a></li>
		</ul>
	</div>

	<a href="/pages/add" class="btn btn-ghost"><Fa icon={faAdd} /></a>
</div>

{#if data.pages}
	{#if !data.pages?.items}
		<Alert>No pages found.</Alert>
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
							<td>
								<div class="inline-flex gap-3">
									<a href={page.url} target="_blank"><Fa icon={faLink} /></a>
									<a href="/pages/{page.id}/edit"><Fa icon={faPencil} /></a>
									<Delete
										action="/pages/{page.id}/delete"
										message="Delete this page: {page.title}?"
									/>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{/if}
