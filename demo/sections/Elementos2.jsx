import { useState } from 'react';
import {
  Button, Badge, ChkOpt, FormRow, FormGroup, KVList, KV, DataTable, Footer, Segmented,
  Popover, FilterBar, FilterField, DateRange, AttachmentList, Wizard, Steps, Changelog,
  CommentList, Comment, CommentBox, notify, formatBRL
} from '../../src/index.js';
import { DocsSection, SubSection, Demo } from '../DocsBlocks.jsx';

const TITULOS = [
  { id: 1, cliente: 'Arena Eventos Ltda', vencimento: '2026-11-28', valor: 18400, situacao: 'Aberto', parcelas: 3, contato: 'financeiro@arenaeventos.com.br' },
  { id: 2, cliente: 'Loja Alto da Glória', vencimento: '2026-11-15', valor: 7250.5, situacao: 'Vencido', parcelas: 1, contato: 'contato@lojaaltodagloria.com.br' },
  { id: 3, cliente: 'Patrocínio Master S.A.', vencimento: '2026-12-10', valor: 250000, situacao: 'Aberto', parcelas: 12, contato: 'pagamentos@patrociniomaster.com.br' },
  { id: 4, cliente: 'Camarote 1909', vencimento: '2026-10-30', valor: 12800, situacao: 'Recebido', parcelas: 2, contato: 'adm@camarote1909.com.br' }
];
const COR = { Aberto: 'blue', Vencido: 'orange', Recebido: 'green' };

export function SecFiltros() {
  const [de, setDe] = useState('2026-11-01');
  const [ate, setAte] = useState('2026-11-30');
  const [situacao, setSituacao] = useState('');
  const [soVencidos, setSoVencidos] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [linhas, setLinhas] = useState(TITULOS);

  function buscar() {
    setCarregando(true);
    setTimeout(() => {
      setLinhas(TITULOS.filter(t =>
        (!situacao || t.situacao === situacao) && (!soVencidos || t.situacao === 'Vencido')
        && (!de || t.vencimento >= de) && (!ate || t.vencimento <= ate)));
      setCarregando(false);
    }, 700);
  }
  function limpar() { setDe(''); setAte(''); setSituacao(''); setSoVencidos(false); setLinhas(TITULOS); }

  const colunas = [
    { key: 'cliente', label: 'Cliente', render: (r, d) => <button type="button" className="dt-link" onClick={d.toggle}>{r.cliente}</button> },
    { key: 'vencimento', label: 'Vencimento', render: r => r.vencimento.split('-').reverse().join('/') },
    { key: 'valor', label: 'Valor', render: r => formatBRL(r.valor, true), className: 'text-right', thClassName: 'text-right' },
    { key: 'situacao', label: 'Situação', render: r => <Badge color={COR[r.situacao]}>{r.situacao}</Badge> }
  ];

  return (
    <DocsSection id="filtros" icon="adjustments-horizontal" title="Filtros e linha expansível"
      desc="FilterBar padroniza o painel acima das tabelas: grade de campos, opções e ações (Enter busca). DataTable com detail abre o detalhe embaixo da linha, sem modal.">
      <Demo code={`<FilterBar onSearch={buscar} onClear={limpar} loading={carregando}
  options={<ChkOpt checked={soVencidos} onChange={setSoVencidos}>Só vencidos</ChkOpt>}>
  <DateRange label="Vencimento" from={de} to={ate} onChange={(de, ate) => { setDe(de); setAte(ate); }} />
  <FilterField label="Situação">
    <select value={situacao} onChange={e => setSituacao(e.target.value)}>...</select>
  </FilterField>
</FilterBar>

<DataTable columns={colunas} data={linhas}
  detail={row => <KVList>...</KVList>}            // cria a coluna da seta e o detalhe
  rowClassName={row => row.situacao === 'Vencido' ? 'row-pend' : undefined} />

// abrir pelo próprio conteúdo: render recebe (row, { open, toggle })
{ key: 'cliente', label: 'Cliente', render: (r, d) => <button type="button" className="dt-link" onClick={d.toggle}>{r.cliente}</button> }`}>
        <FilterBar onSearch={buscar} onClear={limpar} loading={carregando}
          options={<ChkOpt checked={soVencidos} onChange={setSoVencidos}>Só vencidos</ChkOpt>}>
          <DateRange label="Vencimento" from={de} to={ate} onChange={(a, b) => { setDe(a); setAte(b); }} />
          <FilterField label="Situação">
            <select value={situacao} onChange={e => setSituacao(e.target.value)}>
              <option value="">Todas</option>
              <option>Aberto</option><option>Vencido</option><option>Recebido</option>
            </select>
          </FilterField>
        </FilterBar>
        <DataTable columns={colunas} data={linhas} exportable={false} columnsToggle={false}
          rowClassName={r => (r.situacao === 'Vencido' ? 'row-pend' : undefined)}
          detail={r => (
            <KVList>
              <KV k="Parcelas">{r.parcelas}</KV>
              <KV k="Contato">{r.contato}</KV>
              <KV k="Valor por parcela">{formatBRL(r.valor / r.parcelas, true)}</KV>
            </KVList>
          )} />
      </Demo>
    </DocsSection>
  );
}

export function SecPopover() {
  const [periodo, setPeriodo] = useState('30d');
  return (
    <DocsSection id="popover" icon="message-circle" title="Popover"
      desc="Painel flutuante com conteúdo livre. O Tooltip só mostra texto e o Dropdown só itens de menu; o Popover recebe campos, resumo, ajuda. Fecha com Esc ou clique fora.">
      <Demo code={`<Popover trigger={<Button variant="secondary" icon="adjustments-horizontal">Exibição</Button>} title="Exibição">
  {({ close }) => (<>
    <FormGroup label="Período"><Segmented size="sm" value={periodo} onChange={setPeriodo} options={['7d', '30d', '90d']} /></FormGroup>
    <Button size="sm" onClick={close}>Aplicar</Button>
  </>)}
</Popover>

<Popover align="right" icon="info-circle" title="Como é calculado"
  trigger={<Button variant="ghost" size="sm" icon="help-circle">Ajuda</Button>}>
  <p>Soma dos títulos recebidos no mês, sem estornos.</p>
</Popover>`}>
        <div className="demo-gap">
          <Popover trigger={<Button variant="secondary" icon="adjustments-horizontal">Exibição</Button>} title="Exibição">
            {({ close }) => (
              <>
                <FormGroup label="Período">
                  <Segmented size="sm" value={periodo} onChange={setPeriodo} options={['7d', '30d', '90d']} />
                </FormGroup>
                <Button size="sm" onClick={close}>Aplicar</Button>
              </>
            )}
          </Popover>
          <Popover align="right" icon="info-circle" title="Como é calculado" width={280}
            trigger={<Button variant="ghost" size="sm" icon="help-circle">Ajuda</Button>}>
            <p style={{ fontSize: '.86rem', color: 'var(--text2)', lineHeight: 1.5 }}>Soma dos títulos recebidos no mês, sem estornos.</p>
          </Popover>
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecAnexos() {
  const [anexos, setAnexos] = useState([
    { id: 1, name: 'contrato-patrocinio.pdf', size: 1843200, url: '#anexos' },
    { id: 2, name: 'planilha-parcelas.xlsx', size: 48211, url: '#anexos', meta: 'enviado por Maria' },
    { id: 3, name: 'comprovante.png', size: 312400 },
    { id: 4, name: 'nfse-1234.xml', size: 9120, url: '#anexos' }
  ]);
  const [texto, setTexto] = useState('');
  const [comentarios, setComentarios] = useState([
    { id: 1, autor: 'Maria Souza', quando: '24/11 09:12', texto: 'Recebi o comprovante, vou conferir com o banco.' },
    { id: 2, autor: 'João Lima', quando: '24/11 09:40', texto: 'Obrigado! Qualquer coisa me avise.', resposta: true }
  ]);
  return (
    <DocsSection id="anexos" icon="paperclip" title="Anexos e comentários"
      desc="AttachmentList mostra os arquivos já enviados (o FileUpload só envia). CommentList, Comment e CommentBox formam o fio de comentários de um registro.">
      <SubSection title="AttachmentList">
        <Demo code={`<AttachmentList items={anexos} onRemove={a => excluir(a.id)} />
// item: { name, size (bytes), url, meta, id } · ícone pelo tipo do arquivo
// onOpen={(a, e) => ...} intercepta o clique · removable={a => a.meu} · compact

formatBytes(1843200)   // "1,8 MB"`}>
          <AttachmentList items={anexos} onOpen={(a, e) => { e.preventDefault(); notify('info', `Abrir ${a.name}`); }}
            onRemove={a => setAnexos(l => l.filter(x => x.id !== a.id))}
            empty={<p className="docs-note">Nenhum anexo. Recarregue a página para ver a lista de novo.</p>} />
        </Demo>
      </SubSection>
      <SubSection title="Comentários">
        <Demo code={`<CommentList>
  <Comment author="Maria Souza" when="24/11 09:12">Recebi o comprovante...</Comment>
  <Comment author="João Lima" when="24/11 09:40" reply tag={<Badge color="blue">solicitante</Badge>}>Obrigado!</Comment>
</CommentList>
<CommentBox value={texto} onChange={setTexto} onSubmit={enviar} loading={enviando} />   // Ctrl + Enter envia`}>
          <CommentList>
            {comentarios.map(c => (
              <Comment key={c.id} author={c.autor} when={c.quando} reply={c.resposta}
                tag={c.resposta ? <Badge color="blue">solicitante</Badge> : null}>{c.texto}</Comment>
            ))}
          </CommentList>
          <CommentBox value={texto} onChange={setTexto}
            onSubmit={t => { setComentarios(l => [...l, { id: Date.now(), autor: 'Alberto Ramos', quando: 'agora', texto: t }]); setTexto(''); }} />
        </Demo>
      </SubSection>
    </DocsSection>
  );
}

export function SecWizard() {
  const [nome, setNome] = useState('');
  const [perfil, setPerfil] = useState('Visitante');
  const [chave, setChave] = useState(0);
  return (
    <DocsSection id="wizard" icon="route" title="Etapas e wizard"
      desc="Para o passo a passo que o usuário percorre. Steps só desenha a trilha (onde estou, quanto falta); Wizard é o fluxo completo: avança, volta, pula etapa opcional, valida antes de seguir e conclui. Para o que já aconteceu com um registro, use a Timeline.">
      <SubSection title="Steps: só a trilha">
        <Demo code={`<Steps items={['Localidade', 'Portaria', 'Visitante']} current={1} />
// current: índice da etapa atual (começa em 0); as anteriores aparecem como concluídas`}>
          <Steps items={['Localidade', 'Portaria', 'Visitante']} current={1} />
        </Demo>
      </SubSection>
      <SubSection title="Wizard: o fluxo completo">
      <Demo code={`<Wizard
  steps={[
    { label: 'Dados', content: <FormDados />, canNext: !!nome },          // trava o Continuar
    { label: 'Perfil', content: <FormPerfil />, optional: true },         // mostra "Pular"
    { label: 'Revisão', content: <Resumo /> }
  ]}
  onNext={async etapa => { if (etapa === 0) return salvarRascunho(); }}    // retornar false segura na etapa
  onFinish={concluir} onCancel={fechar} finishLabel="Cadastrar" />
// controlado: step + onStepChange`}>
        <Wizard key={chave}
          steps={[
            {
              label: 'Dados', canNext: !!nome.trim(),
              content: (
                <FormRow>
                  <FormGroup label="Nome" required fieldHint="Preencha para liberar o Continuar">
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da pessoa" />
                  </FormGroup>
                </FormRow>
              )
            },
            {
              label: 'Perfil', optional: true,
              content: (
                <FormGroup label="Perfil de acesso">
                  <Segmented value={perfil} onChange={setPerfil} options={['Visitante', 'Prestador', 'Funcionário']} />
                </FormGroup>
              )
            },
            { label: 'Revisão', content: <KVList><KV k="Nome">{nome}</KV><KV k="Perfil">{perfil}</KV></KVList> }
          ]}
          onNext={() => new Promise(r => setTimeout(r, 500))}
          onFinish={() => { notify('success', 'Pessoa cadastrada'); setNome(''); setChave(c => c + 1); }}
          onCancel={() => { setNome(''); setChave(c => c + 1); }}
          finishLabel="Cadastrar" />
      </Demo>
      </SubSection>
    </DocsSection>
  );
}

export function SecVersoes() {
  return (
    <DocsSection id="versoes" icon="versions" title="Rodapé com build e histórico de versões"
      desc="No rodapé: nome do sistema, versão e commit à esquerda; copyright à direita; centro vazio. O nome do sistema pode abrir o histórico de versões, mostrado com o Changelog.">
      <SubSection title="Footer">
        <Demo code={`<Footer system="Contas a Receber" version="2.4.0" commit="a1b2c3d" env={devMode ? 'DEV' : null}
  systemHref="/versoes" onSystemClick={() => navigate('/versoes')}
  copyright="© 2026 Coritiba SAF" />
// esquerda: sistema, versão e commit · direita: copyright · centro: vazio (só com a prop center)
// right={...} acrescenta conteúdo depois do copyright; left={...} troca a zona esquerda inteira`}>
          <div className="demo-ftr">
            <Footer system="Contas a Receber" version="2.4.0" commit="a1b2c3d" env="DEV"
              systemHref="#versoes" onSystemClick={() => notify('info', 'Abriria o histórico de versões')}
              copyright="© 2026 Coritiba SAF" />
          </div>
        </Demo>
      </SubSection>
      <SubSection title="Changelog">
        <Demo code={`<Changelog current="2.4.0" versions={[
  { version: '2.4.0', date: '24/11/2026', items: ['Exportação em PDF', 'Correção no filtro de período'] },
  { version: '2.3.1', date: '10/11/2026', content: <p>Ajustes de desempenho.</p> }
]} />`}>
          <Changelog current="2.4.0" versions={[
            { version: '2.4.0', date: '24/11/2026', items: ['Exportação do relatório em PDF', 'Correção no filtro de período', 'Botões sempre com ícone'] },
            { version: '2.3.1', date: '10/11/2026', content: <p>Ajustes de desempenho na listagem de títulos.</p> },
            { version: '2.3.0', date: '28/10/2026', items: ['Conciliação por arquivo de retorno'] }
          ]} />
        </Demo>
      </SubSection>
    </DocsSection>
  );
}
