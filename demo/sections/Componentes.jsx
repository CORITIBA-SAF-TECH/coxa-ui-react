import { useState } from 'react';
import {
  Button, ButtonGroup, IconButton,
  Badge, BadgeInside, BadgeOutside, Tag, TagCloud,
  Alert, Avatar, AvatarGroup,
  Cards, CardItem, AdmCard, LinkCards, LinkCard, StatCards, StatCard,
  FormCard, FormRow, FormGroup, FormActions, Toggle, ChkOpt, TipoOpts, TipoOpt, Combobox,
  Modal, ModalInfo, Tabs, TabPanel,
  Accordion, AccordionItem,
  Dropdown, DropdownItem, DropdownSep,
  coxaToast, coxaConfirm
} from '../../src/index.js';
import { DocsSection, SubSection, Demo } from '../DocsBlocks.jsx';

export function SecBotoes() {
  return (
    <DocsSection id="botoes" icon="pointer" title="Botões"
      desc="Variantes de cor e tamanho. Danger é laranja: vermelho é proibido no projeto.">
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
            <FormActions>
              <Button variant="secondary">Cancelar</Button>
              <Button icon="check">Salvar</Button>
            </FormActions>
          </FormCard>
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
            Clique na lua no header — a preferência fica salva no navegador.
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
