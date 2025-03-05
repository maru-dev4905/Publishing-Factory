import { defineConfig } from 'astro/config';
import path from 'path';

export default defineConfig({
  // 'never'를 사용하면, 예를 들어 src/pages/components/tab.astro → dist/components/tab.html
  trailingSlash: 'never',
  site: 'https://your-domain.com', // 필요시 설정
  vite: {
    build: {
      // 번들 자산을 assets 폴더에 출력 (기본값)
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          // JS 번들 파일의 출력 경로를 사용자 정의합니다.
          entryFileNames: (chunkInfo) => {
            // 만약 특정 엔트리 파일이나 manualChunk를 설정해 두었다면 조건에 맞춰 경로 지정
            if (chunkInfo.name === 'core') {
              return 'js/core/[name]-[hash].js';
            }
            if (chunkInfo.name === 'custom') {
              return 'js/custom/[name]-[hash].js';
            }
            return 'js/[name]-[hash].js';
          },
          chunkFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'core') {
              return 'js/core/[name]-[hash].js';
            }
            if (chunkInfo.name === 'custom') {
              return 'js/custom/[name]-[hash].js';
            }
            return 'js/[name]-[hash].js';
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              // 예: 빌드된 CSS 파일을 assets/css에 출력
              return 'style/[name]-[hash][extname]';
            }
            if (assetInfo.name && assetInfo.name.match(/\.(png|jpe?g|svg|gif)$/)) {
              // 이미지 파일은 원하는 경우 public 폴더에 넣으면 그대로 복사됩니다.
              return 'images/[name]-[hash][extname]';
            }
            // 기본
            return 'assets/[name]-[hash][extname]';
          },
          // 만약 manualChunks를 사용해서 코어와 커스텀 JS를 분리하고 싶다면:
          manualChunks(id) {
            if (id.includes('/src/js/core/')) {
              return 'core';
            }
            if (id.includes('/src/js/custom/')) {
              return 'custom';
            }
          }
        }
      }
    }
  }
});
