import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://lost0427.github.io',
    base: '/Reblog',
    integrations: [mdx(), sitemap(), tailwind()],
});