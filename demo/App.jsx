import { useEffect, useRef, useState } from 'react';
import {
  AppLayout, ContentCol, Overlay,
  Sidebar, SidebarToggle, SidebarHeader, SidebarBrand, SidebarScroll, SidebarGroup, SidebarLink,
  MenuButton, DarkModeButton, IconButton, Footer,
  COXAUI_REACT_VERSION
} from '../src/index.js';
import './docs.css';
import logo from '../logo.png';

import { SecInstalacao, SecCores, SecIcones } from './sections/Fundamentos.jsx';
import {
  SecBotoes, SecBadges, SecAlertas, SecFormularios,
  SecCards, SecStatCards, SecModal, SecTabs, SecAccordion, SecDropdown, SecAvatar
} from './sections/Componentes.jsx';
import {
  SecGraficos, SecBreadcrumb, SecFilterPills, SecProgress,
  SecTimeline, SecKV, SecEmpty, SecSpinner, SecApi
} from './sections/Padroes.jsx';

const TOC = [
  { grupo: null, links: [{ id: 'instalacao', icon: 'download', label: 'Instalação' }] },
  {
    grupo: 'Fundamentos', links: [
      { id: 'cores', icon: 'droplet', label: 'Cores & Variáveis' },
      { id: 'icones', icon: 'icons', label: 'Ícones' }
    ]
  },
  {
    grupo: 'Componentes', links: [
      { id: 'botoes', icon: 'pointer', label: 'Botões' },
      { id: 'badges', icon: 'tag', label: 'Badges & Tags' },
      { id: 'alertas', icon: 'alert-circle', label: 'Alertas' },
      { id: 'formularios', icon: 'forms', label: 'Formulários' },
      { id: 'cards', icon: 'layout-cards', label: 'Cards' },
      { id: 'stat-cards', icon: 'chart-bar', label: 'Stat Cards' },
      { id: 'modal', icon: 'square', label: 'Modal' },
      { id: 'tabs', icon: 'layout-columns', label: 'Abas (Tabs)' },
      { id: 'accordion', icon: 'list-details', label: 'Accordion' },
      { id: 'dropdown', icon: 'chevron-down', label: 'Dropdown' },
      { id: 'avatar', icon: 'user-circle', label: 'Avatar' }
    ]
  },
  {
    grupo: 'Padrões', links: [
      { id: 'graficos', icon: 'chart-line', label: 'Gráficos' },
      { id: 'breadcrumb', icon: 'direction', label: 'Breadcrumb' },
      { id: 'filter-pills', icon: 'filter', label: 'Filter Pills' },
      { id: 'progress', icon: 'trending-up', label: 'Progresso' },
      { id: 'timeline', icon: 'timeline', label: 'Timeline' },
      { id: 'kv', icon: 'list', label: 'Chave / Valor' },
      { id: 'empty', icon: 'ghost', label: 'Estado Vazio' },
      { id: 'spinner', icon: 'loader-2', label: 'Spinner' }
    ]
  },
  { grupo: 'JavaScript', links: [{ id: 'api', icon: 'code', label: 'Hooks & Utils' }] }
];

export default function App() {
  const mainRef = useRef(null);
  const [ativo, setAtivo] = useState('instalacao');

  /* Scroll spy: destaca o link da seção visível conforme a rolagem */
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    function onScroll() {
      const top = el.getBoundingClientRect().top;
      let atual = 'instalacao';
      el.querySelectorAll('.docs-section[id]').forEach(s => {
        if (s.getBoundingClientRect().top - top <= 80) atual = s.id;
      });
      setAtivo(atual);
    }
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AppLayout>
      <Sidebar>
        <SidebarHeader />
        <SidebarBrand logo={logo} subtitle={`design system · v${COXAUI_REACT_VERSION}`} href="#instalacao" />
        <SidebarScroll>
          {TOC.map((g, i) => (
            <span key={i} style={{ display: 'contents' }}>
              {g.grupo && <SidebarGroup>{g.grupo}</SidebarGroup>}
              {g.links.map(l => (
                <SidebarLink
                  key={l.id}
                  icon={l.icon}
                  label={l.label}
                  href={`#${l.id}`}
                  active={ativo === l.id}
                />
              ))}
            </span>
          ))}
        </SidebarScroll>
      </Sidebar>
      <SidebarToggle />
      <Overlay />
      <ContentCol>
        <div className="docs-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <MenuButton />
            <h1>CoxaUI React</h1>
          </div>
          <div className="docs-topbar-right">
            <a href="https://www.npmjs.com/package/coxa-ui-react" target="_blank" rel="noreferrer"
              className="btn btn-ghost btn-sm">
              <i className="ti ti-brand-npm" /> npm
            </a>
            <a href="https://github.com/CORITIBA-SAF-TECH/coxa-ui-react" target="_blank" rel="noreferrer"
              className="btn btn-ghost btn-sm">
              <i className="ti ti-brand-github" /> GitHub
            </a>
            <DarkModeButton />
          </div>
        </div>
        <div className="docs-main" ref={mainRef}>
          <div className="docs-content">
            <SecInstalacao />
            <SecCores />
            <SecIcones />
            <SecBotoes />
            <SecBadges />
            <SecAlertas />
            <SecFormularios />
            <SecCards />
            <SecStatCards />
            <SecModal />
            <SecTabs />
            <SecAccordion />
            <SecDropdown />
            <SecAvatar />
            <SecGraficos />
            <SecBreadcrumb />
            <SecFilterPills />
            <SecProgress />
            <SecTimeline />
            <SecKV />
            <SecEmpty />
            <SecSpinner />
            <SecApi />
          </div>
        </div>
        <Footer
          left="CoxaUI React © 2026 Coritiba SAF"
          center={`v${COXAUI_REACT_VERSION}`}
          right={<a href="https://github.com/CORITIBA-SAF-TECH/coxa-ui-react" className="ftr-lnk" target="_blank" rel="noreferrer"><i className="ti ti-brand-github" /> GitHub</a>}
        />
      </ContentCol>
    </AppLayout>
  );
}
