<script lang="ts">
	import './layout.css';
	
	let { children } = $props();
</script>

<svelte:head>
	<meta name="twitter:site" content="@lnln_ch" />
	<meta property="og:image" content="https://lnln.dev/img/title.png" />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-black font-sans">
	<header class="bg-main m-4 p-4 pixel-header text-white">
		<a href="/">
			<div class="text-3xl font-bold">なかがわ電機サービス</div>
		</a>
	</header>

	<main>
		{@render children()}
	</main>

	<footer class="m-4 px-4 py-2 pixel-header bg-main text-white">
		Made by lnln_ch
	</footer>
</div>
