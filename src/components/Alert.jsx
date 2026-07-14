const TYPES = {
  info:    { cls: 'alert-info',    icon: 'info-circle' },
  success: { cls: 'alert-success', icon: 'circle-check' },
  warn:    { cls: 'alert-warn',    icon: 'alert-triangle' },
  danger:  { cls: 'alert-danger',  icon: 'alert-octagon' }
};

/* <Alert type="success" title="Sucesso">Operação realizada.</Alert> */
export function Alert({ type = 'info', title, icon, children }) {
  const t = TYPES[type] || TYPES.info;
  return (
    <div className={`alert ${t.cls}`}>
      <i className={`ti ti-${icon || t.icon}`} />
      <div className="alert-body">
        {title && <div className="alert-title">{title}</div>}
        {children}
      </div>
    </div>
  );
}
