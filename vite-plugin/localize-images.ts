import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { existsSync } from 'node:fs';
import { createReadStream } from 'node:fs';
import type { Plugin } from 'vite';

const BUILD_DIR = 'build';
const ASSETS_DIR = 'cms-assets';
const URL_PATTERN = /https:\/\/images\.microcms-assets\.io\/assets\/[^\s"'<>)\]}`]+/g;

const MIME_TYPES: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.svg': 'image/svg+xml'
};

function urlToLocalPath(url: string): string {
	const u = new URL(url);
	const pathWithoutAssets = u.pathname.replace(/^\/assets\//, '');
	return join(ASSETS_DIR, pathWithoutAssets);
}

async function collectFiles(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true, recursive: true });
	return entries
		.filter((e) => e.isFile() && (e.name.endsWith('.html') || e.name.endsWith('.json')))
		.map((e) => join(e.parentPath ?? e.path, e.name));
}

async function downloadImage(url: string, fullPath: string): Promise<boolean> {
	await mkdir(dirname(fullPath), { recursive: true });
	const res = await fetch(url);
	if (!res.ok) {
		console.error(`  Failed to download ${url}: ${res.status}`);
		return false;
	}
	await writeFile(fullPath, Buffer.from(await res.arrayBuffer()));
	return true;
}

export function localizeImages(): Plugin {
	return {
		name: 'localize-microcms-images',

		closeBundle: {
			sequential: true,
			order: 'post',
			async handler() {
				if (!existsSync(BUILD_DIR)) return;

				const files = await collectFiles(BUILD_DIR);
				console.log(`[localize-images] Scanning ${files.length} files...`);

				const urlMap = new Map<string, string>();
				const fileContents = new Map<string, string>();

				for (const file of files) {
					const content = await readFile(file, 'utf-8');
					const matches = content.match(URL_PATTERN);
					if (matches) {
						fileContents.set(file, content);
						for (const url of matches) {
							if (!urlMap.has(url)) {
								urlMap.set(url, urlToLocalPath(url));
							}
						}
					}
				}

				if (urlMap.size === 0) return;

				console.log(`[localize-images] Found ${urlMap.size} unique image URLs`);

				let downloaded = 0;
				const failed: string[] = [];
				for (const [url, localPath] of urlMap) {
					if (await downloadImage(url, join(BUILD_DIR, localPath))) {
						downloaded++;
					} else {
						failed.push(url);
					}
				}

				console.log(`[localize-images] Downloaded ${downloaded}/${urlMap.size} images`);
				if (failed.length > 0) {
					console.error(`[localize-images] Failed URLs:`, failed);
				}

				let rewritten = 0;
				for (const [file, content] of fileContents) {
					let updated = content;
					for (const [url, localPath] of urlMap) {
						if (failed.includes(url)) continue;
						updated = updated.replaceAll(url, '/' + localPath.replaceAll('\\', '/'));
					}
					if (updated !== content) {
						await writeFile(file, updated);
						rewritten++;
					}
				}

				console.log(`[localize-images] Rewrote ${rewritten} files`);
			}
		},

		configurePreviewServer(server) {
			server.middlewares.use((req, res, next) => {
				const url = req.url;
				if (!url?.startsWith(`/${ASSETS_DIR}/`)) return next();

				const filePath = join(BUILD_DIR, decodeURIComponent(url));
				if (!existsSync(filePath)) return next();

				const mime = MIME_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
				res.setHeader('Content-Type', mime);
				res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
				createReadStream(filePath).pipe(res);
			});
		}
	};
}
