/* Cores disponíveis: green, blue, orange, purple, red (âmbar), yellow,
   gray, primary, accent */
export function Badge({ color = 'gray', icon, children, className = '', ...rest }) {
  return (
    <span className={`badge badge-${color} ${className}`.trim()} {...rest}>
      {icon && <i className={`ti ti-${icon}`} />} {children}
    </span>
  );
}

/* Badges especiais de presença (PortariaCoxa) */
export function BadgeInside({ children = 'Presente' }) {
  return <span className="badge-inside"><i className="ti ti-circle-filled" /> {children}</span>;
}
export function BadgeOutside({ children = 'Saiu' }) {
  return <span className="badge-outside">{children}</span>;
}

export function Tag({ href = '#', children, ...rest }) {
  return <a href={href} className="tag" {...rest}>{children}</a>;
}

export function TagCloud({ children }) {
  return <div className="tag-cloud">{children}</div>;
}
