# Guia de migração: CoxaUI React

## 0.1.0 → 1.0.x

**Boa notícia: a 1.0 é compatível com a 0.1.0.** O código existente continua funcionando sem alterações: o `SidebarToggle` e os demais componentes mantêm a mesma API. As mudanças são **visuais** ou **recursos novos opcionais** (a 1.0.1 acrescenta o padrão de tabelas e a correção do dropdown em portal).

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
- O botão de recolher/expandir (`SidebarToggle`) continua sendo o círculo flutuante na borda, **idêntico ao CoxaUI vanilla** (hover amarelo).

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
