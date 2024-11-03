<script lang="ts">
	import type {Snippet} from 'svelte';
	import {page, navigating} from '$app/stores';
	import NProgress from 'nprogress';

	import Fa from 'svelte-fa';
	import {
		faGear,
		faSignIn,
		faSignOut,
	} from '@fortawesome/free-solid-svg-icons';

	import '../app.css';
	import 'nprogress/nprogress.css';

	let {children}: {children: Snippet} = $props();

	NProgress.configure({minimum: 0.16});

	$effect(() => {
		if ($navigating) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	});
</script>

<svelte:head>
	<title>Guritan - Markdown Editor for Blogger</title>
</svelte:head>

<nav class="flex items-center justify-between bg-zinc-800 p-3 shadow">
	<a href="/" class="text-xl font-bold">Guritan</a>

	{#if $page.data.auth}
		<div class="inline-flex items-center gap-3">
			<a href="/posts">Posts</a>
			<a href="/pages">Pages</a>
		</div>
	{/if}

	<div>
		{#if $page.data.auth}
			<div class="inline-flex items-center gap-4">
				<a href="/settings"><Fa icon={faGear} /></a>
				<button type="button"><Fa icon={faSignOut} /></button>
			</div>
		{:else}
			<a href="/oauth"><Fa icon={faSignIn} /></a>
		{/if}
	</div>
</nav>

<main class="container mx-auto px-6 py-10 md:w-[800px]">
	{@render children()}
</main>
