import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Handle node_modules
          if (id.includes('node_modules')) {
            // React and related packages
            if (id.includes('react') || 
                id.includes('react-dom') || 
                id.includes('react-router')) {
              return 'vendor-react';
            }
            
            // Redux related packages
            if (id.includes('redux') || id.includes('@reduxjs')) {
              return 'vendor-redux';
            }
            
            // All other node_modules
            return 'vendor';
          }
        }
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
})
