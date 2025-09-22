<script lang="ts">
	import type { PageServerData } from './$types';
	import { ExternalLink, House, Pencil, Plus } from '@lucide/svelte';
	import Alert from '$lib/components/alert.svelte';
	import Delete from '$lib/components/delete.svelte';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="mb-4 flex items-center justify-between">
	<ul class="inline-flex items-center gap-3 text-xs uppercase">
		<li><a href="/"><House size={16} /></a></li>
		<li>/</li>
		<li><a href="/pages">Pages</a></li>
	</ul>

	<a href="/pages/add" class="btn btn-ghost"><Plus size={16} /></a>
</div>

{#if data.pages}
	{#if !data.pages?.items}
		<Alert>No pages found.</Alert>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full table-auto">
				<thead>
					<tr
						class="border-b border-zinc-800 text-left text-xs uppercase">
						<th class="p-2">Title</th>
						<th class="w-10 p-2">&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{#each data.pages?.items as page}
						<tr class="border-b border-zinc-800">
							<td class="p-2"
								><a href="/pages/{page.id}">{page.title}</a
								></td>
							<td class="p-2">
								<div class="inline-flex gap-3">
									<a href={page.url} target="_blank"
										><ExternalLink size={16} /></a>
									<a href="/pages/{page.id}/edit"
										><Pencil size={16} /></a>
									<Delete
										action="/pages/{page.id}/delete"
										message="Delete this page: {page.title}?" />
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{/if}
