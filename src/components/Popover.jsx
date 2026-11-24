import { cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIsoLayoutEffect } from '../hooks/useSlideIndicator.js';

/* Painel flutuante com conteúdo livre (o Tooltip só mostra texto e o Dropdown só itens de menu).
   Abre no clique do gatilho; fecha com Esc ou clique fora. Clicar dentro não fecha.
   Renderizado num portal (position: fixed): não é cortado por containers com overflow.

   <Popover trigger={<Button variant="secondary" icon="filter">Filtros</Button>} title="Filtros">
     ...campos...
   </Popover>

   children pode ser uma função: ({ close }) => <Button onClick={close}>Aplicar</Button>
   align: left (padrão) | right | center. Controlado opcional: open + onOpenChange. */
export function Popover({
  trigger, title, icon, align = 'left', width, open: controlado, onOpenChange, className = '', children
}) {
  const [interno, setInterno] = useState(false);
  const open = controlado !== undefined ? controlado : interno;
  const [pos, setPos] = useState(null);
  const gatilho = useRef(null);
  const painel = useRef(null);

  function mudar(v) {
    if (controlado === undefined) setInterno(v);
    onOpenChange?.(v);
  }
  function fechar(focar) {
    mudar(false);
    if (focar) (gatilho.current?.querySelector('button, a, [tabindex]') || gatilho.current)?.focus?.();
  }

  function posicionar() {
    const g = gatilho.current?.getBoundingClientRect();
    const p = painel.current;
    if (!g || !p) return;
    const margem = 8, folga = 6;
    const w = p.offsetWidth, h = p.offsetHeight;
    let top = g.bottom + folga;
    if (top + h > window.innerHeight - margem) top = Math.max(margem, g.top - folga - h);
    let left = align === 'right' ? g.right - w : align === 'center' ? g.left + g.width / 2 - w / 2 : g.left;
    left = Math.max(margem, Math.min(left, window.innerWidth - w - margem));
    setPos({ top, left });
  }

  useIsoLayoutEffect(() => { if (open) posicionar(); else setPos(null); }, [open]);

  useEffect(() => {
    if (!open) return;
    painel.current?.focus?.();
    function fora(e) {
      if (gatilho.current?.contains(e.target) || painel.current?.contains(e.target)) return;
      mudar(false);
    }
    function tecla(e) { if (e.key === 'Escape') { e.stopPropagation(); fechar(true); } }
    document.addEventListener('mousedown', fora);
    document.addEventListener('keydown', tecla);
    window.addEventListener('resize', posicionar);
    window.addEventListener('scroll', posicionar, true);
    return () => {
      document.removeEventListener('mousedown', fora);
      document.removeEventListener('keydown', tecla);
      window.removeEventListener('resize', posicionar);
      window.removeEventListener('scroll', posicionar, true);
    };
  }, [open]);

  const botao = isValidElement(trigger)
    ? cloneElement(trigger, { 'aria-haspopup': 'dialog', 'aria-expanded': open })
    : trigger;

  return (
    <>
      <span ref={gatilho} className="pop-trg" onClick={() => mudar(!open)}>{botao}</span>
      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={painel}
          className={`pop ${className}`.trim()}
          role="dialog"
          aria-label={typeof title === 'string' ? title : undefined}
          tabIndex={-1}
          style={{ position: 'fixed', width, ...(pos || { top: -9999, left: 0, visibility: 'hidden' }) }}
        >
          {title && <div className="pop-title">{icon && <i className={`ti ti-${icon}`} aria-hidden="true" />} {title}</div>}
          {typeof children === 'function' ? children({ close: () => fechar(true) }) : children}
        </div>,
        document.body
      )}
    </>
  );
}
