import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'framer': ['framer-motion']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'framer-motion', 'react', 'react-dom']
  }
})