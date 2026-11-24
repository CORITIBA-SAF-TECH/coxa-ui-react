import { useRef } from 'react';
import { useSlideIndicator } from '../hooks/useSlideIndicator.js';

/* Abas sublinhadas (controladas):
   <Tabs tabs={[{id:'todos',label:'Todos'},{id:'ativos',label:'Ativos'}]}
         active={aba} onChange={setAba} />
   <TabPanel show={aba==='todos'}>...</TabPanel> */
export function Tabs({ tabs = [], active, onChange }) {
  /* sublinhado deslizante da aba ativa: não aparece no layout clássico */
  const box = useRef(null);
  const ind = useRef(null);
  useSlideIndicator(box, ind, '.tab.active', 'x');

  function onKey(e, i) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
    onChange?.(tabs[next].id);
  }
  return (
    <div className="tabs" role="tablist" ref={box}>
      <span className="tab-ind" ref={ind} aria-hidden="true" />
      {tabs.map((t, i) => {
        const sel = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={sel}
            tabIndex={sel ? 0 : -1}
            className={`tab ${sel ? 'active' : ''}`.trim()}
            onClick={() => onChange?.(t.id)}
            onKeyDown={e => onKey(e, i)}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ show, children }) {
  return <div className={`tab-panel ${show ? '' : 'hidden'}`.trim()} role="tabpanel" hidden={!show}>{children}</div>;
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
