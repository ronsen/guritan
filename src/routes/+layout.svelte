<script>
	import { page, navigating } from "$app/stores";
	import NProgress from "nprogress";

	import Fa from "svelte-fa";
	import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";

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
			<a href="/logout"class="btn btn-ghost"><Fa icon={faSignOut} /></a>
		{:else}
			<a href="/oauth"class="btn btn-ghost"><Fa icon={faSignIn} /></a>
		{/if}
	</div>
</nav>

<main class="container mx-auto px-2 py-10">
<slot />
</main>
