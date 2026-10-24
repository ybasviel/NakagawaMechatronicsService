<script lang="ts">
	import type { PageData } from './$types';
	import PixelNavBtn from '$lib/components/PixelNavBtn.svelte';
	import PixelScrollRow from '$lib/components/PixelScrollRow.svelte';
	import PixelBlogCard from '$lib/components/PixelBlogCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>ブログ - なかがわ電機サービス</title>
	<meta property="og:url" content="https://nms.lnln.dev/blog" />
	<meta property="og:title" content="ブログ - なかがわ電機サービス" />
	<meta property="og:description" content="なかがわ電機サービスの雑多なブログ" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:image" content="https://nms.lnln.dev/img/logo.png" />
</svelte:head>

<div class="m-4">
	<div class="flex gap-4 my-4 max-w-screen-lg mx-auto">
		<PixelNavBtn href="/">Home</PixelNavBtn>
	</div>

	{#each data.years as { year, blogs } (year)}
		<section class="bg-gray-100 my-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
			<div class="max-w-screen-lg mx-auto">
				<h2 class="text-2xl text-main font-bold mb-4">{year}年 <span class="text-base text-gray-500 dark:text-gray-400">({blogs.length}件)</span></h2>
				<!-- 矢印はPC幅（横スクロール時）のみ。top はサムネイル中央 (p-2 + 16:9 の w-72 の半分) -->
				<PixelScrollRow
					class="grid grid-cols-1 sm:grid-cols-2 gap-8 p-2 lg:flex lg:overflow-x-auto lg:snap-x lg:scroll-px-2 lg:pb-6"
					arrowTop="calc(0.5rem + 81px + 4px)"
				>
					{#each blogs as blog (blog.id)}
						<div class="lg:w-72 lg:shrink-0 lg:snap-start">
							<PixelBlogCard {blog} />
						</div>
					{/each}
				</PixelScrollRow>
			</div>
		</section>
	{/each}
</div>
