import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    proxy:{
      "/api":{
        target:"https://cosmetics-3o1c.onrender.com",
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/Components': path.resolve(__dirname, 'src/Components'),
    },
  },
  },
 

)
