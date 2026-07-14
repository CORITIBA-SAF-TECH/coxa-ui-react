import { useEffect, useState } from 'react';
import { useSidebar } from './AppLayout.jsx';
import { useDarkMode } from '../hooks/useDarkMode.js';

export function Header({ children, className = '', ...rest }) {
  return <header className={className || undefined} {...rest}>{children}</header>;
}

/* Botão hambúrguer — visível só no mobile (CSS) */
export function MenuButton() {
  const sb = useSidebar();
  return (
    <button className="menu-btn" onClick={sb?.toggle} type="button">
      <i className="ti ti-menu-2" />
    </button>
  );
}

/* Título da página no header (ícone + título + descrição) */
export function HeaderPage({ icon, title, desc }) {
  return (
    <div className="hdr-page">
      {icon && <i className={`ti ti-${icon}`} />}
      <div className="hdr-page-txt">
        <span className="hdr-page-title">{title}</span>
        {desc && <span className="hdr-page-desc">{desc}</span>}
      </div>
    </div>
  );
}

export function HeaderRight({ children }) {
  return <div className="hdr-right">{children}</div>;
}

/* Botão de alternar modo escuro (lua/sol) */
export function DarkModeButton() {
  const { dark, toggle } = useDarkMode();
  return (
    <button className="icon-btn" onClick={toggle} type="button" title="Alternar modo escuro">
      <i className={`ti ${dark ? 'ti-sun' : 'ti-moon'}`} />
    </button>
  );
}

/* Relógio ao vivo (HH:MM:SS) */
export function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const p = n => String(n).padStart(2, '0');
  return <span className="hdr-clock">{p(now.getHours())}:{p(now.getMinutes())}:{p(now.getSeconds())}</span>;
}

/* Footer com três zonas */
export function Footer({ left, center, right }) {
  return (
    <footer>
      {left && <span className="ftr-l">{left}</span>}
      {center && <span className="ftr-c">{center}</span>}
      {right && <span className="ftr-r">{right}</span>}
    </footer>
  );
}
