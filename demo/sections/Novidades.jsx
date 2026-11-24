import { useState } from 'react';
import {
  Alert, Button, HoldButton, HeaderSearch, EnvBadge, SessionChip, PrivacyButton, Sensitive,
  CountUp, notify
} from '../../src/index.js';
import { DocsSection, SubSection, Demo, CodeBlock, Swatch } from '../DocsBlocks.jsx';
import { useDemo } from '../DemoContext.jsx';

/* Faixa na cor do cabeçalho, para demonstrar as peças que vivem nele */
function Faixa({ children }) {
  return <div className="demo-hdr-strip">{children}</div>;
}

export function SecLayout() {
  const { ir } = useDemo();
  return (
    <DocsSection id="layout" icon="layout" title="Layout e casca"
      desc="O acabamento da casca e dos componentes: cartões em bento, movimento, cabeçalho com busca e seletor de idioma, e modo escuro em neutros esverdeados. Este playground inteiro usa esse layout.">
      <Alert type="success" title="Já vem ligado" icon="circle-check">
        Não há nada para configurar. O <code>&lt;AppLayout&gt;</code> e qualquer tela que importe o CSS da
        biblioteca (login, erro, páginas sem casca) já usam este layout.
      </Alert>
      <div className="demo-gap" style={{ margin: '14px 0 4px' }}>
        <Button icon="layout-dashboard" onClick={() => ir('ex-painel')}>Abrir a tela de exemplo</Button>
        <Button variant="ghost" icon="wand" onClick={() => ir('movimento')}>Ver o movimento</Button>
      </div>

      <SubSection title="O que o layout traz">
        <table className="docs-table">
          <thead><tr><th>Área</th><th>Como fica</th></tr></thead>
          <tbody>
            <tr><td>Casca</td><td>Sidebar de 255/100 px e cabeçalho de 58 px. Sidebar chapada no verde institucional, com indicador amarelo que desliza entre os itens; o cabeçalho ganha sombra só ao rolar.</td></tr>
            <tr><td>Cartões</td><td>Cantos de 20 px, borda fina e sombra suave. <code>StatCard</code> em bento, com destaque (<code>featured</code>), unidade (<code>unit</code>) e minigráfico (<code>spark</code>).</td></tr>
            <tr><td>Movimento</td><td>Entrada em sequência, contagem dos números, abas com sublinhado deslizante, modal e drawer com mola, etapas e árvores que se abrem, troca de tema em círculo e troca de tela com <code>viewTransition()</code>.</td></tr>
            <tr><td>Modo claro</td><td>Fundo cinza azulado (<code>#dfe3e8</code>), cabeçalho e rodapé offwhite (<code>#f4f3ef</code>); superfícies internas e bordas em neutros esverdeados.</td></tr>
            <tr><td>Modo escuro</td><td>Fundo e cartões bem escuros, em neutros esverdeados.</td></tr>
            <tr><td>Rodapé</td><td>Sistema, versão e commit à esquerda; copyright à direita.</td></tr>
            <tr><td>Acessibilidade</td><td>Tudo para com <code>prefers-reduced-motion</code>. Animações só em <code>transform</code> e <code>opacity</code>.</td></tr>
          </tbody>
        </table>
      </SubSection>

      <SubSection title="Cores do layout">
        <div className="color-grid">
          <Swatch color="#00544d" name="Sidebar · Pantone 3305" varName="--sb-bg" />
          <Swatch color="#dfe3e8" name="Fundo claro" varName="--bg" />
          <Swatch color="#f4f3ef" name="Cabeçalho e rodapé claros" varName="--hdr-bg · --ftr-bg" />
          <Swatch color="#0b1310" name="Fundo escuro" varName="--bg (dark)" />
          <Swatch color="#111916" name="Cartões escuro" varName="--surface (dark)" />
          <Swatch color="#1f2a25" name="Divisórias escuro" varName="--border (dark)" />
        </div>
        <p className="docs-note">Verde primário, amarelo de destaque e as cores de status são as mesmas em toda a biblioteca.</p>
      </SubSection>
    </DocsSection>
  );
}

export function SecPaleta() {
  const { abrirPaleta } = useDemo();
  return (
    <DocsSection id="paleta" icon="command" title="Busca e paleta de comandos"
      desc="Busca global no cabeçalho: abre com Ctrl K (⌘K no Mac), filtra telas e ações, e se opera inteira pelo teclado.">
      <Demo code={`const cmd = useCommandPalette();           // estado + atalho Ctrl K

<Header>
  <MenuButton />
  <HeaderPage icon="receipt" title="Títulos" />
  <HeaderSearch onClick={cmd.show} />
  <HeaderRight>...</HeaderRight>
</Header>

<CommandPalette open={cmd.open} onClose={cmd.close} commands={[
  { group: 'Ir para', icon: 'receipt', label: 'Títulos', onSelect: () => navigate('/titulos') },
  { group: 'Ações', icon: 'moon', label: 'Alternar tema', keywords: 'escuro claro', onSelect: toggle }
]} />`}>
        <Faixa><HeaderSearch onClick={abrirPaleta} /></Faixa>
        <p className="docs-note">
          Clique na busca acima ou pressione <kbd className="cx-kbd">Ctrl K</kbd>. Nesta página ela lista todas as
          seções da documentação e as ações do playground.
        </p>
      </Demo>
    </DocsSection>
  );
}

export function SecSessao() {
  const { sessao } = useDemo();
  return (
    <DocsSection id="sessao" icon="shield-lock" title="Sessão: chip, aviso e bloqueio"
      desc="Peças opcionais para sistemas com sessão curta: um chip com o tempo restante, o aviso antes de expirar e a tela de bloqueio ao fim. Não fazem parte do cabeçalho padrão. A validade real continua sendo do backend: o hook só espelha o relógio.">
      <Demo code={`const [bloqueado, setBloqueado] = useState(false);
const sessao = useCountdown(15 * 60, {
  warnAt: 60,
  onWarn: () => setAviso(true),          // abre um <Modal> de aviso
  onExpire: () => setBloqueado(true),
  paused: bloqueado
});
// sessao.set(segundos) acerta o relógio com o que o servidor informar

<HeaderRight>
  <SessionChip left={sessao.left} total={15 * 60} onClick={renovar} />
</HeaderRight>

<LockScreen open={bloqueado}
  action={<Button variant="accent" icon="lock" onClick={entrar}>Entrar novamente</Button>}>
  O conteúdo foi ocultado. Entre de novo para continuar de onde parou.
</LockScreen>`}>
        <Faixa>
          <SessionChip left={754} total={900} />
          <SessionChip left={312} total={900} />
          <SessionChip left={42} total={900} />
        </Faixa>
        <div className="demo-gap" style={{ marginTop: 14 }}>
          <Button icon="player-play" onClick={() => sessao.current?.simular()}>Simular sessão expirando</Button>
          <Button variant="secondary" icon="lock" onClick={() => sessao.current?.bloquear()}>Ver a tela de bloqueio</Button>
          <Button variant="ghost" icon="refresh" onClick={() => sessao.current?.renovar()}>Renovar</Button>
        </div>
        <p className="docs-note">
          A tela de bloqueio desfoca a aplicação e a torna inerte: nada por baixo recebe foco ou clique.
        </p>
      </Demo>
    </DocsSection>
  );
}

export function SecPrivado() {
  return (
    <DocsSection id="privado" icon="eye-off" title="Modo privado"
      desc="Peça opcional: um clique no olho borra tudo que estiver marcado como sensível. Serve para compartilhamento de tela e para quem trabalha com gente por perto. Não faz parte do cabeçalho padrão.">
      <Demo code={`<HeaderRight><PrivacyButton /></HeaderRight>

<td><Sensitive>R$ 184.000,00</Sensitive></td>
<Sensitive as="div"><CoxaChart ... /></Sensitive>

const { hidden, toggle, setHidden } = usePrivacy();   // para controlar por código`}>
        <Faixa><PrivacyButton onChange={oculto => notify('info', oculto ? 'Valores ocultos' : 'Valores visíveis')} /></Faixa>
        <div className="demo-kv">
          <span>Valor do contrato</span><strong><Sensitive>R$ 184.000,00</Sensitive></strong>
          <span>CPF do responsável</span><strong><Sensitive>123.456.789-09</Sensitive></strong>
          <span>Vencimento</span><strong>28/11/2026</strong>
        </div>
        <p className="docs-note">
          É um recurso de tela: o dado continua no DOM. O que o usuário não pode ver não deve ser enviado pelo backend.
        </p>
      </Demo>
    </DocsSection>
  );
}

export function SecAmbiente() {
  return (
    <DocsSection id="ambiente" icon="server" title="Selo de ambiente"
      desc="Peça opcional: deixa claro em que ambiente a pessoa está, para ninguém operar em produção achando que é homologação. Não faz parte do cabeçalho padrão e, em produção, o usual é não renderizar.">
      <Demo code={`<HeaderRight>
  {ambiente !== 'producao' && <EnvBadge>Staging</EnvBadge>}
</HeaderRight>
// color: orange (padrão) | green | blue | gray`}>
        <Faixa>
          <EnvBadge>Staging</EnvBadge>
          <EnvBadge color="blue">Homologação</EnvBadge>
          <EnvBadge color="green">Local</EnvBadge>
          <EnvBadge color="gray">Demo</EnvBadge>
        </Faixa>
      </Demo>
    </DocsSection>
  );
}

export function SecHold() {
  return (
    <DocsSection id="hold" icon="hand-finger" title="Segurar para confirmar"
      desc="Para ações destrutivas: só confirma se o botão ficar pressionado até o fim. Evita o clique acidental sem interromper com um modal. Funciona com mouse, toque e teclado (segurar Espaço ou Enter).">
      <Demo code={`<HoldButton icon="trash" onConfirm={excluir}>Segure para excluir</HoldButton>
<HoldButton variant="warning" icon="archive" duration={800} onConfirm={arquivar}>Segure para arquivar</HoldButton>`}>
        <div className="demo-gap">
          <HoldButton icon="trash" onConfirm={() => notify('warning', 'Registro excluído')}>Segure para excluir</HoldButton>
          <HoldButton variant="warning" icon="archive" duration={800} onConfirm={() => notify('info', 'Registro arquivado')}>Segure para arquivar</HoldButton>
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecToast() {
  return (
    <DocsSection id="toast" icon="bell" title="Toast leve"
      desc="notify() mostra um toast sem depender do SweetAlert2. O coxaToast continua existindo; use notify nas telas novas.">
      <Demo code={`import { notify } from 'coxa-ui-react';

notify('success', 'Título salvo');
notify('info', 'Lista atualizada');
notify('warning', 'Sessão expirando', { duration: 6000 });
notify('error', 'Não foi possível salvar');   // laranja: vermelho é proibido`}>
        <div className="demo-gap">
          <Button size="sm" icon="circle-check" onClick={() => notify('success', 'Título salvo')}>success</Button>
          <Button size="sm" variant="secondary" icon="info-circle" onClick={() => notify('info', 'Lista atualizada')}>info</Button>
          <Button size="sm" variant="warning" icon="alert-triangle" onClick={() => notify('warning', 'Sessão expirando', { duration: 6000 })}>warning</Button>
          <Button size="sm" variant="danger" icon="alert-octagon" onClick={() => notify('error', 'Não foi possível salvar')}>error</Button>
        </div>
        <p className="docs-note">O texto entra como texto puro, nunca como HTML. Clicar no toast fecha.</p>
      </Demo>
    </DocsSection>
  );
}

/* Remonta o bloco para as animações de entrada rodarem de novo */
function DemoMovimento() {
  const [vez, setVez] = useState(0);
  return (
    <Demo code={`<div className="cx-stagger">   {/* os filhos entram um depois do outro */}
  <StatCard ... /> <StatCard ... /> <StatCard ... />
</div>
<section className="cx-rise">...</section>      {/* o elemento entra subindo */}
<Badge className="cx-pop-in">novo</Badge>       {/* surge crescendo */}`}>
      <div className="demo-anim cx-stagger" key={vez}>
        <div>Primeiro</div><div>Segundo</div><div>Terceiro</div><div>Quarto</div><div>Quinto</div>
      </div>
      <div className="demo-gap" style={{ marginTop: 12 }}>
        <Button size="sm" variant="secondary" icon="refresh" onClick={() => setVez(v => v + 1)}>Repetir a entrada</Button>
      </div>
      <p className="docs-note">Não escreva animações próprias nem traga biblioteca de animação: use essas classes e deixe o resto com os componentes.</p>
    </Demo>
  );
}

export function SecMovimento() {
  const [valor, setValor] = useState(1280);
  return (
    <DocsSection id="movimento" icon="wand" title="Movimento"
      desc="A interface se move por conta própria: o que abre, entra ou muda de estado é animado pela biblioteca, sem código no app. Os utilitários abaixo cobrem o que depende do conteúdo de cada tela.">
      <SubSection title="O que já se move sozinho">
        <table className="docs-table">
          <thead><tr><th>Onde</th><th>Movimento</th></tr></thead>
          <tbody>
            <tr><td>Entrada da tela</td><td>Conteúdo do <code>Main</code>, stat cards, linhas de tabela, timeline, anexos e comentários entram em sequência.</td></tr>
            <tr><td>O que abre</td><td>Modal e drawer com mola; dropdown, popover, combobox e menus surgem do gatilho; accordion, linha expansível e árvore se desdobram; abas trocam com fade.</td></tr>
            <tr><td>O que se escolhe</td><td>Botões, rádios, checkboxes, segmentado, pills e paginação respondem ao toque; o item escolhido surge crescendo.</td></tr>
            <tr><td>Etapas</td><td>O número ativo cresce, a trilha se pinta e o conteúdo entra do lado para onde se anda (avançar ou voltar).</td></tr>
            <tr><td>Estados</td><td>Erro de campo treme uma vez; estado vazio flutua; páginas de resultado entram em sequência; o escudo pulsa nos carregamentos.</td></tr>
          </tbody>
        </table>
      </SubSection>
      <SubSection title="Classes para o conteúdo do app">
        <DemoMovimento />
      </SubSection>
      <SubSection title="CountUp: número que conta até o valor">
        <Demo code={`<CountUp value={1280} />
<CountUp value={1.28} decimals={2} prefix="R$ " suffix=" mi" />
<StatCard unit="R$" value={<CountUp value={742} suffix=" mil" />} ... />`}>
          <div className="demo-gap">
            <span className="demo-num"><CountUp value={valor} /></span>
            <span className="demo-num"><CountUp value={valor / 1000} decimals={2} prefix="R$ " suffix=" mi" /></span>
            <Button size="sm" variant="secondary" icon="refresh" onClick={() => setValor(v => (v === 1280 ? 742 : 1280))}>Trocar valor</Button>
          </div>
          <p className="docs-note">Com "reduzir movimento" ligado no sistema, mostra o valor final direto.</p>
        </Demo>
      </SubSection>
      <SubSection title="viewTransition: troca de tela animada">
        <CodeBlock>{`import { viewTransition } from 'coxa-ui-react';

// estado local
viewTransition(() => setTela('titulos'));

// react-router
const navigate = useNavigate();
viewTransition(() => navigate('/titulos'));`}</CodeBlock>
        <p className="docs-note">
          Usa a View Transitions API do navegador (sem biblioteca) para animar o conteúdo do <code>&lt;Main&gt;</code>.
          Onde a API não existe, só executa a atualização. É o que este playground usa ao abrir as telas de exemplo pelo menu.
        </p>
      </SubSection>
    </DocsSection>
  );
}
