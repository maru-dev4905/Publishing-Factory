// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // 로컬 파일에서도 상대 경로로 작동
  build: {
    outDir: 'dist/assets', // 최종 번들 산출물이 dist/assets 폴더에 생성됨
    assetsDir: '',         // outDir 안에 바로 번들 파일을 출력 (하위 폴더는 output 설정에서 지정)
    inlineDynamicImports: true, // 각 엔트리 파일에 대해 하나의 번들 파일로 인라인
    rollupOptions: {
      input: {
        // Core JS 엔트리 파일들 (예: assets/js/core 폴더 내)
        wv_compo: resolve(process.cwd(), 'assets/js/core/wv_compo.js'),
        wv_animation: resolve(process.cwd(), 'assets/js/core/wv_animation.js'),
        wv_common: resolve(process.cwd(), 'assets/js/core/wv_common.js'),
        wv_form: resolve(process.cwd(), 'assets/js/core/wv_form.js'),
        adm: resolve(process.cwd(), 'assets/js/core/adm.js'),
        // Custom JS 엔트리 파일들 (public 폴더에 있다면 번들 대상에서 복사가 아닌 번들로 포함시키려면 위치를 옮기거나 별도 관리)
        pf: resolve(process.cwd(), 'public/js/custom/pf.js'),
        project_config: resolve(process.cwd(), 'public/js/custom/project-config.js'),
        custom_wv_common: resolve(process.cwd(), 'public/js/custom/wv_common.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          const customEntries = ['pf', 'project_config', 'custom_wv_common'];
          // if (customEntries.includes(chunkInfo.name)) {
          //   return 'js/custom/[name].js';
          // }
          if (['wv_compo','wv_animation','wv_common','wv_form','adm'].includes(chunkInfo.name)) {
            return 'js/core/[name].js';
          }
          return 'js/[name].js';
        },
        chunkFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          if (assetInfo.name && assetInfo.name.match(/\.(png|jpe?g|svg|gif)$/)) {
            return 'images/[name][extname]';
          }
          return '[name][extname]';
        }
      }
    }
  }
});
