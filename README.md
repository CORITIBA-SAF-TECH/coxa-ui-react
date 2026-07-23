![CoxaUI React](ogimage.png)

# CoxaUI React

Componentes React do **CoxaUI**, o design system dos projetos web do **Coritiba Foot Ball Club (SAF)**. Projeto independente do [coxa-ui](https://github.com/CORITIBA-SAF-TECH/coxa-ui) (HTML/CSS/JS via CDN): mesmo visual, mesmas classes e o mesmo CSS como base, mas com componentes React de verdade (estado, props e hooks) para aplicações SPA.

> **Gerando código com IA?** O arquivo [`llms.txt`](llms.txt) traz orientações, regras e exemplos de todos os componentes prontos para alimentar assistentes (Claude, Copilot…). Ele é publicado junto ao pacote no npm e servido em `/llms.txt` no playground.

## Instalação

```bash
npm install coxa-ui-react react react-dom
```

No entry da aplicação, importe o CSS uma única vez:

```jsx
import 'coxa-ui-react/style.css';
```

Os ícones **Tabler Icons v3** são carregados automaticamente pelo CSS. O **Chart.js v4** e o **SweetAlert2 v11** já vêm como dependências.

## Estrutura básica de página

```jsx
import 'coxa-ui-react/style.css';
import {
  AppLayout, ContentCol, Overlay, Main,
  Sidebar, SidebarToggle, SidebarHeader, SidebarBrand,
  SidebarScroll, SidebarGroup, SidebarLink,
  Header, MenuButton, HeaderPage, HeaderRight, DarkModeButton, Footer
} from 'coxa-ui-react';
import logo from './logo.png';

export default function App() {
  return (
    <AppLayout>
      <Sidebar>
        <SidebarHeader />
        <SidebarBrand logo={logo} subtitle="controle de acesso" />
        <SidebarScroll>
          <SidebarLink icon="layout-dashboard" label="Dashboard" badge={5} active />
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
}
```

O comportamento é o mesmo do CoxaUI: sidebar recolhida por padrão no desktop (preferência salva em `localStorage`, chave `coxaui-sb`), botão circular flutuante na borda, tooltip automático nos ícones quando recolhida, drawer no mobile e modo escuro persistente (`coxaui-dark`). As chaves de `localStorage` são as mesmas do projeto vanilla, então a preferência do usuário vale nos dois mundos.

## Componentes

| Grupo | Componentes |
|---|---|
| **Layout** | `AppLayout`, `ContentCol`, `Main`, `Overlay`, `Sidebar`, `SidebarToggle`, `SidebarHeader`, `SidebarBrand`, `SidebarScroll`, `SidebarGroup`, `SidebarLink`, `Header`, `MenuButton`, `HeaderPage`, `HeaderRight`, `DarkModeButton`, `LiveClock`, `Footer` |
| **Botões** | `Button` (variant: `primary`, `secondary`, `danger`, `warning`, `accent`, `ghost`; size: `xs`, `sm`, `lg`), `ButtonGroup`, `IconButton` |
| **Badges** | `Badge` (color: `green`, `blue`, `orange`, `purple`, `red`, `yellow`, `gray`, `primary`, `accent`), `BadgeInside`, `BadgeOutside`, `Tag`, `TagCloud` |
| **Alertas** | `Alert` (type: `info`, `success`, `warn`, `danger`) |
| **Cards** | `Cards`, `CardItem`, `AdmCard`, `LinkCards`, `LinkCard`, `StatCards`, `StatCard` |
| **Formulários** | `FormCard`, `FormRow`, `FormGroup`, `FormActions`, `Toggle`, `ChkOpt`, `TipoOpts`, `TipoOpt`, `Combobox` |
| **Interativos** | `Modal` (size: `xs`, `sm`, `lg`, `xl`, `full`), `ModalInfo`, `Tabs`, `TabPanel`, `LinksTabs`, `LinksPanel`, `Accordion`, `AccordionItem`, `Dropdown`, `DropdownItem`, `DropdownSep` |
| **Padrões** | `Timeline`, `TimelineItem`, `Hist`, `HistItem`, `Steps`, `Breadcrumb`, `FilterPills`, `FilterPill`, `Progress`, `Empty`, `Spinner`, `Avatar`, `AvatarGroup`, `KVList`, `KV`, `KVDivider` |
| **Gráficos** | `CoxaChart` (Chart.js v4, paleta em variações do verde primary, tema claro/escuro automático), `COXA_CHART_COLORS` |

## Hooks e utilitários

| Export | Descrição |
|---|---|
| `useDarkMode()` | `{ dark, toggle, setDark }` com persistência em `localStorage` |
| `useSidebar()` | `{ collapsed, open, toggle, close }` dentro de `AppLayout` |
| `coxaToast(icon, msg)` | Toast padrão via SweetAlert2 |
| `coxaConfirm({ title, text, icon, confirmText, color })` | Confirmação, retorna `Promise<boolean>` |

## Exemplos rápidos

```jsx
// Combobox (select com busca)
<Combobox
  options={['Financeiro', 'RH', { label: 'Tecnologia da Informação', value: 12 }]}
  value={depto}
  onChange={setDepto}
  name="departamento"
/>

// Modal controlado
<Modal open={aberto} onClose={() => setAberto(false)} title="Registrar Saída" icon="logout" size="lg"
  actions={<><Button variant="secondary" onClick={fechar}>Cancelar</Button><Button>Confirmar</Button></>}>
  ...
</Modal>

// Gráfico com a paleta da marca
<CoxaChart type="line" data={{ labels, datasets: [{ label: 'Visitantes', data, fill: true, tension: .35 }] }} />
```

## Desenvolvimento

```bash
npm install
npm run dev     # playground em demo/
npm run build   # gera dist/ (lib ES + UMD + CSS)
```

## Cores da marca

```css
--primary:    #006B3C  /* Verde Coritiba */
--accent:     #fad716  /* Amarelo Coritiba */
--danger:     #ea580c  /* Laranja (nunca vermelho) */
--info:       #2563eb
--warning:    #d97706
```

## Repositório

[github.com/CORITIBA-SAF-TECH/coxa-ui-react](https://github.com/CORITIBA-SAF-TECH/coxa-ui-react)

## Changelog

### v1.0.0

Primeira versão estável.

- **Layout**: cabeçalho e rodapé offwhite (superfície escura no dark mode); sidebar verde, recolhida por padrão no desktop (100px) com scrollbar oculta mas rolável
- **Sidebar**: `SidebarFooter` com dois botões fixos na base — voltar ao portal (branco em leve destaque) e recolher/expandir; no mobile os botões e links mostram texto (drawer). Substitui o antigo `SidebarToggle`
- **Formulários**: `<textarea>` estilizado automaticamente; `Combobox` (select com busca) e `MultiCombobox` (seleção múltipla com chips)
- **Componentes**: botões (`xs`–`lg`), badges, alertas, cards, stat cards, modal com tamanhos, tabs, accordion, dropdown, timeline, steps, gráficos (Chart.js, paleta em variações do verde primary)
- **Utilitários**: `useDarkMode`, `useSidebar`, `coxaToast`, `coxaConfirm`
- CSS base compartilhado com o CoxaUI vanilla; chaves de `localStorage` compatíveis (`coxaui-dark`, `coxaui-sb`)
- `llms.txt` com orientações para gerar código com IA (publicado no pacote e servido em `/llms.txt` no playground)
- Playground de documentação em `demo/`, com deploy na Vercel (`npm run build:demo`)
