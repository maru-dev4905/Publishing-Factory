import { defineConfig } from 'vite';
import path from 'path';
import pkg from './package.json' assert { type: 'json' };

const projectName = process.env.PROJECT_NAME || pkg.name;

export default defineConfig({
  root: '.',
  publicDir: false,
  resolve: {
    alias: {
      '/assets/images':  path.resolve(__dirname, 'public/assets/images'),
      '/assets/plugins': path.resolve(__dirname, 'public/assets/plugins'),
    }
  },
  build: {
    outDir:    'public',
    assetsDir: 'assets',
    emptyOutDir: false,
    lib: {
      entry: {
        'project-config':            path.resolve(__dirname, 'src/js/custom/project-config.js'),
        'pf':                        path.resolve(__dirname, 'src/js/custom/pf.js'),
        [`${projectName}_common`]:   path.resolve(__dirname, `src/js/custom/${projectName}_common.js`)
      },
      formats: ['es'],
      fileName: (_, name) => `assets/js/custom/${name}.js`
    },
    rollupOptions: {
      output: { assetFileNames: info => info.name }
    },
    // custom 번들은 압축하지 않습니다
    minify: false
  }
});
