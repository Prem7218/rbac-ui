import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',      
    port: process.env.PORT || 5173, 
    open: true,             
  },
  build: {
    outDir: 'dist',         
  },
  resolve: {
    alias: {
      '@': '/src',           
    },
  },
  preview: {
    port: 5174,            
  },
});
