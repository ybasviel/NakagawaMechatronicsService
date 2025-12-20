<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>{data.blog.title} - なかがわ電機サービス</title>
	<meta name="twitter:card" content={data.blog.thumbnail ? 'summary_large_image' : 'summary'} />
	<meta property="og:url" content="https://lnln.dev/blog/{data.blog.id}" />
	<meta property="og:title" content={data.blog.title} />
	<meta property="og:description" content="趣味の工作の記録" />
	{#if data.blog.thumbnail}
		<meta property="og:image" content={data.blog.thumbnail.url} />
	{/if}
</svelte:head>

<div class="container mx-auto px-4 max-w-screen-lg">
	<div class="flex justify-between items-center my-4">
		<div class="flex gap-4">
			<a class="pixel-nav-btn" href="/">Home</a>
			<a class="pixel-nav-btn" href="/blog">Blog</a>
		</div>
		<div class="mr-6 text-gray-400">{formatDate(data.blog.publishedAt)}</div>
	</div>

	<section class="bg-gray-100 my-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
		<article class="prose">
			{@html data.blog.content}
		</article>
	</section>
</div>

