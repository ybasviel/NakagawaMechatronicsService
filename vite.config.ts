import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { localizeImages } from './vite-plugin/localize-images';

export default defineConfig({ plugins: [tailwindcss(), sveltekit(), localizeImages()] });
