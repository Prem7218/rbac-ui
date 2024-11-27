import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
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
=======
    host: '0.0.0.0',        // Ensure the app is accessible externally
    port: process.env.PORT || 5173, // Use dynamic port if provided by Render
    open: true,             // Automatically open the app in the browser
  },
  build: {
    outDir: 'dist',         // Output directory for production build
  },
  resolve: {
    alias: {
      '@': '/src',           // Path alias for 'src'
    },
  },
  preview: {
    port: 5174,             // Preview port for the build
>>>>>>> be065a9d247421fa891c665fcef10183d652ccc8
  },
});
