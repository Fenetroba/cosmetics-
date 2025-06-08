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
        manualChunks: {
          'react-vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-router',
            'scheduler'
          ],
          'redux-vendor': [
            '@reduxjs/toolkit',
            'react-redux'
          ],
          'utils-vendor': [
            'axios',
            'formik',
            'yup'
          ]
        }
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-router',
      'scheduler'
    ],
    exclude: ['@reduxjs/toolkit', 'react-redux']
  },
})
