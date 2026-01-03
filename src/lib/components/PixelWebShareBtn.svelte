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
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			style="display: inline-block; vertical-align: middle; margin-right: 0.25rem;"
		>
			<circle cx="18" cy="5" r="3" />
			<circle cx="6" cy="12" r="3" />
			<circle cx="18" cy="19" r="3" />
			<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
			<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
		</svg>
		共有
	</button>
{/if}
