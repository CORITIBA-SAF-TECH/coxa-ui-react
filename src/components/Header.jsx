import { useEffect, useState } from 'react';
import { useSidebar } from './AppLayout.jsx';
import { useDarkMode } from '../hooks/useDarkMode.js';
import { t } from '../i18n/core.js';

export function Header({ children, className = '', ...rest }) {
  return <header className={className || undefined} {...rest}>{children}</header>;
}

/* Botão hambúrguer: visível só no mobile (CSS) */
export function MenuButton() {
  const sb = useSidebar();
  return (
    <button className="menu-btn" onClick={sb?.toggle} type="button" aria-label="Abrir menu">
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

/* Botão de busca global: abre a <CommandPalette>.
   const cmd = useCommandPalette();
   <HeaderSearch onClick={cmd.show} />
   Fica entre o <HeaderPage> e o <HeaderRight>. No celular vira só a lupa. */
export function HeaderSearch({ onClick, placeholder = 'Buscar ou ir para…', shortcut = 'Ctrl K' }) {
  return (
    <button className="hdr-search" type="button" onClick={onClick} aria-label={`${t(placeholder)} (${shortcut})`}>
      <i className="ti ti-search" />
      <span>{placeholder}</span>
      {shortcut && <kbd className="cx-kbd">{shortcut}</kbd>}
    </button>
  );
}

/* Selo de ambiente, para ninguém operar no lugar errado.
   <EnvBadge>Staging</EnvBadge>     color: orange (padrão) | green | blue | gray
   Em produção, o usual é não renderizar o selo. */
export function EnvBadge({ color = 'orange', title, children }) {
  return <span className={`env-badge ${color === 'orange' ? '' : color}`.trim()} title={title}>{children}</span>;
}

/* Botão de alternar modo escuro (lua/sol).
   A troca é uma revelação circular a partir do botão (no layout clássico, é direta). */
export function DarkModeButton() {
  const { dark, toggle } = useDarkMode();
  return (
    <button className="icon-btn" onClick={e => toggle(e.currentTarget)} type="button" title="Alternar modo escuro" aria-label="Alternar modo escuro" aria-pressed={dark}>
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

/* Footer padrão:
     ESQUERDA → nome do sistema, versão e commit   (props system, version, commit)
     DIREITA  → copyright                          (prop copyright; right acrescenta conteúdo depois dele)
     CENTRO   → vazio. Só aparece algo se a prop center for passada.
   left sobrescreve a zona esquerda inteira quando necessário.

   Na zona esquerda:
     commit="a1b2c3d"   → hash do commit do GitHub, em monoespaçado, depois da versão
     env="DEV"          → selo antes do nome (DEV, Staging…); não passe em produção
     systemHref / onSystemClick → o nome do sistema vira link (ex.: histórico de versões);
                          com onSystemClick o clique não recarrega a página (use o router)

   Até a 1.1 o copyright ficava no centro; na 1.2 ele foi para a direita. */
export function Footer({ system, version, commit, env, systemHref, onSystemClick, copyright, right, left, center }) {
  let leftZone = left;
  if (leftZone == null && (system || version || commit || env)) {
    const nome = system && (systemHref || onSystemClick)
      ? (
        <a className="ftr-sys" href={systemHref || '#'}
          onClick={onSystemClick ? e => { e.preventDefault(); onSystemClick(e); } : undefined}>{system}</a>
      )
      : system;
    leftZone = (
      <>
        {env && <span className="ftr-env">{env}</span>}
        {nome}{system && version ? ' ' : ''}
        {version && <span data-coxaui-ver>v{version}</span>}
        {commit && <span className="ftr-commit" title="Commit desta versão">{commit}</span>}
      </>
    );
  }
  return (
    <footer>
      <span className="ftr-l">{leftZone}</span>
      {center != null && <span className="ftr-c">{center}</span>}
      <span className="ftr-r">
        {copyright}
        {right != null && right !== false && <span className="ftr-extra">{right}</span>}
      </span>
    </footer>
  );
}
