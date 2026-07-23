import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSidebar } from './AppLayout.jsx';

/* Sidebar padrão CoxaUI. Deve vir seguida de <SidebarToggle/> (irmão direto)
   para o botão circular flutuante funcionar. */
export function Sidebar({ children, className = '', ...rest }) {
  const sb = useSidebar();
  const cls = [
    'sidebar',
    sb?.collapsed ? 'collapsed' : '',
    sb?.open ? 'open' : '',
    className
  ].filter(Boolean).join(' ');
  return <aside id="sidebar" className={cls} {...rest}>{children}</aside>;
}

/* Rodapé da sidebar: dois botões empilhados sempre na base.
   Acima: voltar ao portal. Abaixo: recolher/expandir a sidebar.
   Deve ficar DENTRO da <Sidebar>, após o <SidebarScroll>. */
export function SidebarFooter({
  portalUrl = '#',
  portalLabel = 'Voltar ao portal',
  onPortalClick,
  toggleLabel
}) {
  const sb = useSidebar();
  const collapsed = sb?.collapsed;
  return (
    <div className="sb-footer">
      <a className="sb-foot-btn sb-foot-back" href={portalUrl} onClick={onPortalClick} title={collapsed ? portalLabel : undefined}>
        <i className="ti ti-arrow-back-up" /><span>{portalLabel}</span>
      </a>
      <button
        className="sb-foot-btn sb-foot-toggle"
        type="button"
        onClick={sb?.toggle}
        title={toggleLabel || (collapsed ? 'Expandir menu' : 'Recolher menu')}
      >
        <i className="ti ti-chevrons-left" /><span>Recolher menu</span>
      </button>
    </div>
  );
}

/* Cabeçalho do drawer mobile (título + botão fechar) */
export function SidebarHeader({ title = 'Menu' }) {
  const sb = useSidebar();
  return (
    <div className="sb-hdr">
      <span>{title}</span>
      <button className="sb-close" onClick={sb?.close} type="button"><i className="ti ti-x" /></button>
    </div>
  );
}

/* Logo + subtítulo. 100px expandida / 50px recolhida (via CSS) */
export function SidebarBrand({ logo, alt = 'Logo', subtitle, href = '/', round = true }) {
  return (
    <div className="sb-brand">
      <a href={href} className="sb-brand-lnk">
        <img src={logo} alt={alt} style={round ? { borderRadius: '50%' } : undefined} />
        {subtitle && (
          <div className="sb-brand-txt">
            <span className="sb-brand-docs">{subtitle}</span>
          </div>
        )}
      </a>
    </div>
  );
}

export function SidebarScroll({ children }) {
  return <div className="sb-scroll"><div className="sb-nav">{children}</div></div>;
}

export function SidebarGroup({ children }) {
  return <div className="sb-grp-lbl">{children}</div>;
}

/* Link de navegação. Com a sidebar recolhida, mostra tooltip flutuante
   no hover (portal no body — não é cortado pelo overflow). */
export function SidebarLink({ icon, label, badge, active, href = '#', onClick, ...rest }) {
  const sb = useSidebar();
  const ref = useRef(null);
  const [tip, setTip] = useState(null);

  function showTip() {
    if (!sb?.collapsed || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTip({ left: r.right + 12, top: r.top + r.height / 2 });
  }

  return (
    <>
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={`sb-lnk ${active ? 'active' : ''}`.trim()}
        onMouseEnter={showTip}
        onMouseLeave={() => setTip(null)}
        {...rest}
      >
        {icon && <i className={`ti ti-${icon}`} />}
        <span>{label}</span>
        {badge != null && <span className="sb-badge">{badge}</span>}
      </a>
      {tip && createPortal(
        <div className="sb-tooltip show" style={{ left: tip.left, top: tip.top }}>{label}</div>,
        document.body
      )}
    </>
  );
}
