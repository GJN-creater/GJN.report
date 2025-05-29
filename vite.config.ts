import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Node.js 내장 타입 지원 위해 아래 추가 (ts 환경에서 에러 방지)
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ESM 환경일 경우 필요 (Vite는 ESM 기반)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // ✅ GitHub Pages 배포용 base 경로 설정
  base: '/GJN.report/',

  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    strictPort: true,
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
    target: 'esnext',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'date-fns'],
  },
});
