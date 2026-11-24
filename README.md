![CoxaUI React](ogimage.png)

# CoxaUI React

Componentes React do **CoxaUI**, o design system dos projetos web do **Coritiba Foot Ball Club (SAF)**: componentes com estado, props e hooks para aplicações SPA, com layout, cores e movimento já prontos.

> **Gerando código com IA?** O arquivo [`llms.txt`](llms.txt) traz orientações, regras e exemplos de todos os componentes prontos para alimentar assistentes (Claude, Copilot…). Ele é publicado junto ao pacote no npm e servido em `/llms.txt` no playground.

## Instalação

```bash
npm install coxa-ui-react react react-dom
```

No entry da aplicação, importe o CSS uma única vez:

```jsx
import 'coxa-ui-react/style.css';
```

Os ícones **Tabler Icons v3** são carregados automaticamente pelo CSS (versão fixa, `3.51.0`). O **Chart.js v4** e o **SweetAlert2 v11** já vêm como dependências. O pacote inclui **tipagens TypeScript** (`index.d.ts`), com autocomplete e checagem de props mesmo em projetos JS.

## Estrutura básica de página

```jsx
import 'coxa-ui-react/style.css';
import {
  AppLayout, ContentCol, Overlay, Main,
  Sidebar, SidebarToggle, SidebarFooter, SidebarHeader, SidebarBrand,
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
        <SidebarFooter portalUrl="https://seu-portal" portalLabel="Voltar ao portal" />
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
        <Footer system="Minha App" version="1.0.0" commit={gitCommit} copyright="© 2026 Coritiba SAF" />
      </ContentCol>
    </AppLayout>
  );
}
```

### Layout

O acabamento da casca e dos componentes (cartões em bento, indicador deslizante no menu, entrada em sequência, modal e drawer com mola, troca de tema e de tela animadas, modo escuro em neutros esverdeados) **já vem ligado**: não há prop para passar nem atributo para pôr no HTML, e telas sem `AppLayout` (login, erro) também o usam.

As animações usam só `transform` e `opacity` e param com `prefers-reduced-motion`. O playground (`npm run dev`) tem três telas de exemplo. Um app que ainda não pode mudar de visual mantém o da 1.1 com `<AppLayout layout="classic">`; veja o [guia de migração](MIGRACAO.md).

Comportamento da casca: sidebar recolhida por padrão no desktop (preferência salva em `localStorage`, chave `coxaui-sb`), botão circular flutuante na borda, tooltip automático nos ícones quando recolhida, drawer no mobile e modo escuro persistente (`coxaui-dark`).

### Idiomas

A interface fala português (padrão), espanhol e inglês. O português é o idioma de origem: o texto escrito no código é a chave, e o que não tiver tradução aparece em português, então um sistema pode ser traduzido aos poucos.

```jsx
import { registerMessages, LanguageSelector, t } from 'coxa-ui-react';

registerMessages({                                   // uma vez, no entry do app
  es: { 'Salvar título': 'Guardar título' },
  en: { 'Salvar título': 'Save receivable' }
});

<HeaderRight><LanguageSelector /></HeaderRight>      // bandeira + sigla; grava a escolha e recarrega a página
<Button>Salvar título</Button>                       // texto passado a um componente: traduzido sozinho
{t('{n} títulos em aberto', { n })}                  // texto montado no código
```

Os textos da própria biblioteca já vêm traduzidos. `getMissingMessages()` lista o que apareceu na tela sem tradução. A escolha fica em `localStorage` (`coxaui-lang`).

## Componentes

| Grupo | Componentes |
|---|---|
| **Layout** | `AppLayout`, `ContentCol`, `Main`, `Overlay`, `Sidebar`, `SidebarToggle`, `SidebarFooter`, `SidebarHeader`, `SidebarBrand`, `SidebarScroll`, `SidebarGroup`, `SidebarLink`, `Header`, `MenuButton`, `HeaderPage`, `HeaderRight`, `DarkModeButton`, `LiveClock`, `Footer` |
| **Botões** | `Button` (variant: `primary`, `secondary`, `danger`, `warning`, `accent`, `ghost`; size: `xs`, `sm`, `lg`), `ButtonGroup`, `IconButton` |
| **Badges** | `Badge` (color: `green`, `blue`, `orange`, `purple`, `red`, `yellow`, `gray`, `primary`, `accent`), `BadgeInside`, `BadgeOutside`, `Tag`, `TagCloud` |
| **Alertas** | `Alert` (type: `info`, `success`, `warn`, `danger`) |
| **Cards** | `Cards`, `CardItem`, `AdmCard`, `LinkCards`, `LinkCard`, `StatCards`, `StatCard` |
| **Tabelas** | `DataTable` (padrão: ordenação, busca, colunas visíveis, exportação CSV com escolha de colunas, paginação). Baixo nível: `TableWrap`, `Table`, `SelBar` (seleção em lote), `SortableTh` + `useSort`, `Pagination`; classes de linha `.row-pend`, `.row-del` |
| **Feedback** | `Skeleton` (+ `Skeleton.Text`), `Tooltip`, `Drawer` (offcanvas) |
| **Formulários** | `FormCard`, `FormRow`, `FormGroup`, `FormActions`, `Toggle`, `ChkOpt`, `TipoOpts`, `TipoOpt`, `Combobox`, `MultiCombobox`, `FileUpload` (drag & drop), `<textarea>` (estilizado) |
| **Interativos** | `Modal` (size: `xs`, `sm`, `lg`, `xl`, `full`), `ModalInfo`, `Tabs`, `TabPanel`, `LinksTabs`, `LinksPanel`, `Accordion`, `AccordionItem`, `Dropdown`, `DropdownItem`, `DropdownSep` |
| **Padrões** | `Timeline`, `TimelineItem`, `Hist`, `HistItem`, `Steps`, `Breadcrumb`, `FilterPills`, `FilterPill`, `Progress`, `Empty`, `Spinner`, `Avatar`, `AvatarGroup`, `KVList`, `KV`, `KVDivider` |
| **Gráficos** | `CoxaChart` (Chart.js v4, paleta em variações do verde primary, tema claro/escuro automático), `COXA_CHART_COLORS` |
| **Cabeçalho (1.2)** | `HeaderSearch` + `CommandPalette` (busca global, Ctrl K), `LanguageSelector` (idioma, com a bandeira de cada país; `Flag` desenha só a bandeira) |
| **Opcionais do cabeçalho (1.2)** | `EnvBadge` (selo de ambiente), `SessionChip` + `LockScreen` (sessão), `PrivacyButton` + `Sensitive` (modo privado). Não fazem parte do cabeçalho padrão |
| **Outros (1.2)** | `HoldButton` (segurar para confirmar), `CountUp` (número que conta), `StatCard` com `unit`, `featured` e `spark` |
| **Campos (1.2)** | `InputGroup`, `PasswordInput`, `SearchInput`, `MaskedInput`, `CurrencyInput`, `RadioGroup`, `Segmented`, `FormGroup` com `error` |
| **Feedback (1.2)** | `Result` (páginas de erro e sucesso), `CopyButton`, `Kbd`, `Button` com `loading` |
| **Carregamento (1.2)** | `Loader` (anel, pontos, barras, pulso, órbita, barra linear e escudo), `LogoLoader` (escudo do Coritiba), `LoadingOverlay` + `showLoading()` (modal com fundo desfocado), `LoadingScreen`, `COXA_LOGO` |
| **Hierarquia (1.2)** | `Tree` (seleção, marcação em cascata, teclado) |
| **Tabelas e registro (1.2)** | `DataTable` com `detail` (linha expansível), `FilterBar` + `FilterField` + `DateRange`, `Popover`, `AttachmentList`, `CommentList` + `Comment` + `CommentBox`, `Wizard`, `Changelog`, `Footer` com `env`/`commit` |

## Hooks e utilitários

| Export | Descrição |
|---|---|
| `useDarkMode()` | `{ dark, toggle, setDark }` com persistência em `localStorage` |
| `useSidebar()` | `{ collapsed, open, toggle, close }` dentro de `AppLayout` |
| `coxaToast(icon, msg)` | Toast padrão via SweetAlert2 |
| `coxaConfirm({ title, text, icon, confirmText, color })` | Confirmação, retorna `Promise<boolean>` |
| `useCoxaLayout('classic')` | Mantém o visual da 1.1 em telas sem `AppLayout` (o layout da biblioteca já vem ligado, sem chamar nada) |
| `useCommandPalette()` | `{ open, show, close, toggle }` + atalho Ctrl K |
| `useCountdown(total, opts)` | `{ left, warning, reset, set }`: contagem regressiva de sessão |
| `usePrivacy()` | `{ hidden, toggle, setHidden }`: modo privado dos `<Sensitive>` |
| `notify(kind, msg, opts?)` | Toast leve, sem dependência |
| `registerMessages(dicionários)` | Registra as traduções do sistema (`es`, `en`) |
| `t(texto, variáveis?)` / `useI18n()` | Traduz um texto; `useI18n()` devolve `{ lang, setLanguage, t, languages }` |
| `getMissingMessages()` | Textos que apareceram na tela sem tradução no idioma atual |
| `confirmDialog({ title, text, confirmText, danger })` | Confirmação leve, sem dependência; retorna `Promise<boolean>` |
| `registerButtonIcons(mapa)` / `buttonIconFor(rótulo, variante?)` | Ícone padrão dos botões: ensinar rótulos do app / consultar |
| `applyMask(valor, mask)` / `unmask(texto)` / `formatBRL(n, símbolo?)` | Máscaras (CPF, CNPJ, telefone, CEP…) e moeda fora de campos |
| `viewTransition(update)` | Troca de tela animada (View Transitions API) |

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

> **Atualizando da 0.1.0?** Veja o [guia de migração](MIGRACAO.md): a 1.x é compatível com a 0.1.0 (sem quebra de código); as mudanças são visuais e recursos novos opcionais.

### v1.2.0

Nenhuma classe ou prop mudou, mas **o visual muda ao atualizar**: o layout novo é o padrão (não é preciso ligar nada) e todo `<Button>` ganha ícone. Um app que ainda não pode mudar mantém o visual da 1.1 com `<AppLayout layout="classic">`. Veja o [guia de migração](MIGRACAO.md).

- **Tradução**: português (padrão), espanhol e inglês. `LanguageSelector` no cabeçalho, `registerMessages()` para os textos do sistema, `t()`/`useI18n()` para texto montado no código e `getMissingMessages()` para achar o que falta. Os textos da lib já vêm traduzidos e o que um componente desenha é traduzido sozinho. Em português nada muda
- **Cabeçalho padrão**: busca, idioma, tema e conta. `EnvBadge`, `SessionChip` e `PrivacyButton` continuam existindo como peças opcionais
- **Botões sempre com ícone**: sem a prop `icon`, o `<Button>` escolhe o ícone pelo rótulo ("Cancelar"/"Fechar" → `x`, "Salvar" → `check`, "Voltar" → `arrow-left`, "Excluir" → `trash`…) e, sem rótulo conhecido, pela variante. A prop `icon` continua vencendo; `icon={false}` tira o ícone; `registerButtonIcons()` ensina rótulos do app. Um botão cujo conteúdo já começa por um `<i>` ou spinner próprio não ganha um segundo ícone. Os botões do `coxaConfirm` também ganharam ícone
- **`<Button loading>`**: troca o ícone por um spinner e desabilita o botão
- **Formulários**: `FormGroup` com `error`, `InputGroup` (ícone, prefixo, sufixo), `PasswordInput`, `SearchInput`, `MaskedInput` (CPF, CNPJ alfanumérico, telefone, CEP, data, hora ou padrão próprio), `CurrencyInput`, `RadioGroup`, `Segmented`; utilitários `applyMask`, `unmask`, `masks`, `formatBRL`
- **Feedback**: `confirmDialog()` (confirmação sem dependência), `Result` (404, 403, 500, sem conexão, manutenção, sucesso), `LoadingScreen`, `CopyButton`, `Kbd`
- **Tabelas e filtros**: `DataTable` com linha expansível (`detail`, `detailToggle`, `rowClassName`); `FilterBar` + `FilterField` + `DateRange` (painel de filtros com período)
- **Registro**: `Popover` (painel flutuante com conteúdo livre), `AttachmentList` + `formatBytes`, `CommentList` + `Comment` + `CommentBox`, `Wizard` (fluxo em etapas sobre o `Steps`)
- **Rodapé e versões**: `Footer` com `env`, `commit`, `systemHref`/`onSystemClick`; **o copyright passou do centro para a direita** e o centro fica vazio (só aparece com a prop `center`); `Changelog` (histórico de versões)
- **Carregamento com o escudo**: `LogoLoader`, `LoadingOverlay` (modal com o fundo desfocado; `local` cobre só um cartão) e `showLoading()`; a `LoadingScreen` usa o escudo por padrão; o escudo oficial vem embutido na lib (`COXA_LOGO`)
- **Árvore**: `Tree`, com seleção, ações por item, caixas de marcação em cascata e navegação por teclado
- **Etapas**: o `Steps` desenha a trilha em colunas iguais, com o número em cima (`centered={false}` mantém número e rótulo lado a lado); o `Wizard` usa a mesma trilha e anima o conteúdo no sentido em que se anda
- **Menu que acompanha**: o `SidebarScroll` rola sozinho para manter o link ativo à vista, na navegação ou enquanto a página rola num menu de seções
- **Mais movimento**: accordion, abas, popover, combobox, linha expansível, árvore, etapas, erro de campo, anexos, comentários e páginas de resultado; classes `cx-stagger`, `cx-rise` e `cx-pop-in` para o conteúdo do app
- **Modo claro**: o fundo da página (`--bg #dfe3e8`), o cabeçalho e o rodapé (`#f4f3ef`) são os mesmos da 1.1; só as superfícies internas e as bordas ficam esverdeadas
- **Tabelas com fundo**: `table` e `.tbl-wrap` têm o fundo de superfície; uma tabela solta sobre o fundo da página deixa de ficar com as linhas transparentes
- **Variações de carregamento**: `Loader` com `variant` `ring` (o carregamento normal), `dots`, `bars`, `pulse`, `orbit`, `linear` e `logo`; `LoadingOverlay`, `showLoading()` e `LoadingScreen` aceitam `variant`
- **Filtro no cabeçalho do `DataTable`**: `columnFilters` (texto em todas as colunas) e `filter` por coluna (`'text'`, `'select'`, `'date'`, objeto ou `false`), com `initialFilters`, `onFiltersChange`, botão "Limpar filtros" e contador de linhas
- Playground reorganizado por finalidade (Ações, Formulários, Dados, Navegação, Sobreposições, Feedback, Sistema), com o menu e a página na mesma ordem

- **Layout novo, já ligado**: cartões em bento, indicador deslizante no menu e nas abas, entrada em sequência, modal e drawer com mola, tema em revelação circular e modo escuro mais escuro. Não há prop para passar; `layout="classic"` mantém o visual da 1.1
- **Cabeçalho**: `HeaderSearch` + `CommandPalette` + `useCommandPalette` (busca global com Ctrl K), `EnvBadge` (selo de ambiente), `SessionChip` + `LockScreen` + `useCountdown` (sessão visível, aviso e bloqueio), `PrivacyButton` + `Sensitive` + `usePrivacy` (modo privado)
- **Novos**: `HoldButton` (segurar para confirmar ação destrutiva), `CountUp`, `notify()` (toast sem dependência), `viewTransition()` (troca de tela animada), `useCoxaLayout()`
- **`StatCard`**: props `unit`, `featured` e `spark`
- **Segurança**: fonte de ícones com versão fixa (`@3.51.0`, antes `@3`); `Modal`, `Drawer` e paleta ficam inertes quando fechados (saem da ordem de Tab); `localStorage` bloqueado não quebra mais a página
- **Correções**: `Modal`/`Drawer` não devolvem mais o foco ao primeiro campo a cada tecla quando `onClose` é recriado a cada render; `CoxaChart` repinta eixos e legenda ao alternar o tema; instâncias de `useDarkMode` ficam sincronizadas; `Main` aceita `ref`
- Playground com um texto de abertura sobre a CoxaUI e o clube e três telas de exemplo

### v1.1.0

- **Tipagens TypeScript** (`index.d.ts`): autocomplete e checagem de props para todos os componentes, hooks e utils
- **Acessibilidade**: `Modal` e `Drawer` com Esc + focus trap (via `useOverlay`); `Dropdown` com navegação por teclado e ARIA; `Tabs`/`Accordion` com roles ARIA; anéis de `:focus-visible`
- **`DataTable`**: tabela padrão com ordenação, busca, seleção de colunas visíveis, exportação CSV (escolhendo as colunas) e paginação já embutidas
- **Novos componentes**: `Drawer` (offcanvas), `Pagination`, `SortableTh` + `useSort` (ordenação), `Skeleton` (+ `Skeleton.Text`), `Tooltip`, `FileUpload` (drag & drop), `UserMenu` (menu de conta no header)
- `Button` e `IconButton` agora encaminham `ref` (`forwardRef`) e `Button` aceita `as` (ex.: `as={Link}`)

### v1.0.1

- **Tabelas**: novo padrão com `TableWrap`, `Table` e `SelBar` (seleção em lote), com classes de linha `.row-pend` / `.row-del`
- **Dropdown**: menu renderizado em portal (`position: fixed`): não é mais cortado por containers com `overflow` (ex.: tabelas); sobe automaticamente se faltar espaço abaixo e reposiciona ao rolar
- **Footer**: padrão de três zonas via props `system` + `version` (esquerda), `copyright` (centro) e `right` (livre)
- Ajustes da sidebar recolhida (folga entre o botão e a divisória; botão alinhado à altura do header)
- Remoção do travessão (em dash) em todo o projeto

### v1.0.0

Primeira versão estável.

- **Layout**: cabeçalho e rodapé offwhite (superfície escura no dark mode); sidebar verde, recolhida por padrão no desktop (100px, logo 90px) com scrollbar oculta mas rolável; ícones da nav em 20px
- **Sidebar**: `SidebarToggle` (círculo flutuante na borda) para recolher/expandir; novo `SidebarFooter` opcional com o botão "voltar ao portal" fixo na base; no mobile os links e botões mostram texto (drawer)
- **Formulários**: `<textarea>` estilizado automaticamente; `Combobox` (select com busca) e `MultiCombobox` (seleção múltipla com chips)
- **Componentes**: botões (tamanhos `xs` a `lg`), badges, alertas, cards, stat cards, modal com tamanhos, tabs, accordion, dropdown, timeline, steps, gráficos (Chart.js, paleta em variações do verde primary)
- **Utilitários**: `useDarkMode`, `useSidebar`, `coxaToast`, `coxaConfirm`
- Chaves de `localStorage`: `coxaui-dark` e `coxaui-sb`
- `llms.txt` com orientações para gerar código com IA (publicado no pacote e servido em `/llms.txt` no playground)
- Playground de documentação em `demo/`, com deploy na Vercel (`npm run build:demo`)
