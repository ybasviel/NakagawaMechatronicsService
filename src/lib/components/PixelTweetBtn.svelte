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
	<div class="flex items-center gap-2">
		<svg 
			width="30" height="30" 
			viewBox="0 0 15 15" 
			xmlns="http://www.w3.org/2000/svg"
			class="flex shrink-0 justify-center items-center"
			fill="currentColor"
		>
			<rect x="2" y="3" width="1" height="1"/>
			<rect x="9" y="3" width="1" height="1"/>
			<rect x="10" y="3" width="1" height="1"/>
			<rect x="2" y="4" width="1" height="1"/>
			<rect x="3" y="4" width="1" height="1"/>
			<rect x="8" y="4" width="1" height="1"/>
			<rect x="9" y="4" width="1" height="1"/>
			<rect x="10" y="4" width="1" height="1"/>
			<rect x="11" y="4" width="1" height="1"/>
			<rect x="12" y="4" width="1" height="1"/>
			<rect x="3" y="5" width="1" height="1"/>
			<rect x="4" y="5" width="1" height="1"/>
			<rect x="7" y="5" width="1" height="1"/>
			<rect x="8" y="5" width="1" height="1"/>
			<rect x="9" y="5" width="1" height="1"/>
			<rect x="10" y="5" width="1" height="1"/>
			<rect x="11" y="5" width="1" height="1"/>
			<rect x="3" y="6" width="1" height="1"/>
			<rect x="4" y="6" width="1" height="1"/>
			<rect x="5" y="6" width="1" height="1"/>
			<rect x="6" y="6" width="1" height="1"/>
			<rect x="7" y="6" width="1" height="1"/>
			<rect x="8" y="6" width="1" height="1"/>
			<rect x="9" y="6" width="1" height="1"/>
			<rect x="10" y="6" width="1" height="1"/>
			<rect x="11" y="6" width="1" height="1"/>
			<rect x="3" y="7" width="1" height="1"/>
			<rect x="4" y="7" width="1" height="1"/>
			<rect x="5" y="7" width="1" height="1"/>
			<rect x="6" y="7" width="1" height="1"/>
			<rect x="7" y="7" width="1" height="1"/>
			<rect x="8" y="7" width="1" height="1"/>
			<rect x="9" y="7" width="1" height="1"/>
			<rect x="10" y="7" width="1" height="1"/>
			<rect x="11" y="7" width="1" height="1"/>
			<rect x="4" y="8" width="1" height="1"/>
			<rect x="5" y="8" width="1" height="1"/>
			<rect x="6" y="8" width="1" height="1"/>
			<rect x="7" y="8" width="1" height="1"/>
			<rect x="8" y="8" width="1" height="1"/>
			<rect x="9" y="8" width="1" height="1"/>
			<rect x="10" y="8" width="1" height="1"/>
			<rect x="4" y="9" width="1" height="1"/>
			<rect x="5" y="9" width="1" height="1"/>
			<rect x="6" y="9" width="1" height="1"/>
			<rect x="7" y="9" width="1" height="1"/>
			<rect x="8" y="9" width="1" height="1"/>
			<rect x="9" y="9" width="1" height="1"/>
			<rect x="5" y="10" width="1" height="1"/>
			<rect x="6" y="10" width="1" height="1"/>
			<rect x="7" y="10" width="1" height="1"/>
			<rect x="8" y="10" width="1" height="1"/>
			<rect x="9" y="10" width="1" height="1"/>
			<rect x="3" y="11" width="1" height="1"/>
			<rect x="4" y="11" width="1" height="1"/>
			<rect x="5" y="11" width="1" height="1"/>
			<rect x="6" y="11" width="1" height="1"/>
			<rect x="7" y="11" width="1" height="1"/>
		</svg>
		ツイート
	</div>
</a>
