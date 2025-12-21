import type { Attachment } from 'svelte/attachments';

export interface PixelBurstOptions {
	startRadius?: number;
	distance?: number;
	particleSize?: number;
	particleCount?: number;
	duration?: number;
	autoRadius?: boolean;
	radiusRatio?: number;
	distanceRatio?: number;
	navigate?: boolean; // trueの場合、エフェクト後にリンク先に遷移
}

let particleId = 0;

// パーティクルのスタイルを注入
function injectStyles() {
	if (document.getElementById('pixel-burst-styles')) return;

	const style = document.createElement('style');
	style.id = 'pixel-burst-styles';
	style.textContent = `
		.pixel-burst-particle {
			position: fixed;
			background-color: white;
			pointer-events: none;
			z-index: 9999;
			border: 1px solid #ccc;
			box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
			animation: pixel-burst-anim var(--duration) ease-out forwards;
		}

		@keyframes pixel-burst-anim {
			0% {
				transform: translate(-50%, -50%) translate(var(--start-x), var(--start-y));
				opacity: 1;
			}
			100% {
				transform: translate(-50%, -50%) translate(var(--tx), var(--ty));
				opacity: 0;
			}
		}
	`;
	document.head.appendChild(style);
}

function createBurst(centerX: number, centerY: number, options: PixelBurstOptions = {}) {
	const {
		startRadius = 0,
		distance = 50,
		particleSize = 10,
		particleCount = 8 + Math.floor(Math.random() * 5),
		duration = 500
	} = options;

	injectStyles();

	for (let i = 0; i < particleCount; i++) {
		const angle = (i / particleCount) * 360 + Math.random() * 30 - 15;
		const radian = (angle * Math.PI) / 180;
		const actualDistance = distance + Math.random() * 40;
		const size = particleSize + Math.floor(Math.random() * 4);
		const delay = Math.random() * 50;

		const particle = document.createElement('div');
		particle.className = 'pixel-burst-particle';
		particle.style.cssText = `
			left: ${centerX}px;
			top: ${centerY}px;
			width: ${size}px;
			height: ${size}px;
			--start-x: ${Math.cos(radian) * startRadius}px;
			--start-y: ${Math.sin(radian) * startRadius}px;
			--tx: ${Math.cos(radian) * actualDistance}px;
			--ty: ${Math.sin(radian) * actualDistance}px;
			--duration: ${duration}ms;
			animation-delay: ${delay}ms;
		`;

		document.body.appendChild(particle);

		const id = particleId++;
		window.setTimeout(() => {
			particle.remove();
		}, duration + delay + 100);
	}
}

/**
 * パーティクルエフェクトを発動するAttachment
 * @param options - エフェクトのオプション
 * @returns Attachment関数
 */
export function pixelBurst(options: PixelBurstOptions = {}): Attachment {
	return (node: Element) => {
		function handleClick(event: Event) {
			const element = node as HTMLElement;
			const rect = element.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			let resolvedOptions = { ...options };

			// autoRadiusが有効な場合、要素サイズから自動計算
			if (options.autoRadius) {
				const radiusRatio = options.radiusRatio ?? 1 / 3;
				const distanceRatio = options.distanceRatio ?? 1.5;
				const startRadius = rect.width * radiusRatio;
				resolvedOptions = {
					...options,
					startRadius,
					distance: startRadius * distanceRatio
				};
			}

			createBurst(centerX, centerY, resolvedOptions);

			// navigateが有効またはリンク要素の場合、遷移を処理
			if (options.navigate !== false && node instanceof HTMLAnchorElement) {
				event.preventDefault();
				const href = node.href;
				const isExternal = node.target === '_blank';
				const duration = resolvedOptions.duration ?? 500;

				setTimeout(() => {
					if (isExternal) {
						window.open(href, '_blank', 'noopener,noreferrer');
					} else {
						window.location.href = href;
					}
				}, duration * 0.8);
			}
		}

		node.addEventListener('click', handleClick);

		// クリーンアップ関数を返す
		return () => {
			node.removeEventListener('click', handleClick);
		};
	};
}

export default pixelBurst;

