// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteFontsPlugin } from 'vite-plugin-fonts';

export default defineConfig({
  plugins: [
    react(),
    ViteFontsPlugin(),
  ],
});
