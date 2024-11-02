<script lang="ts">
	import type {Snippet} from "svelte";
	import { page, navigating } from "$app/stores";
	import NProgress from "nprogress";

	import Fa from "svelte-fa";
	import {
		faGear,
		faSignIn,
		faSignOut,
	} from "@fortawesome/free-solid-svg-icons";

	import "../app.css";
	import "nprogress/nprogress.css";

	let { children }: { children: Snippet } = $props();

	NProgress.configure({ minimum: 0.16 });

	$effect(() => {
		if ($navigating) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	})
</script>

<svelte:head>
	<title>Guritan - Markdown Editor for Blogger</title>
</svelte:head>

<nav class="navbar bg-base-300">
	<div class="navbar-start">
		<a href="/" class="btn btn-ghost text-xl">Guritan</a>
	</div>

	{#if $page.data.auth}
		<div class="navbar-center gap-3">
			<a href="/posts" class="btn btn-ghost btn-sm">Posts</a>
			<a href="/pages" class="btn btn-ghost btn-sm">Pages</a>
		</div>
	{/if}

	<div class="navbar-end">
		{#if $page.data.auth}
			<div class="inline-flex items-center gap-3">
				<a href="/settings" class="btn btn-ghost"><Fa icon={faGear} /></a>
				<form method="post" action="/logout">
					<button type="submit" class="btn btn-ghost"><Fa icon={faSignOut} /></button>
				</form>
			</div>
		{:else}
			<a href="/oauth" class="btn btn-ghost"><Fa icon={faSignIn} /></a>
		{/if}
	</div>
</nav>

<main class="container md:w-[800px] mx-auto px-6 py-10">
	{@render children()}
</main>
