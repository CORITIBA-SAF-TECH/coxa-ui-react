/* Runtime de JSX usado dentro da biblioteca (e do playground): igual ao do React,
   mas cada elemento HTML passa pela tradução antes de ser criado. É isto que faz
   os componentes traduzirem o que desenham sem código de tradução em cada um. */
import { jsx as criarJsx, jsxs as criarJsxs, Fragment } from 'react/jsx-runtime';
import { i18nElement } from './core.js';

export { Fragment };
export const jsx = (type, props, key) => i18nElement(criarJsx, type, props, key);
export const jsxs = (type, props, key) => i18nElement(criarJsxs, type, props, key);
