/* ── Timeline vertical ── */
export function Timeline({ children }) {
  return <ul className="timeline">{children}</ul>;
}

/* variant: '' | 'warn' | 'info' (cor do ponto) */
export function TimelineItem({ date, title, variant = '', children }) {
  return (
    <li className="tl-item">
      <div className={`tl-dot ${variant}`.trim()} />
      {date && <div className="tl-date">{date}</div>}
      {title && <div className="tl-title">{title}</div>}
      {children && <div className="tl-body">{children}</div>}
    </li>
  );
}

/* ── Histórico (badge horizontal) ── */
export function Hist({ children }) {
  return <ul className="hist">{children}</ul>;
}
export function HistItem({ badge, title, meta = [] }) {
  return (
    <li className="hist-item">
      {badge && <span className="hist-badge">{badge}</span>}
      <div className="hist-body">
        <div className="hist-title">{title}</div>
        {meta.length > 0 && (
          <div className="hist-meta">
            {meta.map((m, i) => (
              <span key={i} style={{ display: 'contents' }}>
                {i > 0 && <span>·</span>}
                <span>{m}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

/* ── Steps (trilha de etapas) ──
   Cada etapa é uma coluna de largura igual, com o número em cima e o rótulo embaixo, e a
   trilha ocupa a largura toda. É a mesma trilha que o <Wizard> desenha.
   centered={false} troca pela trilha compacta, com número e rótulo lado a lado.
   (No layout clássico, sem a prop, vale a trilha compacta da 1.1; centered força as colunas.) */
export function Steps({ items = [], current = 0, centered }) {
  const modo = centered === true ? 'steps-center' : centered === false ? 'steps-inline' : '';
  return (
    <div className={`steps ${modo}`.trim()}>
      {items.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : '';
        return (
          <div key={i} className={`step-item ${state}`.trim()}>
            <div className="step-num">
              {i < current ? <i className="ti ti-check" style={{ fontSize: '.7rem' }} /> : i + 1}
            </div>
            <div className="step-lbl">{label}</div>
            {i < items.length - 1 && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
}
