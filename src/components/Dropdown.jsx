import { useEffect, useRef, useState } from 'react';

/* Dropdown de ações:
   <Dropdown label="Ações" icon="dots-vertical">
     <DropdownItem icon="eye" onClick={...}>Visualizar</DropdownItem>
     <DropdownSep />
     <DropdownItem icon="trash" danger onClick={...}>Excluir</DropdownItem>
   </Dropdown> */
export function Dropdown({ label, icon = 'dots-vertical', variant = 'secondary', size = 'sm', children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const btnVar = variant === 'primary' ? 'btn-p' : 'btn-s';
  const btnSize = size ? `btn-${size}` : '';

  return (
    <div className="act-dd" ref={ref}>
      <button
        type="button"
        className={`btn ${btnVar} ${btnSize} act-dd-btn`.trim()}
        onClick={() => setOpen(o => !o)}
      >
        <i className={`ti ti-${icon}`} /> {label}
      </button>
      <div className={`act-dd-menu ${open ? 'open' : ''}`.trim()} onClick={() => setOpen(false)}>
        {children}
      </div>
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
