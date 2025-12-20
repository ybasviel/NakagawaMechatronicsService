<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>Blog - なかがわ電機サービス</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:url" content="https://lnln.dev/blog" />
	<meta property="og:title" content="Blog - なかがわ電機サービス" />
	<meta property="og:description" content="個人的な適当な記録です" />
</svelte:head>

<a class="m-6 text-cyan-600 hover:underline" href="/">Home</a>

<section class="bg-gray-100 m-4 p-4 rounded-lg dark:bg-gray-800 dark:text-white">
	<h2 class="text-2xl text-main font-bold mb-4">最新3件のブログ</h2>
	<ul class="list-disc m-4">
		{#each data.latestBlogs as blog}
			<li>
				<a href="/blog/{blog.id}" class="text-cyan-600 hover:underline">
					{blog.title} - {formatDate(blog.publishedAt)}
				</a>
			</li>
		{/each}
	</ul>
</section>

<section class="bg-gray-100 m-4 p-4 rounded-lg dark:bg-gray-800 dark:text-white">
	<h2 class="text-2xl text-main font-bold mb-4">月別アーカイブ</h2>
	<div class="ml-2">
		{#each Object.entries(data.archive) as [yearMonth, blogs]}
			<details class="cursor-pointer mb-2">
				<summary class="font-medium">{yearMonth}</summary>
				<ul class="ml-6 mt-1">
					{#each blogs as blog}
						<li class="my-1">
							<a href="/blog/{blog.id}" class="text-cyan-600 hover:underline">
								{blog.title} - {formatDate(blog.publishedAt)}
							</a>
						</li>
					{/each}
				</ul>
			</details>
		{/each}
	</div>
</section>

