import { defineConfig } from 'vite';
import { join } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist/assets',
    assetsDir: '',
    rollupOptions: {
      input: {
        // Core JS 엔트리 파일들
        wv_compo: join(process.cwd(), 'assets', 'js', 'core', 'wv_compo.js'),
        // adm: join(process.cwd(), 'assets', 'js', 'core', 'adm.js'),
        // wv_common: join(process.cwd(), 'assets', 'js', 'core', 'wv_common.js'),
        // wv_form: join(process.cwd(), 'assets', 'js', 'core', 'wv_form.js'),
        // wv_animation: join(process.cwd(), 'assets', 'js', 'core', 'wv_animation.js'),
        // Custom JS 엔트리 파일들 (public 폴더에 있는 경우)
        // pf: join(process.cwd(), 'public', 'js', 'custom', 'pf.js'),
        // project_config: join(process.cwd(), 'public', 'js', 'custom', 'project-config.js'),
        // custom_wv_common: join(process.cwd(), 'public', 'js', 'custom', 'wv_common.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          const customEntries = ['pf', 'project_config', 'custom_wv_common'];
          if (customEntries.includes(chunkInfo.name)) {
            return 'js/custom/[name].js';
          }
          if (['adm', 'wv_common', 'wv_form', 'wv_animation', 'wv_compo'].includes(chunkInfo.name)) {
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
