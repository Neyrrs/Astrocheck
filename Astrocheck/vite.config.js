import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // 🔥 Fix untuk ES Modules

export default defineConfig({
  resolve: {
    alias: {
      '/': path.resolve(__dirname, 'src'), // ✅ Alias tetap bisa digunakan
    },
  },
});
