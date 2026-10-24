<script lang="ts">
	import { resolve } from '$app/paths';
	import { pixelBurst } from '$lib/attachments/pixelBurst';
	import type { Blog } from '$lib/types';

	interface Props {
		blog: Pick<Blog, 'id' | 'title' | 'thumbnail' | 'publishedAt'> & { excerpt?: string };
	}

	let { blog }: Props = $props();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
	}
</script>

<!-- ブログ記事のカード（サムネイル(16:9) + タイトルのリンクと日付・抜粋） -->
<a
	href={resolve('/blog/[slug]', { slug: blog.id })}
	aria-label={blog.title}
	class="work-card-link group block"
	{@attach pixelBurst({ autoRadius: true, particleCount: 16 })}
>
	{#if blog.thumbnail}
		<img src={blog.thumbnail.url} alt="" class="pixel-pressable w-full aspect-video object-cover" />
	{:else}
		<div class="pixel-pressable w-full aspect-video bg-gray-300 flex items-center justify-center">
			<span class="text-gray-500 text-2xl">No Image</span>
		</div>
	{/if}
	<h3 class="mt-3 text-lg font-bold text-cyan-600 group-hover:underline break-words">{blog.title}</h3>
</a>
<p class="text-sm text-gray-500 dark:text-gray-400">{formatDate(blog.publishedAt)}</p>
{#if blog.excerpt}
	<p class="mt-1 text-sm line-clamp-3">{blog.excerpt}</p>
{/if}
