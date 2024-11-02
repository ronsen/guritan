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

	let { data }: { data: PageServerData } = $props();
</script>

<div class="flex justify-between items-center mb-4">
	<ul class="inline-flex items-baseline gap-3 text-xs uppercase">
		<li><a href="/"><Fa icon={faHome} /></a></li>
		<li>/</li>
		<li><a href="/pages">Pages</a></li>
	</ul>

	<a href="/pages/add" class="btn btn-ghost"><Fa icon={faAdd} /></a>
</div>

{#if data.pages}
	{#if !data.pages?.items}
		<Alert>No pages found.</Alert>
	{:else}
		<div class="overflow-x-auto">
			<table class="table-auto w-full">
				<thead>
					<tr class="uppercase text-xs text-left border-b border-zinc-800">
						<th class="p-2">Title</th>
						<th class="p-2 w-10">&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{#each data.pages?.items as page}
						<tr class="border-b border-zinc-800">
							<td class="p-2"><a href="/pages/{page.id}">{page.title}</a></td>
							<td class="p-2">
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
