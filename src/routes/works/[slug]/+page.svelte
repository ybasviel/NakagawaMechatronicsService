<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.work.title} - なかがわ電機サービス</title>
	<meta name="twitter:card" content={data.work.thumbnail ? 'summary_large_image' : 'summary'} />
	<meta property="og:url" content="https://lnln.dev/works/{data.work.id}" />
	<meta property="og:title" content={data.work.title} />
	<meta property="og:description" content={data.work.description || '趣味の工作の記録'} />
	{#if data.work.thumbnail}
		<meta property="og:image" content={data.work.thumbnail.url} />
	{/if}
</svelte:head>

<div class="container mx-auto px-4 max-w-screen-lg">
	<div class="my-4 flex gap-4">
		<a class="pixel-nav-btn" href="/">Home</a>
	</div>

	<section class="bg-gray-100 my-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
		<article class="prose">
			{@html data.work.content}
		</article>
	</section>
</div>

