import { useCallback, useEffect, useRef, useState } from 'react';
import { themeReveal } from '../utils/motion.js';

const DARK_KEY = 'coxaui-dark';
const EVENTO = 'coxa:dark';

/* localStorage pode estar bloqueado: nesse caso a preferência só não persiste */
function lerDark() { try { return localStorage.getItem(DARK_KEY) === '1'; } catch { return false; } }
function gravarDark(v) { try { localStorage.setItem(DARK_KEY, v ? '1' : '0'); } catch { /* sem storage */ } }

/* Modo escuro com persistência em localStorage (chave 'coxaui-dark': a preferência
   vale para todos os sistemas do clube abertos no mesmo navegador e domínio).
   Todas as instâncias do hook ficam sincronizadas entre si.
   toggle() aceita, opcionalmente, o elemento (ou o evento de clique) de onde
   partiu a troca: o tema novo se revela em círculo a partir dele. */
export function useDarkMode() {
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && lerDark());
  const atual = useRef(dark);
  atual.current = dark;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    gravarDark(dark);
    window.dispatchEvent(new Event(EVENTO));
  }, [dark]);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains('dark'));
    window.addEventListener(EVENTO, sync);
    return () => window.removeEventListener(EVENTO, sync);
  }, []);

  const toggle = useCallback(origem => {
    const novo = !atual.current;
    const el = origem && origem.currentTarget instanceof Element ? origem.currentTarget
      : origem instanceof Element ? origem : null;
    if (!el) { setDark(novo); return; }
    themeReveal(el, () => {
      document.documentElement.classList.toggle('dark', novo);
      setDark(novo);
    });
  }, []);

  return { dark, toggle, setDark };
}
