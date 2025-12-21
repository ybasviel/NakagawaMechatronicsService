<script lang="ts">
	import { pixelBurst, type PixelBurstOptions } from '$lib/attachments/pixelBurst';
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		external?: boolean;
		class?: string;
		burstOptions?: PixelBurstOptions;
		children: Snippet;
	}

	let { href, external = false, class: className = '', burstOptions = {}, children }: Props = $props();

	// 外部リンクかどうかを自動判定（明示的に指定されていない場合）
	const isExternal = $derived(external || href.startsWith('http://') || href.startsWith('https://'));

	// デフォルトでautoRadiusを有効に
	const resolvedOptions = $derived({ autoRadius: true, ...burstOptions });
</script>

{#if isExternal}
	<a
		{href}
		class="pixel-nav-btn {className}"
		target="_blank"
		rel="noopener noreferrer"
		{@attach pixelBurst(resolvedOptions)}
	>
		{@render children()}
	</a>
{:else}
	<a
		{href}
		class="pixel-nav-btn {className}"
		{@attach pixelBurst(resolvedOptions)}
	>
		{@render children()}
	</a>
{/if}
