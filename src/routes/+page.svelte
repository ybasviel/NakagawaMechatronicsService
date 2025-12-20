<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>なかがわ電機サービス</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:url" content="https://lnln.dev" />
	<meta property="og:title" content="なかがわ電機サービス" />
	<meta property="og:description" content="趣味の工作の記録" />
</svelte:head>

<!-- Works Section -->
<section class="bg-gray-100 m-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
	<h2 class="text-2xl text-main font-bold mb-4">Works</h2>
	<div class="flex flex-wrap justify-evenly gap-4">
		{#each data.works as work}
			<div class="w-96 m-2">
				<a href="/works/{work.id}">
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
					<a href="/works/{work.id}" class="hover:underline">{work.title}</a>
				</h3>
				{#if work.description}
					<p class="p-2 text-sm">{work.description}</p>
				{/if}
			</div>
		{/each}
	</div>
</section>

<!-- Blog & SNS Section -->
<section class="bg-gray-100 m-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
	<h2 class="text-2xl text-main font-bold mb-4">Blog & SNS</h2>
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		<a class="pixel-nav-btn text-center" href="/blog">Blog</a>
		<a class="pixel-nav-btn text-center" href="https://www.instagram.com/lnln_ch" target="_blank" rel="noopener noreferrer">Instagram</a>
		<a class="pixel-nav-btn text-center" href="https://discordapp.com/users/316944552789540875" target="_blank" rel="noopener noreferrer">Discord</a>
		<a class="pixel-nav-btn text-center" href="https://github.com/ybasviel" target="_blank" rel="noopener noreferrer">GitHub</a>
	</div>
</section>

<!-- Links Section -->
<section class="bg-gray-100 m-4 p-4 pixel-section dark:bg-gray-800 dark:text-white">
	<h2 class="text-2xl text-main font-bold mb-4">Links</h2>
	<p class="mb-4">いつの間にか僕のサイトのリンクが友人や先輩や後輩のサイトに貼られていたので、私も貼って相互にします</p>
	<ul class="list-disc m-4">
		<li><a href="https://gotti.dev" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">ごっち(gotti.dev)</a></li>
		<li><a href="https://azukibar.dev" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">アイスの棒(azukibar.dev)</a></li>
		<li><a href="https://www.hutinoatari.dev/" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">捻れたバベル(hutinoatari.dev)</a></li>
		<li><a href="https://mocchan.dev" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">Lunatic電通生もっちゃんの部屋(mocchan.dev)</a></li>
		<li><a href="https://elmer9.github.io/" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">ファンサイト(elmer9.github.io)</a></li>
		<li><a href="https://helkun.dev/" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">へる破壊財団(helkun.dev)</a></li>
		<li><a href="https://yuino.dev/" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">ゆいのページ(yuino.dev)</a></li>
	</ul>
</section>
