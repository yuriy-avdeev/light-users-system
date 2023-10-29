import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],

  define: {
    'process.env': {
      VITE_APP_TITLE: 'Vue-3-TEST Dev',
    },
  },

  // fot the github deployment
  base: '/vue-3-test/',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
