# Guia de migração: CoxaUI React

## 1.1 → 1.2

**Nada a fazer no código, mas o visual muda.** Nenhuma classe ou prop mudou, e apps com `"coxa-ui-react": "^1.1.0"` recebem a 1.2 no próximo `npm install`. A diferença é que o layout novo é o padrão da 1.2, sem prop e sem atributo no HTML: o app muda de cara ao atualizar.

### Para manter o visual da 1.1

Se um app ainda não pode mudar, uma linha resolve:

```jsx
<AppLayout layout="classic"> ... </AppLayout>
```

Para a primeira pintura já vir certa, ponha `data-coxa-layout="classic"` no `<html>` do `index.html`; em telas sem `AppLayout` (login, erro), use `useCoxaLayout('classic')`. Os itens de "O que muda sem você pedir", abaixo, valem nos dois casos.

### O que muda sem você pedir

- **Todo `<Button>` passa a ter ícone.** Um botão sem a prop `icon` ganha o ícone do rótulo ("Cancelar" e "Fechar" → `x`, "Salvar" → `check`, "Voltar" → `arrow-left`…) ou, sem rótulo conhecido, o da variante. O botão fica um ícone mais largo: vale conferir barras de ações apertadas. Quem já passa `icon` não muda. Para manter um botão sem ícone, use `icon={false}`; para trocar o ícone de um rótulo no app inteiro, `registerButtonIcons({ rótulo: 'icone' })` no entry. Botões feitos com markup solto (`<button className="btn ...">`) não são alterados.
- Os botões do `coxaConfirm` também ganham ícone (`cancelIcon={false}` / `confirmIcon={false}` tiram).
- **No rodapé, o copyright vai para a direita.** O `<Footer>` passa a ter o nome do sistema, a versão e o commit à esquerda, o copyright à direita e o centro vazio. Quem usa `copyright="..."` vê o texto mudar do centro para a direita; quem também passa `right={...}` vê esse conteúdo depois do copyright. A prop `center` continua existindo para quem quiser algo no meio, e `left` continua trocando a zona esquerda inteira.
- **A `LoadingScreen` mostra o escudo do Coritiba** (embutido na lib) no lugar do anel branco. A prop `logo` troca a imagem; a prop `alt` deixou de existir.
- **Tabelas ganham fundo.** `table` e `.tbl-wrap` passam a ter o fundo de superfície (`var(--surface)`). Dentro de um cartão nada muda; uma tabela solta sobre o fundo da página deixa de ficar com as linhas transparentes. O fundo vai na `<table>`, não nas células: classes de linha do app continuam valendo.
- **Botão desabilitado fica esmaecido** (`.btn:disabled { opacity: .5; cursor: not-allowed }`). A lib não tinha esse estilo e alguns apps repetiam exatamente essa regra no próprio CSS; quem repete pode apagar a sua.

- A fonte de ícones passa a vir numa **versão fixa** (`@tabler/icons-webfont@3.51.0`, antes `@3`). Todos os ícones que existiam até essa versão continuam; um ícone lançado depois dela só entra quando a lib subir a versão.
- `Modal` e `Drawer` fechados ficam **inertes** (fora da ordem de Tab). Antes, o Tab alcançava botões de um modal invisível.
- O `CoxaChart` é **refeito** ao alternar o tema, para repintar eixos e legenda. Antes eles ficavam com a cor do tema anterior.
- O foco não volta mais ao primeiro campo do `Modal`/`Drawer` a cada render do componente pai.

### O layout novo (padrão da 1.2)

Não é preciso ligar nada. Ao atualizar, confira:

- **Cores de fundo**: no modo claro o fundo da página (`--bg #dfe3e8`), o cabeçalho e o rodapé (`#f4f3ef`) continuam os da 1.1; só as superfícies internas e as bordas passam a neutros esverdeados. O modo escuro fica mais escuro (`--bg #0b1310`, cartões `#111916`). Se o app tem CSS próprio com `#dfe3e8`, `#1f2937` ou `#f4f3ef` fixos, troque pelos tokens (`var(--bg)`, `var(--surface)`, `var(--hdr-bg)`).
- **Cantos**: `--radius` passa de 12 para 20 px e `--radius-sm` de 7 para 10 px.
- **Stat cards**: viram coluna (ícone em cima, valor embaixo) e ficam mais altos.
- **Etapas**: o `Steps` passa a desenhar a trilha em colunas iguais, com o número em cima e o rótulo embaixo (a mesma do `Wizard`). Para manter número e rótulo lado a lado, passe `centered={false}`.
- **Medidas da casca**: não mudam (sidebar 255/100 px, cabeçalho 58 px).


### Recursos novos (opcionais; valem também no layout clássico)

**Menu**: o `SidebarScroll` rola sozinho para manter o link ativo à vista. Se o app fazia isso à mão, pode remover.

**Tradução**: `LanguageSelector` no cabeçalho, `registerMessages()` e `t()`. Sem registrar nada e sem pôr o seletor, o sistema continua só em português, exatamente como antes. Detalhes no README e no `llms.txt`.

`HeaderSearch` + `CommandPalette`, `EnvBadge`, `SessionChip` + `LockScreen` + `useCountdown`, `PrivacyButton` + `Sensitive`, `HoldButton`, `CountUp`, `notify()`, `viewTransition()`. Exemplos no playground e no `llms.txt`.

## 0.1.0 → 1.x

**Boa notícia: a 1.x é compatível com a 0.1.0.** O código existente continua funcionando sem alterações: o `SidebarToggle` e os demais componentes mantêm a mesma API. As mudanças são **visuais** ou **recursos novos opcionais** (1.0.1 traz o padrão de tabelas e o dropdown em portal; 1.1.0 traz tipagens TypeScript, acessibilidade e os componentes Drawer, Pagination, ordenação de tabela, Skeleton, Tooltip, FileUpload e UserMenu).

### 1. Atualizar o pacote

```bash
npm install coxa-ui-react@latest
```

> Se o `package.json` do seu app estiver com `"coxa-ui-react": "^0.1.0"`, o `npm update` **não** sobe sozinho para a 1.0.0 (o `^` em versões `0.x` é travado). Rode o `install @latest` acima, ou troque para `"^1.0.0"` e rode `npm install`.

O import do CSS continua igual:

```jsx
import 'coxa-ui-react/style.css';
```

### 2. Mudanças visuais (não exigem alterar código)

- **Cabeçalho e rodapé agora são offwhite** (antes verde-escuro `#00544d`); no modo escuro viram uma superfície escura. A **sidebar continua verde**. Se você tinha customização própria contando com o header verde, revise.
- A **sidebar fechada** passou de 60px para **100px**, e a **logo recolhida** ficou maior (90px).
- Os **ícones da navegação** da sidebar agora têm **20px**.
- A **scrollbar da sidebar** ficou oculta (continua rolável).
- O botão de recolher/expandir (`SidebarToggle`) continua sendo o círculo flutuante na borda (hover amarelo).

Nenhuma dessas mudanças exige alteração de código: apenas confira se o resultado visual está como esperado.

### 3. Recursos novos (opcionais)

- **`SidebarFooter`**: botão "voltar ao portal" fixo na base da sidebar. Coloque **dentro** da `<Sidebar>`, após o `<SidebarScroll>`:
  ```jsx
  import { Sidebar, SidebarToggle, SidebarFooter } from 'coxa-ui-react';

  <Sidebar>
    <SidebarHeader />
    <SidebarBrand logo={logo} subtitle="..." />
    <SidebarScroll>{/* links */}</SidebarScroll>
    <SidebarFooter portalUrl="https://seu-portal" portalLabel="Voltar ao portal" />
  </Sidebar>
  <SidebarToggle />   {/* continua igual à 0.1.0 */}
  <Overlay />
  ```
- **`<textarea>` estilizado automaticamente**: não precisa mais de classe; herda borda, foco verde e dark mode.
- **`MultiCombobox`**: combobox de seleção múltipla (chips removíveis). `value` é um array:
  ```jsx
  import { MultiCombobox } from 'coxa-ui-react';
  const [tags, setTags] = useState([]);
  <MultiCombobox options={['financeiro', 'rh', 'ti']} value={tags} onChange={setTags} name="tags" />
  ```
- **`llms.txt`**: guia de uso para IA, publicado junto ao pacote (em `node_modules/coxa-ui-react/llms.txt`) e servido em `/llms.txt` no playground.

### Checklist rápido

- [ ] `npm install coxa-ui-react@latest`
- [ ] Conferir o visual do cabeçalho/rodapé (agora offwhite) e da sidebar (100px fechada)
- [ ] (Opcional) adicionar `<SidebarFooter />` para o botão "voltar ao portal"
- [ ] (Opcional) adotar `MultiCombobox` e `<textarea>` sem classe
