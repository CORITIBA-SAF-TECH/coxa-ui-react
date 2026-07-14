const VARIANTS = {
  primary: 'btn-p',
  secondary: 'btn-s',
  danger: 'btn-d',      /* laranja — vermelho é proibido no projeto */
  warning: 'btn-w',
  accent: 'btn-acc',
  ghost: 'btn-ghost'
};
const SIZES = { xs: 'btn-xs', sm: 'btn-sm', lg: 'btn-lg' };

/* <Button variant="primary" size="sm" icon="check">Salvar</Button>
   Use as="a" href="..." para renderizar como link. */
export function Button({
  variant = 'primary', size, icon, children,
  className = '', as: Tag = 'button', ...rest
}) {
  const cls = ['btn', VARIANTS[variant] || VARIANTS.primary, SIZES[size] || '', className]
    .filter(Boolean).join(' ');
  if (Tag === 'button' && rest.type === undefined) rest.type = 'button';
  return (
    <Tag className={cls} {...rest}>
      {icon && <i className={`ti ti-${icon}`} />} {children}
    </Tag>
  );
}

export function ButtonGroup({ children }) {
  return <div className="btn-group">{children}</div>;
}

export function IconButton({ icon, className = '', ...rest }) {
  return (
    <button className={`icon-btn ${className}`.trim()} type="button" {...rest}>
      <i className={`ti ti-${icon}`} />
    </button>
  );
}
