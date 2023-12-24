<script lang="ts">
	import Fa from "svelte-fa";
	import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="alert alert-warning shadow-lg mb-6">
    <div class="inline-flex items-center gap-2">
		<Fa icon={faTriangleExclamation} />
        <slot />
    </div>
</div>