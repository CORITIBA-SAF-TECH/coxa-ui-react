import { Fragment, cloneElement, isValidElement, useSyncExternalStore } from 'react';
import { LIB_MESSAGES } from './messages.js';

/* ══════════════════════════════════════════════════════════════════
   Tradução (i18n) do CoxaUI

   O português do Brasil é o idioma de origem: o texto escrito no código
   é a chave. Um dicionário leva cada texto ao espanhol e ao inglês; o que
   não tiver tradução aparece em português. Por isso dá para traduzir um
   sistema aos poucos.

     registerMessages({ en: { 'Salvar': 'Save' }, es: { 'Salvar': 'Guardar' } });
     t('Salvar')                                  → "Save" (com o inglês ativo)
     t('{n} itens selecionados', { n: 3 })        → variáveis entre chaves

   Dois caminhos de tradução:
   1. Tudo o que um componente da lib desenha (rótulos, títulos, botões,
      placeholders) é traduzido sozinho quando o texto está no dicionário.
      Isso vale porque o JSX da lib é compilado contra o runtime de
      src/i18n (ver i18nElement, abaixo, e o vite.config.js).
   2. t() / useI18n() para o resto: texto montado no código, mensagens e
      o texto que o app escreve nos seus próprios elementos HTML.
   ══════════════════════════════════════════════════════════════════ */

export const DEFAULT_LANGUAGE = 'pt-BR';

/* Os nomes ficam no próprio idioma: quem procura "English" não lê português */
export const LANGUAGES = [
  { code: 'pt-BR', label: 'Português (Brasil)', short: 'PT', flag: 'br' },
  { code: 'es', label: 'Español', short: 'ES', flag: 'es' },
  { code: 'en', label: 'English', short: 'EN', flag: 'us' }
];

const CHAVE = 'coxaui-lang';
const TEM_LETRA = /[A-Za-zÀ-ÿ]/;
const valido = code => LANGUAGES.some(l => l.code === code);

const dicionarios = {};        /* código → Map(texto de origem → tradução) */
const ouvintes = new Set();
const faltando = new Set();    /* textos procurados e não encontrados (ver getMissingMessages) */

function lerSalvo() {
  try { const v = localStorage.getItem(CHAVE); return valido(v) ? v : null; } catch { return null; }
}

let atual = (typeof window !== 'undefined' && lerSalvo()) || DEFAULT_LANGUAGE;
let dic = null;                /* Map do idioma atual; null = nada a traduzir (caminho rápido) */
let jaTraduzidos = new Set();  /* textos que já são tradução: se voltarem a ser procurados, não são "faltantes" */

function recalcular() {
  const m = dicionarios[atual];
  dic = m && m.size ? m : null;
  jaTraduzidos = new Set(dic ? dic.values() : []);
}

/* Registra traduções. Pode ser chamado várias vezes: os dicionários se somam.
     registerMessages({ es: { 'Salvar': 'Guardar' }, en: { 'Salvar': 'Save' } });
   Também aceita uma tabela, com o texto de origem escrito uma vez só por linha:
     registerMessages([['Salvar', 'Guardar', 'Save']]);                 // colunas: origem, es, en
     registerMessages(linhas, ['en', 'es']);                            // outra ordem de colunas */
export function registerMessages(messages, colunas = ['es', 'en']) {
  if (Array.isArray(messages)) {
    messages.forEach(linha => {
      if (!Array.isArray(linha) || typeof linha[0] !== 'string') return;
      colunas.forEach((code, i) => {
        const trad = linha[i + 1];
        if (typeof trad !== 'string' || trad === '') return;
        (dicionarios[code] || (dicionarios[code] = new Map())).set(normalizar(linha[0]), trad);
      });
    });
  } else if (messages && typeof messages === 'object') {
    Object.entries(messages).forEach(([code, textos]) => {
      if (!textos || typeof textos !== 'object') return;
      const m = dicionarios[code] || (dicionarios[code] = new Map());
      Object.entries(textos).forEach(([origem, trad]) => { if (typeof trad === 'string') m.set(normalizar(origem), trad); });
    });
  }
  recalcular();
  ouvintes.forEach(f => f());
}

export function getLanguage() {
  return atual;
}

/* Troca o idioma: guarda a escolha (localStorage 'coxaui-lang'), ajusta <html lang>
   e avisa quem usa useI18n(). O texto que já está na tela só muda quando o componente
   que o desenhou for redesenhado; por isso o <LanguageSelector> recarrega a página. */
export function setLanguage(code) {
  if (!valido(code) || code === atual) return;
  atual = code;
  recalcular();
  try { localStorage.setItem(CHAVE, code); } catch { /* sem storage: vale só nesta visita */ }
  if (typeof document !== 'undefined') document.documentElement.lang = code;
  ouvintes.forEach(f => f());
}

function assinar(f) {
  ouvintes.add(f);
  return () => ouvintes.delete(f);
}

const normalizar = s => String(s).replace(/\s+/g, ' ').trim();

/* Procura um texto no dicionário do idioma atual. Ignora os espaços das pontas
   (e os devolve na tradução). undefined = sem tradução. */
function buscar(texto, anotar = true) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(texto);
  const nucleo = normalizar(m[2]);
  if (!nucleo || !TEM_LETRA.test(nucleo)) return undefined;
  const trad = dic.get(nucleo);
  if (trad !== undefined) return m[1] + trad + m[3];
  if (anotar && faltando.size < 5000 && !jaTraduzidos.has(nucleo)) faltando.add(nucleo);
  return undefined;
}

const comVariaveis = (texto, vars) => (vars
  ? texto.replace(/\{(\w+)\}/g, (tudo, k) => (Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : tudo))
  : texto);

/* Traduz um texto para o idioma atual. Sem tradução, devolve o próprio texto.
     t('Salvar')
     t('{n} de {total} linhas', { n: 4, total: 8 })
   Quem não é string volta como veio (dá para passar um ReactNode sem checar antes). */
export function t(texto, vars) {
  if (typeof texto !== 'string') return texto;
  if (!dic) return comVariaveis(texto, vars);
  const trad = buscar(texto);
  const out = comVariaveis(trad === undefined ? texto : trad, vars);
  /* o resultado costuma passar de novo pela tradução do JSX (num aria-label, num <span>) */
  if (trad !== undefined && vars && jaTraduzidos.size < 20000) jaTraduzidos.add(normalizar(out));
  return out;
}

/* Idioma atual dentro de um componente (redesenha quando o idioma muda).
     const { lang, setLanguage, t, languages } = useI18n(); */
export function useI18n() {
  const lang = useSyncExternalStore(assinar, getLanguage, () => DEFAULT_LANGUAGE);
  return { lang, languages: LANGUAGES, setLanguage, t };
}

/* Textos que apareceram na tela sem tradução no idioma atual (em ordem alfabética).
   Para traduzir um sistema: abra as telas no idioma novo e chame isto no console. */
export function getMissingMessages() {
  return Array.from(faltando).sort((a, b) => a.localeCompare(b, 'pt'));
}
export function clearMissingMessages() {
  faltando.clear();
}

/* ── Tradução automática do JSX ──────────────────────────────────────
   i18nElement entra no lugar de jsx()/jsxs()/jsxDEV(): ao criar um elemento
   HTML (ou um fragmento), traduz o texto dos filhos e de alguns atributos.
   No idioma de origem não faz nada. */

const NAO_TRADUZIR = new Set(['script', 'style', 'code', 'pre', 'kbd', 'samp', 'textarea', 'noscript']);
const ATRIBUTOS = ['placeholder', 'title', 'aria-label', 'alt', 'aria-description', 'aria-placeholder'];
const INLINE = new Set(['code', 'strong', 'b', 'em', 'i', 'a', 'span', 'u', 'mark', 'small', 'sub', 'sup', 'abbr']);

/* texto original de um elemento cujo único filho (string) foi traduzido */
const originais = new WeakMap();

const textoOriginal = el => (originais.has(el) ? originais.get(el) : el.props.children);
/* elemento de texto corrido (<code>, <strong>, <a>…) com um texto só, e com letras:
   um <span>*</span> de campo obrigatório não faz do rótulo uma "frase" */
const inlineComTexto = el => typeof el.type === 'string' && INLINE.has(el.type)
  && el.props.translate !== 'no'
  && (typeof el.props.children === 'string' || originais.has(el))
  && TEM_LETRA.test(String(textoOriginal(el)));

/* Frase com elementos no meio: vira uma chave só, para a tradução poder mudar a
   ordem das palavras. Na chave:
     <code>x</code> → `x`     <strong>x</strong> → **x**
     outro elemento de texto → <0>x</0>     qualquer outro elemento (ícone, componente) → {0}
   (o número é a posição do elemento entre os filhos)
   Vale quando há texto e um elemento de texto no meio, ou dois textos separados por um
   elemento. Um texto só ao lado de um ícone (botão) não é frase: é traduzido direto.
   Com número entre os filhos (texto montado com dados) também não. */
function traduzirFrase(filhos) {
  let textos = 0, temInline = false, temElemento = false;
  for (const c of filhos) {
    if (typeof c === 'string') { if (TEM_LETRA.test(c)) textos++; }
    else if (typeof c === 'number' || Array.isArray(c)) return null;
    else if (isValidElement(c)) { temElemento = true; if (inlineComTexto(c)) temInline = true; }
  }
  if (!textos || !temElemento || !(temInline || textos > 1)) return null;

  const els = [];
  let chave = '';
  for (const c of filhos) {
    if (c === null || c === undefined || typeof c === 'boolean') continue;
    if (typeof c === 'string' || typeof c === 'number') { chave += c; continue; }
    if (!isValidElement(c)) return null;
    const i = els.push(c) - 1;
    if (!inlineComTexto(c)) chave += `{${i}}`;
    else if (c.type === 'code') chave += '`' + textoOriginal(c) + '`';
    else if (c.type === 'strong' || c.type === 'b') chave += '**' + textoOriginal(c) + '**';
    else chave += `<${i}>${textoOriginal(c)}</${i}>`;
  }
  const trad = buscar(chave);
  if (trad === undefined) return undefined;   /* frase sem tradução: cai no texto a texto, sem anotar os pedaços */

  const fila = {
    code: els.filter(e => e.type === 'code' && inlineComTexto(e)),
    forte: els.filter(e => (e.type === 'strong' || e.type === 'b') && inlineComTexto(e))
  };
  const comTexto = (el, txt, n) => cloneElement(el, { key: el.key ?? `i18n-${n}` }, txt);
  const out = [];
  const re = /(`[^`]*`|\*\*[^*]+\*\*|<(\d+)>([\s\S]*?)<\/\2>|\{(\d+)\})/g;
  let ultimo = 0, m, n = 0;
  while ((m = re.exec(trad))) {
    if (m.index > ultimo) out.push(trad.slice(ultimo, m.index));
    const tok = m[0];
    if (tok[0] === '`') { const el = fila.code.shift(); out.push(el ? comTexto(el, tok.slice(1, -1), n++) : tok.slice(1, -1)); }
    else if (tok[0] === '*') { const el = fila.forte.shift(); out.push(el ? comTexto(el, tok.slice(2, -2), n++) : tok.slice(2, -2)); }
    else if (m[2] !== undefined) { const el = els[+m[2]]; out.push(el ? comTexto(el, m[3], n++) : m[3]); }
    else { const el = els[+m[4]]; if (el) out.push(cloneElement(el, { key: el.key ?? `i18n-${n++}` })); }
    ultimo = re.lastIndex;
  }
  if (ultimo < trad.length) out.push(trad.slice(ultimo));
  return out;
}

function traduzirFilhos(filhos) {
  if (typeof filhos === 'string') {
    const trad = buscar(filhos);
    return trad === undefined ? filhos : trad;
  }
  if (!Array.isArray(filhos)) return filhos;
  const frase = traduzirFrase(filhos);
  if (frase) return frase;
  const anotar = frase === null;   /* undefined = era uma frase sem tradução: os pedaços não vão para a lista */
  let mudou = false;
  const out = filhos.map(c => {
    /* lista dentro de lista: o {children} que um componente repassa no meio do seu JSX */
    if (Array.isArray(c)) {
      const sub = traduzirFilhos(c);
      if (sub !== c) mudou = true;
      return sub;
    }
    if (typeof c !== 'string') return c;
    const trad = buscar(c, anotar);
    if (trad === undefined) return c;
    mudou = true;
    return trad;
  });
  return mudou ? out : filhos;
}

export function i18nElement(criar, type, props, a, b, c, d) {
  if (!dic || !props || (typeof type !== 'string' && type !== Fragment) || props.translate === 'no') {
    return criar(type, props, a, b, c, d);
  }
  let novo = props;
  const filhos = props.children;
  /* em <code>, <pre>, <textarea>… o conteúdo fica como está; os atributos (placeholder, title) são traduzidos */
  if (filhos !== undefined && filhos !== null && !NAO_TRADUZIR.has(type)) {
    const trad = traduzirFilhos(filhos);
    if (trad !== filhos) {
      novo = { ...props, children: trad };
      /* <option> sem value usa o texto como valor: a tradução não pode mudar o valor */
      if (type === 'option' && props.value === undefined && typeof filhos === 'string') novo.value = normalizar(filhos);
    }
  }
  if (typeof type === 'string') {
    for (const nome of ATRIBUTOS) {
      const v = props[nome];
      if (typeof v !== 'string') continue;
      const trad = buscar(v);
      if (trad === undefined) continue;
      if (novo === props) novo = { ...props };
      novo[nome] = trad;
    }
  }
  const el = criar(type, novo, a, b, c, d);
  if (novo !== props && typeof filhos === 'string') originais.set(el, filhos);
  return el;
}

/* os textos da própria biblioteca já vêm traduzidos */
registerMessages(LIB_MESSAGES);
