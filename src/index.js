/* ══════════════════════════════════════════════════════════════════
   CoxaUI React: Coritiba Foot Ball Club Internal Design System
   ══════════════════════════════════════════════════════════════════ */
import './styles/coxa-ui.css';
import './styles/coxa-ui-1.2.css';   /* componentes novos + o layout da biblioteca (já vem ligado) */

export const COXAUI_REACT_VERSION = '1.2.0';

/* Layout */
export { AppLayout, ContentCol, Overlay, Main, useSidebar, useCoxaLayout } from './components/AppLayout.jsx';
export {
  Sidebar, SidebarToggle, SidebarFooter, SidebarHeader, SidebarBrand,
  SidebarScroll, SidebarGroup, SidebarLink
} from './components/Sidebar.jsx';
export {
  Header, MenuButton, HeaderPage, HeaderRight, HeaderSearch, EnvBadge,
  DarkModeButton, LiveClock, Footer
} from './components/Header.jsx';

/* Básicos */
export { Button, ButtonGroup, IconButton } from './components/Button.jsx';
export { HoldButton } from './components/HoldButton.jsx';
export { Badge, BadgeInside, BadgeOutside, Tag, TagCloud } from './components/Badge.jsx';
export { Alert } from './components/Alert.jsx';
export {
  Spinner, Avatar, AvatarGroup, Breadcrumb,
  FilterPills, FilterPill, Progress, Empty, KVList, KV, KVDivider
} from './components/Misc.jsx';
export {
  StatCards, StatCard, Cards, CardItem, AdmCard, LinkCards, LinkCard
} from './components/Cards.jsx';
export { CountUp } from './components/CountUp.jsx';
export { Result, LoadingScreen, CopyButton, Kbd } from './components/Feedback.jsx';
export { Loader, LogoLoader, LoadingOverlay } from './components/Loading.jsx';
export { Tree } from './components/Tree.jsx';
export { Popover } from './components/Popover.jsx';
export { FilterBar, FilterField, DateRange } from './components/FilterBar.jsx';
export { AttachmentList, formatBytes } from './components/Attachments.jsx';
export { Wizard } from './components/Wizard.jsx';
export { Changelog } from './components/Changelog.jsx';
export { CommentList, Comment, CommentBox } from './components/Comments.jsx';
export { TableWrap, Table, SelBar, useSort, SortableTh } from './components/Table.jsx';
export { DataTable } from './components/DataTable.jsx';
export { Pagination } from './components/Pagination.jsx';
export { Skeleton } from './components/Skeleton.jsx';
export { Tooltip } from './components/Tooltip.jsx';

/* Formulários */
export {
  FormCard, FormRow, FormGroup, FormActions,
  Toggle, ChkOpt, TipoOpts, TipoOpt
} from './components/Form.jsx';
export {
  InputGroup, PasswordInput, SearchInput, MaskedInput, CurrencyInput, RadioGroup, Segmented
} from './components/Inputs.jsx';
export { Combobox, MultiCombobox } from './components/Combobox.jsx';
export { FileUpload } from './components/FileUpload.jsx';

/* Interativos */
export { Modal, ModalInfo } from './components/Modal.jsx';
export { Drawer } from './components/Drawer.jsx';
export { Tabs, TabPanel, LinksTabs, LinksPanel } from './components/Tabs.jsx';
export { Accordion, AccordionItem } from './components/Accordion.jsx';
export { Dropdown, DropdownItem, DropdownSep } from './components/Dropdown.jsx';
export { UserMenu } from './components/UserMenu.jsx';
export { Timeline, TimelineItem, Hist, HistItem, Steps } from './components/Timeline.jsx';
export { CommandPalette, useCommandPalette } from './components/CommandPalette.jsx';

/* Sessão e privacidade */
export { SessionChip, LockScreen, useCountdown } from './components/Session.jsx';
export { Sensitive, PrivacyButton, usePrivacy } from './components/Privacy.jsx';

/* Gráficos */
export { CoxaChart, COXA_CHART_COLORS } from './components/CoxaChart.jsx';

/* Hooks e utils */
export { useDarkMode } from './hooks/useDarkMode.js';
export { useOverlay } from './hooks/useOverlay.js';
export { coxaToast, coxaConfirm } from './utils/swal.js';
export { notify } from './utils/notify.js';
export { confirmDialog } from './utils/confirm.js';
export { showLoading } from './utils/loading.js';
export { COXA_LOGO } from './assets/logo.js';
export { registerButtonIcons, buttonIconFor } from './utils/buttonIcons.js';
export { masks, applyMask, unmask, formatBRL } from './utils/masks.js';
export { viewTransition } from './utils/motion.js';

/* Tradução (pt-BR é o idioma de origem; es e en vêm prontos para os textos da lib) */
export { LanguageSelector } from './components/LanguageSelector.jsx';
export { Flag } from './components/Flag.jsx';
export {
  t, useI18n, registerMessages, setLanguage, getLanguage,
  getMissingMessages, clearMissingMessages, i18nElement, LANGUAGES, DEFAULT_LANGUAGE
} from './i18n/core.js';
