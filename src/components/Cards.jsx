/* ── Stat cards (dashboards) ── */
export function StatCards({ children }) {
  return <div className="stat-cards">{children}</div>;
}

/* Minigráfico de tendência do StatCard (uma polilinha em SVG, sem biblioteca) */
function Sparkline({ data }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const faixa = max - min || 1;
  const pontos = data
    .map((v, i) => `${(2 + (i * 92) / (data.length - 1)).toFixed(1)},${(29 - ((v - min) / faixa) * 26).toFixed(1)}`)
    .join(' ');
  return (
    <svg className="stat-spark" viewBox="0 0 96 32" aria-hidden="true">
      <polyline pathLength="1" points={pontos} />
    </svg>
  );
}

/* color: green | blue | orange | purple | red | yellow
   unit:     prefixo pequeno antes do valor (ex.: "R$")
   Não aparecem no layout clássico:
   featured: cartão de destaque (degradê verde, mais largo)
   spark:    número[] com a tendência, vira um minigráfico no canto */
export function StatCard({ icon, color = 'green', value, label, unit, spark, featured, className = '' }) {
  const cls = ['stat-card', featured ? 'stat-card-featured' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <div className={`stat-icon ${color}`}><i className={`ti ti-${icon}`} /></div>
      <div className="stat-body">
        <div className="stat-val">{unit && <span className="stat-unit">{unit}</span>}{value}</div>
        <div className="stat-lbl">{label}</div>
      </div>
      {Array.isArray(spark) && spark.length > 1 && <Sparkline data={spark} />}
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
