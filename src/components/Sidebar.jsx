import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSidebar } from './AppLayout.jsx';
import { useSlideIndicator, useIsoLayoutEffect } from '../hooks/useSlideIndicator.js';
import { motionOn } from '../utils/motion.js';

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

/* Botão recolher/expandir: círculo flutuante na borda.
   Irmão direto da <Sidebar>, logo após ela. */
export function SidebarToggle({ title = 'Recolher menu' }) {
  const sb = useSidebar();
  return (
    <button className="sb-toggle-btn" onClick={sb?.toggle} title={title} type="button">
      <i className="ti ti-chevron-left" />
    </button>
  );
}

/* Rodapé da sidebar: botão "voltar ao portal" fixo na base.
   Deve ficar DENTRO da <Sidebar>, após o <SidebarScroll>. */
export function SidebarFooter({ portalUrl = '#', portalLabel = 'Voltar ao portal', onPortalClick }) {
  const sb = useSidebar();
  const collapsed = sb?.collapsed;
  return (
    <div className="sb-footer">
      <a className="sb-foot-btn sb-foot-back" href={portalUrl} onClick={onPortalClick} title={collapsed ? portalLabel : undefined}>
        <i className="ti ti-arrow-back-up" /><span>{portalLabel}</span>
      </a>
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

/* Rola `box` só o necessário para `el` ficar à vista, com uma folga em cima e embaixo
   (assim aparecem também os itens vizinhos). Não mexe em mais nada da página. */
function revelar(box, el, suave) {
  const c = box.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  if (!c.height) return;
  const folga = Math.min(96, Math.max(0, (c.height - r.height) / 2));
  let delta = 0;
  if (r.top < c.top + folga) delta = r.top - c.top - folga;
  else if (r.bottom > c.bottom - folga) delta = r.bottom - c.bottom + folga;
  if (Math.abs(delta) < 1) return;
  const top = box.scrollTop + delta;
  if (suave && typeof box.scrollTo === 'function') box.scrollTo({ top, behavior: 'smooth' });
  else box.scrollTop = top;
}

/* O menu acompanha o item ativo: quando o link ativo muda (navegação, ou a página rolando
   num menu de seções), a lista rola para ele continuar à vista. Só age quando o item ativo
   troca; quem rola o menu à mão não é puxado de volta. */
function useFollowActive(boxRef, selector) {
  useIsoLayoutEffect(() => {
    const box = boxRef.current;
    if (!box || typeof MutationObserver === 'undefined') return;
    let ultimo = null;
    const checar = () => {
      const a = box.querySelector(selector);
      if (!a) { ultimo = null; return; }
      if (a === ultimo || !a.offsetParent) return;
      revelar(box, a, ultimo !== null && motionOn());   /* a primeira vez vai direto, sem animar */
      ultimo = a;
    };
    checar();
    const mo = new MutationObserver(checar);
    mo.observe(box, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
    /* o menu pode nascer escondido (sem altura): confere de novo quando ganhar tamanho */
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(checar);
    ro?.observe(box);
    return () => { mo.disconnect(); ro?.disconnect(); };
  }, [boxRef, selector]);
}

/* Lista rolável de links. O <span className="sb-ind"> é o indicador deslizante
   do item ativo: não aparece no layout clássico (fica oculto pelo CSS).
   A lista rola sozinha para manter o link ativo à vista. */
export function SidebarScroll({ children }) {
  const box = useRef(null);
  const nav = useRef(null);
  const ind = useRef(null);
  useSlideIndicator(nav, ind, '.sb-lnk.active', 'y');
  useFollowActive(box, '.sb-lnk.active');
  return (
    <div className="sb-scroll" ref={box}>
      <div className="sb-nav" ref={nav}>
        <span className="sb-ind" ref={ind} aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

export function SidebarGroup({ children }) {
  return <div className="sb-grp-lbl">{children}</div>;
}

/* Link de navegação. Com a sidebar recolhida, mostra tooltip flutuante
   no hover (portal no body: não é cortado pelo overflow). */
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
