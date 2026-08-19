import { useMemo, useState } from 'react';

/* ── Tabelas ──
   Use elementos <table>/<thead>/<tbody>/<tr>/<th>/<td> normais dentro de
   <TableWrap>: o CSS do CoxaUI já estiliza tudo. Classes úteis de linha:
     .row-pend  → destaque laranja (pendente)
     .row-del   → linha desabilitada (opacity)
   Célula de checkbox: <td className="sel-chk-cell">. */

export function TableWrap({ children, className = '', ...rest }) {
  return <div className={`tbl-wrap ${className}`.trim()} {...rest}>{children}</div>;
}

export function Table({ children, className = '', ...rest }) {
  return <table className={className || undefined} {...rest}>{children}</table>;
}

/* Ordenação de tabela.
   const { rows, sort, toggle } = useSort(data, 'nome');
   Renderize o cabeçalho com <SortableTh field="nome" sort={sort} onSort={toggle}>Nome</SortableTh>
   e itere sobre `rows` (já ordenado). */
export function useSort(data, initialField = null, initialDir = 'asc') {
  const [sort, setSort] = useState(initialField ? { field: initialField, dir: initialDir } : null);
  const rows = useMemo(() => {
    if (!sort) return data;
    const arr = [...data];
    arr.sort((a, b) => {
      const x = a[sort.field], y = b[sort.field];
      if (x == null) return 1;
      if (y == null) return -1;
      let r;
      if (typeof x === 'number' && typeof y === 'number') r = x - y;
      else r = String(x).localeCompare(String(y), 'pt', { numeric: true, sensitivity: 'base' });
      return sort.dir === 'asc' ? r : -r;
    });
    return arr;
  }, [data, sort]);
  const toggle = field => setSort(s =>
    s && s.field === field ? { field, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { field, dir: 'asc' }
  );
  return { rows, sort, toggle };
}

/* Cabeçalho de coluna ordenável (clique alterna asc/desc). */
export function SortableTh({ field, sort, onSort, children, ...rest }) {
  const active = sort && sort.field === field;
  const ico = !active ? 'ti-arrows-sort' : sort.dir === 'asc' ? 'ti-sort-ascending' : 'ti-sort-descending';
  return (
    <th
      className={`sortable ${active ? 'sorted' : ''}`.trim()}
      onClick={() => onSort?.(field)}
      aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
      {...rest}
    >
      {children}<i className={`ti ${ico} th-sort-ico`} />
    </th>
  );
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
