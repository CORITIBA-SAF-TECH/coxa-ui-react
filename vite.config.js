import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  /* `npm run build:demo` — gera o playground como site estático (Vercel) */
  if (mode === 'demo') {
    return {
      plugins: [react()],
      root: 'demo',
      build: {
        outDir: '../dist-demo',
        emptyOutDir: true
      }
    };
  }

  /* `npm run dev` abre o playground (demo/); `npm run build` gera a lib */
  return {
    plugins: [react()],
    root: command === 'serve' ? 'demo' : '.',
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'CoxaUIReact',
        fileName: 'coxa-ui-react'
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime'
          }
        }
      }
    }
  };
});
