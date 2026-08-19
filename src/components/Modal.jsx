import { createPortal } from 'react-dom';
import { useOverlay } from '../hooks/useOverlay.js';

const SIZES = { xs: 'modal-xs', sm: 'modal-sm', lg: 'modal-lg', xl: 'modal-xl', full: 'modal-full' };

/* <Modal open={aberto} onClose={...} title="Registrar Saída" icon="logout" size="lg"
     actions={<><Button variant="secondary" onClick={fechar}>Cancelar</Button>...</>}>
   Fecha ao clicar no overlay ou com Esc; prende o foco enquanto aberto.
   Tamanhos: xs | sm | (padrão 480px) | lg | xl | full */
export function Modal({ open, onClose, title, icon, size, actions, children }) {
  const ref = useOverlay(open, onClose);
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div
      className={`modal-overlay ${open ? 'open' : ''}`.trim()}
      onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        ref={ref}
        className={`modal-box ${SIZES[size] || ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        tabIndex={-1}
      >
        {title && (
          <div className="modal-title">
            {icon && <i className={`ti ti-${icon}`} />} {title}
            <button className="modal-close" onClick={onClose} type="button" aria-label="Fechar"><i className="ti ti-x" /></button>
          </div>
        )}
        {children}
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>,
    document.body
  );
}

export function ModalInfo({ children }) {
  return <div className="modal-info">{children}</div>;
}
