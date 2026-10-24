<script lang="ts">
	import { resolve } from '$app/paths';
	import { pixelBurst } from '$lib/attachments/pixelBurst';
	import type { Work } from '$lib/types';

	interface Props {
		work: Pick<Work, 'id' | 'title' | 'thumbnail' | 'description'>;
	}

	let { work }: Props = $props();
</script>

<!-- Works のカード（サムネイル + タイトルのリンクと説明文） -->
<a
	href={resolve('/works/[slug]', { slug: work.id })}
	aria-label={work.title}
	class="work-card-link group block"
	{@attach pixelBurst({ autoRadius: true, particleCount: 16 })}
>
	{#if work.thumbnail}
		<img src={work.thumbnail.url} alt={work.title} class="pixel-pressable w-full aspect-[4/3] object-cover" />
	{:else}
		<div class="pixel-pressable w-full aspect-[4/3] bg-gray-300 flex items-center justify-center">
			<span class="text-gray-500">No Image</span>
		</div>
	{/if}
	<h3 class="mt-2 text-xl font-bold text-center text-cyan-600 group-hover:underline">
		{work.title}
	</h3>
</a>
{#if work.description}
	<p class="p-2 text-sm">{work.description}</p>
{/if}
