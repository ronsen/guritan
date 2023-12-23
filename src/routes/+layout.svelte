<script>
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

	NProgress.configure({ minimum: 0.16 });
	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<svelte:head>
	<title>Guritan</title>
</svelte:head>

<nav class="navbar bg-base-300">
	<div class="navbar-start">
		<a href="/" class="btn btn-ghost text-xl">Guritan</a>
	</div>

	{#if $page.data.auth}
		<div class="navbar-center gap-3">
			<a href="/posts">Posts</a>
			<a href="/pages">Pages</a>
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

<main class="container md:w-3/5 mx-auto px-6 py-10">
	<slot />
</main>
