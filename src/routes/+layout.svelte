<script>
	import { page, navigating } from "$app/stores";
	import NProgress from "nprogress";

	import Fa from "svelte-fa";
	import { faAdd, faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";

	import "../app.css";
	import 'nprogress/nprogress.css';

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

<nav class="navbar bg-base-300">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Guritan</a>
	</div>
	<div class="flex-none items-center">
		{#if $page.data.auth}
			<div class="inline-flex items-center gap-3">
				<a href="/posts/add" class="btn btn-ghost"><Fa icon={faAdd} /></a>
				<a href="/logout" class="btn btn-ghost"><Fa icon={faSignOut} /></a>
			</div>
		{:else}
			<a href="/oauth"class="btn btn-ghost"><Fa icon={faSignIn} /></a>
		{/if}
	</div>
</nav>

<main class="container md:w-3/5 mx-auto px-6 py-10">
<slot />
</main>
