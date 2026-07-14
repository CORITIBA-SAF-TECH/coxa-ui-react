import { createContext, useCallback, useContext, useState } from 'react';

const SB_KEY = 'coxaui-sb';
const LayoutCtx = createContext(null);

/* Acesso ao estado da sidebar (collapsed/open/toggle/close) em qualquer descendente */
export function useSidebar() {
  return useContext(LayoutCtx);
}

/* Container raiz: <AppLayout><Sidebar/><SidebarToggle/><Overlay/><ContentCol/></AppLayout>
   No desktop a sidebar inicia recolhida por padrão; a preferência do usuário
   fica salva em localStorage ('coxaui-sb' — mesma chave do CoxaUI vanilla). */
export function AppLayout({ children, className = '', ...rest }) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined' || window.innerWidth <= 768) return false;
    return localStorage.getItem(SB_KEY) !== 'open';
  });
  const [open, setOpen] = useState(false); /* drawer mobile */

  const toggle = useCallback(() => {
    if (window.innerWidth <= 768) { setOpen(o => !o); return; }
    setCollapsed(c => {
      localStorage.setItem(SB_KEY, !c ? 'collapsed' : 'open');
      return !c;
    });
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <LayoutCtx.Provider value={{ collapsed, open, toggle, close }}>
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

export function Main({ children, className = '', ...rest }) {
  return <main className={`main ${className}`.trim()} {...rest}>{children}</main>;
}
