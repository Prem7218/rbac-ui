import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, 
    open: true, 
    proxy: {
  
      '/api/users': {
        target: 'http://localhost:3000',
        changeOrigin: true, 
        secure: false,  
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
      
      '/api/roles': {
        target: 'http://localhost:3001',
        changeOrigin: true,  
        secure: false,  
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
  build: {
    outDir: 'dist',  
  },
  resolve: {
    alias: {
      '@': '/src',  
    },
  },

  server: {
    fs: {
      strict: false,
    },
  },
  preview: {
    port: 5174, 
  },
});
