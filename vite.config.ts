import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

export default defineConfig({
  plugins: [vue()],
  root: join(__dirname, 'src/render'),
  base: './', // index.html 中静态资源加载位置
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@src': join(__dirname, 'src'),
      '@main': join(__dirname, 'src/main'),
      '@render': join(__dirname, 'src/render'),
    },
  },
  build: {
    outDir: join(__dirname, 'dist/render'),
    sourcemap: true,
    minify: false,
    assetsDir: '', // 相对路径 加载问题
  },
  server: {
    port: pkg.env.PORT,
  }
})
