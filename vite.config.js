import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages 部署时使用仓库名作为 base，本地开发使用 ./
  // 如果仓库名是 hash，则 base 为 '/hash/'
  // 部署时请根据实际仓库名修改
  base: process.env.NODE_ENV === 'production' ? '/hash/' : './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2015',
    minify: 'esbuild',
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: ['crc-32']
  }
})
