// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://tamtato.github.io',
  base: '/ats-cv-generator',

  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    vue({
      appEntrypoint: '/src/main.ts'
    }),
    icon()
  ]
});