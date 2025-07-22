// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import pkg from './package.json';

export default defineConfig(({ command }) => {
  const isServe = command === 'serve';
  const projectName = process.env.PROJECT_NAME || pkg.name;

  // JS 엔트리만
  const coreEntries = {
    adm:                        path.resolve(__dirname, 'src/js/core/adm.js'),
    [`${projectName}_animation`]: path.resolve(__dirname, `src/js/core/${projectName}_animation.js`),
    [`${projectName}_common`]:    path.resolve(__dirname, `src/js/core/${projectName}_common.js`),
    [`${projectName}_compo`]:     path.resolve(__dirname, `src/js/core/${projectName}_compo.js`),
    [`${projectName}_form`]:      path.resolve(__dirname, `src/js/core/${projectName}_form.js`),
  };

  const customEntries = {
    'project-config':          path.resolve(__dirname, 'src/js/custom/project-config.js'),
    'pf':                      path.resolve(__dirname, 'src/js/custom/pf.js'),
    [`${projectName}_common`]: path.resolve(__dirname, `src/js/custom/${projectName}_common.js`),
  };

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
        ? { port: 3000, open: '/demo/index.html' }
        : undefined,
    build: isServe
        ? undefined
        : {
          outDir: 'public',
          assetsDir: 'assets',
          emptyOutDir: false,
          lib: {
            entry: entries,
            formats: ['es'],
            fileName: (_, name) => {
              if (name in coreEntries)  return `assets/js/core/${name}.js`;
              if (name in customEntries) return `assets/js/custom/${name}.js`;
              return `assets/js/${name}.js`;
            }
          },
          rollupOptions: {
            output: {
              // CSS asset 추출은 sass CLI가 담당하므로 제거하거나
              // 그냥 기본 동작을 유지해도 무방합니다.
              assetFileNames: info => info.name
            }
          },
          // custom JS를 minify 하지 않고, core만 minify 하고 싶으면
          // minify: false
        }
  };
});
