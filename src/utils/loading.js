import { COXA_LOGO } from '../assets/logo.js';
import { LOADER_PARTS } from '../components/Loading.jsx';
import { t } from '../i18n/core.js';

let no = null;
let caixa = null;
let abertos = 0;
let saida = 0;

const el = (tag, cls) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
};

/* Monta o desenho sem React, com as mesmas classes do <Loader> e do <LogoLoader> */
function desenho(variant, label) {
  const logo = variant === 'logo' || LOADER_PARTS[variant] === undefined;
  const raiz = el('span', logo ? 'logo-ld' : `ld ld-${variant}`);
  raiz.setAttribute('role', 'status');
  raiz.setAttribute('aria-live', 'polite');
  let arte;
  if (logo) {
    arte = el('span', 'logo-ld-art');
    arte.style.setProperty('--sz', '72px');
    const img = el('img');
    img.src = COXA_LOGO;
    img.alt = '';
    arte.append(el('span', 'logo-ld-ring'), img);
  } else {
    arte = el('span', `ld-art ld-a-${variant}`);
    arte.style.setProperty('--sz', '44px');
    for (let i = 0; i < LOADER_PARTS[variant]; i++) arte.append(el('i'));
  }
  raiz.append(arte);
  if (label) {
    const txt = el('span', logo ? 'logo-ld-lbl' : 'ld-lbl');
    txt.textContent = t(String(label));
    raiz.append(txt);
  }
  return raiz;
}

/* Modal de carregamento sem estado: desfoca a tela e mostra o carregamento.
     const fechar = showLoading('Emitindo nota...');                    // escudo
     const fechar = showLoading('Emitindo nota...', { variant: 'ring' });
     try { await emitir(); } finally { fechar(); }
   variant: logo (padrão) | ring | dots | bars | pulse | orbit | linear
   Chamadas simultâneas compartilham o mesmo modal: ele só some quando todas fecharem
   (vale o texto e a variação da chamada mais recente).
   O texto entra como textContent, nunca como HTML. Em componente com estado, prefira
   <LoadingOverlay open={...} />. */
export function showLoading(label = 'Carregando...', { variant = 'logo' } = {}) {
  if (typeof document === 'undefined') return () => {};
  if (!no) {
    no = el('div', 'load-ov');
    no.setAttribute('aria-busy', 'true');
    caixa = el('div', 'load-box');
    no.append(caixa);
  }
  clearTimeout(saida);
  caixa.className = variant === 'linear' ? 'load-box load-box-wide' : 'load-box';
  caixa.replaceChildren(desenho(variant, label));
  if (!no.isConnected) document.body.appendChild(no);
  abertos++;
  /* força o layout antes de abrir, para a transição rodar */
  void no.offsetWidth;
  no.classList.add('open');

  let fechado = false;
  return function fechar() {
    if (fechado) return;
    fechado = true;
    abertos = Math.max(0, abertos - 1);
    if (abertos > 0) return;
    no.classList.remove('open');
    saida = setTimeout(() => { if (!abertos) no.remove(); }, 260);
  };
}
