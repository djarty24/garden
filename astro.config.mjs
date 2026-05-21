// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://revatitambe.vercel.app',

	vite: {
		plugins: [tailwindcss()]
	},

	integrations: [react(), sitemap()],

	markdown: {
		shikiConfig: {
			theme: 'rose-pine-dawn',
			wrap: true,
		},
		rehypePlugins: [
			[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
		]
	},
});