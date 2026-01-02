<script lang="ts">
	import { pixelBurst, type PixelBurstOptions } from '$lib/attachments/pixelBurst';

	interface Props {
		title: string;
		pathname: string;
		class?: string;
		burstOptions?: PixelBurstOptions;
	}

	let { title, pathname, class: className = '', burstOptions = {} }: Props = $props();

	// デフォルトでautoRadiusを有効に
	const resolvedOptions = $derived({ autoRadius: true, ...burstOptions });

	function getTweetUrl(): string {
		const url = encodeURIComponent(`https://nms.lnln.dev${pathname}`);
		const text = encodeURIComponent(`${title} | なかがわ電機サービス`);
		return `https://x.com/intent/tweet?text=${text}&url=${url}`;
	}
</script>

<a
	href={getTweetUrl()}
	class="pixel-nav-btn {className}"
	target="_blank"
	rel="noopener noreferrer"
	{@attach pixelBurst(resolvedOptions)}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="currentColor"
		style="display: inline-block; vertical-align: middle; margin-right: 0.25rem;"
	>
		<path
			d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
		/>
	</svg>
	ツイート
</a>
