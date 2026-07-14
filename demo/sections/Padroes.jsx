import {
  Breadcrumb, FilterPills, FilterPill, Progress, Empty, Spinner,
  KVList, KV, KVDivider, BadgeInside, Button,
  Timeline, TimelineItem, Hist, HistItem, Steps,
  CoxaChart
} from '../../src/index.js';
import { DocsSection, SubSection, Demo } from '../DocsBlocks.jsx';

export function SecGraficos() {
  return (
    <DocsSection id="graficos" icon="chart-line" title="Gráficos"
      desc="Chart.js v4 via CoxaChart: datasets sem cor recebem a paleta da marca (variações do verde primary, alternando tons escuros e claros) e o texto/grade seguem o tema claro/escuro automaticamente, inclusive ao alternar o dark mode.">
      <Demo code={`import { CoxaChart } from 'coxa-ui-react';

<CoxaChart type="line" height={260} data={{
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    { label: 'Visitantes', data: [120, 190, 150, 220, 260, 240], fill: true, tension: .35 }
  ]
}} />

{/* type: line | bar | doughnut | pie | polarArea | radar | scatter | bubble
   Misto: dataset com type próprio, ex. { type: 'line', ... } junto de barras */}`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22 }}>
          <div>
            <div className="docs-subsection-title" style={{ marginBottom: 8 }}>Linha</div>
            <CoxaChart type="line" height={240} data={{
              labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
              datasets: [
                { label: 'Visitantes', data: [120, 190, 150, 220, 260, 240], fill: true, tension: .35 },
                { label: 'Entregas', data: [80, 95, 110, 105, 140, 155], fill: true, tension: .35 }
              ]
            }} />
          </div>
          <div>
            <div className="docs-subsection-title" style={{ marginBottom: 8 }}>Barras</div>
            <CoxaChart type="bar" height={240} data={{
              labels: ['Sede', 'CT', 'Estádio'],
              datasets: [
                { label: 'Entradas', data: [340, 180, 520] },
                { label: 'Saídas', data: [320, 170, 490] }
              ]
            }} />
          </div>
          <div>
            <div className="docs-subsection-title" style={{ marginBottom: 8 }}>Rosca (doughnut)</div>
            <CoxaChart type="doughnut" height={240} data={{
              labels: ['Fornecedores', 'Terceirizados', 'Visitantes', 'Imprensa'],
              datasets: [{ data: [35, 25, 30, 10] }]
            }} />
          </div>
          <div>
            <div className="docs-subsection-title" style={{ marginBottom: 8 }}>Barras horizontais</div>
            <CoxaChart type="bar" height={240} options={{ indexAxis: 'y' }} data={{
              labels: ['Manuais', 'Processos', 'Políticas', 'Treinamentos'],
              datasets: [{ label: 'Documentos', data: [42, 28, 15, 9] }]
            }} />
          </div>
          <div>
            <div className="docs-subsection-title" style={{ marginBottom: 8 }}>Pizza (pie)</div>
            <CoxaChart type="pie" height={240} data={{
              labels: ['Sede', 'CT', 'Estádio', 'Loja'],
              datasets: [{ data: [40, 20, 30, 10] }]
            }} />
          </div>
          <div>
            <div className="docs-subsection-title" style={{ marginBottom: 8 }}>Área polar (polarArea)</div>
            <CoxaChart type="polarArea" height={240} data={{
              labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
              datasets: [{ data: [90, 120, 100, 140, 80] }]
            }} />
          </div>
          <div>
            <div className="docs-subsection-title" style={{ marginBottom: 8 }}>Radar</div>
            <CoxaChart type="radar" height={240} data={{
              labels: ['Documentação', 'Processos', 'Segurança', 'Atendimento', 'Agilidade'],
              datasets: [
                { label: 'Sede', data: [8, 7, 9, 6, 7] },
                { label: 'CT', data: [6, 8, 7, 9, 8] }
              ]
            }} />
          </div>
          <div>
            <div className="docs-subsection-title" style={{ marginBottom: 8 }}>Dispersão (scatter)</div>
            <CoxaChart type="scatter" height={240} data={{
              datasets: [{
                label: 'Visitas (hora × duração em min)',
                data: [
                  { x: 8, y: 35 }, { x: 9, y: 50 }, { x: 10, y: 22 }, { x: 11, y: 70 },
                  { x: 13, y: 45 }, { x: 14, y: 30 }, { x: 15, y: 60 }, { x: 16, y: 25 }, { x: 17, y: 40 }
                ]
              }]
            }} />
          </div>
          <div>
            <div className="docs-subsection-title" style={{ marginBottom: 8 }}>Bolhas (bubble)</div>
            <CoxaChart type="bubble" height={240} data={{
              datasets: [
                { label: 'Sede', data: [{ x: 10, y: 30, r: 12 }, { x: 14, y: 50, r: 8 }, { x: 16, y: 20, r: 15 }] },
                { label: 'CT', data: [{ x: 9, y: 45, r: 10 }, { x: 12, y: 25, r: 14 }, { x: 15, y: 60, r: 7 }] }
              ]
            }} />
          </div>
          <div>
            <div className="docs-subsection-title" style={{ marginBottom: 8 }}>Misto (barras + linha)</div>
            <CoxaChart type="bar" height={240} data={{
              labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
              datasets: [
                { label: 'Chamados', data: [65, 59, 80, 81, 56, 72] },
                { type: 'line', label: 'Resolvidos', data: [55, 55, 70, 78, 50, 68], tension: .35 }
              ]
            }} />
          </div>
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecBreadcrumb() {
  return (
    <DocsSection id="breadcrumb" icon="direction" title="Breadcrumb">
      <Demo code={`<Breadcrumb items={[
  { label: 'Início', href: '/' },
  { label: 'Financeiro', href: '/financeiro' },
  { label: 'Fluxo de Caixa' }
]} />`}>
        <Breadcrumb items={[
          { label: 'Início', href: '#' },
          { label: 'Financeiro', href: '#' },
          { label: 'Fluxo de Caixa' }
        ]} />
      </Demo>
    </DocsSection>
  );
}

export function SecFilterPills() {
  return (
    <DocsSection id="filter-pills" icon="filter" title="Filter Pills">
      <Demo code={`<FilterPills>
  <FilterPill active>Todos</FilterPill>
  <FilterPill icon="building">Sede</FilterPill>
  <FilterPill icon="run">CT</FilterPill>
</FilterPills>`}>
        <FilterPills>
          <FilterPill active>Todos</FilterPill>
          <FilterPill icon="building">Sede</FilterPill>
          <FilterPill icon="run">CT</FilterPill>
          <FilterPill icon="trophy">Estádio</FilterPill>
        </FilterPills>
      </Demo>
    </DocsSection>
  );
}

export function SecProgress() {
  return (
    <DocsSection id="progress" icon="trending-up" title="Progresso">
      <Demo code={`<Progress label="Documentação" value={75} />
<Progress label="Processos" value={42} variant="success" />
<Progress label="Pendências" value={88} variant="warning" />
<Progress value={60} striped lg />`}>
        <div style={{ maxWidth: 420 }}>
          <Progress label="Documentação" value={75} />
          <Progress label="Processos" value={42} variant="success" />
          <Progress label="Pendências" value={88} variant="warning" />
          <div style={{ marginTop: 10 }}><Progress value={60} striped lg /></div>
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecTimeline() {
  return (
    <DocsSection id="timeline" icon="timeline" title="Timeline / Histórico">
      <SubSection title="Timeline vertical">
        <Demo code={`<Timeline>
  <TimelineItem date="28 Jun 2026 · 14h30" title="Manual publicado">
    Aprovado e disponibilizado.
  </TimelineItem>
  <TimelineItem date="25 Jun 2026" title="Em revisão" variant="warn" />
</Timeline>`}>
          <Timeline>
            <TimelineItem date="28 Jun 2026 · 14h30" title="Manual publicado">Aprovado e disponibilizado.</TimelineItem>
            <TimelineItem date="25 Jun 2026" title="Em revisão" variant="warn" />
          </Timeline>
        </Demo>
      </SubSection>
      <SubSection title="Histórico (badge horizontal)">
        <Demo code={`<Hist>
  <HistItem badge="Entrada" title="João entrou pela Portaria 1"
    meta={['08h30', 'Sede']} />
</Hist>`}>
          <Hist>
            <HistItem badge="Entrada" title="João entrou pela Portaria 1" meta={['08h30', 'Sede']} />
            <HistItem badge="Saída" title="Maria saiu pela Portaria 2" meta={['17h45', 'CT']} />
          </Hist>
        </Demo>
      </SubSection>
      <SubSection title="Steps (wizard)">
        <Demo code={`<Steps items={['Localidade', 'Portaria', 'Visitante']} current={1} />`}>
          <Steps items={['Localidade', 'Portaria', 'Visitante']} current={1} />
        </Demo>
      </SubSection>
    </DocsSection>
  );
}

export function SecKV() {
  return (
    <DocsSection id="kv" icon="list" title="Lista Chave / Valor">
      <Demo code={`<KVList>
  <KV k="Nome">João da Silva</KV>
  <KV k="CPF">123.456.789-00</KV>
  <KVDivider />
  <KV k="Status"><BadgeInside /></KV>
</KVList>`}>
        <KVList>
          <KV k="Nome">João da Silva</KV>
          <KV k="CPF">123.456.789-00</KV>
          <KVDivider />
          <KV k="Status"><BadgeInside /></KV>
        </KVList>
      </Demo>
    </DocsSection>
  );
}

export function SecEmpty() {
  return (
    <DocsSection id="empty" icon="ghost" title="Estado Vazio">
      <Demo code={`<Empty icon="users" action={<Button size="sm" icon="plus">Registrar Entrada</Button>}>
  Nenhum visitante encontrado.
</Empty>`}>
        <Empty icon="users" action={<Button size="sm" icon="plus">Registrar Entrada</Button>}>
          Nenhum visitante encontrado.
        </Empty>
      </Demo>
    </DocsSection>
  );
}

export function SecSpinner() {
  return (
    <DocsSection id="spinner" icon="loader-2" title="Spinner">
      <Demo code={`<Spinner label="Carregando..." />
<Spinner inline />`}>
        <div className="demo-gap">
          <Spinner label="Carregando..." />
          <Spinner inline />
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecApi() {
  const rows = [
    ['useDarkMode()', '{ dark, toggle, setDark } — modo escuro persistente (coxaui-dark)'],
    ['useSidebar()', '{ collapsed, open, toggle, close } — estado da sidebar dentro de AppLayout'],
    ['coxaToast(icon, msg)', 'Toast padrão via SweetAlert2'],
    ["coxaConfirm({ title, text, icon, confirmText, color })", 'Confirmação — retorna Promise<boolean>'],
    ['COXA_CHART_COLORS', 'Paleta oficial dos gráficos (variações do verde primary)'],
    ['COXAUI_REACT_VERSION', 'Versão da biblioteca']
  ];
  return (
    <DocsSection id="api" icon="code" title="Hooks & Utilitários"
      desc="Tudo é exportado do pacote coxa-ui-react.">
      <table className="docs-table">
        <thead>
          <tr><th>Export</th><th>Descrição</th></tr>
        </thead>
        <tbody>
          {rows.map(([fn, desc]) => (
            <tr key={fn}><td><code>{fn}</code></td><td>{desc}</td></tr>
          ))}
        </tbody>
      </table>
    </DocsSection>
  );
}
