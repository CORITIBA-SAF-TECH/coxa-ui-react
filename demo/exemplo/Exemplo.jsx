import { useEffect, useState } from 'react';
import {
  StatCards, StatCard, AdmCard, CoxaChart, Timeline, TimelineItem, Badge, Button, HoldButton,
  Tabs, TableWrap, Table, Pagination, Drawer, ModalInfo, KVList, KV, KVDivider, Progress,
  Avatar, Skeleton, Steps, FormCard, FormRow, FormGroup, Toggle,
  Sensitive, CountUp, notify
} from '../../src/index.js';
import { useDemo } from '../DemoContext.jsx';

/* Telas de exemplo de um app do hub ("Contas a Receber"), montadas só com
   componentes da biblioteca. Todos os dados são fictícios. */

const GRAFICO = {
  labels: ['dez', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov'],
  datasets: [{ label: 'Recebido (R$ mil)', data: [733, 536, 620, 860, 804, 987, 931, 677, 1040, 1160, 1090, 1280], borderRadius: 6 }]
};
const GRAFICO_OPCOES = {
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { ticks: { callback: v => (v >= 1000 ? `${(v / 1000).toLocaleString('pt-BR')} mi` : `${v} mil`) } }
  }
};

const TITULOS = [
  { id: 'CR-2041', cli: 'Grupo Serra Azul',      frente: 'Patrocínio',      venc: '28/11/2026', valor: 'R$ 184.000,00', st: 'aberto',    doc: 'NF 4.512', cc: 'Comercial' },
  { id: 'CR-2040', cli: 'Alvorada Bebidas',      frente: 'Patrocínio',      venc: '25/11/2026', valor: 'R$ 92.000,00',  st: 'aberto',    doc: 'NF 4.508', cc: 'Comercial' },
  { id: 'CR-2039', cli: 'Rede Vila Verde',       frente: 'Licenciamento',   venc: '20/11/2026', valor: 'R$ 37.450,00',  st: 'aberto',    doc: 'NF 4.501', cc: 'Marketing' },
  { id: 'CR-2038', cli: 'Alvorada Bebidas',      frente: 'Patrocínio',      venc: '13/11/2026', valor: 'R$ 92.000,00',  st: 'liquidado', doc: 'NF 4.467', cc: 'Comercial' },
  { id: 'CR-2035', cli: 'Editora Três Rios',     frente: 'Licenciamento',   venc: '10/11/2026', valor: 'R$ 12.800,00',  st: 'liquidado', doc: 'NF 4.455', cc: 'Marketing' },
  { id: 'CR-2031', cli: 'Construtora Araucária', frente: 'Camarotes',       venc: '08/11/2026', valor: 'R$ 58.300,00',  st: 'atraso',    doc: 'NF 4.440', cc: 'Matchday' },
  { id: 'CR-2029', cli: 'Auto Posto Campina',    frente: 'Placas de campo', venc: '05/11/2026', valor: 'R$ 21.500,00',  st: 'atraso',    doc: 'NF 4.432', cc: 'Comercial' },
  { id: 'CR-2024', cli: 'Clínica Bom Retiro',    frente: 'Camarotes',       venc: '30/10/2026', valor: 'R$ 16.380,00',  st: 'atraso',    doc: 'NF 4.398', cc: 'Matchday' }
];
const SITUACAO = {
  aberto:    ['blue',   'Em aberto'],
  atraso:    ['orange', 'Em atraso'],
  liquidado: ['green',  'Liquidado']
};
const POR_PAGINA = 5;
const iniciais = nome => nome.split(' ').filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('').toUpperCase();
const conta = st => TITULOS.filter(t => st === 'todos' || t.st === st).length;

/* ── Painel ─────────────────────────────────────────────────────── */
export function TelaPainel() {
  return (
    <>
      <div className="pg-hdr">
        <h1><i className="ti ti-layout-dashboard" /> Painel</h1>
        <p>Recebimentos de novembro de 2026, atualizados há 4 minutos.</p>
      </div>

      <StatCards>
        <StatCard featured icon="cash" color="green" unit="R$" label="Recebido no mês"
          value={<Sensitive><CountUp value={1.28} decimals={2} suffix=" mi" /></Sensitive>}
          spark={[520, 610, 580, 760, 700, 880, 820, 990, 1280]} />
        <StatCard icon="calendar-due" color="blue" unit="R$" label="A receber em 30 dias"
          value={<Sensitive><CountUp value={742} suffix=" mil" /></Sensitive>}
          spark={[780, 720, 800, 750, 690, 760, 700, 770, 742]} />
        <StatCard icon="alert-triangle" color="orange" unit="R$" label="Em atraso"
          value={<Sensitive><CountUp value={96.2} decimals={1} suffix=" mil" /></Sensitive>}
          spark={[140, 132, 145, 118, 124, 101, 108, 90, 96]} />
        <StatCard icon="receipt" color="purple" label="Títulos em aberto"
          value={<CountUp value={148} />}
          spark={[122, 130, 126, 139, 134, 142, 138, 151, 148]} />
      </StatCards>

      <div className="ex-grid-2">
        <AdmCard icon="report-analytics" title="Recebimentos por mês"
          actions={<>
            <Badge color="green" icon="trending-up">+17% sobre outubro</Badge>
            <Button variant="ghost" size="sm" icon="download" onClick={() => notify('success', 'Exportação iniciada')}>Exportar</Button>
          </>}>
          <Sensitive as="div">
            <CoxaChart type="bar" height={230} data={GRAFICO} options={GRAFICO_OPCOES} />
          </Sensitive>
        </AdmCard>

        <AdmCard icon="history" title="Atividade recente">
          <Timeline>
            <TimelineItem date="13/11 · 09:42" title="Pagamento recebido">
              Alvorada Bebidas · CR-2038 · <Sensitive>R$ 92.000,00</Sensitive>
            </TimelineItem>
            <TimelineItem date="12/11 · 17:05" title="Lote enviado ao NetSuite">
              6 invoices aceitas, nenhuma rejeitada.
            </TimelineItem>
            <TimelineItem date="11/11 · 15:30" title="Título criado">
              Grupo Serra Azul · CR-2041
            </TimelineItem>
            <TimelineItem date="09/11 · 08:00" title="Título entrou em atraso" variant="warn">
              Construtora Araucária · CR-2031
            </TimelineItem>
          </Timeline>
        </AdmCard>
      </div>
    </>
  );
}

/* ── Títulos ────────────────────────────────────────────────────── */
export function TelaTitulos() {
  const { ir } = useDemo();
  const [aba, setAba] = useState('todos');
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [titulo, setTitulo] = useState(TITULOS[0]);   /* o do drawer; fica após fechar, para a saída animar com conteúdo */
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!carregando) return;
    const t = setTimeout(() => { setCarregando(false); notify('success', 'Lista atualizada'); }, 900);
    return () => clearTimeout(t);
  }, [carregando]);

  const filtrados = TITULOS.filter(t => aba === 'todos' || t.st === aba);
  const linhas = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);
  const abrir = t => { setTitulo(t); setAberto(true); };
  const fechar = () => setAberto(false);

  return (
    <>
      <div className="pg-hdr">
        <h1><i className="ti ti-receipt" /> Títulos</h1>
        <p>Clique em uma linha para abrir os detalhes.</p>
      </div>

      <Tabs
        active={aba}
        onChange={id => { setAba(id); setPagina(1); }}
        tabs={[
          { id: 'todos', label: `Todos (${conta('todos')})` },
          { id: 'aberto', label: `Em aberto (${conta('aberto')})` },
          { id: 'atraso', label: `Em atraso (${conta('atraso')})` },
          { id: 'liquidado', label: `Liquidados (${conta('liquidado')})` }
        ]}
      />

      <AdmCard icon="receipt" title="Títulos de novembro"
        actions={<>
          <Button variant="ghost" size="sm" icon="refresh" onClick={() => setCarregando(true)}>Atualizar</Button>
          <Button variant="ghost" size="sm" icon="download" onClick={() => notify('success', 'Exportação iniciada')}>Exportar</Button>
          <Button size="sm" icon="plus" onClick={() => ir('ex-novo')}>Novo título</Button>
        </>}>
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>Título</th><th>Cliente</th><th>Frente</th><th>Vencimento</th>
                <th className="text-right">Valor</th><th>Situação</th><th aria-label="Abrir" />
              </tr>
            </thead>
            <tbody>
              {carregando
                ? Array.from({ length: POR_PAGINA }).map((_, i) => (
                    <tr key={`sk${i}`}>
                      {[60, 150, 90, 80, 90, 70, 16].map((w, j) => <td key={j}><Skeleton width={w} height={12} /></td>)}
                    </tr>
                  ))
                : linhas.map(t => (
                    <tr key={t.id} className="ex-row" tabIndex={0}
                      onClick={() => abrir(t)}
                      onKeyDown={e => { if (e.key === 'Enter') abrir(t); }}>
                      <td><span className="text-mono fw-600">{t.id}</span></td>
                      <td><div className="ex-cli"><Avatar size="sm">{iniciais(t.cli)}</Avatar><span className="truncate">{t.cli}</span></div></td>
                      <td>{t.frente}</td>
                      <td>{t.venc}</td>
                      <td className="text-right fw-600"><Sensitive>{t.valor}</Sensitive></td>
                      <td><Badge color={SITUACAO[t.st][0]}>{SITUACAO[t.st][1]}</Badge></td>
                      <td className="text-right"><i className="ti ti-chevron-right ex-go" /></td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </TableWrap>
        <div className="mt-16">
          <Pagination page={pagina} total={filtrados.length} perPage={POR_PAGINA} onChange={setPagina} />
        </div>
      </AdmCard>

      <Drawer open={aberto} onClose={fechar} title={titulo.id} icon="receipt"
        actions={<>
          <Button variant="secondary" onClick={fechar}>Fechar</Button>
          <Button icon="check" onClick={() => { fechar(); notify('success', 'Pagamento registrado'); }}>Registrar pagamento</Button>
        </>}>
        <div className="ex-dt-top">
          <Avatar size="lg">{iniciais(titulo.cli)}</Avatar>
          <div>
            <div className="fw-700">{titulo.cli}</div>
            <div className="text-sm text-muted">{titulo.frente}</div>
          </div>
          <Badge color={SITUACAO[titulo.st][0]}>{SITUACAO[titulo.st][1]}</Badge>
        </div>
        <ModalInfo>
          <small>Valor do título</small>
          <strong className="ex-valor"><Sensitive>{titulo.valor}</Sensitive></strong>
        </ModalInfo>
        <KVList>
          <KV k="Vencimento">{titulo.venc}</KV>
          <KV k="Documento">{titulo.doc}</KV>
          <KV k="Centro de custo">{titulo.cc}</KV>
          <KVDivider />
          <KV k="NetSuite"><Badge color="green" icon="check" className="badge-sm">Invoice aceita</Badge></KV>
        </KVList>
        <div className="mt-24">
          <Progress label="Parcelas pagas (3 de 12)" value={25} />
        </div>
      </Drawer>
    </>
  );
}

/* ── Novo título ────────────────────────────────────────────────── */
export function TelaNovo() {
  const { ir } = useDemo();
  const [enviar, setEnviar] = useState(true);

  return (
    <>
      <div className="pg-hdr">
        <h1><i className="ti ti-file-plus" /> Novo título</h1>
        <p>Rascunho salvo automaticamente às 10:14.</p>
      </div>

      <Steps items={['Dados do título', 'Classificação', 'Revisão']} current={0} />

      <FormCard icon="file-plus" title="Dados do título">
        <FormRow>
          <FormGroup label="Cliente" required>
            <select defaultValue="Grupo Serra Azul">
              <option>Grupo Serra Azul</option><option>Alvorada Bebidas</option>
              <option>Rede Vila Verde</option><option>Construtora Araucária</option>
            </select>
          </FormGroup>
          <FormGroup label="Documento fiscal" hint="(opcional)">
            <input type="text" placeholder="NF 4.513" />
          </FormGroup>
        </FormRow>
        <FormRow cols={3}>
          <FormGroup label="Valor" required>
            <input type="text" inputMode="decimal" placeholder="R$ 0,00" />
          </FormGroup>
          <FormGroup label="Vencimento" required>
            <input type="date" defaultValue="2026-12-10" />
          </FormGroup>
          <FormGroup label="Centro de custo">
            <select defaultValue="Comercial"><option>Comercial</option><option>Marketing</option><option>Matchday</option></select>
          </FormGroup>
        </FormRow>
        <FormGroup label="Memo" fieldHint="Vai para o campo memo da invoice no NetSuite.">
          <input type="text" placeholder="Parcela 3 de 12 do contrato de patrocínio" />
        </FormGroup>
        <div className="mt-16">
          <Toggle checked={enviar} onChange={setEnviar} label="Enviar a invoice ao NetSuite ao salvar" />
        </div>

        <div className="ex-form-actions">
          <HoldButton icon="trash" onConfirm={() => { notify('warning', 'Rascunho excluído'); ir('ex-titulos'); }}>
            Segure para excluir
          </HoldButton>
          <span className="flex-1" />
          <Button variant="secondary" onClick={() => ir('ex-titulos')}>Cancelar</Button>
          <Button icon="device-floppy" onClick={() => {
            notify('success', enviar ? 'Título salvo e enviado ao NetSuite' : 'Título salvo');
            ir('ex-titulos');
          }}>Salvar título</Button>
        </div>
      </FormCard>
    </>
  );
}
