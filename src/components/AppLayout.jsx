import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { LAYOUT_ATTR } from '../utils/motion.js';
import { useIsoLayoutEffect } from '../hooks/useSlideIndicator.js';

const SB_KEY = 'coxaui-sb';
const LayoutCtx = createContext(null);

/* localStorage pode estar bloqueado (modo privado, política do navegador):
   nesse caso a preferência só deixa de persistir. */
function lerSb() { try { return localStorage.getItem(SB_KEY); } catch { return null; } }
function gravarSb(v) { try { localStorage.setItem(SB_KEY, v); } catch { /* sem storage */ } }

/* Acesso ao estado da sidebar (collapsed/open/toggle/close) em qualquer descendente */
export function useSidebar() {
  return useContext(LayoutCtx);
}

/* O layout da biblioteca já vem ligado: não é preciso chamar nada, nem em telas sem
   <AppLayout> (login, erro). Este hook só existe para escolher outro layout em <html>:
     useCoxaLayout('classic');   → mantém o visual da 1.1
   Sem argumento não faz nada.
   Para não haver troca visual na primeira pintura, o atributo também pode ir fixo no
   index.html: <html data-coxa-layout="classic">. */
export function useCoxaLayout(layout) {
  useIsoLayoutEffect(() => {
    if (!layout) return;
    const root = document.documentElement;
    const antes = root.getAttribute(LAYOUT_ATTR);
    root.setAttribute(LAYOUT_ATTR, layout);
    return () => {
      if (antes == null) root.removeAttribute(LAYOUT_ATTR);
      else root.setAttribute(LAYOUT_ATTR, antes);
    };
  }, [layout]);
}

/* Container raiz: <AppLayout><Sidebar/><SidebarToggle/><Overlay/><ContentCol/></AppLayout>
   No desktop a sidebar inicia recolhida por padrão; a preferência do usuário
   fica salva em localStorage (chave 'coxaui-sb').
   Não é preciso passar layout: o layout da biblioteca é o padrão.
   layout="classic" mantém o visual da 1.1 (para um app que ainda não pode mudar). */
export function AppLayout({ children, className = '', layout, ...rest }) {
  useCoxaLayout(layout);

  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined' || window.innerWidth <= 768) return false;
    return lerSb() !== 'open';
  });
  const [open, setOpen] = useState(false); /* drawer mobile */

  const toggle = useCallback(() => {
    if (window.innerWidth <= 768) { setOpen(o => !o); return; }
    setCollapsed(c => {
      gravarSb(!c ? 'collapsed' : 'open');
      return !c;
    });
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <LayoutCtx.Provider value={{ collapsed, open, toggle, close, layout: layout || null }}>
      <div className={`app-layout ${className}`.trim()} {...rest}>{children}</div>
    </LayoutCtx.Provider>
  );
}

/* Coluna de conteúdo (header + main + footer) */
export function ContentCol({ children, className = '', ...rest }) {
  return <div className={`content-col ${className}`.trim()} {...rest}>{children}</div>;
}

/* Fundo escurecido do drawer mobile */
export function Overlay() {
  const sb = useSidebar();
  return <div className={`overlay ${sb?.open ? 'open' : ''}`.trim()} onClick={sb?.close} />;
}

/* Área de conteúdo rolável. Aceita ref.
   Marca a <ContentCol> com data-scrolled quando há rolagem, para o cabeçalho
   ganhar sombra (no layout clássico o atributo não tem efeito). */
export const Main = forwardRef(function Main({ children, className = '', ...rest }, ref) {
  const interno = useRef(null);

  useEffect(() => {
    const el = interno.current;
    const col = el?.closest('.content-col');
    if (!el || !col) return;
    let rolado = null;
    const marcar = () => {
      const agora = el.scrollTop > 4;
      if (agora === rolado) return;
      rolado = agora;
      col.toggleAttribute('data-scrolled', agora);
    };
    el.addEventListener('scroll', marcar, { passive: true });
    marcar();
    return () => {
      el.removeEventListener('scroll', marcar);
      col.removeAttribute('data-scrolled');
    };
  }, []);

  const juntar = no => {
    interno.current = no;
    if (typeof ref === 'function') ref(no);
    else if (ref) ref.current = no;
  };
  return <main ref={juntar} className={`main ${className}`.trim()} {...rest}>{children}</main>;
});
