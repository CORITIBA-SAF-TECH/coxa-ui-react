import { Alert, COXA_LOGO } from '../../src/index.js';
import { DocsSection, SubSection, Demo, CodeBlock, Swatch } from '../DocsBlocks.jsx';

const PRINCIPIOS = [
  { icon: 'layout-dashboard', titulo: 'Uma só cara', texto: 'Os mesmos componentes e os mesmos comportamentos em todos os sistemas. Quem aprende a usar um, já sabe usar os outros.' },
  { icon: 'palette', titulo: 'As cores do clube', texto: 'Verde e amarelo em toda a interface. Vermelho não entra: erro e perigo são sempre laranja.' },
  { icon: 'accessible', titulo: 'Para todo mundo', texto: 'Funciona pelo teclado, conversa com leitores de tela, tem modo escuro e respeita quem pede menos movimento.' },
  { icon: 'robot', titulo: 'Pronta para IA', texto: 'O arquivo llms.txt ensina as regras e os componentes a assistentes como Claude e Copilot, para a tela gerada já nascer no padrão.' }
];

const CLUBE = [
  { rotulo: 'Fundação', valor: '12 de outubro de 1909' },
  { rotulo: 'Cidade', valor: 'Curitiba, Paraná' },
  { rotulo: 'Torcida', valor: 'Coxa-Branca' },
  { rotulo: 'Cores', valor: 'Verde e branco' },
  { rotulo: 'Casa', valor: 'Estádio Couto Pereira' }
];

export function SecSobre() {
  return (
    <DocsSection id="sobre" icon="shield" title="Sobre a CoxaUI">
      <div className="sobre-hero">
        <img src={COXA_LOGO} alt="Escudo do Coritiba Foot Ball Club" />
        <div>
          <h2>O design system do Coritiba Foot Ball Club</h2>
          <p>
            A CoxaUI é o conjunto de componentes, cores e regras com que são construídos os sistemas
            internos do clube. Com ela, portaria, chamados, contas a receber, credenciamento, relatórios
            e os demais sistemas do CoxaHub têm a mesma aparência e funcionam do mesmo jeito.
          </p>
        </div>
      </div>

      <SubSection title="O que é a CoxaUI">
        <p className="sobre-texto">
          Cada sistema do clube resolve um problema diferente, mas todos são usados pelas mesmas pessoas.
          A CoxaUI existe para que ninguém precise reaprender onde fica o menu, como se filtra uma tabela
          ou o que significa uma cor a cada sistema novo. Para quem desenvolve, ela tira da frente as
          decisões que já foram tomadas: como é um botão, um formulário, uma tela de erro ou um
          carregamento. Sobra tempo para o que é próprio de cada sistema.
        </p>
        <p className="sobre-texto">
          Esta biblioteca, a <code>coxa-ui-react</code>, é a CoxaUI em componentes React. Este playground
          mostra cada peça funcionando, com o código para copiar.
        </p>
        <div className="sobre-grid">
          {PRINCIPIOS.map(p => (
            <div key={p.titulo} className="sobre-card">
              <i className={`ti ti-${p.icon}`} aria-hidden="true" />
              <strong>{p.titulo}</strong>
              <span>{p.texto}</span>
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection title="O Coritiba Foot Ball Club">
        <p className="sobre-texto">
          Fundado em 12 de outubro de 1909, em Curitiba, o Coritiba Foot Ball Club é um dos clubes mais
          tradicionais do futebol brasileiro. O Coxa, como o time é chamado, veste verde e branco e manda
          seus jogos no Estádio Major Antônio Couto Pereira, no bairro Alto da Glória. Sua torcida é a
          Coxa-Branca. Campeão brasileiro em 1985 e maior vencedor do Campeonato Paranaense, o clube é
          hoje uma Sociedade Anônima do Futebol (SAF).
        </p>
        <div className="sobre-fatos">
          {CLUBE.map(c => (
            <div key={c.rotulo}><small>{c.rotulo}</small><strong>{c.valor}</strong></div>
          ))}
        </div>
        <p className="docs-note">
          O verde e o amarelo desta biblioteca vêm do escudo, e é por respeito à identidade do clube
          que o vermelho não aparece em nenhuma tela.
        </p>
        <p className="sobre-texto" style={{ marginTop: 12 }}>
          Para saber mais sobre o clube, visite <a href="https://www.coritiba.com.br" target="_blank" rel="noopener noreferrer">coritiba.com.br</a>.
        </p>
      </SubSection>
    </DocsSection>
  );
}

export function SecInstalacao() {
  return (
    <DocsSection id="instalacao" icon="download" title="Instalação"
      desc="Um pacote npm e uma linha de CSS. O layout, as cores e o movimento já vêm ligados: não há nada para configurar.">
      <Alert type="info" title="Gerando código com IA?" icon="robot">
        Aponte seu assistente (Claude, Copilot…) para o{' '}
        <a href="/llms.txt" target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>
          <i className="ti ti-external-link" style={{ verticalAlign: '-2px' }} /> llms.txt
        </a>{' '}
        antes de gerar telas: ele traz orientações, regras (ex.: nunca usar vermelho),
        props e exemplos de todos os componentes.
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
  Sidebar, SidebarToggle, SidebarHeader, SidebarBrand, SidebarScroll,
  SidebarGroup, SidebarLink, SidebarFooter,
  Header, MenuButton, HeaderPage, HeaderRight, DarkModeButton, Footer
} from 'coxa-ui-react';

export default function App() {
  return (
    <AppLayout>
      <Sidebar>
        <SidebarHeader />
        <SidebarBrand logo={logo} subtitle="minha aplicação" />
        <SidebarScroll>
          <SidebarLink icon="layout-dashboard" label="Dashboard" href="/" active />
          <SidebarGroup>Operações</SidebarGroup>
          <SidebarLink icon="login" label="Registrar Entrada" href="/entrada" />
        </SidebarScroll>
        {/* Botão "voltar ao portal" fixo na base */}
        <SidebarFooter portalUrl="https://portal.exemplo" portalLabel="Voltar ao portal" />
      </Sidebar>
      {/* Botão recolher/expandir: círculo flutuante na borda */}
      <SidebarToggle />
      <Overlay />
      <ContentCol>
        <Header>
          <MenuButton />
          <HeaderPage icon="layout-dashboard" title="Dashboard" desc="Visão geral" />
          <HeaderRight><DarkModeButton /></HeaderRight>
        </Header>
        <Main>{/* conteúdo */}</Main>
        <Footer system="Minha App" version="1.0.0" commit={gitCommit} copyright="© 2026 Coritiba SAF" />
      </ContentCol>
    </AppLayout>
  );
}`}</CodeBlock>
        <p style={{ fontSize: '.84rem', color: 'var(--text2)', marginTop: 10 }}>
          O <code>&lt;SidebarToggle&gt;</code> é o botão circular flutuante na borda (recolher/expandir) e fica
          logo após a <code>&lt;Sidebar&gt;</code>. O <code>&lt;SidebarFooter&gt;</code> (opcional) fica dentro da
          <code>&lt;Sidebar&gt;</code> e traz o botão "voltar ao portal" fixo na base.
          A sidebar inicia recolhida no desktop e vira drawer no mobile. As preferências (sidebar e modo escuro)
          ficam salvas em <code>localStorage</code> (<code>coxaui-sb</code>, <code>coxaui-dark</code>).
          Esta própria página usa o layout.
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
          <Swatch color="#ea580c" name="Danger (laranja)" varName="" />
          <Swatch color="#2563eb" name="Info" varName="" />
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
