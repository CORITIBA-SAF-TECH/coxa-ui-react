import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  /* `npm run dev` abre o playground (demo/); `npm run build` gera a lib */
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
}));
