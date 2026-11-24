import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';

/* Commit curto do Git, para o rodapé do playground. Sem Git (ex.: zip), fica vazio. */
function commitAtual() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD', { cwd: __dirname, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}
const define = { __COXA_COMMIT__: JSON.stringify(commitAtual()) };

/* Serve o llms.txt (fonte única na raiz do repo) em /llms.txt no dev server
   e no build do playground (Vercel). Evita duplicar o arquivo. */
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

/* Tradução automática: o JSX da biblioteca e do playground usa o runtime de src/i18n
   (igual ao do React, mas traduz o texto dos elementos HTML ao criá-los).

   O JSX compilado importa "react/jsx-runtime" (ou "-dev-runtime"); este plugin desvia esse
   import para os dois arquivos de src/i18n, que por sua vez importam o runtime do React de
   verdade. Não se usa jsxImportSource porque, em desenvolvimento, o Vite pré-empacotaria o
   runtime como dependência e criaria uma segunda cópia do núcleo de tradução (com outro
   dicionário e outro idioma atual). */
const RUNTIME_I18N = {
  'react/jsx-runtime': resolve(__dirname, 'src/i18n/jsx-runtime.js'),
  'react/jsx-dev-runtime': resolve(__dirname, 'src/i18n/jsx-dev-runtime.js')
};
const barras = p => String(p || '').replace(/\\/g, '/');
const ehRuntimeI18n = arquivo => {
  const a = barras(arquivo).split('?')[0];
  return Object.values(RUNTIME_I18N).some(r => barras(r) === a);
};
function jsxI18nPlugin() {
  return {
    name: 'coxa-i18n-jsx',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!RUNTIME_I18N[id] || !importer) return null;
      /* dependências e os próprios arquivos do runtime seguem para o React */
      if (barras(importer).includes('/node_modules/') || ehRuntimeI18n(importer)) return null;
      return RUNTIME_I18N[id];
    }
  };
}

export default defineConfig(({ command, mode }) => {
  /* `npm run build:demo`: gera o playground como site estático (Vercel) */
  if (mode === 'demo') {
    return {
      plugins: [jsxI18nPlugin(), react(), llmsTxtPlugin()],
      define,
      root: 'demo',
      build: {
        outDir: '../dist-demo',
        emptyOutDir: true
      }
    };
  }

  /* `npm run dev` abre o playground (demo/); `npm run build` gera a lib */
  return {
    plugins: [jsxI18nPlugin(), react(), ...(command === 'serve' ? [llmsTxtPlugin()] : [])],
    define: command === 'serve' ? define : undefined,
    root: command === 'serve' ? 'demo' : '.',
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'CoxaUIReact',
        fileName: 'coxa-ui-react'
      },
      rollupOptions: {
        /* react/jsx-runtime só fica de fora quando quem importa é o runtime de src/i18n;
           o JSX dos componentes passa antes pelo plugin acima */
        external: (id, importer) => id === 'react' || id === 'react-dom'
          || (id === 'react/jsx-runtime' && ehRuntimeI18n(importer)),
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
