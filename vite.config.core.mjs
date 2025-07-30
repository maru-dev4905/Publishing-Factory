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
        adm:                          path.resolve(__dirname, 'src/js/core/adm.js'),
        [`${projectName}_animation`]: path.resolve(__dirname, `src/js/core/${projectName}_animation.js`),
        [`${projectName}_common`]:    path.resolve(__dirname, `src/js/core/${projectName}_common.js`),
        [`${projectName}_compo`]:     path.resolve(__dirname, `src/js/core/${projectName}_compo.js`),
        [`${projectName}_form`]:      path.resolve(__dirname, `src/js/core/${projectName}_form.js`)
      },
      formats: ['es'],
      fileName: (_, name) => `assets/js/core/${name}.js`
    },
    rollupOptions: {
      output: { assetFileNames: info => info.name }
    },
    minify: 'esbuild'
  }
});
