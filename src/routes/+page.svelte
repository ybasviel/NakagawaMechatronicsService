<script lang="ts">
	import type { PageData } from './$types';
	import { pixelBurst } from '$lib/attachments/pixelBurst';
	import PixelNavBtn from '$lib/components/PixelNavBtn.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>なかがわ電機サービス</title>
	<meta property="og:url" content="https://nms.lnln.dev" />
	<meta property="og:title" content="なかがわ電機サービス" />
	<meta property="og:description" content="作品集" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:image" content="https://nms.lnln.dev/img/logo.png" />
</svelte:head>

<!-- About Section -->
<section class="bg-gray-100 m-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
	<h2 class="text-2xl text-main font-bold mb-4">About</h2>
	<div class="leading-relaxed text-base">
		<p>
			なかがわ電機サービスは、<a href="https://lnln.dev" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">lnln.dev</a>が運営する個人のものづくりサークルです。
		</p>
	</div>
</section>


<!-- Works Section -->
<section class="bg-gray-100 m-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
	<h2 class="text-2xl text-main font-bold mb-4">Works</h2>
	<div class="flex flex-wrap justify-evenly gap-4">
		{#each data.works as work (work.id)}
			<div class="w-96 m-2">
				<a href="/works/{work.id}" {@attach pixelBurst({ autoRadius: true, particleCount: 16 })}>
					{#if work.thumbnail}
						<img
							src={work.thumbnail.url}
							alt={work.title}
							class="pixel-pressable w-full aspect-[4/3] object-cover"
						/>
					{:else}
						<div class="pixel-pressable w-full aspect-[4/3] bg-gray-300 flex items-center justify-center">
							<span class="text-gray-500">No Image</span>
						</div>
					{/if}
				</a>
				<h3 class="mt-2 text-xl font-bold text-center text-cyan-600">
					<a href="/works/{work.id}" class="hover:underline" {@attach pixelBurst({ autoRadius: true })}>{work.title}</a>
				</h3>
				{#if work.description}
					<p class="p-2 text-sm">{work.description}</p>
				{/if}
			</div>
		{/each}
	</div>
</section>

<!-- Activity Section -->
<section class="bg-gray-100 m-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
	<h2 class="text-2xl text-main font-bold mb-4">Activities</h2>
	<div class="leading-relaxed text-base">
		<ul class="list-disc ml-7 my-4">
			<li>NT東京2023</li>
			<li>NT東京2024</li>
			<li>NT金沢2025: 電気通信大学工学研究部と共同出展</li>
			<li>U☆PoC～UECアイディア実証コンテスト2025～: 奨励賞,濱坂賞賞,トゥモロー・ネット賞, EATEC賞</li>
			<li>技書博12: 黒暗児童遊園委託</li>
			<li>電気通信大学 第75回 調布祭</li>
		</ul>
	</div>
</section>

<!-- Blog & SNS Section -->
<section class="bg-gray-100 m-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
	<h2 class="text-2xl text-main font-bold mb-4">Blog & SNS</h2>
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		<PixelNavBtn href="/blog" class="text-center mx-auto w-32">Blog</PixelNavBtn>
		<PixelNavBtn href="https://www.instagram.com/lnln_ch" class="text-center mx-auto w-32">Instagram</PixelNavBtn>
		<PixelNavBtn href="https://discordapp.com/users/316944552789540875" class="text-center mx-auto w-32">Discord</PixelNavBtn>
		<PixelNavBtn href="https://github.com/ybasviel" class="text-center mx-auto w-32">GitHub</PixelNavBtn>
	</div>
</section>

<!-- Links Section -->
<section class="bg-gray-100 m-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
	<h2 class="text-2xl text-main font-bold mb-4">Links</h2>
	<div class="leading-relaxed text-base">
		<p class="mb-4">大学の知り合いのサイトを紹介</p>
	</div>
	<ul class="list-disc ml-7 my-4">
		<li><a href="https://gotti.dev" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">ごっち(gotti.dev)</a></li>
		<li><a href="https://azukibar.dev" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">アイスの棒(azukibar.dev)</a></li>
		<li><a href="https://www.hutinoatari.dev/" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">捻れたバベル(hutinoatari.dev)</a></li>
		<li><a href="https://mocchan.dev" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">Lunatic電通生もっちゃんの部屋(mocchan.dev)</a></li>
		<li><a href="https://elmer9.github.io/" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">ファンサイト(elmer9.github.io)</a></li>
		<li><a href="https://helkun.dev/" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">へる破壊財団(helkun.dev)</a></li>
		<li><a href="https://yuino.dev/" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">ゆいのページ(yuino.dev)</a></li>
	</ul>
</section>
