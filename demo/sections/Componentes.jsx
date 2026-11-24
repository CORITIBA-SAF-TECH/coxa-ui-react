import { useState } from 'react';
import {
  Button, ButtonGroup, IconButton,
  Badge, BadgeInside, BadgeOutside, Tag, TagCloud,
  Alert, Avatar, AvatarGroup,
  Cards, CardItem, AdmCard, LinkCards, LinkCard, StatCards, StatCard, CountUp,
  TableWrap, Table, SelBar, DataTable,
  FormCard, FormRow, FormGroup, FormActions, Toggle, ChkOpt, TipoOpts, TipoOpt, Combobox, MultiCombobox,
  Modal, ModalInfo, Tabs, TabPanel,
  Accordion, AccordionItem,
  Dropdown, DropdownItem, DropdownSep,
  coxaToast, coxaConfirm
} from '../../src/index.js';
import { DocsSection, SubSection, Demo } from '../DocsBlocks.jsx';

function BotaoCarregando() {
  const [salvando, setSalvando] = useState(false);
  const salvar = () => { setSalvando(true); setTimeout(() => setSalvando(false), 1800); };
  return (
    <Demo code={`<Button loading={salvando} onClick={salvar}>{salvando ? 'Salvando...' : 'Salvar'}</Button>
// loading troca o ícone por um spinner e desabilita o botão`}>
      <div className="demo-gap">
        <Button loading={salvando} onClick={salvar}>{salvando ? 'Salvando...' : 'Salvar'}</Button>
        <Button variant="secondary" loading>Enviando...</Button>
      </div>
    </Demo>
  );
}

export function SecBotoes() {
  return (
    <DocsSection id="botoes" icon="pointer" title="Botões"
      desc="Variantes de cor e tamanho. Danger é laranja: vermelho é proibido no projeto. Todo botão tem ícone: sem a prop icon, ele é escolhido pelo rótulo.">
      <SubSection title="Ícone padrão (pelo rótulo)">
        <Demo code={`// Sem a prop icon: o ícone vem do rótulo
<Button variant="secondary">Cancelar</Button>      // x
<Button>Salvar</Button>                            // check
<Button variant="secondary">Voltar</Button>        // arrow-left
<Button variant="danger">Excluir</Button>          // trash
<Button variant="ghost">Tentar de novo</Button>    // refresh
<Button variant="secondary">Detalhes</Button>      // eye

// Rótulo desconhecido: vale o ícone da variante
<Button variant="secondary">Conciliar</Button>     // chevron-right

// A prop icon sempre vence; icon={false} tira o ícone
<Button icon="rocket">Salvar</Button>
<Button variant="ghost" icon={false}>Sem ícone</Button>

// Rótulos do seu app (uma vez, no entry):
registerButtonIcons({ conciliar: 'arrows-exchange', 'baixar danfse': 'file-type-pdf' });`}>
          <div className="demo-gap">
            <Button variant="secondary">Cancelar</Button>
            <Button>Salvar</Button>
            <Button variant="secondary">Voltar</Button>
            <Button variant="danger">Excluir</Button>
            <Button variant="ghost">Tentar de novo</Button>
            <Button variant="secondary">Detalhes</Button>
            <Button variant="secondary">Conciliar</Button>
            <Button icon="rocket">Salvar</Button>
            <Button variant="ghost" icon={false}>Sem ícone</Button>
          </div>
          <p className="docs-note">
            Vale a primeira palavra conhecida do rótulo, sem acento nem maiúsculas: <code>Cancelar edição</code> usa o mesmo ícone de <code>Cancelar</code>.
            Um botão cujo conteúdo já começa por um ícone ou spinner próprio não ganha um segundo.
          </p>
        </Demo>
      </SubSection>
      <SubSection title="Carregando">
        <BotaoCarregando />
      </SubSection>
      <SubSection title="Variantes">
        <Demo code={`<Button icon="check">Primário</Button>
<Button variant="accent" icon="star">Accent</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="danger" icon="trash">Danger</Button>
<Button variant="warning" icon="alert-triangle">Warning</Button>
<Button variant="ghost">Ghost</Button>`}>
          <div className="demo-gap">
            <Button icon="check">Primário</Button>
            <Button variant="accent" icon="star">Accent</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="danger" icon="trash">Danger</Button>
            <Button variant="warning" icon="alert-triangle">Warning</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Demo>
      </SubSection>
      <SubSection title="Tamanhos">
        <Demo code={`<Button size="lg">Grande</Button>
<Button>Normal</Button>
<Button size="sm">Pequeno</Button>
<Button size="xs">Mínimo</Button>`}>
          <div className="demo-gap">
            <Button size="lg" icon="plus">Grande</Button>
            <Button icon="plus">Normal</Button>
            <Button size="sm" icon="plus">Pequeno</Button>
            <Button size="xs" icon="plus">Mínimo</Button>
          </div>
        </Demo>
      </SubSection>
      <SubSection title="Grupo e ícone">
        <Demo code={`<ButtonGroup>
  <Button variant="secondary" size="sm" icon="list">Lista</Button>
  <Button size="sm" icon="grid-dots">Grid</Button>
</ButtonGroup>
<IconButton icon="moon" onClick={...} />`}>
          <div className="demo-gap">
            <ButtonGroup>
              <Button variant="secondary" size="sm" icon="list">Lista</Button>
              <Button size="sm" icon="grid-dots">Grid</Button>
              <Button variant="secondary" size="sm" icon="table">Tabela</Button>
            </ButtonGroup>
            <IconButton icon="moon" />
          </div>
        </Demo>
      </SubSection>
    </DocsSection>
  );
}

export function SecBadges() {
  return (
    <DocsSection id="badges" icon="tag" title="Badges & Tags">
      <Demo code={`<Badge color="green" icon="circle-filled">Ativo</Badge>
<Badge color="blue">Informação</Badge>
<Badge color="orange" icon="clock">Pendente</Badge>
<Badge color="purple">Revisão</Badge>
<Badge color="gray">Arquivado</Badge>
<Badge color="accent">Destaque</Badge>
<BadgeInside />
<BadgeOutside />

<TagCloud>
  <Tag>financeiro</Tag>
  <Tag>rh</Tag>
</TagCloud>`}>
        <div className="demo-gap" style={{ marginBottom: 12 }}>
          <Badge color="green" icon="circle-filled">Ativo</Badge>
          <Badge color="blue">Informação</Badge>
          <Badge color="orange" icon="clock">Pendente</Badge>
          <Badge color="purple">Revisão</Badge>
          <Badge color="gray">Arquivado</Badge>
          <Badge color="accent">Destaque</Badge>
          <BadgeInside />
          <BadgeOutside />
        </div>
        <TagCloud>
          <Tag>financeiro</Tag>
          <Tag>rh</Tag>
          <Tag>ti</Tag>
        </TagCloud>
      </Demo>
    </DocsSection>
  );
}

export function SecAlertas() {
  return (
    <DocsSection id="alertas" icon="alert-circle" title="Alertas">
      <Demo code={`<Alert type="info" title="Informação">Mensagem informativa.</Alert>
<Alert type="success" title="Sucesso">Operação realizada.</Alert>
<Alert type="warn" title="Atenção">Verifique os dados.</Alert>
<Alert type="danger" title="Erro">Algo deu errado.</Alert>`}>
        <div className="demo-gap-v">
          <Alert type="info" title="Informação">Mensagem informativa.</Alert>
          <Alert type="success" title="Sucesso">Operação realizada.</Alert>
          <Alert type="warn" title="Atenção">Verifique os dados.</Alert>
          <Alert type="danger" title="Erro">Algo deu errado.</Alert>
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecFormularios() {
  const [notif, setNotif] = useState(true);
  const [restrita, setRestrita] = useState(false);
  const [fmt, setFmt] = useState('html');
  const [depto, setDepto] = useState('');
  const [tags, setTags] = useState(['Financeiro', 'Jurídico']);
  return (
    <DocsSection id="formularios" icon="forms" title="Formulários"
      desc="Inputs herdam o estilo do CSS do CoxaUI automaticamente (borda verde, foco primário, dark mode).">
      <SubSection title="Formulário completo">
        <Demo code={`<FormCard icon="user-plus" title="Novo Visitante">
  <FormRow>
    <FormGroup label="Nome Completo" required>
      <input type="text" placeholder="João da Silva" />
    </FormGroup>
    <FormGroup label="CPF">
      <input type="text" placeholder="000.000.000-00" />
    </FormGroup>
  </FormRow>
  <FormRow>
    <FormGroup label="Data" required><input type="date" /></FormGroup>
    <FormGroup label="Horário de Entrada" required><input type="time" /></FormGroup>
  </FormRow>
  <FormGroup label="Observações" hint="(opcional)" fieldHint="Máximo de 500 caracteres">
    <textarea placeholder="Informações adicionais..." rows={3} />
  </FormGroup>
  <FormActions>
    <Button variant="secondary">Cancelar</Button>
    <Button icon="check">Salvar</Button>
  </FormActions>
</FormCard>`}>
          <FormCard icon="user-plus" title="Novo Visitante">
            <FormRow>
              <FormGroup label="Nome Completo" required>
                <input type="text" placeholder="João da Silva" />
              </FormGroup>
              <FormGroup label="CPF">
                <input type="text" placeholder="000.000.000-00" />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup label="Data" required><input type="date" /></FormGroup>
              <FormGroup label="Horário de Entrada" required><input type="time" defaultValue="08:30" /></FormGroup>
            </FormRow>
            <FormGroup label="Observações" hint="(opcional)" fieldHint="Máximo de 500 caracteres">
              <textarea placeholder="Informações adicionais..." rows={3} />
            </FormGroup>
            <FormActions>
              <Button variant="secondary">Cancelar</Button>
              <Button icon="check">Salvar</Button>
            </FormActions>
          </FormCard>
        </Demo>
      </SubSection>

      <SubSection title="Textarea">
        <Demo code={`{/* O <textarea> é estilizado automaticamente: sem precisar de classe.
    Redimensionável na vertical; herda foco verde e dark mode. */}
<FormGroup label="Descrição" fieldHint="Suporta múltiplas linhas">
  <textarea placeholder="Escreva aqui..." rows={4} />
</FormGroup>`}>
          <div style={{ maxWidth: 460 }}>
            <FormGroup label="Descrição" fieldHint="Suporta múltiplas linhas">
              <textarea placeholder="Escreva aqui..." rows={4} defaultValue={''} />
            </FormGroup>
          </div>
        </Demo>
      </SubSection>

      <SubSection title="Select com busca (Combobox)">
        <Demo code={`const [depto, setDepto] = useState('');

<Combobox
  options={['Financeiro', 'Recursos Humanos', 'Tecnologia da Informação']}
  value={depto}
  onChange={setDepto}
  name="departamento"
/>

{/* valor diferente do rótulo: */}
<Combobox options={[{ label: 'Financeiro', value: 12 }]} ... />`}>
          <div style={{ maxWidth: 340 }}>
            <FormGroup label="Departamento">
              <Combobox
                options={['Financeiro', 'Recursos Humanos', 'Tecnologia da Informação', 'Jurídico', 'Comunicação & Marketing', 'Futebol Base', 'Futebol Profissional']}
                value={depto}
                onChange={setDepto}
                name="departamento"
              />
            </FormGroup>
          </div>
        </Demo>
      </SubSection>

      <SubSection title="Seleção múltipla (MultiCombobox)">
        <Demo code={`const [tags, setTags] = useState(['financeiro']);

<MultiCombobox
  options={['financeiro', 'rh', 'ti', 'jurídico', 'marketing']}
  value={tags}       // array de valores
  onChange={setTags}
  name="tags"        // gera um input hidden por valor (forms)
/>`}>
          <div style={{ maxWidth: 420 }}>
            <FormGroup label="Categorias" fieldHint="Clique para adicionar; ✕ ou Backspace para remover">
              <MultiCombobox
                options={['Financeiro', 'Recursos Humanos', 'Tecnologia da Informação', 'Jurídico', 'Comunicação & Marketing', 'Futebol Base', 'Futebol Profissional']}
                value={tags}
                onChange={setTags}
                name="categorias"
              />
            </FormGroup>
          </div>
        </Demo>
      </SubSection>

      <SubSection title="Toggle, Checkbox e Pills">
        <Demo code={`<Toggle checked={notif} onChange={setNotif} label="Receber notificações" />
<ChkOpt checked={ok} onChange={setOk}>Autorizado para área restrita</ChkOpt>

<TipoOpts>
  <TipoOpt icon="file-text" name="fmt" checked={fmt==='html'} onChange={() => setFmt('html')}>Texto HTML</TipoOpt>
  <TipoOpt icon="file-type-pdf" name="fmt" checked={fmt==='pdf'} onChange={() => setFmt('pdf')}>PDF</TipoOpt>
</TipoOpts>`}>
          <div className="demo-gap-v">
            <Toggle checked={notif} onChange={setNotif} label="Receber notificações" />
            <ChkOpt checked={restrita} onChange={setRestrita}>Autorizado para área restrita</ChkOpt>
            <TipoOpts>
              <TipoOpt icon="file-text" name="fmt-demo" checked={fmt === 'html'} onChange={() => setFmt('html')}>Texto HTML</TipoOpt>
              <TipoOpt icon="file-type-pdf" name="fmt-demo" checked={fmt === 'pdf'} onChange={() => setFmt('pdf')}>PDF</TipoOpt>
              <TipoOpt icon="sitemap" name="fmt-demo" checked={fmt === 'bpmn'} onChange={() => setFmt('bpmn')}>BPMN</TipoOpt>
            </TipoOpts>
          </div>
        </Demo>
      </SubSection>
    </DocsSection>
  );
}

export function SecCards() {
  return (
    <DocsSection id="cards" icon="layout-cards" title="Cards">
      <SubSection title="Card de conteúdo">
        <Demo code={`<Cards>
  <CardItem
    section="Financeiro"
    title="Manual de Fluxo de Caixa"
    subtitle="Como registrar entradas e saídas."
    meta={<span><strong>Atualizado:</strong> 28 jun 2026</span>}
    tags={<><Tag>financeiro</Tag><Tag>manual</Tag></>}
  />
</Cards>`}>
          <Cards>
            <CardItem
              section="Financeiro"
              title="Manual de Fluxo de Caixa"
              subtitle="Como registrar entradas e saídas no sistema."
              meta={<span><strong>Atualizado:</strong> 28 jun 2026</span>}
              tags={<><Tag>financeiro</Tag><Tag>manual</Tag></>}
            />
            <CardItem
              section="RH"
              title="Processo de Admissão"
              subtitle="Fluxo completo de contratação."
              meta={<span><strong>Atualizado:</strong> 25 jun 2026</span>}
              tags={<Tag>rh</Tag>}
            />
          </Cards>
        </Demo>
      </SubSection>
      <SubSection title="Card administrativo">
        <Demo code={`<AdmCard icon="users" title="Visitantes"
  actions={<Button size="sm" icon="plus">Novo</Button>}>
  {/* conteúdo (tabela, lista...) */}
</AdmCard>`}>
          <AdmCard icon="users" title="Visitantes" actions={<Button size="sm" icon="plus">Novo</Button>}>
            <p style={{ fontSize: '.86rem', color: 'var(--text2)' }}>Conteúdo do card (tabela, lista, formulário...).</p>
          </AdmCard>
        </Demo>
      </SubSection>
      <SubSection title="Link cards (atalhos)">
        <Demo code={`<LinkCards>
  <LinkCard icon="brand-whatsapp">WhatsApp</LinkCard>
  <LinkCard icon="mail">E-mail RH</LinkCard>
</LinkCards>`}>
          <LinkCards>
            <LinkCard icon="brand-whatsapp">WhatsApp</LinkCard>
            <LinkCard icon="mail">E-mail RH</LinkCard>
            <LinkCard icon="building-bank">Banco</LinkCard>
            <LinkCard icon="chart-bar">BI Reports</LinkCard>
          </LinkCards>
        </Demo>
      </SubSection>
    </DocsSection>
  );
}

const TBL_ROWS = [
  { id: 1, nome: 'João da Silva', doc: '123.456.789-00', loc: 'Sede', status: 'inside', entrada: '2h30min' },
  { id: 2, nome: 'Maria Oliveira', loc: 'CT', status: 'pend', entrada: '5h12min', pend: true },
  { id: 3, nome: 'Ana Souza', loc: 'Sede', status: 'inside', entrada: '0h45min' },
  { id: 4, nome: 'Carlos Pereira', loc: 'Estádio', status: 'outside', del: true }
];

const DT_DATA = Array.from({ length: 14 }).map((_, i) => ({
  id: i + 1,
  nome: ['João Silva', 'Maria Oliveira', 'Ana Souza', 'Carlos Pereira', 'Bruno Lima', 'Elisa Rocha', 'Fábio Costa', 'Gabriela Dias'][i % 8],
  loc: ['Sede', 'CT', 'Estádio'][i % 3],
  tipo: ['Fornecedor', 'Terceirizado', 'Visitante'][i % 3],
  visitas: (i * 5 % 30) + 1
}));
const DT_COLS = [
  { key: 'nome', label: 'Nome', render: r => <strong>{r.nome}</strong> },
  { key: 'loc', label: 'Localidade', render: r => <span className="badge-loc">{r.loc}</span>, exportValue: r => r.loc },
  { key: 'tipo', label: 'Tipo' },
  { key: 'visitas', label: 'Visitas' }
];

/* Dados da demonstração do filtro no cabeçalho */
const FLT_DATA = [
  { id: 1, cliente: 'Arena Eventos Ltda', centro: 'Comercial', vencimento: '2026-11-28', valor: 18400, situacao: 'Aberto' },
  { id: 2, cliente: 'Loja Alto da Glória', centro: 'Varejo', vencimento: '2026-11-15', valor: 7250.5, situacao: 'Vencido' },
  { id: 3, cliente: 'Patrocínio Master S.A.', centro: 'Comercial', vencimento: '2026-12-10', valor: 250000, situacao: 'Aberto' },
  { id: 4, cliente: 'Camarote 1909', centro: 'Estádio', vencimento: '2026-10-30', valor: 12800, situacao: 'Recebido' },
  { id: 5, cliente: 'Escolinha Coxa Kids', centro: 'Base', vencimento: '2026-11-05', valor: 3900, situacao: 'Recebido' },
  { id: 6, cliente: 'Sócio Coxa Empresas', centro: 'Varejo', vencimento: '2026-12-01', valor: 46200, situacao: 'Aberto' },
  { id: 7, cliente: 'Buffet do Estádio', centro: 'Estádio', vencimento: '2026-11-20', valor: 9100, situacao: 'Vencido' },
  { id: 8, cliente: 'Licenciados Paraná', centro: 'Comercial', vencimento: '2026-12-18', valor: 31750, situacao: 'Aberto' }
];
const FLT_COR = { Aberto: 'blue', Vencido: 'orange', Recebido: 'green' };
const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const FLT_COLS = [
  { key: 'cliente', label: 'Cliente', render: r => <strong>{r.cliente}</strong> },
  { key: 'centro', label: 'Centro de custo', filter: 'select' },
  { key: 'vencimento', label: 'Vencimento', filter: 'date', render: r => r.vencimento.split('-').reverse().join('/') },
  { key: 'valor', label: 'Valor', filter: false, render: r => brl(r.valor), className: 'text-right', thClassName: 'text-right' },
  { key: 'situacao', label: 'Situação', filter: 'select', render: r => <Badge color={FLT_COR[r.situacao]}>{r.situacao}</Badge> }
];

export function SecTabelas() {
  const [sel, setSel] = useState([]);
  const selectable = TBL_ROWS.filter(r => !r.del);
  const allChecked = selectable.length > 0 && selectable.every(r => sel.includes(r.id));
  const toggle = id => setSel(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]));
  const toggleAll = () => setSel(allChecked ? [] : selectable.map(r => r.id));

  return (
    <DocsSection id="tabelas" icon="table" title="Tabelas"
      desc="DataTable é o padrão: ordenação, busca, filtro por coluna no cabeçalho, colunas visíveis, exportação CSV (com escolha de colunas) e paginação já embutidas. Para casos específicos, componha manualmente com TableWrap/Table.">
      <SubSection title="Padrão: DataTable">
        <p style={{ margin: '4px 0 10px', fontSize: '.84rem', color: 'var(--text2)' }}>
          Clique no cabeçalho para ordenar; use o menu <strong>Colunas</strong> para mostrar/ocultar e
          <strong> Exportar CSV</strong> para escolher as colunas e baixar. Tudo padrão, sem configurar.
        </p>
        <Demo code={`import { DataTable } from 'coxa-ui-react';

const columns = [
  { key: 'nome', label: 'Nome', render: r => <strong>{r.nome}</strong> },
  { key: 'loc', label: 'Localidade', render: r => <span className="badge-loc">{r.loc}</span> },
  { key: 'tipo', label: 'Tipo' },
  { key: 'visitas', label: 'Visitas' },
];

<DataTable columns={columns} data={rows} perPage={6} searchable exportName="visitantes.csv" />
// por coluna: sortable={false}, exportable={false}, render/sortValue/exportValue`}>
          <DataTable columns={DT_COLS} data={DT_DATA} perPage={6} searchable exportName="visitantes.csv" />
        </Demo>
      </SubSection>

      <SubSection title="Filtro no cabeçalho">
        <p style={{ margin: '4px 0 10px', fontSize: '.84rem', color: 'var(--text2)' }}>
          Uma segunda linha do cabeçalho, com um campo por coluna: texto ("contém", sem acento nem caixa),
          lista com os valores que a tabela tem, ou período. Vale junto com a ordenação, a paginação e o CSV.
        </p>
        <Demo code={`const columns = [
  { key: 'cliente', label: 'Cliente' },                              // texto (padrão com columnFilters)
  { key: 'centro', label: 'Centro de custo', filter: 'select' },     // lista com os valores da tabela
  { key: 'vencimento', label: 'Vencimento', filter: 'date' },        // período De/Até (AAAA-MM-DD)
  { key: 'valor', label: 'Valor', filter: false },                   // sem filtro
  { key: 'situacao', label: 'Situação', filter: 'select', render: r => <Badge>...</Badge> }
];

<DataTable columnFilters columns={columns} data={rows} perPage={5} />

// Sem columnFilters, só filtram as colunas que declararem filter.
// Quando a célula mostra algo diferente do valor bruto:
//   filter: { type: 'select', value: row => row.status.nome, label: v => v.toUpperCase(), options: [...] }
// initialFilters={{ situacao: 'Aberto' }} já abre filtrado; onFiltersChange={f => ...} avisa o app.`}>
          <DataTable columnFilters columns={FLT_COLS} data={FLT_DATA} perPage={5} exportName="titulos.csv" />
        </Demo>
      </SubSection>

      <SubSection title="Composição manual (seleção em lote)">
        <p style={{ margin: '4px 0 10px', fontSize: '.84rem', color: 'var(--text2)' }}>
          Para seleção em lote, ações por linha e linhas com destaque (<code>.row-pend</code> / <code>.row-del</code>),
          monte a tabela com <code>TableWrap</code>/<code>Table</code> e use <code>SelBar</code>.
        </p>
        <Demo code={`const [sel, setSel] = useState([]);
const toggle = id => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

<TableWrap>
  <Table>
    <thead><tr>
      <th className="sel-chk-cell"><input type="checkbox" className="sel-chk" checked={allChecked} onChange={toggleAll} /></th>
      <th>Nome</th><th>Localidade</th><th>Status</th><th>Ações</th>
    </tr></thead>
    <tbody>{rows.map(r => (
      <tr key={r.id} className={r.pend ? 'row-pend' : r.del ? 'row-del' : ''}>
        <td className="sel-chk-cell"><input type="checkbox" className="sel-chk"
          checked={sel.includes(r.id)} onChange={() => toggle(r.id)} disabled={r.del} /></td>
        <td><strong>{r.nome}</strong></td>
        <td><span className="badge-loc">{r.loc}</span></td>
        <td><BadgeInside /></td>
        <td><Dropdown icon="dots-vertical">
          <DropdownItem icon="eye">Ver</DropdownItem>
          <DropdownItem icon="trash" danger>Excluir</DropdownItem>
        </Dropdown></td>
      </tr>
    ))}</tbody>
  </Table>
</TableWrap>
<SelBar count={sel.length} onClear={() => setSel([])}>
  <Button size="sm" variant="accent" icon="logout">Saída em lote</Button>
</SelBar>`}>
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th className="sel-chk-cell"><input type="checkbox" className="sel-chk" checked={allChecked} onChange={toggleAll} /></th>
                  <th>Nome</th>
                  <th>Localidade</th>
                  <th>Status</th>
                  <th>Entrada</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {TBL_ROWS.map(r => (
                  <tr key={r.id} className={r.pend ? 'row-pend' : r.del ? 'row-del' : ''}>
                    <td className="sel-chk-cell">
                      <input type="checkbox" className="sel-chk" checked={sel.includes(r.id)}
                        onChange={() => toggle(r.id)} disabled={r.del} />
                    </td>
                    <td>
                      <strong>{r.nome}</strong>
                      {r.doc && <><br /><small style={{ color: 'var(--text3)' }}>CPF: {r.doc}</small></>}
                    </td>
                    <td><span className="badge-loc">{r.loc}</span></td>
                    <td>
                      {r.status === 'inside' && <BadgeInside />}
                      {r.status === 'pend' && <span className="status-pend"><i className="ti ti-clock" /> Pendente</span>}
                      {r.status === 'outside' && <BadgeOutside />}
                    </td>
                    <td><span className={`elapsed ${r.pend ? 'long' : ''}`.trim()}>{r.entrada || ''}</span></td>
                    <td>
                      {!r.del && (
                        <Dropdown label="" icon="dots-vertical">
                          <DropdownItem icon="eye" onClick={() => coxaToast('success', `Ver: ${r.nome}`)}>Ver detalhes</DropdownItem>
                          <DropdownItem icon="edit">Editar</DropdownItem>
                          <DropdownSep />
                          <DropdownItem icon="trash" danger>Excluir</DropdownItem>
                        </Dropdown>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
          <SelBar count={sel.length} onClear={() => setSel([])}>
            <Button size="sm" variant="accent" icon="logout" onClick={() => coxaToast('success', `${sel.length} em lote`)}>Saída em lote</Button>
          </SelBar>
        </Demo>
      </SubSection>
    </DocsSection>
  );
}

export function SecStatCards() {
  return (
    <DocsSection id="stat-cards" icon="chart-bar" title="Stat Cards"
      desc="Cards de métricas para dashboards. Cores: green, blue, orange, purple, red, yellow.">
      <Demo code={`<StatCards>
  <StatCard icon="users" color="green" value="42" label="Visitantes Presentes" />
  <StatCard icon="login" color="blue" value="128" label="Entradas Hoje" />
  <StatCard icon="alert-circle" color="orange" value="3" label="Ocorrências" />
  <StatCard icon="file-text" color="purple" value="87" label="Documentos" />
</StatCards>`}>
        <StatCards>
          <StatCard icon="users" color="green" value="42" label="Visitantes Presentes" />
          <StatCard icon="login" color="blue" value="128" label="Entradas Hoje" />
          <StatCard icon="alert-circle" color="orange" value="3" label="Ocorrências" />
          <StatCard icon="file-text" color="purple" value="87" label="Documentos" />
        </StatCards>
      </Demo>
      <SubSection title="Destaque, unidade e tendência (1.2)">
        <Demo code={`<StatCards>
  <StatCard featured icon="cash" color="green" unit="R$"
    value={<CountUp value={1.28} decimals={2} suffix=" mi" />}
    label="Recebido no mês" spark={[520, 610, 580, 760, 700, 880, 820, 990, 1280]} />
  <StatCard icon="calendar-due" color="blue" unit="R$" value="742 mil"
    label="A receber em 30 dias" spark={[780, 720, 800, 750, 690, 760, 700, 770, 742]} />
  <StatCard icon="receipt" color="purple" value="148" label="Títulos em aberto" />
</StatCards>
// unit é o prefixo pequeno; featured destaca um cartão; spark desenha o minigráfico`}>
          <StatCards>
            <StatCard featured icon="cash" color="green" unit="R$"
              value={<CountUp value={1.28} decimals={2} suffix=" mi" />}
              label="Recebido no mês" spark={[520, 610, 580, 760, 700, 880, 820, 990, 1280]} />
            <StatCard icon="calendar-due" color="blue" unit="R$" value="742 mil"
              label="A receber em 30 dias" spark={[780, 720, 800, 750, 690, 760, 700, 770, 742]} />
            <StatCard icon="receipt" color="purple" value="148" label="Títulos em aberto" />
          </StatCards>
        </Demo>
      </SubSection>
    </DocsSection>
  );
}

export function SecModal() {
  const [aberto, setAberto] = useState(false);
  /* undefined = fechado · null = tamanho padrão · 'xs'|'sm'|'lg'|'xl'|'full' */
  const [tamanho, setTamanho] = useState(undefined);
  return (
    <DocsSection id="modal" icon="square" title="Modal"
      desc="Componente controlado: open + onClose. Fecha ao clicar no overlay. Toast e Confirm via SweetAlert2.">
      <Demo code={`const [aberto, setAberto] = useState(false);

<Button onClick={() => setAberto(true)}>Abrir Modal</Button>

<Modal open={aberto} onClose={() => setAberto(false)}
  title="Registrar Saída" icon="logout"
  actions={<>
    <Button variant="secondary" onClick={() => setAberto(false)}>Cancelar</Button>
    <Button icon="logout">Confirmar Saída</Button>
  </>}>
  <ModalInfo><strong>João da Silva</strong><small>Fornecedor · Sede</small></ModalInfo>
</Modal>

{/* Toast e confirmação */}
coxaToast('success', 'Operação realizada!');
const ok = await coxaConfirm({ title: 'Excluir?', confirmText: 'Excluir', color: '#ea580c' });`}>
        <div className="demo-gap">
          <Button icon="eye" onClick={() => setAberto(true)}>Abrir Modal</Button>
          <Button variant="accent" size="sm" icon="bell" onClick={() => coxaToast('success', 'Operação realizada com sucesso!')}>Toast</Button>
          <Button variant="danger" size="sm" icon="trash" onClick={async () => {
            const ok = await coxaConfirm({ title: 'Confirmar exclusão', text: 'Esta ação não pode ser desfeita.', confirmText: 'Excluir', color: '#ea580c' });
            if (ok) coxaToast('success', 'Excluído!');
          }}>Confirm Dialog</Button>
        </div>
      </Demo>
      <SubSection title="Tamanhos">
        <Demo code={`<Modal size="xs" ... />   {/* 300px */}
<Modal size="sm" ... />   {/* 380px */}
<Modal ... />             {/* padrão 480px */}
<Modal size="lg" ... />   {/* 680px */}
<Modal size="xl" ... />   {/* 920px */}
<Modal size="full" ... /> {/* 96vw */}`}>
          <div className="demo-gap">
            {['xs', 'sm', null, 'lg', 'xl', 'full'].map(t => (
              <Button key={t ?? 'padrao'} variant="secondary" size="sm" onClick={() => { setTamanho(t); }}>
                {t ? t.toUpperCase() : 'Padrão'}
              </Button>
            ))}
          </div>
        </Demo>
      </SubSection>

      <Modal open={aberto} onClose={() => setAberto(false)} title="Registrar Saída" icon="logout"
        actions={<>
          <Button variant="secondary" onClick={() => setAberto(false)}>Cancelar</Button>
          <Button icon="logout" onClick={() => { setAberto(false); coxaToast('success', 'Saída registrada!'); }}>Confirmar Saída</Button>
        </>}>
        <ModalInfo><strong>João da Silva</strong><small>Fornecedor · Sede</small></ModalInfo>
      </Modal>

      <Modal open={tamanho !== undefined} onClose={() => setTamanho(undefined)} size={tamanho || undefined}
        title={`Modal ${tamanho ? tamanho.toUpperCase() : 'padrão'}`} icon="arrows-maximize"
        actions={<Button variant="secondary" onClick={() => setTamanho(undefined)}>Fechar</Button>}>
        <p style={{ fontSize: '.88rem', color: 'var(--text2)' }}>
          Este modal usa <code>size="{tamanho || 'padrão'}"</code>.
        </p>
      </Modal>
    </DocsSection>
  );
}

export function SecTabs() {
  const [aba, setAba] = useState('todos');
  return (
    <DocsSection id="tabs" icon="layout-columns" title="Abas (Tabs)">
      <Demo code={`const [aba, setAba] = useState('todos');

<Tabs tabs={[{ id: 'todos', label: 'Todos' }, { id: 'ativos', label: 'Ativos' }]}
      active={aba} onChange={setAba} />
<TabPanel show={aba === 'todos'}>Todos os registros.</TabPanel>
<TabPanel show={aba === 'ativos'}>Apenas ativos.</TabPanel>`}>
        <Tabs tabs={[{ id: 'todos', label: 'Todos' }, { id: 'ativos', label: 'Ativos' }, { id: 'arquivados', label: 'Arquivados' }]}
          active={aba} onChange={setAba} />
        <TabPanel show={aba === 'todos'}>Todos os registros.</TabPanel>
        <TabPanel show={aba === 'ativos'}>Apenas os ativos.</TabPanel>
        <TabPanel show={aba === 'arquivados'}>Arquivados.</TabPanel>
      </Demo>
    </DocsSection>
  );
}

export function SecAccordion() {
  return (
    <DocsSection id="accordion" icon="list-details" title="Accordion">
      <Demo code={`<Accordion>
  <AccordionItem title="Como registrar uma entrada?" defaultOpen>
    Use o menu Operações → Registrar Entrada.
  </AccordionItem>
  <AccordionItem title="Como funciona o modo escuro?">
    Clique na lua no header.
  </AccordionItem>
</Accordion>`}>
        <Accordion>
          <AccordionItem title="Como registrar uma entrada?" defaultOpen>
            Use o menu Operações → Registrar Entrada.
          </AccordionItem>
          <AccordionItem title="Como funciona o modo escuro?">
            Clique na lua no header: a preferência fica salva no navegador.
          </AccordionItem>
        </Accordion>
      </Demo>
    </DocsSection>
  );
}

export function SecDropdown() {
  return (
    <DocsSection id="dropdown" icon="chevron-down" title="Dropdown"
      desc="Fecha ao clicar fora ou ao escolher um item. Hover segue o padrão verde do design system.">
      <Demo code={`<Dropdown label="Ações">
  <DropdownItem icon="eye" onClick={...}>Visualizar</DropdownItem>
  <DropdownItem icon="edit">Editar</DropdownItem>
  <DropdownSep />
  <DropdownItem icon="trash" danger>Excluir</DropdownItem>
</Dropdown>`}>
        <Dropdown label="Ações">
          <DropdownItem icon="eye" onClick={() => coxaToast('success', 'Visualizar!')}>Visualizar</DropdownItem>
          <DropdownItem icon="edit">Editar</DropdownItem>
          <DropdownSep />
          <DropdownItem icon="trash" danger>Excluir</DropdownItem>
        </Dropdown>
      </Demo>
    </DocsSection>
  );
}

export function SecAvatar() {
  return (
    <DocsSection id="avatar" icon="user-circle" title="Avatar">
      <Demo code={`<Avatar size="xl">AB</Avatar>
<Avatar size="lg">JD</Avatar>
<Avatar>MO</Avatar>
<Avatar size="sm">CP</Avatar>

<AvatarGroup>
  <Avatar title="João">JD</Avatar>
  <Avatar title="Maria">MO</Avatar>
</AvatarGroup>`}>
        <div className="demo-gap">
          <Avatar size="xl">AB</Avatar>
          <Avatar size="lg">JD</Avatar>
          <Avatar>MO</Avatar>
          <Avatar size="sm">CP</Avatar>
          <AvatarGroup>
            <Avatar title="João">JD</Avatar>
            <Avatar title="Maria">MO</Avatar>
            <Avatar style={{ background: 'var(--surface3)', color: 'var(--text3)', fontSize: '.72rem' }}>+4</Avatar>
          </AvatarGroup>
        </div>
      </Demo>
    </DocsSection>
  );
}
