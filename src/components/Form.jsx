/* ── Estruturas de formulário ── */
export function FormCard({ icon, title, children }) {
  return (
    <div className="form-card">
      {title && <h2>{icon && <i className={`ti ti-${icon}`} />} {title}</h2>}
      {children}
    </div>
  );
}

export function FormRow({ cols = 2, children }) {
  const cls = cols === 3 ? 'form-row-3' : 'form-row';
  return <div className={cls}>{children}</div>;
}

/* Grupo label + campo. <FormGroup label="Nome" required hint="(opcional)"> */
export function FormGroup({ label, required, hint, fieldHint, children }) {
  return (
    <div className="form-g">
      {label && (
        <label>
          {label}
          {required && <span className="req">*</span>}
          {hint && <span className="hint"> {hint}</span>}
        </label>
      )}
      {children}
      {fieldHint && (
        <div className="field-hint"><i className="ti ti-info-circle" /> {fieldHint}</div>
      )}
    </div>
  );
}

export function FormActions({ children }) {
  return <div className="form-act">{children}</div>;
}

/* ── Toggle switch ── */
export function Toggle({ checked, onChange, label, name }) {
  return (
    <label className="toggle-wrap">
      <span className="toggle-sw">
        <input type="checkbox" name={name} checked={checked} onChange={e => onChange?.(e.target.checked)} />
        <span className="toggle-track" />
        <span className="toggle-thumb" />
      </span>
      {label && <span className="toggle-lbl">{label}</span>}
    </label>
  );
}

/* ── Checkbox estilizado ── */
export function ChkOpt({ checked, onChange, children, name }) {
  return (
    <label className="chk-opt">
      <input type="checkbox" name={name} checked={checked} onChange={e => onChange?.(e.target.checked)} />
      {children}
    </label>
  );
}

/* ── Seletor de tipo (pills) ── */
export function TipoOpts({ children }) {
  return <div className="tipo-opts">{children}</div>;
}
export function TipoOpt({ icon, checked, onChange, name, children }) {
  return (
    <label className="tipo-opt">
      <input type="radio" name={name} checked={checked} onChange={() => onChange?.()} />
      {icon && <i className={`ti ti-${icon}`} />} {children}
    </label>
  );
}
