//----------WORK IN PROGRESS-------------

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    jsconfigPaths(),
  ],
  optimizeDeps:{
    include: ["@chakra-ui/icons"]
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // proxy all API calls that start with "/api" to our backend 
    },
  },
});
