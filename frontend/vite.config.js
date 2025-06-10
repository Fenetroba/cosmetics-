import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
<<<<<<< HEAD
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/Components'),
      '@pages': path.resolve(__dirname, './src/Page'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@all-users': path.resolve(__dirname, './src/all users')
    }
  },
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:5000",
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux']
        }
      }
    }
  }
=======
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://cosmetics-3o1c.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },

>>>>>>> parent of 600661d (new state)
})
