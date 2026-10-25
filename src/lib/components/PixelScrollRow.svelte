<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		// 矢印の縦位置（行の上端から）。サムネイルの中央に合わせる
		arrowTop?: string;
		children: Snippet;
	}

	let { class: className = '', arrowTop = '50%', children }: Props = $props();

	let scroller: HTMLElement | undefined = $state();
	let canLeft = $state(false);
	let canRight = $state(false);

	function update() {
		if (!scroller) return;
		canLeft = scroller.scrollLeft > 1;
		canRight = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1;
	}

	function scrollByPage(direction: 1 | -1) {
		scroller?.scrollBy({ left: direction * scroller.clientWidth * 0.8, behavior: 'smooth' });
	}

	$effect(() => {
		if (!scroller) return;
		update();
		const observer = new ResizeObserver(update);
		observer.observe(scroller);
		return () => observer.disconnect();
	});
</script>

<!-- ドット絵の右向き三角（4×7ドット）。左向きは SVG 内で反転（CSS の transform はアニメーションに使うため） -->
{#snippet triangle(direction: 'left' | 'right')}
	<svg class="triangle triangle-{direction}" viewBox="0 0 4 7" width="16" height="28" shape-rendering="crispEdges" aria-hidden="true">
		<g transform={direction === 'left' ? 'matrix(-1 0 0 1 4 0)' : undefined}>
			<rect x="0" y="0" width="1" height="7" />
			<rect x="1" y="1" width="1" height="5" />
			<rect x="2" y="2" width="1" height="3" />
			<rect x="3" y="3" width="1" height="1" />
		</g>
	</svg>
{/snippet}

<div class="relative">
	<div bind:this={scroller} onscroll={update} class={className}>
		{@render children()}
	</div>
	
	{#if canLeft}
		<button
			type="button"
			class="scroll-arrow left-0 -translate-x-1/2"
			style:top={arrowTop}
			tabindex="-1"
			aria-label="左にスクロール"
			onclick={() => scrollByPage(-1)}
		>
			{@render triangle('left')}
		</button>
	{/if}
	{#if canRight}
		<button
			type="button"
			class="scroll-arrow right-0 translate-x-1/2"
			style:top={arrowTop}
			tabindex="-1"
			aria-label="右にスクロール"
			onclick={() => scrollByPage(1)}
		>
			{@render triangle('right')}
		</button>
	{/if}
</div>

<style>
	.scroll-arrow {
		position: absolute;
		margin-top: -1.5rem;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-main);
		border: 4px solid #c2410c;
		box-shadow: 4px 4px 0px #c2410c;
		cursor: pointer;
		z-index: 10;
		transition: box-shadow 0.1s ease-in-out;
	}

	.scroll-arrow:hover,
	.scroll-arrow:focus-visible {
		box-shadow: 0px 0px 0px #c2410c;
		margin-left: 4px;
		margin-top: calc(-1.5rem + 4px);
	}

	.triangle {
		fill: white;
		animation: nudge 1.6s steps(2, jump-none) infinite;
	}

	.triangle-right {
		--nudge-x: 4px;
		margin-left: 4px;
	}

	.triangle-left {
		--nudge-x: -4px;
		margin-right: 4px;
	}

	@keyframes nudge {
		0%,
		60%,
		100% {
			transform: translateX(0);
		}
		80% {
			transform: translateX(var(--nudge-x));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.triangle {
			animation: none;
		}
	}
</style>
