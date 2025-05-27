import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),                       // @ → src
      '@components': path.resolve(__dirname, 'components'),      // @components → components
      '@lib': path.resolve(__dirname, 'src/lib'),                // @lib → src/lib
    },
  },
  server: {
    host: '0.0.0.0',                // 다른 기기 접근 가능 (로컬 네트워크용)
    port: 5173,
    open: true,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
    target: 'esnext',              // 최신 브라우저 대상
    assetsInlineLimit: 4096,       // 작은 asset은 base64로 인라인 처리
    cssCodeSplit: true,            // CSS 분리로 초기 로딩 최적화
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'date-fns'], // 자주 쓰는 패키지 사전 최적화
  },
})
