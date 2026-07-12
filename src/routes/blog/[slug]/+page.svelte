<script lang="ts">
	import type { PageData } from './$types';
	import PixelNavBtn from '$lib/components/PixelNavBtn.svelte';
	import PixelTweetBtn from '$lib/components/PixelTweetBtn.svelte';
	import PixelWebShareBtn from '$lib/components/PixelWebShareBtn.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();

	type TocItem = { id: string; text: string; level: number };
	let toc: TocItem[] = $state([]);
	let articleEl: HTMLElement | undefined = $state();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
	}

	onMount(() => {
		if (!articleEl) return;
		const headings = articleEl.querySelectorAll<HTMLElement>('h1, h2, h3, h4');
		const items: TocItem[] = [];
		headings.forEach((h, i) => {
			if (!h.id) h.id = `heading-${i}`;
			items.push({
				id: h.id,
				text: h.textContent?.trim() ?? '',
				level: Number(h.tagName.slice(1))
			});
		});
		toc = items;
	});
</script>

{#snippet tocPanel()}
	<h2 class="font-bold mb-3 text-main text-lg">目次</h2>
	<ul class="text-sm">
		{#each toc as item (item.id)}
			<li
				class="toc-item toc-level-{item.level}"
				style="padding-left: {(item.level - 1) * 0.75}rem"
			>
				<a href="#{item.id}">{item.text}</a>
			</li>
		{/each}
	</ul>
{/snippet}

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

<div class="p-4">
	<div class="max-w-[1400px] mx-auto">
		<div class="flex justify-between items-center my-4">
			<div class="flex gap-4 xl:ml-[224px]">
				<PixelNavBtn href="/">Home</PixelNavBtn>
				<PixelNavBtn href="/blog">Blog</PixelNavBtn>
			</div>
			<div class="mr-6 text-gray-400">{formatDate(data.blog.publishedAt)}</div>
		</div>

		<div class="xl:grid xl:grid-cols-[200px_minmax(0,1fr)] xl:gap-x-6 xl:gap-y-4">
			<section
				class="bg-gray-100 p-4 pixel-section dark:bg-gray-800 dark:text-white mb-4 xl:mb-0 xl:col-start-2 xl:row-start-1"
			>
				<h1 class="text-3xl text-main font-bold max-w-screen-lg mx-auto break-words">
					{data.blog.title}
				</h1>
			</section>

			{#if toc.length > 0}
				<nav
					aria-label="目次"
					class="xl:hidden bg-gray-100 p-4 pixel-section dark:bg-gray-800 dark:text-white mb-4"
				>
					<div class="max-w-screen-lg mx-auto">
						{@render tocPanel()}
					</div>
				</nav>
			{/if}

			<aside class="hidden xl:block xl:col-start-1 xl:row-start-1 xl:row-span-2">
				{#if toc.length > 0}
					<nav aria-label="目次" class="sticky top-4">
						<div
							class="pixel-section bg-gray-100 dark:bg-gray-800 dark:text-white p-4 max-h-[calc(100vh-2rem)] overflow-y-auto toc-panel"
						>
							{@render tocPanel()}
						</div>
					</nav>
				{/if}
			</aside>

			<section
				class="bg-gray-100 p-4 pixel-section dark:bg-gray-800 dark:text-white xl:col-start-2 xl:row-start-2"
			>
				<article bind:this={articleEl} class="prose max-w-screen-lg mx-auto">
					{@html data.blog.content}
				</article>
			</section>
		</div>

		<div class="max-w-screen-lg mx-auto mt-6 flex justify-center gap-4">
			<PixelTweetBtn title={data.blog.title} pathname={page.url.pathname} />
			<PixelWebShareBtn title={data.blog.title} pathname={page.url.pathname} />
		</div>
	</div>
</div>
