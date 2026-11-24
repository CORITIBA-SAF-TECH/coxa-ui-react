import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOverlay } from '../hooks/useOverlay.js';
import { useIsoLayoutEffect } from '../hooks/useSlideIndicator.js';

/* Painel lateral deslizante (offcanvas). Controlado: open + onClose.
   Fecha ao clicar no overlay ou com Esc; prende o foco enquanto aberto.
   <Drawer open={x} onClose={...} title="Detalhes" icon="user"
     actions={<><Button variant="secondary" onClick={fechar}>Fechar</Button></>}>
     ...conteúdo...
   </Drawer>
   side: 'right' (padrão) | 'left' */
export function Drawer({ open, onClose, title, icon, side = 'right', width, actions, children }) {
  const ref = useOverlay(open, onClose);
  /* fechado, o drawer continua no DOM (para a transição): inert o tira da ordem de Tab */
  const ov = useRef(null);
  useIsoLayoutEffect(() => { if (ov.current) ov.current.inert = !open; }, [open]);
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div
      ref={ov}
      className={`drawer-overlay ${open ? 'open' : ''}`.trim()}
      onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <aside
        ref={ref}
        className={`drawer drawer-${side} ${open ? 'open' : ''}`.trim()}
        style={width ? { width } : undefined}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        tabIndex={-1}
      >
        <div className="drawer-hdr">
          <h2>{icon && <i className={`ti ti-${icon}`} />} {title}</h2>
          <button className="drawer-close" type="button" onClick={onClose} aria-label="Fechar">
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
        {actions && <div className="drawer-ftr">{actions}</div>}
      </aside>
    </div>,
    document.body
  );
}
