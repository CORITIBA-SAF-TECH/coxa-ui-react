/* Traduções do playground. O texto em português (o que está escrito no JSX) é a chave.
   Cada arquivo mensagens-*.js traz linhas [português, espanhol, inglês]; os trechos de
   código dos exemplos não são traduzidos.

   Dois atalhos pela URL, úteis para revisar:
     ?lang=en        abre já nesse idioma (pt-BR | es | en)
     ?faltando       lista no console (e em window.coxaI18nFaltando) os textos que
                     apareceram na tela sem tradução no idioma atual */
import { registerMessages, setLanguage, getMissingMessages, LANGUAGES } from '../../src/index.js';

const tabelas = import.meta.glob('./mensagens-*.js', { eager: true });
Object.values(tabelas).forEach(m => registerMessages(m.default));

const url = new URLSearchParams(window.location.search);
const pedido = url.get('lang');
if (pedido && LANGUAGES.some(l => l.code === pedido)) setLanguage(pedido);

if (url.has('faltando')) {
  window.coxaI18nFaltando = getMissingMessages;
  window.addEventListener('load', () => setTimeout(() => {
    const lista = getMissingMessages();
    console.info(`[i18n] ${lista.length} texto(s) sem tradução`, lista);
    const pre = document.createElement('pre');
    pre.id = 'i18n-faltando';
    pre.hidden = true;
    pre.textContent = JSON.stringify(lista);
    document.body.appendChild(pre);
  }, 2500));
}
