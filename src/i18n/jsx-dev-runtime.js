/* O mesmo que jsx-runtime.js, para o modo de desenvolvimento (jsxDEV). */
import { jsxDEV as criarJsxDEV, Fragment } from 'react/jsx-dev-runtime';
import { i18nElement } from './core.js';

export { Fragment };
export const jsxDEV = (type, props, key, estatico, origem, self) => i18nElement(criarJsxDEV, type, props, key, estatico, origem, self);
