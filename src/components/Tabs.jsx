/* Abas sublinhadas (controladas):
   <Tabs tabs={[{id:'todos',label:'Todos'},{id:'ativos',label:'Ativos'}]}
         active={aba} onChange={setAba} />
   <TabPanel show={aba==='todos'}>...</TabPanel> */
export function Tabs({ tabs = [], active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map(t => (
        <div
          key={t.id}
          className={`tab ${active === t.id ? 'active' : ''}`.trim()}
          onClick={() => onChange?.(t.id)}
        >
          {t.label}
        </div>
      ))}
    </div>
  );
}

export function TabPanel({ show, children }) {
  return <div className={`tab-panel ${show ? '' : 'hidden'}`.trim()}>{children}</div>;
}

/* Tabs estilo links (com ícone) */
export function LinksTabs({ tabs = [], active, onChange, children }) {
  return (
    <div className="links-tabs-wrap">
      <div className="links-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            type="button"
            className={`links-tab ${active === t.id ? 'active' : ''}`.trim()}
            onClick={() => onChange?.(t.id)}
          >
            {t.icon && <i className={`ti ti-${t.icon}`} />} {t.label}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
export function LinksPanel({ show, children }) {
  return <div className={`links-panel ${show ? '' : 'hidden'}`.trim()}>{children}</div>;
}
