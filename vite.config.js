// vite.config.js
import {defineConfig} from 'vite';
import path from 'path';
import pkg from './package.json';

export default defineConfig(({command}) => {
  const isServe = command === 'serve';
  const projectName = process.env.PROJECT_NAME || pkg.name;

  const coreEntries = {
    adm: path.resolve(__dirname, 'src/js/core/adm.js'),
    [`${projectName}_animation`]: path.resolve(__dirname, `src/js/core/${projectName}_animation.js`),
    [`${projectName}_common`]: path.resolve(__dirname, `src/js/core/${projectName}_common.js`),
    [`${projectName}_compo`]: path.resolve(__dirname, `src/js/core/${projectName}_compo.js`),
    [`${projectName}_form`]: path.resolve(__dirname, `src/js/core/${projectName}_form.js`),
  };

  const customEntries = {
    'project-config': path.resolve(__dirname, 'src/js/custom/project-config.js'),
    'pf': path.resolve(__dirname, 'src/js/custom/pf.js'),
    [`${projectName}_common`]: path.resolve(__dirname, `src/js/custom/${projectName}_common.js`),
  }
  const entries = { ...coreEntries, ...customEntries };

  return {
    root: '.',
    publicDir: 'public',
    resolve: {
      alias: {
        '/assets/images':  path.resolve(__dirname, 'public/images'),
        '/assets/plugins': path.resolve(__dirname, 'public/plugins'),
      }
    },
    server: isServe
        ? {port: 3000, open: '/demo/index.html'}
        : undefined,
    build: {
      outDir: 'public',
      assetsDir: 'assets',
      emptyOutDir: false,
      lib: {
        entry: entries,
        formats: ['es'],
        fileName: (_, name) => {
          if (name in coreEntries) {
            return `assets/js/core/${name}.js`;
          }
          if (name in customEntries) {
            return `assets/js/custom/${name}.js`;
          }
          return `assets/js/${name}.js`;
        }
      },
      rollupOptions: {
        output: {
          assetFileNames: info => {
            const ext = path.extname(info.name);
            if (ext === '.css') {
              const n = path.basename(info.name, '.css');
              // CSS도 동일하게 assets/css 로 분리
              if (n in coreEntries) {
                return `assets/css/core/${n}.css`;
              }
              if (n in customEntries) {
                return `assets/css/custom/${n}.css`;
              }
              return `assets/css/${n}.css`;
            }
            // 이미지, 폰트 등 기타 자산도 assets 폴더로
            if (info.name.startsWith('images/') || info.name.startsWith('plugins/')) {
              return `assets/${info.name}`;
            }
            // 그 외
            return `assets/[name][extname]`;
          }
        }
      }
    }
  };
});
