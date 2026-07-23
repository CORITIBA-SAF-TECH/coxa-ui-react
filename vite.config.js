import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync } from 'fs';

/* Serve o llms.txt (fonte única na raiz do repo) em /llms.txt —
   no dev server e no build do playground (Vercel). Evita duplicar o arquivo. */
function llmsTxtPlugin() {
  const file = resolve(__dirname, 'llms.txt');
  return {
    name: 'coxa-llms-txt',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/llms.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(readFileSync(file, 'utf-8'));
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: readFileSync(file, 'utf-8') });
    }
  };
}

export default defineConfig(({ command, mode }) => {
  /* `npm run build:demo` — gera o playground como site estático (Vercel) */
  if (mode === 'demo') {
    return {
      plugins: [react(), llmsTxtPlugin()],
      root: 'demo',
      build: {
        outDir: '../dist-demo',
        emptyOutDir: true
      }
    };
  }

  /* `npm run dev` abre o playground (demo/); `npm run build` gera a lib */
  return {
    plugins: [react(), ...(command === 'serve' ? [llmsTxtPlugin()] : [])],
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
