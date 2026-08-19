import { useEffect, useMemo, useRef, useState } from 'react';
import { TableWrap, Table, SortableTh } from './Table.jsx';
import { Pagination } from './Pagination.jsx';

/* Popover leve (não fecha ao clicar dentro: para os checkboxes). */
function DtMenu({ label, icon, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  return (
    <span className="dt-menu-wrap" ref={ref}>
      <button type="button" className="btn btn-s btn-sm" onClick={() => setOpen(o => !o)} aria-haspopup="true" aria-expanded={open}>
        {icon && <i className={`ti ti-${icon}`} />} {label}
      </button>
      {open && <div className="dt-menu" onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}>{children}</div>}
    </span>
  );
}

function cellValue(col, row) {
  if (col.exportValue) return col.exportValue(row);
  return row[col.key];
}
function sortValue(col, row) {
  if (col.sortValue) return col.sortValue(row);
  return row[col.key];
}

function toCSV(rows, cols) {
  const esc = v => {
    const s = v == null ? '' : String(v);
    return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const head = cols.map(c => esc(c.label)).join(';');
  const body = rows.map(r => cols.map(c => esc(cellValue(c, r))).join(';'));
  return '﻿' + [head, ...body].join('\r\n'); /* BOM para acentos no Excel */
}

function download(name, text) {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

/* Tabela padrão do CoxaUI: ordenação, paginação, seleção de colunas visíveis
   e exportação CSV (com escolha de colunas) já embutidas.

   const columns = [
     { key: 'nome', label: 'Nome', render: r => <strong>{r.nome}</strong> },
     { key: 'loc', label: 'Localidade' },
     { key: 'visitas', label: 'Visitas' },
   ];
   <DataTable columns={columns} data={rows} perPage={10} searchable exportName="visitantes.csv" />

   Por coluna: sortable (padrão true), render(row), sortValue(row), exportValue(row),
   exportable (entra no CSV; padrão true), className/thClassName.
   Recursos ligados por padrão; desligue com sortable={false}, columns-toggle={false}, exportable={false}. */
export function DataTable({
  columns = [], data = [], rowKey,
  perPage, searchable = false, searchPlaceholder = 'Filtrar...',
  exportable = true, exportName = 'tabela.csv', columnsToggle = true,
  initialSort = null, empty = 'Nada encontrado.', toolbar
}) {
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [hidden, setHidden] = useState(() => new Set());
  const [exportCols, setExportCols] = useState(() => new Set(columns.filter(c => c.exportable !== false).map(c => c.key)));

  const keyOf = (row, i) => (rowKey ? rowKey(row) : (row.id != null ? row.id : i));
  const isSortable = c => c.sortable !== false;

  const filtered = useMemo(() => {
    if (!searchable || !q) return data;
    const nq = q.toLowerCase();
    return data.filter(r => columns.some(c => String(cellValue(c, r) ?? '').toLowerCase().includes(nq)));
  }, [data, q, searchable, columns]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find(c => c.key === sort.field);
    if (!col) return filtered;
    const arr = [...filtered];
    arr.sort((a, b) => {
      const x = sortValue(col, a), y = sortValue(col, b);
      if (x == null) return 1;
      if (y == null) return -1;
      let r;
      if (typeof x === 'number' && typeof y === 'number') r = x - y;
      else r = String(x).localeCompare(String(y), 'pt', { numeric: true, sensitivity: 'base' });
      return sort.dir === 'asc' ? r : -r;
    });
    return arr;
  }, [filtered, sort, columns]);

  const totalPages = perPage ? Math.max(1, Math.ceil(sorted.length / perPage)) : 1;
  const curPage = Math.min(page, totalPages);
  const rows = perPage ? sorted.slice((curPage - 1) * perPage, curPage * perPage) : sorted;

  const visibleCols = columns.filter(c => !hidden.has(c.key));

  function toggleSort(field) {
    setSort(s => (s && s.field === field ? { field, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { field, dir: 'asc' }));
  }
  function toggleHidden(key) {
    setHidden(h => { const n = new Set(h); n.has(key) ? n.delete(key) : n.add(key); return n; });
  }
  function toggleExport(key) {
    setExportCols(s => { const n = new Set(s); n.has(key) ? n.delete(key) : n.add(key); return n; });
  }
  function doExport() {
    const cols = columns.filter(c => exportCols.has(c.key));
    if (!cols.length) return;
    download(exportName, toCSV(sorted, cols)); /* exporta tudo (filtrado/ordenado), não só a página */
  }

  const showToolbar = searchable || columnsToggle || exportable || toolbar;

  return (
    <div>
      {showToolbar && (
        <div className="dt-toolbar">
          {searchable && (
            <input type="text" value={q} placeholder={searchPlaceholder}
              onChange={e => { setQ(e.target.value); setPage(1); }} style={{ maxWidth: 240 }} />
          )}
          {toolbar}
          <span className="dt-toolbar-spacer" />
          {columnsToggle && (
            <DtMenu label="Colunas" icon="columns">
              <div className="dt-menu-lbl">Colunas visíveis</div>
              {columns.map(c => (
                <label key={c.key}>
                  <input type="checkbox" checked={!hidden.has(c.key)} onChange={() => toggleHidden(c.key)} />
                  {c.label}
                </label>
              ))}
            </DtMenu>
          )}
          {exportable && (
            <DtMenu label="Exportar CSV" icon="download">
              <div className="dt-menu-lbl">Colunas no CSV</div>
              {columns.map(c => (
                <label key={c.key}>
                  <input type="checkbox" checked={exportCols.has(c.key)} onChange={() => toggleExport(c.key)} />
                  {c.label}
                </label>
              ))}
              <div className="dt-menu-sep" />
              <div className="dt-menu-act">
                <button type="button" className="btn btn-p btn-sm" style={{ width: '100%' }} onClick={doExport}>
                  <i className="ti ti-file-download" /> Baixar CSV
                </button>
              </div>
            </DtMenu>
          )}
        </div>
      )}

      <TableWrap>
        <Table>
          <thead>
            <tr>
              {visibleCols.map(c => (
                isSortable(c)
                  ? <SortableTh key={c.key} field={c.key} sort={sort} onSort={toggleSort} className={c.thClassName}>{c.label}</SortableTh>
                  : <th key={c.key} className={c.thClassName}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={visibleCols.length} style={{ textAlign: 'center', color: 'var(--text3)', padding: '18px' }}>{empty}</td></tr>
            )}
            {rows.map((r, i) => (
              <tr key={keyOf(r, i)}>
                {visibleCols.map(c => (
                  <td key={c.key} className={c.className}>{c.render ? c.render(r) : r[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>

      {perPage && sorted.length > perPage && (
        <div style={{ marginTop: 12 }}>
          <Pagination page={curPage} total={sorted.length} perPage={perPage} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
