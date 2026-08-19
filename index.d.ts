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
export interface SidebarState { collapsed: boolean; open: boolean; toggle: () => void; close: () => void; }
export function useSidebar(): SidebarState | null;

export const AppLayout: React.FC<React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }>;
export const ContentCol: React.FC<React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }>;
export const Main: React.FC<React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>;
export const Overlay: React.FC<{}>;

export const Sidebar: React.FC<React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>;
export const SidebarToggle: React.FC<{ title?: string }>;
export const SidebarFooter: React.FC<{ portalUrl?: string; portalLabel?: string; onPortalClick?: React.MouseEventHandler }>;
export const SidebarHeader: React.FC<{ title?: string }>;
export const SidebarBrand: React.FC<{ logo: string; alt?: string; subtitle?: React.ReactNode; href?: string; round?: boolean }>;
export const SidebarScroll: React.FC<{ children?: React.ReactNode }>;
export const SidebarGroup: React.FC<{ children?: React.ReactNode }>;
export const SidebarLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: string; label: React.ReactNode; badge?: React.ReactNode; active?: boolean;
}>;

export const Header: React.FC<React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>;
export const MenuButton: React.FC<{}>;
export const HeaderPage: React.FC<{ icon?: string; title: React.ReactNode; desc?: React.ReactNode }>;
export const HeaderRight: React.FC<{ children?: React.ReactNode }>;
export const DarkModeButton: React.FC<{}>;
export const LiveClock: React.FC<{}>;
export const Footer: React.FC<{
  system?: React.ReactNode; version?: React.ReactNode; copyright?: React.ReactNode;
  right?: React.ReactNode; left?: React.ReactNode; center?: React.ReactNode;
}>;

/* ── Botões ── */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size; icon?: string; as?: React.ElementType; href?: string;
}
export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>>;
export const ButtonGroup: React.FC<{ children?: React.ReactNode }>;
export const IconButton: React.ForwardRefExoticComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: string } & React.RefAttributes<HTMLButtonElement>
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
export const StatCard: React.FC<{ icon: string; color?: StatColor; value: React.ReactNode; label: React.ReactNode }>;
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
  render?: (row: T) => React.ReactNode;
  sortValue?: (row: T) => any;
  exportValue?: (row: T) => any;
  sortable?: boolean;
  exportable?: boolean;
  className?: string;
  thClassName?: string;
}
export function DataTable<T = any>(props: {
  columns: DataTableColumn<T>[]; data: T[]; rowKey?: (row: T) => React.Key;
  perPage?: number; searchable?: boolean; searchPlaceholder?: string;
  exportable?: boolean; exportName?: string; columnsToggle?: boolean;
  initialSort?: SortState | null; empty?: React.ReactNode; toolbar?: React.ReactNode;
}): JSX.Element;

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
export const FormGroup: React.FC<{ label?: React.ReactNode; required?: boolean; hint?: React.ReactNode; fieldHint?: React.ReactNode; children?: React.ReactNode }>;
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
export const Steps: React.FC<{ items: React.ReactNode[]; current?: number }>;

/* ── Gráficos ── */
export const CoxaChart: React.FC<{ type: string; data: any; options?: any; height?: number | string }>;
export const COXA_CHART_COLORS: string[];

/* ── Hooks e utils ── */
export function useDarkMode(): { dark: boolean; toggle: () => void; setDark: (v: boolean) => void };
export function useOverlay(open: boolean, onClose?: () => void): React.RefObject<any>;
export type ToastIcon = 'success' | 'error' | 'warning' | 'info' | 'question';
export function coxaToast(icon: ToastIcon, title: string): void;
export function coxaConfirm(opts: { title: string; text?: string; icon?: string; confirmText?: string; color?: string }): Promise<boolean>;

/* CSS: import 'coxa-ui-react/style.css' */
