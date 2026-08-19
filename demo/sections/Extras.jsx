import { useState } from 'react';
import {
  Button, Drawer, Skeleton, Tooltip, FileUpload,
  UserMenu, DropdownItem, DropdownSep, coxaToast
} from '../../src/index.js';
import { DocsSection, Demo } from '../DocsBlocks.jsx';

export function SecDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <DocsSection id="drawer" icon="layout-sidebar-right" title="Drawer (offcanvas)"
      desc="Painel lateral deslizante para detalhes sem sair da página. Controlado (open/onClose); fecha no overlay ou com Esc e prende o foco.">
      <Demo code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Abrir painel</Button>
<Drawer open={open} onClose={() => setOpen(false)} title="Detalhes do visitante" icon="user"
  actions={<Button variant="secondary" onClick={() => setOpen(false)}>Fechar</Button>}>
  ...conteúdo...
</Drawer>
// side="left" abre pela esquerda`}>
        <Button icon="layout-sidebar-right" onClick={() => setOpen(true)}>Abrir painel</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Detalhes do visitante" icon="user"
          actions={<>
            <Button variant="secondary" onClick={() => setOpen(false)}>Fechar</Button>
            <Button icon="check" onClick={() => { setOpen(false); coxaToast('success', 'Salvo!'); }}>Salvar</Button>
          </>}>
          <p style={{ fontSize: '.9rem', color: 'var(--text2)', lineHeight: 1.6 }}>
            Use o drawer para ver ou editar um registro sem perder o contexto da lista.
            Ideal para ficha de visitante, detalhe de chamado, etc.
          </p>
        </Drawer>
      </Demo>
    </DocsSection>
  );
}

export function SecSkeleton() {
  return (
    <DocsSection id="skeleton" icon="loader" title="Skeleton"
      desc="Placeholders pulsando enquanto os dados carregam.">
      <Demo code={`<Skeleton width="40%" height={18} />
<Skeleton.Text lines={3} />
<Skeleton circle width={44} height={44} />`}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Skeleton circle width={44} height={44} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <Skeleton width="45%" height={16} style={{ marginBottom: 8 }} />
            <Skeleton.Text lines={3} />
          </div>
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecTooltip() {
  return (
    <DocsSection id="tooltip" icon="help-circle" title="Tooltip">
      <Demo code={`<Tooltip text="Texto de ajuda"><Button variant="secondary">Passe o mouse</Button></Tooltip>`}>
        <div className="demo-gap">
          <Tooltip text="Exportar em CSV"><Button variant="secondary" icon="download">Exportar</Button></Tooltip>
          <Tooltip text="Isto abre um tooltip"><span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'help' }}><i className="ti ti-help-circle" /> ajuda</span></Tooltip>
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecUpload() {
  return (
    <DocsSection id="upload" icon="upload" title="Upload (drag & drop)"
      desc="Clique ou arraste arquivos. Retorna File[] em onChange; mostra o(s) arquivo(s) selecionado(s) com botão remover.">
      <Demo code={`<FileUpload accept=".pdf,.png,.bpmn" hint="PDF, PNG, BPMN até 50MB"
  onChange={files => console.log(files)} />
// multiple para vários arquivos`}>
        <div style={{ maxWidth: 460 }}>
          <FileUpload accept=".pdf,.png,.bpmn" hint="PDF, PNG, BPMN até 50MB"
            onChange={files => files.length && coxaToast('success', `Selecionado: ${files[0].name}`)} />
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecUserMenu() {
  return (
    <DocsSection id="user-menu" icon="user-circle" title="Menu do usuário"
      desc="Dropdown de conta para o header (avatar + nome). Coloque dentro de <HeaderRight>.">
      <Demo exampleClass="dark-bg" code={`<HeaderRight>
  <DarkModeButton />
  <UserMenu name="Alberto Ramos" sub="Tecnologia" initials="AR">
    <DropdownItem icon="user">Meu perfil</DropdownItem>
    <DropdownItem icon="ticket">Meus chamados</DropdownItem>
    <DropdownSep />
    <DropdownItem icon="logout" onClick={sair}>Sair</DropdownItem>
  </UserMenu>
</HeaderRight>`}>
        <div style={{ background: 'var(--hdr-bg)', borderRadius: 'var(--radius)', padding: '10px 14px', display: 'flex', justifyContent: 'flex-end' }}>
          <UserMenu name="Alberto Ramos" sub="Tecnologia" initials="AR">
            <DropdownItem icon="user" onClick={() => coxaToast('info', 'Perfil')}>Meu perfil</DropdownItem>
            <DropdownItem icon="ticket">Meus chamados</DropdownItem>
            <DropdownSep />
            <DropdownItem icon="logout" danger onClick={() => coxaToast('success', 'Saindo...')}>Sair</DropdownItem>
          </UserMenu>
        </div>
      </Demo>
    </DocsSection>
  );
}
