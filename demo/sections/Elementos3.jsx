import { useState } from 'react';
import {
  Button, IconButton, Tree, Loader, LogoLoader, LoadingOverlay, LoadingScreen, Segmented, KVList, KV,
  showLoading, notify
} from '../../src/index.js';
import { DocsSection, SubSection, Demo } from '../DocsBlocks.jsx';

const CENTROS = [
  {
    id: 'adm', label: 'Administrativo', icon: 'building', children: [
      {
        id: 'fin', label: 'Financeiro', icon: 'coin', children: [
          { id: 'cr', label: 'Contas a receber', icon: 'file-text', badge: 12 },
          { id: 'cp', label: 'Contas a pagar', icon: 'file-text', badge: 4 },
          { id: 'fiscal', label: 'Fiscal', icon: 'file-text' }
        ]
      },
      { id: 'rh', label: 'Pessoas', icon: 'users', badge: 3 },
      { id: 'ti', label: 'Tecnologia', icon: 'device-desktop' }
    ]
  },
  {
    id: 'fut', label: 'Futebol', icon: 'shield-check', children: [
      { id: 'prof', label: 'Profissional', icon: 'file-text' },
      { id: 'base', label: 'Categorias de base', icon: 'file-text' },
      { id: 'fem', label: 'Feminino', icon: 'file-text', disabled: true }
    ]
  },
  { id: 'com', label: 'Comercial e marketing', icon: 'building-bank' }
];

const PERMISSOES = [
  {
    id: 'titulos', label: 'Títulos', children: [
      { id: 'titulos.ver', label: 'Ver' },
      { id: 'titulos.criar', label: 'Criar e editar' },
      { id: 'titulos.excluir', label: 'Excluir' }
    ]
  },
  {
    id: 'relatorios', label: 'Relatórios', children: [
      { id: 'relatorios.ver', label: 'Ver' },
      { id: 'relatorios.exportar', label: 'Exportar' }
    ]
  },
  { id: 'config', label: 'Configurações do sistema' }
];

export function SecArvore() {
  const [sel, setSel] = useState('cr');
  const [marcados, setMarcados] = useState(['titulos.ver', 'relatorios.ver', 'relatorios.exportar']);
  return (
    <DocsSection id="arvore" icon="binary-tree" title="Árvore"
      desc="Hierarquia que abre e fecha: centros de custo, pastas, organograma, permissões. Navega pelo teclado (setas, Home, End, Enter).">
      <Demo code={`const itens = [
  { id: 'adm', label: 'Administrativo', icon: 'building', children: [
    { id: 'fin', label: 'Financeiro', icon: 'coin', children: [
      { id: 'cr', label: 'Contas a receber', badge: 12 }
    ] }
  ] },
  { id: 'com', label: 'Comercial e marketing' }
];

// Seleção de um item
<Tree items={itens} selected={sel} onSelect={(id, item) => setSel(id)}
  defaultExpanded={['adm', 'fin']}
  actions={item => <IconButton icon="plus" title="Novo filho" onClick={...} />} />

// Com caixas de marcação: checked guarda os ids das folhas; o pai fica marcado,
// parcial ou vazio conforme os filhos, e marcar o pai marca todos.
<Tree items={permissoes} checkable checked={marcados} onCheckedChange={setMarcados} defaultExpandAll />

// item: { id, label, icon, badge, disabled, children }
// abertos controlados: expanded={ids} + onExpandedChange`}>
        <div className="demo-cols">
          <div className="demo-panel">
            <div className="demo-panel-title">Centros de custo · selecionado: {sel}</div>
            <Tree items={CENTROS} selected={sel} onSelect={id => setSel(id)} defaultExpanded={['adm', 'fin']} aria-label="Centros de custo"
              actions={item => (item.children
                ? <IconButton icon="plus" title="Novo centro" aria-label={`Novo centro em ${item.label}`} onClick={() => notify('info', `Novo centro em ${item.label}`)} />
                : null)} />
          </div>
          <div className="demo-panel">
            <div className="demo-panel-title">Permissões · {marcados.length} marcadas</div>
            <Tree items={PERMISSOES} checkable checked={marcados} onCheckedChange={setMarcados} defaultExpandAll aria-label="Permissões" />
          </div>
        </div>
      </Demo>
    </DocsSection>
  );
}

const VARIACOES = [
  { v: 'logo', nome: 'Escudo', quando: 'Abertura do app e operações que bloqueiam a tela' },
  { v: 'ring', nome: 'Anel', quando: 'O carregamento normal, de uso geral' },
  { v: 'dots', nome: 'Pontos', quando: 'Espera curta, dentro de uma linha' },
  { v: 'bars', nome: 'Barras', quando: 'Processando ou calculando' },
  { v: 'pulse', nome: 'Pulso', quando: 'Aguardando uma resposta de fora' },
  { v: 'orbit', nome: 'Órbita', quando: 'Sincronizando' },
  { v: 'linear', nome: 'Barra', quando: 'No topo de um cartão ou de uma lista' }
];
const OPCOES = VARIACOES.map(x => ({ value: x.v, label: x.nome }));

export function SecCarregamento() {
  const [variante, setVariante] = useState('logo');
  const [modal, setModal] = useState(false);
  const [local, setLocal] = useState(false);
  const [tela, setTela] = useState(false);
  const por = (set, ms = 2400) => { set(true); setTimeout(() => set(false), ms); };
  const prop = variante === 'logo' ? '' : ` variant="${variante}"`;
  return (
    <DocsSection id="carregamento" icon="loader-2" title="Carregamento"
      desc="Sete desenhos de carregamento, todos nas cores da marca: o escudo do Coritiba, o anel (o carregamento normal) e mais cinco variações. Qualquer um deles pode aparecer sozinho, num modal que desfoca o fundo, sobre um cartão ou na tela cheia de abertura.">
      <SubSection title="Variações">
        <Demo code={`<Loader />                          // anel: o carregamento normal
<Loader variant="dots" />
<Loader variant="bars" />
<Loader variant="pulse" />
<Loader variant="orbit" />
<Loader variant="linear" />          // barra indeterminada, ocupa a largura do container
<Loader variant="logo" />            // o escudo (o mesmo que <LogoLoader />)

// size: número em px, ou sm (18) | md (32) | lg (48)
// label="Buscando títulos..."  ·  row (rótulo ao lado)  ·  light (para fundos escuros)`}>
          <div className="demo-ld-grid">
            {VARIACOES.map(x => (
              <div key={x.v} className="demo-ld">
                <div className="demo-ld-art"><Loader variant={x.v} size={x.v === 'logo' ? 44 : 36} /></div>
                <strong>{x.nome}</strong>
                <code>{x.v}</code>
                <small>{x.quando}</small>
              </div>
            ))}
          </div>
        </Demo>
      </SubSection>
      <SubSection title="Tamanho, rótulo e fundo escuro">
        <Demo code={`<Loader size="sm" />  <Loader />  <Loader size="lg" />  <Loader size={64} />
<Loader variant="dots" row label="Buscando títulos..." />     // rótulo ao lado
<Loader variant="bars" label="Calculando..." />               // rótulo embaixo
<Loader light variant="orbit" />                              // em fundo escuro
<LogoLoader size={96} label="Carregando títulos..." />        // o escudo, com rótulo`}>
          <div className="demo-gap" style={{ alignItems: 'center', gap: 28 }}>
            <Loader size="sm" />
            <Loader />
            <Loader size="lg" />
            <Loader size={64} />
            <Loader variant="dots" row label="Buscando títulos..." />
            <Loader variant="bars" label="Calculando..." />
            <LogoLoader size={72} label="Carregando títulos..." />
          </div>
          <div className="demo-ld-dark">
            <Loader light />
            <Loader light variant="dots" />
            <Loader light variant="bars" />
            <Loader light variant="pulse" />
            <Loader light variant="orbit" />
            <LogoLoader light size={40} />
          </div>
        </Demo>
      </SubSection>
      <SubSection title="Modal de carregamento (fundo desfocado)">
        <Demo code={`// Com estado
<LoadingOverlay open={salvando}${prop} label="Salvando título..." />

// Sem estado, de qualquer lugar
const fechar = showLoading('Emitindo nota...'${variante === 'logo' ? '' : `, { variant: '${variante}' }`});
try { await emitir(); } finally { fechar(); }

// Só sobre um cartão (o pai precisa de position: relative)
<div style={{ position: 'relative' }}>
  <LoadingOverlay local open={recarregando}${prop} label="Atualizando..." />
  ...
</div>
// variant: logo (padrão) | ring | dots | bars | pulse | orbit | linear`}>
          <div className="demo-gap" style={{ marginBottom: 14 }}>
            <Segmented size="sm" value={variante} onChange={setVariante} options={OPCOES} aria-label="Variação do carregamento" />
          </div>
          <div className="demo-gap">
            <Button icon="device-floppy" onClick={() => por(setModal)}>Salvar (modal)</Button>
            <Button variant="secondary" icon="send" onClick={() => { const fechar = showLoading('Emitindo nota...', { variant: variante }); setTimeout(fechar, 2400); }}>
              Emitir com showLoading()
            </Button>
            <Button variant="ghost" onClick={() => por(setLocal)}>Atualizar o cartão</Button>
          </div>
          <div className="demo-panel" style={{ marginTop: 14, maxWidth: 420 }}>
            <LoadingOverlay local open={local} variant={variante} label="Atualizando..." />
            <div className="demo-panel-title">Resumo do mês</div>
            <KVList>
              <KV k="Recebido">R$ 1.280.400,00</KV>
              <KV k="A receber">R$ 742.100,00</KV>
              <KV k="Vencido">R$ 18.250,50</KV>
            </KVList>
          </div>
          <LoadingOverlay open={modal} variant={variante} label="Salvando título..." />
        </Demo>
      </SubSection>
      <SubSection title="Tela cheia de abertura (LoadingScreen)">
        <Demo code={`if (carregandoSessao) return <LoadingScreen${prop} label="Validando sua sessão..." />;`}>
          <div className="demo-gap">
            <Button size="sm" variant="secondary" icon="player-play" onClick={() => por(setTela, 2200)}>Mostrar por 2 segundos</Button>
          </div>
          <p className="docs-note">Usa a variação escolhida acima. O padrão é o escudo.</p>
          {tela && <LoadingScreen variant={variante} label="Validando sua sessão..." />}
        </Demo>
      </SubSection>
      <SubSection title="Qual usar">
        <table className="docs-table">
          <thead><tr><th>Situação</th><th>Use</th></tr></thead>
          <tbody>
            <tr><td>O app está abrindo ou validando a sessão</td><td><code>LoadingScreen</code> (escudo)</td></tr>
            <tr><td>Uma operação bloqueia a tela (salvar, emitir, importar)</td><td><code>LoadingOverlay</code> ou <code>showLoading()</code></td></tr>
            <tr><td>Um cartão ou painel recarrega</td><td><code>LoadingOverlay local</code>, ou <code>Loader variant="linear"</code> no topo dele</td></tr>
            <tr><td>Uma lista ou tabela ainda não chegou</td><td><code>Skeleton</code></td></tr>
            <tr><td>Espera dentro de uma linha de texto</td><td><code>Loader size="sm" row</code> ou <code>Spinner inline</code></td></tr>
            <tr><td>O botão que disparou a ação</td><td><code>Button loading</code></td></tr>
          </tbody>
        </table>
      </SubSection>
    </DocsSection>
  );
}
