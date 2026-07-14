/* ── Spinner ── */
export function Spinner({ inline, label }) {
  if (inline) return <span className="spinner-inline" />;
  return (
    <div className="spinner-box">
      <div className="spinner-ring" />
      {label && <p>{label}</p>}
    </div>
  );
}

/* ── Avatar ── */
const AV_SIZES = { sm: 'avatar-sm', lg: 'avatar-lg', xl: 'avatar-xl' };
export function Avatar({ children, size, title, style }) {
  return (
    <div className={`avatar ${AV_SIZES[size] || ''}`.trim()} title={title} style={style}>
      {children}
    </div>
  );
}
export function AvatarGroup({ children }) {
  return <div className="avatar-grp">{children}</div>;
}

/* ── Breadcrumb ── */
export function Breadcrumb({ items = [] }) {
  return (
    <nav className="bc">
      {items.map((it, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 && <span className="bc-sep"><i className="ti ti-chevron-right" /></span>}
          {it.href ? <a href={it.href}>{it.label}</a> : <span>{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

/* ── Filter pills ── */
export function FilterPills({ children }) {
  return <div className="filter-pills">{children}</div>;
}
export function FilterPill({ active, icon, children, href = '#', onClick }) {
  return (
    <a href={href} onClick={onClick} className={`filter-pill ${active ? 'active' : ''}`.trim()}>
      {icon && <i className={`ti ti-${icon}`} />} {children}
    </a>
  );
}

/* ── Progresso ── */
export function Progress({ value = 0, variant, striped, lg, label }) {
  const barCls = ['progress-bar', variant || '', striped ? 'striped' : ''].filter(Boolean).join(' ');
  return (
    <>
      {label && (
        <div className="progress-label"><span>{label}</span><span>{value}%</span></div>
      )}
      <div className={`progress ${lg ? 'progress-lg' : ''}`.trim()}>
        <div className={barCls} style={{ width: `${value}%` }} />
      </div>
    </>
  );
}

/* ── Estado vazio ── */
export function Empty({ icon = 'ghost', children, action }) {
  return (
    <div className="empty">
      <div className="empty-ico"><i className={`ti ti-${icon}`} /></div>
      <p>{children}</p>
      {action}
    </div>
  );
}

/* ── Lista chave/valor ── */
export function KVList({ children }) {
  return <div className="kv-list">{children}</div>;
}
export function KV({ k, children }) {
  return (
    <div className="kv-item">
      <span className="kv-key">{k}</span>
      <span className="kv-val">{children}</span>
    </div>
  );
}
export function KVDivider() {
  return <div className="kv-divider" />;
}
