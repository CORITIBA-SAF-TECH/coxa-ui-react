import { flushSync } from 'react-dom';

/* Atributo em <html> que escolhe o layout. Sem ele, vale o layout da
   biblioteca: não é preciso ligar nada. Só "classic" muda algo: mantém o visual da 1.1. */
export const LAYOUT_ATTR = 'data-coxa-layout';
export const LAYOUT_CLASSIC = 'classic';

export function getCoxaLayout() {
  return typeof document === 'undefined' ? null : document.documentElement.getAttribute(LAYOUT_ATTR);
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* Animações ligadas, a não ser no layout clássico ou para quem pediu menos movimento no sistema */
export function motionOn() {
  return getCoxaLayout() !== LAYOUT_CLASSIC && !prefersReducedMotion();
}

let emCurso = 0;

/* Troca de tela animada com a View Transitions API do navegador.
     viewTransition(() => setTela('titulos'));
     viewTransition(() => navigate('/titulos'));
   No layout clássico, sem suporte do navegador ou com "reduzir movimento"
   ligado, só executa a atualização. */
export function viewTransition(update) {
  if (typeof document === 'undefined' || typeof document.startViewTransition !== 'function' || !motionOn()) {
    update();
    return;
  }
  const root = document.documentElement;
  emCurso += 1;
  root.classList.add('cx-vt');
  const vt = document.startViewTransition(() => { flushSync(update); });
  vt.ready.catch(() => {});
  vt.finished.catch(() => {}).then(() => {
    emCurso -= 1;
    if (emCurso <= 0) { emCurso = 0; root.classList.remove('cx-vt'); }
  });
}

/* Troca de tema com revelação circular a partir de um elemento (o botão).
   `apply` precisa alterar o DOM de forma síncrona. */
export function themeReveal(el, apply) {
  if (!el || typeof document.startViewTransition !== 'function' || !motionOn()) {
    apply();
    return;
  }
  const root = document.documentElement;
  const r = el.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const raio = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  root.classList.add('cx-theming');
  const vt = document.startViewTransition(apply);
  vt.ready.then(() => root.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${raio}px at ${x}px ${y}px)`] },
    { duration: 560, easing: 'cubic-bezier(.22, 1, .36, 1)', pseudoElement: '::view-transition-new(root)' }
  )).catch(() => {});
  vt.finished.catch(() => {}).then(() => root.classList.remove('cx-theming'));
}
