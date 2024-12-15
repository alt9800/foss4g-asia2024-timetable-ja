import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/* Default 
export default defineConfig({
  plugins: [react()],
})
*/


// Github Configuration

export default defineConfig({
  plugins: [react()],
  base: '/foss4g-asia2024-timetable-ja/'
})