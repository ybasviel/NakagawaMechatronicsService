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

<!-- ドット絵の右向き三角（4×7ドット）。左向きは CSS で反転 -->
{#snippet triangle(direction: 'left' | 'right')}
	<svg class="triangle triangle-{direction}" viewBox="0 0 4 7" width="16" height="28" shape-rendering="crispEdges" aria-hidden="true">
		<rect x="0" y="0" width="1" height="7" />
		<rect x="1" y="1" width="1" height="5" />
		<rect x="2" y="2" width="1" height="3" />
		<rect x="3" y="3" width="1" height="1" />
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
			class="scroll-arrow right-0 translate-x-1/2 nudge"
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
	/* .pixel-nav-btn と同じ押し込み表現の正方形ボタン */
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
	}

	.triangle-right {
		margin-left: 4px;
	}

	.triangle-left {
		margin-right: 4px;
		transform: scaleX(-1);
	}

	/* 右矢印は「まだ続きがある」ことを伝えるため、ときどき小さく跳ねる */
	.nudge .triangle-right {
		animation: nudge 1.6s steps(2, jump-none) infinite;
	}

	@keyframes nudge {
		0%,
		60%,
		100% {
			transform: translateX(0);
		}
		80% {
			transform: translateX(4px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.nudge .triangle-right {
			animation: none;
		}
	}
</style>
