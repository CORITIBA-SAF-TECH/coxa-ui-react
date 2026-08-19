import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* Dropdown de ações. O menu é renderizado num portal (position: fixed),
   então nunca é cortado por containers com overflow (ex.: .tbl-wrap).
   Acessível: aria-haspopup/expanded, role menu/menuitem, navegação por
   teclado (Esc fecha, ↑/↓ movem o foco entre itens). Alinha pela direita
   por padrão (align="left" alinha pela esquerda) e sobe se faltar espaço.

   Trigger padrão é um botão; passe `trigger` para um gatilho customizado
   (ex.: avatar do usuário): usado pelo <UserMenu>.

   <Dropdown label="Ações" icon="dots-vertical">
     <DropdownItem icon="eye" onClick={...}>Visualizar</DropdownItem>
     <DropdownSep />
     <DropdownItem icon="trash" danger onClick={...}>Excluir</DropdownItem>
   </Dropdown> */
export function Dropdown({ label, icon = 'dots-vertical', variant = 'secondary', size = 'sm', align = 'right', trigger, children }) {
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
    if (menuH && top + menuH > window.innerHeight - 8) top = Math.max(8, b.top - gap - menuH);
    const style = { position: 'fixed', top };
    if (align === 'left') style.left = b.left;
    else style.right = Math.max(8, window.innerWidth - b.right);
    setPos(style);
  }

  useLayoutEffect(() => { if (open) place(); }, [open]);

  useEffect(() => {
    if (!open) return;
    /* foca o primeiro item ao abrir */
    const items = menuRef.current?.querySelectorAll('.act-dd-item');
    items && items[0]?.focus();
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

  function close(focusBtn) {
    setOpen(false);
    if (focusBtn) {
      const t = btnRef.current?.querySelector('button, [tabindex]') || btnRef.current;
      t?.focus?.();
    }
  }

  function onMenuKey(e) {
    const items = Array.from(menuRef.current?.querySelectorAll('.act-dd-item') || []);
    if (!items.length) return;
    const idx = items.indexOf(document.activeElement);
    if (e.key === 'Escape') { e.preventDefault(); close(true); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); items[Math.min(idx + 1, items.length - 1)]?.focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[Math.max(idx - 1, 0)]?.focus(); }
    else if (e.key === 'Home') { e.preventDefault(); items[0]?.focus(); }
    else if (e.key === 'End') { e.preventDefault(); items[items.length - 1]?.focus(); }
  }

  const btnVar = variant === 'primary' ? 'btn-p' : 'btn-s';
  const btnSize = size ? `btn-${size}` : '';

  return (
    <div className="act-dd">
      <span
        ref={btnRef}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => { if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) { e.preventDefault(); setOpen(true); } }}
        style={trigger ? { display: 'inline-flex' } : undefined}
      >
        {trigger || (
          <button type="button" className={`btn ${btnVar} ${btnSize} act-dd-btn`.trim()} aria-haspopup="menu" aria-expanded={open}>
            <i className={`ti ti-${icon}`} /> {label}
          </button>
        )}
      </span>
      {open && createPortal(
        <div
          ref={menuRef}
          className="act-dd-menu open"
          role="menu"
          onKeyDown={onMenuKey}
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
    return <a href={href} className={cls} role="menuitem" onClick={onClick}>{icon && <i className={`ti ti-${icon}`} />} {children}</a>;
  }
  return (
    <button type="button" className={cls} role="menuitem" onClick={onClick}>
      {icon && <i className={`ti ti-${icon}`} />} {children}
    </button>
  );
}

export function DropdownSep() {
  return <div className="act-dd-sep" role="separator" />;
}
