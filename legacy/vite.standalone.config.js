import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build "tutto in un file": produce dist-standalone/index.html con JS e CSS
// incorporati, apribile con doppio click senza server né installazioni.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'dist-standalone' },
})
