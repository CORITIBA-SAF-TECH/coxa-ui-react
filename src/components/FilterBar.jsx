import { Button } from './Button.jsx';
import { FormGroup } from './Form.jsx';

/* Painel de filtros acima de tabelas e relatórios. Três partes fixas:
     1. a grade dos campos (children: <FilterField> e <DateRange>);
     2. as opções (options: checkboxes como <ChkOpt>), numa linha própria;
     3. as ações, à direita: Buscar, Limpar e o que mais a tela tiver (actions).
   Enter em qualquer campo busca.

   <FilterBar onSearch={buscar} onClear={limpar} loading={carregando}
     options={<ChkOpt checked={soAtivos} onChange={setSoAtivos}>Só ativos</ChkOpt>}>
     <DateRange from={de} to={ate} onChange={(de, ate) => { setDe(de); setAte(ate); }} />
     <FilterField label="Situação"><select>...</select></FilterField>
   </FilterBar> */
export function FilterBar({
  onSearch, onClear, loading = false, searchLabel = 'Buscar', searchingLabel = 'Buscando...',
  clearLabel = 'Limpar filtros', options, actions, className = '', children
}) {
  function tecla(e) {
    if (e.key !== 'Enter' || !onSearch || loading) return;
    const t = e.target;
    if (t.tagName === 'INPUT' && !['checkbox', 'radio', 'button', 'submit'].includes(t.type)) {
      e.preventDefault();
      onSearch();
    }
  }
  const temRodape = options || actions || onSearch || onClear;
  return (
    <div className={`flt ${className}`.trim()} onKeyDown={tecla}>
      <div className="flt-grid">{children}</div>
      {temRodape && (
        <div className="flt-foot">
          <div className="flt-opts">{options}</div>
          <div className="flt-acts">
            {onClear && <Button variant="ghost" onClick={onClear} disabled={loading}>{clearLabel}</Button>}
            {actions}
            {onSearch && <Button icon="search" loading={loading} onClick={onSearch}>{loading ? searchingLabel : searchLabel}</Button>}
          </div>
        </div>
      )}
    </div>
  );
}

/* Uma célula da grade. span={2} ocupa duas colunas. */
export function FilterField({ label, hint, span = 1, children }) {
  return (
    <div className={`flt-field ${span > 1 ? 'flt-wide' : ''}`.trim()}>
      <FormGroup label={label} hint={hint}>{children}</FormGroup>
    </div>
  );
}

/* Período: "De" e "Até" lado a lado (datas no formato do <input type="date">: AAAA-MM-DD).
   onChange recebe (de, ate). Dentro do <FilterBar> ocupa duas colunas; fora dele, use solto.
   <DateRange from={de} to={ate} onChange={(de, ate) => ...} /> */
export function DateRange({ from = '', to = '', onChange, label = 'Período', min, max, disabled }) {
  return (
    <div className="flt-field flt-wide">
      <FormGroup label={label}>
        <div className="date-range">
          <input type="date" value={from} min={min} max={to || max} disabled={disabled} aria-label="De"
            onChange={e => onChange?.(e.target.value, to)} />
          <span aria-hidden="true">até</span>
          <input type="date" value={to} min={from || min} max={max} disabled={disabled} aria-label="Até"
            onChange={e => onChange?.(from, e.target.value)} />
        </div>
      </FormGroup>
    </div>
  );
}
