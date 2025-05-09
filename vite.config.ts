/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig  } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), visualizer({ open: true, gzipSize: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['lcov', 'json', 'html', 'json-summary']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          // Extrae el nombre del paquete
          const pkg = id
            .split('node_modules/')[1]
            .split('/')[0]

          // Ignora paquetes muy pequeños para que se queden en el chunk principal
          const smallPkgs = [
            'react-is',
            'scheduler',      // react-scheduler
            'react',          // puedes incluso agrupar react→vendor-react-is
            // añade aquí cualquier otro que no quieras en su propio chunk
          ]
          if (smallPkgs.includes(pkg)) {
            return     // undefined → entra en el chunk por defecto
          }

          // Chunk normal para todo lo demás
          return `vendor-${pkg}`
        }
      }
    }
  }

})


