/* ── Tabelas ──
   Use elementos <table>/<thead>/<tbody>/<tr>/<th>/<td> normais dentro de
   <TableWrap> — o CSS do CoxaUI já estiliza tudo. Classes úteis de linha:
     .row-pend  → destaque laranja (pendente)
     .row-del   → linha desabilitada (opacity)
   Célula de checkbox: <td className="sel-chk-cell">. */

export function TableWrap({ children, className = '', ...rest }) {
  return <div className={`tbl-wrap ${className}`.trim()} {...rest}>{children}</div>;
}

export function Table({ children, className = '', ...rest }) {
  return <table className={className || undefined} {...rest}>{children}</table>;
}

/* Barra de seleção em lote (sticky no rodapé da tabela).
   Renderize só quando houver seleção; `count` preenche o rótulo.
   As ações em lote entram como children; passe onClear para o botão limpar.
   <SelBar count={n} onClear={limpar}>
     <Button size="sm" variant="accent" icon="logout">Saída em lote</Button>
   </SelBar> */
export function SelBar({ count = 0, children, onClear, label }) {
  if (!count) return null;
  const txt = label || `${count} ${count === 1 ? 'item selecionado' : 'itens selecionados'}`;
  return (
    <div className="sel-bar" style={{ display: 'flex' }}>
      <span className="sel-bar-lbl">{txt}</span>
      {children}
      {onClear && (
        <button className="btn btn-sm btn-s" type="button" onClick={onClear}>
          <i className="ti ti-x" /> Limpar
        </button>
      )}
    </div>
  );
}
