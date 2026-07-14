/* ── Stat cards (dashboards) ── */
export function StatCards({ children }) {
  return <div className="stat-cards">{children}</div>;
}

/* color: green | blue | orange | purple | red | yellow */
export function StatCard({ icon, color = 'green', value, label }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}><i className={`ti ti-${icon}`} /></div>
      <div className="stat-body">
        <div className="stat-val">{value}</div>
        <div className="stat-lbl">{label}</div>
      </div>
    </div>
  );
}

/* ── Card de conteúdo (posts/manuais) ── */
export function Cards({ children }) {
  return <div className="cards">{children}</div>;
}

export function CardItem({ section, sectionHref = '#', title, href = '#', subtitle, meta, tags, children }) {
  return (
    <div className="card-item">
      {section && <div className="ci-sec"><a href={sectionHref}>{section}</a></div>}
      {title && <h2><a href={href}>{title}</a></h2>}
      {subtitle && <p className="ci-sub">{subtitle}</p>}
      {meta && <div className="ci-meta">{meta}</div>}
      {children}
      {tags && <div className="tags">{tags}</div>}
    </div>
  );
}

/* ── Card administrativo (header com ações) ── */
export function AdmCard({ icon, title, actions, children }) {
  return (
    <div className="adm-card">
      <div className="adm-hdr">
        <h2>{icon && <i className={`ti ti-${icon}`} />} {title}</h2>
        {actions && <div className="adm-hdr-actions">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

/* ── Link cards (atalhos) ── */
export function LinkCards({ children }) {
  return <div className="link-cards">{children}</div>;
}
export function LinkCard({ icon, href = '#', children, ...rest }) {
  return (
    <a href={href} className="link-card" {...rest}>
      <span className="link-ico-ph"><i className={`ti ti-${icon}`} /></span>
      <span className="link-nome">{children}</span>
    </a>
  );
}
