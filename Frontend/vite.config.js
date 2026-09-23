import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://localhost:8080',

    },

  },

  test: {
    globals: true, // erlaubt describe, test, expect ohne expliziten Import
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
}});
