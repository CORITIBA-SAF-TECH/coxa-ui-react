import { useEffect, useLayoutEffect } from 'react';
import { LAYOUT_ATTR } from '../utils/motion.js';

export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* Indicador deslizante (menu lateral e abas) do layout da 1.2.
   Mede o item ativo dentro de `boxRef` e escreve a posição em variáveis CSS
   no elemento `indRef`; o movimento em si é uma transição de transform.
   Marca o container com data-ind quando há item ativo medido, para o CSS
   só esconder o fundo do item ativo quando o indicador está de fato no lugar. */
export function useSlideIndicator(boxRef, indRef, selector, axis = 'y') {
  useIsoLayoutEffect(() => {
    const box = boxRef.current;
    const ind = indRef.current;
    if (!box || !ind || typeof ResizeObserver === 'undefined' || typeof MutationObserver === 'undefined') return;

    let raf = 0;
    const place = () => {
      const a = box.querySelector(selector);
      if (!a || !a.offsetParent) { box.removeAttribute('data-ind'); return; }
      if (axis === 'y') {
        ind.style.setProperty('--y', a.offsetTop + 'px');
        ind.style.height = a.offsetHeight + 'px';
      } else {
        ind.style.setProperty('--x', a.offsetLeft + 'px');
        ind.style.width = a.offsetWidth + 'px';
      }
      box.setAttribute('data-ind', '');
      /* a primeira posição não anima; as seguintes, sim */
      if (!raf) raf = requestAnimationFrame(() => ind.classList.add('ready'));
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(box);
    const mo = new MutationObserver(place);
    mo.observe(box, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
    const lo = new MutationObserver(place);
    lo.observe(document.documentElement, { attributes: true, attributeFilter: [LAYOUT_ATTR] });

    return () => {
      ro.disconnect(); mo.disconnect(); lo.disconnect();
      cancelAnimationFrame(raf);
      ind.classList.remove('ready');
      box.removeAttribute('data-ind');
    };
  }, [boxRef, indRef, selector, axis]);
}
