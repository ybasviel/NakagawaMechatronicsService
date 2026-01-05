<script lang="ts">
	import type { PageData } from './$types';
	import PixelNavBtn from '$lib/components/PixelNavBtn.svelte';
	import PixelTweetBtn from '$lib/components/PixelTweetBtn.svelte';
	import PixelWebShareBtn from '$lib/components/PixelWebShareBtn.svelte';
	import { page } from '$app/state';

	let { data }: { data: PageData } = $props();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>{data.blog.title} - なかがわ電機サービス</title>
	<meta name="twitter:card" content={data.blog.thumbnail ? 'summary_large_image' : 'summary'} />
	<meta property="og:url" content="https://nms.lnln.dev/blog/{data.blog.id}" />
	<meta property="og:title" content={data.blog.title} />
	<meta property="og:description" content="なかがわ電機サービスの雑多なブログ" />
	{#if data.blog.thumbnail}
		<meta property="og:image" content={data.blog.thumbnail.url} />
		<meta name="twitter:image" content={data.blog.thumbnail.url} />
	{/if}
</svelte:head>

<div class="m-4">
	<div class="flex justify-between items-center my-4 max-w-screen-lg mx-auto">
		<div class="flex gap-4">
			<PixelNavBtn href="/">Home</PixelNavBtn>
			<PixelNavBtn href="/blog">Blog</PixelNavBtn>
		</div>
		<div class="mr-6 text-gray-400">{formatDate(data.blog.publishedAt)}</div>
	</div>

	<section class="bg-gray-100 my-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
		<article class="prose max-w-screen-lg mx-auto">
			{@html data.blog.content}
		</article>
	</section>
	<div class="max-w-screen-lg mx-auto mt-6 flex justify-center gap-4">
		<PixelTweetBtn title={data.blog.title} pathname={page.url.pathname} />
		<PixelWebShareBtn title={data.blog.title} pathname={page.url.pathname} />
	</div>
</div>
