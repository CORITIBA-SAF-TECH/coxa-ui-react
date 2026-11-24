import * as React from 'react';

export declare const COXAUI_REACT_VERSION: string;

/* ── Tipos base ── */
export type Variant = 'primary' | 'secondary' | 'danger' | 'warning' | 'accent' | 'ghost';
export type Size = 'xs' | 'sm' | 'lg';
export type BadgeColor = 'green' | 'blue' | 'orange' | 'purple' | 'red' | 'yellow' | 'gray' | 'primary' | 'accent';
export type StatColor = 'green' | 'blue' | 'orange' | 'purple' | 'red' | 'yellow';
export type AlertType = 'info' | 'success' | 'warn' | 'danger';
export type ModalSize = 'xs' | 'sm' | 'lg' | 'xl' | 'full';
export type ComboOption = string | { label: string; value: any };
export interface TabItem { id: string; label: React.ReactNode; icon?: string; }

/* ── Layout ── */
/** O layout da biblioteca já vem ligado: não é preciso passar nada.
 *  `'classic'` mantém o visual da 1.1, para um app que ainda não pode mudar. */
export type CoxaLayout = 'classic';
export interface SidebarState { collapsed: boolean; open: boolean; toggle: () => void; close: () => void; layout?: CoxaLayout | null; }
export function useSidebar(): SidebarState | null;
/** Só para escolher outro layout em `<html>` (ex.: `'classic'`). Sem argumento, não faz nada. */
export function useCoxaLayout(layout?: CoxaLayout | null): void;

export const AppLayout: React.FC<React.HTMLAttributes<HTMLDivElement> & {
  /** Não precisa ser passado. `'classic'` mantém o visual da 1.1. */
  layout?: CoxaLayout; children?: React.ReactNode;
}>;
export const ContentCol: React.FC<React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }>;
export const Main: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode } & React.RefAttributes<HTMLElement>
>;
export const Overlay: React.FC<{}>;

export const Sidebar: React.FC<React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>;
export const SidebarToggle: React.FC<{ title?: string }>;
export const SidebarFooter: React.FC<{ portalUrl?: string; portalLabel?: string; onPortalClick?: React.MouseEventHandler }>;
export const SidebarHeader: React.FC<{ title?: string }>;
export const SidebarBrand: React.FC<{ logo: string; alt?: string; subtitle?: React.ReactNode; href?: string; round?: boolean }>;
/** Lista rolável de links. Rola sozinha para manter o `SidebarLink` ativo à vista quando ele muda. */
export const SidebarScroll: React.FC<{ children?: React.ReactNode }>;
export const SidebarGroup: React.FC<{ children?: React.ReactNode }>;
export const SidebarLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: string; label: React.ReactNode; badge?: React.ReactNode; active?: boolean;
}>;

export const Header: React.FC<React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>;
export const MenuButton: React.FC<{}>;
export const HeaderPage: React.FC<{ icon?: string; title: React.ReactNode; desc?: React.ReactNode }>;
export const HeaderRight: React.FC<{ children?: React.ReactNode }>;
/** Botão de busca global do cabeçalho: abre a `<CommandPalette>`. */
export const HeaderSearch: React.FC<{ onClick?: React.MouseEventHandler; placeholder?: string; shortcut?: string | null }>;
/** Selo de ambiente (Staging, Homologação…). */
export const EnvBadge: React.FC<{ color?: 'orange' | 'green' | 'blue' | 'gray'; title?: string; children?: React.ReactNode }>;
export const DarkModeButton: React.FC<{}>;
export const LiveClock: React.FC<{}>;
/** Esquerda: sistema, versão e commit. Direita: copyright (e `right`, depois dele). Centro: vazio, salvo com `center`. */
export const Footer: React.FC<{
  system?: React.ReactNode; version?: React.ReactNode; copyright?: React.ReactNode;
  /** Hash do commit, depois da versão. */
  commit?: React.ReactNode;
  /** Selo de ambiente antes do nome (DEV, Staging…). Não passe em produção. */
  env?: React.ReactNode;
  /** O nome do sistema vira link (ex.: histórico de versões). Com `onSystemClick`, o clique não recarrega a página. */
  systemHref?: string; onSystemClick?: React.MouseEventHandler;
  right?: React.ReactNode; left?: React.ReactNode; center?: React.ReactNode;
}>;

/* ── Botões ── */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size;
  /** Nome do ícone (Tabler). Sem a prop, o ícone vem do rótulo ("Cancelar" → `x`); `false` tira o ícone. */
  icon?: string | false | null;
  /** Troca o ícone por um spinner e desabilita o botão. */
  loading?: boolean;
  as?: React.ElementType; href?: string;
}
export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>>;
export const ButtonGroup: React.FC<{ children?: React.ReactNode }>;
export const IconButton: React.ForwardRefExoticComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: string } & React.RefAttributes<HTMLButtonElement>
>;
/** Ação destrutiva: só confirma se ficar pressionado por `duration` ms (padrão 1100). */
export const HoldButton: React.ForwardRefExoticComponent<
  ButtonProps & { onConfirm?: () => void; duration?: number } & React.RefAttributes<HTMLElement>
>;

/* ── Badges / tags ── */
export const Badge: React.FC<{ color?: BadgeColor; icon?: string; className?: string; children?: React.ReactNode }>;
export const BadgeInside: React.FC<{ children?: React.ReactNode }>;
export const BadgeOutside: React.FC<{ children?: React.ReactNode }>;
export const Tag: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }>;
export const TagCloud: React.FC<{ children?: React.ReactNode }>;

/* ── Alertas ── */
export const Alert: React.FC<{ type?: AlertType; title?: React.ReactNode; icon?: string; children?: React.ReactNode }>;

/* ── Diversos ── */
export const Spinner: React.FC<{ inline?: boolean; label?: React.ReactNode }>;
export const Avatar: React.FC<{ size?: 'sm' | 'lg' | 'xl'; title?: string; style?: React.CSSProperties; children?: React.ReactNode }>;
export const AvatarGroup: React.FC<{ children?: React.ReactNode }>;
export const Breadcrumb: React.FC<{ items: { label: React.ReactNode; href?: string }[] }>;
export const FilterPills: React.FC<{ children?: React.ReactNode }>;
export const FilterPill: React.FC<{ active?: boolean; icon?: string; href?: string; onClick?: React.MouseEventHandler; children?: React.ReactNode }>;
export const Progress: React.FC<{ value?: number; variant?: 'success' | 'warning'; striped?: boolean; lg?: boolean; label?: React.ReactNode }>;
export const Empty: React.FC<{ icon?: string; action?: React.ReactNode; children?: React.ReactNode }>;
export const KVList: React.FC<{ children?: React.ReactNode }>;
export const KV: React.FC<{ k: React.ReactNode; children?: React.ReactNode }>;
export const KVDivider: React.FC<{}>;

/* ── Cards ── */
export const StatCards: React.FC<{ children?: React.ReactNode }>;
export const StatCard: React.FC<{
  icon: string; color?: StatColor; value: React.ReactNode; label: React.ReactNode;
  /** Prefixo pequeno antes do valor, ex.: "R$". */
  unit?: React.ReactNode;
  /** Tendência em minigráfico no canto do cartão (não aparece no layout clássico). */
  spark?: number[];
  /** Cartão de destaque: degradê verde, mais largo (não aparece no layout clássico). */
  featured?: boolean;
  className?: string;
}>;
/** Número que conta até o valor (no layout clássico mostra o valor final direto). */
export const CountUp: React.FC<{
  value: number; decimals?: number; prefix?: string; suffix?: string;
  duration?: number; locale?: string; className?: string;
}>;
export const Cards: React.FC<{ children?: React.ReactNode }>;
export const CardItem: React.FC<{
  section?: React.ReactNode; sectionHref?: string; title?: React.ReactNode; href?: string;
  subtitle?: React.ReactNode; meta?: React.ReactNode; tags?: React.ReactNode; children?: React.ReactNode;
}>;
export const AdmCard: React.FC<{ icon?: string; title: React.ReactNode; actions?: React.ReactNode; children?: React.ReactNode }>;
export const LinkCards: React.FC<{ children?: React.ReactNode }>;
export const LinkCard: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { icon: string; children?: React.ReactNode }>;

/* ── Tabelas ── */
export const TableWrap: React.FC<React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }>;
export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement> & { children?: React.ReactNode }>;
export const SelBar: React.FC<{ count?: number; onClear?: () => void; label?: React.ReactNode; children?: React.ReactNode }>;
export interface SortState { field: string; dir: 'asc' | 'desc'; }
export function useSort<T = any>(data: T[], initialField?: string | null, initialDir?: 'asc' | 'desc'): {
  rows: T[]; sort: SortState | null; toggle: (field: string) => void;
};
export const SortableTh: React.FC<React.ThHTMLAttributes<HTMLTableCellElement> & {
  field: string; sort: SortState | null; onSort?: (field: string) => void; children?: React.ReactNode;
}>;

export interface DataTableColumn<T = any> {
  key: string;
  label: React.ReactNode;
  /** O segundo argumento só interessa com `detail`: abre/fecha a linha pelo próprio conteúdo. */
  render?: (row: T, detail: DataTableDetailState) => React.ReactNode;
  sortValue?: (row: T) => any;
  exportValue?: (row: T) => any;
  sortable?: boolean;
  exportable?: boolean;
  className?: string;
  thClassName?: string;
  /** Filtro no cabeçalho. `false` tira; omitido, a coluna só filtra (por texto) se a tabela tiver `columnFilters`. */
  filter?: boolean | DataTableFilterType | DataTableFilterSpec<T>;
}
export type DataTableFilterType = 'text' | 'select' | 'date';
export interface DataTableFilterSpec<T = any> {
  type?: DataTableFilterType;
  /** O valor que o filtro enxerga (padrão: `exportValue` ou o valor bruto). Em `date`: `AAAA-MM-DD`, ou uma lista delas. */
  value?: (row: T) => any;
  /** Como cada opção aparece no filtro de lista. */
  label?: (value: any) => string;
  /** Opções fixas do filtro de lista (padrão: os valores distintos da tabela). */
  options?: Array<string | number | { value: string | number; label: string }>;
  placeholder?: string;
}
/** Valores dos filtros por chave de coluna: texto, opção escolhida ou `{ from, to }` no período. */
export type DataTableFilters = Record<string, string | { from?: string; to?: string }>;
export function DataTable<T = any>(props: {
  columns: DataTableColumn<T>[]; data: T[]; rowKey?: (row: T) => React.Key;
  perPage?: number; searchable?: boolean; searchPlaceholder?: string;
  exportable?: boolean; exportName?: string; columnsToggle?: boolean;
  initialSort?: SortState | null; empty?: React.ReactNode; toolbar?: React.ReactNode;
  /** Linha expansível: conteúdo que abre embaixo da linha. */
  detail?: (row: T, state: DataTableDetailState) => React.ReactNode;
  /** `false` tira a coluna da seta (abra pelo `toggle` recebido em `render`). */
  detailToggle?: boolean;
  rowClassName?: (row: T) => string | undefined;
  /** Filtro de texto no cabeçalho de todas as colunas (cada coluna pode trocar o tipo ou sair com `filter`). */
  columnFilters?: boolean;
  initialFilters?: DataTableFilters;
  onFiltersChange?: (filters: DataTableFilters) => void;
}): JSX.Element;
export interface DataTableDetailState { open: boolean; toggle: () => void; }

/* ── Popover, filtros, anexos, etapas, versões, comentários ── */
export const Popover: React.FC<{
  trigger: React.ReactNode; title?: React.ReactNode; icon?: string; align?: 'left' | 'right' | 'center';
  width?: number | string; open?: boolean; onOpenChange?: (open: boolean) => void; className?: string;
  children?: React.ReactNode | ((api: { close: () => void }) => React.ReactNode);
}>;
/** Painel de filtros: grade de campos, opções e ações. Enter em um campo busca. */
export const FilterBar: React.FC<{
  onSearch?: () => void; onClear?: () => void; loading?: boolean;
  searchLabel?: string; searchingLabel?: string; clearLabel?: string;
  options?: React.ReactNode; actions?: React.ReactNode; className?: string; children?: React.ReactNode;
}>;
export const FilterField: React.FC<{ label?: React.ReactNode; hint?: React.ReactNode; span?: 1 | 2; children?: React.ReactNode }>;
/** Datas no formato `AAAA-MM-DD`. `onChange(de, ate)`. */
export const DateRange: React.FC<{
  from?: string; to?: string; onChange?: (from: string, to: string) => void;
  label?: React.ReactNode; min?: string; max?: string; disabled?: boolean;
}>;
export interface Attachment { name: string; size?: number; url?: string; meta?: React.ReactNode; icon?: string; id?: React.Key; [extra: string]: any; }
export function AttachmentList<T extends Attachment = Attachment>(props: {
  items: T[]; onRemove?: (item: T) => void; removable?: (item: T) => boolean;
  /** Intercepta o clique; chame `event.preventDefault()` para não seguir o link. */
  onOpen?: (item: T, event: React.MouseEvent) => void;
  compact?: boolean; empty?: React.ReactNode; className?: string;
}): JSX.Element | null;
/** `formatBytes(1536)` → `1,5 KB`. */
export function formatBytes(bytes: number | string | null | undefined): string;
export interface WizardStep { label: React.ReactNode; content?: React.ReactNode; canNext?: boolean; optional?: boolean; nextLabel?: string; }
export const Wizard: React.FC<{
  steps: WizardStep[]; step?: number; onStepChange?: (step: number) => void;
  /** Chamado antes de avançar (e antes de concluir). Retornar `false` segura na etapa. */
  onNext?: (step: number) => void | boolean | Promise<void | boolean>;
  onFinish?: () => void | Promise<void>; onCancel?: () => void;
  nextLabel?: string; backLabel?: string; skipLabel?: string; finishLabel?: string; cancelLabel?: string;
  loading?: boolean; className?: string;
}>;
export interface ChangelogVersion { version: string | number; date?: React.ReactNode; items?: React.ReactNode[]; content?: React.ReactNode; }
export const Changelog: React.FC<{ versions: ChangelogVersion[]; current?: string | number; empty?: React.ReactNode }>;
export const CommentList: React.FC<{ empty?: React.ReactNode; className?: string; children?: React.ReactNode }>;
export const Comment: React.FC<{
  author: string; when?: React.ReactNode; avatar?: string; tag?: React.ReactNode; actions?: React.ReactNode;
  /** Resposta do outro lado da conversa: recua e muda a cor da borda. */
  reply?: boolean; className?: string; children?: React.ReactNode;
}>;
export const CommentBox: React.FC<{
  value?: string; onChange?: (value: string) => void; onSubmit?: (value: string) => void; loading?: boolean;
  placeholder?: string; submitLabel?: string; rows?: number; actions?: React.ReactNode; className?: string;
}>;

/* ── Paginação / Skeleton / Tooltip ── */
export const Pagination: React.FC<{
  page?: number; total?: number; perPage?: number; onChange?: (page: number) => void;
  siblings?: number; showInfo?: boolean;
}>;
interface SkeletonComponent extends React.FC<{ width?: number | string; height?: number | string; circle?: boolean; className?: string; style?: React.CSSProperties }> {
  Text: React.FC<{ lines?: number; className?: string }>;
}
export const Skeleton: SkeletonComponent;
export const Tooltip: React.FC<{ text: React.ReactNode; className?: string; children?: React.ReactNode }>;

/* ── Formulários ── */
export const FormCard: React.FC<{ icon?: string; title?: React.ReactNode; children?: React.ReactNode }>;
export const FormRow: React.FC<{ cols?: 2 | 3; children?: React.ReactNode }>;
export const FormGroup: React.FC<{
  label?: React.ReactNode; required?: boolean; hint?: React.ReactNode; fieldHint?: React.ReactNode;
  /** Marca o campo (laranja) e mostra a mensagem abaixo dele. */
  error?: React.ReactNode;
  children?: React.ReactNode;
}>;
type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'prefix'>;
export type ChoiceOption = string | number | { value: any; label: React.ReactNode; icon?: string; disabled?: boolean };
/** Campo com ícone, prefixo ou sufixo (use `icon` ou `prefix`, não os dois). */
export const InputGroup: React.FC<{ icon?: string; prefix?: React.ReactNode; suffix?: React.ReactNode; className?: string; children?: React.ReactNode }>;
export const PasswordInput: React.ForwardRefExoticComponent<
  React.InputHTMLAttributes<HTMLInputElement> & { icon?: string | false } & React.RefAttributes<HTMLInputElement>
>;
export const SearchInput: React.ForwardRefExoticComponent<
  InputProps & { value?: string; onChange?: (value: string) => void } & React.RefAttributes<HTMLInputElement>
>;
/** `onChange(textoComMáscara, textoLimpo)`. */
export const MaskedInput: React.ForwardRefExoticComponent<
  InputProps & { mask: Mask; value?: string; onChange?: (masked: string, raw: string) => void } & React.RefAttributes<HTMLInputElement>
>;
/** Valor em reais: `value`/`onChange` em número (`null` quando vazio). */
export const CurrencyInput: React.ForwardRefExoticComponent<
  InputProps & { value?: number | null; onChange?: (value: number | null) => void; prefix?: React.ReactNode | false } & React.RefAttributes<HTMLInputElement>
>;
export const RadioGroup: React.FC<{
  name?: string; value?: any; onChange?: (value: any) => void; options: ChoiceOption[]; column?: boolean; className?: string;
}>;
export const Segmented: React.FC<{
  value?: any; onChange?: (value: any) => void; options: ChoiceOption[]; size?: 'sm'; className?: string;
}>;

/* ── Resultado, carregamento, copiar ── */
export type ResultStatus = '404' | '403' | '500' | 404 | 403 | 500 | 'offline' | 'manutencao' | 'success';
export const Result: React.FC<{
  status?: ResultStatus; icon?: string; title?: React.ReactNode; actions?: React.ReactNode; className?: string; children?: React.ReactNode;
}>;
/** Tela cheia de abertura do app (validação de sessão). `logo` troca o escudo embutido; `variant` troca o desenho. */
export const LoadingScreen: React.FC<{ logo?: string; label?: React.ReactNode; variant?: LoaderVariant; className?: string }>;
/** Escudo oficial do Coritiba (SVG em data URI), embutido na lib. */
export const COXA_LOGO: string;
/** Desenhos de carregamento. `ring` é o carregamento normal; `logo` é o escudo do Coritiba. */
export type LoaderVariant = 'ring' | 'dots' | 'bars' | 'pulse' | 'orbit' | 'linear' | 'logo';
export type LoaderSize = number | 'sm' | 'md' | 'lg';
/** Carregamento em todas as variações. `row` põe o rótulo ao lado; `light` é para fundos escuros. */
export const Loader: React.FC<{
  variant?: LoaderVariant; size?: LoaderSize; label?: React.ReactNode; row?: boolean; light?: boolean; logo?: string; className?: string;
}>;
/** O escudo pulsando dentro de um anel (o mesmo que `<Loader variant="logo">`). */
export const LogoLoader: React.FC<{ size?: LoaderSize; label?: React.ReactNode; light?: boolean; logo?: string; className?: string }>;
/** Modal de carregamento com o fundo desfocado. `local` cobre só o container pai (que precisa de `position: relative`). */
export const LoadingOverlay: React.FC<{
  open: boolean; label?: React.ReactNode; variant?: LoaderVariant; local?: boolean; size?: LoaderSize; logo?: string; className?: string;
}>;
/** Modal de carregamento sem estado. Retorna a função que o fecha. */
export function showLoading(label?: string, opts?: { variant?: LoaderVariant }): () => void;

/* ── Árvore ── */
export interface TreeItem { id: string | number; label: React.ReactNode; icon?: string; badge?: React.ReactNode; disabled?: boolean; children?: TreeItem[]; [extra: string]: any; }
export function Tree<T extends TreeItem = TreeItem>(props: Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> & {
  items: T[];
  selected?: T['id'] | null; onSelect?: (id: T['id'], item: T) => void;
  expanded?: Array<T['id']>; defaultExpanded?: Array<T['id']>; defaultExpandAll?: boolean;
  onExpandedChange?: (ids: Array<T['id']>) => void;
  /** Caixas de marcação em cascata. `checked` guarda os ids das folhas marcadas. */
  checkable?: boolean; checked?: Array<T['id']>; onCheckedChange?: (ids: Array<T['id']>) => void;
  actions?: (item: T) => React.ReactNode;
}): JSX.Element;
/** Sem children, renderiza só o ícone. Aceita as props do `<Button>`. */
export const CopyButton: React.FC<Omit<ButtonProps, 'onCopy'> & {
  text: string | (() => string); copiedLabel?: string; title?: string; onCopy?: (text: string) => void;
}>;
export const Kbd: React.FC<{ className?: string; children?: React.ReactNode }>;
export const FormActions: React.FC<{ children?: React.ReactNode }>;
export const Toggle: React.FC<{ checked?: boolean; onChange?: (checked: boolean) => void; label?: React.ReactNode; name?: string }>;
export const ChkOpt: React.FC<{ checked?: boolean; onChange?: (checked: boolean) => void; name?: string; children?: React.ReactNode }>;
export const TipoOpts: React.FC<{ children?: React.ReactNode }>;
export const TipoOpt: React.FC<{ icon?: string; checked?: boolean; onChange?: () => void; name?: string; children?: React.ReactNode }>;
export const Combobox: React.FC<{
  options: ComboOption[]; value?: any; onChange?: (value: any, opt?: { label: string; value: any }) => void;
  name?: string; placeholder?: string; emptyText?: string;
}>;
export const MultiCombobox: React.FC<{
  options: ComboOption[]; value?: any[]; onChange?: (values: any[]) => void;
  name?: string; placeholder?: string; emptyText?: string;
}>;
export const FileUpload: React.FC<{
  accept?: string; multiple?: boolean; hint?: React.ReactNode; label?: React.ReactNode;
  onChange?: (files: File[]) => void;
}>;

/* ── Interativos ── */
export const Modal: React.FC<{
  open: boolean; onClose?: () => void; title?: React.ReactNode; icon?: string;
  size?: ModalSize; actions?: React.ReactNode; children?: React.ReactNode;
}>;
export const ModalInfo: React.FC<{ children?: React.ReactNode }>;
export const Drawer: React.FC<{
  open: boolean; onClose?: () => void; title?: React.ReactNode; icon?: string;
  side?: 'left' | 'right'; width?: number | string; actions?: React.ReactNode; children?: React.ReactNode;
}>;
export const Tabs: React.FC<{ tabs: TabItem[]; active: string; onChange?: (id: string) => void }>;
export const TabPanel: React.FC<{ show?: boolean; children?: React.ReactNode }>;
export const LinksTabs: React.FC<{ tabs: TabItem[]; active: string; onChange?: (id: string) => void; children?: React.ReactNode }>;
export const LinksPanel: React.FC<{ show?: boolean; children?: React.ReactNode }>;
export const Accordion: React.FC<{ children?: React.ReactNode }>;
export const AccordionItem: React.FC<{ title: React.ReactNode; defaultOpen?: boolean; children?: React.ReactNode }>;
export const Dropdown: React.FC<{
  label?: React.ReactNode; icon?: string; variant?: 'primary' | 'secondary'; size?: Size;
  align?: 'left' | 'right'; trigger?: React.ReactNode; children?: React.ReactNode;
}>;
export const DropdownItem: React.FC<{ icon?: string; danger?: boolean; href?: string; onClick?: React.MouseEventHandler; children?: React.ReactNode }>;
export const DropdownSep: React.FC<{}>;
export const UserMenu: React.FC<{ name?: React.ReactNode; sub?: React.ReactNode; initials?: string; children?: React.ReactNode }>;

/* ── Padrões ── */
export const Timeline: React.FC<{ children?: React.ReactNode }>;
export const TimelineItem: React.FC<{ date?: React.ReactNode; title?: React.ReactNode; variant?: '' | 'warn' | 'info'; children?: React.ReactNode }>;
export const Hist: React.FC<{ children?: React.ReactNode }>;
export const HistItem: React.FC<{ badge?: React.ReactNode; title?: React.ReactNode; meta?: React.ReactNode[] }>;
/** Trilha de etapas em colunas iguais: número em cima, rótulo embaixo (a mesma do `<Wizard>`).
 *  `centered={false}`: trilha compacta, com número e rótulo lado a lado. */
export const Steps: React.FC<{ items: React.ReactNode[]; current?: number; centered?: boolean }>;

/* ── Gráficos ── */
export const CoxaChart: React.FC<{ type: string; data: any; options?: any; height?: number | string }>;
export const COXA_CHART_COLORS: string[];

/* ── Paleta de comandos ── */
export interface Command {
  id?: React.Key; group?: string; icon?: string; label: string;
  /** Termos extras para a busca. */
  keywords?: string;
  onSelect?: () => void;
}
export const CommandPalette: React.FC<{
  open: boolean; onClose?: () => void; commands: Command[];
  placeholder?: string; emptyText?: React.ReactNode; label?: string;
}>;
/** Estado da paleta + atalho global Ctrl K / ⌘K. */
export function useCommandPalette(opts?: { shortcut?: boolean }): {
  open: boolean; show: () => void; close: () => void; toggle: () => void;
};

/* ── Sessão e privacidade ── */
/** Contagem regressiva em segundos; espelha na tela a validade que o backend controla. */
export function useCountdown(total: number, opts?: {
  warnAt?: number; onWarn?: () => void; onExpire?: () => void; paused?: boolean;
}): { left: number; warning: boolean; reset: (value?: number) => void; set: (value: number) => void };
export const SessionChip: React.FC<{
  left: number; total: number; warnAt?: number; onClick?: React.MouseEventHandler; title?: string; className?: string;
}>;
export const LockScreen: React.FC<{
  open: boolean; icon?: string | null; title?: React.ReactNode; action?: React.ReactNode; children?: React.ReactNode;
}>;
/** Modo privado: borra o conteúdo dos `<Sensitive>`. */
export function usePrivacy(): { hidden: boolean; toggle: () => void; setHidden: (v: boolean) => void };
export const PrivacyButton: React.FC<{ titleHide?: string; titleShow?: string; onChange?: (hidden: boolean) => void }>;
export const Sensitive: React.FC<React.HTMLAttributes<HTMLElement> & { as?: React.ElementType; children?: React.ReactNode }>;

/* ── Hooks e utils ── */
export function useDarkMode(): {
  dark: boolean;
  /** Passe o elemento (ou o evento de clique) de origem para a revelação circular do tema. */
  toggle: (origin?: Element | React.SyntheticEvent | null) => void;
  setDark: (v: boolean) => void;
};
/** Toast leve, sem dependência. Retorna a função que o fecha. */
export function notify(kind: 'success' | 'info' | 'warning' | 'error', message: string, opts?: { duration?: number }): () => void;
/** Troca de tela animada (View Transitions API). No layout clássico só executa `update`. */
export function viewTransition(update: () => void): void;
export function useOverlay(open: boolean, onClose?: () => void): React.RefObject<any>;
export type ToastIcon = 'success' | 'error' | 'warning' | 'info' | 'question';
export function coxaToast(icon: ToastIcon, title: string): void;
/** Os dois botões têm ícone (Cancelar: `x`; confirmar: pelo rótulo). `false` tira o ícone. */
export function coxaConfirm(opts: {
  title: string; text?: string; icon?: string; confirmText?: string; cancelText?: string;
  confirmIcon?: string | false; cancelIcon?: string | false; color?: string;
}): Promise<boolean>;
/** Confirmação leve, sem dependência. Esc, clique fora e Cancelar resolvem `false`. */
export function confirmDialog(opts: {
  title?: string; text?: string; icon?: string; confirmText?: string; cancelText?: string;
  confirmIcon?: string | false; cancelIcon?: string | false; danger?: boolean;
}): Promise<boolean>;

/* ── Ícone padrão dos botões ── */
/** Ensina (ou troca) o ícone de rótulos do app. Chaves sem acento/maiúsculas: `{ conciliar: 'arrows-exchange' }`. */
export function registerButtonIcons(map: Record<string, string>): void;
/** Ícone padrão para um rótulo; sem rótulo conhecido, o da variante. */
export function buttonIconFor(label: React.ReactNode, variant?: Variant): string;

/* ── Máscaras ── */
export type MaskName = 'cpf' | 'cnpj' | 'cpfCnpj' | 'telefone' | 'cep' | 'data' | 'hora';
export type Mask = MaskName | string | ((value: string) => string);
export const masks: Record<MaskName, (value: any) => string>;
/** `mask`: nome pronto, padrão (`0` = dígito, `A` = letra ou dígito) ou função. */
export function applyMask(value: any, mask: Mask): string;
/** Só letras e dígitos. */
export function unmask(value: any): string;
/** `formatBRL(1234.5)` → `1.234,50`; com `true`, `R$ 1.234,50`. Vazio/inválido → `''`. */
export function formatBRL(value: number | string | null | undefined, withSymbol?: boolean): string;

/* ── Tradução ── */
export type LanguageCode = 'pt-BR' | 'es' | 'en';
export type FlagCountry = 'br' | 'es' | 'us';
export interface Language { code: LanguageCode; label: string; short: string; flag: FlagCountry; }
/** Português (Brasil), Español e English, nessa ordem. */
export const LANGUAGES: Language[];
export const DEFAULT_LANGUAGE: 'pt-BR';
/** Traduz para o idioma atual. O texto em português é a chave; sem tradução, volta o próprio texto.
 *  Variáveis entre chaves: `t('{n} itens', { n: 3 })`. */
export function t(text: string, vars?: Record<string, string | number>): string;
export function t<T>(value: T): T;
export function getLanguage(): LanguageCode;
/** Troca o idioma, grava em `localStorage` (`coxaui-lang`) e ajusta `<html lang>`. */
export function setLanguage(code: LanguageCode): void;
/** Registra traduções (os dicionários se somam). Chave = texto em português. */
export function registerMessages(messages: Partial<Record<LanguageCode, Record<string, string>>>): void;
/** Forma em tabela: cada linha `[português, espanhol, inglês]` (ou a ordem dada em `columns`). */
export function registerMessages(rows: Array<Array<string | undefined>>, columns?: LanguageCode[]): void;
/** Idioma atual dentro de um componente (redesenha quando o idioma muda). */
export function useI18n(): { lang: LanguageCode; languages: Language[]; setLanguage: (code: LanguageCode) => void; t: typeof t };
/** Textos que apareceram na tela sem tradução no idioma atual, em ordem alfabética. */
export function getMissingMessages(): string[];
export function clearMissingMessages(): void;
/** Bandeira em SVG (20 × 14): Brasil, Espanha e Estados Unidos. País desconhecido não desenha nada. */
export const Flag: React.FC<React.SVGAttributes<SVGSVGElement> & { country: FlagCountry }>;
/** Seletor de idioma para o cabeçalho, com a bandeira de cada país. Por padrão recarrega a página ao trocar. */
export const LanguageSelector: React.FC<{
  languages?: LanguageCode[]; reload?: boolean; onChange?: (code: LanguageCode) => void;
}>;
/** Avançado: cria o elemento como `jsx()` criaria, traduzindo antes o texto de elementos HTML. */
export function i18nElement(create: (...args: any[]) => any, type: any, props: any, ...rest: any[]): any;

/* CSS: import 'coxa-ui-react/style.css' */
