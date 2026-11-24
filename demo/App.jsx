import { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AppLayout, ContentCol, Overlay, Main,
  Sidebar, SidebarToggle, SidebarFooter, SidebarHeader, SidebarBrand, SidebarScroll, SidebarGroup, SidebarLink,
  Header, MenuButton, HeaderPage, HeaderSearch, HeaderRight, DarkModeButton, LanguageSelector, Footer,
  UserMenu, DropdownItem, DropdownSep, Button, Modal, ModalInfo,
  CommandPalette, useCommandPalette, LockScreen, useCountdown, usePrivacy,
  useDarkMode, useSidebar, notify, viewTransition,
  COXAUI_REACT_VERSION
} from '../src/index.js';
import './docs.css';
import logo from '../logo.png';
import { DemoCtx } from './DemoContext.jsx';

import { SecSobre, SecInstalacao, SecCores, SecIcones } from './sections/Fundamentos.jsx';
import {
  SecBotoes, SecBadges, SecAlertas, SecFormularios,
  SecCards, SecTabelas, SecStatCards, SecModal, SecTabs, SecAccordion, SecDropdown, SecAvatar
} from './sections/Componentes.jsx';
import {
  SecGraficos, SecBreadcrumb, SecFilterPills, SecProgress,
  SecTimeline, SecKV, SecEmpty, SecApi
} from './sections/Padroes.jsx';
import {
  SecDrawer, SecSkeleton, SecTooltip, SecUpload, SecUserMenu
} from './sections/Extras.jsx';
import {
  SecLayout, SecPaleta, SecSessao, SecPrivado, SecAmbiente, SecHold, SecToast, SecMovimento
} from './sections/Novidades.jsx';
import { SecCampos, SecEscolha, SecConfirmar, SecResultado, SecCopiar } from './sections/Elementos.jsx';
import { SecFiltros, SecPopover, SecAnexos, SecWizard, SecVersoes } from './sections/Elementos2.jsx';
import { SecArvore, SecCarregamento } from './sections/Elementos3.jsx';
import { SecIdioma } from './sections/Idioma.jsx';
import { DocsGroup } from './DocsBlocks.jsx';
import { TelaPainel, TelaTitulos, TelaNovo } from './exemplo/Exemplo.jsx';

const GITHUB = 'https://github.com/CORITIBA-SAF-TECH/coxa-ui-react';
const NPM = 'https://www.npmjs.com/package/coxa-ui-react';

/* Telas de exemplo: abrem no lugar da documentação, com troca animada */
const TELAS = {
  'ex-painel':  { icon: 'layout-dashboard', title: 'Painel',      desc: 'Contas a Receber · exemplo de app', Comp: TelaPainel },
  'ex-titulos': { icon: 'receipt',          title: 'Títulos',     desc: 'Contas a Receber · exemplo de app', Comp: TelaTitulos },
  'ex-novo':    { icon: 'file-plus',        title: 'Novo título', desc: 'Contas a Receber · exemplo de app', Comp: TelaNovo }
};

/* Menu e página saem desta mesma lista, na mesma ordem: cada grupo vira um bloco do
   menu lateral e um título na documentação. Os itens sem Sec são telas de exemplo
   (abrem no lugar da documentação). Agrupado pelo que a pessoa quer fazer, não pela
   versão em que o componente chegou. */
const GRUPOS = [
  {
    grupo: 'Começar', desc: 'O que é a CoxaUI, como instalar e os fundamentos visuais.', links: [
      { id: 'sobre', icon: 'shield', label: 'Sobre a CoxaUI', Sec: SecSobre },
      { id: 'instalacao', icon: 'download', label: 'Instalação', Sec: SecInstalacao },
      { id: 'layout', icon: 'layout', label: 'Layout e casca', Sec: SecLayout },
      { id: 'cores', icon: 'droplet', label: 'Cores e variáveis', Sec: SecCores },
      { id: 'icones', icon: 'icons', label: 'Ícones', Sec: SecIcones },
      { id: 'movimento', icon: 'wand', label: 'Movimento', Sec: SecMovimento }
    ]
  },
  {
    grupo: 'Telas de exemplo', links: [
      { id: 'ex-painel', icon: 'layout-dashboard', label: 'Painel' },
      { id: 'ex-titulos', icon: 'receipt', label: 'Títulos' },
      { id: 'ex-novo', icon: 'file-plus', label: 'Novo título' }
    ]
  },
  {
    grupo: 'Ações', desc: 'Botões e o que dispara uma ação.', links: [
      { id: 'botoes', icon: 'pointer', label: 'Botões', Sec: SecBotoes },
      { id: 'hold', icon: 'hand-finger', label: 'Segurar para confirmar', Sec: SecHold },
      { id: 'copiar', icon: 'copy', label: 'Copiar e teclas', Sec: SecCopiar },
      { id: 'dropdown', icon: 'chevron-down', label: 'Dropdown', Sec: SecDropdown }
    ]
  },
  {
    grupo: 'Formulários', desc: 'Entrada de dados: campos, escolhas, arquivos e filtros.', links: [
      { id: 'formularios', icon: 'forms', label: 'Formulários', Sec: SecFormularios },
      { id: 'campos', icon: 'input-check', label: 'Campos e máscaras', Sec: SecCampos },
      { id: 'escolha', icon: 'circle-dot', label: 'Rádios e segmentado', Sec: SecEscolha },
      { id: 'upload', icon: 'upload', label: 'Upload', Sec: SecUpload },
      { id: 'filtros', icon: 'adjustments-horizontal', label: 'Filtros e linha expansível', Sec: SecFiltros },
      { id: 'wizard', icon: 'route', label: 'Etapas e wizard', Sec: SecWizard }
    ]
  },
  {
    grupo: 'Dados', desc: 'Mostrar informação: tabelas, cartões, gráficos, listas e hierarquias.', links: [
      { id: 'tabelas', icon: 'table', label: 'Tabelas', Sec: SecTabelas },
      { id: 'stat-cards', icon: 'chart-bar', label: 'Stat cards', Sec: SecStatCards },
      { id: 'cards', icon: 'layout-cards', label: 'Cards', Sec: SecCards },
      { id: 'graficos', icon: 'chart-line', label: 'Gráficos', Sec: SecGraficos },
      { id: 'arvore', icon: 'binary-tree', label: 'Árvore', Sec: SecArvore },
      { id: 'kv', icon: 'list', label: 'Chave / valor', Sec: SecKV },
      { id: 'timeline', icon: 'timeline', label: 'Timeline e histórico', Sec: SecTimeline },
      { id: 'anexos', icon: 'paperclip', label: 'Anexos e comentários', Sec: SecAnexos },
      { id: 'badges', icon: 'tag', label: 'Badges e tags', Sec: SecBadges },
      { id: 'avatar', icon: 'user-circle', label: 'Avatar', Sec: SecAvatar },
      { id: 'progress', icon: 'trending-up', label: 'Progresso', Sec: SecProgress }
    ]
  },
  {
    grupo: 'Navegação', desc: 'Ir de um lugar a outro dentro da tela e do sistema.', links: [
      { id: 'tabs', icon: 'layout-columns', label: 'Abas', Sec: SecTabs },
      { id: 'accordion', icon: 'list-details', label: 'Accordion', Sec: SecAccordion },
      { id: 'breadcrumb', icon: 'direction', label: 'Breadcrumb', Sec: SecBreadcrumb },
      { id: 'filter-pills', icon: 'filter', label: 'Filter pills', Sec: SecFilterPills },
      { id: 'paleta', icon: 'command', label: 'Busca e paleta', Sec: SecPaleta }
    ]
  },
  {
    grupo: 'Sobreposições', desc: 'O que abre por cima da tela.', links: [
      { id: 'modal', icon: 'square', label: 'Modal', Sec: SecModal },
      { id: 'drawer', icon: 'layout-sidebar-right', label: 'Drawer', Sec: SecDrawer },
      { id: 'popover', icon: 'message-circle', label: 'Popover', Sec: SecPopover },
      { id: 'tooltip', icon: 'help-circle', label: 'Tooltip', Sec: SecTooltip },
      { id: 'confirmar', icon: 'help-hexagon', label: 'Confirmação', Sec: SecConfirmar }
    ]
  },
  {
    grupo: 'Feedback', desc: 'Dizer ao usuário o que aconteceu ou o que está acontecendo.', links: [
      { id: 'alertas', icon: 'alert-circle', label: 'Alertas', Sec: SecAlertas },
      { id: 'toast', icon: 'bell', label: 'Toast', Sec: SecToast },
      { id: 'carregamento', icon: 'loader-2', label: 'Carregamento', Sec: SecCarregamento },
      { id: 'skeleton', icon: 'loader', label: 'Skeleton', Sec: SecSkeleton },
      { id: 'resultado', icon: 'mood-search', label: 'Páginas de resultado', Sec: SecResultado },
      { id: 'empty', icon: 'ghost', label: 'Estado vazio', Sec: SecEmpty }
    ]
  },
  {
    grupo: 'Sistema', desc: 'Peças da casca: idioma, conta, versão e as opcionais de sessão, privacidade e ambiente.', links: [
      { id: 'idioma', icon: 'language', label: 'Idiomas e tradução', Sec: SecIdioma },
      { id: 'sessao', icon: 'shield-lock', label: 'Sessão', Sec: SecSessao },
      { id: 'privado', icon: 'eye-off', label: 'Modo privado', Sec: SecPrivado },
      { id: 'ambiente', icon: 'server', label: 'Selo de ambiente', Sec: SecAmbiente },
      { id: 'user-menu', icon: 'user-scan', label: 'Menu do usuário', Sec: SecUserMenu },
      { id: 'versoes', icon: 'versions', label: 'Rodapé e versões', Sec: SecVersoes }
    ]
  },
  { grupo: 'Referência', desc: 'Hooks e utilitários em JavaScript.', links: [{ id: 'api', icon: 'code', label: 'Hooks e utils', Sec: SecApi }] }
];
const TOC = GRUPOS;

/* A documentação inteira não depende de estado da casca: memo evita refazê-la
   (e recriar os gráficos) a cada mudança de aba ativa ou paleta. */
const Docs = memo(function Docs() {
  return (
    <div className="docs-content">
      {GRUPOS.filter(g => g.links.some(l => l.Sec)).map(g => (
        <Fragment key={g.grupo}>
          <DocsGroup title={g.grupo} desc={g.desc} />
          {g.links.map(l => (l.Sec ? <l.Sec key={l.id} /> : null))}
        </Fragment>
      ))}
    </div>
  );
});

/* Sessão simulada (aviso de expiração e tela de bloqueio). Não mostra nada no cabeçalho
   e fica parada até a seção "Sessão" da documentação acionar simular/bloquear/renovar
   por um ref. Fica num componente próprio porque o relógio muda a cada segundo. */
const TOTAL = 15 * 60;
function SessaoDemo({ controle }) {
  const [aviso, setAviso] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [rodando, setRodando] = useState(false);
  const sessao = useCountdown(TOTAL, {
    warnAt: 60,
    paused: bloqueado || !rodando,
    onWarn: () => setAviso(true),
    onExpire: () => { setAviso(false); setBloqueado(true); }
  });
  const txt = `${Math.floor(sessao.left / 60)}:${String(sessao.left % 60).padStart(2, '0')}`;

  const renovar = useCallback(() => {
    setAviso(false);
    setRodando(false);
    sessao.reset();
    notify('success', 'Sessão renovada por mais 15 minutos');
  }, [sessao.reset]);
  const bloquear = useCallback(() => { setAviso(false); setBloqueado(true); }, []);
  const entrar = () => { setBloqueado(false); setRodando(false); sessao.reset(); notify('success', 'Sessão iniciada'); };

  useEffect(() => {
    controle.current = { simular: () => { sessao.set(12); setRodando(true); }, bloquear, renovar };
    return () => { controle.current = null; };
  }, [controle, sessao.set, bloquear, renovar]);

  return (
    <>
      <Modal open={aviso} onClose={() => setAviso(false)} size="sm" title="Sua sessão vai expirar" icon="clock"
        actions={<>
          <Button variant="secondary" onClick={bloquear}>Sair agora</Button>
          <Button onClick={renovar}>Continuar conectado</Button>
        </>}>
        <ModalInfo>
          <small>Tempo restante</small>
          <strong className="ex-valor">{txt}</strong>
        </ModalInfo>
        <p className="text-sm text-muted2">
          Por segurança, o CoxaHub encerra sessões paradas. O que você digitou fica salvo como rascunho.
        </p>
      </Modal>
      <LockScreen open={bloqueado}
        action={<Button variant="accent" icon="lock" onClick={entrar}>Entrar novamente</Button>}>
        O conteúdo foi ocultado. Entre de novo para continuar de onde parou.
      </LockScreen>
    </>
  );
}

function Casca({ tela, ativo, irPara, abrirPaleta, sessaoRef, mainRef }) {
  const sb = useSidebar();
  const info = TELAS[tela];
  const Tela = info?.Comp;

  return (
    <>
      <Sidebar>
        <SidebarHeader />
        <SidebarBrand logo={logo} subtitle={`design system · v${COXAUI_REACT_VERSION}`} href="#sobre" />
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
                  active={TELAS[l.id] ? tela === l.id : tela === 'docs' && ativo === l.id}
                  aria-current={(TELAS[l.id] ? tela === l.id : tela === 'docs' && ativo === l.id) ? 'page' : undefined}
                  onClick={e => { e.preventDefault(); irPara(l.id); sb?.close(); }}
                />
              ))}
            </span>
          ))}
        </SidebarScroll>
        <SidebarFooter portalUrl="#" portalLabel="Voltar ao portal"
          onPortalClick={e => { e.preventDefault(); notify('info', 'Aqui voltaria ao portal do CoxaHub.'); }} />
      </Sidebar>
      <SidebarToggle />
      <Overlay />
      <ContentCol>
        <Header>
          <MenuButton />
          {info
            ? <HeaderPage icon={info.icon} title={info.title} desc={info.desc} />
            : <HeaderPage icon="book-2" title="CoxaUI React" desc={`Design system · v${COXAUI_REACT_VERSION}`} />}
          <HeaderSearch onClick={abrirPaleta} />
          <HeaderRight>
            <LanguageSelector />
            <DarkModeButton />
            <UserMenu name="Alberto" sub="TI" initials="AR">
              <DropdownItem icon="brand-npm" onClick={() => window.open(NPM, '_blank', 'noopener,noreferrer')}>npm</DropdownItem>
              <DropdownItem icon="brand-github" onClick={() => window.open(GITHUB, '_blank', 'noopener,noreferrer')}>GitHub</DropdownItem>
              <DropdownSep />
              <DropdownItem icon="logout" onClick={() => notify('info', 'Aqui voltaria ao portal do CoxaHub.')}>Sair</DropdownItem>
            </UserMenu>
          </HeaderRight>
        </Header>

        <Main ref={mainRef} className={Tela ? '' : 'docs-main'}>
          {Tela ? <Tela /> : <Docs />}
        </Main>

        <Footer
          system="CoxaUI React"
          version={COXAUI_REACT_VERSION}
          commit={typeof __COXA_COMMIT__ !== 'undefined' ? __COXA_COMMIT__ : null}
          copyright="© 2026 Coritiba SAF"
        />
      </ContentCol>
      <SessaoDemo controle={sessaoRef} />
    </>
  );
}

const hashInicial = () => (typeof location !== 'undefined' ? decodeURIComponent(location.hash.slice(1)) : '');

export default function App() {
  const mainRef = useRef(null);
  const sessaoRef = useRef(null);
  const pendente = useRef(TELAS[hashInicial()] ? null : hashInicial() || null);
  const [tela, setTela] = useState(() => (TELAS[hashInicial()] ? hashInicial() : 'docs'));
  const [ativo, setAtivo] = useState('sobre');
  const cmd = useCommandPalette();
  const { toggle: alternarTema } = useDarkMode();
  const { toggle: alternarPrivado } = usePrivacy();
  const telaAtual = useRef(tela);
  telaAtual.current = tela;

  /* Navegação: telas de exemplo trocam o conteúdo do <Main>; seções rolam a documentação */
  const irPara = useCallback(id => {
    history.replaceState(null, '', `#${id}`);
    if (TELAS[id]) {
      if (telaAtual.current !== id) viewTransition(() => setTela(id));
      return;
    }
    if (telaAtual.current !== 'docs') {
      pendente.current = id;
      viewTransition(() => setTela('docs'));
    } else {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    }
  }, []);

  /* Voltar/avançar do navegador e hash digitado à mão */
  useEffect(() => {
    const onHash = () => {
      const id = hashInicial();
      if (id && (TELAS[id] || document.getElementById(id) || telaAtual.current !== 'docs')) irPara(id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [irPara]);

  /* Ao trocar de tela: volta ao topo, ou vai à seção pedida.
     Só age uma vez por tela: em desenvolvimento o React roda o efeito duas vezes, e a
     segunda passada (já sem seção pendente) devolvia ao topo quem abriu o link de uma seção. */
  const telaPosicionada = useRef(null);
  useEffect(() => {
    const el = mainRef.current;
    if (!el || telaPosicionada.current === tela) return;
    telaPosicionada.current = tela;
    const alvo = tela === 'docs' && pendente.current ? document.getElementById(pendente.current) : null;
    pendente.current = null;
    const suave = el.style.scrollBehavior;
    el.style.scrollBehavior = 'auto';
    if (alvo) alvo.scrollIntoView({ block: 'start' });
    else el.scrollTop = 0;
    el.style.scrollBehavior = suave;
  }, [tela]);

  /* Scroll spy: destaca o link da seção visível conforme a rolagem */
  useEffect(() => {
    const el = mainRef.current;
    if (!el || tela !== 'docs') return;
    function onScroll() {
      const top = el.getBoundingClientRect().top;
      let atual = 'sobre';
      el.querySelectorAll('.docs-section[id]').forEach(s => {
        if (s.getBoundingClientRect().top - top <= 80) atual = s.id;
      });
      setAtivo(atual);
    }
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [tela]);

  const comandos = useMemo(() => [
    ...TOC.flatMap(g => g.links.map(l => ({
      id: l.id, group: g.grupo || 'Início', icon: l.icon, label: l.label, onSelect: () => irPara(l.id)
    }))),
    { id: 'a-tema', group: 'Ações', icon: 'moon', label: 'Alternar tema claro e escuro', keywords: 'dark modo noturno', onSelect: () => alternarTema() },
    { id: 'a-priv', group: 'Ações', icon: 'eye-off', label: 'Ocultar ou mostrar valores', keywords: 'privado sensível', onSelect: alternarPrivado },
    { id: 'a-sessao', group: 'Ações', icon: 'refresh', label: 'Renovar a sessão', onSelect: () => sessaoRef.current?.renovar() },
    { id: 'a-github', group: 'Ações', icon: 'brand-github', label: 'Abrir o repositório no GitHub', onSelect: () => window.open(GITHUB, '_blank', 'noopener,noreferrer') }
  ], [irPara, alternarTema, alternarPrivado]);

  const demo = useMemo(() => ({
    ir: irPara, abrirPaleta: cmd.show, sessao: sessaoRef
  }), [irPara, cmd.show]);

  return (
    <DemoCtx.Provider value={demo}>
      <AppLayout>
        <Casca tela={tela} ativo={ativo} irPara={irPara} abrirPaleta={cmd.show} sessaoRef={sessaoRef} mainRef={mainRef} />
      </AppLayout>

      <CommandPalette open={cmd.open} onClose={cmd.close} commands={comandos} />

    </DemoCtx.Provider>
  );
}
