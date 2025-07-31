import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solid({
      ssr: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: '/src/index.tsx',
      output: {
        entryFileNames: 'client.js',
      },
    },
    target: 'esnext',

    manifest: false,
    minify: true,
    sourcemap: false,
  },
})
