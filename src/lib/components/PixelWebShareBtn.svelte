<script lang="ts">
	import { pixelBurst, type PixelBurstOptions } from '$lib/attachments/pixelBurst';
	import { browser } from '$app/environment';

	interface Props {
		title: string;
		pathname: string;
		class?: string;
		burstOptions?: PixelBurstOptions;
	}

	let { title, pathname, class: className = '', burstOptions = {}}: Props = $props();

	// デフォルトでautoRadiusを有効に
	const resolvedOptions = $derived({ autoRadius: true, ...burstOptions });

	// Web Share APIが利用可能かチェック
	const isShareSupported = $derived(
		browser && typeof navigator !== 'undefined' && 'share' in navigator
	);

	async function handleShare(): Promise<void> {
		// pixelBurstのエフェクトが終わったら共有を実行
		setTimeout(async () => {
			if (!browser || !navigator.share) return;

			const url = `https://nms.lnln.dev${pathname}`;
			const shareData: ShareData = {
				text: `${title} | なかがわ電機サービス`,
				url: url
			};

			try {
				await navigator.share(shareData);
			} catch (error) {
				// ユーザーが共有をキャンセルした場合などはエラーを無視
				if (error instanceof Error && error.name !== 'AbortError') {
					console.error('共有に失敗しました:', error);
				}
			}
		}, 400);
	}
</script>

{#if isShareSupported}
	<button
		type="button"
		onclick={handleShare}
		class="pixel-nav-btn {className}"
		{@attach pixelBurst(resolvedOptions)}
	>
		<div class="flex items-center gap-2">
			<!-- https://www.dots.tolog.info/pixelarts/a773ef4b-4f4a-4e96-9fd2-c30e39a73b2b -->
			<svg 
			width="30" 
			height="30"
			viewBox="0 0 150 150" 
			fill="currentColor" 
			xmlns="http://www.w3.org/2000/svg"
			stroke="none"
			class="flex shrink-0 justify-center items-center"
			>
				<rect width="10" height="10" transform="matrix(-1 0 0 1 130 40)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 130 30)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 120 20)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 130 20)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 120 40)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 110 20)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 30 80)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 30 60)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 40 60)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 70 70)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 80 90)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 80 80)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 90 30)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 100 30)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 100 110)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 110 30)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 80 40)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 80 30)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 110 40)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 130 120)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 130 110)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 120 100)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 130 100)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 120 120)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 110 100)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 110 110)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 110 120)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 60 70)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 80 50)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 80 60)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 80 70)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 80 100)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 80 110)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 90 110)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 40 80)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 30 70)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 50 80)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 50 60)" />
				<rect width="10" height="10" transform="matrix(-1 0 0 1 50 70)" />
			</svg>
				
			共有
		</div>
	</button>
{/if}
