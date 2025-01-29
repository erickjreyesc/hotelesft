import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'bootstrap': fileURLToPath(new URL('./node_modules/bootstrap', import.meta.url)),
      '@fortawesome': fileURLToPath(new URL('./node_modules/@fortawesome', import.meta.url))
    },
  },
})
