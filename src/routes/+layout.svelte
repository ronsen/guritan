<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { LogIn, LogOut, Settings } from '@lucide/svelte';

	import '../app.css';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>Guritan - Markdown Editor for Blogger</title>
</svelte:head>

<nav class="flex items-center justify-between bg-zinc-800 p-3 shadow-sm">
	<a href="/" class="text-xl font-bold">Guritan</a>

	{#if page.data.auth}
		<div class="inline-flex items-center gap-3">
			<a href="/posts">Posts</a>
			<a href="/pages">Pages</a>
		</div>
	{/if}

	<div>
		{#if page.data.auth}
			<div class="inline-flex items-center gap-4">
				<a href="/settings"><Settings size={16} /></a>
				<form action="/logout" method="post" class="flex">
					<button type="submit"><LogOut size={16} /></button>
				</form>
			</div>
		{:else}
			<a href="/oauth"><LogIn size={16} /></a>
		{/if}
	</div>
</nav>

<main class="container mx-auto px-6 py-10 md:w-[800px]">
	{@render children()}
</main>
