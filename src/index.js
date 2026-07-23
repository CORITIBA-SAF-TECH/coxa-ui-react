/* ══════════════════════════════════════════════════════════════════
   CoxaUI React — Coritiba Foot Ball Club Internal Design System
   ══════════════════════════════════════════════════════════════════ */
import './styles/coxa-ui.css';

export const COXAUI_REACT_VERSION = '1.0.0';

/* Layout */
export { AppLayout, ContentCol, Overlay, Main, useSidebar } from './components/AppLayout.jsx';
export {
  Sidebar, SidebarFooter, SidebarHeader, SidebarBrand,
  SidebarScroll, SidebarGroup, SidebarLink
} from './components/Sidebar.jsx';
export {
  Header, MenuButton, HeaderPage, HeaderRight,
  DarkModeButton, LiveClock, Footer
} from './components/Header.jsx';

/* Básicos */
export { Button, ButtonGroup, IconButton } from './components/Button.jsx';
export { Badge, BadgeInside, BadgeOutside, Tag, TagCloud } from './components/Badge.jsx';
export { Alert } from './components/Alert.jsx';
export {
  Spinner, Avatar, AvatarGroup, Breadcrumb,
  FilterPills, FilterPill, Progress, Empty, KVList, KV, KVDivider
} from './components/Misc.jsx';
export {
  StatCards, StatCard, Cards, CardItem, AdmCard, LinkCards, LinkCard
} from './components/Cards.jsx';

/* Formulários */
export {
  FormCard, FormRow, FormGroup, FormActions,
  Toggle, ChkOpt, TipoOpts, TipoOpt
} from './components/Form.jsx';
export { Combobox, MultiCombobox } from './components/Combobox.jsx';

/* Interativos */
export { Modal, ModalInfo } from './components/Modal.jsx';
export { Tabs, TabPanel, LinksTabs, LinksPanel } from './components/Tabs.jsx';
export { Accordion, AccordionItem } from './components/Accordion.jsx';
export { Dropdown, DropdownItem, DropdownSep } from './components/Dropdown.jsx';
export { Timeline, TimelineItem, Hist, HistItem, Steps } from './components/Timeline.jsx';

/* Gráficos */
export { CoxaChart, COXA_CHART_COLORS } from './components/CoxaChart.jsx';

/* Hooks e utils */
export { useDarkMode } from './hooks/useDarkMode.js';
export { coxaToast, coxaConfirm } from './utils/swal.js';
