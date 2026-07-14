import { Alert } from '../../src/index.js';
import { DocsSection, SubSection, Demo, CodeBlock, Swatch } from '../DocsBlocks.jsx';

export function SecInstalacao() {
  return (
    <DocsSection id="instalacao" icon="download" title="Instalação"
      desc="Biblioteca de componentes React do CoxaUI. Projeto independente da versão HTML/CSS/JS — mesmo visual, mesmos padrões.">
      <Alert type="warn" title="Versão beta">
        O CoxaUI React está em desenvolvimento ativo. A API dos componentes pode mudar entre versões.
      </Alert>
      <SubSection title="Via npm">
        <CodeBlock>{`npm install coxa-ui-react react react-dom

// no entry da aplicação (main.jsx):
import 'coxa-ui-react/style.css';`}</CodeBlock>
      </SubSection>
      <SubSection title="Estrutura básica de página">
        <CodeBlock>{`import 'coxa-ui-react/style.css';
import {
  AppLayout, ContentCol, Overlay, Main,
  Sidebar, SidebarToggle, SidebarHeader, SidebarBrand,
  SidebarScroll, SidebarGroup, SidebarLink,
  Header, MenuButton, HeaderPage, HeaderRight, DarkModeButton, Footer
} from 'coxa-ui-react';

export default function App() {
  return (
    <AppLayout>
      <Sidebar>
        <SidebarHeader />
        <SidebarBrand logo={logo} subtitle="minha aplicação" />
        <SidebarScroll>
          <SidebarLink icon="layout-dashboard" label="Dashboard" active />
          <SidebarGroup>Operações</SidebarGroup>
          <SidebarLink icon="login" label="Registrar Entrada" href="/entrada" />
        </SidebarScroll>
      </Sidebar>
      <SidebarToggle />
      <Overlay />
      <ContentCol>
        <Header>
          <MenuButton />
          <HeaderPage icon="layout-dashboard" title="Dashboard" desc="Visão geral" />
          <HeaderRight><DarkModeButton /></HeaderRight>
        </Header>
        <Main>{/* conteúdo */}</Main>
        <Footer left="Minha App © 2026 Coritiba SAF" />
      </ContentCol>
    </AppLayout>
  );
}`}</CodeBlock>
        <p style={{ fontSize: '.84rem', color: 'var(--text2)', marginTop: 10 }}>
          A sidebar inicia recolhida por padrão no desktop e vira drawer no mobile.
          As preferências do usuário (sidebar e modo escuro) ficam salvas em <code>localStorage</code> com
          as mesmas chaves do CoxaUI vanilla (<code>coxaui-sb</code>, <code>coxaui-dark</code>).
          Esta própria página usa o layout: teste o botão circular na borda da sidebar.
        </p>
      </SubSection>
    </DocsSection>
  );
}

export function SecCores() {
  return (
    <DocsSection id="cores" icon="droplet" title="Cores & Variáveis"
      desc="Variáveis CSS herdadas do CoxaUI. Vermelho é proibido no projeto: estados de perigo usam laranja/âmbar.">
      <SubSection title="Marca">
        <div className="color-grid">
          <Swatch color="#006B3C" name="Primary" varName="--primary" />
          <Swatch color="#005530" name="Primary Dark" varName="--primary-dk" />
          <Swatch color="#fad716" name="Accent" varName="--accent" />
          <Swatch color="#00544d" name="Header/Sidebar" varName="--hdr-bg" />
          <Swatch color="#ea580c" name="Danger (laranja)" varName="—" />
          <Swatch color="#2563eb" name="Info" varName="—" />
        </div>
      </SubSection>
    </DocsSection>
  );
}

export function SecIcones() {
  const icones = ['home', 'users', 'settings', 'edit', 'trash', 'login', 'logout', 'search', 'bell', 'calendar', 'chart-bar', 'file-text'];
  return (
    <DocsSection id="icones" icon="icons" title="Ícones"
      desc="Tabler Icons v3, carregados automaticamente pelo CSS. Mais de 5.000 ícones em tabler.io/icons.">
      <Demo code={`{/* nos componentes, passe só o nome: */}
<Button icon="check">Salvar</Button>
<SidebarLink icon="users" label="Visitantes" />

{/* ou use direto: */}
<i className="ti ti-home" />`}>
        <div className="demo-gap" style={{ fontSize: '1.5rem', color: 'var(--text2)' }}>
          {icones.map(ic => <i key={ic} className={`ti ti-${ic}`} title={ic} />)}
        </div>
      </Demo>
    </DocsSection>
  );
}
