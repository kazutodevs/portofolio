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
        manualChunks(id) {
          if (id.includes('three')) {
            return 'three'
          }

          if (id.includes('framer-motion')) {
            return 'framer'
          }

          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },

  optimizeDeps: {
    include: ['three', 'framer-motion', 'react', 'react-dom']
  }
})