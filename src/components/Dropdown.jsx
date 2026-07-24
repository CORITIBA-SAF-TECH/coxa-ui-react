import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* Dropdown de ações. O menu é renderizado num portal (position: fixed),
   então nunca é cortado por containers com overflow (ex.: .tbl-wrap).
   Alinha pela direita do botão por padrão (align="left" alinha pela esquerda)
   e sobe automaticamente se não houver espaço abaixo.

   <Dropdown label="Ações" icon="dots-vertical">
     <DropdownItem icon="eye" onClick={...}>Visualizar</DropdownItem>
     <DropdownSep />
     <DropdownItem icon="trash" danger onClick={...}>Excluir</DropdownItem>
   </Dropdown> */
export function Dropdown({ label, icon = 'dots-vertical', variant = 'secondary', size = 'sm', align = 'right', children }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  function place() {
    const b = btnRef.current?.getBoundingClientRect();
    if (!b) return;
    const gap = 3;
    const menuH = menuRef.current?.offsetHeight || 0;
    let top = b.bottom + gap;
    if (menuH && top + menuH > window.innerHeight - 8) {
      top = Math.max(8, b.top - gap - menuH);   /* sobe se não couber embaixo */
    }
    const style = { position: 'fixed', top };
    if (align === 'left') style.left = b.left;
    else style.right = Math.max(8, window.innerWidth - b.right);
    setPos(style);
  }

  useLayoutEffect(() => {
    if (open) place();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) {
      if (btnRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    function reposition() { place(); }
    document.addEventListener('click', onDoc);
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    return () => {
      document.removeEventListener('click', onDoc);
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    };
  }, [open]);

  const btnVar = variant === 'primary' ? 'btn-p' : 'btn-s';
  const btnSize = size ? `btn-${size}` : '';

  return (
    <div className="act-dd">
      <button
        ref={btnRef}
        type="button"
        className={`btn ${btnVar} ${btnSize} act-dd-btn`.trim()}
        onClick={() => setOpen(o => !o)}
      >
        <i className={`ti ti-${icon}`} /> {label}
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          className="act-dd-menu open"
          style={pos || { position: 'fixed', top: -9999, visibility: 'hidden' }}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>,
        document.body
      )}
    </div>
  );
}

export function DropdownItem({ icon, danger, href, onClick, children }) {
  const cls = `act-dd-item ${danger ? 'danger' : ''}`.trim();
  if (href) {
    return <a href={href} className={cls} onClick={onClick}>{icon && <i className={`ti ti-${icon}`} />} {children}</a>;
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {icon && <i className={`ti ti-${icon}`} />} {children}
    </button>
  );
}

export function DropdownSep() {
  return <div className="act-dd-sep" />;
}
