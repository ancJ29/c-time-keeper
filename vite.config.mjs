import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

process.env.VITE_APP_VERSION = process.env.npm_package_version
process.env.VITE_APP_BUILD = Date.now().toString()

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9999,
  },
})
