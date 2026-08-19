import { useEffect, useRef } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* Comportamento comum de overlays (Modal, Drawer):
   - fecha com Esc
   - prende o foco dentro do container (focus trap com Tab/Shift+Tab)
   - trava o scroll do body enquanto aberto
   - devolve o foco ao elemento anterior ao fechar
   Retorna um ref para anexar ao container do conteúdo. */
export function useOverlay(open, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    const prevActive = document.activeElement;
    const list = () => (el ? Array.from(el.querySelectorAll(FOCUSABLE)) : []);

    const first = list()[0];
    (first || el)?.focus?.();

    function onKey(e) {
      if (e.key === 'Escape') { onClose?.(); return; }
      if (e.key !== 'Tab') return;
      const f = list();
      if (!f.length) return;
      const idx = f.indexOf(document.activeElement);
      if (e.shiftKey && idx <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && idx === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (prevActive && prevActive.focus) prevActive.focus();
    };
  }, [open, onClose]);
  return ref;
}
