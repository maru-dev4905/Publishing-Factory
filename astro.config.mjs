// astro.config.mjs
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // 프로젝트 루트를 소스 디렉토리로 사용
  srcDir: './',
  // 로컬 파일 열어도 자산 경로가 올바르게 연결되도록 base 옵션 사용
  base: './',
  trailingSlash: 'never',
  site: 'https://your-domain.com',
  build: {
    outDir: 'dist',
    format: 'file'
  },
  compressHTML: true,
  vite: {
    build: {
      cssCodeSplit: true, // CSS를 하나로 합치려면 false (분리하고 싶다면 true로 변경)
      assetsDir: 'assets',
      rollupOptions: {
        // 여기서 추가 엔트리 파일들을 지정합니다.
        // 프로젝트 구조에 따라 assets 폴더 안의 scss/ 및 js/ 파일들을 엔트리로 삼습니다.
        input: {
          // SCSS 엔트리 → 번들 결과가 assets/css/ 아래에 출력됨.
          wv: resolve(__dirname, 'assets/scss/wv.scss'),
          // 필요한 경우 다른 SCSS 엔트리 추가
          // new_guide: resolve(__dirname, 'assets/scss/new_guide.scss'),

          // Core JS 엔트리 (assets/js/core/)
          adm: resolve(__dirname, 'assets/js/core/adm.js'),
          wv_common: resolve(__dirname, 'assets/js/core/wv_common.js'),
          wv_form: resolve(__dirname, 'assets/js/core/wv_form.js'),
          wv_animation: resolve(__dirname, 'assets/js/core/wv_animation.js'),
          wv_compo: resolve(__dirname, 'assets/js/core/wv_compo.js'),

          // Custom JS 엔트리 (assets/js/custom/)
          pf: resolve(__dirname, 'assets/js/custom/pf.js'),
          project_config: resolve(__dirname, 'assets/js/custom/project-config.js'),
          custom_wv_common: resolve(__dirname, 'assets/js/custom/wv_common.js')
        },
        output: {
          // 앞에 '/'를 제거하여 상대 경로로 출력되도록 함.
          entryFileNames: (chunkInfo) => {
            const customEntries = ['pf', 'project_config', 'custom_wv_common'];
            if (customEntries.includes(chunkInfo.name)) {
              return 'assets/js/custom/[name].js';
            }
            if (chunkInfo.name && ['adm','wv_common','wv_form','wv_animation','wv_compo'].includes(chunkInfo.name)) {
              return 'assets/js/core/[name].js';
            }
            return 'assets/js/[name].js';
          },
          chunkFileNames: 'assets/js/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/css/[name][extname]';
            }
            if (assetInfo.name && assetInfo.name.match(/\.(png|jpe?g|svg|gif)$/)) {
              return 'assets/images/[name][extname]';
            }
            return 'assets/[name][extname]';
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './')
    }
  }
});
