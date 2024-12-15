import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/* Default 
export default defineConfig({
  plugins: [react()],
})
*/


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/foss4g-asia2024-timetable-ja/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // ソースマップを生成して問題を特定しやすくする
    sourcemap: true,
  },
})